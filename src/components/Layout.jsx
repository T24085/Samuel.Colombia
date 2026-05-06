import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingBookingButton } from './FloatingBookingButton'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Layout() {
  const location = useLocation()
  const isPortfolioPage = location.pathname.startsWith('/portfolio')
  useScrollReveal(location.pathname)

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden"
      >
        <Outlet />
      </motion.main>
      {isPortfolioPage ? null : <Footer />}
      <FloatingBookingButton />
    </div>
  )
}
