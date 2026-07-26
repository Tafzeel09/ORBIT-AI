
import React, { useState, useEffect } from 'react'
import { ls, lsSet, lsDel } from './utils/index.js'
import { SEED_TASKS, SEED_EXPENSES } from './data/index.js'

import AuthPage          from './components/AuthPage.jsx'
import Sidebar           from './components/Sidebar.jsx'
import TopBar            from './components/TopBar.jsx'
import Dashboard         from './components/Dashboard.jsx'
import AIPlanner         from './components/AIPlanner.jsx'
import VoiceNotes        from './components/VoiceNotes.jsx'
import ProposalGenerator from './components/ProposalGenerator.jsx'
import ExpenseTracker    from './components/ExpenseTracker.jsx'
import UrduAssistant     from './components/UrduAssistant.jsx'
import SettingsPage      from './components/SettingsPage.jsx'

const PAGE_TITLES = {
  en: {
    dashboard:  'Dashboard',
    planner:    'AI Planner',
    voice:      'Voice Notes',
    proposals:  'Proposal Generator',
    expenses:   'Expense Tracker',
    assistant:  'AI Assistant',
    settings:   'Settings',
  },
  ur: {
    dashboard:  'ڈیش بورڈ',
    planner:    'اے آئی پلانر',
    voice:      'وائس نوٹس',
    proposals:  'تجویز جنریٹر',
    expenses:   'اخراجات ٹریکر',
    assistant:  'اے آئی اسسٹنٹ',
    settings:   'ترتیبات',
  },
}

export default function App() {
  // ── Auth ─────────────────────────────────────────────────────
  const [auth, setAuth] = useState(() => ls('orbit_auth', null))

  // ── Navigation ───────────────────────────────────────────────
  const [page,       setPage]       = useState('dashboard')
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [micActive,  setMicActive]  = useState(false)

  // ── Theme & language ─────────────────────────────────────────
  const [dark, setDark] = useState(() => ls('orbit_dark', true))
  const [lang, setLang] = useState(() => ls('orbit_lang', 'en'))

  // ── App data ─────────────────────────────────────────────────
  const [tasks,    setTasks]    = useState(() => ls('orbit_tasks',    SEED_TASKS))
  const [expenses, setExpenses] = useState(() => ls('orbit_expenses', SEED_EXPENSES))
  const [notes,    setNotes]    = useState(() => ls('orbit_notes',    []))
  const [settings, setSettings] = useState(() => ls('orbit_settings', {}))

  // ── Persist to localStorage ───────────────────────────────────
  useEffect(() => { lsSet('orbit_dark',     dark)     }, [dark])
  useEffect(() => { lsSet('orbit_lang',     lang)     }, [lang])
  useEffect(() => { lsSet('orbit_tasks',    tasks)    }, [tasks])
  useEffect(() => { lsSet('orbit_expenses', expenses) }, [expenses])
  useEffect(() => { lsSet('orbit_notes',    notes)    }, [notes])
  useEffect(() => { lsSet('orbit_settings', settings) }, [settings])

  // ── Handlers ─────────────────────────────────────────────────
  const handleAuth = (user) => {
    lsSet('orbit_auth', user)
    setAuth(user)
  }

  const handleLogout = () => {
    lsDel('orbit_auth')
    setAuth(null)
    setPage('dashboard')
    setMenuOpen(false)
  }

  // ── Auth gate ─────────────────────────────────────────────────
  if (!auth) {
    return <AuthPage onAuth={handleAuth} dark={dark} />
  }

  const title = PAGE_TITLES[lang]?.[page] || 'Orbit AI'

  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? '#0f172a' : '#f1f5f9',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      direction: lang === 'ur' ? 'rtl' : 'ltr',
    }}>
      {/* Sidebar */}
      <Sidebar
        page={page}
        setPage={setPage}
        dark={dark}
        setDark={setDark}
        lang={lang}
        mobileOpen={menuOpen}
        setMobileOpen={setMenuOpen}
        user={auth}
        onLogout={handleLogout}
      />

      {/* Main content area */}
      <div
        className='main-content'
        style={{ marginLeft: 0, transition: 'margin .2s' }}
      >
        <TopBar
          title={title}
          dark={dark}
          setMobileOpen={setMenuOpen}
          micActive={micActive}
        />

        <main>
          {page === 'dashboard' && (
            <Dashboard
              tasks={tasks}
              expenses={expenses}
              notes={notes}
              dark={dark}
              lang={lang}
              setPage={setPage}
              user={auth}
            />
          )}
          {page === 'planner' && (
            <AIPlanner
              tasks={tasks}
              setTasks={setTasks}
              dark={dark}
              lang={lang}
            />
          )}
          {page === 'voice' && (
            <VoiceNotes
              notes={notes}
              setNotes={setNotes}
              dark={dark}
              lang={lang}
              onMicChange={setMicActive}
            />
          )}
          {page === 'proposals' && (
            <ProposalGenerator
              dark={dark}
              lang={lang}
            />
          )}
          {page === 'expenses' && (
            <ExpenseTracker
              expenses={expenses}
              setExpenses={setExpenses}
              dark={dark}
              lang={lang}
            />
          )}
          {page === 'assistant' && (
            <UrduAssistant
              dark={dark}
              lang={lang}
            />
          )}
          {page === 'settings' && (
            <SettingsPage
              dark={dark}
              setDark={setDark}
              lang={lang}
              setLang={setLang}
              settings={settings}
              setSettings={setSettings}
              user={auth}
              onUpdateUser={(updated) => setAuth(updated)}
              onLogout={handleLogout}
              tasks={tasks}
              expenses={expenses}
              notes={notes}
            />
          )}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .main-content { margin-left: 240px !important; }
        }
      `}</style>
    </div>
  )
}
