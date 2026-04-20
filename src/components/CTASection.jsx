import { Link } from 'react-router-dom'
import { FanArcBackdrop, VerticalTag } from './DecorativeElements'

export function CTASection() {
  return (
    <section className="home-snap-section relative overflow-hidden bg-ink py-24 text-ivory">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(198,161,91,0.14),transparent_40%),radial-gradient(circle_at_top_right,rgba(245,240,230,0.06),transparent_30%)]" />
      <FanArcBackdrop className="opacity-35" />
      <div className="studio-shell relative">
        <div className="gold-frame flex flex-col gap-8 p-8 md:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <VerticalTag>Booking banner</VerticalTag>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              A premium session, directed with clarity and care.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-parchment/72">
              From intimate portraits to editorial storytelling, Samuel Studio is designed for clients who value restraint, polish, and images that feel enduring.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-full border border-gold/80 bg-[linear-gradient(180deg,rgba(198,161,91,0.98),rgba(168,132,67,0.92))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink shadow-[0_0_0_1px_rgba(198,161,91,0.32),0_10px_28px_rgba(198,161,91,0.18)] transition hover:-translate-y-px hover:border-gold hover:bg-[linear-gradient(180deg,rgba(212,177,105,1),rgba(184,145,75,0.96))] hover:text-ink"
            >
              Book a Session
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-gold/70 bg-ink/45 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ivory shadow-[0_0_0_1px_rgba(198,161,91,0.18)] transition hover:-translate-y-px hover:border-gold hover:bg-ink/65 hover:text-gold/95"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
