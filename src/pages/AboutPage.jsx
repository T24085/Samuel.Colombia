import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SEO } from '../components/SEO'
import { site } from '../data/site'
import samPortrait from '../../Sam.png'

export const aboutMarqueeItems = [
  'Portraits',
  'Branding',
  'Editorial',
  'Headshots',
  'Fine Art',
  'Commercial',
  'Lighting',
  'Retouching',
  'Print',
]

const contourPaths = [
  'M-120,110 C120,20 230,30 360,100 S650,190 790,120 S1070,0 1230,90 S1490,220 1720,100',
  'M-160,220 C40,140 210,110 360,180 S650,300 810,220 S1080,80 1250,170 S1500,300 1740,210',
  'M-140,340 C80,250 260,220 390,290 S680,420 840,340 S1110,220 1270,300 S1510,430 1730,330',
  'M-120,470 C120,390 250,360 370,430 S660,560 820,470 S1090,340 1260,420 S1490,560 1730,460',
  'M-100,600 C100,520 240,500 360,560 S650,690 820,610 S1080,470 1240,540 S1490,670 1710,580',
  'M-120,720 C70,640 220,610 360,670 S660,810 820,720 S1100,580 1260,660 S1490,810 1720,700',
]

const studioLinks = [
  ...site.socials.map((item) => ({
    ...item,
    hint: item.label
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2),
  })),
  ...site.websiteLinks.map((item) => ({
    ...item,
    hint: item.label
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2),
  })),
]

const publicationFeatures = [
  {
    src: `${import.meta.env.BASE_URL}publications/pump-magazine-editorial.png`,
    title: 'PUMP Magazine',
    caption: 'Editor\'s Choice feature crediting photographer Samuel Cary.',
  },
  {
    src: `${import.meta.env.BASE_URL}publications/portrait-magazine-marika.png`,
    title: 'Portrait Magazine',
    caption: 'Published feature: Tiffany Garcia by Samuel Cary.',
  },
  {
    src: `${import.meta.env.BASE_URL}publications/moevir-magazine-negris.png`,
    title: 'MOEVIR Magazine',
    caption: 'Published fashion editorial with cover-story presentation.',
  },
]

const manifestoLines = [
  'Samuel Cary creates fashion, beauty, branding, and portrait imagery with a print-minded editorial point of view.',
  'His published work brings the same calm direction, polish, and visual confidence into every client session.',
]

