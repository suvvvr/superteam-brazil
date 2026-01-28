"use client"

import { useEffect, useRef } from "react"
import { Users, Calendar, DollarSign, Gift } from "lucide-react"

const stats = [
  { icon: Users, value: "5,000+", label: "Active Members" },
  { icon: Calendar, value: "50+", label: "Events Hosted" },
  { icon: DollarSign, value: "$10M+", label: "Monthly Volume" },
  { icon: Gift, value: "30+", label: "Successful Airdrops" },
]

export default function WhyJoinSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            // Animate cards with stagger
            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll(".stat-card")
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add("animate-scale-in")
                }, index * 100)
              })
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-earth py-24 px-4 sm:px-6 lg:px-10 opacity-0 transition-opacity duration-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-accent)] text-3xl sm:text-4xl lg:text-5xl text-alabaster mb-4 tracking-wide">
            Why Join Superteam Brazil
          </h2>
          <p className="text-alabaster/80 text-base sm:text-lg max-w-2xl mx-auto">
            Be part of the fastest-growing Web3 community in Latin America.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card opacity-0 scale-90 group bg-forest/10 border-2 border-cherry rounded-xl p-8 text-center hover:border-wheat hover:shadow-xl hover:shadow-wheat/10 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-forest to-cherry flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-alabaster" />
              </div>
              <div className="font-[family-name:var(--font-display)] text-wheat text-3xl sm:text-4xl mb-2">
                {stat.value}
              </div>
              <div className="text-alabaster text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
