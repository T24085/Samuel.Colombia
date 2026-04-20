import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const PALETTE = [
  {
    color: 'rgba(198, 161, 91, 0.52)',
    glow: 'rgba(198, 161, 91, 0.14)',
    width: 1.15,
    speed: 1,
  },
  {
    color: 'rgba(15, 75, 67, 0.48)',
    glow: 'rgba(15, 75, 67, 0.12)',
    width: 1.05,
    speed: 0.88,
  },
  {
    color: 'rgba(245, 240, 230, 0.28)',
    glow: 'rgba(245, 240, 230, 0.08)',
    width: 0.9,
    speed: 0.76,
  },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const lerp = (start, end, amount) => start + (end - start) * amount
const smoothstep = (value) => value * value * (3 - 2 * value)

function hash3(x, y, z) {
  const value = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123
  return value - Math.floor(value)
}

function valueNoise3(x, y, z) {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const z0 = Math.floor(z)

  const xf = x - x0
  const yf = y - y0
  const zf = z - z0

  const u = smoothstep(xf)
  const v = smoothstep(yf)
  const w = smoothstep(zf)

  const c000 = hash3(x0, y0, z0)
  const c100 = hash3(x0 + 1, y0, z0)
  const c010 = hash3(x0, y0 + 1, z0)
  const c110 = hash3(x0 + 1, y0 + 1, z0)
  const c001 = hash3(x0, y0, z0 + 1)
  const c101 = hash3(x0 + 1, y0, z0 + 1)
  const c011 = hash3(x0, y0 + 1, z0 + 1)
  const c111 = hash3(x0 + 1, y0 + 1, z0 + 1)

  const x00 = lerp(c000, c100, u)
  const x10 = lerp(c010, c110, u)
  const x01 = lerp(c001, c101, u)
  const x11 = lerp(c011, c111, u)

  const y0Blend = lerp(x00, x10, v)
  const y1Blend = lerp(x01, x11, v)

  return lerp(y0Blend, y1Blend, w)
}

function getParticleCount(width, height, reduceMotion) {
  const area = width * height
  const min = reduceMotion ? 72 : width < 768 ? 160 : 260
  const max = reduceMotion ? 120 : width < 768 ? 260 : 620
  const divisor = width < 768 ? 1750 : 2400
  return Math.round(clamp(area / divisor, min, max))
}

function createParticles(count, width, height) {
  return Array.from({ length: count }, () => {
    const palette = PALETTE[Math.floor(Math.random() * PALETTE.length)]
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      previousX: 0,
      previousY: 0,
      tint: palette.color,
      glow: palette.glow,
      width: palette.width,
      speed: palette.speed * (0.72 + Math.random() * 0.45),
      phase: Math.random() * Math.PI * 2,
    }
  })
}

function fieldAngle(x, y, time, width, height, phase) {
  const nx = x / width
  const ny = y / height
  const noise = valueNoise3(nx * 2.8, ny * 2.1, time * 0.12 + phase)
  const swirlX = x - width * 0.62
  const swirlY = y - height * 0.34
  const swirl = Math.atan2(swirlY, swirlX)
  const ripple = Math.sin((nx * 8.5 + ny * 3.2 + time * 0.18 + phase) * Math.PI)

  return noise * Math.PI * 5.6 + swirl * 0.28 + ripple * 0.42
}

