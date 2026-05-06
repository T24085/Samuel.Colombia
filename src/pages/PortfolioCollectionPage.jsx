import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PortfolioBackdrop } from '../components/PortfolioBackdrop'
import { Lightbox } from '../components/Lightbox'
import { SEO } from '../components/SEO'
import { portfolioAlbums, portfolioCollectionsBySlug } from '../data/portfolio'

const tileRatios = [0.84, 1.08, 0.92, 1.18, 0.96, 1.12]

function CollectionTile({ item, index, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="media-card group relative overflow-hidden rounded-[1.3rem] border border-white/10 bg-white/[0.03] text-left shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
      style={{ aspectRatio: tileRatios[index % tileRatios.length] }}
      aria-label={`Open ${item.title}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="media-card-image h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.42))] opacity-70 transition duration-500 group-hover:opacity-45" />
      <div className="editorial-flash" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 px-3 py-3">
        <p className="media-card-caption text-[0.58rem] uppercase tracking-[0.28em] text-ivory/74">{item.title}</p>
      </div>
    </button>
  )
}

export function PortfolioCollectionPage() {
  const { slug } = useParams()
  const reduceMotion = useReducedMotion()
  const collection = portfolioCollectionsBySlug.get(slug)
  const [activeIndex, setActiveIndex] = useState(null)

  if (!collection) {
    return <Navigate to="/portfolio" replace />
  }

  const activeItem = activeIndex !== null ? collection.previewItems[activeIndex] : null
  const next = () => {
    if (!collection.previewItems.length) return
    setActiveIndex((current) => ((current ?? 0) + 1) % collection.previewItems.length)
  }
  const prev = () => {
    if (!collection.previewItems.length) return
    setActiveIndex((current) => ((current ?? 0) - 1 + collection.previewItems.length) % collection.previewItems.length)
  }

  return (
    <>
      <SEO
        title={collection.title}
        description={collection.description}
        path={collection.collectionLink}
      />

      <main className="relative isolate overflow-hidden bg-[#050505] text-ivory">
        <PortfolioBackdrop />

        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0b09_0%,#090807_42%,#050505_100%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[-12%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.2),transparent_65%)] blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 16, 0],
                    y: [0, 12, 0],
                    opacity: [0.4, 0.68, 0.4],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.92)_1px,transparent_0)] [background-size:18px_18px]" />
        </div>

        <div className="relative z-10">
          <section className="studio-shell pb-16 pt-24 sm:pt-28 lg:pb-20 lg:pt-32">
            <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
              <div className="max-w-5xl">
                <p className="reveal text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold/72" style={{ '--reveal-delay': '40ms' }}>{collection.eyebrow}</p>
                <h1 className="reveal mt-6 max-w-5xl font-display text-[3rem] leading-[0.88] tracking-[-0.055em] text-ivory sm:text-6xl md:text-[4.6rem] lg:text-[5.8rem] xl:text-[6.4rem]" style={{ '--reveal-delay': '120ms' }}>
                  {collection.title}
                </h1>
                <p className="reveal mt-8 max-w-2xl text-base leading-8 text-parchment/74 md:text-lg" style={{ '--reveal-delay': '200ms' }}>
                  {collection.body}
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  {collection.albumSlugs.map((albumSlug, index) => {
                    const album = portfolioAlbums.find((entry) => entry.slug === albumSlug)

                    return (
                      <Link
                        key={albumSlug}
                        to={`/portfolio/albums/${albumSlug}`}
                        className="reveal rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.64rem] uppercase tracking-[0.3em] text-parchment/76 transition hover:border-gold/35 hover:text-ivory"
                        style={{ '--reveal-delay': `${240 + index * 60}ms` }}
                      >
                        {album?.title ?? albumSlug}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[2.2rem] border border-gold/16 bg-[linear-gradient(180deg,rgba(14,12,10,0.98),rgba(5,5,5,0.98))] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-[22px] sm:p-8 lg:p-9">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-90"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 18% 18%, rgba(198,161,91,0.16), transparent 24%), radial-gradient(circle at 84% 14%, rgba(255,255,255,0.06), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.14))',
                  }}
                />
                <div className="relative">
                  <p className="reveal text-[0.67rem] uppercase tracking-[0.38em] text-gold/72" style={{ '--reveal-delay': '80ms' }}>Collection view</p>
                  <p className="reveal mt-5 max-w-sm font-display text-3xl leading-[0.92] tracking-[-0.04em] text-ivory" style={{ '--reveal-delay': '140ms' }}>
                    {collection.description}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Images</p>
                      <p className="mt-2 text-sm leading-7 text-parchment/72">{collection.previewItems.length}</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                      <p className="text-[0.62rem] uppercase tracking-[0.32em] text-gold/60">Album houses</p>
                      <p className="mt-2 text-sm leading-7 text-parchment/72">{collection.albumSlugs.length}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/portfolio"
                      className="group inline-flex items-center justify-between gap-3 rounded-full border border-gold/35 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-5 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-ivory transition duration-300 hover:border-gold/70 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))]"
                    >
                      <span>Back to portfolio</span>
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
                        <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className="studio-shell pb-16 lg:pb-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/72" style={{ '--reveal-delay': '40ms' }}>Top images</p>
                <h2 className="reveal mt-4 font-display text-4xl leading-[0.92] tracking-[-0.05em] text-ivory md:text-5xl xl:text-[5rem]" style={{ '--reveal-delay': '120ms' }}>
                  A tighter look at the collection.
                </h2>
              </div>
              <p className="reveal max-w-xl text-sm leading-8 text-parchment/72 md:text-base" style={{ '--reveal-delay': '180ms' }}>
                These are the top selections for the section, ready to become the full collection grid as the archive
                expands.
              </p>
            </div>
          </section>

          <section className="studio-shell pb-18 lg:pb-24">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {collection.previewItems.map((item, index) => (
                <CollectionTile
                  key={item.id}
                  item={item}
                  index={index}
                  onOpen={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </section>

          <section className="studio-shell pb-24 lg:pb-28">
            <div className="grid gap-8 rounded-[2.5rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(17,17,17,0.92))] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-12">
              <div>
                <p className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70" style={{ '--reveal-delay': '40ms' }}>Related album houses</p>
                <h2 className="reveal mt-4 max-w-3xl font-display text-4xl leading-[0.92] tracking-[-0.04em] text-ivory md:text-5xl xl:text-[4.5rem]" style={{ '--reveal-delay': '120ms' }}>
                  {collection.title} connects into the deeper archive.
                </h2>
                <p className="reveal mt-6 max-w-2xl text-sm leading-8 text-parchment/72 md:text-base" style={{ '--reveal-delay': '200ms' }}>
                  The album pages are where the larger image bodies will sit once the studio finishes curating the
                  final collection sets.
                </p>
              </div>

              <div className="flex flex-col justify-end gap-4">
                {collection.albumSlugs.map((albumSlug) => {
                  const album = portfolioAlbums.find((entry) => entry.slug === albumSlug)

                  return (
                    <Link
                      key={albumSlug}
                      to={`/portfolio/albums/${albumSlug}`}
                      className="reveal group inline-flex items-center justify-between gap-4 rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.3em] text-parchment/82 transition duration-300 hover:border-gold/35 hover:bg-white/[0.05] hover:text-ivory"
                      style={{ '--reveal-delay': `${240 + index * 60}ms` }}
                    >
                      <span>{album?.title ?? albumSlug}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Lightbox
        item={activeItem}
        items={collection.previewItems}
        index={activeIndex ?? 0}
        onClose={() => setActiveIndex(null)}
        onNext={next}
        onPrev={prev}
      />
    </>
  )
}
