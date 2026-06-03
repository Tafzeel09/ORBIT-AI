// ── Storage helpers ──────────────────────────────────────────────
export const genId = () => Math.random().toString(36).slice(2, 11)
export const today = () => new Date().toISOString().split('T')[0]
export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })

export const ls = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
export const lsSet = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
}
export const lsDel = (key) => {
  try { localStorage.removeItem(key) } catch { /* ignore */ }
}

// ── Theme tokens ─────────────────────────────────────────────────
export const th = (dark) => ({
  bg:       dark ? '#0f172a' : '#f1f5f9',
  card:     dark ? '#1e293b' : '#ffffff',
  border:   dark ? '#334155' : '#e2e8f0',
  text:     dark ? '#f1f5f9' : '#0f172a',
  muted:    dark ? '#94a3b8' : '#64748b',
  input:    dark ? '#2d3f55' : '#ffffff',
  inputBdr: dark ? '#475569' : '#cbd5e1',
  hover:    dark ? '#1e293b' : '#f8fafc',
  pill:     dark ? '#334155' : '#f1f5f9',
  pillTxt:  dark ? '#cbd5e1' : '#475569',
  sidebar:  dark ? '#0f172a' : '#ffffff',
})

// ── Claude API ───────────────────────────────────────────────────
export const callClaude = async (messages, system = '', apiKey = '') => {
  if (!apiKey) throw new Error('NO_KEY')
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system,
      messages,
    }),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.content?.[0]?.text || ''
}