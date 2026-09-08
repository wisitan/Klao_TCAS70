import React, { useState } from 'react'
import {
  Calendar,
  Users,
  Award,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Bookmark,
  Share2,
  FileText,
  BookOpen,
  Scale,
  Sparkles,
  ArrowRight
} from 'lucide-react'

export default function UniversityCard({
  uni,
  isBookmarked,
  onToggleBookmark,
  isSelectedForCompare,
  onToggleCompare,
  onShowToast
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  // University theme styling
  const getThemeStyles = () => {
    switch (uni.theme) {
      case 'swu':
        return {
          headerBg: 'bg-gradient-to-r from-rose-600 via-rose-500 to-red-600',
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          accentBorder: 'border-rose-200'
        }
      case 'ku':
        return {
          headerBg: 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          accentBorder: 'border-emerald-200'
        }
      case 'tu':
        return {
          headerBg: 'bg-gradient-to-r from-amber-600 via-amber-500 to-red-600',
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          accentBorder: 'border-amber-200'
        }
      case 'su':
        return {
          headerBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700',
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
          accentBorder: 'border-blue-200'
        }
      default:
        return {
          headerBg: 'bg-gradient-to-r from-indigo-600 to-purple-600',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          accentBorder: 'border-indigo-200'
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
    <article className="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden transition-all hover:shadow-md mb-5">
      {/* Card Header with Brand Color & Larger Fonts */}
      <div className={`${styles.headerBg} p-5 sm:p-6 text-white relative`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xl sm:text-2xl shadow-inner border border-white/30 shrink-0">
              {uni.abbr}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-sm inline-block mb-1.5">
                {uni.degreeType || 'ปริญญาตรี'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                {uni.university}
              </h2>
              <p className="text-sm sm:text-base text-white/95 mt-0.5">
                คณะ{uni.faculty} • สาขาวิชา{uni.major}
              </p>
            </div>
          </div>

          {/* Action buttons (Bookmark & Compare) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(uni.id)}
              className={`p-2.5 rounded-2xl backdrop-blur-md transition-all ${
                isBookmarked
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={isBookmarked ? 'ลบบุ๊กมาร์ก' : 'บันทึกไว้'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onToggleCompare(uni.id)}
              className={`p-2.5 rounded-2xl backdrop-blur-md transition-all ${
                isSelectedForCompare
                  ? 'bg-white text-slate-900 font-semibold shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title="เลือกเพื่อเปรียบเทียบ"
            >
              <Scale className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tracks / Specializations Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/20">
          {uni.tracks && uni.tracks.map((track, idx) => (
            <span
              key={idx}
              className="text-xs sm:text-sm bg-white/25 backdrop-blur-sm px-3 py-1 rounded-lg font-medium text-white shadow-sm"
            >
              {track}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body - Key Metric Highlights with Large Readable Text */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Metric Grid (Mobile friendly 2x2 with clear large text) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* GPAX Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm mb-1 font-medium">
              <Award className="w-4 h-4 text-amber-500" />
              <span>เกรดเฉลี่ย (GPAX)</span>
            </div>
            <div className="mt-1">
              {uni.gpaxMin ? (
                <div className="text-emerald-700 font-extrabold text-base sm:text-lg">
                  {uni.gpaxMin} ขึ้นไป
                </div>
              ) : (
                <div className="text-slate-600 font-medium text-sm sm:text-base">
                  ตามประกาศฉบับเต็ม
                </div>
              )}
            </div>
          </div>

          {/* Quota Seats Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm mb-1 font-medium">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>จำนวนรับรอบ Port</span>
            </div>
            <div className="text-slate-900 font-bold text-sm sm:text-base mt-1 line-clamp-2">
              {uni.quotaCount.includes('คน') ? uni.quotaCount.split('\n')[0] : 'ตามประกาศ'}
            </div>
          </div>
        </div>

        {/* Timeline Row (Large & High Contrast) */}
        <div className="space-y-2.5 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 text-slate-800">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-slate-900 text-sm sm:text-base block mb-1">
                วันรับสมัครรอบ Port:
              </span>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                {uni.portDate}
              </p>
            </div>
          </div>

          {uni.quotaRoundDate && (
            <div className="pt-2.5 border-t border-indigo-200/60 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600 font-medium">รอบโควต้า:</span>
              <span className="font-bold text-indigo-900 bg-white px-3 py-1 rounded-lg border border-indigo-200">
                {uni.quotaRoundDate}
              </span>
            </div>
          )}
        </div>

        {/* Expandable Section: Guidelines & Full Criteria with Large Typography */}
        {isExpanded && (
          <div className="space-y-3.5 pt-3 animate-fadeIn border-t border-slate-200">
            {/* Guidelines Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-950 text-sm sm:text-base">
                <FileText className="w-5 h-5 text-amber-600 shrink-0" />
                <span>แนวทางการทำ Portfolio & เกณฑ์คัดเลือก</span>
              </div>
              <div className="text-slate-800 whitespace-pre-line leading-relaxed text-sm sm:text-base pl-1">
                {uni.portGuidelines}
              </div>
            </div>

            {/* Quota Details if detailed list */}
            {uni.quotaCount.includes('\n') && (
              <div className="bg-slate-50 border border-slate-300 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                  <Users className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span>รายละเอียดจำนวนรับแยกตามสาขาวิชาเอก</span>
                </div>
                <div className="text-slate-700 whitespace-pre-line leading-relaxed text-sm sm:text-base pl-1">
                  {uni.quotaCount}
                </div>
              </div>
            )}

            {/* Curriculum Info */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-950 text-sm sm:text-base">
                <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
                <span>หลักสูตรและวิชาเอกที่เปิดสอน</span>
              </div>
              <p className="text-slate-800 whitespace-pre-line leading-relaxed text-sm sm:text-base pl-1">
                {uni.curriculum}
              </p>
            </div>
          </div>
        )}

        {/* Toggle Expand Button (Clear & Large) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-4 text-sm sm:text-base font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          {isExpanded ? (
            <>
              <span>ย่อรายละเอียดเกณฑ์พอร์ต</span>
              <ChevronUp className="w-5 h-5" />
            </>
          ) : (
            <>
              <span>ดูเกณฑ์และแนวทางทำพอร์ตแบบละเอียด</span>
              <ChevronDown className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Card Actions Footer with Big Touch Targets */}
        <div className="flex items-center gap-2.5 pt-2">
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
                <Check className="w-5 h-5" />
                <span>คัดลอกเรียบร้อยแล้ว!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                <span>แชร์สรุปเข้า LINE</span>
              </>
            )}
          </button>

          {/* Official Website Link button */}
          <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-2xl text-sm sm:text-base font-semibold bg-slate-100 text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-300 transition-all shrink-0 active:scale-[0.98]"
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
