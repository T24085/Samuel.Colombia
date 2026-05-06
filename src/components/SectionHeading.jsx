import { motion } from 'framer-motion'
import { BrushDivider } from './DecorativeElements'

export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'dark' }) {
  const center = align === 'center'
  const titleClass = tone === 'light' ? 'text-ink' : 'text-ivory'
  const descClass = tone === 'light' ? 'text-ink/76' : 'text-parchment/72'

  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div
        className={[
          'flex text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold/80',
          center ? 'justify-center' : '',
        ].join(' ')}
      >
        {eyebrow}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`mt-4 font-display text-4xl font-semibold tracking-[0.01em] md:text-5xl ${titleClass}`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className={`mt-5 origin-left ${center ? 'mx-auto' : ''} w-36`}
      >
        <BrushDivider />
      </motion.div>
      {description ? (
        <p className={`mt-5 text-base leading-8 ${descClass} ${center ? 'mx-auto max-w-2xl' : ''}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
