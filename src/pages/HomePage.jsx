import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Brush, Compass, Gem, HeartHandshake } from 'lucide-react'
import { galleryItems } from '../data/gallery'
import { testimonials } from '../data/testimonials'
import { site } from '../data/site'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { SectionHeading } from '../components/SectionHeading'
import { TestimonialCard } from '../components/TestimonialCard'
import { CTASection } from '../components/CTASection'
import { MotionDeckSection } from '../components/AboutPosterSection'
import { Infinite3DGallery } from '../components/Infinite3DGallery'
import { Lightbox } from '../components/Lightbox'
import leftPortrait from '../../Left2.png'
import rightPortrait from '../../Right.png'

const experienceCards = [
  {
    icon: Brush,
    title: 'Editorial direction',
    text: 'Thoughtful posing and lighting shaped into imagery that feels considered rather than overproduced.',
  },
  {
    icon: Compass,
    title: 'Guided process',
    text: 'Clear communication from inquiry to delivery so every client feels confident and at ease.',
  },
  {
    icon: Gem,
    title: 'Luxury finish',
    text: 'Retouching and presentation that preserve texture, depth, and the natural elegance of the subject.',
  },
  {
    icon: HeartHandshake,
    title: 'Warm experience',
    text: 'A calm session flow with enough space for presence, movement, and authentic expression.',
  },
]

const testimonialContourPaths = [
  'M-140,90 C120,10 240,30 380,96 S650,210 820,120 S1090,-10 1260,72 S1510,210 1750,112',
  'M-180,220 C60,130 250,120 390,194 S670,310 840,228 S1090,90 1260,170 S1490,306 1760,208',
  'M-160,350 C80,260 260,220 410,292 S690,420 860,340 S1120,220 1280,300 S1510,430 1750,332',
  'M-140,510 C120,410 260,370 400,440 S670,570 840,490 S1100,360 1260,440 S1490,570 1740,476',
  'M-130,670 C100,580 250,540 390,610 S660,740 830,660 S1080,520 1240,602 S1480,736 1730,642',
]

