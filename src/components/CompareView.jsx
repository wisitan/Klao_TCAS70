import React, { useState } from 'react'
import { Scale, ExternalLink } from 'lucide-react'

export default function CompareView({ universities, preselectedIds }) {
  const [selectedA, setSelectedA] = useState(preselectedIds[0] || (universities[0] ? universities[0].id : ''))
  const [selectedB, setSelectedB] = useState(
    preselectedIds[1] || (universities[1] ? universities[1].id : (universities[0] ? universities[0].id : ''))
  )

  const uniA = universities.find((u) => u.id === selectedA) || universities[0]
  const uniB = universities.find((u) => u.id === selectedB) || universities[1] || universities[0]

  const compareRows = [
    {
      title: 'วุฒิปริญญา',
      render: (u) => <span className="font-bold text-slate-900 text-sm sm:text-base">{u.degreeType}</span>
    },
    {
      title: 'คณะ / สาขา',
      render: (u) => (
        <span className="text-slate-800 text-sm sm:text-base leading-snug">
          คณะ{u.faculty} • สาขา{u.major}
        </span>
      )
    },
    {
      title: 'เกรดเฉลี่ย (GPAX)',
      render: (u) => (
        <span className="font-extrabold text-emerald-700 text-base sm:text-lg">
          {u.gpaxMin ? `${u.gpaxMin} ขึ้นไป` : 'ตามประกาศฉบับเต็ม'}
        </span>
      )
    },
    {
      title: 'จำนวนรับรอบ Port',
      render: (u) => (
        <span className="text-slate-900 font-bold whitespace-pre-line text-sm sm:text-base leading-relaxed">
          {u.quotaCount}
        </span>
      )
    },
    {
      title: 'วันรับสมัคร Port',
      render: (u) => (
        <span className="text-slate-800 whitespace-pre-line text-sm sm:text-base leading-relaxed">
          {u.portDate}
        </span>
      )
    },
    {
      title: 'รอบโควต้า',
      render: (u) => <span className="text-slate-800 font-semibold text-sm sm:text-base">{u.quotaRoundDate}</span>
    },
    {
      title: 'วิชาเอก / แขนงที่เปิด',
      render: (u) => (
        <div className="flex flex-wrap gap-1.5">
          {u.tracks && u.tracks.map((t, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-md border border-slate-200">
              {t}
            </span>
          ))}
        </div>
      )
    },
    {
      title: 'แนวทาง & เกณฑ์เด่น',
      render: (u) => (
        <p className="text-slate-700 text-sm sm:text-base whitespace-pre-line leading-relaxed">
          {u.portGuidelines.slice(0, 300)}...
        </p>
      )
    },
    {
      title: 'เว็บไซต์',
      render: (u) => (
        <a
          href={u.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1.5 text-sm sm:text-base"
        >
          <span>เปิดเว็บระเบียบการ</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )
    }
  ]

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl border border-slate-300 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <Scale className="w-6 h-6 text-indigo-600 shrink-0" />
          <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl">เปรียบเทียบข้อมูล 2 มหาวิทยาลัย</h2>
        </div>

        <p className="text-sm sm:text-base text-slate-600 mb-5">
          เลือกมหาวิทยาลัย 2 แห่งเพื่อเปรียบเทียบเกณฑ์ GPAX, จำนวนรับ, และข้อกำหนดพอร์ตเคียงข้างกัน
        </p>

        {/* Selectors for University A & B with Large Text */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Uni A Dropdown */}
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-500 block mb-1.5">มหาวิทยาลัยที่ 1</label>
            <select
              value={selectedA}
              onChange={(e) => setSelectedA(e.target.value)}
              className="w-full text-sm sm:text-base font-bold p-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.shortName}
                </option>
              ))}
            </select>
          </div>

          {/* Uni B Dropdown */}
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-500 block mb-1.5">มหาวิทยาลัยที่ 2</label>
            <select
              value={selectedB}
              onChange={(e) => setSelectedB(e.target.value)}
              className="w-full text-sm sm:text-base font-bold p-3 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.shortName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-hidden border border-slate-300 rounded-2xl">
          {/* Table Headers */}
          <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-300 text-sm sm:text-base font-extrabold text-slate-900">
            <div className="p-3.5 border-r border-slate-300 text-center bg-indigo-50 text-indigo-900">
              {uniA?.shortName}
            </div>
            <div className="p-3.5 text-center bg-rose-50 text-rose-900">
              {uniB?.shortName}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-200">
            {compareRows.map((row, idx) => (
              <div key={idx} className="hover:bg-slate-50/70 transition-colors">
                <div className="bg-slate-100/80 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider border-t border-slate-300">
                  {row.title}
                </div>
                <div className="grid grid-cols-2 text-sm sm:text-base divide-x divide-slate-300 p-3 sm:p-4">
                  <div className="pr-3 leading-relaxed">
                    {uniA ? row.render(uniA) : '-'}
                  </div>
                  <div className="pl-3 leading-relaxed">
                    {uniB ? row.render(uniB) : '-'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
