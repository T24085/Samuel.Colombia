import { motion } from 'framer-motion'

export function TestimonialCard({ quote, name, role }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="gold-frame relative p-7"
    >
      <p className="font-display text-2xl leading-9 text-ivory">“{quote}”</p>
      <div className="mt-6 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full border border-gold/30 bg-gold/10" />
        <div>
          <h3 className="text-sm uppercase tracking-[0.24em] text-gold">{name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.28em] text-parchment/50">{role}</p>
        </div>
      </div>
    </motion.article>
  )
}
