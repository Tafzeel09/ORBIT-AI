
import React, { useState } from 'react'
import {
  User, Sun, Globe, Bell, Mic, Shield, Download,
  Brain, Settings, LogOut, ChevronRight, Save, Trash2, Key,
} from 'lucide-react'
import { th, lsDel, lsSet } from '../utils/index.js'
import { Card, Btn, Inp, Sel, Txt, Toggle, Badge } from './ui/index.jsx'

const SECTIONS = [
  { id: 'profile',       Icon: User,     en: 'Profile',       ur: 'پروفائل'     },
  { id: 'appearance',    Icon: Sun,      en: 'Appearance',    ur: 'ظاہری شکل'   },
  { id: 'language',      Icon: Globe,    en: 'Language',      ur: 'زبان'        },
  { id: 'notifications', Icon: Bell,     en: 'Notifications', ur: 'اطلاعات'     },
  { id: 'voice',         Icon: Mic,      en: 'Voice & Mic',   ur: 'وائس'        },
  { id: 'privacy',       Icon: Shield,   en: 'Privacy',       ur: 'پرائیویسی'   },
  { id: 'data',          Icon: Download, en: 'Data Export',   ur: 'ڈیٹا'        },
  { id: 'ai',            Icon: Brain,    en: 'AI Prefs',      ur: 'اے آئی'      },
  { id: 'account',       Icon: Settings, en: 'Account',       ur: 'اکاؤنٹ'      },
]

