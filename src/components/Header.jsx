import React from 'react'
import { Sparkles, Calendar, Layers, Bookmark, Scale, BookOpen } from 'lucide-react'

export default function Header({ activeTab, setActiveTab, bookmarkedCount, lastSyncedAt }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-3xl mx-auto px-4 pt-3.5 pb-2.5">
        {/* Top bar with Badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-sm shadow-indigo-200">
              🧠
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  TCAS 70 รอบ 1 Portfolio
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  จิตวิทยา
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                สรุปข้อมูลรับสมัครรอบพอร์ต
              </h1>
            </div>
          </div>

          {/* Sync Status Badge */}
          {lastSyncedAt && (
            <div className="text-right hidden xs:block">
              <span className="text-[10px] text-slate-400 block">อัปเดตล่าสุด</span>
              <span className="text-[11px] font-medium text-slate-600 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                {lastSyncedAt.split(' ')[0]}
              </span>
            </div>
          )}
        </div>

        {/* Tab Navigation for Mobile */}
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'cards'
                ? 'bg-white text-indigo-700 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>มหาลัย (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'compare'
                ? 'bg-white text-indigo-700 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>เทียบข้อมูล</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all ${
              activeTab === 'tips'
                ? 'bg-white text-indigo-700 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ทริกทำ Port</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-amber-500 text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="รายการที่บันทึกไว้"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            {bookmarkedCount > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
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
