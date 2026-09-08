import React from 'react'
import { Calendar, Layers, Bookmark, Scale, BookOpen, Sun, Moon } from 'lucide-react'

export default function Header({
  activeTab,
  setActiveTab,
  bookmarkedCount,
  lastSyncedAt,
  theme,
  toggleTheme
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-3xl mx-auto px-4 pt-3.5 pb-2.5">
        {/* Top bar with Badge, Sync Info & Dark Mode Switch */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-md shadow-indigo-100 dark:shadow-none shrink-0">
              🧠
            </span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  TCAS 70 รอบ 1 Portfolio
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  จิตวิทยา
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                สรุปข้อมูลรับสมัครรอบพอร์ต
              </h1>
            </div>
          </div>

          {/* Right Actions: Sync Status & Theme Toggle */}
          <div className="flex items-center gap-2">
            {lastSyncedAt && (
              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-400 block">อัปเดตล่าสุด</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                  {lastSyncedAt.split(' ')[0]}
                </span>
              </div>
            )}

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 active:scale-95 shadow-sm"
              title={theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)' : 'เปลี่ยนเป็นโหมดมืด (Dark Mode)'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation for Mobile */}
        <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl text-sm font-semibold transition-colors">
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              activeTab === 'cards'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>มหาลัย (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              activeTab === 'compare'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>เทียบข้อมูล</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              activeTab === 'tips'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="รายการที่บันทึกไว้"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            {bookmarkedCount > 0 && (
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                activeTab === 'bookmarks'
                  ? 'bg-amber-700 text-white'
                  : 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
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
