
import React from 'react'
import { Plus, Check, CheckCircle2, Mic, Wallet, TrendingUp, Zap, Brain, Sparkles } from 'lucide-react'
import { th } from '../utils/index.js'
import { Card, Badge, Btn } from './ui/index.jsx'

export default function Dashboard({ tasks, expenses, notes, dark, lang, setPage, user }) {
  const t = th(dark)
  const done  = tasks.filter((x) => x.completed).length
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const pct   = tasks.length ? Math.round((done / tasks.length) * 100) : 0
  const hour  = new Date().getHours()
  const greeting =
    hour < 12 ? (lang === 'ur' ? 'صبح بخیر' : 'Good morning') :
    hour < 17 ? (lang === 'ur' ? 'دوپہر بخیر' : 'Good afternoon') :
                (lang === 'ur' ? 'شام بخیر' : 'Good evening')

  const featureCards = [
    { icon: '🧠', label: lang === 'ur' ? 'پلانر'    : 'AI Planner',     page: 'planner',   from: '#4f46e5', to: '#7c3aed' },
    { icon: '🎙️', label: lang === 'ur' ? 'وائس'     : 'Voice Notes',    page: 'voice',     from: '#0ea5e9', to: '#06b6d4' },
    { icon: '💰', label: lang === 'ur' ? 'اخراجات'  : 'Expenses',       page: 'expenses',  from: '#22c55e', to: '#16a34a' },
    { icon: '✍️', label: lang === 'ur' ? 'تجویز'    : 'Proposals',      page: 'proposals', from: '#f97316', to: '#ea580c' },
    { icon: '🤖', label: lang === 'ur' ? 'اسسٹنٹ'   : 'AI Assistant',   page: 'assistant', from: '#8b5cf6', to: '#6d28d9' },
    { icon: '⚙️', label: lang === 'ur' ? 'ترتیبات'  : 'Settings',       page: 'settings',  from: '#64748b', to: '#475569' },
  ]

  const stats = [
    { label: lang === 'ur' ? 'ٹاسک' : 'Tasks',  val: tasks.length,   Icon: CheckCircle2, clr: '#4f46e5', bg: '#eef2ff' },
    { label: lang === 'ur' ? 'مکمل' : 'Done',   val: done,           Icon: Check,        clr: '#22c55e', bg: '#f0fdf4' },
    { label: lang === 'ur' ? 'نوٹس' : 'Notes',  val: notes.length,   Icon: Mic,          clr: '#0ea5e9', bg: '#f0f9ff' },
    { label: 'PKR', val: total > 0 ? `${(total / 1000).toFixed(1)}k` : '0', Icon: Wallet, clr: '#f97316', bg: '#fff7ed' },
  ]

  const suggestions =
    lang === 'ur'
      ? ['اعلی ترجیحی کاموں کو پہلے مکمل کریں', 'آج وائس نوٹ ریکارڈ کریں', 'ماہانہ بجٹ کا جائزہ لیں']
      : ['Focus on high-priority tasks first', 'Record a voice note to capture ideas', 'Review your monthly budget today']

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* ── HERO ── */}
      <div style={{
        borderRadius: 24, overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(135deg,#4338ca 0%,#6d28d9 50%,#7c3aed 100%)',
        padding: '28px 24px',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', borderRadius: 20, padding: '4px 12px', marginBottom: 10 }}>
                <Sparkles size={12} color='#fde68a' />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fde68a' }}>
                  {lang === 'ur' ? 'اے آئی پاورڈ' : 'AI-Powered Productivity'}
                </span>
              </div>
              <h1 style={{ margin: '0 0 5px', fontSize: 'clamp(18px,4vw,26px)', fontWeight: 900, color: '#fff' }}>
                {lang === 'ur' ? 'اوربٹ اے آئی میں خوش آمدید' : 'Welcome to Orbit AI'}
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,.75)' }}>
                {lang === 'ur' ? 'آپ کا اے آئی پاورڈ لائف آپریٹنگ سسٹم' : 'Your AI-powered life operating system'}
              </p>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,.6)' }}>
                {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
              </p>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,.12)', borderRadius: 14, padding: '12px 18px', flexShrink: 0 }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', marginTop: 2, fontWeight: 600 }}>
                {lang === 'ur' ? 'آج' : 'Today'}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,.65)', marginBottom: 6 }}>
              <span>{lang === 'ur' ? 'پیشرفت' : 'Progress'}</span>
              <span>{done}/{tasks.length}</span>
            </div>
            <div style={{ height: 7, background: 'rgba(255,255,255,.2)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: 7, width: `${pct}%`, background: '#fff', borderRadius: 4, transition: 'width .6s' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
            <Btn variant='white' size='sm' onClick={() => setPage('planner')}>
              <Plus size={14} /> {lang === 'ur' ? 'ٹاسک شامل' : 'Add Task'}
            </Btn>
            <Btn size='sm' onClick={() => setPage('assistant')}
              style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }}>
              <Brain size={14} /> {lang === 'ur' ? 'اے آئی' : 'Ask AI'}
            </Btn>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 14 }}>
        {stats.map(({ label, val, Icon, clr, bg }, i) => (
          <div key={i} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: '16px 18px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Icon size={17} color={clr} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: t.text }}>{val}</div>
            <div style={{ fontSize: 11, color: t.muted, marginTop: 2, fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURE CARDS ── */}
      <Card dark={dark}>
        <div style={{ fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 16 }}>
          {lang === 'ur' ? 'فیچرز' : 'Quick Navigation'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 12 }}>
          {featureCards.map(({ icon, label, page, from, to }, i) => (
            <button
              key={i}
              onClick={() => setPage(page)}
              style={{
                background: `linear-gradient(135deg,${from},${to})`, color: '#fff', border: 'none',
                borderRadius: 16, padding: '16px 14px', cursor: 'pointer', textAlign: 'left',
                transition: 'transform .18s', boxShadow: `0 4px 14px ${from}40`,
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = '' }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* ── AI SUGGESTIONS + RECENT TASKS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
        <Card dark={dark}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={13} color='#fff' />
            </div>
            <span style={{ fontWeight: 800, fontSize: 13, color: t.text }}>{lang === 'ur' ? 'اے آئی تجاویز' : 'AI Suggestions'}</span>
          </div>
          {suggestions.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 12, background: t.hover, marginBottom: 8 }} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: '#4f46e5' }}>{i + 1}</span>
              </div>
              <p style={{ fontSize: 12, color: t.muted, margin: 0, lineHeight: 1.5 }}>{s}</p>
            </div>
          ))}
        </Card>

        <Card dark={dark}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: t.text }}>{lang === 'ur' ? 'حالیہ ٹاسک' : 'Recent Tasks'}</span>
            <button onClick={() => setPage('planner')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#4f46e5', cursor: 'pointer', fontWeight: 700 }}>
              {lang === 'ur' ? 'سب →' : 'All →'}
            </button>
          </div>
          {tasks.slice(0, 4).map((task) => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: t.hover, marginBottom: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${task.completed ? '#22c55e' : '#d1d5db'}`, background: task.completed ? '#22c55e' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {task.completed && <Check size={11} color='#fff' />}
              </div>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: task.completed ? t.muted : t.text, textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              <Badge
                children={task.priority}
                color={task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#22c55e'}
                bg={task.priority === 'high' ? '#fef2f2' : task.priority === 'medium' ? '#fffbeb' : '#f0fdf4'}
              />
            </div>
          ))}
          {tasks.length === 0 && (
            <p style={{ textAlign: 'center', color: t.muted, fontSize: 12, padding: '16px 0', margin: 0 }}>
              {lang === 'ur' ? 'کوئی ٹاسک نہیں' : 'No tasks yet!'}
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
