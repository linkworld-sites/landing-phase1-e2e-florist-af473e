import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostData {
  slug: string
  title: string
  date: string
  description: string
  content: string
}

export type PostMeta = Omit<PostData, 'content'>

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim().replace(/^["'](.*)["']$/, '$1')
    data[key] = val
  }

  return { data, body: match[2] }
}

function slugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return []

  return fs
    .readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(postsDirectory, filename), 'utf8')
      const { data } = parseFrontmatter(raw)
      return {
        slug: slugFromFilename(filename),
        title: data.title ?? '',
        date: data.date ?? '',
        description: data.description ?? '',
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): PostData | null {
  if (!fs.existsSync(postsDirectory)) return null

  const filenames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  const filename = filenames.find(f => slugFromFilename(f) === slug)
  if (!filename) return null

  const raw = fs.readFileSync(path.join(postsDirectory, filename), 'utf8')
  const { data, body } = parseFrontmatter(raw)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    description: data.description ?? '',
    content: marked.parse(body) as string,
  }
}