export default function SettingsPage({
  dark, setDark, lang, setLang,
  settings, setSettings,
  user, onLogout,
  tasks, expenses, notes,
  onUpdateUser,
}) {
  const t = th(dark)
  const [section, setSection] = useState('profile')
  const [profile, setProfile] = useState({
    name:  user?.name  || 'User',
    email: user?.email || '',
    bio:   'Freelancer & Productivity Enthusiast',
    phone: '',
  })
  const [saved, setSaved] = useState(false)

  const upd = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }))

  const saveProfile = () => {
    const updated = { ...user, ...profile }
    lsSet('orbit_auth', updated)
    onUpdateUser(updated)          // ← sync auth state in App.jsx immediately
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const exportData = () => {
    const data = { profile, settings, tasks, expenses, notes, exportedAt: new Date().toISOString() }
    const blob  = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url   = URL.createObjectURL(blob)
    const a     = document.createElement('a')
    a.href     = url
    a.download = 'orbit-ai-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const deleteAllData = () => {
    if (!window.confirm(lang === 'ur' ? 'کیا آپ واقعی تمام ڈیٹا حذف کرنا چاہتے ہیں؟' : 'Delete ALL locally stored data? This cannot be undone.')) return
    ;['orbit_tasks', 'orbit_expenses', 'orbit_notes', 'orbit_settings', 'orbit_auth', 'orbit_api_key'].forEach(lsDel)
    window.location.reload()
  }

  const initials = profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  const renderContent = () => {
    switch (section) {

      case 'profile':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 18 }}>
              {lang === 'ur' ? 'پروفائل ترتیبات' : 'Profile Settings'}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, background: t.hover, border: `1px solid ${t.border}`, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                {initials}
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: 15, color: t.text, margin: '0 0 2px' }}>{profile.name}</p>
                <p style={{ fontSize: 12, color: '#8b5cf6', margin: 0 }}>{profile.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Inp dark={dark} label={lang === 'ur' ? 'پورا نام' : 'Full Name'} value={profile.name} onChange={(v) => setProfile((p) => ({ ...p, name: v }))} />
              <Inp dark={dark} label='Email' type='email' value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} />
              <Inp dark={dark} label={lang === 'ur' ? 'فون' : 'Phone'} value={profile.phone} onChange={(v) => setProfile((p) => ({ ...p, phone: v }))} placeholder='+92 300 0000000' />
              <Txt dark={dark} label='Bio' value={profile.bio} onChange={(v) => setProfile((p) => ({ ...p, bio: v }))} rows={3} />
              <div>
                <Btn onClick={saveProfile} variant={saved ? 'success' : 'primary'}>
                  <Save size={15} /> {saved ? 'Saved! ✓' : (lang === 'ur' ? 'پروفائل محفوظ کریں' : 'Save Profile')}
                </Btn>
              </div>
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 18 }}>
              {lang === 'ur' ? 'ظاہری شکل' : 'Appearance'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
              {[{ label: lang === 'ur' ? 'لائٹ موڈ' : 'Light Mode', icon: '☀️', val: false }, { label: lang === 'ur' ? 'ڈارک موڈ' : 'Dark Mode', icon: '🌙', val: true }].map((m) => (
                <button key={m.label} onClick={() => setDark(m.val)}
                  style={{ padding: '20px 16px', borderRadius: 16, cursor: 'pointer', textAlign: 'center', border: `2px solid ${dark === m.val ? '#4f46e5' : t.border}`, background: dark === m.val ? '#eef2ff' : t.card }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: dark === m.val ? '#4f46e5' : t.text }}>{m.label}</div>
                  {dark === m.val && <div style={{ fontSize: 11, color: '#4f46e5', marginTop: 4, fontWeight: 700 }}>✓ Active</div>}
                </button>
              ))}
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 14, border: `1px solid ${t.border}`, background: t.hover }}>
              <Toggle dark={dark} checked={dark} onChange={setDark} label={lang === 'ur' ? 'ڈارک موڈ' : 'Dark Mode'} sublabel={lang === 'ur' ? 'آنکھوں کے لیے بہتر' : 'Easier on the eyes at night'} />
            </div>
          </div>
        )

      case 'language':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 18 }}>
              {lang === 'ur' ? 'زبان' : 'Language'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[{ code: 'en', name: 'English', native: 'English', flag: '🇬🇧' }, { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' }].map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  style={{ padding: '22px 16px', borderRadius: 16, cursor: 'pointer', textAlign: 'center', border: `2px solid ${lang === l.code ? '#4f46e5' : t.border}`, background: lang === l.code ? '#eef2ff' : t.card }}>
                  <div style={{ fontSize: 34, marginBottom: 8 }}>{l.flag}</div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: lang === l.code ? '#4f46e5' : t.text }}>{l.name}</div>
                  <div style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{l.native}</div>
                  {lang === l.code && <div style={{ fontSize: 11, color: '#4f46e5', marginTop: 6, fontWeight: 700 }}>✓ Active</div>}
                </button>
              ))}
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 18 }}>
              {lang === 'ur' ? 'اطلاعات' : 'Notifications'}
            </h3>
            {[
              { k: 'taskReminders',   en: 'Task Reminders',     ur: 'ٹاسک یاد دہانی',  sub: 'Remind me of overdue tasks'       },
              { k: 'dailySummary',    en: 'Daily Summary',      ur: 'روزانہ خلاصہ',    sub: 'Morning productivity briefing'    },
              { k: 'budgetAlerts',    en: 'Budget Alerts',      ur: 'بجٹ الرٹ',        sub: 'Alert when over 80% of budget'    },
              { k: 'aiSuggestions',   en: 'AI Suggestions',     ur: 'اے آئی تجاویز',  sub: 'Smart productivity tips on dash'  },
              { k: 'weeklyReport',    en: 'Weekly Report',      ur: 'ہفتہ وار رپورٹ', sub: 'Summary every Sunday'             },
            ].map(({ k, en, ur, sub }) => (
              <div key={k} style={{ padding: '14px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.hover, marginBottom: 10 }}>
                <Toggle dark={dark} checked={settings[k] !== false} onChange={(v) => upd(k, v)} label={lang === 'ur' ? ur : en} sublabel={sub} />
              </div>
            ))}
          </div>
        )

      case 'voice':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 18 }}>
              {lang === 'ur' ? 'وائس اور مائیکروفون' : 'Voice & Microphone'}
            </h3>
            <div style={{ padding: '14px 16px', borderRadius: 14, background: dark ? 'rgba(239,68,68,.08)' : '#fef2f2', border: `1px solid ${dark ? 'rgba(239,68,68,.2)' : '#fecaca'}`, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Mic size={14} color='#ef4444' />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#ef4444' }}>{lang === 'ur' ? 'مائیکروفون سٹیٹس' : 'Microphone Policy'}</span>
              </div>
              <p style={{ fontSize: 11, color: dark ? '#fca5a5' : '#b91c1c', margin: 0 }}>
                {lang === 'ur'
                  ? 'مائیکروفون صرف جب آپ ریکارڈ بٹن دبائیں تب چالو ہوتا ہے۔ بیک گراؤنڈ میں کبھی نہیں چلتا۔'
                  : 'Microphone activates ONLY when you press Start Recording. It is never active in the background.'}
              </p>
            </div>
            {[
              { k: 'autoSaveNotes', en: 'Auto-save Notes',          ur: 'خودکار نوٹ محفوظ',      def: true,  sub: 'Save transcript automatically after stopping' },
              { k: 'urduVoice',     en: 'Urdu Voice Recognition',   ur: 'اردو وائس ریکگنیشن',   def: false, sub: 'Set recognition language to ur-PK'            },
              { k: 'noiseReduce',   en: 'Noise Reduction',          ur: 'شور میں کمی',            def: true,  sub: 'Better accuracy in noisy environments'        },
            ].map(({ k, en, ur, def, sub }) => (
              <div key={k} style={{ padding: '14px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.hover, marginBottom: 10 }}>
                <Toggle dark={dark} checked={settings[k] === true || (def && settings[k] !== false)} onChange={(v) => upd(k, v)} label={lang === 'ur' ? ur : en} sublabel={sub} />
              </div>
            ))}
            <Sel dark={dark} label={lang === 'ur' ? 'ریکارڈنگ زبان' : 'Recording Language'} value={settings.voiceLang || 'en-US'} onChange={(v) => upd('voiceLang', v)}
              options={[{ v: 'en-US', l: 'English (US)' }, { v: 'en-GB', l: 'English (UK)' }, { v: 'ur-PK', l: 'Urdu (Pakistan)' }]} />
          </div>
        )

      case 'privacy':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 6 }}>
              {lang === 'ur' ? 'پرائیویسی اور ڈیٹا' : 'Privacy & Data'}
            </h3>
            <p style={{ fontSize: 13, color: t.muted, marginBottom: 18 }}>
              {lang === 'ur' ? 'آپ کا ڈیٹا مکمل طور پر آپ کے ڈیوائس پر محفوظ ہے۔' : 'Your data stays 100% on your device. AI chat messages are only sent through our secure backend when you use AI features.'}
            </p>
            {[
              { icon: '🔒', title: 'Local Storage Only',    desc: 'All tasks, expenses, and notes stored in your browser localStorage. No cloud sync.' },
              { icon: '🎙️', title: 'Voice Privacy',          desc: 'Voice is processed on-device via the Web Speech API. Zero audio uploads to any server.' },
              { icon: '🤖', title: 'AI Chat',                desc: 'AI messages are routed through our secure backend proxy — no API key is ever stored in your browser.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 14, border: `1px solid ${t.border}`, background: t.hover, marginBottom: 12 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: t.text, margin: '0 0 3px' }}>{item.title}</p>
                  <p style={{ fontSize: 11, color: t.muted, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8 }}>
              <Btn variant='danger' onClick={deleteAllData}>
                <Trash2 size={14} /> {lang === 'ur' ? 'تمام ڈیٹا حذف کریں' : 'Delete All My Data'}
              </Btn>
            </div>
          </div>
        )

      case 'data':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 6 }}>
              {lang === 'ur' ? 'ڈیٹا ایکسپورٹ' : 'Data Export'}
            </h3>
            <p style={{ fontSize: 13, color: t.muted, marginBottom: 18 }}>
              {lang === 'ur' ? 'اپنا تمام ڈیٹا JSON فائل میں ڈاؤن لوڈ کریں۔' : 'Download all your data as a JSON backup file.'}
            </p>
            <div style={{ borderRadius: 16, border: `1px solid ${t.border}`, background: t.hover, padding: '16px 18px', marginBottom: 18 }}>
              {[
                { en: 'Tasks & Goals', cnt: tasks.length,    Icon: User     },
                { en: 'Expenses',      cnt: expenses.length, Icon: Download },
                { en: 'Voice Notes',   cnt: notes.length,    Icon: Mic      },
                { en: 'Settings',      cnt: '✓',             Icon: Settings },
              ].map(({ en, cnt, Icon }, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: i < arr.length - 1 ? 12 : 0, marginBottom: i < arr.length - 1 ? 12 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={16} color='#4f46e5' />
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, color: t.text, margin: 0 }}>{en}</p>
                      <p style={{ fontSize: 11, color: t.muted, margin: 0 }}>{cnt} {typeof cnt === 'number' ? 'records' : ''}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 800 }}>✓</span>
                </div>
              ))}
            </div>
            <Btn onClick={exportData}>
              <Download size={15} /> {lang === 'ur' ? 'تمام ڈیٹا ایکسپورٹ کریں' : 'Export All Data (.json)'}
            </Btn>
          </div>
        )

      case 'ai':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 18 }}>
              {lang === 'ur' ? 'اے آئی ترجیحات' : 'AI Preferences'}
            </h3>

            {/* AI status — key lives securely on the backend, never in the browser */}
            <div style={{ padding: '16px', borderRadius: 14, border: `1px solid ${t.border}`, background: t.hover, marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Key size={15} color='#22c55e' />
                <span style={{ fontWeight: 700, fontSize: 13, color: t.text }}>
                  {lang === 'ur' ? 'اے آئی فعال ہے' : 'AI is Active'}
                </span>
              </div>
              <p style={{ fontSize: 11, color: t.muted, marginBottom: 0 }}>
                {lang === 'ur'
                  ? 'اے آئی چیٹ اور تجاویز محفوظ سرور کے ذریعے کام کرتی ہیں۔ آپ کو کوئی API کی درج کرنے کی ضرورت نہیں۔'
                  : 'AI Chat & Proposal Generator run through Orbit AI\'s secure server. No API key needed on your end — it never touches your browser.'}
              </p>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
                ● {lang === 'ur' ? 'محفوظ بیک اینڈ سے منسلک' : 'Connected via secure backend'}
              </div>
            </div>

            {[
              { k: 'aiEnabled',        en: 'Enable AI Features',          ur: 'اے آئی فیچرز',      def: true,  sub: 'Powers proposals and chat assistant'  },
              { k: 'urduResponses',    en: 'Prefer Urdu Responses',       ur: 'اردو جوابات',        def: false, sub: 'AI assistant responds in Urdu'         },
              { k: 'autoExtract',      en: 'Extract Tasks from Notes',    ur: 'ٹاسک نکالنا',       def: true,  sub: 'Auto-detect action items in notes'     },
              { k: 'smartSuggestions', en: 'Smart Dashboard Suggestions', ur: 'سمارٹ تجاویز',      def: true,  sub: 'Daily AI productivity tips on dash'    },
            ].map(({ k, en, ur, def, sub }) => (
              <div key={k} style={{ padding: '14px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.hover, marginBottom: 10 }}>
                <Toggle dark={dark} checked={settings[k] === true || (def && settings[k] !== false)} onChange={(v) => upd(k, v)} label={lang === 'ur' ? ur : en} sublabel={sub} />
              </div>
            ))}

            <Sel dark={dark} label={lang === 'ur' ? 'جواب کا انداز' : 'Response Style'} value={settings.aiStyle || 'balanced'} onChange={(v) => upd('aiStyle', v)}
              options={[{ v: 'concise', l: lang === 'ur' ? 'مختصر' : 'Concise' }, { v: 'balanced', l: lang === 'ur' ? 'متوازن' : 'Balanced' }, { v: 'detailed', l: lang === 'ur' ? 'تفصیلی' : 'Detailed' }]} />
          </div>
        )

      case 'account':
        return (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 18 }}>
              {lang === 'ur' ? 'اکاؤنٹ' : 'Account'}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, border: `1px solid ${t.border}`, background: t.hover, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 13, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                {initials}
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: 14, color: t.text, margin: '0 0 2px' }}>{profile.name}</p>
                <p style={{ fontSize: 12, color: '#8b5cf6', margin: '0 0 4px' }}>{profile.email}</p>
                <Badge children={lang === 'ur' ? 'مفت MVP' : 'Free MVP'} color='#22c55e' bg='#f0fdf4' />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                { en: 'Change Password',  ur: 'پاسورڈ تبدیل کریں'  },
                { en: 'Privacy Settings', ur: 'پرائیویسی ترتیبات'  },
                { en: 'Help & Support',   ur: 'مدد اور سپورٹ'      },
                { en: 'About Orbit AI',   ur: 'اوربٹ کے بارے میں' },
              ].map(({ en, ur }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderRadius: 12, border: `1px solid ${t.border}`, background: t.hover, cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{lang === 'ur' ? ur : en}</span>
                  <ChevronRight size={16} color={t.muted} />
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 18 }}>
              <Btn variant='danger' onClick={onLogout}>
                <LogOut size={15} /> {lang === 'ur' ? 'لاگ آؤٹ' : 'Logout'}
              </Btn>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <div className='settings-grid' style={{ display: 'grid', gap: 20 }}>
        {/* Settings nav */}
        <div className='settings-nav'>
          <Card dark={dark} style={{ padding: '12px 10px' }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: t.muted, padding: '4px 8px 10px', textTransform: 'uppercase', letterSpacing: 1.2, margin: 0 }}>
              Settings
            </p>
            {SECTIONS.map(({ id, Icon, en, ur }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, textAlign: 'left', marginBottom: 2, transition: 'all .15s', background: section === id ? '#4f46e5' : 'transparent', color: section === id ? '#fff' : t.muted }}
              >
                <Icon size={15} />
                {lang === 'ur' ? ur : en}
              </button>
            ))}
          </Card>
        </div>

        {/* Settings content */}
        <Card dark={dark} style={{ minHeight: 400 }}>
          {renderContent()}
        </Card>
      </div>

      <style>{`
        .settings-grid { grid-template-columns: 200px 1fr; }
        @media (max-width: 768px) {
          .settings-grid { grid-template-columns: 1fr !important; }
          .settings-nav { width: 100% !important; }
          .settings-nav > div { display: flex !important; flex-wrap: wrap !important; }
          .settings-nav > div > button { width: auto !important; display: inline-flex !important; margin: 3px !important; }
        }
      `}</style>
    </div>
  )
}
