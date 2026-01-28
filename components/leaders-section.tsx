"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const leaders = [
  { name: "Ana Silva", role: "Community Lead", image: "/images/leaders/ana-silva.jpg" },
  { name: "Pedro Santos", role: "Developer Advocate", image: "/images/leaders/pedro-santos.jpg" },
  { name: "Mariana Costa", role: "Events Manager", image: "/images/leaders/mariana-costa.jpg" },
  { name: "Lucas Oliveira", role: "Education Lead", image: "/images/leaders/lucas-oliveira.jpg" },
  { name: "Julia Ferreira", role: "Growth Manager", image: "/images/leaders/julia-ferreira.jpg" },
]

export default function LeadersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leadersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            if (leadersRef.current) {
              const cards = leadersRef.current.querySelectorAll(".leader-card")
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
      id="community"
      ref={sectionRef}
      className="bg-earth py-24 px-4 sm:px-6 lg:px-10 opacity-0 transition-opacity duration-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-accent)] text-3xl sm:text-4xl lg:text-5xl text-alabaster mb-4 tracking-wide">
            Community Leaders
          </h2>
          <p className="text-alabaster/80 text-base sm:text-lg max-w-2xl mx-auto">
            Meet the passionate individuals driving the Superteam Brazil mission forward.
          </p>
        </div>

        <div
          ref={leadersRef}
          className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible scrollbar-hide justify-center"
        >
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="leader-card opacity-0 scale-80 flex-shrink-0 snap-center flex flex-col items-center text-center w-36 lg:w-auto"
            >
              <div className="relative group mb-4">
                <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full border-3 border-wheat overflow-hidden group-hover:shadow-[0_0_20px_rgba(240,190,73,0.5)] transition-shadow duration-300">
                  <Image
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-alabaster font-semibold text-lg mb-1">
                {leader.name}
              </h3>
              <p className="text-cherry text-sm font-medium">
                {leader.role}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-block border-2 border-wheat text-alabaster px-6 py-3 rounded-lg font-semibold text-sm hover:bg-wheat hover:text-earth transition-all duration-300"
          >
            View All Members
          </Link>
        </div>
      </div>
    </section>
  )
}
