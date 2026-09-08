import React, { useState } from 'react'
import {
  Calendar,
  Users,
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check,
  Bookmark,
  Share2,
  FileText,
  BookOpen,
  Scale,
  GraduationCap
} from 'lucide-react'

export default function UniversityCard({
  uni,
  isBookmarked,
  onToggleBookmark,
  isSelectedForCompare,
  onToggleCompare,
  onShowToast,
  isInsideModal = false
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  // University theme styling
  const getThemeStyles = () => {
    switch (uni.theme) {
      case 'swu':
        return {
          headerBg: 'bg-gradient-to-r from-rose-600 via-rose-500 to-red-600'
        }
      case 'ku':
        return {
          headerBg: 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600'
        }
      case 'tu':
        return {
          headerBg: 'bg-gradient-to-r from-amber-600 via-amber-500 to-red-600'
        }
      case 'su':
        return {
          headerBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700'
        }
      default:
        return {
          headerBg: 'bg-gradient-to-r from-indigo-600 to-purple-600'
        }
    }
  }

  const styles = getThemeStyles()

  // Copy Summary formatted for LINE Chat
  const handleCopyForLine = () => {
    const text = `📌 สรุป TCAS 70 รอบ Port: ${uni.university}
🏛 คณะ: ${uni.faculty} (${uni.curriculum.split('\n')[0]})
📊 เกรดขั้นต่ำ: ${uni.gpaxMin ? `GPAX ${uni.gpaxMin} ขึ้นไป` : 'ยังไม่ระบุในประกาศเบื้องต้น'}
👥 จำนวนรับ: ${uni.quotaCount.replace(/\n+/g, ' ')}
📅 วันรับสมัคร Port:
${uni.portDate}
⏳ รอบโควต้า: ${uni.quotaRoundDate}
🎯 เกณฑ์และเงื่อนไขเด่น:
${uni.portGuidelines.slice(0, 300)}...
🔗 เว็บรับสมัคร: ${uni.website}`

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      onShowToast?.(`คัดลอกสรุป ${uni.shortName} ส่ง LINE ได้เลย!`)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <article
      className={`bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all ${
        isInsideModal ? 'shadow-none' : 'shadow-sm hover:shadow-md mb-5'
      }`}
    >
      {/* Compact Slim Card Header (Removed Sub-tracks to make it small) */}
      <div className={`${styles.headerBg} p-4 sm:p-5 text-white relative`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xl shadow-inner border border-white/30 shrink-0">
              {uni.abbr}
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-black/25 backdrop-blur-sm inline-block">
                  {uni.degreeType || 'ปริญญาตรี'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
                {uni.university}
              </h2>
              <p className="text-sm sm:text-base text-white/95 font-medium">
                คณะ{uni.faculty} • สาขา{uni.major}
              </p>
            </div>
          </div>

          {/* Action buttons (Bookmark & Compare) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleBookmark(uni.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isBookmarked
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={isBookmarked ? 'ลบบุ๊กมาร์ก' : 'บันทึกไว้'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onToggleCompare(uni.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isSelectedForCompare
                  ? 'bg-white text-slate-900 font-semibold shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title="เลือกเพื่อเปรียบเทียบ"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Body with All Rich Information */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Metric Grid (GPAX & Quota Seats) */}
        <div className="grid grid-cols-2 gap-3">
          {/* GPAX Box */}
          <div className="bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold mb-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>เกรดเฉลี่ย (GPAX)</span>
            </div>
            <div>
              {uni.gpaxMin ? (
                <div className="text-emerald-700 dark:text-emerald-400 font-extrabold text-lg sm:text-xl">
                  {uni.gpaxMin} ขึ้นไป
                </div>
              ) : (
                <div className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base">
                  ตามประกาศฉบับเต็ม
                </div>
              )}
            </div>
          </div>

          {/* Quota Seats Box */}
          <div className="bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold mb-1">
              <Users className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>จำนวนรับรอบ Port</span>
            </div>
            <div className="text-slate-900 dark:text-white font-bold text-base sm:text-lg line-clamp-2">
              {uni.quotaCount.includes('คน') ? uni.quotaCount.split('\n')[0] : 'ตามประกาศ'}
            </div>
          </div>
        </div>

        {/* Timeline Box */}
        <div className="space-y-2 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 rounded-2xl p-3.5 sm:p-4 text-slate-800 dark:text-slate-200">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg block mb-1">
                วันรับสมัครรอบ Port:
              </span>
              <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed text-sm sm:text-base font-medium">
                {uni.portDate}
              </p>
            </div>
          </div>

          {uni.quotaRoundDate && (
            <div className="pt-2.5 border-t border-indigo-200/60 dark:border-indigo-900/60 flex items-center justify-between text-sm sm:text-base">
              <span className="text-slate-600 dark:text-slate-400 font-medium">รอบโควต้า:</span>
              <span className="font-bold text-indigo-900 dark:text-indigo-200 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm">
                {uni.quotaRoundDate}
              </span>
            </div>
          )}
        </div>

        {/* Tracks / Specializations in Body (Moved from Header to keep Header slim) */}
        {uni.tracks && uni.tracks.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-300">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>วิชาเอก / แขนงที่เปิดสอน:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {uni.tracks.map((track, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-50 dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-slate-600 px-3 py-1.5 rounded-xl text-sm font-semibold"
                >
                  {track}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Section: Guidelines & Full Criteria */}
        {isExpanded && (
          <div className="space-y-3 pt-2 animate-fadeIn border-t border-slate-200 dark:border-slate-700">
            {/* Guidelines Box */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/70 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-amber-950 dark:text-amber-200 text-base sm:text-lg">
                <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>แนวทางการทำ Portfolio & เกณฑ์คัดเลือก</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed text-sm sm:text-base pl-1">
                {uni.portGuidelines}
              </div>
            </div>

            {/* Quota Details if detailed list */}
            {uni.quotaCount.includes('\n') && (
              <div className="bg-slate-50 dark:bg-slate-700/60 border border-slate-300 dark:border-slate-600 rounded-2xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white text-base">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>รายละเอียดจำนวนรับแยกตามสาขาวิชาเอก</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-sm sm:text-base pl-1 font-mono">
                  {uni.quotaCount}
                </div>
              </div>
            )}

            {/* Curriculum Info */}
            <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 font-extrabold text-blue-950 dark:text-blue-200 text-base">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>หลักสูตรและวิชาเอกที่เปิดสอน</span>
              </div>
              <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed text-sm sm:text-base pl-1">
                {uni.curriculum}
              </p>
            </div>
          </div>
        )}

        {/* Toggle Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-3.5 text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-700/60 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 transition-all"
        >
          {isExpanded ? (
            <>
              <span>ย่อรายละเอียดเกณฑ์พอร์ต</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>ดูเกณฑ์และแนวทางทำพอร์ตแบบละเอียด</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Card Actions Footer */}
        <div className="flex items-center gap-2 pt-1">
          {/* Copy for LINE Chat button */}
          <button
            onClick={handleCopyForLine}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-sm sm:text-base font-bold transition-all shadow-sm active:scale-[0.98] ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>คัดลอกเรียบร้อยแล้ว!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>แชร์สรุปเข้า LINE</span>
              </>
            )}
          </button>

          {/* Official Website Link button */}
          <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-2xl text-sm sm:text-base font-bold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-600 hover:text-indigo-600 border border-slate-300 dark:border-slate-600 transition-all shrink-0 active:scale-[0.98]"
            title="เปิดเว็บไซต์รับสมัครของมหาวิทยาลัย"
          >
            <span>เปิดเว็บ</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
