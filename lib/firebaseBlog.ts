import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

export interface BlogPostRecord {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  author?: string;
  imagePath?: string;
  imageToken?: string;
}

export interface PublishBlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  author?: string;
  date?: string;
  imageName: string;
  imageBase64: string;
}

const postsDirectory = path.join(process.cwd(), 'data/posts');
const postsCollection = 'blogPosts';

let firebaseApp: App | null = null;

function getEnvValue(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return '';
}

function parseServiceAccount(): { projectId: string; clientEmail: string; privateKey: string } | null {
  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();

  if (rawJson) {
    const parsed = JSON.parse(rawJson) as {
      project_id?: string;
      client_email?: string;
      private_key?: string;
    };

    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
      return null;
    }

    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key.replace(/\\n/g, '\n'),
    };
  }

  const projectId = getEnvValue('FIREBASE_PROJECT_ID', 'GOOGLE_CLOUD_PROJECT');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return { projectId, clientEmail, privateKey };
}

export function isFirebaseBlogConfigured(): boolean {
  return Boolean(parseServiceAccount() && getEnvValue('FIREBASE_STORAGE_BUCKET'));
}

function getFirebaseApp(): App | null {
  if (!isFirebaseBlogConfigured()) {
    return null;
  }

  if (firebaseApp) {
    return firebaseApp;
  }

  const serviceAccount = parseServiceAccount();
  const storageBucket = getEnvValue('FIREBASE_STORAGE_BUCKET');

  if (!serviceAccount || !storageBucket) {
    return null;
  }

  firebaseApp = getApps()[0] ?? initializeApp({
    credential: cert(serviceAccount),
    storageBucket,
  });

  return firebaseApp;
}

function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getFileExtension(imageName: string): string {
  return imageName.split('.').pop()?.toLowerCase() || 'jpg';
}

function getContentType(fileExtension: string): string {
  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

function buildStorageDownloadUrl(bucketName: string, filePath: string, token: string): string {
  const encodedPath = encodeURIComponent(filePath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`;
}

function readLocalPosts(): BlogPostRecord[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const slug = fileName.replace(/\.json$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8')) as Partial<BlogPostRecord> & { image?: string };

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
        image: data.image || '/blog-placeholder.webp',
        content: data.content || '',
        author: data.author,
      };
    });
}

export async function listBlogPosts(): Promise<BlogPostRecord[]> {
  const app = getFirebaseApp();

  if (!app) {
    return readLocalPosts();
  }

  const db = getFirestore(app);
  const snapshot = await db.collection(postsCollection).orderBy('date', 'desc').get();

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Partial<BlogPostRecord> & { imageUrl?: string };

    return {
      slug: data.slug || doc.id,
      title: data.title || doc.id,
      date: data.date || '',
      excerpt: data.excerpt || '',
      image: data.image || data.imageUrl || '/blog-placeholder.webp',
      content: data.content || '',
      author: data.author,
      imagePath: data.imagePath,
      imageToken: data.imageToken,
    };
  });
}

export async function publishBlogPost(input: PublishBlogPostInput): Promise<{ slug: string; imageUrl: string }> {
  const app = getFirebaseApp();

  if (!app) {
    throw new Error('Firebase no está configurado en este entorno.');
  }

  if (!input.title || !input.content || !input.excerpt || !input.imageBase64) {
    throw new Error('El título, extracto, contenido e imagen son obligatorios.');
  }

  const slug = normalizeSlug(input.slug || input.title);
  if (!slug) {
    throw new Error('El URL Slug no es válido.');
  }

  const fileExtension = getFileExtension(input.imageName);
  const imageToken = crypto.randomUUID();
  const imagePath = `blog/posts/${slug}/${slug}.${fileExtension}`;
  const bucket = getStorage(app).bucket();
  const file = bucket.file(imagePath);
  const buffer = Buffer.from(input.imageBase64, 'base64');

  await file.save(buffer, {
    resumable: false,
    metadata: {
      contentType: getContentType(fileExtension),
      metadata: {
        firebaseStorageDownloadTokens: imageToken,
      },
    },
  });

  const imageUrl = buildStorageDownloadUrl(bucket.name, imagePath, imageToken);
  const db = getFirestore(app);

  await db.collection(postsCollection).doc(slug).set({
    slug,
    title: input.title,
    excerpt: input.excerpt,
    author: input.author || 'Tamarron Services',
    date: input.date || new Date().toISOString().split('T')[0],
    content: input.content,
    image: imageUrl,
    imageUrl,
    imagePath,
    imageToken,
    source: 'firebase',
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  return { slug, imageUrl };
}

export async function deleteBlogPost(slugValue: string): Promise<void> {
  const app = getFirebaseApp();

  if (!app) {
    throw new Error('Firebase no está configurado en este entorno.');
  }

  const slug = normalizeSlug(slugValue);
  if (!slug) {
    throw new Error('Slug no proporcionado');
  }

  const db = getFirestore(app);
  const docRef = db.collection(postsCollection).doc(slug);
  const snapshot = await docRef.get();

  if (snapshot.exists) {
    const data = snapshot.data() as { imagePath?: string } | undefined;
    if (data?.imagePath) {
      try {
        await getStorage(app).bucket().file(data.imagePath).delete({ ignoreNotFound: true });
      } catch {
        // Ignore storage cleanup errors so the database record still disappears.
      }
    }

    await docRef.delete();
  }
}
