/**
 * Re-syncs a blog post's image URL in Firestore to match whatever file is
 * currently in Firebase Storage for that slug.
 *
 * Usage:
 *   node scripts/update-post-image.mjs <slug>
 *
 * Example:
 *   node scripts/update-post-image.mjs protect-your-home-this-summer-with-gutters-downspouts
 */

import path from 'path';
import dotenv from 'dotenv';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

const slug = process.argv[2]?.trim();
if (!slug) {
  console.error('Usage: node scripts/update-post-image.mjs <slug>');
  process.exit(1);
}

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
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key.replace(/\\n/g, '\n'),
    };
  }
  return {
    projectId: getEnvValue('FIREBASE_PROJECT_ID', 'GOOGLE_CLOUD_PROJECT'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim(),
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim(),
  };
}

function buildStorageDownloadUrl(bucketName, filePath, token) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media&token=${token}`;
}

const serviceAccount = parseServiceAccount();
const storageBucket = getEnvValue('FIREBASE_STORAGE_BUCKET');
const app = getApps()[0] ?? initializeApp({ credential: cert(serviceAccount), storageBucket });

const db = getFirestore(app);
const bucket = getStorage(app).bucket();

// Find the image file for this slug under blog/posts/<slug>/
const [files] = await bucket.getFiles({ prefix: `blog/posts/${slug}/` });

if (files.length === 0) {
  console.error(`No files found in Storage under blog/posts/${slug}/`);
  process.exit(1);
}

const file = files[0];
const [metadata] = await file.getMetadata();
const token = metadata.metadata?.firebaseStorageDownloadTokens;

if (!token) {
  console.error('File has no download token. Re-upload the file or generate a token in the Firebase console.');
  process.exit(1);
}

const imageUrl = buildStorageDownloadUrl(bucket.name, file.name, token);

await db.collection('blogPosts').doc(slug).update({
  image: imageUrl,
  imageUrl,
  imagePath: file.name,
  imageToken: token,
  updatedAt: FieldValue.serverTimestamp(),
});

console.log(`Updated Firestore for "${slug}"`);
console.log(`New image URL: ${imageUrl}`);
