import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

const rootDir = process.cwd();
const postsDir = path.join(rootDir, 'data/posts');

function getEnvValue(...keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
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

const app = getFirebaseApp();
const db = getFirestore(app);

const snapshot = await db.collection('blogPosts').orderBy('date', 'desc').get();

if (snapshot.empty) {
  console.log('No posts found in Firebase.');
  process.exit(0);
}

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

let count = 0;

for (const doc of snapshot.docs) {
  const data = doc.data();
  const slug = data.slug || doc.id;

  const post = {
    slug,
    title: data.title || slug,
    date: data.date || '',
    excerpt: data.excerpt || '',
    image: data.image || data.imageUrl || '/blog-placeholder.webp',
    content: data.content || '',
    author: data.author || 'Tamarron Services',
    ...(data.imagePath && { imagePath: data.imagePath }),
    ...(data.imageToken && { imageToken: data.imageToken }),
  };

  const filePath = path.join(postsDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + '\n', 'utf8');
  console.log(`Fetched: ${slug}`);
  count++;
}

console.log(`\nDone. Fetched ${count} post(s) to data/posts/`);
