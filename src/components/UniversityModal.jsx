import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import UniversityCard from './UniversityCard'

export default function UniversityModal({
  uni,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isSelectedForCompare,
  onToggleCompare,
  onShowToast
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!uni) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 dark:border-slate-700 animate-scaleUp">
        {/* Sticky Close Button Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              รายละเอียดหลักสูตร
            </span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {uni.shortName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="ปิดหน้าต่าง (Close)"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-1">
          <UniversityCard
            uni={uni}
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark}
            isSelectedForCompare={isSelectedForCompare}
            onToggleCompare={onToggleCompare}
            onShowToast={onShowToast}
            isInsideModal={true}
          />
        </div>
      </div>
    </div>
  )
}
