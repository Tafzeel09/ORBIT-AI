
import React, { useState } from 'react'
import { Zap, Copy, RefreshCw, AlertTriangle, Key } from 'lucide-react'
import { th, callClaude } from '../utils/index.js'
import { Card, Btn, Sel, Txt } from './ui/index.jsx'

export default function ProposalGenerator({ dark, lang, apiKey }) {
  const t = th(dark)
  const [form, setForm] = useState({
    req:  '',
    tone: 'professional',
    mode: 'professional',
    tmpl: 'general',
  })
  const [proposal, setProposal] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [copied,   setCopied]   = useState(false)
  const [error,    setError]    = useState('')

  const generate = async () => {
    if (!form.req.trim()) return
    if (!apiKey) {
      setError(lang === 'ur'
        ? 'براہ کرم ترتیبات میں اپنی Claude API کی داخل کریں۔'
        : 'Please add your Claude API key in Settings → AI Preferences.')
      return
    }
    setLoading(true)
    setProposal('')
    setError('')
    try {
      const system = `You are an expert freelance proposal writer. Write a compelling ${form.mode}-level proposal in a ${form.tone} tone for a ${form.tmpl} project. Structure with clear sections: Hook, Project Understanding, Proposed Approach, Timeline & Deliverables, Investment, Call-to-Action. Be specific, persuasive, and professional.`
      const text = await callClaude(
        [{ role: 'user', content: `Write a freelance proposal for the following requirements:\n\n${form.req}` }],
        system,
        apiKey
      )
      setProposal(text)
    } catch (err) {
      setError(err.message === 'NO_KEY'
        ? 'API key missing. Add it in Settings → AI Preferences.'
        : `Error: ${err.message}. Check your API key and try again.`)
    }
    setLoading(false)
  }

  const copyProposal = () => {
    navigator.clipboard.writeText(proposal)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

      {!apiKey && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', borderRadius: 14, background: dark ? 'rgba(245,158,11,.08)' : '#fffbeb', border: `1px solid ${dark ? 'rgba(245,158,11,.2)' : '#fde68a'}` }}>
          <Key size={16} color='#f59e0b' style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 2 }}>
              {lang === 'ur' ? 'API کی درکار ہے' : 'API Key Required'}
            </div>
            <div style={{ fontSize: 11, color: dark ? '#fcd34d' : '#92400e' }}>
              {lang === 'ur'
                ? 'اے آئی فیچرز کے لیے ترتیبات میں Claude API کی شامل کریں۔'
                : 'Add your Claude API key in Settings → AI Preferences to enable AI generation.'}
            </div>
          </div>
        </div>
      )}

      <Card dark={dark}>
        <div style={{ fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 16 }}>
          {lang === 'ur' ? 'اے آئی تجویز جنریٹر' : 'AI Proposal Generator'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Txt
            dark={dark}
            label={lang === 'ur' ? 'کلائنٹ کی ضروریات' : 'Client Requirements'}
            value={form.req}
            onChange={(v) => setForm((p) => ({ ...p, req: v }))}
            rows={6}
            placeholder={lang === 'ur'
              ? 'پروجیکٹ کی تفصیل، بجٹ، ٹائم لائن...'
              : 'Describe the project, scope, budget, timeline, and any specific requirements...'}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
            <Sel dark={dark} label={lang === 'ur' ? 'لہجہ' : 'Tone'} value={form.tone}
              onChange={(v) => setForm((p) => ({ ...p, tone: v }))}
              options={[{ v: 'professional', l: 'Professional' }, { v: 'friendly', l: 'Friendly' }, { v: 'confident', l: 'Confident' }, { v: 'creative', l: 'Creative' }]} />
            <Sel dark={dark} label={lang === 'ur' ? 'موڈ' : 'Experience'} value={form.mode}
              onChange={(v) => setForm((p) => ({ ...p, mode: v }))}
              options={[{ v: 'professional', l: 'Professional' }, { v: 'beginner', l: 'Beginner' }]} />
            <Sel dark={dark} label={lang === 'ur' ? 'پلیٹ فارم' : 'Platform'} value={form.tmpl}
              onChange={(v) => setForm((p) => ({ ...p, tmpl: v }))}
              options={[{ v: 'general', l: 'General' }, { v: 'Upwork', l: 'Upwork' }, { v: 'Fiverr', l: 'Fiverr' }, { v: 'web development', l: 'Web Dev' }, { v: 'design', l: 'Design' }, { v: 'content writing', l: 'Content' }]} />
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 600 }}>
              <AlertTriangle size={14} /> {error}
            </div>
          )}

          <div>
            <Btn onClick={generate} disabled={loading || !form.req.trim()} size='lg'>
              {loading
                ? <><RefreshCw size={15} className='spin' /> {lang === 'ur' ? 'بن رہا ہے...' : 'Generating...'}</>
                : <><Zap size={15} /> {lang === 'ur' ? 'تجویز بنائیں' : 'Generate Proposal'}</>}
            </Btn>
          </div>
        </div>
      </Card>

      {(proposal || loading) && (
        <Card dark={dark}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: t.text }}>
              {lang === 'ur' ? 'تیار شدہ تجویز' : 'Generated Proposal'}
            </span>
            {proposal && (
              <Btn variant='secondary' size='sm' onClick={copyProposal}>
                <Copy size={13} /> {copied ? 'Copied! ✓' : (lang === 'ur' ? 'کاپی کریں' : 'Copy')}
              </Btn>
            )}
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 0' }}>
              {[90, 75, 85, 60, 80, 65, 78].map((w, i) => (
                <div key={i} style={{ height: 13, borderRadius: 6, background: t.hover, width: `${w}%`, animation: 'shimmer 1.4s ease-in-out infinite' }} />
              ))}
            </div>
          ) : (
            <Txt dark={dark} value={proposal} onChange={setProposal} rows={18} />
          )}
        </Card>
      )}
    </div>
  )
}
