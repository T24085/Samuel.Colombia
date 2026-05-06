import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { services } from '../data/services'
import { withBase } from '../utils/paths'

const serviceFrames = [
  {
    src: withBase('photos/modern-black-white.jpg'),
    alt: 'Black and white editorial portrait from Samuel Studio.',
    label: 'Campaign',
    className: 'left-[3%] top-[10%] w-[33%] rotate-[-7deg]',
  },
  {
    src: withBase('photos/confidence.jpg'),
    alt: 'Personal identity portrait from Samuel Studio.',
    label: 'Identity',
    className: 'right-[5%] top-[2%] w-[29%] rotate-[5deg]',
  },
  {
    src: withBase('photos/rain.jpg'),
    alt: 'Atmospheric lifestyle frame from Samuel Studio.',
    label: 'Story',
    className: 'left-[26%] top-[38%] w-[36%] rotate-[2deg]',
  },
  {
    src: withBase('photos/negris-3.jpg'),
    alt: 'Beauty portrait from Samuel Studio.',
    label: 'Portrait',
    className: 'right-[1%] bottom-[5%] w-[34%] rotate-[-4deg]',
  },
]

const serviceLooks = [
  { name: 'Hard light', value: 'Campaign edge' },
  { name: 'Warm polish', value: 'Personal brand' },
  { name: 'Slow mood', value: 'Visual story' },
  { name: 'Soft intimacy', value: 'Portrait session' },
]

function getServiceTone(serviceSlug) {
  if (serviceSlug === 'editorial-campaign') return 'motion-fast'
  if (serviceSlug === 'visual-story-projects' || serviceSlug === 'private-portraits') return 'motion-cinematic'
  return ''
}

