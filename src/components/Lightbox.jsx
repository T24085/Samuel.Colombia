import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useBodyLock } from '../hooks/useBodyLock'

export function Lightbox({ item, items, index, onClose, onNext, onPrev }) {
  const closeButtonRef = useRef(null)
  useBodyLock(Boolean(item))

  useEffect(() => {
    if (!item) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [item, onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 px-4 py-6 backdrop-blur-xl"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-gold/20 bg-charcoal shadow-luxury"
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,161,91,0.15),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-ink/70 text-ivory transition hover:border-gold/60 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
              aria-label="Close image"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/20 bg-ink/70 text-ivory transition hover:border-gold/60 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-4 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/20 bg-ink/70 text-ivory transition hover:border-gold/60 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            <div className="grid gap-0 lg:grid-cols-[1.5fr_0.7fr]">
              <div className="relative flex min-h-[56vh] items-center justify-center bg-black">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="max-h-[82vh] w-full object-contain"
                />
              </div>
              <div className="relative flex flex-col justify-between border-t border-gold/10 p-6 lg:border-l lg:border-t-0 lg:p-8">
                <div className="space-y-6">
                  <div className="text-xs uppercase tracking-[0.38em] text-gold/75">
                    {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-display text-4xl text-ivory">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-parchment/72">{item.alt}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-gold/20 bg-ivory/5 px-3 py-2 text-[0.64rem] uppercase tracking-[0.26em] text-parchment/75"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-8 text-[0.72rem] uppercase tracking-[0.28em] text-parchment/45">
                  Use arrow keys to navigate
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
