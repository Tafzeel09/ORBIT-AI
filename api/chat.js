// Vercel Serverless Function — POST /api/chat
// Keeps the Anthropic API key on the server. The browser never sees it.

const rateLimitMap = new Map()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 20

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip) || { count: 0, start: now }
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0
    entry.start = now
  }
  entry.count += 1
  rateLimitMap.set(ip, entry)
  return entry.count > MAX_REQUESTS
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is not configured with an API key yet.' })
  }

  try {
    const { messages, system } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' })
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1000,
        system: system || '',
        messages,
      }),
    })

    if (!upstream.ok) {
      const errBody = await upstream.text()
      console.error('Anthropic API error:', upstream.status, errBody)
      return res.status(upstream.status).json({ status: upstream.status,
    details: errBody })
    }

    const data = await upstream.json()
    const text = data.content?.[0]?.text || ''
    return res.status(200).json({ text })
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}
