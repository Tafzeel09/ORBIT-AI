
import React from 'react'
import { Menu } from 'lucide-react'
import { th } from '../utils/index.js'
import { MicDot } from './ui/index.jsx'

export default function TopBar({ title, dark, setMobileOpen, micActive = false }) {
  const t = th(dark)
  return (
    <>
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 24px',
        borderBottom: `1px solid ${t.border}`,
        background: dark ? 'rgba(30,41,59,.95)' : 'rgba(255,255,255,.95)',
        backdropFilter: 'blur(16px)',
      }}>
        <button
          onClick={() => setMobileOpen(true)}
          className='hamburger'
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, display: 'flex', padding: 4, borderRadius: 8 }}
        >
          <Menu size={22} />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 800, color: t.text, margin: 0, flex: 1 }}>{title}</h1>
        <MicDot active={micActive} />
      </div>
      <style>{`
        @media (min-width: 1024px) { .hamburger { display: none !important; } }
      `}</style>
    </>
  )
}
