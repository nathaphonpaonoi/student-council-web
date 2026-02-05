"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref as dbRef, onValue, off, remove } from "firebase/database";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  senderName?: string;
  userAccount?: string; // username ถ้าเข้าสู่ระบบ
}

const ADMIN_USERNAME = "admin01";
const ADMIN_PASSWORD = "PPT-69..Guitar";

export default function AdminMessagesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const LOCAL_KEY = "local_chat_messages";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginUsername === ADMIN_USERNAME &&
      loginPassword === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setLoginPassword("");
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      setLoginPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    if (db) {
      const chatRef = dbRef(db, "chat/messages");
      onValue(chatRef, (snapshot) => {
        const arr: Message[] = [];
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach((key) => {
            arr.push({
              id: key,
              text: data[key].text,
              sender: data[key].sender,
              timestamp: new Date(data[key].timestamp),
              senderName: data[key].senderName,
              userAccount: data[key].userAccount,
            });
          });
        }
        arr.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        setMessages(arr);
      });
      return () => off(chatRef as any);
    }

    // localStorage fallback
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const msgs: Message[] = arr.map((m: any) => ({
        id: m.id,
        text: m.text,
        sender: m.sender,
        timestamp: new Date(m.timestamp),
        senderName: m.senderName,
        userAccount: m.userAccount,
      }));
      msgs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      setMessages(msgs);
    } catch (err) {
      console.error("Failed to load local messages", err);
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_KEY) {
        try {
          const arr = e.newValue ? JSON.parse(e.newValue) : [];
          const msgs: Message[] = arr.map((m: any) => ({
            id: m.id,
            text: m.text,
            sender: m.sender,
            timestamp: new Date(m.timestamp),
            senderName: m.senderName,
            userAccount: m.userAccount,
          }));
          msgs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
          setMessages(msgs);
        } catch (err) {
          console.error("Failed to parse storage event", err);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isAuthenticated]);

  const handleDelete = async (id: string) => {
    if (db) {
      try {
        const itemRef = dbRef(db, `chat/messages/${id}`);
        await remove(itemRef);
      } catch (err) {
        console.error("Failed to remove message", err);
      }
    } else {
      try {
        const raw = localStorage.getItem(LOCAL_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        const filtered = arr.filter((m: any) => m.id !== id);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered));
        const msgs: Message[] = filtered.map((m: any) => ({
          id: m.id,
          text: m.text,
          sender: m.sender,
          timestamp: new Date(m.timestamp),
          senderName: m.senderName,
        }));
        setMessages(msgs);
      } catch (err) {
        console.error("Failed to delete local message", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!isAuthenticated ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center">🔐 Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  ชื่อผู้ใช้
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin01"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Admin: ข้อความแชท</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              ออกจากระบบ
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {db
              ? "เชื่อมต่อกับ Firebase (อ่าน/ลบข้อความได้)"
              : "ไม่ได้ตั้งค่า Firebase — กำลังอ่านจาก localStorage"}
          </p>

          {messages.length === 0 ? (
            <div className="text-gray-500">ยังไม่มีข้อความ</div>
          ) : (
            <div className="space-y-3">
              {messages
                .slice()
                .reverse()
                .map((m) => (
                  <div
                    key={m.id}
                    className="border rounded p-3 bg-white shadow-sm flex justify-between items-start"
                  >
                    <div>
                      <div className="text-sm text-gray-700 mb-1">{m.text}</div>
                      <div className="text-xs text-gray-500">
                        {m.senderName ? `${m.senderName} • ` : ""}
                        {m.userAccount ? (
                          <>
                            <span className="font-medium text-blue-600">👤 {m.userAccount}</span> •{' '}
                          </>
                        ) : (
                          <>
                            <span className="text-gray-400">ไม่ระบุตัวตน</span> •{' '}
                          </>
                        )}
                        {m.timestamp.toLocaleString('th-TH', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
