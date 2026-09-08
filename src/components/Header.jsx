import React from 'react'
import { Calendar, Layers, Bookmark, Scale, BookOpen } from 'lucide-react'

export default function Header({ activeTab, setActiveTab, bookmarkedCount, lastSyncedAt }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-3xl mx-auto px-4 pt-3.5 pb-2.5">
        {/* Top bar with Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-md shadow-indigo-100 shrink-0">
              🧠
            </span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  TCAS 70 รอบ 1 Portfolio
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  จิตวิทยา
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                สรุปข้อมูลรับสมัครรอบพอร์ต
              </h1>
            </div>
          </div>

          {/* Sync Status Badge */}
          {lastSyncedAt && (
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-400 block">อัปเดตล่าสุด</span>
              <span className="text-xs font-bold text-slate-700 font-mono bg-slate-100 px-2 py-1 rounded-lg">
                {lastSyncedAt.split(' ')[0]}
              </span>
            </div>
          )}
        </div>

        {/* Tab Navigation for Mobile (Enlarged for Easy Tapping) */}
        <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-sm font-semibold">
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              activeTab === 'cards'
                ? 'bg-white text-indigo-700 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>มหาลัย (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              activeTab === 'compare'
                ? 'bg-white text-indigo-700 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>เทียบข้อมูล</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              activeTab === 'tips'
                ? 'bg-white text-indigo-700 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>ทริกทำ Port</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-amber-500 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="รายการที่บันทึกไว้"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            {bookmarkedCount > 0 && (
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                activeTab === 'bookmarks' ? 'bg-amber-700 text-white' : 'bg-amber-200 text-amber-900'
              }`}>
                {bookmarkedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
