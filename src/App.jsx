import React, { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import TimelineCalendar from './components/TimelineCalendar'
import UniversityModal from './components/UniversityModal'
import CompareView from './components/CompareView'
import TipsChecklist from './components/TipsChecklist'
import tcasData from './data/tcas_data.json'
import { Bookmark, Sparkles, FileSpreadsheet, Search, X, ChevronRight } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState('cards') // 'cards' (calendar) | 'compare' | 'tips' | 'bookmarks'
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [activeModalUniId, setActiveModalUniId] = useState(null) // ID of university to show in popup

  // Theme state (persistent)
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('tcas70_theme')
      if (savedTheme) return savedTheme
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch (e) {
      return 'light'
    }
  })

  // Apply theme class to <html>
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('tcas70_theme', theme)
    } catch (e) {}
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    showToast(theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง ☀️' : 'เปลี่ยนเป็นโหมดมืด 🌙')
  }

  // Bookmarks state (persistent)
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('tcas70_psy_bookmarks')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  // Compare selection state (up to 2 universities)
  const [compareIds, setCompareIds] = useState(['uni-1', 'uni-2'])

  useEffect(() => {
    try {
      localStorage.setItem('tcas70_psy_bookmarks', JSON.stringify(bookmarkedIds))
    } catch (e) {}
  }, [bookmarkedIds])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id]
      showToast(exists ? 'ลบออกจากรายการบันทึกแล้ว' : 'บันทึกเข้าในรายการโปรดแล้ว ⭐')
      return next
    })
  }

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev
        return prev.filter((item) => item !== id)
      } else {
        if (prev.length >= 2) {
          return [prev[1], id]
        }
        return [...prev, id]
      }
    })
    setActiveTab('compare')
    showToast('เพิ่มเข้าสู่การเปรียบเทียบเรียบร้อย')
  }

  const universities = tcasData.universities || []
  const metadata = tcasData.metadata || {}

  // Current university object for modal popup
  const activeModalUni = useMemo(() => {
    if (!activeModalUniId) return null
    return universities.find((u) => u.id === activeModalUniId) || null
  }, [activeModalUniId, universities])

  // Badge Styling with Vibrant Light/Dark Mode Contrast for Degree Badges
  const getUniBadgeStyle = (uni) => {
    switch (uni?.theme) {
      case 'swu':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/70 dark:text-rose-200 dark:border-rose-600'
      case 'ku':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/70 dark:text-emerald-200 dark:border-emerald-600'
      case 'tu':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/70 dark:text-amber-200 dark:border-amber-600'
      case 'su':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/70 dark:text-blue-200 dark:border-blue-600'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600'
    }
  }

  // Search Results Filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return universities.filter((u) => {
      const matchText = `
        ${u.university} ${u.shortName} ${u.faculty} ${u.major} 
        ${u.degreeType} ${(u.tracks || []).join(' ')} 
        ${u.portGuidelines} ${u.quotaCount} ${u.portDate}
      `.toLowerCase()
      return matchText.includes(q)
    })
  }, [searchQuery, universities])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-slate-100 dark:text-slate-900 text-white text-sm sm:text-base font-semibold px-5 py-3 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Dark Mode Toggle */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkedCount={bookmarkedIds.length}
        lastSyncedAt={metadata.lastSyncedAt}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-4 sm:py-5">
        {/* TAB 1: CALENDAR VIEW (MONTH GRID & LIST VIEW WITH POPUP) */}
        {activeTab === 'cards' && (
          <div className="space-y-4">
            {/* Quick University Direct-Access Bar (4 Universities) */}
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1.5 px-1">
                แตะเพื่อเปิดดูข้อมูลมหาวิทยาลัยโดยตรง:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {universities.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setActiveModalUniId(u.id)}
                    className="p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left group active:scale-95 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-1">
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {u.shortName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        คณะ{u.faculty}
                      </div>
                    </div>
                    {/* Fixed Degree Badge with High Contrast in Dark Mode */}
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-lg border shrink-0 ${getUniBadgeStyle(u)}`}>
                      {u.degreeType || 'วท.บ.'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาข้อมูลเกณฑ์ (เช่น GPAX 3.00, TCASFolio, คลินิก)..."
                className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title="ล้างคำค้นหา"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown/Card (if user searches) */}
            {searchQuery && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 p-3 shadow-md space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300 px-1">
                  <span>ผลการค้นหา ({searchResults.length} มหาวิทยาลัย)</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[11px] text-slate-400 hover:underline"
                  >
                    ปิดผลค้นหา
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="space-y-1.5">
                    {searchResults.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setActiveModalUniId(u.id)
                          setSearchQuery('')
                        }}
                        className="p-3 bg-slate-50 dark:bg-slate-750 dark:bg-slate-700/60 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white">
                            {u.university} ({u.shortName})
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-300">
                            คณะ{u.faculty} • {u.quotaCount.split('\n')[0]}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                          <span>เปิดดู</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 text-center py-2">
                    ไม่พบข้อมูลที่ตรงกับคำค้นหา
                  </p>
                )}
              </div>
            )}

            {/* Timeline Calendar (Central Interactive Hub with Month Grid & List View) */}
            <TimelineCalendar onSelectUni={(id) => setActiveModalUniId(id)} />
          </div>
        )}

        {/* TAB 2: Compare Mode */}
        {activeTab === 'compare' && (
          <CompareView
            universities={universities}
            preselectedIds={compareIds}
            onClose={() => setActiveTab('cards')}
          />
        )}

        {/* TAB 3: Tips & Checklist */}
        {activeTab === 'tips' && <TipsChecklist />}

        {/* TAB 4: Bookmarks */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-500 fill-current" />
                <span>มหาวิทยาลัยที่บันทึกไว้ ({bookmarkedIds.length})</span>
              </h2>
            </div>

            {bookmarkedIds.length > 0 ? (
              <div className="space-y-3">
                {universities
                  .filter((u) => bookmarkedIds.includes(u.id))
                  .map((uni) => (
                    <div
                      key={uni.id}
                      onClick={() => setActiveModalUniId(uni.id)}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-400 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg border ${getUniBadgeStyle(uni)}`}>
                            {uni.degreeType || 'วท.บ.'}
                          </span>
                          <span className="text-xs text-slate-400">
                            {uni.abbr}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                          {uni.university}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          คณะ{uni.faculty} • สาขา{uni.major}
                        </p>
                      </div>

                      <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <span>เปิดดูข้อมูลเต็ม</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-10 text-center space-y-3">
                <span className="text-4xl">⭐</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">ยังไม่มีมหาวิทยาลัยที่บันทึกไว้</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                  กดไอคอนบุ๊กมาร์ก (ริบบิ้น) ที่มุมบนขวาของการ์ด เพื่อบันทึกมหาวิทยาลัยที่สนใจไว้ดูทีหลังได้ค่ะ
                </p>
                <button
                  onClick={() => setActiveTab('cards')}
                  className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2 rounded-xl hover:bg-indigo-100"
                >
                  กลับไปดูปฏิทิน
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* University Full Modal Pop-up (Opens from both Month Grid and List View) */}
      {activeModalUni && (
        <UniversityModal
          uni={activeModalUni}
          onClose={() => setActiveModalUniId(null)}
          isBookmarked={bookmarkedIds.includes(activeModalUni.id)}
          onToggleBookmark={toggleBookmark}
          isSelectedForCompare={compareIds.includes(activeModalUni.id)}
          onToggleCompare={toggleCompare}
          onShowToast={showToast}
        />
      )}

      {/* Footer info */}
      <footer className="max-w-3xl w-full mx-auto px-4 py-8 text-center text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 mt-8 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>เชื่อมต่อข้อมูลตรงจาก: <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-xs text-slate-800 dark:text-slate-200">{metadata.sourceExcel || 'สรุป_TCAS70_Port_จิตวิทยา.xlsx'}</code></span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          จัดทำขึ้นเพื่อให้เพื่อนเปิดอ่านข้อมูลบนมือถือได้สะดวกและรวดเร็ว • พร้อม Deploy บน Vercel
        </p>
      </footer>
    </div>
  )
}
