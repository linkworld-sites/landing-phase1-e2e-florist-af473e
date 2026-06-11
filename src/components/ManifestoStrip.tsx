'use client'
import { useState } from 'react'

const phrase = 'Arranged to outlast the season.   ·   '

export default function ManifestoStrip() {
  const [paused, setPaused] = useState(false)
  const repeated = phrase.repeat(6)

  return (
    <section className="bg-tannin overflow-hidden py-8 md:py-11" aria-label="Brand manifesto">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative"
      >
        <div
          className={`marquee-track${paused ? ' paused' : ''}`}
          aria-hidden="true"
        >
          <span
            className="font-display italic text-dried-rose whitespace-nowrap"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            {repeated}
          </span>
          <span
            className="font-display italic text-dried-rose whitespace-nowrap"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            {repeated}
          </span>
        </div>
        <p className="sr-only">Arranged to outlast the season.</p>
      </div>
    </section>
  )
}
