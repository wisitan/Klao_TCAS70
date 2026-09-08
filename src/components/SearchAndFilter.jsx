import React from 'react'
import { Search, X, Filter } from 'lucide-react'

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  selectedUni,
  setSelectedUni,
  selectedDegree,
  setSelectedDegree,
  selectedTrack,
  setSelectedTrack,
  totalResults
}) {
  const unis = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'มศว', label: 'มศว' },
    { id: 'เกษตร', label: 'ม.เกษตร' },
    { id: 'ธรรมศาสตร์', label: 'มธ.' },
    { id: 'ศิลปากร', label: 'ศิลปากร' },
  ]

  const tracks = [
    { id: 'all', label: 'ทุกเอก/แขนง' },
    { id: 'คลินิก', label: '🏥 คลินิก' },
    { id: 'ชุมชน', label: '🤝 ชุมชน' },
    { id: 'พัฒนาการ', label: '🌱 พัฒนาการ' },
    { id: 'ธุรกิจ', label: '💼 ธุรกิจ' },
    { id: 'อุตสาหกรรม', label: '🏢 อุตสาหกรรม' },
  ]

  const hasActiveFilters = searchQuery !== '' || selectedUni !== 'all' || selectedDegree !== 'all' || selectedTrack !== 'all'

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedUni('all')
    setSelectedDegree('all')
    setSelectedTrack('all')
  }

  return (
    <div className="space-y-3 mb-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหามหาลัย, เกณฑ์ GPAX, คลินิก, TCASFolio..."
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips Container */}
      <div className="space-y-2">
        {/* University Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-medium text-slate-400 shrink-0 mr-0.5">มหาลัย:</span>
          {unis.map((u) => (
            <button
              key={u.id}
              onClick={() => setSelectedUni(u.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                selectedUni === u.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>

        {/* Tracks & Degree Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-medium text-slate-400 shrink-0 mr-0.5">วิชาเอก:</span>
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrack(t.id)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all text-[11px] font-medium ${
                selectedTrack === t.id
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
          
          <div className="w-[1px] h-4 bg-slate-200 shrink-0 mx-1"></div>
          
          {/* Degree Filter */}
          <button
            onClick={() => setSelectedDegree(selectedDegree === 'วท.บ.' ? 'all' : 'วท.บ.')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all text-[11px] font-medium ${
              selectedDegree === 'วท.บ.'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            วท.บ.
          </button>
          <button
            onClick={() => setSelectedDegree(selectedDegree === 'ศศ.บ.' ? 'all' : 'ศศ.บ.')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all text-[11px] font-medium ${
              selectedDegree === 'ศศ.บ.'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            ศศ.บ.
          </button>
        </div>
      </div>

      {/* Results & Clear Filter summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
        <span>พบ {totalResults} มหาวิทยาลัย</span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 text-[11px]"
          >
            <X className="w-3 h-3" /> ล้างตัวกรองทั้งหมด
          </button>
        )}
      </div>
    </div>
  )
}
