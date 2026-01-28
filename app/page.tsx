"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import WhyJoinSection from "@/components/why-join-section"
import WhatWeDoSection from "@/components/what-we-do-section"
import LeadersSection from "@/components/leaders-section"
import EventsSection from "@/components/events-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import MouseTrail from "@/components/mouse-trail"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative min-h-screen bg-page">
      {/* Main site - always rendered, fades in when loading completes */}
      <main
        className={`min-h-screen transition-opacity duration-500 ease-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Header />
        <HeroSection />
        <WhyJoinSection />
        <WhatWeDoSection />
        <LeadersSection />
        <EventsSection />
        <NewsletterSection />
        <Footer />
      </main>

      {/* Loading screen - overlays on top, removed from DOM when done */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* Mouse trail - always visible */}
      <MouseTrail />
    </div>
  )
}
