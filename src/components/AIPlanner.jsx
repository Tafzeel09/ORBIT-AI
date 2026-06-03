
import React, { useState } from 'react'
import { Plus, Check, Trash2, Edit3, Save, CheckCircle2 } from 'lucide-react'
import { th, genId, today } from '../utils/index.js'
import { Card, Badge, Btn, Inp, Sel } from './ui/index.jsx'

export default function AIPlanner({ tasks, setTasks, dark, lang }) {
  const t = th(dark)
  const [form,      setForm]      = useState({ title: '', priority: 'medium', category: 'work', due: today() })
  const [filter,    setFilter]    = useState('all')
  const [editId,    setEditId]    = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const addTask = () => {
    if (!form.title.trim()) return
    setTasks((prev) => [...prev, { id: genId(), ...form, completed: false }])
    setForm({ title: '', priority: 'medium', category: 'work', due: today() })
  }

  const toggleTask  = (id) => setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t))
  const deleteTask  = (id) => setTasks((prev) => prev.filter((t) => t.id !== id))
  const startEdit   = (task) => { setEditId(task.id); setEditTitle(task.title) }
  const saveEdit    = (id) => { setTasks((prev) => prev.map((t) => t.id === id ? { ...t, title: editTitle } : t)); setEditId(null) }

  const filtered =
    filter === 'all'       ? tasks :
    filter === 'active'    ? tasks.filter((t) => !t.completed) :
                             tasks.filter((t) => t.completed)

  const filterBtns = [
    { v: 'all',       label: lang === 'ur' ? 'سب'   : `All (${tasks.length})` },
    { v: 'active',    label: lang === 'ur' ? 'فعال' : `Active (${tasks.filter((t) => !t.completed).length})` },
    { v: 'completed', label: lang === 'ur' ? 'مکمل' : `Done (${tasks.filter((t) => t.completed).length})` },
  ]

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Add Task */}
      <Card dark={dark}>
        <div style={{ fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 16 }}>
          {lang === 'ur' ? 'نیا ٹاسک شامل کریں' : 'Add New Task'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Inp
            dark={dark}
            value={form.title}
            onChange={(v) => setForm((p) => ({ ...p, title: v }))}
            placeholder={lang === 'ur' ? 'ٹاسک کا عنوان...' : 'Task title...'}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10 }}>
            <Sel dark={dark} label={lang === 'ur' ? 'ترجیح' : 'Priority'}
              value={form.priority} onChange={(v) => setForm((p) => ({ ...p, priority: v }))}
              options={[{ v: 'high', l: lang === 'ur' ? 'اعلی' : 'High' }, { v: 'medium', l: lang === 'ur' ? 'درمیانہ' : 'Medium' }, { v: 'low', l: lang === 'ur' ? 'کم' : 'Low' }]} />
            <Sel dark={dark} label={lang === 'ur' ? 'زمرہ' : 'Category'}
              value={form.category} onChange={(v) => setForm((p) => ({ ...p, category: v }))}
              options={[{ v: 'work', l: 'Work' }, { v: 'personal', l: 'Personal' }, { v: 'health', l: 'Health' }, { v: 'finance', l: 'Finance' }]} />
            <Inp dark={dark} label={lang === 'ur' ? 'تاریخ' : 'Due Date'} type='date' value={form.due} onChange={(v) => setForm((p) => ({ ...p, due: v }))} />
          </div>
          <div>
            <Btn onClick={addTask} disabled={!form.title.trim()}>
              <Plus size={15} /> {lang === 'ur' ? 'شامل کریں' : 'Add Task'}
            </Btn>
          </div>
        </div>
      </Card>

      {/* Task List */}
      <Card dark={dark}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {filterBtns.map((f) => (
            <button key={f.v} onClick={() => setFilter(f.v)}
              style={{ padding: '7px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                background: filter === f.v ? '#4f46e5' : t.pill, color: filter === f.v ? '#fff' : t.pillTxt }}>
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((task) => (
            <div key={task.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              borderRadius: 14, border: `1px solid ${t.border}`,
              background: task.completed ? t.hover : t.card, opacity: task.completed ? 0.7 : 1,
            }}>
              <button onClick={() => toggleTask(task.id)} style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                border: `2px solid ${task.completed ? '#22c55e' : '#d1d5db'}`,
                background: task.completed ? '#22c55e' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {task.completed && <Check size={12} color='#fff' />}
              </button>

              {editId === task.id ? (
                <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                    autoFocus
                    style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: `1px solid ${t.inputBdr}`, background: t.input, color: t.text, fontSize: 13, outline: 'none' }}
                  />
                  <Btn size='sm' onClick={() => saveEdit(task.id)}><Save size={13} /></Btn>
                </div>
              ) : (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: task.completed ? t.muted : t.text, textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </span>
                  <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
                    <Badge children={task.priority}
                      color={task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#22c55e'}
                      bg={task.priority === 'high' ? '#fef2f2' : task.priority === 'medium' ? '#fffbeb' : '#f0fdf4'} />
                    <Badge children={task.category} color='#4f46e5' bg='#eef2ff' />
                    {task.due && <Badge children={task.due} color={t.muted} bg={t.pill} />}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                <button onClick={() => startEdit(task)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, padding: 6, borderRadius: 8 }}>
                  <Edit3 size={14} />
                </button>
                <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, padding: 6, borderRadius: 8 }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={40} color='#d1d5db' style={{ display: 'block', margin: '0 auto 10px' }} />
              <p style={{ color: t.muted, fontSize: 13, margin: 0 }}>
                {lang === 'ur' ? 'کوئی ٹاسک نہیں' : 'No tasks here yet!'}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
