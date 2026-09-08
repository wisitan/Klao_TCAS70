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
  HelpCircle,
  BookOpen,
  Scale,
  Sparkles
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
          accentBorder: 'border-rose-200',
          avatarBg: 'bg-rose-100 text-rose-700 border-rose-300'
        }
      case 'ku':
        return {
          headerBg: 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          accentBorder: 'border-emerald-200',
          avatarBg: 'bg-emerald-100 text-emerald-700 border-emerald-300'
        }
      case 'tu':
        return {
          headerBg: 'bg-gradient-to-r from-amber-600 via-amber-500 to-red-600',
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          accentBorder: 'border-amber-200',
          avatarBg: 'bg-amber-100 text-amber-800 border-amber-300'
        }
      case 'su':
        return {
          headerBg: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700',
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
          accentBorder: 'border-blue-200',
          avatarBg: 'bg-blue-100 text-blue-700 border-blue-300'
        }
      default:
        return {
          headerBg: 'bg-gradient-to-r from-indigo-600 to-purple-600',
          badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          accentBorder: 'border-indigo-200',
          avatarBg: 'bg-indigo-100 text-indigo-700 border-indigo-300'
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
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Card Header with Brand Color */}
      <div className={`${styles.headerBg} p-4 text-white relative`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg shadow-inner border border-white/30">
              {uni.abbr}
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-black/20 backdrop-blur-sm inline-block mb-1">
                {uni.degreeType || 'ปริญญาตรี'}
              </span>
              <h2 className="text-base sm:text-lg font-bold leading-snug">
                {uni.university}
              </h2>
              <p className="text-xs text-white/90">
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
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              title={isBookmarked ? 'ลบบุ๊กมาร์ก' : 'บันทึกไว้'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onToggleCompare(uni.id)}
              className={`p-2 rounded-xl backdrop-blur-md transition-all text-xs flex items-center gap-1 ${
                isSelectedForCompare
                  ? 'bg-white text-slate-900 font-semibold shadow-sm'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              title="เลือกเพื่อเปรียบเทียบ"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tracks / Specializations Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/20">
          {uni.tracks && uni.tracks.map((track, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md font-medium text-white/95"
            >
              {track}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body - Key Metric Highlights */}
      <div className="p-4 space-y-3.5">
        {/* Metric Grid (Mobile friendly 2x2) */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* GPAX Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>เกรดเฉลี่ย (GPAX)</span>
            </div>
            <div className="text-xs font-bold text-slate-800">
              {uni.gpaxMin ? (
                <span className="text-emerald-600 font-bold text-sm">
                  {uni.gpaxMin} ขึ้นไป
                </span>
              ) : (
                <span className="text-slate-500 font-normal">
                  ตามประกาศฉบับเต็ม
                </span>
              )}
            </div>
          </div>

          {/* Quota Seats Box */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              <span>จำนวนรับรอบ Port</span>
            </div>
            <div className="text-xs font-semibold text-slate-800 line-clamp-1">
              {uni.quotaCount.includes('คน') ? uni.quotaCount.split('\n')[0] : 'ตามประกาศ'}
            </div>
          </div>
        </div>

        {/* Timeline Row */}
        <div className="space-y-2 bg-indigo-50/50 border border-indigo-100/70 rounded-xl p-3 text-xs">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-slate-800 block mb-0.5">วันรับสมัครรอบ Port:</span>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed text-[11px]">
                {uni.portDate}
              </p>
            </div>
          </div>

          {uni.quotaRoundDate && (
            <div className="pt-2 border-t border-indigo-100/70 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">รอบโควต้า:</span>
              <span className="font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                {uni.quotaRoundDate}
              </span>
            </div>
          )}
        </div>

        {/* Expandable Section: Guidelines & Full Criteria */}
        {isExpanded && (
          <div className="space-y-3 pt-2 animate-fadeIn text-xs border-t border-slate-100">
            {/* Guidelines */}
            <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>แนวทางการทำ Portfolio & เกณฑ์คัดเลือก</span>
              </div>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed pl-1 text-[11.5px]">
                {uni.portGuidelines}
              </div>
            </div>

            {/* Quota Details if detailed list */}
            {uni.quotaCount.includes('\n') && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>รายละเอียดจำนวนรับแยกตามสาขาวิชาเอก</span>
                </div>
                <div className="text-slate-600 whitespace-pre-line leading-relaxed text-[11px] pl-1 font-mono">
                  {uni.quotaCount}
                </div>
              </div>
            )}

            {/* Curriculum Info */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-blue-900">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>หลักสูตรและวิชาเอกที่เปิดสอน</span>
              </div>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed text-[11px] pl-1">
                {uni.curriculum}
              </p>
            </div>
          </div>
        )}

        {/* Toggle Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 px-3 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-1.5 transition-all"
        >
          {isExpanded ? (
            <>
              <span>ย่อรายละเอียด</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>ดูเกณฑ์และแนวทางทำพอร์ตแบบละเอียด</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Card Actions Footer */}
        <div className="flex items-center gap-2 pt-1">
          {/* Copy for LINE Chat button */}
          <button
            onClick={handleCopyForLine}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>คัดลอกแล้ว!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>แชร์สรุปเข้า LINE</span>
              </>
            )}
          </button>

          {/* Official Website Link button */}
          <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2.5 px-3.5 rounded-xl text-xs font-medium bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 transition-all shrink-0"
            title="เปิดเว็บไซต์รับสมัครของมหาวิทยาลัย"
          >
            <span>เว็บรับสมัคร</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
