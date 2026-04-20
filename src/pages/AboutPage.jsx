import { useId } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
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
  { label: 'Instagram', href: site.socials[0].href, hint: 'IG', external: true },
  { label: 'Facebook', href: 'https://www.facebook.com/search/top?q=samuel%20studio', hint: 'FB', external: true },
  { label: 'Contact', href: `mailto:${site.email}`, hint: 'CO', external: true },
  { label: 'Featured Work', href: '/portfolio', hint: 'FW', external: false },
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
              viewport={{ once: true, amount: 0.35 }}
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
          viewport={{ once: true, amount: 0.35 }}
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
          viewport={{ once: true, amount: 0.35 }}
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

  return (
    <>
      <SEO
        title="About"
        description="A bold editorial About page for Samuel Studio, centered on refined portraiture, calm direction, and lasting impact."
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

      <section className="relative isolate min-h-[90svh] overflow-hidden bg-[#0b0b0b] text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(198,161,91,0.18),transparent_14%),radial-gradient(circle_at_50%_64%,rgba(15,75,67,0.08),transparent_22%),radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.75),transparent_28%),linear-gradient(180deg,rgba(11,11,11,0.98),rgba(11,11,11,0.96))]" />

        <div className="absolute inset-0 opacity-[0.42]">
          <svg viewBox="0 0 1600 900" className="h-full w-full">
            <g fill="none" stroke="rgba(84,72,52,0.18)" strokeWidth="1.2">
              {contourPaths.map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  initial={reduceMotion ? false : { opacity: 0, pathLength: 0.85 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, pathLength: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
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

        <div className="pointer-events-none absolute inset-x-0 top-[60%] z-0 -translate-y-1/2 overflow-hidden opacity-55 sm:top-[62%] lg:top-[66%]">
          <div className="signature-marquee-wrap">
            <div className="signature-marquee-track flex w-max items-center gap-16 px-6 sm:gap-20">
              {Array.from({ length: 4 }).map((_, index) => (
                <span
                  key={index}
                  className="block whitespace-nowrap text-[clamp(4rem,8vw,7.25rem)] leading-none text-transparent"
                  style={{
                    fontFamily: 'var(--font-script)',
                    ...marqueeGoldStyle,
                  }}
                >
                  Samuel Studio
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid min-h-[90svh] max-w-[1700px] grid-cols-1 gap-8 px-5 pb-18 pt-24 sm:px-8 lg:grid-cols-[190px_minmax(0,1fr)_210px] lg:gap-5 lg:px-10 lg:pt-26">
          <aside className="hidden lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-3">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-ivory/78">Navigation</p>
              <div className="mt-3 space-y-2.5">
                <SplitRailLink label="About" href="/about" active />
                <SplitRailLink label="Portfolio" href="/portfolio" />
                <SplitRailLink label="Services" href="/services" />
                <SplitRailLink label="Booking" href="/booking" />
              </div>
            </div>
          </aside>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 top-8 mx-auto h-[66%] w-[min(92vw,980px)] rounded-[2rem] bg-[linear-gradient(180deg,rgba(17,17,17,0.72),rgba(17,17,17,0.42)),radial-gradient(circle_at_center,rgba(201,164,88,0.1),transparent_64%)] shadow-[0_26px_100px_rgba(0,0,0,0.42)] backdrop-blur-md" />
            <div className="absolute inset-x-0 top-16 mx-auto h-[48%] w-[min(78vw,720px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,244,214,0.16),rgba(255,244,214,0.05)_34%,transparent_72%)] blur-3xl" />

            <div className="relative w-full max-w-[1120px] px-2 text-center sm:px-4">
              <div className="mx-auto h-[clamp(64px,8vw,118px)] w-[min(82vw,1100px)]">
                <SignatureWord className="h-full w-full opacity-70" />
              </div>

              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-ivory/75">
                About / Samuel Studio
              </p>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.24 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: 'easeOut', delay: 0.05 }}
                className="relative z-10 mx-auto mt-5 max-w-[13ch] font-display text-[clamp(2.7rem,5.8vw,6.6rem)] leading-[0.93] tracking-[-0.05em] text-ivory"
              >
                Crafting portraits with presence.
              </motion.h1>

              <div className="relative mx-auto -mt-4 flex justify-center sm:-mt-6">
                <div className="absolute inset-x-0 top-1/2 hidden h-[1px] bg-[linear-gradient(90deg,transparent,rgba(201,164,88,0.55),transparent)] lg:block" />
                <motion.img
                  src={samPortrait}
                  alt="Samuel Studio portrait"
                  initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.85, ease: 'easeOut', delay: 0.08 }}
                  className="relative z-20 w-[min(32vw,480px)] min-w-[240px] max-w-[480px] drop-shadow-[0_24px_68px_rgba(0,0,0,0.48)]"
                />
              </div>

            </div>
          </div>

          <aside className="hidden lg:flex lg:flex-col lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-ivory/78">Studio links</p>
              <div className="mt-6 space-y-4">
                {studioLinks.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                      className="group flex w-[210px] items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-ivory/90 backdrop-blur-sm transition hover:border-gold/30 hover:bg-white/8"
                    >
                      <span className="text-[0.78rem] font-semibold uppercase tracking-[0.42em] text-ivory/82">
                        {item.label}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory/82 transition group-hover:border-gold/35 group-hover:text-gold">
                        {item.hint}
                      </span>
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="group flex w-[210px] items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-ivory/90 backdrop-blur-sm transition hover:border-gold/30 hover:bg-white/8"
                    >
                      <span className="text-[0.78rem] font-semibold uppercase tracking-[0.42em] text-ivory/82">
                        {item.label}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ivory/82 transition group-hover:border-gold/35 group-hover:text-gold">
                        {item.hint}
                      </span>
                    </Link>
                  ),
                )}
              </div>
            </div>

          </aside>
        </div>

      </section>
    </>
  )
}
