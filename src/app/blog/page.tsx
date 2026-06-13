import { getAllPosts } from '@/lib/posts'
import BlogIndex from './BlogIndex'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal — Petal & Keep',
  description: 'Guides, inspiration, and the art of botanical preservation. Written from our studio in Amsterdam.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogIndex posts={posts} />
}
