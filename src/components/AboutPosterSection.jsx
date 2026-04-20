import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import motionDeckVideo01 from '../../Screen Recording 2026-04-20 005001.mp4'
import motionDeckVideo02 from '../../Recording 2026-04-20 092454.mp4'
import motionDeckVideo03 from '../../Recording 2026-04-20 092911.mp4'
import motionDeckVideo04 from '../../Recording 2026-04-20 093016.mp4'
import motionDeckVideo05 from '../../Recording 2026-04-20 093103.mp4'
import motionDeckVideo06 from '../../Recording 2026-04-20 093152.mp4'

const deckCards = [
  { x: '-17rem', y: '1.8rem', rotate: '-19deg', scale: 0.9, zIndex: 1, src: motionDeckVideo03 },
  { x: '-10.5rem', y: '-0.2rem', rotate: '-11deg', scale: 0.95, zIndex: 2, src: motionDeckVideo02 },
  { x: '-3.5rem', y: '-1.2rem', rotate: '-4deg', scale: 1, zIndex: 3, src: motionDeckVideo01 },
  { x: '3.5rem', y: '-1.2rem', rotate: '4deg', scale: 1, zIndex: 4, src: motionDeckVideo04 },
  { x: '10.5rem', y: '-0.2rem', rotate: '11deg', scale: 0.95, zIndex: 2, src: motionDeckVideo05 },
  { x: '17rem', y: '1.8rem', rotate: '19deg', scale: 0.9, zIndex: 1, src: motionDeckVideo06 },
]

function MotionDeckCard({ card, reduceMotion, index, hoveredIndex, setHoveredIndex }) {
  const videoRef = useRef(null)
  const centerIndex = (deckCards.length - 1) / 2
  const hoverShift = Math.round((index - centerIndex) * 6)
  const isHovered = hoveredIndex === index
  const isSibling = hoveredIndex !== null && hoveredIndex !== index
  const direction = hoveredIndex === null ? 0 : index < hoveredIndex ? -1 : 1
  const distance = hoveredIndex === null ? 0 : Math.abs(index - hoveredIndex)
  const siblingShift = isSibling ? `${direction * Math.min(2.4 + distance * 1.05, 7.2)}rem` : '0rem'
  const siblingLift = isSibling ? `${Math.min(0.3 + distance * 0.16, 0.9)}rem` : '0rem'
  const siblingRotate = isSibling ? `${direction * Math.min(2.25 + distance * 0.95, 7)}deg` : '0deg'

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const startPlayback = () => {
      video.play().catch(() => {})
    }

    if (video.readyState >= 1) {
      startPlayback()
      return undefined
    }

    video.addEventListener('loadedmetadata', startPlayback)
    return () => video.removeEventListener('loadedmetadata', startPlayback)
  }, [])

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -20, x: hoverShift, scale: 1.07 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.05 }}
      className="motion-deck-card"
      style={{ zIndex: isHovered ? 30 : card.zIndex }}
      onMouseEnter={() => setHoveredIndex(index)}
      onFocus={() => setHoveredIndex(index)}
    >
      <div
        className="motion-deck-card-shell overflow-hidden rounded-[2rem] bg-[#0e0e0e] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.26)]"
        style={{
          '--deck-x': card.x,
          '--deck-y': card.y,
          '--deck-rotate': card.rotate,
          '--deck-scale': card.scale,
          '--deck-hover-x': siblingShift,
          '--deck-hover-y': siblingLift,
          '--deck-hover-rotate': siblingRotate,
        }}
      >
        <div className="relative aspect-[3/5] overflow-hidden rounded-[1.55rem] bg-black">
          <video
            ref={videoRef}
            src={card.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '50% 45%' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_38%,rgba(0,0,0,0.36)_100%)]" />
        </div>
      </div>
    </motion.article>
  )
}

export function MotionDeckSection() {
  const reduceMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="home-snap-section relative isolate overflow-visible bg-[#f2eee6] text-[#111111]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(0,0,0,0.1),transparent_22%),radial-gradient(circle_at_50%_88%,rgba(0,0,0,0.05),transparent_24%),linear-gradient(180deg,#f4f0e8,#ebe5da)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,rgba(17,17,17,0.95)_1px,transparent_0)] [background-size:18px_18px]" />

      <div className="relative mx-auto w-full max-w-[1700px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-[0.7rem] font-semibold uppercase tracking-[0.48em] text-black/55"
          >
            Motion study
          </motion.p>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.06 }}
            className="deck-title-gold mt-4 text-[clamp(2.6rem,5.2vw,5.2rem)] leading-[0.92] tracking-[-0.06em]"
          >
            Samuel Studio Motion Deck
          </motion.h2>
        </div>

        <div className="relative mt-2">
          <div className="absolute left-[46%] top-[20%] h-[33rem] w-[min(108vw,1280px)] -translate-x-1/2 rounded-[4rem] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),transparent_68%)] blur-3xl" />

          <div className="motion-deck-rack">
            <div className="motion-deck-stage" onMouseLeave={() => setHoveredIndex(null)}>
              {deckCards.map((card, index) => (
                <MotionDeckCard
                  key={`${card.rotate}-${index}`}
                  card={card}
                  index={index}
                  reduceMotion={reduceMotion}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
