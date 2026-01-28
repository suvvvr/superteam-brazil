"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-page/95 backdrop-blur-sm border-b border-alabaster/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/tqlf7.jpeg"
              alt="Superteam Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-alabaster text-lg tracking-wide font-semibold">
              Superteam <span className="font-[family-name:var(--font-accent)] text-wheat">Brazil</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-alabaster hover:text-wheat transition-colors duration-300 text-sm font-medium">
              About
            </Link>
            <Link href="#events" className="text-alabaster hover:text-wheat transition-colors duration-300 text-sm font-medium">
              Events
            </Link>
            <Link href="#community" className="text-alabaster hover:text-wheat transition-colors duration-300 text-sm font-medium">
              Community
            </Link>
          </nav>

          {/* Join Button */}
          <Link
            href="#join"
            className="hidden md:block bg-cherry text-alabaster px-5 py-2.5 rounded-lg font-semibold text-sm hover:brightness-110 hover:scale-[1.02] transition-all duration-300"
          >
            Join Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-alabaster p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-alabaster/10">
            <nav className="flex flex-col gap-4">
              <Link href="#about" className="text-alabaster hover:text-wheat transition-colors duration-300 text-sm font-medium">
                About
              </Link>
              <Link href="#events" className="text-alabaster hover:text-wheat transition-colors duration-300 text-sm font-medium">
                Events
              </Link>
              <Link href="#community" className="text-alabaster hover:text-wheat transition-colors duration-300 text-sm font-medium">
                Community
              </Link>
              <Link
                href="#join"
                className="bg-cherry text-alabaster px-5 py-2.5 rounded-lg font-semibold text-sm text-center hover:brightness-110 transition-all duration-300"
              >
                Join Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
