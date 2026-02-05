// ======================================================================
// Firebase Configuration File
// ======================================================================
// ไฟล์นี้ใช้สำหรับกำหนดการเชื่อมต่อ Firebase Realtime Database
// ทำให้แอพสามารถเก็บข้อมูลแชท ข้าวสาร และข้อมูลอื่นๆได้
//
// วิธีการตั้ง Firebase:
// 1. ไปที่ https://firebase.google.com
// 2. สร้าง Realtime Database ใหม่
// 3. Copy ค่า config ลงมาแทนที่ค่าด้านล่าง
// ======================================================================


// This file supports two modes:
// 1) If the environment variables for Firebase are provided (NEXT_PUBLIC_FIREBASE_API_KEY etc.),
//    initialize Firebase and export `db` and `auth`.
// 2) If not provided, export `db = null` and `auth = null` so the app can fall back to localStorage.

// Read config from environment variables (recommended for Next.js)
const nextApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const nextAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const nextDatabaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
const nextProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const nextStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const nextMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const nextAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

// Exported variables (will be null when Firebase not configured)
let db: any = null;
let auth: any = null;

// If API key provided, initialize Firebase at runtime (using require to avoid SSR import errors)
if (nextApiKey) {
  try {
    // Dynamically require Firebase modules only when needed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { initializeApp } = require('firebase/app');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getDatabase } = require('firebase/database');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAuth } = require('firebase/auth');

    const firebaseConfig = {
      apiKey: nextApiKey,
      authDomain: nextAuthDomain,
      databaseURL: nextDatabaseURL,
      projectId: nextProjectId,
      storageBucket: nextStorageBucket,
      messagingSenderId: nextMessagingSenderId,
      appId: nextAppId,
    };

    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    auth = getAuth(app);
  } catch (err) {
    // Fallback: leave db/auth as null and log error
    // Console.error kept intentionally to help debugging in dev environments
    // eslint-disable-next-line no-console
    console.error('Failed to initialize Firebase at runtime:', err);
    db = null;
    auth = null;
  }
}

export { db, auth };

export default null;
