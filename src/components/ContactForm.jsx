import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { site } from '../data/site'
import { bookingServiceOptions } from '../data/services'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || 'service_p55qfka'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || 'template_gxa8uvc'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || 'IFJYlgeXzSgqsFRBS'

const initialState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  preferredDate: '',
  message: '',
}

export function ContactForm() {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const isSubmitting = status === 'sending'

  function validate(nextValues) {
    const nextErrors = {}
    if (!nextValues.name.trim()) nextErrors.name = 'Please add your name.'
    if (!nextValues.email.trim()) nextErrors.email = 'Please add your email.'
    else if (!/^\S+@\S+\.\S+$/.test(nextValues.email)) nextErrors.email = 'Please enter a valid email.'
    if (!nextValues.phone.trim()) nextErrors.phone = 'Please add a phone number.'
    if (!nextValues.service.trim()) nextErrors.service = 'Please select a service.'
    if (!nextValues.preferredDate.trim()) nextErrors.preferredDate = 'Please select a preferred date.'
    if (!nextValues.message.trim()) nextErrors.message = 'Please tell us a little about the session.'
    return nextErrors
  }

  function formatPreferredDate(dateValue) {
    if (!dateValue) return ''

    const parsedDate = new Date(`${dateValue}T12:00:00`)
    if (Number.isNaN(parsedDate.getTime())) return dateValue

    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    }).format(parsedDate)
  }

  function onChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status === 'error') {
      setStatus('idle')
      setFeedback('')
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    setFeedback('')

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        service: values.service.trim(),
        preferredDate: formatPreferredDate(values.preferredDate.trim()),
        message: values.message.trim(),
        time: new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(new Date()),
        reply_to: values.email.trim(),
        to_email: site.email,
      }, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })

      setStatus('success')
      setValues(initialState)
      setErrors({})
    } catch (error) {
      console.error('EmailJS booking submission failed', error)
      setStatus('error')
      setFeedback('Something went wrong while sending your inquiry. Please try again or email capture@samuel.studio directly.')
    }
  }

  return (
    <div className="gold-frame scroll-mt-32 p-8">
      {status === 'success' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.36em] text-gold/80">Inquiry received</p>
          <h3 className="mt-4 font-display text-4xl text-ivory">Thank you. We will be in touch soon.</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-parchment/72">
            Your inquiry has been sent to {site.email}. The studio will follow up with availability and next steps.
          </p>
          <button
            type="button"
            onClick={() => {
              setValues(initialState)
              setStatus('idle')
              setErrors({})
              setFeedback('')
            }}
            className="premium-button mt-8 inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-gold"
          >
            Send another inquiry
          </button>
        </motion.div>
      ) : (
        <form id="booking-form" onSubmit={onSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" error={errors.name} delay={0}>
              <input
                name="name"
                value={values.name}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="name"
                className="input-field"
              />
            </Field>
            <Field label="Email" error={errors.email} delay={60}>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="email"
                className="input-field"
              />
            </Field>
            <Field label="Phone" error={errors.phone} delay={120}>
              <input
                name="phone"
                value={values.phone}
                onChange={onChange}
                disabled={isSubmitting}
                autoComplete="tel"
                className="input-field"
              />
            </Field>
            <Field label="Service" error={errors.service} delay={180}>
              <select
                name="service"
                value={values.service}
                onChange={onChange}
                disabled={isSubmitting}
                className="input-field"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {bookingServiceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Preferred Date" error={errors.preferredDate} delay={240}>
              <input
                name="preferredDate"
                type="date"
                value={values.preferredDate}
                onChange={onChange}
                disabled={isSubmitting}
                className="input-field"
              />
            </Field>
          </div>
          <Field label="Message" error={errors.message} className="mt-5" delay={300}>
            <textarea
              name="message"
              rows={6}
              value={values.message}
              onChange={onChange}
              disabled={isSubmitting}
              className="input-field resize-none"
              placeholder="Tell us about your vision, wardrobe, timeline, and any details you want to preserve."
            />
          </Field>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="premium-button inline-flex items-center justify-center rounded-full border border-gold/70 bg-gold/12 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Submit inquiry'}
            </button>
            <p className="text-xs uppercase tracking-[0.28em] text-parchment/45">
              Replies within one business day
            </p>
          </div>
          {feedback ? (
            <p className="mt-4 text-sm leading-6 text-red-200" aria-live="polite">
              {feedback}
            </p>
          ) : null}
        </form>
      )}
    </div>
  )
}

function Field({ label, error, children, className = '', delay = 0 }) {
  return (
    <label className={`reveal block ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-red-300">{error}</span> : null}
    </label>
  )
}
