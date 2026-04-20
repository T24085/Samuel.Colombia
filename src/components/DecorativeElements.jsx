export function InkWashBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,161,91,0.08),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(245,240,230,0.08),transparent_22%),linear-gradient(180deg,rgba(10,51,45,0.9),rgba(17,17,17,0.95))]" />
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] opacity-25" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(245,240,230,0.75)_1px,transparent_0)] [background-size:24px_24px]" />
    </div>
  )
}

export function FanArcBackdrop({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 500"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      fill="none"
    >
      <path d="M110 390C170 230 285 140 395 120" stroke="rgba(198,161,91,0.9)" strokeWidth="2" strokeLinecap="round" />
      <path d="M135 390C202 235 312 162 422 132" stroke="rgba(198,161,91,0.45)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M160 388C231 244 334 186 446 144" stroke="rgba(198,161,91,0.28)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M186 384C260 258 361 214 471 162" stroke="rgba(198,161,91,0.18)" strokeWidth="1" strokeLinecap="round" />
      <path d="M214 378C290 270 389 233 496 184" stroke="rgba(245,240,230,0.14)" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  )
}

export function CornerOrnament({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute h-16 w-16 ${className}`}
      fill="none"
    >
      <path d="M10 90V10h80" stroke="rgba(198,161,91,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 86V24h62" stroke="rgba(245,240,230,0.26)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function BrushDivider({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 24"
      className={`h-6 w-full ${className}`}
      fill="none"
    >
      <path
        d="M10 12C81 8 153 14 224 12C295 10 365 4 436 11C507 18 576 18 646 12C711 7 757 8 790 12"
        stroke="rgba(198,161,91,0.85)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function VerticalTag({ children, className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-gold/25 bg-ink/70 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-parchment/80 ${className}`}
    >
      <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(198,161,91,0.12)]" />
      {children}
    </div>
  )
}

export function GoldFrame({ children, className = '' }) {
  return (
    <div className={`gold-frame relative overflow-hidden rounded-[1.75rem] ${className}`}>
      <CornerOrnament className="left-4 top-4" />
      <CornerOrnament className="bottom-4 right-4 rotate-180" />
      {children}
    </div>
  )
}
