import { useEffect, useState } from 'react'
import { SEO } from '../components/SEO'
import { Lightbox } from '../components/Lightbox'
import { galleryItems } from '../data/gallery'

const tileRatios = [0.82, 1.08, 0.92, 1.22, 0.88, 1.16, 0.96, 1.28]

export function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    document.body.classList.add('portfolio-page')

    return () => {
      document.body.classList.remove('portfolio-page')
    }
  }, [])

  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null
  const close = () => setActiveIndex(null)
  const next = () => {
    if (!galleryItems.length) return
    setActiveIndex((current) => ((current ?? 0) + 1) % galleryItems.length)
  }
  const prev = () => {
    if (!galleryItems.length) return
    setActiveIndex((current) => ((current ?? 0) - 1 + galleryItems.length) % galleryItems.length)
  }

  return (
    <>
      <SEO
        title="Portfolio"
        description="A full-screen wall of Samuel Studio photography."
        path="/portfolio"
      />

      <section className="min-h-[100svh] bg-black pt-20 text-ivory sm:pt-24 lg:pt-28">
        <div className="columns-2 gap-0 px-0 pb-0 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-7">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="mb-2 block w-full break-inside-avoid overflow-hidden rounded-[1.05rem] border border-[#d8b56a] bg-white/5 text-left shadow-[0_0_0_1px_rgba(245,240,230,0.06),0_0_0_4px_rgba(198,161,91,0.12),0_18px_60px_rgba(198,161,91,0.18)] ring-1 ring-[#f1d8a3]/10 sm:mb-3"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="block h-full w-full select-none object-cover transition duration-700 hover:scale-[1.03]"
                style={{
                  aspectRatio: tileRatios[index % tileRatios.length],
                }}
                onError={(event) => {
                  event.currentTarget.src = '/photos/self-port.jpg'
                }}
              />
            </button>
          ))}
        </div>
      </section>

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
