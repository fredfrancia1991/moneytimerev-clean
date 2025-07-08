"use client"
import { useState } from 'react'

export type Tab = {
  label: string
  content: React.ReactNode
}

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="flex space-x-4 border-b mb-4">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`pb-2 font-medium ${i === active ? 'border-b-2 border-[#187072]' : 'text-gray-500'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  )
}
