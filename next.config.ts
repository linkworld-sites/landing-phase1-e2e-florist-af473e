import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.run.linkworld.ai'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
