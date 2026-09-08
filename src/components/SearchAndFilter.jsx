import React from 'react'
import { Search, X } from 'lucide-react'

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  totalResults
}) {
  return (
    <div className="mb-4 space-y-2">
      {/* Clean & Large Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาข้อมูล (เช่น ธรรมศาสตร์, GPAX 3.00, TCASFolio, คลินิก)..."
          className="w-full pl-12 pr-11 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-base sm:text-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
            title="ล้างคำค้นหา"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Query status count */}
      {searchQuery && (
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 px-1">
          <span>พบ {totalResults} มหาวิทยาลัยจากคำค้นหา</span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-xs flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> ล้างการค้นหา
          </button>
        </div>
      )}
    </div>
  )
}
