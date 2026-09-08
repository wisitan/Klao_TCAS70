import React, { useState, useEffect } from 'react'
import { CheckSquare, Square, Sparkles, Heart, Award, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

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
    <div className="space-y-4">
      {/* Progress Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h2 className="font-bold text-base">Checklist เตรียมพอร์ตจิตวิทยา 70</h2>
          </div>
          <span className="text-xs font-semibold bg-white/20 px-2.5 py-0.5 rounded-full">
            {completedCount}/{defaultChecklist.length} สำเร็จ
          </span>
        </div>
        <p className="text-xs text-indigo-100 leading-relaxed mb-3">
          ติ๊กสิ่งที่เตรียมไว้แล้ว เพื่อตรวจเช็คความพร้อมก่อนยื่นสมัครจริง!
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5">
        {defaultChecklist.map((item) => {
          const isChecked = !!checkedItems[item.id]
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isChecked
                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-200'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 transition-transform active:scale-90"
              >
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 hover:text-indigo-400" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-slate-100 text-slate-600">
                    {item.category}
                  </span>
                </div>
                <h3
                  className={`text-xs font-bold leading-snug ${
                    isChecked ? 'line-through text-slate-500' : 'text-slate-800'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Special Advice Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>เคล็ดลับสำคัญสำหรับคนอยากเข้าจิตวิทยา:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed text-[11.5px] pl-1">
          <li><strong>อย่าเน้นแค่เกียรติบัตรวิชาการ:</strong> จิตวิทยาต้องการคนที่เข้าใจมนุษย์และมีความเมตตา การเล่าเรื่อง (Storytelling) เกี่ยวกับประสบการณ์รับฟังปัญหาเพื่อนหรือทำงานร่วมกับผู้อื่น จะจับใจกรรมการมากกว่า</li>
          <li><strong>ระวังเรื่องความลับผู้รับบริการ:</strong> หากมีกิจกรรมจิตอาสาปรึกษาปัญหา อย่าเปิดเผยชื่อ ข้อมูลส่วนตัว หรือภาพใบหน้าของบุคคลอื่นโดยไม่ได้รับอนุญาต</li>
          <li><strong>เตรียมพร้อมรอบสัมภาษณ์:</strong> คณะจิตวิทยามักเน้นการทดสอบ EQ, ทัศนคติ และความมั่นคงทางอารมณ์</li>
        </ul>
      </div>
    </div>
  )
}
