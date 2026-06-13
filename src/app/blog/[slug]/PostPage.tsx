'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import type { PostData } from '@/lib/posts'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function PostPage({ post }: { post: PostData }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-parchment">
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 md:px-14 border-b border-tannin/10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <Link
            href="/blog"
            className="font-body font-light text-[10px] tracking-widest-18 uppercase text-tannin/40 hover:text-dried-rose transition-colors duration-300 inline-flex items-center gap-2 mb-8"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: shouldReduceMotion ? 0 : -3 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              ←
            </motion.span>
            Journal
          </Link>

          <time
            dateTime={post.date}
            className="font-body font-light text-[10px] tracking-widest-18 uppercase text-tannin/40 mb-5 block"
          >
            {formatDate(post.date)}
          </time>

          <h1
            className="font-display italic text-tannin mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
          >
            {post.title}
          </h1>

          <p className="font-body font-light text-base md:text-lg text-tannin/60 leading-relaxed">
            {post.description}
          </p>
        </motion.div>
      </section>

      {/* Body */}
      <motion.section
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="px-8 md:px-14 py-16 md:py-20"
      >
        <article
          className="post-body max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.section>
    </main>
  )
}
