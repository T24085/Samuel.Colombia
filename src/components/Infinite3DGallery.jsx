import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const tileVariants = [
  { width: 'w-[92%] sm:w-[88%]', height: 'h-[11rem] sm:h-[13rem]', align: 'self-start', offset: 'mt-0' },
  { width: 'w-[78%] sm:w-[74%]', height: 'h-[14rem] sm:h-[17rem]', align: 'self-end', offset: 'mt-6' },
  { width: 'w-[100%]', height: 'h-[12rem] sm:h-[14rem]', align: 'self-center', offset: 'mt-2' },
  { width: 'w-[86%] sm:w-[82%]', height: 'h-[15rem] sm:h-[18rem]', align: 'self-start', offset: 'mt-8' },
  { width: 'w-[94%] sm:w-[90%]', height: 'h-[10rem] sm:h-[12rem]', align: 'self-end', offset: 'mt-3' },
  { width: 'w-[72%] sm:w-[70%]', height: 'h-[13rem] sm:h-[15rem]', align: 'self-center', offset: 'mt-7' },
]

const modeConfig = {
  Panorama: {
    lanes: 4,
    rotateX: 14,
    rotateY: -12,
    perspective: 1900,
    stageHeight: 'h-[24rem] sm:h-[27rem] lg:h-[31rem]',
    gap: 'gap-4',
    laneTilt: [-10, -4, 4, 10],
    depth: [0, 40, 80, 120],
    duration: 44,
  },
  Cinema: {
    lanes: 4,
    rotateX: 10,
    rotateY: -8,
    perspective: 1850,
    stageHeight: 'h-[25rem] sm:h-[28rem] lg:h-[32rem]',
    gap: 'gap-4',
    laneTilt: [-8, -2, 3, 8],
    depth: [10, 40, 70, 100],
    duration: 38,
  },
  Overhead: {
    lanes: 4,
    rotateX: 58,
    rotateY: 0,
    perspective: 1500,
    stageHeight: 'h-[21rem] sm:h-[24rem] lg:h-[27rem]',
    gap: 'gap-4',
    laneTilt: [-3, 0, 0, 3],
    depth: [0, 20, 40, 60],
    duration: 50,
  },
  Showcase: {
    lanes: 5,
    rotateX: 8,
    rotateY: -4,
    perspective: 2100,
    stageHeight: 'h-[24rem] sm:h-[27rem] lg:h-[31rem]',
    gap: 'gap-4',
    laneTilt: [-12, -5, 0, 5, 12],
    depth: [0, 24, 52, 24, 0],
    duration: 42,
  },
  Gallery: {
    lanes: 4,
    rotateX: 12,
    rotateY: -10,
    perspective: 1900,
    stageHeight: 'h-[24rem] sm:h-[27rem] lg:h-[31rem]',
    gap: 'gap-4',
    laneTilt: [-9, -3, 3, 9],
    depth: [0, 30, 60, 90],
    duration: 45,
  },
  Standard: {
    lanes: 6,
    rotateX: 6,
    rotateY: -4,
    perspective: 1800,
    stageHeight: 'h-[28rem] sm:h-[32rem] lg:h-[36rem]',
    gap: 'gap-3',
    laneTilt: [-7, -4, -1, 1, 4, 7],
    depth: [0, 16, 32, 48, 32, 16],
    duration: 36,
  },
}

function GalleryCard({ item, variant, onSelect }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onSelect(item.id)}
      className={`group relative shrink-0 overflow-hidden rounded-[1.2rem] bg-transparent text-left shadow-[0_18px_50px_rgba(0,0,0,0.28)] ${variant.width} ${variant.height} ${variant.align} ${variant.offset}`}
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),transparent_28%,rgba(0,0,0,0.76))]" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[0.6rem] uppercase tracking-[0.34em] text-ivory/60">Samuel Studio</p>
        <h3 className="mt-2 font-display text-[1.85rem] leading-none text-ivory transition group-hover:text-gold">
          {item.title}
        </h3>
        <p className="mt-2 text-[0.62rem] uppercase tracking-[0.3em] text-parchment/72">
          {item.categories.join(' / ')}
        </p>
      </div>
    </motion.button>
  )
}

function GalleryLane({ items, onSelect, config, laneIndex, reducedMotion }) {
  const laneItems = useMemo(() => {
    const base = items.filter((_, index) => index % config.lanes === laneIndex)
    return [...base, ...base]
  }, [config.lanes, items, laneIndex])

  const baseDuration = config.duration + laneIndex * 2
  const duration = reducedMotion ? 0 : baseDuration

  const tilt = config.laneTilt[laneIndex % config.laneTilt.length]
  const depth = config.depth[laneIndex % config.depth.length]

  return (
    <div
      className={`relative overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-1.5 sm:p-2.5 ${config.stageHeight}`}
      style={{
        perspective: `${config.perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${tilt}deg) translateZ(${depth}px)`,
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 will-change-transform sm:gap-3.5"
          style={{
            animationName: reducedMotion ? 'none' : 'gallery-loop-vertical',
            animationDuration: `${duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: laneIndex % 2 === 0 ? 'normal' : 'reverse',
          }}
        >
          {laneItems.map((item, index) => {
            const variant = tileVariants[(laneIndex + index) % tileVariants.length]

            return (
              <GalleryCard
                key={`${item.id}-${laneIndex}-${index}`}
                item={item}
                variant={variant}
                onSelect={onSelect}
              />
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}

export function Infinite3DGallery({ items, mode, onSelect }) {
  const reducedMotion = useReducedMotion()

  const config = modeConfig[mode] ?? modeConfig.Gallery
  const stageRotateX = config.rotateX
  const stageRotateY = config.rotateY

  return (
    <div className="relative mx-auto w-full max-w-[2200px] px-1 sm:px-2 lg:px-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#060606] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#060606] to-transparent sm:w-32" />

      <div className="overflow-visible">
        <div
          className={`grid ${config.gap} md:gap-4`}
          style={{
            gridTemplateColumns: `repeat(${config.lanes}, minmax(0, 1fr))`,
            perspective: `${config.perspective}px`,
            transformStyle: 'preserve-3d',
            minWidth: '0',
          }}
        >
          {Array.from({ length: config.lanes }).map((_, laneIndex) => (
            <motion.div
              key={laneIndex}
              className="relative"
              style={{
                transform: `rotateX(${stageRotateX}deg) rotateY(${stageRotateY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <GalleryLane
                items={items}
                onSelect={onSelect}
                config={config}
                laneIndex={laneIndex}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
