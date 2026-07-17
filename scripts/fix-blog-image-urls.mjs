import dotenv from 'dotenv';
import path from 'path';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
let serviceAccount;

if (rawJson) {
  const parsed = JSON.parse(rawJson);
  serviceAccount = {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: parsed.private_key.replace(/\\n/g, '\n'),
  };
} else {
  serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim(),
  };
}

const bucket = process.env.FIREBASE_STORAGE_BUCKET;
if (!bucket) {
  throw new Error('FIREBASE_STORAGE_BUCKET is not configured.');
}

const app = getApps()[0] ?? initializeApp({
  credential: cert(serviceAccount),
  storageBucket: bucket,
});

const db = getFirestore(app);
const snapshot = await db.collection('blogPosts').get();

for (const doc of snapshot.docs) {
  const data = doc.data();

  if (!data.imagePath || !data.imageToken) {
    console.log(`Skipped ${doc.id} (missing imagePath/imageToken)`);
    continue;
  }

  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(data.imagePath)}?alt=media&token=${data.imageToken}`;

  await doc.ref.set(
    {
      image: imageUrl,
      imageUrl,
    },
    { merge: true }
  );

  console.log(`Updated ${doc.id}`);
}

console.log('Done fixing blog image URLs.');
