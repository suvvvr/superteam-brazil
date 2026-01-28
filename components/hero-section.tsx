"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center pt-16 opacity-0 transition-opacity duration-800"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Rio de Janeiro cityscape"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay with green tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-page/70 via-page/60 to-page/90" />
        <div className="absolute inset-0 bg-forest/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed mb-6 text-balance drop-shadow-lg overflow-visible" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          <span className="text-alabaster">Build the Future of </span>
          <span className="text-wheat">Web3</span>
          <span className="text-alabaster"> in </span>
          <span className="font-[family-name:var(--font-accent)] text-transparent bg-clip-text bg-gradient-to-r from-cherry to-wheat inline-block pb-2 pr-1" style={{ lineHeight: '1.3' }}>
            Brazil
          </span>
        </h1>
        
        <p className="text-alabaster text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          Join the leading Solana community in Latin America
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#join"
            className="bg-forest text-alabaster px-7 py-4 rounded-lg font-semibold text-base uppercase tracking-wide hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Join Community
          </Link>
          <Link
            href="#events"
            className="bg-cherry text-alabaster px-7 py-4 rounded-lg font-semibold text-base uppercase tracking-wide hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Explore Events
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-alabaster/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-wheat rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
