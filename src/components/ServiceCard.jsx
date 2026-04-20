import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ServiceCard({ title, price, description, included }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="gold-frame flex h-full flex-col p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-3xl font-medium text-ivory">{title}</h3>
        <div className="rounded-full border border-gold/25 px-4 py-2 text-right text-[0.68rem] uppercase tracking-[0.28em] text-gold/80">
          {price}
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-parchment/72">{description}</p>
      <ul className="mt-6 space-y-3">
        {included.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-parchment/74">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <Link
          to="/booking"
          className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-xs uppercase tracking-[0.28em] text-gold transition hover:border-gold/70 hover:bg-gold/15 hover:text-ivory"
        >
          Inquire
        </Link>
      </div>
    </motion.article>
  )
}