function ServicesContactSheet({ reduceMotion, activeService, activeServiceIndex }) {
  const activeFrames = serviceFrames.map((_, index) => serviceFrames[(index + activeServiceIndex) % serviceFrames.length])

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22, rotate: -1.5 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.18 }}
      className={`relative min-h-[31rem] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#0b0a08] shadow-[0_42px_140px_rgba(0,0,0,0.55)] sm:min-h-[35rem] lg:min-h-[39rem] ${getServiceTone(activeService.slug)}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(198,161,91,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.22))]"
      />
      <div aria-hidden="true" className="services-film-grain absolute inset-0 opacity-[0.12]" />
      <div aria-hidden="true" className="absolute inset-x-7 top-7 flex justify-between gap-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="h-3 w-5 rounded-[2px] border border-black/40 bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-x-7 bottom-7 flex justify-between gap-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="h-3 w-5 rounded-[2px] border border-black/40 bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.slug}
          className="absolute inset-8 sm:inset-10"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {activeFrames.map((frame, index) => (
            <motion.figure
              key={`${activeService.slug}-${frame.src}-${index}`}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.82, ease: 'easeOut', delay: 0.08 + index * 0.06 }}
              className={`absolute aspect-[4/5] overflow-hidden rounded-[1rem] border border-ivory/18 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.52)] ${frame.className}`}
            >
              <img src={frame.src} alt={frame.alt} className="media-card-image h-full w-full object-cover grayscale-[18%] saturate-[0.88]" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.54))]" />
              <div className="editorial-flash" aria-hidden="true" />
              <figcaption className="media-card-caption absolute bottom-3 left-3 rounded-full border border-white/12 bg-black/38 px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.28em] text-ivory/82 backdrop-blur-md">
                {frame.label}
              </figcaption>
            </motion.figure>
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="absolute left-0 top-0 max-w-[19rem] rounded-[1.25rem] border border-white/10 bg-black/42 p-4 backdrop-blur-md"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/72">Selected service</p>
              <p className="mt-2 font-display text-2xl leading-[0.96] text-ivory">{activeService.title}</p>
              <p className="mt-2 text-sm leading-6 text-parchment/72">{activeService.subheader}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-7 right-7 rounded-[1.2rem] border border-white/10 bg-black/42 p-4 backdrop-blur-md sm:left-10 sm:right-10">
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceLooks.map((look) => (
            <div key={look.name} className="flex items-center justify-between gap-3 border-b border-white/10 py-2 last:border-b sm:[&:nth-last-child(-n+2)]:border-b-0">
              <span className="text-[0.58rem] uppercase tracking-[0.28em] text-gold/70">{look.name}</span>
              <span className="text-right text-[0.72rem] text-parchment/76">{look.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ServiceGatewayCard({ service, index, reduceMotion, active, onActivate }) {
  const preview = service.included.slice(0, 3)
  const frame = serviceFrames[index % serviceFrames.length]
  const toneClass = getServiceTone(service.slug)

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.85, ease: 'easeOut', delay: index * 0.06 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      onMouseEnter={() => onActivate(service.slug)}
      onFocus={() => onActivate(service.slug)}
      className={`group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)_28%,rgba(0,0,0,0.28))] shadow-[0_24px_90px_rgba(0,0,0,0.28)] ${toneClass} ${active ? 'ring-1 ring-gold/35' : ''}`}
    >
      <div aria-hidden="true" className="editorial-flash" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          backgroundImage:
            'radial-gradient(circle at 16% 12%, rgba(198,161,91,0.18), transparent 22%), radial-gradient(circle at 86% 8%, rgba(255,255,255,0.08), transparent 18%), linear-gradient(145deg, rgba(255,255,255,0.06), transparent 40%)',
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative grid gap-0 lg:grid-cols-[0.72fr_1fr_0.88fr]">
        <div className="relative min-h-[18rem] overflow-hidden border-b border-white/10 bg-black/30 lg:min-h-full lg:border-b-0 lg:border-r">
          <img
            src={frame.src}
            alt={frame.alt}
            className="media-card-image absolute inset-0 h-full w-full object-cover opacity-[0.82] grayscale-[10%] saturate-[0.9]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.66)),linear-gradient(90deg,rgba(0,0,0,0.2),transparent)]" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
            <span className="media-card-caption text-[0.62rem] uppercase tracking-[0.32em] text-ivory/72">Look {String(index + 1).padStart(2, '0')}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold/45 to-transparent" />
          </div>
        </div>

        <div className="px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-display text-5xl leading-none tracking-[-0.06em] text-ivory/16 md:text-6xl">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-gold/20 bg-black/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.32em] text-gold/82">
              {service.label}
            </span>
          </div>

          <p className="reveal mt-6 text-[0.64rem] uppercase tracking-[0.36em] text-gold/65" style={{ '--reveal-delay': '100ms' }}>{service.eyebrow}</p>
          <h2 className="reveal mt-4 max-w-3xl font-display text-[2.5rem] leading-[0.92] tracking-[-0.055em] text-ivory sm:text-[3.2rem] lg:text-[3.8rem]" style={{ '--reveal-delay': '160ms' }}>
            {service.title}
          </h2>
          <p className="reveal mt-5 max-w-2xl text-[1rem] leading-8 text-parchment/74" style={{ '--reveal-delay': '220ms' }}>{service.subheader}</p>

          <p className="reveal mt-7 max-w-2xl text-sm leading-7 text-parchment/68 sm:text-[0.98rem]" style={{ '--reveal-delay': '280ms' }}>
            {service.description[0]}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="reveal rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/72" style={{ '--reveal-delay': '340ms' }}>
              {service.mood}
            </span>
            <span className="reveal rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/72" style={{ '--reveal-delay': '400ms' }}>
              {service.audience}
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/20 px-6 py-7 sm:px-8 sm:py-9 lg:border-l lg:border-t-0 lg:px-9 lg:py-10">
          <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[0.64rem] uppercase tracking-[0.34em] text-gold/68">Included preview</p>
            <ul className="mt-4 space-y-3">
              {preview.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-parchment/76">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.025] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Audience</p>
              <p className="mt-2 text-sm leading-7 text-parchment/72">{service.audience}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.025] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Mood</p>
              <p className="mt-2 text-sm leading-7 text-parchment/72">{service.mood}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-parchment/66">
            {service.quote}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/services/${service.slug}`}
                className="studio-primary-cta premium-button group inline-flex items-center justify-between gap-4 rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] transition duration-300"
              >
                <span className="relative z-10">{service.cta}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/72 sm:block">
              View full details
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function ServicesPage() {
  const reduceMotion = useReducedMotion()
  const [activeServiceSlug, setActiveServiceSlug] = useState(services[0].slug)
  const activeServiceIndex = Math.max(0, services.findIndex((service) => service.slug === activeServiceSlug))
  const activeService = services[activeServiceIndex] ?? services[0]

  return (
    <>
      <SEO
        title="Services"
        description="Samuel Studio services for editorial campaigns, personal identity, visual story projects, and private portrait commissions."
        path="/services"
      />

      <main className="relative isolate overflow-hidden bg-[#070605] text-ivory">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0b09_0%,#090807_42%,#050505_100%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[-10%] top-[-12%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.22),transparent_65%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 18, 0],
                    y: [0, 14, 0],
                    opacity: [0.45, 0.7, 0.45],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-[-12%] top-[16%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_68%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -16, 0],
                    y: [0, -10, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }
            }
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.92)_1px,transparent_0)] [background-size:18px_18px]" />
        </div>

        <div className="relative z-10">
          <section className="studio-shell pt-24 pb-12 sm:pt-28 lg:pb-16 lg:pt-32">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
              <div className="max-w-5xl">
                <p className="reveal text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold/70" style={{ '--reveal-delay': '40ms' }}>Services</p>
                <h1 className="reveal mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.86] tracking-[-0.055em] text-ivory sm:text-6xl md:text-[4.6rem] lg:text-[5.7rem] xl:text-[6.5rem]" style={{ '--reveal-delay': '120ms' }}>
                  Cinematic services <span className="italic text-gold/90">built as gateways</span>
                  <span className="block">into bespoke image-making.</span>
                </h1>
                <p className="reveal mt-8 max-w-2xl text-base leading-8 text-parchment/74 md:text-lg" style={{ '--reveal-delay': '200ms' }}>
                  Four distinct commissions, each shaped with the same editorial discipline: clear direction, refined
                  atmosphere, and final imagery that feels considered from first frame to delivery.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {services.map((service, index) => (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => setActiveServiceSlug(service.slug)}
                      onMouseEnter={() => setActiveServiceSlug(service.slug)}
                      onFocus={() => setActiveServiceSlug(service.slug)}
                      aria-pressed={activeService.slug === service.slug}
                      className={`reveal rounded-full border px-4 py-3 text-[0.64rem] uppercase tracking-[0.3em] transition hover:-translate-y-0.5 ${activeService.slug === service.slug ? 'border-gold/45 bg-gold/10 text-ivory' : 'border-white/10 bg-white/[0.03] text-parchment/76'}`}
                      style={{ '--reveal-delay': `${280 + index * 60}ms` }}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              <ServicesContactSheet reduceMotion={reduceMotion} activeService={activeService} activeServiceIndex={activeServiceIndex} />
            </div>
          </section>

          <section className="studio-shell pb-14 lg:pb-18">
            <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(198,161,91,0.05) 24%, rgba(255,255,255,0.02) 52%, rgba(198,161,91,0.04) 76%, rgba(255,255,255,0.02))',
                }}
              />
              <div className="relative flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.64rem] uppercase tracking-[0.34em] text-parchment/68">
                <span className="text-gold/70">Selected for</span>
                <span className="text-white/20">/</span>
                <span>Fashion labels</span>
                <span className="text-white/20">/</span>
                <span>Founders</span>
                <span className="text-white/20">/</span>
                <span>Narrative campaigns</span>
                <span className="text-white/20">/</span>
                <span>Private portrait sessions</span>
              </div>
            </div>
          </section>

          <section className="studio-shell pb-18 lg:pb-24">
            <div className="space-y-6 lg:space-y-8">
              {services.map((service, index) => (
                <ServiceGatewayCard
                  key={service.slug}
                  service={service}
                  index={index}
                  reduceMotion={reduceMotion}
                  active={activeService.slug === service.slug}
                  onActivate={setActiveServiceSlug}
                />
              ))}
            </div>
          </section>

          <section className="studio-shell pb-24 lg:pb-28">
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#040404] px-7 py-16 sm:px-10 sm:py-20 lg:min-h-[28rem] lg:px-16 lg:py-24"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 16% 14%, rgba(198,161,91,0.16), transparent 26%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.08), transparent 20%), radial-gradient(circle at 50% 100%, rgba(198,161,91,0.06), transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.18))',
                }}
              />
              <div aria-hidden="true" className="absolute inset-y-0 left-8 hidden w-px bg-gradient-to-b from-transparent via-gold/35 to-transparent lg:block" />
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-10 font-display text-[8rem] uppercase tracking-[-0.08em] text-ivory/5 sm:text-[10rem] lg:text-[14rem]"
              >
                story
              </div>

              <div className="relative grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Studio position</p>
                  <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.9] tracking-[-0.05em] text-ivory md:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
                    Four routes, one editorial standard.
                    <span className="block italic text-gold/90">Every project starts with direction.</span>
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-8 text-parchment/72 md:text-base">
                  Campaign work, identity sessions, story projects, and private portraits each need a different rhythm.
                  The service pages show how Samuel plans the shoot, directs the room, and delivers polished images ready
                  for brand use, publication, or personal archive.
                </p>
              </div>

              <div className="relative mt-12 grid gap-4 sm:grid-cols-3">
                {['Concept first', 'Tailored delivery', 'Limited booking calendar'].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-parchment/76"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="studio-shell pb-24 lg:pb-28">
            <div className="grid gap-8 rounded-[2.4rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(17,17,17,0.92))] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-12">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Inquiry</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[0.92] tracking-[-0.04em] text-ivory md:text-5xl xl:text-[4.5rem]">
                  Ready to choose the right commission path?
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-parchment/72 md:text-base">
                  Share the project type, timeline, intended use, and any reference direction. Samuel will respond with
                  the best-fit service path and next steps for planning the shoot.
                </p>
              </div>

              <div className="flex flex-col justify-end gap-4">
                <Link
                  to="/booking"
                  className="studio-primary-cta group inline-flex items-center justify-between gap-4 rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] transition duration-300"
                >
                  <span className="relative z-10">Inquire about a project</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="studio-secondary-cta group inline-flex items-center justify-between gap-4 rounded-full px-6 py-4 text-xs uppercase tracking-[0.3em] text-parchment/86 transition duration-300"
                >
                  <span className="relative z-10">Book a consultation</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold/65">
                  <Sparkles className="h-4 w-4" />
                  <span>Refined response within 1-2 business days</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
