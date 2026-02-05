'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      title: 'อีเมล',
      value: 'contact.partypeuathoe@gmail.com',
      icon: '📧',
      description: 'ส่งอีเมลติดต่อเรา',
    },
    {
      title: 'โทรศัพท์',
      value: '02-xxx-xxxx',
      icon: '📞',
      description: 'โทรติดต่อเราตรง',
    },
    {
      title: 'Instragram Official',
      value: '@tungpho_2.1',
      icon: '💬',
      description: 'เพิ่มเพื่อนและติดต่อเรา',
    },
    {
      title: 'มาเยี่ยมเรา',
      value: 'อาคาร 2 ชั้น 2 ห้อง 2/1',
      icon: '📍',
      description: 'มาพบเราโดยตรง',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">📨 ติดต่อเรา</h1>
          <p className="text-xl opacity-90">
            ติดต่อสภานักเรียนผ่านช่องทางต่างๆ
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Contact Methods */}
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            ✨ วิธีติดต่อเรา
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {method.title}
                </h3>
                <p className="text-red-600 font-bold text-lg mb-2">
                  {method.value}
                </p>
                <p className="text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              📝 แบบฟอร์มติดต่อ
            </h2>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                ✓ ส่งข้อความสำเร็จ! เราจะตอบกลับให้เร็วที่สุด
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    ชื่อ-นามสกุล <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="กรุณากรอกชื่อของคุณ"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    อีเมล <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                  placeholder="0X-XXXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  หัวเรื่อง <span className="text-red-600">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                >
                  <option value="">เลือกหัวเรื่อง</option>
                  <option value="complaint">ร้องขอ/แนะนำ</option>
                  <option value="question">คำถาม</option>
                  <option value="suggestion">ข้อเสนอแนะ</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  ข้อความ <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                  placeholder="กรุณากรอกข้อความของคุณ"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
              >
                ส่งข้อความ
              </button>
            </form>
          </div>

          {/* Location Map Info */}
          <div className="bg-red-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              🗺️ ที่ตั้งออฟฟิซ
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  <strong>โรงเรียน [ชุมชนบ้านทุ่งโพธิ์]</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  📍 ที่อยู่: อาคาร 2 ชั้น 2 ห้อง 2/1
                </p>
                <p className="text-gray-700 mb-2">
                  🕐 เวลาเปิด: วันจันทร์ - ศุกร์ เวลา 13:00 - 16:00 น.
                </p>
                <p className="text-gray-700">
                  📊 ปิดวันหยุดสถาบัน และ ปิดในสัปดาห์แรกของเดือน
                </p>
              </div>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-center text-gray-600">
                  🗺️ [แผนที่หรือตำแหน่ง]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
