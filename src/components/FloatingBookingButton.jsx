import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export function FloatingBookingButton() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const isBookingPage = location.pathname.startsWith('/booking')
  const bookingTarget = isBookingPage ? '#booking-form' : '/booking#booking-form'

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="floating-booking-button fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
    >
      <Link
        to={bookingTarget}
        aria-label="Book now"
        className="floating-booking-link premium-button group relative isolate inline-flex items-center gap-3 rounded-full border border-gold/40 bg-[linear-gradient(180deg,rgba(245,240,230,0.14),rgba(198,161,91,0.18)),linear-gradient(135deg,rgba(17,17,17,0.92),rgba(10,51,45,0.88))] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ivory shadow-[0_18px_50px_rgba(0,0,0,0.34),0_0_0_1px_rgba(198,161,91,0.12)] backdrop-blur-xl transition duration-300 hover:border-gold/70 hover:text-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-5"
      >
        <span className="relative z-10 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold/60 opacity-75 transition group-hover:opacity-100" />
          <span className="relative inline-flex h-3 w-3 rounded-full border border-gold/70 bg-gold/35" />
        </span>
        <span className="relative z-10">Book now</span>
        <ArrowUpRight
          size={16}
          className="relative z-10 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  )
}
