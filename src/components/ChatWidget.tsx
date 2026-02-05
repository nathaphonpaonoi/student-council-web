/**
 * ======================================================================
 * Chat Widget Component - ระบบแชทติดต่อแอดมิน
 * ======================================================================
 * Component นี้แสดงปุ่มแชทลอยตัวที่มุมขวาล่างของหน้า
 * ใช้เพื่อให้ผู้ใช้สามารถติดต่อกับแอดมินเก็บเลยทันที
 * 
 * Features:
 * - Open/Close แบบ Toggle
 * - ส่งและรับข้อความ Real-time จาก Firebase
 * - บันทึกข้อมูลลง Firebase Realtime Database
 * - Auto-scroll ไปยังข้อความล่าสุด
 * - Anonymous หรือ Logged-in mode
 * - Responsive Design
 * 
 * ⚠️ ต้องตั้ง Firebase config ใน src/lib/firebase.ts ก่อน
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { ref, push, onValue, off } from 'firebase/database';
import { useAuth } from '@/context/AuthContext';

// ประเภทข้อมูล Message ที่เก็บไว้ใน Firebase
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin'; // ส่วนตัว หรือ แอดมิน
  timestamp: Date;
  senderName?: string; // ชื่อของผู้ส่งข้อความ (optional)
  userAccount?: string; // username/email ถ้าใช้บัญชี
}

// ===== MAIN COMPONENT =====
export default function ChatWidget() {
  // ===== STATE การจัดการแชท =====
  const [isOpen, setIsOpen] = useState(false); // เปิด/ปิด widget
  const [messages, setMessages] = useState<Message[]>([]); // เก็บข้อความทั้งหมด
  const [inputValue, setInputValue] = useState(''); // ข้อความที่พิมพ์
  const [isLoading, setIsLoading] = useState(false); // สถานะการส่งข้อมูล
  const [userName, setUserName] = useState('ผู้เยี่ยมชม'); // ชื่อผู้ใช้
  const [isAnonymous, setIsAnonymous] = useState(true); // โหมด: ไม่ระบุตัวตน หรือ ใช้บัญชี
  const messagesEndRef = useRef<HTMLDivElement>(null); // สำหรับ scroll ไปข้อความล่าสุด
  const { currentUser, isLoggedIn } = useAuth();

  // ===== EFFECT สำหรับ FIREBASE SYNC หรือ localStorage fall-back =====
  useEffect(() => {
    // Update userName ถ้าผู้ใช้เข้าสู่ระบบ
    if (isLoggedIn && currentUser) {
      setUserName(currentUser.username);
      setIsAnonymous(false); // Default to logged-in mode if user is logged in
    } else {
      setUserName('ผู้เยี่ยมชม');
      setIsAnonymous(true);
    }

    const LOCAL_KEY = 'local_chat_messages';

    // If Firebase DB is configured, use it for real-time sync.
    if (db) {
      const chatRef = ref(db, 'chat/messages');

      onValue(
        chatRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const messagesArray: Message[] = [];

            Object.keys(data).forEach((key) => {
              messagesArray.push({
                id: key,
                text: data[key].text,
                sender: data[key].sender,
                timestamp: new Date(data[key].timestamp),
                senderName: data[key].senderName,
                userAccount: data[key].userAccount,
              });
            });

            messagesArray.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
            setMessages(messagesArray);
          }
        },
        (error) => {
          console.error('Error reading messages:', error);
        }
      );

      return () => {
        off(chatRef as any);
      };
    }

    // Fallback: use localStorage to store messages when Firebase not configured
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const messagesArray: Message[] = arr.map((m: any) => ({
        id: m.id,
        text: m.text,
        sender: m.sender,
        timestamp: new Date(m.timestamp),
        senderName: m.senderName,
        userAccount: m.userAccount,
      }));
      setMessages(messagesArray);
    } catch (err) {
      console.error('Failed to load local messages', err);
    }

    // Sync across tabs/windows using storage event
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_KEY) {
        try {
          const arr = e.newValue ? JSON.parse(e.newValue) : [];
          const messagesArray: Message[] = arr.map((m: any) => ({
            id: m.id,
            text: m.text,
            sender: m.sender,
            timestamp: new Date(m.timestamp),
            senderName: m.senderName,
            userAccount: m.userAccount,
          }));
          setMessages(messagesArray);
        } catch (err) {
          console.error('Failed to parse storage event', err);
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [isLoggedIn, currentUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ===== EFFECT สำหรับ AUTO-SCROLL =====
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ===== ฟังก์ชันส่งข้อความ =====
  const handleSendMessage = async () => {
    // ตรวจสอบว่ามีข้อความไหม
    if (!inputValue.trim()) return;
    // ถ้ามี Firebase => ส่งไปยัง DB, ถ้าไม่มีก็ใช้ localStorage เป็น fallback
    setIsLoading(true);
    const LOCAL_KEY = 'local_chat_messages';

    try {
      const messageData = {
        text: inputValue,
        sender: 'user' as const,
        senderName: userName,
        userAccount: isAnonymous ? undefined : currentUser?.username,
        timestamp: new Date().toISOString(),
      };

      if (db) {
        const chatRef = ref(db, 'chat/messages');
        await push(chatRef, messageData);
      } else {
        // Local fallback: อ่านจาก localStorage -> เพิ่ม -> เขียนกลับ
        try {
          const raw = localStorage.getItem(LOCAL_KEY);
          const arr = raw ? JSON.parse(raw) : [];
          const newMsg = {
            id: Date.now().toString(),
            ...messageData,
          };
          arr.push(newMsg);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));

          // อัปเดต state ทันทีเพื่อให้ UI แสดง
          setMessages((prev) => [
            ...prev,
            {
              id: newMsg.id,
              text: newMsg.text,
              sender: 'user',
              timestamp: new Date(newMsg.timestamp),
              senderName: newMsg.senderName,
              userAccount: newMsg.userAccount,
            },
          ]);
        } catch (err) {
          console.error('Local storage error', err);
          throw err;
        }
      }

      // ล้าง input field
      setInputValue('');
      console.log('✓ ส่งข้อความสำเร็จ');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('ไม่สามารถส่งข้อความได้ กรุณาลองใหม่');
    } finally {
      setIsLoading(false);
    }
  };

  // ===== ฟังก์ชัน Keyboard Support =====
  const handleKeyPress = (e: React.KeyboardEvent) => {
    // ส่งข้อความเมื่อกด Enter
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ===== RENDER WIDGET =====
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* เมื่อ widget เปิด: แสดง Chat Box */}
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl w-full sm:w-96 h-screen sm:h-96 flex flex-col border-2 border-blue-500 max-w-[95vw] max-h-[90vh]">
          {/* ส่วนหัวของ Chat */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-md sticky top-0 z-10">
            <div className="flex justify-between items-start mb-2 gap-2">
              <div className="flex-1">
                <h3 className="font-bold text-lg">💬 แชท</h3>
                <p className="text-xs opacity-80">พรรคเพื่อเธอ</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {/* ปุ่มสลับโหมด (ถ้าเข้าสู่ระบบ) */}
                {isLoggedIn && (
                  <button
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className="text-white hover:text-blue-200 text-xs px-2 py-1 rounded bg-blue-700 hover:bg-blue-600 transition whitespace-nowrap"
                    title={isAnonymous ? "ใช้บัญชี" : "ไม่ระบุตัวตน"}
                  >
                    {isAnonymous ? '👤 ไม่ระบุ' : '✓ บัญชี'}
                  </button>
                )}
                {/* ปุ่มปิด Widget */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-200 text-2xl leading-none transition"
                  title="ปิดแชท"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* ส่วนแสดงข้อความ */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {/* แสดงข้อความที่บันทึก */}
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p className="text-2xl mb-2">💬</p>
                <p className="text-sm">ยังไม่มีข้อความ เริ่มการสนทนา!</p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm sm:text-base ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-300 text-black rounded-bl-none'
                  }`}
                >
                  {/* ชื่อผู้ส่ง (ถ้ามี) */}
                  {message.senderName && message.sender !== 'user' && (
                    <p className="text-xs font-bold mb-1 opacity-70">
                      {message.senderName}
                    </p>
                  )}
                  {/* ข้อความ */}
                  <p className="break-words">{message.text}</p>
                  {/* เวลา */}
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString('th-TH', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
                ))}
              </>
            )}
            {/* ส่วนสำหรับ auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* ส่วนป้อนข้อมูล */}
          <div className="border-t p-3 bg-white rounded-b-md space-y-2 sticky bottom-0 z-10">
            {/* ป้อนชื่อผู้ใช้ (แสดงเมื่อไม่ระบุตัวตน) */}
            {isAnonymous ? (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ชื่อของคุณ"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-black focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="text-sm text-gray-600 px-3 py-1">
                ✓ ส่งจาก: <span className="font-medium">{currentUser?.username}</span>
              </div>
            )}
            {/* ป้อนข้อความ */}
            <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              placeholder="พิมพ์ข้อความ..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 disabled:bg-gray-100 text-black placeholder-gray-400"
            />
              {/* ปุ่มส่ง */}
            <button
              onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                title="ส่งข้อความ (Enter)"
            >
                {isLoading ? '⏳' : '✓'}
            </button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              💡 ข้อความจะบันทึกไว้ใน Firebase หากตั้งค่าไว้ มิฉะนั้นจะบันทึกไว้ในเครื่อง
            </p>
          </div>
        </div>
      ) : (
        /* เมื่อ widget ปิด: แสดง Floating Button */
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition text-3xl hover:scale-110 duration-300"
          title="เปิดแชท"
        >
          💬
        </button>
      )}
    </div>
  );
}
