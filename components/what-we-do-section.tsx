"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Users, GraduationCap, TrendingUp, Coins, Network, Video } from "lucide-react"

const services = [
  {
    icon: Users,
    title: "Community Building",
    description: "Connect with like-minded builders, developers, and Web3 enthusiasts across Brazil."
  },
  {
    icon: GraduationCap,
    title: "Education & Workshops",
    description: "Learn from industry experts through exclusive workshops and educational content."
  },
  {
    icon: TrendingUp,
    title: "Trading & Signals",
    description: "Access premium trading insights and market analysis from experienced traders."
  },
  {
    icon: Coins,
    title: "Crypto Airdrops",
    description: "Get early access to exclusive airdrops and token distribution opportunities."
  },
  {
    icon: Network,
    title: "Networking Events",
    description: "Attend in-person and virtual events to expand your professional network."
  },
  {
    icon: Video,
    title: "Content Creation",
    description: "Collaborate on creating high-quality content that showcases the Brazilian Web3 scene."
  },
]

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll(".service-card")
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add("animate-scale-in")
                }, index * 100)
              })
            }
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
      className="relative min-h-[700px] py-24 px-4 sm:px-6 lg:px-10 opacity-0 transition-opacity duration-800"
    >
      {/* Background Image - High quality jungle */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jungle-bg.jpg"
          alt="Brazilian jungle"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-page/55" />
        <div className="absolute inset-0 bg-forest/8" />
      </div>

      {/* Golden hour decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wheat/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cherry/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-accent)] text-3xl sm:text-4xl lg:text-5xl text-alabaster mb-4 tracking-wide drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            What We Do
          </h2>
          <p className="text-alabaster text-base sm:text-lg max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
            Empowering the Brazilian Web3 ecosystem through education, community, and innovation.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card opacity-0 scale-90 group bg-earth/80 backdrop-blur-sm border border-alabaster/20 rounded-xl p-6 hover:scale-105 hover:border-wheat transition-all duration-300"
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-forest to-cherry flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cherry/20 transition-shadow duration-300">
                <service.icon className="w-6 h-6 text-alabaster" />
              </div>
              <h3 className="text-alabaster font-semibold text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-alabaster/90 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
