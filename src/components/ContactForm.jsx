import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'

const initialState = {
  name: '',
  email: '',
  phone: '',
  sessionType: 'Portrait Session',
  preferredDate: '',
  message: '',
}

export function ContactForm() {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const sessionOptions = useMemo(
    () => [
      'Portrait Session',
      'Branding Session',
      'Couples Session',
      'Family Session',
      'Creative Editorial',
    ],
    [],
  )

  function validate(nextValues) {
    const nextErrors = {}
    if (!nextValues.name.trim()) nextErrors.name = 'Please add your name.'
    if (!nextValues.email.trim()) nextErrors.email = 'Please add your email.'
    else if (!/^\S+@\S+\.\S+$/.test(nextValues.email)) nextErrors.email = 'Please enter a valid email.'
    if (!nextValues.phone.trim()) nextErrors.phone = 'Please add a phone number.'
    if (!nextValues.preferredDate.trim()) nextErrors.preferredDate = 'Please select a preferred date.'
    if (!nextValues.message.trim()) nextErrors.message = 'Please tell us a little about the session.'
    return nextErrors
  }

  function onChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gold-frame p-8"
      >
        <p className="text-xs uppercase tracking-[0.36em] text-gold/80">Inquiry received</p>
        <h3 className="mt-4 font-display text-4xl text-ivory">Thank you. We will be in touch soon.</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-parchment/72">
          Your inquiry has been received, and a response will be sent to {site.email} with the next available details and booking options.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initialState)
            setSubmitted(false)
            setErrors({})
          }}
          className="mt-8 inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-gold transition hover:border-gold/70"
        >
          Send another inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="gold-frame p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input name="name" value={values.name} onChange={onChange} className="input-field" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input name="email" type="email" value={values.email} onChange={onChange} className="input-field" />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input name="phone" value={values.phone} onChange={onChange} className="input-field" />
        </Field>
        <Field label="Session Type">
          <select name="sessionType" value={values.sessionType} onChange={onChange} className="input-field">
            {sessionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Date" error={errors.preferredDate}>
          <input name="preferredDate" type="date" value={values.preferredDate} onChange={onChange} className="input-field" />
        </Field>
      </div>
      <Field label="Message" error={errors.message} className="mt-5">
        <textarea
          name="message"
          rows={6}
          value={values.message}
          onChange={onChange}
          className="input-field resize-none"
          placeholder="Tell us about your vision, wardrobe, timeline, and any details you want to preserve."
        />
      </Field>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full border border-gold/70 bg-gold/12 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ivory transition hover:translate-y-[-1px] hover:border-gold hover:bg-gold/20 hover:text-gold-100"
        >
          Submit inquiry
        </button>
        <p className="text-xs uppercase tracking-[0.28em] text-parchment/45">
          Replies within one business day
        </p>
      </div>
    </form>
  )
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-red-300">{error}</span> : null}
    </label>
  )
}
