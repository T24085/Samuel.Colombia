import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { SectionHeading } from '../components/SectionHeading'
import { ContactForm } from '../components/ContactForm'
import { site } from '../data/site'
import { galleryItems } from '../data/gallery'
import { GoldFrame, VerticalTag } from '../components/DecorativeElements'

function BookingBackdrop() {
  const reducedMotion = useReducedMotion()
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion || galleryItems.length < 2) return undefined

    const timer = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % galleryItems.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [reducedMotion])

  const activeItem = galleryItems[imageIndex % galleryItems.length]

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#050505]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeItem.id}
          className="absolute inset-0"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.15, ease: 'easeInOut' }}
        >
          <motion.img
            src={activeItem.src}
            alt=""
            className="h-full w-full object-cover object-center"
            initial={false}
            animate={reducedMotion ? { scale: 1 } : { scale: [1.04, 1.08] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 8.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }
            }
            onError={(event) => {
              event.currentTarget.src = '/photos/self-port.jpg'
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.6)),radial-gradient(circle_at_center,rgba(10,51,45,0.12),transparent_58%)]" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.35),rgba(8,8,8,0.82))]" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gold/18" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_52%,rgba(0,0,0,0.62)_100%)]" />
    </div>
  )
}

export function BookingPage() {
  return (
    <>
      <SEO
        title="Booking"
        description="Book a session with Samuel Studio. Submit an inquiry for portraits, branding, couples, family, or editorial photography."
        path="/booking"
      />
      <section className="relative isolate min-h-screen overflow-hidden bg-ink py-24 text-ivory">
        <BookingBackdrop />

        <div className="relative z-10">
          <div className="studio-shell">
            <SectionHeading
              eyebrow="Booking / Contact"
              title="Begin with an inquiry, then shape the session around your story."
              description="Use the form to share your goals, timing, and the kind of image language you want. The studio will respond with next steps and availability."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.6fr]">
              <ContactForm />
              <div className="space-y-5">
                <GoldFrame className="p-7">
                  <VerticalTag>Studio details</VerticalTag>
                  <div className="mt-6 space-y-5 text-sm leading-7 text-parchment/74">
                    <div>
                      <p className="text-xs uppercase tracking-[0.34em] text-gold/80">Hours</p>
                      <p className="mt-2">{site.hours}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.34em] text-gold/80">Location</p>
                      <p className="mt-2">{site.location}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.34em] text-gold/80">Turnaround</p>
                      <p className="mt-2">{site.turnaround}</p>
                    </div>
                  </div>
                </GoldFrame>

                <GoldFrame className="p-7">
                  <p className="text-xs uppercase tracking-[0.34em] text-gold/80">Social links</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {site.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.external ? '_blank' : undefined}
                        rel={social.external ? 'noreferrer' : undefined}
                        className="rounded-full border border-gold/35 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-ivory transition hover:border-gold/70 hover:bg-gold/10 hover:text-gold-100"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </GoldFrame>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
