
import React, { useState } from 'react'
import { Brain, Eye, EyeOff, ArrowRight, Shield, AlertTriangle } from 'lucide-react'
import { Btn, Inp } from './ui/index.jsx'
import { th } from '../utils/index.js'

export default function AuthPage({ onAuth, dark }) {
  const t = th(dark)
  const [mode,    setMode]    = useState('login')
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw,  setShowPw]  = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const handleSubmit = () => {
    setError('')
    if (!email.trim() || !pass.trim()) { setError('Please fill all required fields.'); return }
    if (!validEmail(email))            { setError('Enter a valid email address.'); return }
    if (pass.length < 6)               { setError('Password must be at least 6 characters.'); return }
    if (mode === 'signup') {
      if (!name.trim())    { setError('Please enter your full name.'); return }
      if (pass !== confirm) { setError('Passwords do not match.'); return }
    }
    setLoading(true)
    setTimeout(() => {
      const user = {
        name: mode === 'signup' ? name : email.split('@')[0],
        email,
        createdAt: new Date().toISOString(),
      }
      onAuth(user)
      setLoading(false)
    }, 900)
  }

  const eyeBtn = (
    <button
      onClick={() => setShowPw(!showPw)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, display: 'flex' }}
    >
      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  )

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, background: dark ? '#0f172a' : 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    }}>
      <div style={{
        width: '100%', maxWidth: 440, borderRadius: 24, overflow: 'hidden',
        background: dark ? 'rgba(30,41,59,.97)' : 'rgba(255,255,255,.98)',
        boxShadow: '0 24px 64px rgba(0,0,0,.25)',
        border: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.5)'}`,
      }}>
        {/* Header gradient */}
        <div style={{ background: 'linear-gradient(135deg,#4338ca,#7c3aed)', padding: '28px 32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: 'rgba(255,255,255,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Brain size={22} color='#fff' />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: '#fff' }}>Orbit AI</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>Your Life Operating System</div>
            </div>
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#fff' }}>
            {mode === 'login' ? 'Welcome back 👋' : 'Create account ✨'}
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'rgba(255,255,255,.75)' }}>
            {mode === 'login' ? 'Sign in to your Orbit AI workspace' : 'Start your productivity journey today'}
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '28px 32px' }}>
          {/* Mode toggle */}
          <div style={{ display: 'flex', background: t.hover, borderRadius: 12, padding: 4, marginBottom: 22 }}>
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, transition: 'all .2s',
                  background: mode === m ? '#4f46e5' : 'transparent',
                  color: mode === m ? '#fff' : t.muted,
                }}
              >
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'signup' && (
              <Inp dark={dark} label='Full Name' value={name} onChange={setName} placeholder='Ahmed Ali' />
            )}
            <Inp dark={dark} label='Email Address' type='email' value={email} onChange={setEmail} placeholder='you@example.com' />
            <Inp dark={dark} label='Password' type={showPw ? 'text' : 'password'} value={pass} onChange={setPass} placeholder='Min. 6 characters' rightEl={eyeBtn} />
            {mode === 'signup' && (
              <Inp dark={dark} label='Confirm Password' type={showPw ? 'text' : 'password'} value={confirm} onChange={setConfirm} placeholder='Re-enter password' />
            )}

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 600 }}>
                <AlertTriangle size={14} />
                {error}
              </div>
            )}

            <Btn full onClick={handleSubmit} disabled={loading} size='lg' style={{ marginTop: 4 }}>
              {loading ? (
                <>
                  <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%' }} className='spin' />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
              )}
            </Btn>
          </div>

          <div style={{ marginTop: 18, padding: '12px 16px', borderRadius: 12, background: t.hover, border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.muted, marginBottom: 3 }}>🎯 Demo Access</div>
            <div style={{ fontSize: 11, color: t.muted }}>Use any valid email + password (6+ chars) to explore the app.</div>
          </div>

          <div style={{ marginTop: 14, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 11, color: t.muted }}>
            <Shield size={12} /> All data stored locally on your device only.
          </div>
        </div>
      </div>
    </div>
  )
}
