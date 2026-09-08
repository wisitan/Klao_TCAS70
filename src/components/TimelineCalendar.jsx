import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Sparkles,
  List,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react'

export default function TimelineCalendar({ onSelectUni }) {
  const [viewType, setViewType] = useState('month') // 'month' (default as requested!) | 'list'
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(4) // default to 'ธ.ค. 69' (index 4)
  const [timelineMode, setTimelineMode] = useState('port') // 'port' | 'quota' (for List view)

  // University lookup for IDs
  // uni-1: มศว (มนุษยศาสตร์)
  // uni-2: ม.เกษตรศาสตร์ (สังคมศาสตร์)
  // uni-3: ม.ธรรมศาสตร์ (ศิลปศาสตร์)
  // uni-4: ม.ศิลปากร (สหเวชศาสตร์)

  // Month-by-month calendar definitions
  // 2569 B.E. = 2026 C.E. / 2570 B.E. = 2027 C.E.
  const monthsData = [
    {
      id: 'aug-69',
      shortName: 'ส.ค. 69',
      fullName: 'สิงหาคม 2569',
      year: 2026,
      month: 7, // 0-indexed: 7 = August
      daysInMonth: 31,
      firstDayOfWeek: 6, // 0=Sun, 6=Sat (Aug 1, 2026 is Saturday)
      dayEvents: {
        18: [
          {
            uniId: 'uni-1',
            uniName: 'มศว',
            faculty: 'มนุษยศาสตร์',
            round: 'เปิดรอบ 1.1',
            theme: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
            dot: 'bg-rose-500',
            desc: 'เริ่มรับสมัครรอบ 1.1 (18 ส.ค. – 16 ก.ย. 69)'
          }
        ],
        20: [
          {
            uniId: 'uni-4',
            uniName: 'ศิลปากร',
            faculty: 'สหเวชฯ',
            round: 'เปิดช่วงที่ 1',
            theme: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
            dot: 'bg-blue-500',
            desc: 'เปิดรับรอบพอร์ต ช่วงที่ 1 (20 ส.ค. – 8 ก.ย. 69)'
          }
        ]
      }
    },
    {
      id: 'sep-69',
      shortName: 'ก.ย. 69',
      fullName: 'กันยายน 2569',
      year: 2026,
      month: 8, // September
      daysInMonth: 30,
      firstDayOfWeek: 2, // Sep 1, 2026 is Tuesday
      dayEvents: {
        8: [
          {
            uniId: 'uni-4',
            uniName: 'ศิลปากร',
            faculty: 'สหเวชฯ',
            round: 'ปิดช่วงที่ 1',
            theme: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
            dot: 'bg-blue-500',
            desc: 'วันสุดท้ายของการรับสมัครช่วงที่ 1'
          }
        ],
        14: [
          {
            uniId: 'uni-3',
            uniName: 'มธ.',
            faculty: 'ศิลปศาสตร์',
            round: 'เริ่มรอบ 1 Port',
            theme: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700',
            dot: 'bg-amber-500',
            desc: 'เริ่มรับสมัครรอบ 1 Portfolio (09.00 น.) เปิดรับยาวถึง 16 ธ.ค. 69!'
          }
        ],
        16: [
          {
            uniId: 'uni-1',
            uniName: 'มศว',
            faculty: 'มนุษยศาสตร์',
            round: 'ปิดรอบ 1.1',
            theme: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
            dot: 'bg-rose-500',
            desc: 'วันสุดท้ายของการรับสมัครรอบ 1.1'
          }
        ],
        18: [
          {
            uniId: 'uni-2',
            uniName: 'ม.เกษตรฯ',
            faculty: 'สังคมศาสตร์',
            round: 'เปิดรอบ 1.1',
            theme: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
            dot: 'bg-emerald-500',
            desc: 'เปิดรับรอบ 1.1 (จิตวิทยาเปิดเฉพาะรอบ 1.2)'
          }
        ]
      }
    },
    {
      id: 'oct-69',
      shortName: 'ต.ค. 69',
      fullName: 'ตุลาคม 2569',
      year: 2026,
      month: 9, // October
      daysInMonth: 31,
      firstDayOfWeek: 4, // Oct 1, 2026 is Thursday
      dayEvents: {
        14: [
          {
            uniId: 'uni-2',
            uniName: 'ม.เกษตรฯ',
            faculty: 'สังคมศาสตร์',
            round: 'ปิดรอบ 1.1',
            theme: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
            dot: 'bg-emerald-500',
            desc: 'สิ้นสุดการรับสมัครรอบ 1.1'
          }
        ],
        20: [
          {
            uniId: 'uni-4',
            uniName: 'ศิลปากร',
            faculty: 'สหเวชฯ',
            round: 'เปิดช่วงที่ 2',
            theme: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
            dot: 'bg-blue-500',
            desc: 'เริ่มรับสมัครรอบพอร์ต ช่วงที่ 2 (ถึง 16 พ.ย. 69)'
          }
        ]
      }
    },
    {
      id: 'nov-69',
      shortName: 'พ.ย. 69',
      fullName: 'พฤศจิกายน 2569',
      year: 2026,
      month: 10, // November
      daysInMonth: 30,
      firstDayOfWeek: 0, // Nov 1, 2026 is Sunday
      dayEvents: {
        16: [
          {
            uniId: 'uni-4',
            uniName: 'ศิลปากร',
            faculty: 'สหเวชฯ',
            round: 'ปิดช่วงที่ 2',
            theme: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
            dot: 'bg-blue-500',
            desc: 'วันสุดท้ายของการรับสมัครรอบพอร์ต ช่วงที่ 2'
          }
        ]
      }
    },
    {
      id: 'dec-69',
      shortName: 'ธ.ค. 69',
      fullName: 'ธันวาคม 2569',
      year: 2026,
      month: 11, // December
      daysInMonth: 31,
      firstDayOfWeek: 2, // Dec 1, 2026 is Tuesday
      dayEvents: {
        1: [
          {
            uniId: 'uni-1',
            uniName: '⭐ มศว',
            faculty: 'มนุษยศาสตร์',
            round: 'เปิดรอบ 1.2 (รับ 18 คน)',
            theme: 'bg-rose-200 text-rose-900 border-rose-400 dark:bg-rose-900 dark:text-rose-100 font-bold',
            dot: 'bg-rose-600',
            desc: '⭐ จิตวิทยา มศว เปิดรอบนี้! รับ 18 คน (ส่งผ่าน TCASFolio ไม่เกิน 20 หน้า)'
          }
        ],
        16: [
          {
            uniId: 'uni-1',
            uniName: 'มศว',
            faculty: 'มนุษยศาสตร์',
            round: 'ปิดรอบ 1.2',
            theme: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300',
            dot: 'bg-rose-500',
            desc: 'สิ้นสุดการรับสมัครรอบ 1.2 มศว'
          },
          {
            uniId: 'uni-3',
            uniName: 'มธ.',
            faculty: 'ศิลปศาสตร์',
            round: 'ปิดรับรอบ 1 (15.00 น.)',
            theme: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
            dot: 'bg-amber-500',
            desc: 'ปิดรับสมัครโครงการรับตรง รอบที่ 1 Portfolio เวลา 15.00 น.'
          }
        ]
      }
    },
    {
      id: 'jan-70',
      shortName: 'ม.ค. 70',
      fullName: 'มกราคม 2570',
      year: 2027,
      month: 0, // January 2027
      daysInMonth: 31,
      firstDayOfWeek: 5, // Jan 1, 2027 is Friday
      dayEvents: {
        4: [
          {
            uniId: 'uni-2',
            uniName: '⭐ ม.เกษตรฯ',
            faculty: 'สังคมศาสตร์',
            round: 'เปิดรอบ 1.2 (รับ 24 คน)',
            theme: 'bg-emerald-200 text-emerald-900 border-emerald-400 dark:bg-emerald-900 dark:text-emerald-100 font-bold',
            dot: 'bg-emerald-600',
            desc: '⭐ จิตวิทยา มก. เปิดรอบนี้! รับ 24 คน 4 วิชาเอก (พอร์ต 10 หน้า)'
          }
        ]
      }
    },
    {
      id: 'feb-70',
      shortName: 'ก.พ. 70',
      fullName: 'กุมภาพันธ์ 2570',
      year: 2027,
      month: 1, // February 2027
      daysInMonth: 28,
      firstDayOfWeek: 1, // Feb 1, 2027 is Monday
      dayEvents: {
        4: [
          {
            uniId: 'uni-2',
            uniName: 'ม.เกษตรฯ',
            faculty: 'สังคมศาสตร์',
            round: 'ปิดรับรอบ 1.2',
            theme: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200',
            dot: 'bg-emerald-600',
            desc: 'สิ้นสุดการรับสมัครรอบ 1.2 สิ้นสุดรอบ Portfolio ทั้งหมด'
          }
        ]
      }
    },
    {
      id: 'mar-70',
      shortName: 'มี.ค. 70',
      fullName: 'มีนาคม 2570',
      year: 2027,
      month: 2, // March 2027
      daysInMonth: 31,
      firstDayOfWeek: 1, // Mar 1, 2027 is Monday
      dayEvents: {
        13: [
          {
            uniId: 'uni-3',
            uniName: 'มธ.',
            faculty: 'ศิลปศาสตร์',
            round: 'รอบโควต้า',
            theme: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200',
            dot: 'bg-amber-500',
            desc: 'วันรับสมัคร / ยื่นรอบโควต้า มธ.'
          }
        ],
        15: [
          {
            uniId: 'uni-2',
            uniName: 'ม.เกษตรฯ',
            faculty: 'สังคมศาสตร์',
            round: 'รอบโควต้า',
            theme: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200',
            dot: 'bg-emerald-600',
            desc: 'เริ่มรับสมัครรอบโควต้า ม.เกษตรฯ (ถึง 22 มี.ค. 70)'
          },
          {
            uniId: 'uni-1',
            uniName: 'มศว',
            faculty: 'มนุษยศาสตร์',
            round: 'รอบโควต้า',
            theme: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200',
            dot: 'bg-rose-600',
            desc: 'เริ่มรับสมัครรอบโควต้า มศว (ถึง 30 มี.ค. 70)'
          }
        ],
        16: [
          {
            uniId: 'uni-4',
            uniName: 'ศิลปากร',
            faculty: 'สหเวชฯ',
            round: 'รอบโควต้า',
            theme: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300',
            dot: 'bg-blue-500',
            desc: 'เริ่มรับสมัครรอบโควต้า ม.ศิลปากร (ถึง 30 มี.ค. 70)'
          }
        ]
      }
    }
  ]

  // List View Timeline Data
  const portTimeline = [
    {
      uniId: 'uni-1',
      period: '18 ส.ค. – 16 ก.ย. 69',
      uni: 'มศว',
      faculty: 'มนุษยศาสตร์',
      round: 'รอบ 1.1',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
      dotColor: 'bg-rose-500',
      note: 'รับสมัครช่วงแรก (แนะนำเช็กกับคณะก่อนว่าจิตวิทยาเปิดรอบนี้ไหม)',
      isHighlight: false
    },
    {
      uniId: 'uni-4',
      period: '20 ส.ค. – 8 ก.ย. 69',
      uni: 'ม.ศิลปากร',
      faculty: 'สหเวชศาสตร์ (เพชรบุรี)',
      round: 'รอบพอร์ต ช่วงที่ 1',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
      dotColor: 'bg-blue-500',
      note: 'หลักสูตรใหม่ รอติดตามประกาศยืนยันจากคณะโดยตรง',
      isHighlight: false
    },
    {
      uniId: 'uni-3',
      period: '14 ก.ย. – 16 ธ.ค. 69',
      uni: 'ม.ธรรมศาสตร์',
      faculty: 'ศิลปศาสตร์',
      round: 'รอบที่ 1 Portfolio',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700',
      dotColor: 'bg-amber-500',
      note: 'เปิดรับยาวตลอด 3 เดือน! (ปิดรับ 16 ธ.ค. เวลา 15.00 น.)',
      isHighlight: true
    },
    {
      uniId: 'uni-2',
      period: '18 ก.ย. – 14 ต.ค. 69',
      uni: 'ม.เกษตรศาสตร์',
      faculty: 'สังคมศาสตร์',
      round: 'รอบ 1.1',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
      dotColor: 'bg-emerald-500',
      note: 'รอบ 1.1 ของมหาวิทยาลัย (แต่สาขาจิตวิทยาเปิดเฉพาะรอบ 1.2)',
      isHighlight: false
    },
    {
      uniId: 'uni-4',
      period: '20 ต.ค. – 16 พ.ย. 69',
      uni: 'ม.ศิลปากร',
      faculty: 'สหเวชศาสตร์ (เพชรบุรี)',
      round: 'รอบพอร์ต ช่วงที่ 2',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
      dotColor: 'bg-blue-500',
      note: 'ช่วงที่ 2 ของ ม.ศิลปากร (ติดตามประกาศสาขาจิตวิทยา)',
      isHighlight: false
    },
    {
      uniId: 'uni-1',
      period: '1 – 16 ธ.ค. 69',
      uni: 'มศว',
      faculty: 'มนุษยศาสตร์',
      round: 'รอบ 1.2',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-700',
      dotColor: 'bg-rose-600',
      note: '⭐ จิตวิทยา มศว เปิดรอบนี้! รับ 18 คน (ส่งผ่าน TCASFolio เท่านั้น)',
      isHighlight: true
    },
    {
      uniId: 'uni-2',
      period: '4 ม.ค. – 4 ก.พ. 70',
      uni: 'ม.เกษตรศาสตร์',
      faculty: 'สังคมศาสตร์',
      round: 'รอบ 1.2',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700',
      dotColor: 'bg-emerald-600',
      note: '⭐ จิตวิทยา มก. เปิดรอบนี้! รับ 24 คน (4 แขนงวิชาเอก)',
      isHighlight: true
    }
  ]

  const quotaTimeline = [
    {
      uniId: 'uni-3',
      period: '13 มี.ค. 2570',
      uni: 'ม.ธรรมศาสตร์',
      faculty: 'ศิลปศาสตร์',
      round: 'รอบโควต้า',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700',
      dotColor: 'bg-amber-500',
      note: 'วันรับสมัคร / ยื่นโควต้า มธ.'
    },
    {
      uniId: 'uni-2',
      period: '15 – 22 มี.ค. 2570',
      uni: 'ม.เกษตรศาสตร์',
      faculty: 'สังคมศาสตร์',
      round: 'รอบโควต้า',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700',
      dotColor: 'bg-emerald-600',
      note: 'วันรับสมัครรอบโควต้า ม.เกษตรศาสตร์'
    },
    {
      uniId: 'uni-1',
      period: '15 – 30 มี.ค. 2570',
      uni: 'มศว',
      faculty: 'มนุษยศาสตร์',
      round: 'รอบโควต้า',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-700',
      dotColor: 'bg-rose-600',
      note: 'วันรับสมัครรอบโควต้า มหาวิทยาลัยศรีนครินทรวิโรฒ'
    },
    {
      uniId: 'uni-4',
      period: '16 – 30 มี.ค. 2570',
      uni: 'ม.ศิลปากร',
      faculty: 'สหเวชศาสตร์ (เพชรบุรี)',
      round: 'รอบโควต้า',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
      dotColor: 'bg-blue-500',
      note: 'วันรับสมัครรอบโควต้า มหาวิทยาลัยศิลปากร'
    }
  ]

  const activeListEvents = timelineMode === 'port' ? portTimeline : quotaTimeline
  const selectedMonth = monthsData[selectedMonthIdx] || monthsData[4]

  // Helper to build 7-column calendar grid
  const renderMonthGrid = () => {
    const days = []
    const weekDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

    // Empty padding slots before 1st of month
    for (let i = 0; i < selectedMonth.firstDayOfWeek; i++) {
      days.push(
        <div
          key={`pad-${i}`}
          className="min-h-[72px] sm:min-h-[85px] bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/60 rounded-xl"
        ></div>
      )
    }

    // Days in current month
    for (let d = 1; d <= selectedMonth.daysInMonth; d++) {
      const events = selectedMonth.dayEvents[d] || []
      const hasEvent = events.length > 0

      days.push(
        <div
          key={`day-${d}`}
          className={`min-h-[72px] sm:min-h-[85px] p-1 sm:p-1.5 rounded-xl border flex flex-col justify-between transition-all ${
            hasEvent
              ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-900/60 shadow-sm ring-1 ring-indigo-500/10'
              : 'bg-white/70 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-400'
          }`}
        >
          {/* Day Number */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold leading-none px-1 py-0.5 rounded ${
                hasEvent
                  ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {d}
            </span>
          </div>

          {/* Mini Event Cards/Chips inside Day Cell */}
          <div className="space-y-1 mt-1 flex-1 flex flex-col justify-end">
            {events.map((evt, eIdx) => (
              <button
                key={eIdx}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectUni?.(evt.uniId)
                }}
                className={`w-full text-left p-1 rounded-lg border text-[10px] sm:text-xs leading-tight transition-transform active:scale-95 hover:shadow-md cursor-pointer ${evt.theme}`}
                title="กดเพื่อเปิดดูข้อมูลเต็มของมหาวิทยาลัยนี้"
              >
                <div className="font-extrabold truncate">{evt.uniName}</div>
                <div className="truncate text-[9px] sm:text-[10px] opacity-90">{evt.faculty}</div>
                <div className="truncate text-[9px] font-semibold text-indigo-700 dark:text-indigo-300 mt-0.5">
                  {evt.round}
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-1.5">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 dark:text-slate-500 py-1">
          {weekDays.map((w, idx) => (
            <div key={idx} className={idx === 0 || idx === 6 ? 'text-rose-500/80' : ''}>
              {w}
            </div>
          ))}
        </div>

        {/* 7-column Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">{days}</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-sm space-y-4 mb-6 transition-colors">
      {/* Header with Title & View Option Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              ปฏิทินรับสมัคร TCAS 70 (จิตวิทยา)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              แตะที่กิจกรรมเพื่อเปิดดูรายละเอียดและเกณฑ์พอร์ตฉบับเต็ม
            </p>
          </div>
        </div>

        {/* View Option Toggle: Month Grid View vs List View */}
        <div className="flex bg-slate-100 dark:bg-slate-700/80 p-1 rounded-2xl self-start sm:self-auto text-xs sm:text-sm font-bold shadow-inner">
          <button
            onClick={() => setViewType('month')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              viewType === 'month'
                ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-200 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarRange className="w-4 h-4" />
            <span>ตารางรายเดือน (Month Grid)</span>
          </button>

          <button
            onClick={() => setViewType('list')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              viewType === 'list'
                ? 'bg-white dark:bg-slate-600 text-indigo-700 dark:text-indigo-200 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
            <span>แบบรายการ (List)</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. MONTH GRID VIEW (ตารางปฏิทินเต็มเดือน + การ์ดเล็กมหาลัย/คณะ) */}
      {/* ======================================================== */}
      {viewType === 'month' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Month Selector Pills (Scrollable) */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 mb-1 px-1">
              <span>เลือกเดือนที่ต้องการดู:</span>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400">เลื่อนซ้าย-ขวาได้ ↔️</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {monthsData.map((m, idx) => {
                const isSelected = selectedMonthIdx === idx
                const eventCount = Object.keys(m.dayEvents).length
                const isSpecial = m.id === 'dec-69' || m.id === 'jan-70'

                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMonthIdx(idx)}
                    className={`shrink-0 px-3 py-2 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                        : isSpecial
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/80 hover:bg-amber-100'
                        : 'bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-extrabold">{m.shortName}</div>
                    <div
                      className={`text-[10px] mt-0.5 font-medium ${
                        isSelected
                          ? 'text-indigo-100'
                          : isSpecial
                          ? 'text-amber-700 dark:text-amber-300 font-bold'
                          : 'text-slate-400 dark:text-slate-400'
                      }`}
                    >
                      {eventCount} กิจกรรม {isSpecial && '🔥'}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Month Header with Prev/Next Navigation */}
          <div className="bg-slate-100 dark:bg-slate-700/60 rounded-2xl p-3 flex items-center justify-between">
            <button
              onClick={() => setSelectedMonthIdx((prev) => Math.max(0, prev - 1))}
              disabled={selectedMonthIdx === 0}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50"
              title="เดือนก่อนหน้า"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {selectedMonth.fullName}
              </h3>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                (แตะที่การ์ดมหาลัยในช่องวัน เพื่อเปิดดูข้อมูลเต็ม)
              </span>
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

          {/* Full Monthly Calendar Grid */}
          <div className="bg-slate-50/50 dark:bg-slate-900/30 p-2 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            {renderMonthGrid()}
          </div>

          {/* Monthly Events Summary List (Clickable cards to open popup) */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
              สรุปเหตุการณ์ประจำเดือน {selectedMonth.shortName}:
            </div>

            {Object.entries(selectedMonth.dayEvents).map(([day, evts]) =>
              evts.map((evt, idx) => (
                <div
                  key={`${day}-${idx}`}
                  onClick={() => onSelectUni?.(evt.uniId)}
                  className="p-3.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-center shrink-0 w-11 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-800 dark:text-indigo-200">
                      <div className="text-xs text-indigo-500 font-semibold">{selectedMonth.shortName.split(' ')[0]}</div>
                      <div className="text-base font-extrabold leading-none">{day}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {evt.uniName} • คณะ{evt.faculty}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${evt.theme}`}>
                          {evt.round}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {evt.desc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span className="hidden sm:inline">ดูข้อมูล</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. LIST VIEW (คลิกแล้ว Pop-up ขึ้นมาเช่นกัน) */}
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

          {/* Timeline List (All items are clickable to open popup!) */}
          <div className="relative pl-4 sm:pl-6 space-y-3.5 before:absolute before:left-1.5 sm:before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
            {activeListEvents.map((item, idx) => (
              <div key={idx} className="relative group">
                <div
                  className={`absolute -left-[19px] sm:-left-[23px] top-2 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ring-2 ring-slate-100 dark:ring-slate-700 ${item.dotColor}`}
                ></div>

                {/* Clickable Card Item */}
                <div
                  onClick={() => onSelectUni?.(item.uniId)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] hover:shadow-md ${
                    item.isHighlight
                      ? 'bg-amber-50/80 border-amber-300 dark:bg-amber-950/40 dark:border-amber-700/70'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {item.period}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}>
                        {item.uni}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                        {item.round}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.uni} • คณะ{item.faculty}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2.5">
                    {item.note}
                  </p>

                  <div className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 gap-1">
                    <span>แตะเพื่อดูรายละเอียดเกณฑ์พอร์ตทั้งหมด</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Guidance Hint */}
      <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <span>
          <strong>คำแนะนำสำคัญ:</strong> สำหรับ <strong>มศว</strong> และ <strong>ม.เกษตรฯ</strong> ให้เตรียมตัวยื่นใน <strong>รอบ 1.2 (ธ.ค. 69 และ ม.ค. 70)</strong> ซึ่งเป็นรอบที่เปิดรับจิตวิทยาโดยเฉพาะค่ะ
        </span>
      </div>
    </div>
  )
}
