"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

const events = [
  {
    title: "Solana Developer Summit",
    date: "Feb 15, 2026",
    location: "São Paulo",
    description: "Join us for an intensive day of learning about Solana development, smart contracts, and DeFi applications.",
    image: "/images/events-bg.jpg"
  },
  {
    title: "Web3 Networking Night",
    date: "Feb 28, 2026",
    location: "Rio de Janeiro",
    description: "Connect with fellow builders and investors at our exclusive networking event overlooking the city.",
    image: "/images/leaders-bg.jpg"
  },
  {
    title: "DeFi Workshop Series",
    date: "Mar 10, 2026",
    location: "Online",
    description: "Master the fundamentals of decentralized finance through hands-on workshops and live coding sessions.",
    image: "/images/hero-bg.jpg"
  },
]

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll(".event-card")
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add("animate-slide-up")
                }, index * 150)
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
      id="events"
      ref={sectionRef}
      className="relative min-h-[700px] py-24 px-4 sm:px-6 lg:px-10 opacity-0 transition-opacity duration-800"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/events-bg.jpg"
          alt="Night cityscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-page/65" />
        <div className="absolute inset-0 bg-forest/10" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-accent)] text-3xl sm:text-4xl lg:text-5xl text-alabaster mb-4 tracking-wide drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Upcoming Events
          </h2>
          <p className="text-alabaster text-base sm:text-lg max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
            Connect with the community at our exclusive events and workshops.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="event-card opacity-0 translate-y-8 group bg-forest/10 border-2 border-cherry/40 rounded-xl overflow-hidden hover:border-cherry hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-page/90 to-transparent" />
              </div>
              <div className="p-6 bg-earth/90">
                <div className="flex flex-wrap gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-wheat text-sm font-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-wheat text-sm font-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>
                <h3 className="text-alabaster font-semibold text-xl mb-2">
                  {event.title}
                </h3>
                <p className="text-alabaster/90 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-wheat font-semibold text-sm hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
