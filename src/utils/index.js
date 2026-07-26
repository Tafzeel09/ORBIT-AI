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
// Light mode intentionally avoids pure #ffffff surfaces — soft off-white instead.
export const th = (dark) => ({
  bg:       dark ? '#0f172a' : '#eef1f6',
  card:     dark ? '#1e293b' : '#f7f8fb',
  border:   dark ? '#334155' : '#e2e8f0',
  text:     dark ? '#f1f5f9' : '#0f172a',
  muted:    dark ? '#94a3b8' : '#64748b',
  input:    dark ? '#2d3f55' : '#f3f5f9',
  inputBdr: dark ? '#475569' : '#cbd5e1',
  hover:    dark ? '#1e293b' : '#eef1f6',
  pill:     dark ? '#334155' : '#e9ecf2',
  pillTxt:  dark ? '#cbd5e1' : '#475569',
  sidebar:  dark ? '#0f172a' : '#f7f8fb',
})

// ── Claude API (via secure backend proxy — no key ever touches the browser) ──
export const callClaude = async (messages, system = '') => {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system }),
  })
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error(errBody.error || `API error: ${res.status}`)
  }
  const data = await res.json()
  return data.text || ''
}