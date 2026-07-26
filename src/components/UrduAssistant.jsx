
import React, { useState, useRef, useEffect } from 'react'
import { Send, RefreshCw, Brain } from 'lucide-react'
import { th, genId, callClaude } from '../utils/index.js'
import { Btn } from './ui/index.jsx'

const SYSTEM_PROMPT = `You are Orbit AI, a helpful and friendly productivity assistant with full Urdu and English support.
- When the user writes in Urdu, respond warmly in Urdu (Nastaliq script).
- When the user writes in English, respond in English.
- Help with: tasks, planning, freelancing tips, study advice, motivation, budgeting, and daily productivity.
- Keep responses concise (2-4 sentences unless detail is requested), practical, and encouraging.
- Never break character. Always be supportive.`

export default function UrduAssistant({ dark, lang }) {
  const t = th(dark)
  const initialMsg = {
    id: '1',
    role: 'assistant',
    content: lang === 'ur'
      ? 'السلام علیکم! میں آپ کا اوربٹ اے آئی اسسٹنٹ ہوں۔ اردو یا انگریزی میں سوال کریں 🌟'
      : "Hello! I'm your Orbit AI assistant with full Urdu & English support. Ask me anything! 🌟",
  }

  const [msgs,    setMsgs]    = useState([initialMsg])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const isUrdu = (str) => /[\u0600-\u06FF]/.test(str)

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = { id: genId(), role: 'user', content: input.trim() }
    const history = [...msgs, userMsg]
    setMsgs(history)
    setInput('')
    setLoading(true)

    try {
      const text = await callClaude(
        history.map((m) => ({ role: m.role, content: m.content })),
        SYSTEM_PROMPT
      )
      setMsgs((prev) => [...prev, { id: genId(), role: 'assistant', content: text }])
    } catch (err) {
      const errText = lang === 'ur' ? 'خرابی آئی۔ دوبارہ کوشش کریں۔' : `Error: ${err.message}. Please try again.`
      setMsgs((prev) => [...prev, { id: genId(), role: 'assistant', content: errText }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => setMsgs([{ ...initialMsg, id: genId() }])

  return (
    <div style={{ padding: 24, height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column' }}>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 20, border: `1px solid ${t.border}`, background: t.card, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,.06)', minHeight: 0 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} color='#fff' />
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: 14, color: t.text, margin: 0 }}>Orbit AI Assistant</p>
            <p style={{ fontSize: 11, color: '#22c55e', margin: 0, fontWeight: 600 }}>● Online — EN / اردو</p>
          </div>
          <button
            onClick={clearChat}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: t.muted, display: 'flex', padding: 6, borderRadius: 8 }}
            title='Clear chat'
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.map((msg) => {
            const ur      = isUrdu(msg.content)
            const isUser  = msg.role === 'user'
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                {!isUser && (
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Brain size={13} color='#fff' />
                  </div>
                )}
                <div style={{
                  maxWidth: '75%', padding: '11px 15px', fontSize: 13, lineHeight: 1.65,
                  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: isUser ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : t.hover,
                  color: isUser ? '#fff' : t.text,
                  direction: ur ? 'rtl' : 'ltr',
                  textAlign: ur ? 'right' : 'left',
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                </div>
              </div>
            )
          })}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Brain size={13} color='#fff' />
              </div>
              <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: t.hover, display: 'flex', gap: 5 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#4f46e5', animation: `bounce-dot 1.2s ${i * 0.2}s ease-in-out infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px 18px', borderTop: `1px solid ${t.border}`, display: 'flex', gap: 10, flexShrink: 0 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'ur' ? 'اپنا سوال لکھیں... (اردو یا انگریزی)' : 'Type in English or Urdu... (Enter to send)'}
            dir={isUrdu(input) ? 'rtl' : 'ltr'}
            style={{ flex: 1, padding: '11px 15px', borderRadius: 14, border: `1.5px solid ${t.inputBdr}`, background: t.input, color: t.text, fontSize: 13, outline: 'none' }}
          />
          <Btn onClick={sendMessage} disabled={loading || !input.trim()}>
            <Send size={16} />
          </Btn>
        </div>
      </div>
    </div>
  )
}
