
import React, { useState } from 'react'
import { Plus, Trash2, AlertTriangle, Wallet, Target, TrendingUp, DollarSign } from 'lucide-react'
import { th, genId, today, fmtDate } from '../utils/index.js'
import { EXPENSE_CATS, CAT_COLORS } from '../data/index.js'
import { Card, Badge, Btn, Inp, Sel } from './ui/index.jsx'

const BUDGET_DEFAULT = 50000

export default function ExpenseTracker({ expenses, setExpenses, dark, lang }) {
  const t = th(dark)
  const [form, setForm] = useState({
    title: '', amount: '', category: 'food', date: today(),
  })
  const [catFilter, setCatFilter] = useState('all')

  const addExpense = () => {
    if (!form.title.trim() || !form.amount) return
    setExpenses((prev) => [{ id: genId(), ...form, amount: parseFloat(form.amount) }, ...prev])
    setForm({ title: '', amount: '', category: 'food', date: today() })
  }

  const deleteExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id))

  const total      = expenses.reduce((s, e) => s + e.amount, 0)
  const remaining  = Math.max(BUDGET_DEFAULT - total, 0)
  const budgetPct  = Math.min((total / BUDGET_DEFAULT) * 100, 100)
  const shown      = catFilter === 'all' ? expenses : expenses.filter((e) => e.category === catFilter)

  // Category chart data
  const catData = EXPENSE_CATS
    .map((c) => ({ name: c, total: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0) }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)
  const maxCat = Math.max(...catData.map((c) => c.total), 1)

  const statsData = [
    { label: lang === 'ur' ? 'کل اخراجات' : 'Total Spent', val: `PKR ${total.toLocaleString()}`,           Icon: Wallet,     clr: '#ef4444', bg: '#fef2f2' },
    { label: lang === 'ur' ? 'بجٹ'        : 'Budget',       val: `PKR ${BUDGET_DEFAULT.toLocaleString()}`, Icon: Target,     clr: '#4f46e5', bg: '#eef2ff' },
    { label: lang === 'ur' ? 'باقی'       : 'Remaining',    val: `PKR ${remaining.toLocaleString()}`,      Icon: TrendingUp, clr: '#22c55e', bg: '#f0fdf4' },
  ]

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 14 }}>
        {statsData.map(({ label, val, Icon, clr, bg }, i) => (
          <div key={i} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: '16px 18px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Icon size={17} color={clr} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: t.text }}>{val}</div>
            <div style={{ fontSize: 11, color: t.muted, marginTop: 2, fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Budget alert */}
      {total > BUDGET_DEFAULT * 0.8 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '11px 16px', borderRadius: 12,
          background: total > BUDGET_DEFAULT ? '#fef2f2' : '#fffbeb',
          color: total > BUDGET_DEFAULT ? '#ef4444' : '#d97706',
          fontSize: 13, fontWeight: 700,
        }}>
          <AlertTriangle size={16} />
          {total > BUDGET_DEFAULT
            ? (lang === 'ur' ? 'بجٹ سے تجاوز ہو گیا!' : 'Budget exceeded!')
            : (lang === 'ur' ? 'بجٹ کے قریب پہنچ رہے ہیں!' : 'Approaching budget limit!')}
        </div>
      )}

      {/* Budget bar */}
      <Card dark={dark}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
            {lang === 'ur' ? 'بجٹ استعمال' : 'Budget Usage'}
          </span>
          <span style={{ fontSize: 13, fontWeight: 900, color: budgetPct > 90 ? '#ef4444' : '#4f46e5' }}>
            {Math.round(budgetPct)}%
          </span>
        </div>
        <div style={{ height: 10, borderRadius: 5, background: t.hover, overflow: 'hidden' }}>
          <div style={{
            height: 10, borderRadius: 5, width: `${budgetPct}%`, transition: 'width .5s',
            background: budgetPct > 90 ? '#ef4444' : budgetPct > 70 ? '#f59e0b' : 'linear-gradient(90deg,#4f46e5,#7c3aed)',
          }} />
        </div>
      </Card>

      {/* Category chart */}
      {catData.length > 0 && (
        <Card dark={dark}>
          <div style={{ fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 14 }}>
            {lang === 'ur' ? 'زمرے کے مطابق' : 'Spending by Category'}
          </div>
          {catData.map((c) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: t.muted, width: 80, textTransform: 'capitalize', flexShrink: 0 }}>{c.name}</span>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: t.hover, overflow: 'hidden' }}>
                <div style={{ height: 8, borderRadius: 4, width: `${(c.total / maxCat) * 100}%`, background: CAT_COLORS[c.name] || '#6b7280', transition: 'width .5s' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.text, width: 90, textAlign: 'right', flexShrink: 0 }}>
                PKR {c.total.toLocaleString()}
              </span>
            </div>
          ))}
        </Card>
      )}

      {/* Add expense form */}
      <Card dark={dark}>
        <div style={{ fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 14 }}>
          {lang === 'ur' ? 'خرچ شامل کریں' : 'Add Expense'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Inp dark={dark} label={lang === 'ur' ? 'عنوان' : 'Title'} value={form.title}
              onChange={(v) => setForm((p) => ({ ...p, title: v }))} placeholder='Expense title' />
            <Inp dark={dark} label={lang === 'ur' ? 'رقم (PKR)' : 'Amount (PKR)'} type='number' value={form.amount}
              onChange={(v) => setForm((p) => ({ ...p, amount: v }))} placeholder='0' />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Sel dark={dark} label={lang === 'ur' ? 'زمرہ' : 'Category'} value={form.category}
              onChange={(v) => setForm((p) => ({ ...p, category: v }))}
              options={EXPENSE_CATS.map((c) => ({ v: c, l: c.charAt(0).toUpperCase() + c.slice(1) }))} />
            <Inp dark={dark} label={lang === 'ur' ? 'تاریخ' : 'Date'} type='date' value={form.date}
              onChange={(v) => setForm((p) => ({ ...p, date: v }))} />
          </div>
          <div>
            <Btn onClick={addExpense} disabled={!form.title || !form.amount}>
              <Plus size={14} /> {lang === 'ur' ? 'خرچ شامل کریں' : 'Add Expense'}
            </Btn>
          </div>
        </div>
      </Card>

      {/* Expense list */}
      <Card dark={dark}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <button
            onClick={() => setCatFilter('all')}
            style={{ padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, background: catFilter === 'all' ? '#4f46e5' : t.pill, color: catFilter === 'all' ? '#fff' : t.pillTxt }}
          >
            {lang === 'ur' ? 'سب' : 'All'} ({expenses.length})
          </button>
          {EXPENSE_CATS.filter((c) => expenses.some((e) => e.category === c)).map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              style={{ padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, textTransform: 'capitalize', background: catFilter === c ? '#4f46e5' : t.pill, color: catFilter === c ? '#fff' : t.pillTxt }}>
              {c} ({expenses.filter((e) => e.category === c).length})
            </button>
          ))}
        </div>

        {shown.map((exp) => (
          <div key={exp.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 14, border: `1px solid ${t.border}`, background: t.card, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DollarSign size={15} color='#f97316' />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: '0 0 4px' }}>{exp.title}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, color: t.muted }}>{fmtDate(exp.date)}</span>
                <Badge children={exp.category} color={CAT_COLORS[exp.category] || '#6b7280'} bg={t.pill} />
              </div>
            </div>
            <span style={{ fontWeight: 800, fontSize: 14, color: '#ef4444', flexShrink: 0 }}>
              -PKR {exp.amount.toLocaleString()}
            </span>
            <button onClick={() => deleteExpense(exp.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, padding: 4 }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {shown.length === 0 && (
          <p style={{ textAlign: 'center', color: t.muted, fontSize: 13, padding: '28px 0', margin: 0 }}>
            {lang === 'ur' ? 'کوئی خرچ نہیں' : 'No expenses recorded yet'}
          </p>
        )}
      </Card>
    </div>
  )
}
