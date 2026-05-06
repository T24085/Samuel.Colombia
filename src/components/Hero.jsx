import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Camera } from 'lucide-react'
import { galleryItems } from '../data/gallery'
import { FlowFieldBackdrop } from './FlowFieldBackdrop'
import { FanArcBackdrop, GoldFrame, InkWashBackground } from './DecorativeElements'

export function Hero() {
  const heroImage = galleryItems.find((item) => item.id === 'women-6') ?? galleryItems[0]

  return (
    <section className="home-snap-section relative min-h-[100svh] overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="hero-drift hero-drift-slow h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,51,45,0.86)_0%,rgba(17,17,17,0.62)_42%,rgba(17,17,17,0.84)_100%)]" />
        <InkWashBackground />
        <FlowFieldBackdrop />
      </div>
      <FanArcBackdrop className="left-0 top-0 opacity-65" />
      <div className="studio-shell relative z-10 flex min-h-[100svh] items-end pt-28 pb-14 md:pb-18">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.65fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-7"
          >
            <div className="space-y-5">
              <h1 className="page-intro font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ivory md:text-7xl lg:text-[5.8rem]">
                Portraits shaped by light, restraint, and presence.
              </h1>
              <p className="page-intro max-w-2xl text-base leading-8 text-parchment/78 md:text-lg" style={{ '--enter-delay': '120ms' }}>
                Samuel Studio creates cinematic imagery designed around identity, presence, and perception.
                {' '}
                We work with individuals and brands to shape how they are seen, through refined, intentional visual storytelling.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/portfolio"
                className="page-intro inline-flex items-center gap-2 rounded-full border border-[#c6a15b] bg-transparent px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#c6a15b] shadow-[inset_0_0_0_1px_rgba(198,161,91,0.28)] transition hover:border-[#f7e8c8] hover:bg-[rgba(198,161,91,0.08)] hover:text-[#f7e8c8]"
                style={{ '--enter-delay': '180ms' }}
              >
                View Portfolio <ArrowRight size={15} />
              </Link>
              <Link
                to="/booking"
                className="page-intro inline-flex items-center gap-2 rounded-full border border-[#c6a15b] bg-transparent px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#c6a15b] shadow-[inset_0_0_0_1px_rgba(198,161,91,0.28)] transition hover:border-[#f7e8c8] hover:bg-[rgba(198,161,91,0.08)] hover:text-[#f7e8c8]"
                style={{ '--enter-delay': '240ms' }}
              >
                Book a Session
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <GoldFrame className="p-4 shadow-[0_18px_90px_rgba(0,0,0,0.44)]">
              <div className="relative overflow-hidden rounded-[1.35rem]">
                <img src={heroImage.src} alt={heroImage.alt} className="hero-drift hero-drift-fast h-[34rem] w-full object-cover object-center md:h-[41rem]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.64rem] uppercase tracking-[0.32em] text-gold/75">Featured work</p>
                    <p className="mt-2 font-display text-3xl text-ivory">Cinematic studio portrait</p>
                  </div>
                  <div className="rounded-full border border-gold/25 bg-ink/65 p-3 text-gold/80">
                    <Camera size={18} />
                  </div>
                </div>
              </div>
            </GoldFrame>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
