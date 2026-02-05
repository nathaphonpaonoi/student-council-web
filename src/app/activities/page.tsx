// ======================================================================
// หน้าฝ่ายกิจกรรม - Activities Page
// แสดงกิจกรรมประจำปี ข้อมูล และช่องทางติดต่อ
// ======================================================================

/**
 * ======================================================================
 * หน้าฝ่ายกิจกรรม (Activities Page)
 * ======================================================================
 * หน้านี้แสดงกิจกรรมของพรรคและข้อมูลการติดต่อ
 */
export default function ActivitiesPage() {
  const events = [
    {
      title: 'สัปดาห์วิทยาศาสตร์',
      date: '2026-03-10 ถึง 2026-03-15',
      icon: '🔬',
      description: 'อบรม โครงการวิทยาศาสตร์ และแข่งขันต่างๆ',
    },
    {
      title: 'วันสฟท.',
      date: '2026-04-01',
      icon: '🎪',
      description: 'กิจกรรมเอกลักษณ์ของโรงเรียน มีการแสดง ประมงจำมูลค่า และการจัดแสดง',
    },
    {
      title: 'ค่ายคุณธรรม',
      date: '2026-05-20 ถึง 2026-05-22',
      icon: '⛺',
      description: 'ค่ายศึกษาเพื่อพัฒนาคุณธรรมจริยธรรมของนักเรียน',
    },
    {
      title: 'มหาวิทยาลัยติวสอบใจ',
      date: '2026-06-01',
      icon: '📖',
      description: 'ประชุมเตรียมสอบและปรึกษาการศึกษาต่อจากครูอาจารย์',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">🎉 ฝ่ายกิจกรรม</h1>
          <p className="text-xl opacity-90">
            หน่วยงานที่บริหารและจัดการกิจกรรมต่างๆ ของสภานักเรียน
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            📅 กิจกรรมประจำปี 2026
          </h2>

          <div className="space-y-6 mb-12">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-l-4 border-purple-600"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{event.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {event.title}
                        </h3>
                        <p className="text-purple-600 font-semibold">
                          📅 {event.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 ml-16">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Responsibilities */}
          <div className="bg-purple-50 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              ✨ ภารกิจหลักของฝ่าย
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>วางแผนและจัดการกิจกรรมสภานักเรียน</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>ประสานงานกับสาขาต่างๆ เพื่อบูรณาการกิจกรรม</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>ติดตามประเมินผลกิจกรรมและแนวทางพัฒนา</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold">✓</span>
                <span>รับสมัครและฝึกอบรมอาจารย์ที่ปรึกษา</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-purple-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              ✉️ ติดต่อฝ่ายกิจกรรม
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>ประธานฝ่ายกิจกรรม:</strong> เด็กชาย [ดุษฎีกร ขันแข็ง]
              </p>
              <p className="text-gray-700">
                <strong>เบอร์โทรศัพท์:</strong> 02-xxx-xxxx
              </p>
              <p className="text-gray-700">
                <strong>ตำแหน่งห้อง:</strong> อาคาร 2 ชั้น 2 ห้อง 2/1
              </p>
              <p className="text-gray-700">
                <strong>อีเมล:</strong> contact.partypeuathoe@gmail.com
              </p>
              <p className="text-gray-700 mt-6 italic text-purple-600">
                สามารถติดต่อเรื่องการสมัครและเสนอข้อมูลกิจกรรม ทุกวันจันทร์ - ศุกร์ เวลา 13:00 - 16:00 น.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
