import React, { useState } from 'react'
import { Calendar, Clock, AlertCircle, Sparkles, ChevronRight } from 'lucide-react'

export default function TimelineCalendar() {
  const [timelineMode, setTimelineMode] = useState('port') // 'port' | 'quota'

  // Chronological events for Round 1 Portfolio
  const portTimeline = [
    {
      period: '18 ส.ค. – 16 ก.ย. 69',
      month: 'สิงหาคม 69',
      uni: 'มศว (SWU)',
      round: 'รอบ 1.1',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      dotColor: 'bg-rose-500',
      note: 'รับสมัครช่วงแรก (แนะนำเช็กกับคณะก่อนว่าจิตวิทยาเปิดรอบนี้ไหม)',
      isHighlight: false
    },
    {
      period: '20 ส.ค. – 8 ก.ย. 69',
      month: 'สิงหาคม 69',
      uni: 'ม.ศิลปากร (SU)',
      round: 'รอบพอร์ต ช่วงที่ 1',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      dotColor: 'bg-blue-500',
      note: 'หลักสูตรใหม่ รอติดตามประกาศยืนยันจากคณะโดยตรง',
      isHighlight: false
    },
    {
      period: '14 ก.ย. – 16 ธ.ค. 69',
      month: 'กันยายน 69',
      uni: 'ม.ธรรมศาสตร์ (TU)',
      round: 'รอบที่ 1 Portfolio',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      dotColor: 'bg-amber-500',
      note: 'เปิดรับยาวตลอด 3 เดือน! (ปิดรับ 16 ธ.ค. เวลา 15.00 น.)',
      isHighlight: true
    },
    {
      period: '18 ก.ย. – 14 ต.ค. 69',
      month: 'กันยายน 69',
      uni: 'ม.เกษตรศาสตร์ (KU)',
      round: 'รอบ 1.1',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-500',
      note: 'รอบ 1.1 ของมหาวิทยาลัย (แต่สาขาจิตวิทยาเปิดเฉพาะรอบ 1.2)',
      isHighlight: false
    },
    {
      period: '20 ต.ค. – 16 พ.ย. 69',
      month: 'ตุลาคม 69',
      uni: 'ม.ศิลปากร (SU)',
      round: 'รอบพอร์ต ช่วงที่ 2',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      dotColor: 'bg-blue-500',
      note: 'ช่วงที่ 2 ของ ม.ศิลปากร (ติดตามประกาศสาขาจิตวิทยา)',
      isHighlight: false
    },
    {
      period: '1 – 16 ธ.ค. 69',
      month: 'ธันวาคม 69',
      uni: 'มศว (SWU)',
      round: 'รอบ 1.2',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      dotColor: 'bg-rose-600',
      note: '⭐ จิตวิทยา มศว เปิดรอบนี้! รับ 18 คน (ส่งผ่าน TCASFolio เท่านั้น)',
      isHighlight: true
    },
    {
      period: '4 ม.ค. – 4 ก.พ. 70',
      month: 'มกราคม 70',
      uni: 'ม.เกษตรศาสตร์ (KU)',
      round: 'รอบ 1.2',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      dotColor: 'bg-emerald-600',
      note: '⭐ จิตวิทยา มก. เปิดรอบนี้! รับ 24 คน (4 แขนงวิชาเอก)',
      isHighlight: true
    }
  ]

  // Chronological events for Round 2 Quota
  const quotaTimeline = [
    {
      period: '13 มี.ค. 2570',
      uni: 'ม.ธรรมศาสตร์ (TU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      dotColor: 'bg-amber-500',
      note: 'วันรับสมัคร / ยื่นโควต้า มธ.'
    },
    {
      period: '15 – 22 มี.ค. 2570',
      uni: 'ม.เกษตรศาสตร์ (KU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      dotColor: 'bg-emerald-600',
      note: 'วันรับสมัครรอบโควต้า ม.เกษตรศาสตร์'
    },
    {
      period: '15 – 30 มี.ค. 2570',
      uni: 'มศว (SWU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      dotColor: 'bg-rose-600',
      note: 'วันรับสมัครรอบโควต้า มหาวิทยาลัยศรีนครินทรวิโรฒ'
    },
    {
      period: '16 – 30 มี.ค. 2570',
      uni: 'ม.ศิลปากร (SU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      dotColor: 'bg-blue-500',
      note: 'วันรับสมัครรอบโควต้า มหาวิทยาลัยศิลปากร'
    }
  ]

  const activeEvents = timelineMode === 'port' ? portTimeline : quotaTimeline

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4 mb-6">
      {/* Header with Title & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              ปฏิทินไทม์ไลน์การรับสมัคร
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              ภาพรวมเรียงตามวันเปิด-ปิดรับสมัคร ไม่พลาดวันสำคัญ
            </p>
          </div>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setTimelineMode('port')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              timelineMode === 'port'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            รอบ 1 Portfolio (ส.ค. 69 - ก.พ. 70)
          </button>
          <button
            onClick={() => setTimelineMode('quota')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              timelineMode === 'quota'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            รอบ 2 โควต้า (มี.ค. 70)
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-4 sm:pl-6 space-y-4 before:absolute before:left-1.5 sm:before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {activeEvents.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[19px] sm:-left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ring-2 ring-slate-100 ${item.dotColor}`}
            ></div>

            {/* Event Content Card */}
            <div
              className={`p-3.5 rounded-xl border transition-all ${
                item.isHighlight
                  ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  {item.period}
                </span>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}
                  >
                    {item.uni}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    {item.round}
                  </span>
                </div>
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  item.isHighlight
                    ? 'text-amber-950 font-medium'
                    : 'text-slate-600'
                }`}
              >
                {item.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 flex items-start gap-2 text-xs sm:text-sm text-indigo-900 leading-relaxed">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <span>
          <strong>คำแนะนำสำคัญ:</strong> สำหรับ <strong>มศว</strong> และ <strong>ม.เกษตรฯ</strong> ให้เตรียมตัวยื่นใน <strong>รอบ 1.2 (ธ.ค. 69 และ ม.ค. 70)</strong> ซึ่งเป็นรอบที่เปิดรับจิตวิทยาโดยเฉพาะค่ะ
        </span>
      </div>
    </div>
  )
}
