import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

const rootDir = process.cwd();
const postsDir = path.join(rootDir, 'data/posts');
const publicDir = path.join(rootDir, 'public');

function getEnvValue(...keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return '';
}

function parseServiceAccount() {
  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();

  if (rawJson) {
    const parsed = JSON.parse(rawJson);
    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is missing required fields.');
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
    throw new Error('Firebase credentials are not configured.');
  }

  return { projectId, clientEmail, privateKey };
}

function getFirebaseApp() {
  const serviceAccount = parseServiceAccount();
  const storageBucket = getEnvValue('FIREBASE_STORAGE_BUCKET');

  if (!storageBucket) {
    throw new Error('FIREBASE_STORAGE_BUCKET is not configured.');
  }

  return getApps()[0] ?? initializeApp({
    credential: cert(serviceAccount),
    storageBucket,
  });
}

function getContentType(fileExtension) {
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

function buildStorageDownloadUrl(bucketName, filePath, token) {
  const encodedPath = encodeURIComponent(filePath).replace(/%2F/g, '/');
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`;
}

function resolveImagePath(postData, slug) {
  if (typeof postData.image === 'string' && postData.image.startsWith('/uploads/blog/')) {
    return path.join(publicDir, postData.image.replace(/^\//, ''));
  }

  const extension = typeof postData.image === 'string' && postData.image.includes('.')
    ? postData.image.split('.').pop()
    : 'webp';

  return path.join(publicDir, 'uploads', 'blog', `${slug}.${extension}`);
}

if (!fs.existsSync(postsDir)) {
  throw new Error(`Posts directory not found: ${postsDir}`);
}

const app = getFirebaseApp();
const db = getFirestore(app);
const bucket = getStorage(app).bucket();
const postFiles = fs.readdirSync(postsDir).filter((fileName) => fileName.endsWith('.json'));

for (const fileName of postFiles) {
  const fullPath = path.join(postsDir, fileName);
  const postData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const slug = postData.slug || fileName.replace(/\.json$/, '');
  const imagePath = resolveImagePath(postData, slug);

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Missing image for ${slug}: ${imagePath}`);
  }

  const imageBuffer = fs.readFileSync(imagePath);
  const extension = path.extname(imagePath).replace('.', '').toLowerCase() || 'webp';
  const imageToken = crypto.randomUUID();
  const storagePath = `blog/posts/${slug}/${slug}.${extension}`;

  await bucket.file(storagePath).save(imageBuffer, {
    resumable: false,
    metadata: {
      contentType: getContentType(extension),
      metadata: {
        firebaseStorageDownloadTokens: imageToken,
      },
    },
  });

  const imageUrl = buildStorageDownloadUrl(bucket.name, storagePath, imageToken);

  await db.collection('blogPosts').doc(slug).set({
    slug,
    title: postData.title,
    excerpt: postData.excerpt,
    author: postData.author || 'Tamarron Services',
    date: postData.date || new Date().toISOString().split('T')[0],
    content: postData.content,
    image: imageUrl,
    imageUrl,
    imagePath: storagePath,
    imageToken,
    source: 'migration',
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  console.log(`Migrated ${slug}`);
}

console.log(`Done. Migrated ${postFiles.length} posts.`);
