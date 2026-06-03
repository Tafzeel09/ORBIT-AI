
import React from 'react'
import {
  LayoutDashboard, CalendarCheck, Mic, FileText,
  Wallet, MessageCircle, Settings, Brain,
  ChevronRight, X, Sun, Moon, LogOut,
} from 'lucide-react'
import { th } from '../utils/index.js'
import { NAV_ITEMS } from '../data/index.js'

const ICONS = {
  dashboard: LayoutDashboard,
  planner:   CalendarCheck,
  voice:     Mic,
  proposals: FileText,
  expenses:  Wallet,
  assistant: MessageCircle,
  settings:  Settings,
}

export default function Sidebar({ page, setPage, dark, setDark, lang, mobileOpen, setMobileOpen, user, onLogout }) {
  const t = th(dark)
  const initials = user?.name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || 'U'

  const handleNav = (id) => {
    setPage(id)
    setMobileOpen(false)
  }

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: t.sidebar, borderRight: `1px solid ${t.border}` }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={19} color='#fff' />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: 15, color: t.text }}>Orbit AI</div>
          <div style={{ fontSize: 10, color: '#8b5cf6', fontWeight: 700 }}>Life OS</div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className='close-btn'
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, display: 'flex', padding: 4 }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: t.muted, textTransform: 'uppercase', letterSpacing: 1.2, padding: '6px 10px 8px' }}>
          {lang === 'ur' ? 'مینو' : 'Menu'}
        </div>
        {NAV_ITEMS.map(({ id, label_en, label_ur }) => {
          const Icon = ICONS[id]
          const active = page === id
          return (
            <button
              key={id}
              onClick={() => handleNav(id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 12, marginBottom: 2,
                border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
                background: active ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : 'transparent',
                color: active ? '#fff' : t.muted,
                transition: 'all .15s', textAlign: 'left',
              }}
            >
              <Icon size={17} />
              <span style={{ flex: 1 }}>{lang === 'ur' ? label_ur : label_en}</span>
              {active && <ChevronRight size={13} />}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${t.border}`, padding: '10px' }}>
        <button
          onClick={() => setDark(!dark)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, background: t.hover, color: t.muted, marginBottom: 6 }}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          {dark ? (lang === 'ur' ? 'لائٹ موڈ' : 'Light Mode') : (lang === 'ur' ? 'ڈارک موڈ' : 'Dark Mode')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 12, background: t.hover }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff' }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'User'}
            </div>
            <div style={{ fontSize: 10, color: t.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.email || ''}
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, display: 'flex', padding: 3, borderRadius: 6 }}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className='desktop-sidebar'
        style={{ display: 'none', width: 240, position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 30 }}
      >
        {content}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div style={{ width: 240, flexShrink: 0 }}>{content}</div>
          <div
            style={{ flex: 1, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-sidebar { display: block !important; }
          .close-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}
