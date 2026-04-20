import { useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from 'framer-motion'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function GalleryCard({ item, index, onSelect }) {
  const widthClasses = ['w-[14rem] sm:w-[15.5rem]', 'w-[16rem] sm:w-[18rem]', 'w-[14.5rem] sm:w-[16.5rem]', 'w-[17rem] sm:w-[19rem]']
  const heightClasses = ['h-[18rem] sm:h-[20rem]', 'h-[22rem] sm:h-[24rem]', 'h-[19rem] sm:h-[21rem]', 'h-[24rem] sm:h-[26rem]']
  const widthClass = widthClasses[index % widthClasses.length]
  const heightClass = heightClasses[index % heightClasses.length]

  return (
    <motion.button
      type="button"
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onSelect(item.id)}
      className={`group relative shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.3)] ${widthClass} ${heightClass}`}
      aria-label={`Open ${item.title}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        onError={(event) => {
          event.currentTarget.src = '/photos/self-port.jpg'
        }}
        className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),transparent_25%,rgba(0,0,0,0.78))] opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[0.62rem] uppercase tracking-[0.34em] text-ivory/60">
          0{(index % 9) + 1}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-none text-ivory transition group-hover:text-gold">
          {item.title}
        </h3>
        <p className="mt-2 text-[0.64rem] uppercase tracking-[0.28em] text-parchment/70">
          {item.categories.join(' / ')}
        </p>
      </div>
    </motion.button>
  )
}

function VelocityRow({ items, reverse = false, onSelect, duration, paused = false }) {
  const looped = [...items, ...items]

  return (
    <div className="group relative overflow-hidden py-4">
      <motion.div
        className="flex w-max items-center gap-5 will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animationName: paused ? 'none' : 'gallery-marquee',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {looped.map((item, index) => (
          <GalleryCard key={`${item.id}-${index}`} item={item} index={index} onSelect={onSelect} />
        ))}
      </motion.div>
    </div>
  )
}

export function VelocityGallery({ items, onSelect }) {
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 250 })
  const [intensity, setIntensity] = useState(0)

  useMotionValueEvent(smoothVelocity, 'change', (latest) => {
    setIntensity(clamp(Math.abs(latest) / 140, 0, 8))
  })

  const topDuration = prefersReducedMotion ? 0 : clamp(24 - intensity * 1.3, 10, 24)
  const bottomDuration = prefersReducedMotion ? 0 : clamp(26 - intensity * 1.15, 11, 26)
  const topItems = items.filter((_, index) => index % 2 === 0)
  const bottomItems = items.filter((_, index) => index % 2 === 1)

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#020202] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#020202] to-transparent sm:w-32" />

      <div className="space-y-2 px-4 sm:px-6 md:px-10">
        <VelocityRow items={topItems} onSelect={onSelect} duration={topDuration} paused={prefersReducedMotion} />
        <VelocityRow items={bottomItems} onSelect={onSelect} duration={bottomDuration} reverse paused={prefersReducedMotion} />
      </div>
    </div>
  )
}
