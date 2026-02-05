Firebase setup (สรุปขั้นตอนการสร้างโปรเจคและเชื่อมต่อเว็บ)

1) สร้าง Firebase Project
- ไปที่: https://console.firebase.google.com/
- กด "Add project" → ตั้งชื่อโปรเจค → ตกลงตามขั้นตอน

2) เพิ่ม Web App
- ในหน้า Project Overview กดลูกศรด้านขวา "Add app" → เลือก Web
- ตั้งชื่อแอป (เช่น "student-council-web") → กด Register app
- จะได้ Firebase config (object) และค่า `databaseURL` สำหรับ Realtime Database

3) เปิดใช้งาน Realtime Database
- ในเมนูซ้ายเลือก "Realtime Database" → สร้างฐานข้อมูล (เลือกโหมดทดสอบหรือ Production ตามต้องการ)

4) ตั้งค่า environment variables ในโปรเจค Next.js
- สร้างไฟล์ `.env.local` ที่รากโปรเจค และใส่ค่านี้ (ตัวอย่าง):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

5) รีสตาร์ท dev server
- หากกำลังรัน `npm run dev` ให้หยุดแล้วเริ่มใหม่ เพื่อให้ Next.js โหลด env ใหม่

6) ตรวจสอบ
- หน้า `Admin` (/admin) จะอ่านข้อความจาก Realtime Database
- widget แชทจะเก็บข้อความลง Firebase หากตั้งค่าไว้ มิฉะนั้นจะใช้ localStorage

หมายเหตุ: อย่าเผย `.env.local` ในที่สาธารณะ (เพิ่มใน `.gitignore` แล้ว)
