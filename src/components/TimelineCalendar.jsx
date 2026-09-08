import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Sparkles,
  List,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export default function TimelineCalendar() {
  const [viewType, setViewType] = useState('list') // 'list' | 'month'
  const [timelineMode, setTimelineMode] = useState('port') // 'port' | 'quota' (for List view)
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(4) // default to 'ธ.ค. 69' (month index 4, highlight month!)

  // Chronological events for Round 1 Portfolio (List View)
  const portTimeline = [
    {
      period: '18 ส.ค. – 16 ก.ย. 69',
      month: 'สิงหาคม 69',
      uni: 'มศว (SWU)',
      round: 'รอบ 1.1',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
      dotColor: 'bg-rose-500',
      note: 'รับสมัครช่วงแรก (แนะนำเช็กกับคณะก่อนว่าจิตวิทยาเปิดรอบนี้ไหม)',
      isHighlight: false
    },
    {
      period: '20 ส.ค. – 8 ก.ย. 69',
      month: 'สิงหาคม 69',
      uni: 'ม.ศิลปากร (SU)',
      round: 'รอบพอร์ต ช่วงที่ 1',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
      dotColor: 'bg-blue-500',
      note: 'หลักสูตรใหม่ รอติดตามประกาศยืนยันจากคณะโดยตรง',
      isHighlight: false
    },
    {
      period: '14 ก.ย. – 16 ธ.ค. 69',
      month: 'กันยายน 69',
      uni: 'ม.ธรรมศาสตร์ (TU)',
      round: 'รอบที่ 1 Portfolio',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700',
      dotColor: 'bg-amber-500',
      note: 'เปิดรับยาวตลอด 3 เดือน! (ปิดรับ 16 ธ.ค. เวลา 15.00 น.)',
      isHighlight: true
    },
    {
      period: '18 ก.ย. – 14 ต.ค. 69',
      month: 'กันยายน 69',
      uni: 'ม.เกษตรศาสตร์ (KU)',
      round: 'รอบ 1.1',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
      dotColor: 'bg-emerald-500',
      note: 'รอบ 1.1 ของมหาวิทยาลัย (แต่สาขาจิตวิทยาเปิดเฉพาะรอบ 1.2)',
      isHighlight: false
    },
    {
      period: '20 ต.ค. – 16 พ.ย. 69',
      month: 'ตุลาคม 69',
      uni: 'ม.ศิลปากร (SU)',
      round: 'รอบพอร์ต ช่วงที่ 2',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
      dotColor: 'bg-blue-500',
      note: 'ช่วงที่ 2 ของ ม.ศิลปากร (ติดตามประกาศสาขาจิตวิทยา)',
      isHighlight: false
    },
    {
      period: '1 – 16 ธ.ค. 69',
      month: 'ธันวาคม 69',
      uni: 'มศว (SWU)',
      round: 'รอบ 1.2',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-700',
      dotColor: 'bg-rose-600',
      note: '⭐ จิตวิทยา มศว เปิดรอบนี้! รับ 18 คน (ส่งผ่าน TCASFolio เท่านั้น)',
      isHighlight: true
    },
    {
      period: '4 ม.ค. – 4 ก.พ. 70',
      month: 'มกราคม 70',
      uni: 'ม.เกษตรศาสตร์ (KU)',
      round: 'รอบ 1.2',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700',
      dotColor: 'bg-emerald-600',
      note: '⭐ จิตวิทยา มก. เปิดรอบนี้! รับ 24 คน (4 แขนงวิชาเอก)',
      isHighlight: true
    }
  ]

  // Chronological events for Round 2 Quota (List View)
  const quotaTimeline = [
    {
      period: '13 มี.ค. 2570',
      uni: 'ม.ธรรมศาสตร์ (TU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700',
      dotColor: 'bg-amber-500',
      note: 'วันรับสมัคร / ยื่นโควต้า มธ.'
    },
    {
      period: '15 – 22 มี.ค. 2570',
      uni: 'ม.เกษตรศาสตร์ (KU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700',
      dotColor: 'bg-emerald-600',
      note: 'วันรับสมัครรอบโควต้า ม.เกษตรศาสตร์'
    },
    {
      period: '15 – 30 มี.ค. 2570',
      uni: 'มศว (SWU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-700',
      dotColor: 'bg-rose-600',
      note: 'วันรับสมัครรอบโควต้า มหาวิทยาลัยศรีนครินทรวิโรฒ'
    },
    {
      period: '16 – 30 มี.ค. 2570',
      uni: 'ม.ศิลปากร (SU)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
      dotColor: 'bg-blue-500',
      note: 'วันรับสมัครรอบโควต้า มหาวิทยาลัยศิลปากร'
    }
  ]

  // Month-by-Month Structured Data for Month View
  const monthsData = [
    {
      id: 'aug-69',
      shortName: 'ส.ค. 69',
      fullName: 'สิงหาคม 2569',
      tag: 'เริ่มเปิดรับรอบพอร์ต',
      highlight: false,
      events: [
        {
          date: '18 ส.ค. 69',
          title: 'มศว (SWU) — เปิดรับสมัครรอบ 1.1',
          type: 'start',
          typeLabel: 'เริ่มรับสมัคร',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300',
          desc: 'เปิดรับสมัครรอบ 1.1 จนถึง 16 ก.ย. 69 (แนะนำเช็กกับคณะก่อนว่าจิตวิทยาเปิดรอบนี้ไหม)'
        },
        {
          date: '20 ส.ค. 69',
          title: 'ม.ศิลปากร (SU) — เปิดรับรอบพอร์ต ช่วงที่ 1',
          type: 'start',
          typeLabel: 'เริ่มรับสมัคร',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
          desc: 'เปิดรับช่วงที่ 1 ถึง 8 ก.ย. 69 (หลักสูตรใหม่ รอประกาศยืนยัน)'
        }
      ]
    },
    {
      id: 'sep-69',
      shortName: 'ก.ย. 69',
      fullName: 'กันยายน 2569',
      tag: 'เปิดรับยาว 3 สถาบัน',
      highlight: false,
      events: [
        {
          date: '8 ก.ย. 69',
          title: 'ม.ศิลปากร (SU) — ปิดรับช่วงที่ 1',
          type: 'end',
          typeLabel: 'ปิดรับสมัคร',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
          desc: 'วันสุดท้ายของการรับสมัครรอบพอร์ต ช่วงที่ 1'
        },
        {
          date: '14 ก.ย. 69',
          title: 'ม.ธรรมศาสตร์ (TU) — เริ่มรับสมัครรอบ 1 Portfolio',
          type: 'start',
          typeLabel: 'เริ่มรับสมัคร',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
          desc: 'เริ่มรับสมัครเวลา 09.00 น. เปิดรับยาวต่อเนื่อง 3 เดือน จนถึง 16 ธ.ค. 69!'
        },
        {
          date: '16 ก.ย. 69',
          title: 'มศว (SWU) — ปิดรับสมัครรอบ 1.1',
          type: 'end',
          typeLabel: 'ปิดรับสมัคร',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300',
          desc: 'วันสุดท้ายของการรับสมัครรอบ 1.1'
        },
        {
          date: '18 ก.ย. 69',
          title: 'ม.เกษตรศาสตร์ (KU) — เริ่มรับสมัครรอบ 1.1',
          type: 'start',
          typeLabel: 'เริ่มรับสมัคร',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300',
          desc: 'เปิดรับถึง 14 ต.ค. 69 (จิตวิทยาจะเปิดเฉพาะในรอบ 1.2 ม.ค. 70)'
        }
      ]
    },
    {
      id: 'oct-69',
      shortName: 'ต.ค. 69',
      fullName: 'ตุลาคม 2569',
      tag: 'ปิด 1.1 / ศิลปากร ช่วง 2',
      highlight: false,
      events: [
        {
          date: '14 ต.ค. 69',
          title: 'ม.เกษตรศาสตร์ (KU) — ปิดรับสมัครรอบ 1.1',
          type: 'end',
          typeLabel: 'ปิดรับสมัคร',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300',
          desc: 'สิ้นสุดการรับสมัครรอบ 1.1 ของ ม.เกษตรศาสตร์'
        },
        {
          date: '20 ต.ค. 69',
          title: 'ม.ศิลปากร (SU) — เริ่มรับสมัครรอบพอร์ต ช่วงที่ 2',
          type: 'start',
          typeLabel: 'เริ่มรับสมัคร',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
          desc: 'เปิดรับช่วงที่ 2 ถึง 16 พ.ย. 69'
        },
        {
          date: 'ตลอดเดือน',
          title: 'ม.ธรรมศาสตร์ (TU) — ยังเปิดรับสมัครต่อเนื่อง',
          type: 'ongoing',
          typeLabel: 'เปิดรับต่อเนื่อง',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
          desc: 'ยังคงเปิดรับสมัครโครงการรับตรง รอบที่ 1 Portfolio'
        }
      ]
    },
    {
      id: 'nov-69',
      shortName: 'พ.ย. 69',
      fullName: 'พฤศจิกายน 2569',
      tag: 'ปิดรับศิลปากร ช่วง 2',
      highlight: false,
      events: [
        {
          date: '16 พ.ย. 69',
          title: 'ม.ศิลปากร (SU) — ปิดรับสมัครรอบพอร์ต ช่วงที่ 2',
          type: 'end',
          typeLabel: 'ปิดรับสมัคร',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
          desc: 'วันสุดท้ายของการรับสมัครรอบพอร์ต ช่วงที่ 2 ของ ม.ศิลปากร'
        },
        {
          date: 'ตลอดเดือน',
          title: 'ม.ธรรมศาสตร์ (TU) — โค้งสุดท้ายก่อนปิดรับเดือนหน้า',
          type: 'ongoing',
          typeLabel: 'เปิดรับต่อเนื่อง',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
          desc: 'เตรียมเล่มพอร์ต 10 หน้าให้พร้อม ปิดรับสมัครกลางเดือน ธ.ค.'
        }
      ]
    },
    {
      id: 'dec-69',
      shortName: 'ธ.ค. 69',
      fullName: 'ธันวาคม 2569',
      tag: '🔥 เดือนสำคัญ: มศว & มธ.',
      highlight: true,
      events: [
        {
          date: '1 – 16 ธ.ค. 69',
          title: '⭐ มศว (SWU) — เปิดรับรอบ 1.2 (จิตวิทยาเปิดรอบนี้!)',
          type: 'highlight',
          typeLabel: 'เปิดรับจิตวิทยา 18 คน',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200',
          desc: 'จิตวิทยา มศว เปิดรับรอบ 1.2 รับ 18 คน กำหนดส่งผ่านระบบ TCASFolio เท่านั้น ไม่เกิน 20 หน้า'
        },
        {
          date: '16 ธ.ค. 69',
          title: 'ม.ธรรมศาสตร์ (TU) — ปิดรับสมัครรอบ 1 (15.00 น.)',
          type: 'end',
          typeLabel: 'ปิดรับสมัคร 15.00 น.',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
          desc: 'วันสุดท้ายของการรับสมัครโครงการรับตรง รอบที่ 1 Portfolio ระบบปิด 15.00 น. ตรง'
        }
      ]
    },
    {
      id: 'jan-70',
      shortName: 'ม.ค. 70',
      fullName: 'มกราคม 2570',
      tag: '🔥 เดือนสำคัญ: ม.เกษตรฯ',
      highlight: true,
      events: [
        {
          date: '4 ม.ค. 70',
          title: '⭐ ม.เกษตรศาสตร์ (KU) — เริ่มรับสมัครรอบ 1.2',
          type: 'highlight',
          typeLabel: 'เปิดรับจิตวิทยา 24 คน',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200',
          desc: 'จิตวิทยา มก. เปิดรับเฉพาะรอบ 1.2! เปิดรับ 4 วิชาเอก รวม 24 คน (พอร์ตไม่เกิน 10 หน้า A4)'
        }
      ]
    },
    {
      id: 'feb-70',
      shortName: 'ก.พ. 70',
      fullName: 'กุมภาพันธ์ 2570',
      tag: 'ปิดรับสมัครรอบ 1 มก.',
      highlight: false,
      events: [
        {
          date: '4 ก.พ. 70',
          title: 'ม.เกษตรศาสตร์ (KU) — ปิดรับสมัครรอบ 1.2',
          type: 'end',
          typeLabel: 'ปิดรับสมัคร',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200',
          desc: 'สิ้นสุดการรับสมัครรอบที่ 1.2 สิ้นสุดการรับสมัครรอบ Portfolio ทั้งหมด'
        }
      ]
    },
    {
      id: 'mar-70',
      shortName: 'มี.ค. 70',
      fullName: 'มีนาคม 2570',
      tag: '🎯 รอบที่ 2 โควต้า',
      highlight: false,
      events: [
        {
          date: '13 มี.ค. 70',
          title: 'ม.ธรรมศาสตร์ (TU) — รอบโควต้า',
          type: 'quota',
          typeLabel: 'รอบโควต้า',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
          desc: 'กำหนดการรอบโควต้า ม.ธรรมศาสตร์'
        },
        {
          date: '15 – 22 มี.ค. 70',
          title: 'ม.เกษตรศาสตร์ (KU) — รอบโควต้า',
          type: 'quota',
          typeLabel: 'รอบโควต้า',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200',
          desc: 'กำหนดการรอบโควต้า ม.เกษตรศาสตร์'
        },
        {
          date: '15 – 30 มี.ค. 70',
          title: 'มศว (SWU) — รอบโควต้า',
          type: 'quota',
          typeLabel: 'รอบโควต้า',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200',
          desc: 'กำหนดการรอบโควต้า มหาวิทยาลัยศรีนครินทรวิโรฒ'
        },
        {
          date: '16 – 30 มี.ค. 70',
          title: 'ม.ศิลปากร (SU) — รอบโควต้า',
          type: 'quota',
          typeLabel: 'รอบโควต้า',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
          desc: 'กำหนดการรอบโควต้า มหาวิทยาลัยศิลปากร'
        }
      ]
    }
  ]

  const activeEvents = timelineMode === 'port' ? portTimeline : quotaTimeline
  const selectedMonth = monthsData[selectedMonthIdx] || monthsData[0]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-sm space-y-4 mb-6 transition-colors">
      {/* Header with Title & View Option Toggle (List vs Month) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              ปฏิทินการรับสมัคร TCAS 70
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {viewType === 'list'
                ? 'เรียงตามลำดับเวลาเปิด-ปิดรับสมัคร'
                : 'เลือกดูข้อมูลแบบเจาะจงรายเดือน'}
            </p>
          </div>
        </div>

        {/* View Option Toggle: List View vs Month View */}
        <div className="flex bg-slate-100 dark:bg-slate-700/80 p-1 rounded-2xl self-start sm:self-auto text-xs sm:text-sm font-bold shadow-inner">
          <button
            onClick={() => setViewType('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewType === 'list'
                ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-200 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            <span>แบบรายการ (List)</span>
          </button>
          <button
            onClick={() => setViewType('month')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewType === 'month'
                ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-200 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarRange className="w-4 h-4" />
            <span>แบบรายเดือน (Month)</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. LIST VIEW MODE (แบบรายการไทม์ไลน์) */}
      {/* ======================================================== */}
      {viewType === 'list' && (
        <div className="space-y-4 animate-fadeIn">
          {/* List Sub-switcher (Port vs Quota) */}
          <div className="flex bg-slate-100 dark:bg-slate-700/70 p-1 rounded-xl self-start text-xs sm:text-sm font-semibold max-w-fit">
            <button
              onClick={() => setTimelineMode('port')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timelineMode === 'port'
                  ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-200 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              รอบ 1 Portfolio
            </button>
            <button
              onClick={() => setTimelineMode('quota')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timelineMode === 'quota'
                  ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-200 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              รอบ 2 โควต้า
            </button>
          </div>

          {/* Timeline List */}
          <div className="relative pl-4 sm:pl-6 space-y-4 before:absolute before:left-1.5 sm:before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
            {activeEvents.map((item, idx) => (
              <div key={idx} className="relative group">
                <div
                  className={`absolute -left-[19px] sm:-left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ring-2 ring-slate-100 dark:ring-slate-700 ${item.dotColor}`}
                ></div>

                <div
                  className={`p-3.5 rounded-2xl border transition-all ${
                    item.isHighlight
                      ? 'bg-amber-50/80 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700/70 shadow-sm'
                      : 'bg-slate-50/80 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {item.period}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}
                      >
                        {item.uni}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {item.round}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      item.isHighlight
                        ? 'text-amber-950 dark:text-amber-200 font-medium'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. MONTH VIEW MODE (แบบมุมมองรายเดือน) */}
      {/* ======================================================== */}
      {viewType === 'month' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Horizontal Month Carousel / Pills Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 mb-1.5 px-1">
              <span>เลือกเดือนที่ต้องการดู:</span>
              <span>เลื่อนซ้าย-ขวาได้ ↔️</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {monthsData.map((m, idx) => {
                const isSelected = selectedMonthIdx === idx
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMonthIdx(idx)}
                    className={`shrink-0 px-3.5 py-2.5 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                        : m.highlight
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/80 hover:bg-amber-100'
                        : 'bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-extrabold">{m.shortName}</div>
                    <div
                      className={`text-[10px] mt-0.5 font-medium ${
                        isSelected
                          ? 'text-indigo-100'
                          : m.highlight
                          ? 'text-amber-700 dark:text-amber-300 font-bold'
                          : 'text-slate-400 dark:text-slate-400'
                      }`}
                    >
                      {m.events.length} กิจกรรม {m.highlight && '🔥'}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected Month Header with Prev/Next Navigation */}
          <div className="bg-slate-100 dark:bg-slate-700/60 rounded-2xl p-3.5 flex items-center justify-between">
            <button
              onClick={() => setSelectedMonthIdx((prev) => Math.max(0, prev - 1))}
              disabled={selectedMonthIdx === 0}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50"
              title="เดือนก่อนหน้า"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                {selectedMonth.tag}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {selectedMonth.fullName}
              </h3>
            </div>

            <button
              onClick={() => setSelectedMonthIdx((prev) => Math.min(monthsData.length - 1, prev + 1))}
              disabled={selectedMonthIdx === monthsData.length - 1}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50"
              title="เดือนถัดไป"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Events in Selected Month */}
          <div className="space-y-3">
            {selectedMonth.events.map((evt, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  evt.type === 'highlight'
                    ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-sm sm:text-base font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    {evt.date}
                  </span>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${evt.badgeColor}`}
                  >
                    {evt.typeLabel}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug mb-1">
                  {evt.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {evt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <span>
          <strong>คำแนะนำสำคัญ:</strong> สำหรับ <strong>มศว</strong> และ <strong>ม.เกษตรฯ</strong> ให้เตรียมตัวยื่นใน <strong>รอบ 1.2 (ธ.ค. 69 และ ม.ค. 70)</strong> ซึ่งเป็นรอบที่เปิดรับจิตวิทยาโดยเฉพาะค่ะ
        </span>
      </div>
    </div>
  )
}
