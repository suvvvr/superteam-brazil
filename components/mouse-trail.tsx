"use client"

import { useEffect, useRef, useState } from "react"

interface DustParticle {
  x: number
  y: number
  opacity: number
  size: number
  createdAt: number
  vx: number // Slight velocity for organic float
  vy: number
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<DustParticle[]>([])
  const animationRef = useRef<number>(0)
  const lastPointRef = useRef<number>(0)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      const now = Date.now()
      // Create particles more frequently for denser trail
      if (now - lastPointRef.current > 12) {
        // Add many tiny particles (25-35 particles at once for density)
        const particleCount = 8 + Math.floor(Math.random() * 6)
        
        for (let i = 0; i < particleCount; i++) {
          // Spread particles around cursor position
          const spread = 15
          const offsetX = (Math.random() - 0.5) * spread
          const offsetY = (Math.random() - 0.5) * spread
          
          // Slight random velocity for organic floating
          const vx = (Math.random() - 0.5) * 0.4
          const vy = (Math.random() - 0.5) * 0.4
          
          particlesRef.current.push({
            x: e.clientX + offsetX,
            y: e.clientY + offsetY,
            opacity: 0.4 + Math.random() * 0.15, // 40-55% opacity
            size: 1 + Math.random() * 1, // 1-2px size (very tiny)
            createdAt: now + Math.random() * 50, // Slight stagger
            vx,
            vy,
          })
        }
        
        lastPointRef.current = now
        
        // Keep particle count manageable but allow many
        if (particlesRef.current.length > 150) {
          particlesRef.current.splice(0, 20)
        }
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const now = Date.now()
      const fadeTime = 350 // Fast fade out (300-400ms)
      
      particlesRef.current = particlesRef.current.filter((particle) => {
        const age = now - particle.createdAt
        if (age > fadeTime) return false
        
        // Update opacity with smooth fade
        particle.opacity = (0.45) * (1 - age / fadeTime)
        
        // Slow organic drift
        particle.x += particle.vx
        particle.y += particle.vy
        
        return true
      })
      
      // Draw each tiny dust particle with gentle glow
      particlesRef.current.forEach((particle) => {
        if (particle.opacity <= 0) return
        
        // Single layer gentle glow (3-4px blur radius)
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size + 3
        )
        // Golden wheat color #F0BE49
        glow.addColorStop(0, `rgba(240, 190, 73, ${particle.opacity})`)
        glow.addColorStop(0.4, `rgba(240, 190, 73, ${particle.opacity * 0.5})`)
        glow.addColorStop(1, `rgba(240, 190, 73, 0)`)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size + 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        
        // Tiny bright center point
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 230, 150, ${particle.opacity * 0.8})`
        ctx.fill()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", checkMobile)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
