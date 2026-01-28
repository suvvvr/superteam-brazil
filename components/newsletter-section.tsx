"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { Mail } from "lucide-react"

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section
      id="join"
      ref={sectionRef}
      className="bg-earth py-24 px-4 sm:px-6 lg:px-10 opacity-0 transition-opacity duration-800"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-forest to-wheat flex items-center justify-center">
          <Mail className="w-8 h-8 text-alabaster" />
        </div>

        <h2 className="font-[family-name:var(--font-accent)] text-3xl sm:text-4xl lg:text-5xl text-alabaster mb-4 tracking-wide">
          Stay in the Loop
        </h2>
        <p className="text-alabaster/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
          Get the latest news, event updates, and exclusive insights from Superteam Brazil delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-cherry bg-forest/10 text-alabaster placeholder:text-wheat/50 focus:outline-none focus:ring-2 focus:ring-wheat transition-all duration-300"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-cherry text-alabaster font-semibold hover:bg-wheat hover:text-earth transition-all duration-300"
          >
            Subscribe
          </button>
        </form>

        <p className="text-alabaster/60 text-xs mt-6">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  )
}
