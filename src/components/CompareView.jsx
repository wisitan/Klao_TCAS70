import React, { useState } from 'react'
import { Scale, ArrowLeftRight, Check, X, ExternalLink, Award, Users, Calendar, FileText } from 'lucide-react'

export default function CompareView({ universities, preselectedIds, onClose }) {
  const [selectedA, setSelectedA] = useState(preselectedIds[0] || (universities[0] ? universities[0].id : ''))
  const [selectedB, setSelectedB] = useState(
    preselectedIds[1] || (universities[1] ? universities[1].id : (universities[0] ? universities[0].id : ''))
  )

  const uniA = universities.find((u) => u.id === selectedA) || universities[0]
  const uniB = universities.find((u) => u.id === selectedB) || universities[1] || universities[0]

  const compareRows = [
    {
      title: 'วุฒิปริญญา',
      render: (u) => <span className="font-semibold text-slate-800">{u.degreeType}</span>
    },
    {
      title: 'คณะ / สาขา',
      render: (u) => (
        <span className="text-slate-700">
          คณะ{u.faculty} • สาขา{u.major}
        </span>
      )
    },
    {
      title: 'เกรดเฉลี่ย (GPAX)',
      render: (u) => (
        <span className="font-bold text-emerald-600">
          {u.gpaxMin ? `${u.gpaxMin} ขึ้นไป` : 'ตามประกาศฉบับเต็ม'}
        </span>
      )
    },
    {
      title: 'จำนวนรับรอบ Port',
      render: (u) => (
        <span className="text-slate-800 font-medium whitespace-pre-line text-[11px]">
          {u.quotaCount}
        </span>
      )
    },
    {
      title: 'วันรับสมัคร Port',
      render: (u) => (
        <span className="text-slate-700 whitespace-pre-line text-[11px] leading-relaxed">
          {u.portDate}
        </span>
      )
    },
    {
      title: 'รอบโควต้า',
      render: (u) => <span className="text-slate-700">{u.quotaRoundDate}</span>
    },
    {
      title: 'วิชาเอก / แขนงที่เปิด',
      render: (u) => (
        <div className="flex flex-wrap gap-1">
          {u.tracks && u.tracks.map((t, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      )
    },
    {
      title: 'แนวทาง & เกณฑ์เด่น',
      render: (u) => (
        <p className="text-slate-600 text-[11px] whitespace-pre-line leading-relaxed">
          {u.portGuidelines.slice(0, 220)}...
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
          className="text-indigo-600 hover:underline flex items-center gap-1 text-[11px] font-medium"
        >
          <span>เปิดเว็บ</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )
    }
  ]

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800 text-base">เปรียบเทียบข้อมูล 2 มหาวิทยาลัย</h2>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4">
          เลือกมหาวิทยาลัย 2 แห่งเพื่อเปรียบเทียบเกณฑ์ GPAX, จำนวนรับ, และข้อกำหนดพอร์ตเคียงข้างกัน
        </p>

        {/* Selectors for University A & B */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Uni A Dropdown */}
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">มหาวิทยาลัยที่ 1</label>
            <select
              value={selectedA}
              onChange={(e) => setSelectedA(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
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
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">มหาวิทยาลัยที่ 2</label>
            <select
              value={selectedB}
              onChange={(e) => setSelectedB(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
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
        <div className="overflow-hidden border border-slate-200 rounded-xl">
          {/* Table Headers */}
          <div className="grid grid-cols-2 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800">
            <div className="p-3 border-r border-slate-200 text-center bg-indigo-50/50 text-indigo-900">
              {uniA?.shortName}
            </div>
            <div className="p-3 text-center bg-rose-50/50 text-rose-900">
              {uniB?.shortName}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {compareRows.map((row, idx) => (
              <div key={idx} className="hover:bg-slate-50/70 transition-colors">
                <div className="bg-slate-50/80 px-3 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-t border-slate-200">
                  {row.title}
                </div>
                <div className="grid grid-cols-2 text-xs divide-x divide-slate-200 p-2.5">
                  <div className="pr-2 leading-relaxed">
                    {uniA ? row.render(uniA) : '-'}
                  </div>
                  <div className="pl-2 leading-relaxed">
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
