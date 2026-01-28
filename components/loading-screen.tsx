"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"

const BACKGROUND_COLOR = "#053931" // Aurora Forest

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)

  const fullText = "Superteam Brazil"
  const superteamEnd = 9 // "Superteam" is 9 characters

  const handleComplete = useCallback(() => {
    setIsFading(true)
    setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 500)
  }, [onComplete])

  useEffect(() => {
    // Step 1: Logo fades in (0-400ms)
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 50)

    // Step 2: After logo (400ms) + pause (300ms) = 700ms, start typewriter
    const typewriterStartDelay = 700
    const charDelay = 90 // ms between each character
    const totalChars = fullText.length

    const charTimers: NodeJS.Timeout[] = []
    for (let i = 0; i < totalChars; i++) {
      const timer = setTimeout(() => {
        setVisibleChars(i + 1)
      }, typewriterStartDelay + i * charDelay)
      charTimers.push(timer)
    }

    // Step 3: After animation completes, wait 1.5s then fade out
    // Animation ends at: 700ms + (16 chars * 90ms) = 700 + 1440 = ~2140ms
    // Then wait 1500ms more = ~3640ms total
    const completeTimer = setTimeout(() => {
      handleComplete()
    }, 3800)

    return () => {
      clearTimeout(logoTimer)
      charTimers.forEach(clearTimeout)
      clearTimeout(completeTimer)
    }
  }, [handleComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <div className="flex items-center gap-6" style={{ minWidth: "fit-content" }}>
        {/* Spinning Logo */}
        <div
          className={`transition-opacity duration-[400ms] ease-out ${
            logoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/images/tqlf7.jpeg"
            alt="Superteam Logo"
            width={140}
            height={140}
            className="rounded-2xl animate-spin-slow"
            style={{
              boxShadow: `0 0 40px rgba(240, 190, 73, 0.4), 0 0 80px rgba(221, 92, 54, 0.3)`,
            }}
            priority
          />
        </div>

        {/* Typewriter Text */}
       <div className="flex items-center overflow-visible flex-shrink-0" style={{ letterSpacing: "1.5px", whiteSpace: "nowrap", minWidth: "fit-content" }}>
          {fullText.split("").map((char, index) => {
            const isSuperteam = index < superteamEnd
            const isSpace = char === " "
            const isVisible = index < visibleChars

            return (
              <span
                key={index}
                className={`inline-block transition-all duration-150 ease-out overflow-visible ${
                  isVisible
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[0.8]"
                }`}
                style={{
                  fontSize: "32px",
                  lineHeight: "1.4",
                  fontWeight: isSuperteam ? 700 : 400,
                  fontFamily: isSuperteam
                    ? "var(--font-display), 'Bungee', sans-serif"
                    : "var(--font-accent), 'Pacifico', cursive",
                  color: isSuperteam ? "#F8EDD9" : "transparent",
                  background: isSuperteam
                    ? "none"
                    : "linear-gradient(90deg, #F0BE49, #DD5C36)",
                  WebkitBackgroundClip: isSuperteam ? "unset" : "text",
                  backgroundClip: isSuperteam ? "unset" : "text",
                  width: isSpace ? "0.3em" : "auto",
                  textShadow: isSuperteam
                    ? "0 2px 10px rgba(248, 237, 217, 0.3)"
                    : "none",
                }}
              >
                {isSpace ? "\u00A0" : char}
              </span>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </div>
  )
}
