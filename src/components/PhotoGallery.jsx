import { motion } from 'framer-motion'
import { withBase } from '../utils/paths'

export function PhotoGallery({
  items,
  onSelect,
  className = '',
  showTags = true,
  compact = false,
  interactive = true,
}) {
  const Card = interactive ? motion.button : motion.div

  return (
    <div className={className}>
      <div className={compact ? 'columns-1 gap-5 sm:columns-2' : 'columns-1 gap-5 md:columns-2 xl:columns-3'}>
        {items.map((item, index) => (
          <Card
            key={item.id}
            {...(interactive
              ? {
                  type: 'button',
                  whileHover: { y: -6 },
                  whileTap: { scale: 0.99 },
                  onClick: () => onSelect(index),
                }
              : {})}
            className="portfolio-frame media-card reveal group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.6rem] border border-gold/40 bg-white/5 text-left shadow-luxury focus:outline-none focus:ring-2 focus:ring-gold/60"
            style={{ '--reveal-delay': `${index * 80}ms` }}
            aria-label={interactive ? `Open ${item.title}` : undefined}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = withBase('photos/self-port.jpg')
                }}
                className="media-card-image h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-70 transition duration-500 group-hover:opacity-45" />
              <div className="editorial-flash" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-2xl font-medium text-ivory transition group-hover:text-gold">
                    {item.title}
                  </h3>
                  {showTags ? (
                    <p className="media-card-caption mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-parchment/66">
                      {item.categories.join(' / ')}
                    </p>
                  ) : null}
                </div>
                <span className="media-card-caption rounded-full border border-gold/30 bg-ink/55 px-3 py-2 text-[0.62rem] uppercase tracking-[0.32em] text-gold/85">
                  View
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
