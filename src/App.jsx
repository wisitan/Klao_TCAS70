import React, { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import TimelineCalendar from './components/TimelineCalendar'
import SearchAndFilter from './components/SearchAndFilter'
import UniversityCard from './components/UniversityCard'
import CompareView from './components/CompareView'
import TipsChecklist from './components/TipsChecklist'
import tcasData from './data/tcas_data.json'
import { Bookmark, Sparkles, FileSpreadsheet } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState('cards') // 'cards' | 'compare' | 'tips' | 'bookmarks'
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  
  // Bookmarks state (persistent in localStorage)
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

  // Filter Logic (Search Query & Bookmarks)
  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      // If bookmarks tab active, only show bookmarked
      if (activeTab === 'bookmarks' && !bookmarkedIds.includes(u.id)) {
        return false
      }

      // Filter by Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase()
        const matchText = `
          ${u.university} ${u.shortName} ${u.faculty} ${u.major} 
          ${u.degreeType} ${(u.tracks || []).join(' ')} 
          ${u.portGuidelines} ${u.quotaCount} ${u.portDate}
        `.toLowerCase()

        if (!matchText.includes(q)) return false
      }

      return true
    })
  }, [universities, activeTab, bookmarkedIds, searchQuery])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm sm:text-base font-semibold px-5 py-3 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkedCount={bookmarkedIds.length}
        lastSyncedAt={metadata.lastSyncedAt}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5">
        {/* TAB 1: University Cards + Timeline Calendar */}
        {activeTab === 'cards' && (
          <div className="space-y-4">
            {/* Timeline Calendar Overview on Front Page */}
            <TimelineCalendar />

            {/* Quick Search */}
            <SearchAndFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredUniversities.length}
            />

            {/* University Cards List */}
            {filteredUniversities.length > 0 ? (
              <div className="space-y-4">
                {filteredUniversities.map((uni) => (
                  <UniversityCard
                    key={uni.id}
                    uni={uni}
                    isBookmarked={bookmarkedIds.includes(uni.id)}
                    onToggleBookmark={toggleBookmark}
                    isSelectedForCompare={compareIds.includes(uni.id)}
                    onToggleCompare={toggleCompare}
                    onShowToast={showToast}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-300 p-8 text-center space-y-3">
                <span className="text-4xl">🔍</span>
                <h3 className="font-bold text-slate-900 text-base">ไม่พบข้อมูลที่ตรงกับคำค้นหา</h3>
                <p className="text-sm text-slate-600">
                  ลองล้างคำค้นหา แล้วพิมพ์ค้นหาใหม่อีกครั้งนะคะ
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100"
                >
                  แสดงทั้งหมด 4 มหาวิทยาลัย
                </button>
              </div>
            )}
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
              <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-500 fill-current" />
                <span>มหาวิทยาลัยที่บันทึกไว้ ({bookmarkedIds.length})</span>
              </h2>
            </div>

            {bookmarkedIds.length > 0 ? (
              <div className="space-y-4">
                {universities
                  .filter((u) => bookmarkedIds.includes(u.id))
                  .map((uni) => (
                    <UniversityCard
                      key={uni.id}
                      uni={uni}
                      isBookmarked={true}
                      onToggleBookmark={toggleBookmark}
                      isSelectedForCompare={compareIds.includes(uni.id)}
                      onToggleCompare={toggleCompare}
                      onShowToast={showToast}
                    />
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-300 p-10 text-center space-y-3">
                <span className="text-4xl">⭐</span>
                <h3 className="font-bold text-slate-900 text-base">ยังไม่มีมหาวิทยาลัยที่บันทึกไว้</h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  กดไอคอนบุ๊กมาร์ก (ริบบิ้น) ที่มุมบนขวาของการ์ด เพื่อบันทึกมหาวิทยาลัยที่สนใจไว้ดูทีหลังได้ค่ะ
                </p>
                <button
                  onClick={() => setActiveTab('cards')}
                  className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100"
                >
                  กลับไปดูรายชื่อทั้งหมด
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer info */}
      <footer className="max-w-3xl w-full mx-auto px-4 py-8 text-center text-slate-500 border-t border-slate-200 mt-10 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>เชื่อมต่อข้อมูลตรงจาก: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs text-slate-800">{metadata.sourceExcel || 'สรุป_TCAS70_Port_จิตวิทยา.xlsx'}</code></span>
        </div>
        <p className="text-xs text-slate-400">
          จัดทำขึ้นเพื่อให้เพื่อนเปิดอ่านข้อมูลบนมือถือได้สะดวกและรวดเร็ว • พร้อม Deploy บน Vercel
        </p>
      </footer>
    </div>
  )
}
