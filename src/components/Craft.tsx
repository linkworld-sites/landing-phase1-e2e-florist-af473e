'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const craftPhotos = [
  { src: '/images/process.png', alt: 'Drying stems in the atelier', multiplier: 0.08 },
  { src: '/images/hero.png', alt: 'Finished arrangement detail', multiplier: 0.12 },
  { src: '/images/material.png', alt: 'Raw pampas at harvest', multiplier: 0.06 },
  { src: '/images/detail.png', alt: 'Hands composing a bundle', multiplier: 0.10 },
]

function ParallaxPhoto({
  src,
  alt,
  multiplier,
  index,
  scrollYProgress,
}: {
  src: string
  alt: string
  multiplier: number
  index: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduceMotion = useReducedMotion()

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -(multiplier * 400)]
  )

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{ y, aspectRatio: '3/4' }}
      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
      animate={inView ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' } : {}}
      transition={{ duration: 1.4, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </motion.div>
  )
}

export default function Craft() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const inView = useInView(textRef, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative bg-linen-fog"
      style={{ height: '300vh' }}
      aria-label="The Craft — process and sourcing"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Left — pinned copy */}
          <div className="w-full md:w-[45%] flex items-center px-8 md:px-16 shrink-0">
            <div ref={textRef}>
              <motion.p
                className="font-body text-xs tracking-widest-2 uppercase text-tannin/40 mb-6"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                The Craft
              </motion.p>
              <motion.h2
                className="font-display italic text-tannin mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', letterSpacing: '0.04em', lineHeight: 1.15 }}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Harvest, dry,<br />compose.
              </motion.h2>
              <motion.p
                className="font-body font-light text-sm text-tannin/65 leading-relaxed max-w-sm mb-4"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Each stem is chosen at peak bloom, dried slowly in our Amsterdam atelier over two to four weeks, and arranged by hand — one piece at a time, in silence.
              </motion.p>
              <motion.p
                className="font-body font-light text-sm text-tannin/65 leading-relaxed max-w-sm mb-8"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                We source from farms across France, the Netherlands and Portugal — growers we know by name, who dry alongside us.
              </motion.p>
              <motion.p
                className="font-display italic text-dried-rose"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', letterSpacing: '0.04em' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                In that order.
              </motion.p>
            </div>
          </div>

          {/* Right — scrolling photos */}
          <div className="hidden md:flex w-[55%] flex-col gap-6 overflow-hidden px-8 py-12">
            {craftPhotos.map((photo, i) => (
              <ParallaxPhoto
                key={i}
                src={photo.src}
                alt={photo.alt}
                multiplier={photo.multiplier}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
