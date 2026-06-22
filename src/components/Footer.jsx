import { Link } from 'react-router-dom'
import { site, navLinks } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-ink pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-ivory sm:pb-0">
      <div className="studio-shell grid gap-10 py-14 text-center lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:text-left">
        <div className="mx-auto space-y-4 lg:mx-0">
          <Logo compact />
          <p className="max-w-md text-sm leading-7 text-parchment/72">
            {site.tagline}
          </p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.35em] text-gold/80">Navigate</h2>
          <div className="mt-4 flex flex-col gap-3 lg:items-start">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-parchment/72 transition hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-[0.35em] text-gold/80">Contact</h2>
          <div className="mt-4 space-y-2 text-sm text-parchment/72 lg:space-y-2.5">
            <a href={`mailto:${site.email}`} className="block transition hover:text-ivory">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="block transition hover:text-ivory">
              {site.phone}
            </a>
            <p>{site.location}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10 py-4 text-center text-[0.72rem] uppercase tracking-[0.3em] text-parchment/45">
        Samuel Studio. Editorial portraiture with restraint and depth.
      </div>
    </footer>
  )
}