function SignatureWord({ className = '' }) {
  const reduceMotion = useReducedMotion()
  const gradientId = useId().replace(/:/g, '')
  const maskId = useId().replace(/:/g, '')

  if (reduceMotion) {
    return (
      <div aria-hidden="true" className={`signature-fallback logo-script ${className}`}>
        Samuel Studio
      </div>
    )
  }

  return (
    <div aria-hidden="true" className={`signature-mark ${className}`}>
      <svg viewBox="0 0 1600 320" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fdf5db" />
            <stop offset="18%" stopColor="#c6a15b" />
            <stop offset="36%" stopColor="#f7e8c8" />
            <stop offset="56%" stopColor="#a88443" />
            <stop offset="74%" stopColor="#f5f0e6" />
            <stop offset="100%" stopColor="#c6a15b" />
          </linearGradient>
          <mask id={maskId}>
            <motion.rect
              x="0"
              y="0"
              height="100%"
              fill="white"
              className="signature-mask-wipe"
              initial={{ width: 0 }}
              whileInView={{ width: 1600 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            />
          </mask>
        </defs>
        <motion.text
          x="50%"
          y="58%"
          textAnchor="middle"
          style={{ fontFamily: 'var(--font-script)', fontSize: '156px' }}
          className="signature-outline"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.44, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          Samuel Studio
        </motion.text>
        <motion.text
          x="50%"
          y="58%"
          textAnchor="middle"
          style={{ fontFamily: 'var(--font-script)', fontSize: '156px' }}
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
          className="signature-fill"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Samuel Studio
        </motion.text>
      </svg>
    </div>
  )
}

function SplitRailLink({ label, href, active = false }) {
  return (
    <Link
      to={href}
      className={`split-rail-link group block ${active ? 'text-ivory' : 'text-ivory/94'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50`}
    >
      <span className="mb-1 block text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-gold/90">Studio</span>
      <span className="split-rail-word block font-display text-[clamp(1.8rem,3vw,3.5rem)] leading-[0.78] tracking-[-0.04em]">
        <span className="split-rail-base">{label}</span>
        <span className="split-rail-half split-rail-half-top">{label}</span>
        <span className="split-rail-half split-rail-half-bottom">{label}</span>
      </span>
    </Link>
  )
}

export function AboutPage() {
  const reduceMotion = useReducedMotion()
  const [activePublication, setActivePublication] = useState(0)
  const manifestoRef = useRef(null)
  const { scrollYProgress: manifestoScrollProgress } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  })
  const marqueeItems = [...aboutMarqueeItems, ...aboutMarqueeItems]
  const marqueeGoldStyle = {
    backgroundImage:
      'linear-gradient(90deg, #f8eed0 0%, #c9a458 18%, #fff3d8 34%, #8e6a2c 52%, #f7ead0 74%, #c9a458 100%)',
    backgroundSize: '220% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextStroke: '0.45px rgba(201,164,88,0.28)',
    filter: 'drop-shadow(0 0 18px rgba(201,164,88,0.15))',
  }

  useEffect(() => {
    if (reduceMotion) return undefined

    const timer = window.setInterval(() => {
      setActivePublication((current) => (current + 1) % publicationFeatures.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const coverDriftY = useTransform(manifestoScrollProgress, [0, 1], [16, -18])
  const coverDriftScale = useTransform(manifestoScrollProgress, [0, 1], [0.985, 1.02])

  return (
    <>
      <SEO
        title="About"
        description="A bold editorial About page for Samuel Studio, centered on published portraiture, calm direction, and lasting impact."
        path="/about"
        image={samPortrait}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: site.name,
          image: samPortrait,
          email: site.email,
          telephone: site.phone,
          description: site.tagline,
          url: typeof window !== 'undefined' ? `${window.location.origin}/about` : '/about',
        }}
      />

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b0b0b] text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(198,161,91,0.18),transparent_14%),radial-gradient(circle_at_50%_64%,rgba(15,75,67,0.08),transparent_22%),radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.75),transparent_28%),linear-gradient(180deg,rgba(11,11,11,0.98),rgba(11,11,11,0.96))]" />

        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_43%,rgba(5,5,5,0.2),rgba(5,5,5,0.82)_56%,rgba(5,5,5,0.94)_100%),linear-gradient(90deg,rgba(5,5,5,0.94),rgba(5,5,5,0.42)_45%,rgba(5,5,5,0.94))]" />

        <div className="absolute inset-0 opacity-[0.42]">
          <svg viewBox="0 0 1600 900" className="h-full w-full">
            <g fill="none" stroke="rgba(84,72,52,0.18)" strokeWidth="1.2">
              {contourPaths.map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  initial={reduceMotion ? false : { opacity: 0, pathLength: 0.85 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, pathLength: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 1.6, ease: 'easeOut', delay: index * 0.04 }}
                />
              ))}
            </g>
          </svg>
        </div>

        <div className="absolute inset-0 opacity-[0.06]">
          <svg viewBox="0 0 1600 900" className="h-full w-full">
            <defs>
              <pattern id="about-dots" width="34" height="34" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.1" fill="rgba(245,240,230,0.18)" />
              </pattern>
            </defs>
            <rect width="1600" height="900" fill="url(#about-dots)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] items-center px-5 pb-10 pt-22 sm:px-8 lg:px-10 lg:pt-24">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.24 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.85, ease: 'easeOut' }}
              className="about-cover-wall"
              style={reduceMotion ? undefined : { y: coverDriftY, scale: coverDriftScale }}
            >
              {publicationFeatures.map((item, index) => (
                <figure
                  className={`about-cover ${activePublication === index ? 'about-cover-active' : ''}`}
                  key={item.src}
                  aria-hidden={activePublication !== index}
                >
                  <img src={item.src} alt={item.title} loading="eager" />
                  <figcaption>
                    <span>{item.title}</span>
                    <small>{item.caption}</small>
                  </figcaption>
                </figure>
              ))}
              <div className="about-cover-dots" aria-hidden="true">
                {publicationFeatures.map((item, index) => (
                  <span
                    key={item.title}
                    className={activePublication === index ? 'is-active' : ''}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.24 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.85, ease: 'easeOut', delay: 0.08 }}
              className="relative"
              ref={manifestoRef}
            >
              <div className="mb-5 h-[clamp(48px,7vh,76px)] w-[min(76vw,520px)]">
                <SignatureWord className="h-full w-full opacity-70" />
              </div>

              <div className="flex flex-wrap gap-2.5">
                {publicationFeatures.map((item) => (
                  <span className="about-proof-pill" key={item.title}>{item.title}</span>
                ))}
              </div>

              <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(3.6rem,8.4vw,8.6rem)] leading-[0.82] tracking-[-0.05em] text-ivory">
                Published photographer.
              </h1>

              <div className="mt-6 grid gap-5 border-y border-white/10 py-6 lg:grid-cols-[1fr_15rem]">
                <p className="max-w-[40rem] text-base leading-8 text-ivory/76">
                  {manifestoLines.map((line, index) => (
                    <span
                      key={line}
                      className="reveal block"
                      style={{ '--reveal-delay': `${index * 120}ms`, '--reveal-distance': '0.8rem' }}
                    >
                      {line}
                    </span>
                  ))}
                </p>

                <figure className="about-author-card">
                  <img src={samPortrait} alt="Samuel Cary" />
                  <figcaption>
                    <span>Photographer</span>
                    <strong>Samuel Cary</strong>
                  </figcaption>
                </figure>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/portfolio"
                  className="about-action-primary"
                >
                  View Portfolio
                </Link>
                <Link
                  to="/booking"
                  className="about-action-secondary"
                >
                  Book a Session
                </Link>
                <a
                  href={site.socials[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="about-action-ghost"
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </div>

      </section>
    </>
  )
}
