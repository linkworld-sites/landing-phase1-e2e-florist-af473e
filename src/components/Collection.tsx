'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  subtitle: string
  price: string
  image?: string
  svgType?: 'lavender' | 'poppy' | 'branch'
  span?: 'large' | 'small'
}

const products: Product[] = [
  {
    id: 1,
    name: 'Pampas Bundle',
    subtitle: 'Dried / Natural Ivory',
    price: '€ 54',
    image: '/images/hero.png',
    span: 'large',
  },
  {
    id: 2,
    name: 'Dried Rose Cluster',
    subtitle: 'Preserved / Dusty Rose',
    price: '€ 38',
    image: '/images/material.png',
    span: 'small',
  },
  {
    id: 3,
    name: 'Cotton Stems',
    subtitle: 'Dried / Bleached White',
    price: '€ 32',
    image: '/images/detail.png',
    span: 'small',
  },
  {
    id: 4,
    name: 'Lavender Harvest',
    subtitle: 'Dried / French Violet',
    price: '€ 28',
    svgType: 'lavender',
    span: 'small',
  },
  {
    id: 5,
    name: 'Poppy Pod Stems',
    subtitle: 'Dried / Sage & Oat',
    price: '€ 36',
    svgType: 'poppy',
    span: 'small',
  },
]

function LavenderSVG() {
  return (
    <svg viewBox="0 0 300 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="460" fill="#9DA68C" fillOpacity="0.15" />
      {[100, 130, 160, 180, 210].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="460" x2={x + (i % 2 === 0 ? -5 : 5)} y2="180" stroke="#3B2E28" strokeWidth="1" strokeOpacity="0.4" />
          {[...Array(8)].map((_, j) => {
            const y = 180 + j * 22
            const side = j % 2 === 0 ? 1 : -1
            return (
              <ellipse
                key={j}
                cx={x + (i % 2 === 0 ? -5 : 5) + side * 7}
                cy={y}
                rx="5"
                ry="9"
                fill="#9DA68C"
                fillOpacity="0.5"
                transform={`rotate(${side * 30} ${x + (i % 2 === 0 ? -5 : 5) + side * 7} ${y})`}
              />
            )
          })}
        </g>
      ))}
      <text x="150" y="440" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11" fill="#3B2E28" fillOpacity="0.4">
        Lavandula angustifolia
      </text>
    </svg>
  )
}

function PoppySVG() {
  return (
    <svg viewBox="0 0 300 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="300" height="460" fill="#C4856A" fillOpacity="0.1" />
      {[80, 130, 170, 210, 240].map((x, i) => {
        const baseY = 420 - i * 10
        const headY = 120 + i * 25
        const bend = i % 2 === 0 ? 15 : -15
        return (
          <g key={i}>
            <path
              d={`M ${x} ${baseY} Q ${x + bend} ${(baseY + headY) / 2} ${x + bend / 2} ${headY}`}
              stroke="#3B2E28"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              fill="none"
            />
            <ellipse
              cx={x + bend / 2}
              cy={headY - 12}
              rx="10"
              ry="18"
              fill="#C4856A"
              fillOpacity="0.35"
              stroke="#3B2E28"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            <ellipse
              cx={x + bend / 2}
              cy={headY - 12}
              rx="5"
              ry="9"
              fill="#3B2E28"
              fillOpacity="0.15"
            />
          </g>
        )
      })}
      <text x="150" y="452" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11" fill="#3B2E28" fillOpacity="0.4">
        Papaver somniferum
      </text>
    </svg>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()
  const isLarge = product.span === 'large'

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer ${isLarge ? 'row-span-2' : ''}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
    >
      {/* Image container with clip-path reveal */}
      <motion.div
        className="relative overflow-hidden bg-linen-fog"
        style={{ paddingBottom: isLarge ? '150%' : '125%' }}
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.4, delay: index * 0.12 + 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hover: { scale: 1.04 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {product.image ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes={isLarge ? '(max-width: 768px) 100vw, 45vw' : '(max-width: 768px) 50vw, 25vw'}
              />
              {/* Desaturate on hover */}
              <motion.div
                className="absolute inset-0 bg-linen-fog mix-blend-color"
                variants={{ hover: { opacity: 0.2 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-linen-fog flex items-center justify-center">
              {product.svgType === 'lavender' && <LavenderSVG />}
              {product.svgType === 'poppy' && <PoppySVG />}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Label */}
      <div className="pt-3 pb-2">
        <p className="font-body font-light text-xs tracking-widest-18 uppercase text-tannin">
          {product.name}
        </p>
        <div className="flex justify-between items-baseline mt-1">
          <p className="font-body font-light text-[11px] text-tannin/50 tracking-wide">
            {product.subtitle}
          </p>
          <p className="font-display italic text-tannin/70 text-sm">
            {product.price}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-tannin/90 flex items-center justify-center p-6 md:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-parchment max-w-2xl w-full grid md:grid-cols-2 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[3/4] bg-linen-fog">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {product.svgType === 'lavender' && <LavenderSVG />}
              {product.svgType === 'poppy' && <PoppySVG />}
            </div>
          )}
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <p className="font-body text-xs tracking-widest-2 uppercase text-tannin/50 mb-4">
              {product.subtitle}
            </p>
            <h2
              className="font-display italic text-tannin"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.04em', lineHeight: 1.1 }}
            >
              {product.name}
            </h2>
            <p className="font-body font-light text-sm text-tannin/70 mt-4 leading-relaxed">
              Harvested at peak season, dried slowly in our Amsterdam atelier. Each stem is arranged by hand and wrapped in unbleached paper — ready to keep for years.
            </p>
          </div>
          <div className="mt-8 flex items-end justify-between">
            <span className="font-display italic text-tannin text-2xl">{product.price}</span>
            <motion.button
              className="font-body font-light text-xs tracking-widest-18 uppercase text-tannin border-b border-dried-rose pb-0.5"
              whileHover={{ color: '#C4856A' }}
              onClick={onClose}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Collection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="collection" ref={sectionRef} className="bg-parchment px-6 md:px-14 py-20 md:py-28">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-12 md:mb-16">
        <motion.h2
          className="font-display italic text-tannin"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', letterSpacing: '0.04em', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The Collection
        </motion.h2>
        <motion.p
          className="hidden md:block font-body font-light text-xs tracking-widest-18 uppercase text-tannin/40"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Autumn — Winter 2024
        </motion.p>
      </div>

      {/* Asymmetric editorial grid */}
      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-5 items-start">
        {/* Large portrait — spans 2 rows */}
        <div
          className="col-span-2 md:col-span-1 md:row-span-2 cursor-pointer"
          onClick={() => setActiveProduct(products[0])}
        >
          <ProductCard product={products[0]} index={0} />
        </div>

        {/* 4 small squares */}
        {products.slice(1).map((p, i) => (
          <div key={p.id} className="cursor-pointer" onClick={() => setActiveProduct(p)}>
            <ProductCard product={p} index={i + 1} />
          </div>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="font-body font-light text-xs tracking-widest-2 uppercase text-tannin/40">
          Select any piece to see more
        </span>
      </motion.div>

      <AnimatePresence>
        {activeProduct && (
          <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
