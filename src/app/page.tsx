/**
 * ======================================================================
 * หน้าแรก (Home Page)
 * ======================================================================
 * หน้านี้เป็นหน้าแรกของเว็บไซต์พรรคเพื่อเธอ
 * แสดง:
 * - Banner ต้อนรับ
 * - ปุ่มนำไปยังแต่ละฝ่าย
 * - ข่าวสารประจำวัน
 * - ช่องทางติดต่อ
 * - ข้อมูล Footer
 */

import Link from 'next/link';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
}

interface ContactInfo {
  title: string;
  value: string;
  icon: string;
}

export default function Home() {
  const news: NewsItem[] = [
    {
      id: 1,
      title: 'ประชุมสภานักเรียนครั้งที่ 5',
      description: 'ประชุมเพื่อวางแผนกิจกรรมประจำเดือน เมษายน 2026',
      date: '2026-02-05',
      icon: '📢',
    },
    {
      id: 2,
      title: 'สัปดาห์วิทยาศาสตร์ประจำปี',
      description: 'รับสมัครอาจารย์ที่สนใจเป็นอาจารย์ที่ปรึกษา 500+ อาจารย์',
      date: '2026-02-04',
      icon: '🔬',
    },
    {
      id: 3,
      title: 'กิจกรรมอาสาสมัครเก็บขยะ',
      description: 'เชิญชวนนักเรียนทั้งหมดร่วมกิจกรรมอาสาสมัครเก็บขยะ',
      date: '2026-02-03',
      icon: '🌱',
    },
    {
      id: 4,
      title: 'บูธสภานักเรียน อาคารหลัก',
      description: 'ติดต่อเรื่องต่างๆ ได้ที่บูธสภานักเรียนทุกวันจันทร์-ศุกร์',
      date: '2026-02-01',
      icon: '🏫',
    },
  ];

  const contactInfo: ContactInfo[] = [
    { title: 'เบอร์โทรศัพท์', value: '02-XXXX-XXXX', icon: '📞' },
    { title: 'อีเมล', value: 'contact.partypeuathoe@gmail.com', icon: '📧' },
    { title: 'Instagram', value: '@tungpho_2.1', icon: '📱' },
    { title: 'ห้องที่ตั้ง', value: 'อาคารหลัก ชั้น 2 ห้อง 200', icon: '📍' },
  ];

  const departments = [
    { name: 'วิชาการ', path: '/academics', icon: '📚', color: 'blue' },
    { name: 'บัญชี', path: '/accounting', icon: '💰', color: 'green' },
    { name: 'กิจกรรม', path: '/activities', icon: '🎉', color: 'purple' },
    { name: 'ติดต่อเรา', path: '/contact', icon: '📨', color: 'red' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🏫 ยินดีต้อนรับสู่สภานักเรียน
          </h1>
          <p className="text-lg md:text-2xl mb-8 opacity-90">
            เว็บไซต์อย่างเป็นทางการสำหรับการติดต่อและข่าวสาร
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              ติดต่อเรา
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition">
              ดูข่าวสาร
            </button>
          </div>
        </div>
      </section>

      {/* Department Navigation */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            ✨ เยี่ยมชมแต่ละฝ่าย
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <Link key={index} href={dept.path}>
                <div
                  className={`bg-gradient-to-br from-${dept.color}-400 to-${dept.color}-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition cursor-pointer text-center`}
                >
                  <div className="text-5xl mb-3">{dept.icon}</div>
                  <h3 className="text-lg font-bold">{dept.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            📰 ข่าวสารประจำวัน
          </h2>
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-blue-600 bg-blue-50 p-6 rounded-r-lg hover:shadow-lg transition transform hover:translate-x-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-sm text-gray-500">
                      📅 {new Date(item.date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            📞 ช่องทางติดต่อ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactInfo.map((contact, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{contact.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{contact.title}</h3>
                <p className="text-gray-600 text-sm">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            ℹ️ เกี่ยวกับสภานักเรียน
          </h2>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            สภานักเรียนคือองค์กรตัวแทนของนักเรียนเพื่อพัฒนาคุณภาพการศึกษา กิจกรรมต่างๆ และการส่งเสริมคุณธรรมจริยธรรม
            เราทำงานอย่างเป็นอิสระและมีความรับผิดชอบต่อนักเรียนทั้งหมด
          </p>
          <p className="text-gray-600">
            หากมีข้อเสนอแนะหรือต้องการติดต่อเรา สามารถใช้ระบบแชทด้านล่างหรือติดต่อผ่านช่องทางที่กำหนด
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">
            © 2026 สภานักเรียน - Student Council | ทุกสิทธิ์สงวน
          </p>
          <p className="text-gray-400">
            ติดต่อเรา: contact.partypeuathoe@gmail.com | Instagram: @tungpho_2.1
          </p>
        </div>
      </footer>
    </main>
  );
}
