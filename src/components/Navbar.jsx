import { useEffect, useState } from 'react'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../data/site'
import { Logo } from './Logo'

function linkClass({ isActive }) {
  return [
    'nav-draw-gold page-intro inline-flex items-center justify-center rounded-none border border-transparent px-4 py-2 text-sm uppercase tracking-[0.24em] transition-colors duration-300',
    isActive
      ? 'text-gold'
      : 'text-ivory/78 hover:text-gold',
  ].join(' ')
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const magazineOpen = location.pathname.startsWith('/portfolio') && searchParams.has('magazine')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={[
        `fixed inset-x-0 top-0 transition-all duration-500 ${magazineOpen ? 'z-[90]' : 'z-50'}`,
        scrolled
          ? 'border-b border-gold/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.94),rgba(17,17,17,0.84))] shadow-luxury backdrop-blur-2xl'
          : 'border-b border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.84),rgba(17,17,17,0.58))] shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl',
      ].join(' ')}
    >
      <div className="studio-shell flex items-center justify-between py-3 sm:py-4">
        <Logo compact className="hero-logo" />
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={linkClass}
              style={{ '--enter-delay': `${index * 90}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 bg-ivory/5 text-ivory transition hover:border-gold/55 hover:bg-gold/10 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gold/10 bg-ink/95 px-6 py-8 backdrop-blur-xl lg:hidden"
          >
            <div className="studio-shell flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    [
                      'nav-draw-gold page-intro rounded-none border border-transparent px-4 py-4 text-sm uppercase tracking-[0.28em] transition-colors duration-300',
                      isActive
                        ? 'text-gold'
                        : 'bg-white/5 text-ivory/80 hover:text-gold',
                    ].join(' ')
                  }
                  style={{ '--enter-delay': `${index * 70}ms` }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
