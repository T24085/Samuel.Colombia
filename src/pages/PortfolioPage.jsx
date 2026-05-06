import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useSearchParams } from 'react-router-dom'
import { PortfolioBackdrop } from '../components/PortfolioBackdrop'
import { PortfolioHero } from '../components/PortfolioHero'
import { SEO } from '../components/SEO'
import { portfolioCollections } from '../data/portfolio'

const tileRatios = [0.82, 1.05, 0.92, 1.18]

function ImageTile({ item, index }) {
  return (
    <div
      className="media-card group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
      style={{ aspectRatio: tileRatios[index % tileRatios.length] }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="media-card-image h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.42))] opacity-70 transition duration-500 group-hover:opacity-50" />
      <div className="editorial-flash" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 px-3 py-3">
        <p className="media-card-caption text-[0.58rem] uppercase tracking-[0.28em] text-ivory/74">{item.title}</p>
      </div>
    </div>
  )
}

function FullscreenMagazinePanel({ collection, onClose, reduceMotion }) {
  const preview = collection.previewItems.slice(0, 8)

  const panel = (
    <motion.div
      className="modal-backdrop fixed inset-0 z-[120] bg-black backdrop-blur-[3px]"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClose}
    >
      <motion.section
        className="modal-panel relative h-full w-full overflow-y-auto bg-[linear-gradient(180deg,rgba(15,14,12,0.98),rgba(5,5,5,0.98))] lg:overflow-hidden"
        initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 18 }}
        transition={{ type: 'spring', stiffness: 150, damping: 22 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="fixed right-4 top-4 z-[130] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-ivory/86 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-gold/40 hover:text-ivory sm:right-6 sm:top-6 lg:right-8 lg:top-8"
        >
          <X className="h-4 w-4" />
          Back to selection
        </button>

        <div className="grid min-h-full gap-0 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            className="relative min-h-[40svh] overflow-hidden border-b border-white/10 bg-[#080706] lg:min-h-0 lg:h-full lg:border-b-0 lg:border-r"
          >
            <img
              src={collection.coverSrc}
              alt={collection.coverAlt}
              className="absolute inset-0 h-full w-full object-contain object-center"
              loading="eager"
              decoding="async"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.1)_65%,rgba(0,0,0,0.18))] opacity-90"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 18% 18%, rgba(198,161,91,0.12), transparent 28%), radial-gradient(circle at 78% 20%, rgba(255,255,255,0.1), transparent 18%)',
              }}
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-center gap-3 text-[0.64rem] uppercase tracking-[0.34em] text-ivory/86">
                <span>{collection.eyebrow}</span>
                <span className="text-white/20">/</span>
                <span>{String(portfolioCollections.findIndex((entry) => entry.slug === collection.slug) + 1).padStart(2, '0')}</span>
              </div>
              <span className="rounded-full border border-white/12 bg-black/20 px-3 py-2 text-[0.58rem] uppercase tracking-[0.26em] text-parchment/76">
                Cover
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="max-w-xl">
                <p className="text-[0.62rem] uppercase tracking-[0.34em] text-parchment/72">
                  Magazine cover / {collection.title}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-7 text-parchment/82">
                  A cover-led visual entry point for the section. The right side carries the service details and
                  collection previews.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="px-6 py-7 sm:px-8 sm:py-8 lg:flex lg:h-full lg:flex-col lg:px-8 lg:py-8">
            <div className="relative flex h-full flex-col min-h-0">
              <div className="flex flex-wrap items-center gap-3 text-[0.64rem] uppercase tracking-[0.34em] text-gold/72">
                <span>{collection.eyebrow}</span>
                <span className="text-white/20">/</span>
                <span>{String(portfolioCollections.findIndex((entry) => entry.slug === collection.slug) + 1).padStart(2, '0')}</span>
              </div>

              <h2 className="mt-5 max-w-xl font-display text-[clamp(2.4rem,3vw,3.8rem)] leading-[0.9] tracking-[-0.055em] text-ivory">
                {collection.title}
              </h2>
              <p className="mt-4 max-w-xl text-[1rem] leading-7 text-parchment/74">{collection.description}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-parchment/66">{collection.body}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={collection.collectionLink}
                  className="group inline-flex items-center justify-between gap-3 rounded-full border border-gold/35 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-5 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-ivory transition duration-300 hover:border-gold/70 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))]"
                >
                  <span>View full collection</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                {collection.external ? (
                  <a
                    href={collection.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-parchment/82 transition duration-300 hover:border-gold/35 hover:bg-white/[0.05] hover:text-ivory"
                  >
                    <span>{collection.linkLabel}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {collection.albumSlugs.map((slug) => (
                  <span
                    key={slug}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.6rem] uppercase tracking-[0.28em] text-parchment/72"
                  >
                    {slug}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid flex-1 min-h-0 grid-cols-2 gap-3 sm:grid-cols-4">
                {preview.map((item, previewIndex) => (
                  <ImageTile key={item.id} item={item} index={previewIndex} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )

  return createPortal(panel, document.body)
}

export function PortfolioPage() {
  const reduceMotion = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeSlug = searchParams.get('magazine')
  const selectedCollection = activeSlug
    ? portfolioCollections.find((collection) => collection.slug === activeSlug) ?? null
    : null

  const openCollection = (slug) => {
    if (!slug) {
      setSearchParams({}, { replace: false })
      return
    }

    setSearchParams({ magazine: slug }, { replace: false })
  }

  const closeCollection = () => {
    setSearchParams({}, { replace: false })
  }

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = selectedCollection ? 'hidden' : ''

    return () => {
      document.body.style.overflow = previous
    }
  }, [selectedCollection])

  return (
    <>
      <SEO
        title="Portfolio"
        description="Samuel Studio as the parent house for Defiant Models, Defiant Boudoir, Samuel Studio, AllStreet Apparel, and Samuel Studio Colombia."
        path="/portfolio"
      />

      <main className="relative isolate overflow-hidden bg-[#050505] text-ivory">
        <PortfolioBackdrop />

        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0b09_0%,#090807_42%,#050505_100%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[-12%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.18),transparent_65%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 18, 0],
                    y: [0, 12, 0],
                    opacity: [0.42, 0.68, 0.42],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-[-14%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_68%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, -16, 0],
                    y: [0, -10, 0],
                    opacity: [0.26, 0.46, 0.26],
                  }
            }
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.92)_1px,transparent_0)] [background-size:18px_18px]" />
        </div>

        <div className="relative z-10">
          <LayoutGroup id="portfolio-magazines">
            <PortfolioHero activeSlug={activeSlug} onMagazineSelect={openCollection} />

            <AnimatePresence mode="wait">
              {selectedCollection ? (
                <FullscreenMagazinePanel
                  key={selectedCollection.slug}
                  collection={selectedCollection}
                  onClose={closeCollection}
                  reduceMotion={reduceMotion}
                />
              ) : null}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </main>
    </>
  )
}
