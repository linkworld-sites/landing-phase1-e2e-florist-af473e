'use client'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-parchment pt-32 pb-24 px-8 md:px-14">
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 md:mb-20"
      >
        <p className="font-body font-light text-xs tracking-widest-2 uppercase text-tannin/50 mb-4">
          Journal
        </p>
        <h1
          className="font-display italic text-tannin"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
        >
          From the Studio
        </h1>
      </motion.div>

      {posts.length === 0 ? (
        <p className="font-body text-tannin/50">No posts yet.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <motion.article
                    className="h-full border border-tannin/10 bg-linen-fog p-8 rounded-sm"
                    whileHover={{ y: shouldReduceMotion ? 0 : -4 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.99 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <time
                      dateTime={post.date}
                      className="font-body font-light text-[10px] tracking-widest-18 uppercase text-tannin/40 mb-4 block"
                    >
                      {formatDate(post.date)}
                    </time>
                    <h2
                      className="font-display italic text-tannin mb-3 group-hover:text-dried-rose transition-colors duration-300"
                      style={{ fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', lineHeight: 1.25 }}
                    >
                      {post.title}
                    </h2>
                    <p className="font-body font-light text-sm text-tannin/60 leading-relaxed mb-6">
                      {post.description}
                    </p>
                    <motion.span
                      className="inline-flex items-center gap-2 font-body font-light text-xs tracking-widest-2 uppercase text-dried-rose"
                      whileHover={{ gap: '0.75rem' }}
                      transition={{ duration: 0.3 }}
                    >
                      Read more
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: shouldReduceMotion ? 0 : 4 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        →
                      </motion.span>
                    </motion.span>
                  </motion.article>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
