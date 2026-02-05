/**
 * ======================================================================
 * หน้าฝ่ายบัญชี (Accounting Page)
 * ======================================================================
 * หน้านี้แสดงข้อมูลการเงินของสภานักเรียน
 * ประกอบด้วย:
 * - ภารกิจของฝ่าย
 * - สรุปทางการเงิน (รายรับ รายจ่าย ยอดคงเหลือ)
 * - ข้อมูลติดต่อ
 */

export default function AccountingPage() {
  const info = [
    {
      title: 'จัดการทรัพยากร',
      icon: '💼',
      description: 'บริหารและจัดการทรัพยากร งบประมาณ และสินทรัพย์ของสภานักเรียน',
    },
    {
      title: 'บัญชีและรายงาน',
      icon: '📊',
      description: 'จัดทำบัญชีรายรับ รายจ่าย และรายงานทางการเงิน',
    },
    {
      title: 'การตรวจสอบ',
      icon: '✅',
      description: 'ตรวจสอบความถูกต้องและความสมบูรณ์ของเอกสารทางการเงิน',
    },
    {
      title: 'ความโปร่งใส',
      icon: '👁️',
      description: 'เปิดเผยข้อมูลทางการเงินต่อนักเรียนอย่างสม่ำเสมอ',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">💰 ฝ่ายบัญชี</h1>
          <p className="text-xl opacity-90">
            หน่วยงานที่รับผิดชอบการบริหารการเงินของสภานักเรียน
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {info.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Financial Report */}
          <div className="bg-green-50 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              📈 สรุปทางการเงิน
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold text-green-600 mb-2">
                  รายรับทั้งหมด
                </h3>
                <p className="text-3xl font-bold text-gray-800">50,000 บาท</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold text-orange-600 mb-2">
                  รายจ่ายทั้งหมด
                </h3>
                <p className="text-3xl font-bold text-gray-800">35,000 บาท</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  ยอดคงเหลือ
                </h3>
                <p className="text-3xl font-bold text-gray-800">15,000 บาท</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-green-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              ✉️ ติดต่อฝ่ายบัญชี
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>ประธานฝ่ายบัญชี:</strong> เด็กชาย [อดิเทพ ทองไทย]
              </p>
              <p className="text-gray-700">
                <strong>เบอร์โทรศัพท์:</strong> 02-XXXX-XXXX
              </p>
              <p className="text-gray-700">
                <strong>ตำแหน่งห้อง:</strong> อาคาร 2 ชั้น 2 ห้อง 2/1
              </p>
              <p className="text-gray-700">
                <strong>อีเมล:</strong> contact.partypeuathoe@gmail.com
              </p>
              <p className="text-gray-700 mt-6 italic text-green-600">
                สามารถติดต่อและขอดูรายงานการเงิน ทุกวันจันทร์ - ศุกร์ เวลา 13:00 - 16:00 น.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
