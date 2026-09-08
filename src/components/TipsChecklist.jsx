import React, { useState, useEffect } from 'react'
import { Square, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function TipsChecklist() {
  const defaultChecklist = [
    {
      id: 'empathy',
      category: 'กิจกรรมเด่น',
      title: 'กิจกรรมที่เน้นการรับฟัง (Empathy) & จิตอาสาช่วยเหลือสังคม',
      desc: 'จิตวิทยาให้ความสำคัญกับทักษะการฟังผู้อื่นอย่างลึกซึ้ง กิจกรรมค่ายสุขภาพจิต, สายด่วนรับฟัง, ช่วยเหลือผู้ป่วยหรือชุมชน จะเป็นแต้มต่อสูงมาก'
    },
    {
      id: 'mooc',
      category: 'วิชาการ & ทักษะ',
      title: 'ใบประกาศนียบัตรคอร์สออนไลน์สุขภาพจิต / จิตวิทยา',
      desc: 'เรียนผ่าน ThaiMOOC, Chula MOOC, หรือ Coursera (เช่น Introduction to Psychology, Psychological First Aid) เพื่อยืนยันความตั้งใจจริง'
    },
    {
      id: 'sop',
      category: 'เรียงความ',
      title: 'เตรียมคำตอบเรียงความ SOP (เป้าหมายและเหตุผลในการเรียน)',
      desc: 'เช่น ของ มศว มีคำถามเพิ่มเติมชัดเจน: "เหตุผลและเป้าหมายในการเข้าศึกษาด้านจิตวิทยาของท่านคืออะไร?" (ตอบไม่เกิน 2,000 ตัวอักษร + รูปภาพ)'
    },
    {
      id: 'tcasfolio',
      category: 'รูปแบบไฟล์',
      title: 'ศึกษาระบบ TCASFolio (mytcas.com)',
      desc: 'มศว กำหนดส่งผ่าน TCASFolio เท่านั้น (ไม่รับไฟล์พอร์ตแบบอื่น) คัดเลือกผลงานที่ดีที่สุดไม่เกิน 10 ผลงาน รวมไม่เกิน 20 หน้า'
    },
    {
      id: 'page_limit',
      category: 'รูปแบบไฟล์',
      title: 'คุมจำนวนหน้าพอร์ตไม่เกิน 10 หน้า A4 (สำหรับ มก. และ มธ.)',
      desc: 'ม.เกษตร และ มธ. ส่วนใหญ่กำหนดความยาวเนื้อหาไม่เกิน 10 หน้า A4 (ไม่รวมปก/คำนำ/สารบัญ) ต้องสรุปให้กระชับ โดนใจ'
    },
    {
      id: 'recommendation',
      category: 'เอกสารรับรอง',
      title: 'หนังสือรับรองผลงานด้านสังคม 1 ปี (สำหรับ ม.เกษตร)',
      desc: 'ม.เกษตร กำหนดผลงานด้านการศึกษา/สังคมไม่น้อยกว่า 1 ปี พร้อมหนังสือรับรองจากผู้นำท้องถิ่น (ระดับตำบล/อำเภอ/จังหวัด)'
    },
    {
      id: 'gpax_check',
      category: 'คุณสมบัติ',
      title: 'ตรวจสอบ GPAX 5 ภาคเรียน',
      desc: 'มศว กำหนด 2.50 ขึ้นไป, ม.เกษตร กำหนด 3.00 ขึ้นไป, มธ. และ มศก. ให้รอประกาศเกณฑ์ฉบับเต็ม'
    }
  ]

  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tcas70_psy_checklist')
      return saved ? JSON.parse(saved) : {}
    } catch (e) {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('tcas70_psy_checklist', JSON.stringify(checkedItems))
    } catch (e) {}
  }, [checkedItems])

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const completedCount = Object.values(checkedItems).filter(Boolean).length
  const progressPercent = Math.round((completedCount / defaultChecklist.length) * 100)

  return (
    <div className="space-y-5">
      {/* Progress Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl p-5 sm:p-6 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <h2 className="font-extrabold text-lg sm:text-xl">Checklist เตรียมพอร์ตจิตวิทยา 70</h2>
          </div>
          <span className="text-xs sm:text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
            {completedCount}/{defaultChecklist.length} สำเร็จ
          </span>
        </div>
        <p className="text-sm sm:text-base text-indigo-100 leading-relaxed mb-4">
          ติ๊กสิ่งที่เตรียมไว้แล้ว เพื่อตรวจเช็คความพร้อมก่อนยื่นสมัครจริง!
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
          <div
            className="bg-amber-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {defaultChecklist.map((item) => {
          const isChecked = !!checkedItems[item.id]
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isChecked
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-300'
              }`}
            >
              <button
                type="button"
                className="mt-1 shrink-0 transition-transform active:scale-90"
              >
                {isChecked ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-900" />
                ) : (
                  <Square className="w-6 h-6 text-slate-400 dark:text-slate-500 hover:text-indigo-500" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                </div>
                <h3
                  className={`text-base sm:text-lg font-bold leading-snug ${
                    isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Special Advice Alert */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/70 rounded-3xl p-5 sm:p-6 text-sm sm:text-base space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200 text-base sm:text-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>เคล็ดลับสำคัญสำหรับคนอยากเข้าจิตวิทยา:</span>
        </div>
        <ul className="list-disc list-inside space-y-2 text-slate-800 dark:text-slate-200 leading-relaxed pl-1">
          <li><strong>อย่าเน้นแค่เกียรติบัตรวิชาการ:</strong> จิตวิทยาต้องการคนที่เข้าใจมนุษย์และมีความเมตตา การเล่าเรื่อง (Storytelling) เกี่ยวกับประสบการณ์รับฟังปัญหาเพื่อนหรือทำงานร่วมกับผู้อื่น จะจับใจกรรมการมากกว่า</li>
          <li><strong>ระวังเรื่องความลับผู้รับบริการ:</strong> หากมีกิจกรรมจิตอาสาปรึกษาปัญหา อย่าเปิดเผยชื่อ ข้อมูลส่วนตัว หรือภาพใบหน้าของบุคคลอื่นโดยไม่ได้รับอนุญาต</li>
          <li><strong>เตรียมพร้อมรอบสัมภาษณ์:</strong> คณะจิตวิทยามักเน้นการทดสอบ EQ, ทัศนคติ และความมั่นคงทางอารมณ์</li>
        </ul>
      </div>
    </div>
  )
}
