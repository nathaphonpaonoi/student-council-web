/**
 * ======================================================================
 * หน้าแนะนำตัว (About Page)
 * ======================================================================
 * หน้านี้เป็นตัวแสดงข้อมูลเกี่ยวกับพรรคเพื่อเธอ
 * มีการแสดงประวัติย่อ ภารกิจ และผู้บริหาร
 * 
 * หน้านี้ปรากฏในเมนูนำทาง (Navigation) ที่ด้านบน
 */

export default function AboutPage() {
  // ข้อมูลผู้บริหารพรรค
  const leaders = [
    {
      role: 'ประธานพรรค',
      name: '[ชื่อ-นามสกุล]',
      icon: '👨‍💼',
      description: 'ผู้นำและมีวิสัยทัศน์หลัก',
    },
    {
      role: 'รองประธาน',
      name: '[ชื่อ-นามสกุล]',
      icon: '👩‍💼',
      description: 'ช่วยงานและรักษาการ',
    },
    {
      role: 'เลขาธิการ',
      name: '[ชื่อ-นามสกุล]',
      icon: '📋',
      description: 'ติดต่อประสานงานต่างๆ',
    },
    {
      role: 'เหรัญญิก',
      name: '[ชื่อ-นามสกุล]',
      icon: '💼',
      description: 'บริหารการเงินและทรัพยากร',
    },
  ];

  // ข้อมูลค่านิยมและภารกิจ
  const values = [
    {
      icon: '💪',
      title: 'ความเข้มแข็ง',
      description: 'ทำงานอย่างแข็งแกร่งและไม่ยอมแพ้',
    },
    {
      icon: '🤝',
      title: 'ความเป็นหนึ่งเดียว',
      description: 'ทำงานเป็นทีมและสนับสนุนกัน',
    },
    {
      icon: '🎯',
      title: 'ความรับผิดชอบ',
      description: 'ตั้งใจปฏิบัติหน้าที่ด้วยจริงใจ',
    },
    {
      icon: '✨',
      title: 'ความยุติธรรม',
      description: 'รักษาความเป็นธรรมต่อทุกคน',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ส่วนหัวพร้อม Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            🏛️ พรรคเพื่อเธอ
          </h1>
          <p className="text-2xl mb-6 font-semibold">
            Phak Phuea Thoe
          </p>
          <p className="text-lg opacity-90 mb-8">
            สภานักเรียนชุมชนบ้านทุ่งโพธิ์ ปีการศึกษา 2567-2568
          </p>
          <div className="text-5xl">💜</div>
        </div>
      </section>

      {/* ส่วนเกี่ยวกับ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            ℹ️ เกี่ยวกับพรรคเพื่อเธอ
          </h2>
          
          <div className="bg-white p-10 rounded-lg shadow-lg mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              พรรคเพื่อเธอเป็นสภานักเรียนที่จัดตั้งขึ้นเพื่อให้นักเรียนชุมชนบ้านทุ่งโพธิ์มีตัวแทนที่ดี
              และเป็นจุดศูนย์กลางในการร่วมมือด้านวิชาการ กิจกรรม และการบริหารงาน
            </p>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded">
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">🎯 ภารกิจหลัก</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>พัฒนาคุณภาพการศึกษาและสร้างสภาวะการเรียนที่ดี</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>ส่งเสริมกิจกรรมและกีฬาเพื่อพัฒนาศักยภาพนักเรียน</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>รักษาความสัมพันธ์ที่ดีระหว่างนักเรียน ครู และผู้บริหาร</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>สร้างสภาวะที่เป็นมิตรและปลอดภัยสำหรับทุกคน</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ส่วนค่านิยม */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            💎 ค่านิยมของเรา
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ส่วนผู้บริหาร */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            👥 ผู้บริหารพรรค
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition text-center"
              >
                <div className="text-6xl mb-4">{leader.icon}</div>
                <h3 className="text-lg font-bold text-indigo-600 mb-2">
                  {leader.role}
                </h3>
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  {leader.name}
                </p>
                <p className="text-gray-600 text-sm">{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ส่วนติดต่อ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            📞 ติดต่อพรรคเพื่อเธอ
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* ข้อมูลติดต่อ */}
            <div className="bg-indigo-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-600 mb-6">
                ช่องทางติดต่อ
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>📧 อีเมล:</strong>
                  <br />
                  contact.partypeuathoe@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>📱 Instagram:</strong>
                  <br />
                  @tungpho_2.1
                </p>
                <p className="text-gray-700">
                  <strong>🏫 โรงเรียน:</strong>
                  <br />
                  ชุมชนบ้านทุ่งโพธิ์
                </p>
                <p className="text-gray-700">
                  <strong>📍 ที่ตั้ง:</strong>
                  <br />
                  อาคารหลัก ชั้น 2 ห้อง 200
                </p>
              </div>
            </div>

            {/* ข้อมูลเพิ่มเติม */}
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-6">
                เวลาเปิด
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>🕐 วันจันทร์ - ศุกร์:</strong>
                  <br />
                  13:00 - 16:00 น.
                </p>
                <p className="text-gray-700">
                  <strong>🚫 ปิดทำการ:</strong>
                  <br />
                  วันหยุดสถาบัน<br />
                  สัปดาห์แรกของเดือน
                </p>
                <div className="bg-white p-4 rounded mt-4 border-l-4 border-purple-600">
                  <p className="text-purple-600 font-semibold">
                    💬 ใช้แชทได้ 24/7
                  </p>
                  <p className="text-sm text-gray-600">
                    สามารถส่งข้อความได้ตลอดเวลา
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ส่วน Footer */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-2">
            ✨ พรรคเพื่อเธอ - Phak Phuea Thoe ✨
          </p>
          <p className="opacity-80">
            ชุมชนบ้านทุ่งโพธิ์ - ปีการศึกษา 2567-2568
          </p>
          <p className="mt-4 opacity-60 text-sm">
            © 2568 สิทธิ์ทั้งหมดเป็นของพรรคเพื่อเธอ | ติดต่อ: contact.partypeuathoe@gmail.com
          </p>
        </div>
      </section>
    </main>
  );
}
