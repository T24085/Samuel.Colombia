import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function FeatureCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="group relative min-w-[17rem] flex-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#141414] shadow-luxury"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%,transparent_72%,rgba(0,0,0,0.6))]" />
      <img
        src={item.src}
        alt={item.alt}
        className="h-[30rem] w-full object-cover object-center transition duration-700 group-hover:scale-[1.04] sm:h-[34rem] lg:h-[39rem]"
      />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-ink/50 to-transparent opacity-75" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-ivory/72">
              0{index + 1}.
            </p>
            <h3 className="mt-3 font-display text-3xl text-ivory transition group-hover:text-gold sm:text-[2.2rem]">
              {item.title}
            </h3>
            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-parchment/64">
              {item.categories.join(' / ')}
            </p>
          </div>
          <span className="rounded-full border border-white/35 bg-ink/30 px-3 py-2 text-[0.62rem] uppercase tracking-[0.3em] text-ivory/84">
            View
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function FeatureStrip({ items }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#2a2a2a] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:p-5">
      <div className="rounded-[1.5rem] border border-white/10 bg-[#101010]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-[0.68rem] uppercase tracking-[0.34em] text-ivory/62 sm:px-6">
          <span>Samuel Studio</span>
          <span>Featured sequence</span>
          <span>Editorial / Portrait / Fashion</span>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-[0.62rem] uppercase tracking-[0.3em] text-ivory/55 sm:px-6">
          <span>Curated work from the studio archive</span>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gold/85 transition hover:text-gold">
            Explore portfolio <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}
