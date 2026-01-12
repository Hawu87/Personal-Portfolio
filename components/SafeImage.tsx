"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | undefined
  // Fallback image path (defaults to placeholder)
  fallbackSrc?: string
}

/**
 * SafeImage component that handles image loading errors gracefully.
 * 
 * Why this exists:
 * - External images (e.g., Unsplash) can fail due to DNS issues, timeouts, or network problems
 * - Next.js image optimizer can spam 500 errors when external images fail
 * - This component provides a local fallback to prevent UI crashes
 */
export function SafeImage({ src, fallbackSrc = "/placeholder.svg", alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const [hasError, setHasError] = useState(false)

  // Determine if this is a remote image (for development optimization)
  const isRemote = imgSrc?.startsWith("http://") || imgSrc?.startsWith("https://")
  const isDevelopment = process.env.NODE_ENV === "development"

  const handleError = () => {
    // Only swap to fallback once to avoid infinite loops
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  // If no src provided, use fallback immediately
  if (!imgSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt || "Image placeholder"}
        unoptimized={isDevelopment}
        {...props}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      // In development, avoid optimizer fetch issues for remote images
      unoptimized={isDevelopment && isRemote}
      {...props}
    />
  )
}

