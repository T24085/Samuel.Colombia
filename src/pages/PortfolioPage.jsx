import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Camera, Layers3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PortfolioBackdrop } from '../components/PortfolioBackdrop'
import { SEO } from '../components/SEO'
import { portfolioAlbums, portfolioCollections } from '../data/portfolio'

const tileRatios = [0.82, 1.05, 0.92, 1.18]

function ImageTile({ item, index }) {
  return (
    <div
      className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
      style={{ aspectRatio: tileRatios[index % tileRatios.length] }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.42))] opacity-70 transition duration-500 group-hover:opacity-50" />
      <div className="absolute inset-x-0 bottom-0 px-3 py-3">
        <p className="text-[0.58rem] uppercase tracking-[0.28em] text-ivory/74">{item.title}</p>
      </div>
    </div>
  )
}

function CollectionSection({ collection, index, reduceMotion }) {
  const preview = collection.previewItems.slice(0, 8)

  return (
    <motion.section
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, ease: 'easeOut', delay: index * 0.06 }}
      className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.28))] shadow-[0_30px_100px_rgba(0,0,0,0.32)] lg:h-[calc(100svh-7rem)]"
    >
      <div className="grid gap-0 lg:h-full lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative min-h-[24rem] overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(245,240,230,0.98),rgba(223,219,212,0.98))] lg:min-h-0 lg:h-full lg:border-b-0 lg:border-r">
          <img
            src={collection.coverSrc}
            alt={collection.coverAlt}
            className="absolute inset-0 h-full w-full origin-center object-cover object-center"
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
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <span className="rounded-full border border-white/12 bg-black/20 px-3 py-2 text-[0.58rem] uppercase tracking-[0.26em] text-parchment/76">
              Cover
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="max-w-xl">
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-parchment/72">Magazine cover / {collection.title}</p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-parchment/82">
                A cover-led visual entry point for the section. The right side carries the service details and
                collection previews.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-7 sm:px-8 sm:py-8 lg:flex lg:h-full lg:flex-col lg:px-8 lg:py-8">
          <div className="relative flex h-full flex-col min-h-0">
            <div className="flex flex-wrap items-center gap-3 text-[0.64rem] uppercase tracking-[0.34em] text-gold/72">
              <span>{collection.eyebrow}</span>
              <span className="text-white/20">/</span>
              <span>{String(index + 1).padStart(2, '0')}</span>
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
              {collection.albumSlugs.map((slug) => {
                const album = portfolioAlbums.find((entry) => entry.slug === slug)

                return (
                  <Link
                    key={slug}
                    to={`/portfolio/albums/${slug}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.6rem] uppercase tracking-[0.28em] text-parchment/72 transition hover:border-gold/30 hover:text-ivory"
                  >
                    {album?.title ?? slug}
                  </Link>
                )
              })}
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
  )
}

function AlbumHouseCard({ album, index, reduceMotion }) {
  const preview = album.previewItems.slice(0, 3)

  return (
    <motion.article
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.24))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.24)] sm:p-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 18%, rgba(198,161,91,0.16), transparent 24%), radial-gradient(circle at 84% 18%, rgba(255,255,255,0.06), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.14))',
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-gold/72">{album.eyebrow}</p>
            <h3 className="mt-3 font-display text-[2rem] leading-[0.94] tracking-[-0.05em] text-ivory">
              {album.title}
            </h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.58rem] uppercase tracking-[0.26em] text-parchment/68">
            {String(album.previewItems.length).padStart(2, '0')} images
          </span>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-7 text-parchment/72">{album.description}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {preview.map((item, previewIndex) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[1rem] border border-white/10 bg-black/20"
              style={{ aspectRatio: tileRatios[(index + previewIndex) % tileRatios.length] }}
            >
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {album.sourceCollections.map((slug) => {
            const collection = portfolioCollections.find((entry) => entry.slug === slug)

            return (
              <span
                key={slug}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.58rem] uppercase tracking-[0.28em] text-parchment/68"
              >
                {collection?.title ?? slug}
              </span>
            )
          })}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Link
            to={`/portfolio/albums/${album.slug}`}
            className="group inline-flex items-center justify-between gap-3 rounded-full border border-gold/35 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-5 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-ivory transition duration-300 hover:border-gold/70 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))]"
          >
            <span>Open album house</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export function PortfolioPage() {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <SEO
        title="Portfolio"
        description="Samuel Studio as the parent house for Defiant Models, Defiant Boudoir, AllStreet Apparel, and Samuel Studio Colombia."
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
          <section className="studio-shell space-y-6 pb-18 lg:space-y-8 lg:pb-24">
            {portfolioCollections.map((collection, index) => (
              <CollectionSection
                key={collection.slug}
                collection={collection}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </section>

          <section className="studio-shell pb-24 lg:pb-28">
            <div className="grid gap-5 lg:grid-cols-2">
              {portfolioAlbums.map((album, index) => (
                <AlbumHouseCard key={album.slug} album={album} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </section>

          <section className="studio-shell pb-24 lg:pb-28">
            <div className="grid gap-8 rounded-[2.5rem] border border-gold/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(17,17,17,0.92))] p-7 shadow-[0_28px_100px_rgba(0,0,0,0.34)] sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-12">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-gold/70">Next move</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[0.92] tracking-[-0.04em] text-ivory md:text-5xl xl:text-[4.5rem]">
                  Choose a brand, then drill into the album house that fits the brief.
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-parchment/72 md:text-base">
                  The portfolio is now organized like a studio system: the parent house on top, brand worlds in the
                  middle, and the archive below.
                </p>
              </div>

              <div className="flex flex-col justify-end gap-4">
                <Link
                  to="/booking"
                  className="group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-full border border-gold/40 bg-[linear-gradient(180deg,rgba(198,161,91,0.24),rgba(198,161,91,0.1))] px-6 py-4 text-xs uppercase tracking-[0.3em] text-ivory shadow-[0_16px_42px_rgba(0,0,0,0.28)] transition duration-300 hover:border-gold/70 hover:bg-[linear-gradient(180deg,rgba(198,161,91,0.34),rgba(198,161,91,0.12))] hover:shadow-[0_20px_55px_rgba(0,0,0,0.38)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1/2 -translate-x-[130%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] transition-transform duration-700 group-hover:translate-x-[260%]"
                  />
                  <span className="relative">Start a project</span>
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between gap-4 rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-xs uppercase tracking-[0.3em] text-parchment/82 transition duration-300 hover:border-gold/35 hover:bg-white/[0.05] hover:text-ivory"
                >
                  <span>Ask about archive access</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <div className="mt-2 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold/65">
                  <Sparkles className="h-4 w-4" />
                  <span>Images can later be swapped for the final approved collection sets</span>
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold/65">
                  <Camera className="h-4 w-4" />
                  <span>Album pages are ready for the full archive buildout</span>
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-gold/65">
                  <Layers3 className="h-4 w-4" />
                  <span>Brand sections can point to external studio sites or internal pages</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