export function HomePage() {
  const [activeIndex, setActiveIndex] = useState(null)
  const testimonialSectionRef = useRef(null)
  const signatureSectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const figureShift = useMotionValue(0)
  const figureShiftSpring = useSpring(figureShift, { damping: 20, stiffness: 240 })
  const rightFigureShift = useTransform(figureShiftSpring, (value) => -value)
  const { scrollYProgress: signatureScrollProgress } = useScroll({
    target: signatureSectionRef,
    offset: ['start end', 'center center'],
  })
  const { scrollYProgress: testimonialScrollProgress } = useScroll({
    target: testimonialSectionRef,
    offset: ['start end', 'end start'],
  })
  const signatureLeftX = useTransform(signatureScrollProgress, [0, 0.34, 0.68, 1], [-42, 0, 12, -18])
  const signatureRightX = useTransform(signatureScrollProgress, [0, 0.34, 0.68, 1], [42, 0, -12, 18])
  const signatureLeftClip = useTransform(signatureScrollProgress, [0, 0.28, 0.62, 1], [
    'inset(0 58% 0 0)',
    'inset(0 18% 0 0)',
    'inset(0 10% 0 0)',
    'inset(0 26% 0 0)',
  ])
  const signatureRightClip = useTransform(signatureScrollProgress, [0, 0.28, 0.62, 1], [
    'inset(0 0 0 58%)',
    'inset(0 0 0 18%)',
    'inset(0 0 0 10%)',
    'inset(0 0 0 26%)',
  ])
  const signatureVeilOpacity = useTransform(signatureScrollProgress, [0, 0.28, 0.62, 1], [0.2, 0.08, 0.02, 0.14])
  const testimonialTextY = useTransform(testimonialScrollProgress, [0, 0.5, 1], [20, 0, -14])
  const testimonialTextOpacity = useTransform(testimonialScrollProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.88])
  const contourShiftY = useTransform(testimonialScrollProgress, [0, 1], [-22, 16])
  const mode = 'Panorama'
  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null
  const clearIntentImage = galleryItems.find((item) => item.title === 'Clear Intent')
  const confidenceImage = galleryItems.find((item) => item.title === 'Confidence')

  const openById = (id) => {
    const index = galleryItems.findIndex((item) => item.id === id)
    if (index >= 0) setActiveIndex(index)
  }

  const close = () => setActiveIndex(null)
  const next = () => {
    if (!galleryItems.length) return
    setActiveIndex((current) => ((current ?? 0) + 1) % galleryItems.length)
  }
  const prev = () => {
    if (!galleryItems.length) return
    setActiveIndex((current) => ((current ?? 0) - 1 + galleryItems.length) % galleryItems.length)
  }

  useEffect(() => {
    if (reduceMotion) return undefined

    document.documentElement.classList.add('home-snap-scroll')
    document.body.classList.add('home-snap-scroll')
    return () => {
      document.documentElement.classList.remove('home-snap-scroll')
      document.body.classList.remove('home-snap-scroll')
    }
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return undefined

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

    const handleWheel = (event) => {
      if (event.deltaY === 0) return
      figureShift.set(clamp(figureShift.get() + (event.deltaY > 0 ? 8 : -8), 0, 100))
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [reduceMotion, figureShift])

  return (
    <>
      <SEO
        title="Samuel Studio"
        description="Luxury editorial photography with dark emerald, antique gold, and ivory visual storytelling."
        path="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: site.name,
          image: '/og-image.svg',
          email: site.email,
          telephone: site.phone,
          areaServed: 'United States',
          description: site.tagline,
          url: typeof window !== 'undefined' ? window.location.origin : '/',
        }}
      />

      <Hero />

      <section className="home-snap-section bg-[#050505] py-20 text-ivory">
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="mt-0">
            <Infinite3DGallery items={galleryItems} mode={mode} onSelect={openById} />
          </div>
        </div>
      </section>

      <section ref={signatureSectionRef} className="home-snap-section relative overflow-hidden bg-ink py-24 text-ivory">
        <div className="absolute inset-0 hidden md:grid md:grid-cols-2">
          <motion.div
            aria-hidden="true"
            className="relative"
            style={
              reduceMotion
                ? undefined
                : {
                    x: signatureLeftX,
                    clipPath: signatureLeftClip,
                  }
            }
          >
            <img
              src={confidenceImage?.src ?? '/photos/self-port.jpg'}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center brightness-[1.08] contrast-[1.08] saturate-[1.03]"
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-[10%] bottom-[12%] h-[30%] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,240,230,0.18),transparent_70%)] blur-3xl"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, -12, 0],
                      opacity: [0.22, 0.42, 0.22],
                    }
              }
              transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="relative"
            style={
              reduceMotion
                ? undefined
                : {
                    x: signatureRightX,
                    clipPath: signatureRightClip,
                  }
            }
          >
            <img
              src={clearIntentImage?.src ?? '/photos/self-port.jpg'}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center brightness-[1.08] contrast-[1.08] saturate-[1.03]"
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-[10%] top-[13%] h-[34%] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.22),transparent_68%)] blur-3xl"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 12, 0],
                      opacity: [0.2, 0.45, 0.2],
                    }
              }
              transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.7),rgba(17,17,17,0.42)_45%,rgba(17,17,17,0.42)_55%,rgba(17,17,17,0.7)),linear-gradient(180deg,rgba(10,51,45,0.1),rgba(17,17,17,0.42))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,17,17,0.06),rgba(17,17,17,0.34))]" />
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-[7%] left-1/2 z-10 hidden w-[20%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(245,240,230,0.02),rgba(198,161,91,0.1),rgba(245,240,230,0.02))] mix-blend-screen blur-2xl md:block"
            style={reduceMotion ? undefined : { opacity: signatureVeilOpacity }}
            animate={
              reduceMotion
                ? undefined
                : {
                    scaleY: [0.96, 1.05, 0.96],
                    x: ['-3%', '3%', '-3%'],
                  }
            }
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative z-10">
          <div className="studio-shell">
            <SectionHeading
              eyebrow="Signature experience"
              title="A calm, premium process designed around the photograph and the person in front of it."
              align="center"
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-4">
              {experienceCards.map((card) => {
                const Icon = card.icon
                return (
                  <motion.article
                    key={card.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65 }}
                    className="gold-frame p-6"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                      <Icon size={19} />
                    </div>
                    <h3 className="mt-5 font-display text-3xl text-ivory">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-parchment/72">{card.text}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <MotionDeckSection />

      <section ref={testimonialSectionRef} className="home-snap-section relative isolate overflow-hidden bg-[#111111] py-24 text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,240,230,0.05),transparent_42%),linear-gradient(180deg,rgba(17,17,17,0.98),rgba(17,17,17,0.94))]" />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18]"
          style={reduceMotion ? undefined : { y: contourShiftY }}
        >
          <svg viewBox="0 0 1600 900" className="h-full w-full">
            <g fill="none" stroke="rgba(198,161,91,0.28)" strokeWidth="1.2">
              {testimonialContourPaths.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[34vw] -translate-x-[11%] lg:block">
          <motion.div
            aria-hidden="true"
            className="relative h-full w-full"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.95, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 transition-transform duration-75 ease-out will-change-transform"
              style={reduceMotion ? undefined : { x: figureShiftSpring }}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,240,230,0.18),transparent_64%)] blur-3xl"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [0.96, 1.05, 0.96],
                        opacity: [0.42, 0.72, 0.42],
                      }
                }
                transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src={leftPortrait}
                alt=""
                aria-hidden="true"
                className="relative z-10 h-full w-full object-contain object-left-bottom drop-shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[43vw] translate-x-[16%] lg:block xl:w-[37vw]">
          <motion.div
            aria-hidden="true"
            className="relative h-full w-full"
            initial={{ opacity: 0, x: 36, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 transition-transform duration-75 ease-out will-change-transform"
              style={reduceMotion ? undefined : { x: rightFigureShift }}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_52%_54%,rgba(198,161,91,0.3),transparent_56%)] blur-3xl"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [0.92, 1.08, 0.92],
                        opacity: [0.45, 0.82, 0.45],
                      }
                }
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src={rightPortrait}
                alt=""
                aria-hidden="true"
                className="relative z-10 h-full w-full object-cover drop-shadow-[0_32px_95px_rgba(0,0,0,0.5)]"
                style={{ objectPosition: '78% 46%', transformOrigin: '78% 100%' }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-[9%] left-[3%] right-[4%] z-20 bg-[linear-gradient(90deg,rgba(17,17,17,0)_0%,rgba(245,240,230,0.08)_48%,rgba(17,17,17,0)_100%)] mix-blend-screen opacity-70"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: ['-12%', '12%', '-12%'],
                      }
                }
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(17,17,17,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,rgba(17,17,17,0),rgba(17,17,17,0.96))]" />

        <motion.div
          className="relative z-10"
          style={reduceMotion ? undefined : { y: testimonialTextY, opacity: testimonialTextOpacity }}
        >
          <div className="studio-shell">
            <div className="mx-auto max-w-4xl text-center">
              <SectionHeading
                eyebrow="Client notes"
                title="Refined words from the people who stepped into the frame."
                align="center"
              />
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-parchment/72 sm:text-base">
                The testimonials below reflect the kind of experience Samuel Studio is known for: calm direction, thoughtful
                imagery, and a final gallery that feels polished without losing presence.
              </p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <CTASection />

      <Lightbox
        item={activeItem}
        items={galleryItems}
        index={activeIndex ?? 0}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </>
  )
}
