import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: [
      "nyc.cloud.appwrite.io"
    ]
  }
}

export default nextConfig
