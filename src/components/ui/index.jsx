
import React from 'react'
import { th } from '../../utils/index.js'

export function Btn({ children, onClick, variant = 'primary', size = 'md', disabled = false, full = false, style = {} }) {
  const variants = {
    primary:   { background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: '#fff', boxShadow: '0 4px 14px rgba(79,70,229,.3)', border: 'none' },
    secondary: { background: 'transparent', color: '#4f46e5', border: '2px solid #4f46e5' },
    danger:    { background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', border: 'none', boxShadow: '0 4px 12px rgba(239,68,68,.25)' },
    ghost:     { background: 'transparent', color: '#64748b', border: 'none' },
    success:   { background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', border: 'none' },
    white:     { background: '#fff', color: '#4f46e5', border: 'none', boxShadow: '0 4px 14px rgba(0,0,0,.1)' },
  }
  const sizes = {
    xs: { padding: '5px 10px',  fontSize: 11 },
    sm: { padding: '7px 13px',  fontSize: 12 },
    md: { padding: '10px 20px', fontSize: 13 },
    lg: { padding: '13px 28px', fontSize: 15 },
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        fontWeight: 700, borderRadius: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'all .18s',
        width: full ? '100%' : 'auto',
        justifyContent: full ? 'center' : 'flex-start',
        ...variants[variant], ...sizes[size], ...style,
      }}
    >
      {children}
    </button>
  )
}

export function Card({ children, dark, style = {} }) {
  const t = th(dark)
  return (
    <div style={{
      background: t.card, border: `1px solid ${t.border}`,
      borderRadius: 20, padding: 22,
      boxShadow: '0 1px 8px rgba(0,0,0,.05)', ...style,
    }}>
      {children}
    </div>
  )
}

export function Inp({ label, value, onChange, placeholder, type = 'text', dark, dir, note, rightEl, style = {} }) {
  const t = th(dark)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 700, color: t.muted }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          style={{
            width: '100%', padding: rightEl ? '10px 44px 10px 14px' : '10px 14px',
            borderRadius: 12, border: `1.5px solid ${t.inputBdr}`,
            background: t.input, color: t.text, fontSize: 13,
            outline: 'none', boxSizing: 'border-box', ...style,
          }}
        />
        {rightEl && (
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
            {rightEl}
          </div>
        )}
      </div>
      {note && <span style={{ fontSize: 11, color: t.muted }}>{note}</span>}
    </div>
  )
}

export function Sel({ label, value, onChange, options, dark }) {
  const t = th(dark)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 700, color: t.muted }}>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '10px 14px', borderRadius: 12,
          border: `1.5px solid ${t.inputBdr}`,
          background: t.input, color: t.text,
          fontSize: 13, outline: 'none',
        }}
      >
        {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  )
}

export function Txt({ label, value, onChange, placeholder, rows = 4, dark, dir }) {
  const t = th(dark)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 700, color: t.muted }}>{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        dir={dir}
        style={{
          padding: '10px 14px', borderRadius: 12,
          border: `1.5px solid ${t.inputBdr}`,
          background: t.input, color: t.text,
          fontSize: 13, outline: 'none',
          resize: 'vertical', width: '100%', boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export function Toggle({ checked, onChange, label, dark, sublabel = '' }) {
  const t = th(dark)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
        {sublabel && <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{sublabel}</div>}
      </div>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 48, height: 26, borderRadius: 13,
          background: checked ? '#4f46e5' : '#cbd5e1',
          cursor: 'pointer', position: 'relative',
          transition: 'background .2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 3,
          left: checked ? 25 : 3,
          width: 20, height: 20,
          borderRadius: '50%', background: '#fff',
          transition: 'left .2s',
          boxShadow: '0 1px 4px rgba(0,0,0,.2)',
        }} />
      </div>
    </div>
  )
}

export function Badge({ children, color = '#4f46e5', bg = '#eef2ff' }) {
  return (
    <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 8 }}>
      {children}
    </span>
  )
}

export function MicDot({ active }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 20,
      background: active ? '#fef2f2' : '#f0fdf4',
      fontSize: 11, fontWeight: 700,
      color: active ? '#ef4444' : '#22c55e',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: active ? '#ef4444' : '#22c55e',
        animation: active ? 'pulse-mic 1s infinite' : 'none',
      }} />
      {active ? 'Mic Active' : 'Mic Off'}
    </span>
  )
}

export function Loader({ dark }) {
  const t = th(dark)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 0' }}>
      {[90, 75, 85, 60, 80].map((w, i) => (
        <div key={i} style={{
          height: 13, borderRadius: 6, background: t.hover,
          width: `${w}%`, animation: 'shimmer 1.4s ease-in-out infinite',
        }} />
      ))}
    </div>
  )
}

export function EmptyState({ icon: Icon, message }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <Icon size={40} color='#d1d5db' style={{ display: 'block', margin: '0 auto 10px' }} />
      <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{message}</p>
    </div>
  )
}