export function FlowFieldBackdrop({ className = '' }) {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!context) return undefined

    let animationFrame = 0
    let particles = []
    let width = 0
    let height = 0
    let devicePixelRatio = window.devicePixelRatio || 1

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(bounds.width))
      height = Math.max(1, Math.floor(bounds.height))
      devicePixelRatio = window.devicePixelRatio || 1

      canvas.width = Math.floor(width * devicePixelRatio)
      canvas.height = Math.floor(height * devicePixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      particles = createParticles(getParticleCount(width, height, reduceMotion), width, height)
      context.clearRect(0, 0, width, height)
    }

    const drawAuras = (time) => {
      const anchors = [
        {
          x: width * 0.16 + Math.sin(time * 0.00022) * width * 0.03,
          y: height * 0.24 + Math.cos(time * 0.00018) * height * 0.02,
          radius: Math.max(width, height) * 0.46,
          color: 'rgba(198, 161, 91, 0.10)',
        },
        {
          x: width * 0.78 + Math.cos(time * 0.00016) * width * 0.03,
          y: height * 0.34 + Math.sin(time * 0.00019) * height * 0.03,
          radius: Math.max(width, height) * 0.52,
          color: 'rgba(15, 75, 67, 0.12)',
        },
        {
          x: width * 0.56,
          y: height * 0.8 + Math.sin(time * 0.00014) * height * 0.015,
          radius: Math.max(width, height) * 0.34,
          color: 'rgba(245, 240, 230, 0.06)',
        },
      ]

      context.save()
      context.globalCompositeOperation = 'screen'

      for (const anchor of anchors) {
        const gradient = context.createRadialGradient(
          anchor.x,
          anchor.y,
          0,
          anchor.x,
          anchor.y,
          anchor.radius,
        )
        gradient.addColorStop(0, anchor.color)
        gradient.addColorStop(1, 'rgba(17, 17, 17, 0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, width, height)
      }

      context.restore()
    }

    const drawParticles = (time) => {
      context.save()
      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = reduceMotion ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.08)'
      context.fillRect(0, 0, width, height)
      context.restore()

      drawAuras(time)

      context.save()
      context.globalCompositeOperation = 'source-over'

      for (const particle of particles) {
        particle.previousX = particle.x
        particle.previousY = particle.y

        const angle = fieldAngle(
          particle.x,
          particle.y,
          time,
          width,
          height,
          particle.phase,
        )
        const drift = valueNoise3(particle.x * 0.004, particle.y * 0.004, time * 0.02 + particle.phase)
        const speed = particle.speed * (0.55 + drift * 1.15)

        particle.x += Math.cos(angle) * speed
        particle.y += Math.sin(angle) * speed

        if (particle.x < -12 || particle.x > width + 12 || particle.y < -12 || particle.y > height + 12) {
          particle.x = Math.random() * width
          particle.y = Math.random() * height
          particle.previousX = particle.x
          particle.previousY = particle.y
          continue
        }

        const rightBias = clamp((particle.x - width * 0.08) / (width * 0.92), 0.12, 1)
        const alpha = 0.18 + rightBias * 0.54

        context.beginPath()
        context.moveTo(particle.previousX, particle.previousY)
        context.lineTo(particle.x, particle.y)
        context.strokeStyle = particle.glow
        context.lineWidth = particle.width * 3.3
        context.globalAlpha = alpha * 0.42
        context.stroke()

        context.beginPath()
        context.moveTo(particle.previousX, particle.previousY)
        context.lineTo(particle.x, particle.y)
        context.strokeStyle = particle.tint
        context.lineWidth = particle.width
        context.globalAlpha = alpha
        context.stroke()
      }

      context.restore()
    }

    const renderStaticFrame = () => {
      context.clearRect(0, 0, width, height)
      drawAuras(0)
      context.save()
      context.globalCompositeOperation = 'source-over'
      context.globalAlpha = 0.68

      for (const particle of particles) {
        let x = particle.x
        let y = particle.y
        const steps = 7

        for (let step = 0; step < steps; step += 1) {
          const previousX = x
          const previousY = y
          const angle = fieldAngle(previousX, previousY, step * 10, width, height, particle.phase)
          const speed = particle.speed * (0.55 + valueNoise3(previousX * 0.004, previousY * 0.004, step * 0.06 + particle.phase) * 1.1)

          x += Math.cos(angle) * speed
          y += Math.sin(angle) * speed

          context.beginPath()
          context.moveTo(previousX, previousY)
          context.lineTo(x, y)
          context.strokeStyle = particle.glow
          context.lineWidth = particle.width * 2.8
          context.globalAlpha = 0.12
          context.stroke()

          context.beginPath()
          context.moveTo(previousX, previousY)
          context.lineTo(x, y)
          context.strokeStyle = particle.tint
          context.lineWidth = particle.width
          context.globalAlpha = 0.24
          context.stroke()
        }
      }

      context.restore()
    }

    const tick = (time) => {
      drawParticles(time)
      animationFrame = window.requestAnimationFrame(tick)
    }

    const onResize = () => {
      resize()
      if (reduceMotion) {
        renderStaticFrame()
      }
    }

    resize()

    if (reduceMotion) {
      renderStaticFrame()
      window.addEventListener('resize', onResize)
      return () => {
        window.removeEventListener('resize', onResize)
      }
    }

    animationFrame = window.requestAnimationFrame(tick)
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', onResize)
    }
  }, [reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-screen opacity-80 ${className}`}
    />
  )
}
