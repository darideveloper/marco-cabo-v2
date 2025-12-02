// libs
import { useState, useEffect } from 'react'
import clsx from 'clsx'

// components
import Modal from './Modal'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  videoTitle?: string
  thanksMessage?: string
  buttonText?: string
  buttonLink?: string
  buttonTarget?: '_blank' | '_self'
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  videoTitle = 'Video',
  thanksMessage,
  buttonText = 'Learn More',
  buttonLink = '#',
  buttonTarget = '_blank',
}: VideoModalProps) {
  const [videoId, setVideoId] = useState<string | null>(null)

  // Extract YouTube video ID from various URL formats
  useEffect(() => {
    if (!videoUrl) return

    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = videoUrl.match(pattern)
      if (match && match[1]) {
        setVideoId(match[1])
        return
      }
    }

    // If no pattern matches, assume the URL itself is the video ID
    setVideoId(videoUrl)
  }, [videoUrl])

  if (!videoId) return null

  // YouTube embed URL with autoplay, loop
  // Note: mute=0 allows sound, but autoplay with sound requires user interaction (which we have via form submission)
  // loop=1 requires playlist parameter with the same video ID to work properly
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=0&controls=1&modestbranding=1&rel=0&enablejsapi=1`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
      padding="p-0"
      borderRadius="rounded-xl"
      animationDuration={300}
      useAdvancedAnimations={true}
      showCloseButton={true}
      closeButtonAriaLabel="Close video modal"
      contentClassName="overflow-hidden"
    >
      <div className="bg-black">
        {/* Thanks Message */}
        {thanksMessage && (
          <div className="bg-white p-6 text-center border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h3>
            <p className="text-gray-700 text-lg">
              {thanksMessage}
            </p>
          </div>
        )}

        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0 }}
          />
        </div>

        {/* Button Section */}
        {buttonLink && buttonLink !== '#' && (
          <div className="bg-white p-6 text-center">
            <a
              href={buttonLink}
              target={buttonTarget}
              rel={buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
              className={clsx(
                'inline-block',
                'px-8 py-3',
                'bg-red text-white',
                'rounded-lg',
                'font-semibold uppercase tracking-wide',
                'transition-opacity',
                'hover:opacity-90',
                'focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2'
              )}
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </Modal>
  )
}

