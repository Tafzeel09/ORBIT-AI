
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Mic, MicOff, Save, RefreshCw, Trash2, BookOpen, Shield, AlertTriangle } from 'lucide-react'
import { th, genId, fmtDate } from '../utils/index.js'
import { Card, Badge, Btn, Inp } from './ui/index.jsx'

export default function VoiceNotes({ notes, setNotes, dark, lang, onMicChange }) {
  const t = th(dark)
  const [recording,   setRecording]   = useState(false)
  const [transcript,  setTranscript]  = useState('')
  const [interim,     setInterim]     = useState('')
  const [error,       setError]       = useState('')
  const [noteTitle,   setNoteTitle]   = useState('')
  const [selected,    setSelected]    = useState(null)
  const recRef = useRef(null)

  // Notify parent about mic state
  useEffect(() => { onMicChange && onMicChange(recording) }, [recording, onMicChange])

  // Critical cleanup on unmount — prevents stuck microphone
  useEffect(() => {
    return () => {
      if (recRef.current) {
        try { recRef.current.stop() } catch (_) { /* ignore */ }
        recRef.current = null
      }
      onMicChange && onMicChange(false)
    }
  }, [onMicChange])

  const startRecording = useCallback(() => {
    setError('')
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setError(
        lang === 'ur'
          ? 'یہ براؤزر سپورٹ نہیں کرتا۔ Chrome یا Edge استعمال کریں۔'
          : 'Speech recognition not supported. Please use Chrome or Edge.'
      )
      return
    }
    const recognition = new SR()
    recognition.continuous     = true
    recognition.interimResults = true
    recognition.lang           = lang === 'ur' ? 'ur-PK' : 'en-US'

    recognition.onstart  = () => setRecording(true)
    recognition.onresult = (event) => {
      let finalText = '', interimText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript
        if (event.results[i].isFinal) finalText += text
        else interimText += text
      }
      if (finalText) setTranscript((prev) => prev + finalText + ' ')
      setInterim(interimText)
    }
    recognition.onerror = (event) => {
      setError(`Microphone error: ${event.error}. Please allow microphone permission.`)
      setRecording(false)
    }
    recognition.onend = () => {
      setRecording(false)
      setInterim('')
    }

    recRef.current = recognition
    recognition.start()
  }, [lang])

  const stopRecording = useCallback(() => {
    if (recRef.current) {
      try { recRef.current.stop() } catch (_) { /* ignore */ }
      recRef.current = null
    }
    setRecording(false)
    setInterim('')
  }, [])

  const saveNote = () => {
    if (!transcript.trim()) return
    const note = {
      id:      genId(),
      title:   noteTitle || `Note — ${new Date().toLocaleTimeString()}`,
      content: transcript.trim(),
      date:    new Date().toISOString(),
      words:   transcript.trim().split(/\s+/).length,
    }
    setNotes((prev) => [note, ...prev])
    setTranscript('')
    setNoteTitle('')
  }

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Privacy notice */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px',
        borderRadius: 14,
        background: dark ? 'rgba(14,165,233,.08)' : '#f0f9ff',
        border: `1px solid ${dark ? 'rgba(14,165,233,.2)' : '#bae6fd'}`,
      }}>
        <Shield size={16} color='#0ea5e9' style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0ea5e9', marginBottom: 2 }}>
            {lang === 'ur' ? 'پرائیویسی نوٹس' : 'Privacy Notice'}
          </div>
          <div style={{ fontSize: 11, color: dark ? '#7dd3fc' : '#0369a1' }}>
            {lang === 'ur'
              ? 'آواز صرف آپ کے ڈیوائس پر پروسیس ہوتی ہے۔ کوئی آڈیو سرور پر نہیں جاتا۔'
              : 'Voice is processed on-device only via the Web Speech API. No audio is uploaded.'}
          </div>
        </div>
      </div>

      {/* Recorder card */}
      <Card dark={dark}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: t.text }}>
            {lang === 'ur' ? 'وائس ریکارڈر' : 'Voice Recorder'}
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px',
            borderRadius: 20, background: recording ? '#fef2f2' : '#f0fdf4',
            fontSize: 11, fontWeight: 700, color: recording ? '#ef4444' : '#22c55e',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: recording ? '#ef4444' : '#22c55e',
              animation: recording ? 'pulse-mic 1s infinite' : 'none',
            }} />
            {recording ? 'Mic Active' : 'Mic Off'}
          </span>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        {/* Mic circle */}
        <div style={{ textAlign: 'center', padding: '22px 0 18px' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 14px',
            background: recording ? '#ef4444' : 'linear-gradient(135deg,#eef2ff,#e0e7ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: recording ? '0 0 0 14px rgba(239,68,68,.1)' : '0 4px 16px rgba(79,70,229,.15)',
            animation: recording ? 'rec-ring 1.5s infinite' : 'none',
            transition: 'all .3s',
          }}>
            {recording ? <MicOff size={32} color='#fff' /> : <Mic size={32} color='#4f46e5' />}
          </div>
          <p style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 3px' }}>
            {recording
              ? (lang === 'ur' ? 'ریکارڈنگ جاری ہے...' : '🔴 Recording...')
              : (lang === 'ur' ? 'ریکارڈنگ کے لیے تیار' : 'Ready to Record')}
          </p>
          <p style={{ fontSize: 11, color: t.muted, margin: 0 }}>
            {lang === 'ur' ? 'مائیکروفون اجازت ضروری ہے' : 'Microphone permission required'}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
          {!recording ? (
            <Btn onClick={startRecording} size='lg'>
              <Mic size={17} /> {lang === 'ur' ? 'ریکارڈنگ شروع کریں' : 'Start Recording'}
            </Btn>
          ) : (
            <Btn onClick={stopRecording} variant='danger' size='lg'>
              <MicOff size={17} /> {lang === 'ur' ? 'ریکارڈنگ روکیں' : 'Stop Recording'}
            </Btn>
          )}
          {transcript && !recording && (
            <Btn variant='ghost' onClick={() => { setTranscript(''); setNoteTitle('') }}>
              <RefreshCw size={14} /> {lang === 'ur' ? 'صاف کریں' : 'Clear'}
            </Btn>
          )}
        </div>

        {(transcript || interim) && (
          <div style={{ borderRadius: 14, padding: '14px 16px', background: t.hover, border: `1px solid ${t.border}`, marginBottom: 14 }} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
            <div style={{ fontSize: 11, fontWeight: 700, color: t.muted, marginBottom: 6 }}>
              {lang === 'ur' ? 'ٹرانسکرپٹ:' : 'Transcript:'}
            </div>
            <p style={{ fontSize: 13, color: t.text, lineHeight: 1.65, margin: 0 }}>
              {transcript}
              <span style={{ color: t.muted, fontStyle: 'italic' }}>{interim}</span>
            </p>
          </div>
        )}

        {transcript && !recording && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Inp dark={dark} value={noteTitle} onChange={setNoteTitle}
              placeholder={lang === 'ur' ? 'نوٹ کا عنوان (اختیاری)...' : 'Note title (optional)...'} />
            <div>
              <Btn variant='success' onClick={saveNote}>
                <Save size={15} /> {lang === 'ur' ? 'نوٹ محفوظ کریں' : 'Save Note'}
              </Btn>
            </div>
          </div>
        )}
      </Card>

      {/* Saved notes */}
      <Card dark={dark}>
        <div style={{ fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 16 }}>
          {lang === 'ur' ? 'محفوظ نوٹس' : 'Saved Notes'} ({notes.length})
        </div>

        {notes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}>
            <BookOpen size={40} color='#d1d5db' style={{ display: 'block', margin: '0 auto 10px' }} />
            <p style={{ color: t.muted, fontSize: 13, margin: 0 }}>
              {lang === 'ur' ? 'کوئی نوٹ نہیں۔ ریکارڈنگ شروع کریں!' : 'No notes yet. Hit record!'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelected(selected?.id === note.id ? null : note)}
                style={{
                  borderRadius: 14, padding: '12px 14px', cursor: 'pointer', transition: 'border .15s',
                  border: `2px solid ${selected?.id === note.id ? '#4f46e5' : t.border}`,
                  background: selected?.id === note.id ? '#eef2ff' : t.hover,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, color: selected?.id === note.id ? '#4f46e5' : t.text, margin: '0 0 4px' }}>
                      {note.title}
                    </p>
                    <p style={{ fontSize: 11, color: t.muted, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {note.content}
                    </p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      <span style={{ fontSize: 11, color: t.muted }}>{fmtDate(note.date)}</span>
                      <Badge children={`${note.words}w`} color='#4f46e5' bg='#eef2ff' />
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, padding: 4, marginLeft: 8 }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {selected?.id === note.id && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #c7d2fe' }} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
                    <p style={{ fontSize: 13, color: '#3730a3', lineHeight: 1.65, margin: 0 }}>{note.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
