import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Sparkles,
  List,
  CalendarRange,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function TimelineCalendar({ onSelectUni }) {
  const [viewType, setViewType] = useState('list') // 'list' (default as requested) | 'month'
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(4) // default to 'ธ.ค. 69' (index 4)
  const [timelineMode, setTimelineMode] = useState('port') // 'port' | 'quota' (for List view)

  // All TCAS 70 Application Periods (with exact ISO date spans for continuous bar rendering)
  const ALL_EVENTS = [
    {
      id: 'swu-1.1',
      uniId: 'uni-1',
      uniName: 'มศว',
      faculty: 'มนุษยศาสตร์',
      round: 'รอบ 1.1',
      startDate: '2026-08-18',
      endDate: '2026-09-16',
      badgeColor: 'bg-rose-500 text-white',
      barStyle: 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm',
      periodText: '18 ส.ค. – 16 ก.ย. 69',
      isHighlight: false,
      note: 'รับสมัครช่วงแรก (แนะนำเช็กกับคณะก่อนว่าจิตวิทยาเปิดรอบนี้ไหม)'
    },
    {
      id: 'su-1',
      uniId: 'uni-4',
      uniName: 'ศิลปากร',
      faculty: 'สหเวชฯ',
      round: 'ช่วงที่ 1',
      startDate: '2026-08-20',
      endDate: '2026-09-08',
      badgeColor: 'bg-blue-600 text-white',
      barStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm',
      periodText: '20 ส.ค. – 8 ก.ย. 69',
      isHighlight: false,
      note: 'หลักสูตรใหม่ รอบพอร์ต ช่วงที่ 1'
    },
    {
      id: 'tu-1',
      uniId: 'uni-3',
      uniName: 'มธ.',
      faculty: 'ศิลปศาสตร์',
      round: 'รอบ 1 Port',
      startDate: '2026-09-14',
      endDate: '2026-12-16',
      badgeColor: 'bg-amber-500 text-white',
      barStyle: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm',
      periodText: '14 ก.ย. – 16 ธ.ค. 69 (09.00 - 15.00 น.)',
      isHighlight: true,
      note: 'มธ. เปิดรับยาวต่อเนื่องตลอด 3 เดือน! (ปิดรับ 16 ธ.ค. เวลา 15.00 น.)'
    },
    {
      id: 'ku-1.1',
      uniId: 'uni-2',
      uniName: 'ม.เกษตรฯ',
      faculty: 'สังคมศาสตร์',
      round: 'รอบ 1.1',
      startDate: '2026-09-18',
      endDate: '2026-10-14',
      badgeColor: 'bg-emerald-600 text-white',
      barStyle: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm',
      periodText: '18 ก.ย. – 14 ต.ค. 69',
      isHighlight: false,
      note: 'รอบ 1.1 ของมหาวิทยาลัย (สาขาจิตวิทยาจะเปิดรับในรอบ 1.2 ม.ค. 70)'
    },
    {
      id: 'su-2',
      uniId: 'uni-4',
      uniName: 'ศิลปากร',
      faculty: 'สหเวชฯ',
      round: 'ช่วงที่ 2',
      startDate: '2026-10-20',
      endDate: '2026-11-16',
      badgeColor: 'bg-blue-600 text-white',
      barStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm',
      periodText: '20 ต.ค. – 16 พ.ย. 69',
      isHighlight: false,
      note: 'รอบพอร์ต ช่วงที่ 2 ของ ม.ศิลปากร'
    },
    {
      id: 'swu-1.2',
      uniId: 'uni-1',
      uniName: 'มศว',
      faculty: 'มนุษยศาสตร์',
      round: 'รอบ 1.2 (รับ 18 คน)',
      startDate: '2026-12-01',
      endDate: '2026-12-16',
      badgeColor: 'bg-rose-600 text-white',
      barStyle: 'bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white shadow-md ring-1 ring-white/50',
      periodText: '1 – 16 ธ.ค. 69',
      isHighlight: true,
      note: '⭐ จิตวิทยา มศว เปิดรอบนี้! รับ 18 คน (ส่งผ่านระบบ TCASFolio ไม่เกิน 20 หน้า)'
    },
    {
      id: 'ku-1.2',
      uniId: 'uni-2',
      uniName: 'ม.เกษตรฯ',
      faculty: 'สังคมศาสตร์',
      round: 'รอบ 1.2 (รับ 24 คน)',
      startDate: '2027-01-04',
      endDate: '2027-02-04',
      badgeColor: 'bg-emerald-600 text-white',
      barStyle: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md ring-1 ring-white/50',
      periodText: '4 ม.ค. – 4 ก.พ. 70',
      isHighlight: true,
      note: '⭐ จิตวิทยา มก. เปิดรอบนี้! รับ 24 คน 4 แขนง (พอร์ตไม่เกิน 10 หน้า A4)'
    },
    {
      id: 'tu-quota',
      uniId: 'uni-3',
      uniName: 'มธ.',
      faculty: 'ศิลปศาสตร์',
      round: 'โควต้า',
      startDate: '2027-03-13',
      endDate: '2027-03-13',
      badgeColor: 'bg-amber-600 text-white',
      barStyle: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm',
      periodText: '13 มี.ค. 2570',
      isHighlight: false,
      note: 'วันรับสมัคร / ยื่นรอบโควต้า มธ.'
    },
    {
      id: 'ku-quota',
      uniId: 'uni-2',
      uniName: 'ม.เกษตรฯ',
      faculty: 'สังคมศาสตร์',
      round: 'โควต้า',
      startDate: '2027-03-15',
      endDate: '2027-03-22',
      badgeColor: 'bg-emerald-600 text-white',
      barStyle: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm',
      periodText: '15 – 22 มี.ค. 2570',
      isHighlight: false,
      note: 'วันรับสมัครรอบโควต้า ม.เกษตรศาสตร์'
    },
    {
      id: 'swu-quota',
      uniId: 'uni-1',
      uniName: 'มศว',
      faculty: 'มนุษยศาสตร์',
      round: 'โควต้า',
      startDate: '2027-03-15',
      endDate: '2027-03-30',
      badgeColor: 'bg-rose-500 text-white',
      barStyle: 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm',
      periodText: '15 – 30 มี.ค. 2570',
      isHighlight: false,
      note: 'วันรับสมัครรอบโควต้า มศว'
    },
    {
      id: 'su-quota',
      uniId: 'uni-4',
      uniName: 'ศิลปากร',
      faculty: 'สหเวชฯ',
      round: 'โควต้า',
      startDate: '2027-03-16',
      endDate: '2027-03-30',
      badgeColor: 'bg-blue-600 text-white',
      barStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm',
      periodText: '16 – 30 มี.ค. 2570',
      isHighlight: false,
      note: 'วันรับสมัครรอบโควต้า ม.ศิลปากร'
    }
  ]

  // Month-by-month metadata
  const monthsData = [
    {
      id: 'aug-69',
      shortName: 'ส.ค. 69',
      fullName: 'สิงหาคม 2569',
      year: 2026,
      month: 7, // August (0-indexed)
      isHighlight: false
    },
    {
      id: 'sep-69',
      shortName: 'ก.ย. 69',
      fullName: 'กันยายน 2569',
      year: 2026,
      month: 8, // September
      isHighlight: false
    },
    {
      id: 'oct-69',
      shortName: 'ต.ค. 69',
      fullName: 'ตุลาคม 2569',
      year: 2026,
      month: 9, // October
      isHighlight: false
    },
    {
      id: 'nov-69',
      shortName: 'พ.ย. 69',
      fullName: 'พฤศจิกายน 2569',
      year: 2026,
      month: 10, // November
      isHighlight: false
    },
    {
      id: 'dec-69',
      shortName: 'ธ.ค. 69',
      fullName: 'ธันวาคม 2569',
      year: 2026,
      month: 11, // December
      isHighlight: true
    },
    {
      id: 'jan-70',
      shortName: 'ม.ค. 70',
      fullName: 'มกราคม 2570',
      year: 2027,
      month: 0, // January 2027
      isHighlight: true
    },
    {
      id: 'feb-70',
      shortName: 'ก.พ. 70',
      fullName: 'กุมภาพันธ์ 2570',
      year: 2027,
      month: 1, // February
      isHighlight: false
    },
    {
      id: 'mar-70',
      shortName: 'มี.ค. 70',
      fullName: 'มีนาคม 2570',
      year: 2027,
      month: 2, // March
      isHighlight: false
    }
  ]

  const selectedMonth = monthsData[selectedMonthIdx] || monthsData[4]

  // Calculate weeks grid with continuous multi-day spanning bars
  const getMonthWeeksWithSpans = () => {
    const { year, month } = selectedMonth
    const firstDayOfMonth = new Date(year, month, 1)
    const startDayOfWeek = firstDayOfMonth.getDay() // 0 = Sun
    const startDate = new Date(year, month, 1 - startDayOfWeek)

    const lastDayOfMonth = new Date(year, month + 1, 0)
    const endDayOfWeek = lastDayOfMonth.getDay()
    const endDate = new Date(year, month, lastDayOfMonth.getDate() + (6 - endDayOfWeek))

    const weeks = []
    let curr = new Date(startDate)

    while (curr <= endDate) {
      const weekDays = []
      for (let i = 0; i < 7; i++) {
        const d = new Date(curr)
        const isCurrentMonth = d.getMonth() === month
        const isoStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        weekDays.push({
          dayNumber: d.getDate(),
          isCurrentMonth,
          isoStr,
          dayOfWeek: i
        })
        curr.setDate(curr.getDate() + 1)
      }

      // Check overlapping multi-day events in this week
      const weekStartIso = weekDays[0].isoStr
      const weekEndIso = weekDays[6].isoStr
      const weekEvents = []

      for (const evt of ALL_EVENTS) {
        const overlapStart = evt.startDate > weekStartIso ? evt.startDate : weekStartIso
        const overlapEnd = evt.endDate < weekEndIso ? evt.endDate : weekEndIso

        if (overlapStart <= overlapEnd) {
          const colStart = weekDays.findIndex((w) => w.isoStr === overlapStart)
          const colEnd = weekDays.findIndex((w) => w.isoStr === overlapEnd)

          if (colStart !== -1 && colEnd !== -1) {
            weekEvents.push({
              ...evt,
              colStart,
              colEnd,
              isStart: evt.startDate === overlapStart,
              isEnd: evt.endDate === overlapEnd
            })
          }
        }
      }

      weeks.push({ weekDays, weekEvents })
    }

    return weeks
  }

  const weeks = getMonthWeeksWithSpans()
  const weekDayNames = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

  // Events active in this month for the bottom summary list
  const activeEventsInSelectedMonth = ALL_EVENTS.filter((evt) => {
    const monthStartIso = `${selectedMonth.year}-${String(selectedMonth.month + 1).padStart(2, '0')}-01`
    const lastDay = new Date(selectedMonth.year, selectedMonth.month + 1, 0).getDate()
    const monthEndIso = `${selectedMonth.year}-${String(selectedMonth.month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
    return evt.startDate <= monthEndIso && evt.endDate >= monthStartIso
  })

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
              แถบสีลากยาวตามช่วงเวลารับสมัครจริง • แตะเพื่อดูรายละเอียด
            </p>
          </div>
        </div>

        {/* View Option Toggle: List View vs Month Grid View */}
        <div className="flex bg-slate-100 dark:bg-slate-700/80 p-1 rounded-2xl self-start sm:self-auto text-xs sm:text-sm font-bold shadow-inner">
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
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. MONTH GRID VIEW (แถบสีลากยาวตามวันที่รับสมัครจริง) */}
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

                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMonthIdx(idx)}
                    className={`shrink-0 px-3.5 py-2 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                        : m.isHighlight
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 hover:bg-amber-100'
                        : 'bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-extrabold">{m.shortName}</div>
                    <div
                      className={`text-[10px] mt-0.5 font-semibold ${
                        isSelected
                          ? 'text-indigo-100'
                          : m.isHighlight
                          ? 'text-amber-700 dark:text-amber-300'
                          : 'text-slate-400 dark:text-slate-400'
                      }`}
                    >
                      {m.isHighlight ? 'ไฮไลต์ 🔥' : 'ดูปฏิทิน'}
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
                (แถบสีจะลากยาวข้ามวันตามช่วงเวลารับสมัครจริง)
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

          {/* Weekday Header (7 Columns) */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 dark:text-slate-400 px-2 py-1">
            {weekDayNames.map((w, idx) => (
              <div key={idx} className={idx === 0 || idx === 6 ? 'text-rose-500 font-extrabold' : ''}>
                {w}
              </div>
            ))}
          </div>

          {/* Calendar Weeks with Continuous Multi-Day Spanning Bars */}
          <div className="space-y-2">
            {weeks.map((week, wIdx) => (
              <div
                key={wIdx}
                className="border border-slate-200 dark:border-slate-700/80 rounded-2xl p-2 sm:p-2.5 bg-slate-50/50 dark:bg-slate-900/40 shadow-xs"
              >
                {/* 7 Day Numbers */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                  {week.weekDays.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className={`text-xs sm:text-sm font-bold ${
                        d.isCurrentMonth
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      {d.dayNumber}
                    </div>
                  ))}
                </div>

                {/* Multi-Day Spanning Event Bars for this Week */}
                {week.weekEvents.length > 0 ? (
                  <div className="grid grid-cols-7 gap-x-1 gap-y-1.5 pt-0.5">
                    {week.weekEvents.map((evt, eIdx) => (
                      <button
                        key={eIdx}
                        onClick={() => onSelectUni?.(evt.uniId)}
                        style={{
                          gridColumnStart: evt.colStart + 1,
                          gridColumnEnd: evt.colEnd + 2
                        }}
                        className={`h-7 sm:h-8 px-2 flex items-center justify-between text-left text-xs font-bold transition-transform active:scale-[0.99] hover:brightness-105 cursor-pointer select-none ${
                          evt.barStyle
                        } ${
                          evt.isStart ? 'rounded-l-xl' : 'rounded-l-none border-l-0 pl-1'
                        } ${
                          evt.isEnd ? 'rounded-r-xl' : 'rounded-r-none border-r-0 pr-1'
                        }`}
                        title={`${evt.uniName} • คณะ${evt.faculty} (${evt.periodText}) - แตะเพื่อดูรายละเอียด`}
                      >
                        <span className="truncate flex items-center gap-1">
                          {evt.isHighlight && <span className="text-[11px]">⭐</span>}
                          <span className="font-extrabold">{evt.uniName}</span>
                          <span className="font-normal opacity-90 truncate hidden xs:inline">
                            {evt.faculty}
                          </span>
                          <span className="text-[10px] font-normal opacity-85 shrink-0">
                            ({evt.round})
                          </span>
                        </span>

                        {evt.isEnd && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-black/25 shrink-0 font-mono ml-1 hidden sm:inline">
                            ปิดรับ
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-2"></div>
                )}
              </div>
            ))}
          </div>

          {/* Monthly Events Summary List (Clickable cards to open popup) */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
              สรุปช่วงเวลารับสมัครในเดือน {selectedMonth.shortName} (แตะเพื่อเปิดดู):
            </div>

            {activeEventsInSelectedMonth.length > 0 ? (
              activeEventsInSelectedMonth.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onSelectUni?.(evt.uniId)}
                  className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-center shrink-0 py-1 px-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-indigo-800 dark:text-indigo-200">
                      <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mx-auto mb-0.5" />
                      <div className="text-[10px] font-extrabold leading-tight">{evt.uniName}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {evt.uniName} • คณะ{evt.faculty}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${evt.badgeColor}`}>
                          {evt.round}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        {evt.periodText}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                        {evt.note}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span className="hidden sm:inline">ดูข้อมูล</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-2">
                ไม่มีกิจกรรมเปิดรับสมัครใหม่ในเดือนนี้
              </p>
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

          {/* Timeline List */}
          <div className="space-y-3">
            {ALL_EVENTS.filter((evt) =>
              timelineMode === 'port' ? !evt.id.includes('quota') : evt.id.includes('quota')
            ).map((item) => (
              <div
                key={item.id}
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
                    {item.periodText}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${item.badgeColor}`}>
                      {item.uniName}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                      {item.round}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
                  {item.uniName} • คณะ{item.faculty}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                  {item.note}
                </p>

                <div className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 gap-1">
                  <span>แตะเพื่อดูรายละเอียดเกณฑ์พอร์ตทั้งหมด</span>
                  <ChevronRight className="w-4 h-4" />
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
