import { useEffect } from 'react'

export function useScrollReveal(scopeKey) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(document.querySelectorAll('.reveal'))

    if (!targets.length) return undefined

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    targets.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, [scopeKey])
}
