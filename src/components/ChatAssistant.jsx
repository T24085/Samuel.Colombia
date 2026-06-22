import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import {
  assistantChatUrl,
  assistantName,
  assistantSystemPrompt,
  chatLogEndpoint,
  ollamaModelCandidates,
  starterPrompts,
} from '../data/assistant'
import { intakeFormUrl, site, siteKey } from '../data/site'

const storageKey = `samuel-studio-assistant-chat:${siteKey}`
const assistantRequestTimeoutMs = 45000
const panelId = 'nova-chat-panel'
const inputId = 'nova-chat-input'

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `chat_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function normalizeProfile(profile) {
  if (!profile) {
    return null
  }

  const name = typeof profile.name === 'string' ? profile.name.trim() : ''
  const email = typeof profile.email === 'string' ? profile.email.trim() : ''
  const phone = typeof profile.phone === 'string' ? profile.phone.trim() : ''

  if (!name || !email || !phone) {
    return null
  }

  return { name, email, phone }
}

function createGreeting(profile) {
  const greetingName = profile?.name?.trim()

  return {
    id: createId(),
    role: 'assistant',
    content: greetingName
      ? `${assistantName} is ready, ${greetingName}. Tell me what kind of session you need, what the images are for, and when you want to shoot.`
      : `${assistantName} is ready. Tell me what kind of session you need, what the images are for, and when you want to shoot.`,
    createdAt: Date.now(),
    source: 'seed',
  }
}

function loadChatState() {
  if (typeof window === 'undefined') {
    return {
      sessionId: createId(),
      messages: [createGreeting()],
      clientProfile: null,
    }
  }

  try {
    const raw = window.localStorage.getItem(storageKey)

    if (raw) {
      const parsed = JSON.parse(raw)
      const clientProfile = normalizeProfile(parsed.clientProfile)

      if (typeof parsed.sessionId === 'string' && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        return {
          sessionId: parsed.sessionId,
          messages: parsed.messages,
          clientProfile,
        }
      }
    }
  } catch {
    // Start a fresh session when storage is missing or corrupt.
  }

  return {
    sessionId: createId(),
    messages: [createGreeting()],
    clientProfile: null,
  }
}

function saveChatState(state) {
  window.localStorage.setItem(storageKey, JSON.stringify(state))
}

function buildFallbackReply(userText) {
  const query = userText.toLowerCase()

  if (query.includes('price') || query.includes('pricing') || query.includes('cost') || query.includes('quote') || query.includes('rate')) {
    return [
      'This site uses custom quotes instead of fixed pricing.',
      'Send the session type, use case, location, and timing through the booking form and I can point you to the right next step.',
      `The form is here: ${intakeFormUrl}.`,
    ].join(' ')
  }

  if (query.includes('book') || query.includes('booking') || query.includes('schedule') || query.includes('availability') || query.includes('date')) {
    return [
      'Use the booking form to request a session.',
      'Include the session type, preferred date, location, and any reference images so the studio has enough context.',
      `The booking form is here: ${intakeFormUrl}.`,
    ].join(' ')
  }

  if (query.includes('editorial') || query.includes('campaign') || query.includes('brand') || query.includes('launch') || query.includes('fashion') || query.includes('commercial')) {
    return [
      'Editorial & Campaign Work is the best fit.',
      'It is built for launch visuals, brand imagery, and a more controlled editorial look.',
      'What is the launch date and what will the images be used for?',
    ].join(' ')
  }

  if (query.includes('identity') || query.includes('personal brand') || query.includes('founder') || query.includes('speaker') || query.includes('professional') || query.includes('headshot') || query.includes('portrait')) {
    return [
      'Personal Identity is the best fit.',
      'It works well for founders, creatives, speakers, and visible professionals who need a polished portrait library.',
      'What platform or website will the images support?',
    ].join(' ')
  }

  if (query.includes('story') || query.includes('lifestyle') || query.includes('concept') || query.includes('narrative') || query.includes('launch visuals')) {
    return [
      'Visual Story Projects is the best fit.',
      'It is the route for narrative ideas, concept-led shoots, and image sequences that need pacing.',
      'What story are you trying to tell?',
    ].join(' ')
  }

  if (query.includes('family') || query.includes('couple') || query.includes('private') || query.includes('milestone')) {
    return [
      'Private Portraits is the best fit.',
      'It is built for individuals, couples, families, and milestone sessions that need a calm, guided approach.',
      'What is the occasion and where would you like to shoot?',
    ].join(' ')
  }

  if (query.includes('turnaround')) {
    return `Typical turnaround is ${site.turnaround}. What kind of session are you planning?`
  }

  if (query.includes('location') || query.includes('where')) {
    return `Sessions are arranged ${site.location.toLowerCase()}. What session type and date should I help you plan?`
  }

  if (query.includes('contact') || query.includes('email')) {
    return `You can use the booking form or email ${site.email}.`
  }

  return 'Tell me what kind of session you need, what the images are for, and when you want to shoot.'
}

function buildTranscriptMessages(conversation) {
  return conversation
    .filter((message) => message.source !== 'seed')
    .map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
      source: message.source,
      model: message.model,
    }))
}

async function requestAssistantReply(payload) {
  let lastError = null

  for (const model of ollamaModelCandidates) {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), assistantRequestTimeoutMs)

    try {
      const response = await fetch(assistantChatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          assistant: payload.assistant,
          sessionId: payload.sessionId,
          pageUrl: payload.pageUrl,
          siteKey: payload.siteKey,
          clientProfile: payload.clientProfile,
          systemPrompt: assistantSystemPrompt,
          modelCandidates: ollamaModelCandidates,
          model,
          messages: payload.messages,
          userText: payload.userText,
        }),
      })

      if (!response.ok) {
        lastError = new Error(`Assistant request failed with status ${response.status}`)
        continue
      }

      const data = await response.json()
      const content = typeof data.content === 'string' ? data.content.trim() : ''

      if (content) {
        return {
          content,
          model: typeof data.model === 'string' && data.model.trim() ? data.model.trim() : model,
          usedFallback: Boolean(data.usedFallback),
        }
      }
    } catch (error) {
      lastError = error
    } finally {
      window.clearTimeout(timeoutId)
    }
  }

  return {
    content: buildFallbackReply(payload.userText),
    model: 'fallback',
    usedFallback: true,
    error: lastError instanceof Error ? lastError.message : 'Assistant request failed.',
  }
}

async function persistTranscript(payload) {
  if (!chatLogEndpoint) {
    return
  }

  const body = JSON.stringify({
    assistant: assistantName,
    sessionId: payload.sessionId,
    pageUrl: payload.pageUrl,
    siteKey: payload.siteKey,
    model: payload.model,
    clientProfile: payload.clientProfile,
    loggedAt: new Date().toISOString(),
    sendEmail: payload.sendEmail ?? false,
    messages: payload.messages,
  })

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const sent = navigator.sendBeacon(chatLogEndpoint, new Blob([body], { type: 'application/json' }))

    if (sent) {
      return
    }
  }

  await fetch(chatLogEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  })
}

export function ChatAssistant() {
  const initialState = useMemo(() => loadChatState(), [])
  const reducedMotion = useReducedMotion()
  const [sessionId, setSessionId] = useState(initialState.sessionId)
  const [messages, setMessages] = useState(initialState.messages)
  const [clientProfile, setClientProfile] = useState(initialState.clientProfile)
  const [intakeDraft, setIntakeDraft] = useState({
    name: initialState.clientProfile?.name ?? '',
    email: initialState.clientProfile?.email ?? '',
    phone: initialState.clientProfile?.phone ?? '',
  })
  const [draft, setDraft] = useState('')
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [intakeError, setIntakeError] = useState(null)
  const [error, setError] = useState(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const intakeNameRef = useRef(null)

  const hasProfile = Boolean(clientProfile)
  const statusLabel = sending ? 'Thinking' : hasProfile ? 'Ready' : 'Need details'
  const transcriptMessages = useMemo(() => (hasProfile ? messages.slice(-24) : []), [hasProfile, messages])

  useEffect(() => {
    saveChatState({
      sessionId,
      messages,
      clientProfile,
    })
  }, [clientProfile, messages, sessionId])

  useEffect(() => {
    if (!open) {
      return
    }

    if (!hasProfile) {
      intakeNameRef.current?.focus()
      return
    }

    inputRef.current?.focus()
  }, [hasProfile, open])

  useEffect(() => {
    const node = listRef.current

    if (!node || !hasProfile) {
      return
    }

    node.scrollTop = node.scrollHeight
  }, [hasProfile, messages, open, sending])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleIntakeChange = (field) => (event) => {
    setIntakeError(null)
    setIntakeDraft((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleIntakeSubmit = async (event) => {
    event.preventDefault()

    const nextProfile = normalizeProfile(intakeDraft)

    if (!nextProfile) {
      setIntakeError('Please add your name, email, and phone before starting the chat.')
      return
    }

    const nextMessages = [createGreeting(nextProfile)]

    setClientProfile(nextProfile)
    setMessages(nextMessages)
    setDraft('')
    setError(null)
    setIntakeError(null)
    setOpen(true)

    saveChatState({
      sessionId,
      messages: nextMessages,
      clientProfile: nextProfile,
    })

    void persistTranscript({
      sessionId,
      pageUrl: window.location.href,
      siteKey,
      model: ollamaModelCandidates[0] || 'unknown-model',
      clientProfile: nextProfile,
      messages: nextMessages,
      sendEmail: false,
    }).catch(() => undefined)

    window.setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const submitMessage = async (messageText) => {
    const content = messageText.trim()

    if (!content || sending || !clientProfile) {
      return
    }

    setError(null)
    setSending(true)

    const userMessage = {
      id: createId(),
      role: 'user',
      content,
      createdAt: Date.now(),
    }

    const conversation = [...messages, userMessage]
    setMessages(conversation)
    setDraft('')

    try {
      const reply = await requestAssistantReply({
        assistant: assistantName,
        sessionId,
        pageUrl: window.location.href,
        siteKey,
        clientProfile,
        messages: buildTranscriptMessages(conversation),
        userText: content,
      })

      const assistantMessage = {
        id: createId(),
        role: 'assistant',
        content:
          reply.content ||
          'I can help plan a session, match the right service, or capture your booking details. Try asking about pricing, scheduling, or which service fits your project.',
        createdAt: Date.now(),
        source: reply.usedFallback ? 'fallback' : 'ollama',
        model: reply.model,
      }

      const nextMessages = [...conversation, assistantMessage]
      setMessages(nextMessages)

      void persistTranscript({
        sessionId,
        pageUrl: window.location.href,
        siteKey,
        model: reply.model,
        clientProfile,
        messages: nextMessages,
        sendEmail: false,
      }).catch(() => undefined)
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'The assistant is temporarily unavailable.'
      setError(message)

      const fallbackMessage = {
        id: createId(),
        role: 'assistant',
        content:
          'I am having trouble reaching the local model right now. Check that Ollama is running, then share the session type, date, location, and use case so I can still capture the brief.',
        createdAt: Date.now(),
        source: 'fallback',
        model: ollamaModelCandidates[0] || 'unknown-model',
      }

      const nextMessages = [...conversation, fallbackMessage]
      setMessages(nextMessages)

      void persistTranscript({
        sessionId,
        pageUrl: window.location.href,
        siteKey,
        model: fallbackMessage.model,
        clientProfile,
        messages: nextMessages,
        sendEmail: false,
      }).catch(() => undefined)
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await submitMessage(draft)
  }

  const handleDraftKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void submitMessage(draft)
    }
  }

  const handlePrompt = (prompt) => {
    if (!clientProfile) {
      return
    }

    void submitMessage(prompt)
  }

  const handleResetChat = () => {
    const nextSessionId = createId()
    const nextState = {
      sessionId: nextSessionId,
      messages: [createGreeting()],
      clientProfile: null,
    }

    setSessionId(nextSessionId)
    setMessages(nextState.messages)
    setClientProfile(null)
    setIntakeDraft({ name: '', email: '', phone: '' })
    setDraft('')
    setError(null)
    setIntakeError(null)
    setShowSuggestions(false)
    setOpen(false)
    saveChatState(nextState)
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6">
      <motion.button
        type="button"
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="group inline-flex items-center gap-3 rounded-full border border-gold/20 bg-[linear-gradient(180deg,rgba(245,240,230,0.16),rgba(198,161,91,0.14)),linear-gradient(135deg,rgba(17,17,17,0.96),rgba(10,51,45,0.88))] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-ivory shadow-[0_18px_50px_rgba(0,0,0,0.34),0_0_0_1px_rgba(198,161,91,0.12)] backdrop-blur-xl transition duration-300 hover:border-gold/55 hover:text-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close chat with Nova' : 'Chat with Nova'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-gold/10 text-gold">
          <MessageCircle size={17} aria-hidden="true" />
          <span className="absolute inset-0 rounded-full border border-gold/25 opacity-70" />
        </span>
        <span className="flex flex-col items-start leading-none">
          <strong className="text-[0.72rem] uppercase tracking-[0.3em] text-ivory">Chat with Nova</strong>
          <span className="mt-1 text-[0.56rem] uppercase tracking-[0.32em] text-parchment/58">Ask about a session</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.section
            id={panelId}
            aria-label="Website assistant"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute bottom-[4.75rem] left-0 w-[min(92vw,26rem)] overflow-hidden rounded-[1.75rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(17,17,17,0.98),rgba(10,10,10,0.95))] text-ivory shadow-[0_34px_120px_rgba(0,0,0,0.52)] backdrop-blur-2xl sm:bottom-[5.1rem]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-[linear-gradient(135deg,rgba(198,161,91,0.18),rgba(245,240,230,0.06))] text-gold">
                  <Sparkles size={16} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-gold/70">Local assistant</p>
                  <h2 className="mt-1 text-xl font-medium leading-none">{assistantName}</h2>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ivory/80 transition hover:border-gold/35 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55"
                aria-label="Close chat assistant"
                onClick={() => setOpen(false)}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </header>

            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 text-[0.64rem] uppercase tracking-[0.26em] text-parchment/62">
              <span>{statusLabel}</span>
              <span className="rounded-full border border-gold/16 bg-gold/8 px-3 py-1 text-gold/72">{site.name}</span>
            </div>

            {!hasProfile ? (
              <form className="space-y-4 px-5 py-5" onSubmit={handleIntakeSubmit}>
                <div className="space-y-2">
                  <p className="text-sm leading-6 text-parchment/80">Before we start, tell me who this session is for.</p>
                  <p className="text-xs leading-6 text-parchment/58">
                    I need a name, email, and phone number so the conversation can be saved and forwarded later if needed.
                  </p>
                </div>

                <label className="block space-y-2">
                  <span className="text-[0.62rem] uppercase tracking-[0.34em] text-gold/70">Name</span>
                  <input
                    ref={intakeNameRef}
                    type="text"
                    value={intakeDraft.name}
                    onChange={handleIntakeChange('name')}
                    placeholder="Client name"
                    autoComplete="name"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ivory outline-none placeholder:text-parchment/36 focus:border-gold/40 focus:ring-2 focus:ring-gold/20"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-[0.62rem] uppercase tracking-[0.34em] text-gold/70">Email</span>
                  <input
                    type="email"
                    value={intakeDraft.email}
                    onChange={handleIntakeChange('email')}
                    placeholder="client@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ivory outline-none placeholder:text-parchment/36 focus:border-gold/40 focus:ring-2 focus:ring-gold/20"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-[0.62rem] uppercase tracking-[0.34em] text-gold/70">Phone</span>
                  <input
                    type="tel"
                    value={intakeDraft.phone}
                    onChange={handleIntakeChange('phone')}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ivory outline-none placeholder:text-parchment/36 focus:border-gold/40 focus:ring-2 focus:ring-gold/20"
                  />
                </label>

                <div className="flex flex-col gap-3 pt-1">
                  {intakeError ? <p className="text-sm leading-6 text-red-200">{intakeError}</p> : <p className="text-sm leading-6 text-parchment/60">Once you submit this, Nova will use your details as session context.</p>}

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleResetChat}
                      disabled={sending}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-[0.64rem] uppercase tracking-[0.28em] text-parchment/76 transition hover:border-gold/35 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Reset
                    </button>

                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[linear-gradient(135deg,rgba(198,161,91,0.96),rgba(163,104,42,0.96))] px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-ink transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Send size={14} aria-hidden="true" />
                      Start chat
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                <div
                  ref={listRef}
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions text"
                  className="max-h-[35vh] space-y-4 overflow-y-auto px-5 py-5 sm:max-h-[36rem]"
                >
                  {transcriptMessages.map((message) => (
                    <article
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={[
                          'max-w-[85%] rounded-[1.2rem] border px-4 py-3 text-sm leading-7 shadow-[0_16px_38px_rgba(0,0,0,0.2)]',
                          message.role === 'user'
                            ? 'border-gold/18 bg-[linear-gradient(135deg,rgba(198,161,91,0.96),rgba(163,104,42,0.96))] text-ink'
                            : 'border-white/10 bg-[linear-gradient(180deg,rgba(245,240,230,0.08),rgba(255,255,255,0.03))] text-ivory',
                        ].join(' ')}
                      >
                        <div className={`mb-2 flex items-center justify-between gap-3 text-[0.58rem] uppercase tracking-[0.28em] ${message.role === 'user' ? 'text-ink/70' : 'text-gold/70'}`}>
                          <span>{message.role === 'user' ? 'Client' : message.source === 'fallback' ? 'Fallback' : assistantName}</span>
                          <span>{site.name}</span>
                        </div>
                        {message.content}
                      </div>
                    </article>
                  ))}

                  {sending ? (
                    <article className="flex justify-start">
                      <div className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-7 text-ivory shadow-[0_16px_38px_rgba(0,0,0,0.2)]">
                        <div className="mb-2 text-[0.58rem] uppercase tracking-[0.28em] text-gold/70">Nova is thinking</div>
                        <div className="flex items-center gap-2 py-1">
                          {[0, 1, 2].map((index) => (
                            <motion.span
                              key={index}
                              animate={reducedMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                              transition={reducedMotion ? undefined : { duration: 1, repeat: Infinity, delay: index * 0.14, ease: 'easeInOut' }}
                              className="h-2 w-2 rounded-full bg-gold/70"
                            />
                          ))}
                        </div>
                      </div>
                    </article>
                  ) : null}
                </div>

                <div className="border-t border-white/10 px-5 py-4">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.62rem] uppercase tracking-[0.28em] text-parchment/70 transition hover:border-gold/30 hover:text-ivory"
                    aria-expanded={showSuggestions}
                    aria-controls="nova-suggested-prompts"
                    onClick={() => setShowSuggestions((value) => !value)}
                    disabled={sending}
                  >
                    <span>Suggested questions</span>
                    <span>{showSuggestions ? 'Hide' : 'Show'}</span>
                  </button>

                  <AnimatePresence>
                    {showSuggestions ? (
                      <motion.div
                        id="nova-suggested-prompts"
                        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        {starterPrompts.map((prompt, index) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => handlePrompt(prompt)}
                            disabled={sending}
                            data-priority={index < 2 ? 'high' : 'low'}
                            className="inline-flex items-start gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[0.64rem] uppercase tracking-[0.22em] text-parchment/76 transition hover:border-gold/30 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Sparkles size={12} className="mt-0.5 shrink-0 text-gold/70" aria-hidden="true" />
                            <span>{prompt}</span>
                          </button>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <form className="border-t border-white/10 px-5 py-4" onSubmit={handleSubmit}>
                  <label className="sr-only" htmlFor={inputId}>
                    Message Nova
                  </label>
                  <textarea
                    id={inputId}
                    ref={inputRef}
                    value={draft}
                    rows={3}
                    placeholder="Ask about pricing, services, or what you need to book..."
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={handleDraftKeyDown}
                    className="min-h-[6.5rem] w-full resize-none rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ivory outline-none placeholder:text-parchment/36 focus:border-gold/40 focus:ring-2 focus:ring-gold/20"
                  />

                  <div className="mt-4 flex items-center justify-between gap-3">
                    {error ? <p className="max-w-[60%] text-sm leading-6 text-red-200">{error}</p> : <p className="max-w-[60%] text-sm leading-6 text-parchment/58">Tell me the session type, date, location, and use case.</p>}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleResetChat}
                        disabled={sending}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-[0.64rem] uppercase tracking-[0.28em] text-parchment/76 transition hover:border-gold/35 hover:text-ivory disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Reset
                      </button>

                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[linear-gradient(135deg,rgba(198,161,91,0.96),rgba(163,104,42,0.96))] px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-ink transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <Send size={14} aria-hidden="true" />
                        {sending ? 'Sending' : 'Send'}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
