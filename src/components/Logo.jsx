import { Link } from 'react-router-dom'

export function Logo({ compact = false }) {
  return (
    <Link to="/" className="group inline-flex flex-col leading-none">
      <span className={`logo-script ${compact ? 'text-[1.9rem]' : 'text-[2.3rem] md:text-[3rem]'}`}>
        Samuel Studio
      </span>
      <span className="mt-1 text-[0.58rem] uppercase tracking-[0.48em] text-parchment/70 group-hover:text-gold/80">
        Fine Art Photography
      </span>
    </Link>
  )
}
