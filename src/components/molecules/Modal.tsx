// libs
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  /**
   * Maximum width of the modal content
   * @default 'max-w-md'
   */
  maxWidth?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl'
  /**
   * Padding inside the modal
   * Can be a predefined size or a custom Tailwind class string
   * @default 'p-6'
   */
  padding?: 'p-4' | 'p-6' | 'p-8' | string
  /**
   * Border radius of the modal
   * @default 'rounded-lg'
   */
  borderRadius?: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl'
  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Custom aria label for close button
   * @default 'Close modal'
   */
  closeButtonAriaLabel?: string
  /**
   * Whether to handle Escape key
   * @default true
   */
  handleEscapeKey?: boolean
  /**
   * Whether to use advanced animations (scale + translate)
   * @default true
   */
  useAdvancedAnimations?: boolean
  /**
   * Custom className for the modal content
   */
  contentClassName?: string
  /**
   * Custom className for the overlay
   */
  overlayClassName?: string
  /**
   * Whether to allow content to overflow (useful for dropdowns)
   * @default false
   */
  allowOverflow?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-md',
  padding = 'p-6',
  borderRadius = 'rounded-lg',
  animationDuration = 300,
  showCloseButton = true,
  closeButtonAriaLabel = 'Close modal',
  handleEscapeKey = true,
  useAdvancedAnimations = true,
  contentClassName,
  overlayClassName,
  allowOverflow = false,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(true) // Start with true to show initial closed state

  // Handle closing animation
  const handleClose = () => {
    // Always use closing animation for smooth exit
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, animationDuration)
  }

  // Handle Escape key
  useEffect(() => {
    if (!isOpen || !handleEscapeKey) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [
    isOpen,
    handleEscapeKey,
    useAdvancedAnimations,
    animationDuration,
    onClose,
  ])

  // Handle opening animation - ensure smooth enter animation
  useEffect(() => {
    if (isOpen && !isClosing) {
      // Start with opening state (closed position) for both animation types
      setIsOpening(true)
      // Use setTimeout to ensure DOM is ready, then trigger animation
      const timer = setTimeout(() => {
        setIsOpening(false)
      }, 10) // Small delay to ensure initial state is rendered
      return () => clearTimeout(timer)
    }
  }, [isOpen, isClosing])

  // Reset animation states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false)
      setIsOpening(true) // Reset to true so next open starts from closed state
    }
  }, [isOpen])

  // Don't render if not open and not animating
  if (!isOpen && !isClosing) return null

  const isAnimating = isOpening || isClosing

  // Get duration class based on animationDuration
  const getDurationClass = (duration: number) => {
    if (duration <= 150) return 'duration-150'
    if (duration <= 200) return 'duration-200'
    if (duration <= 300) return 'duration-300'
    if (duration <= 500) return 'duration-500'
    return 'duration-700'
  }

  const durationClass = getDurationClass(animationDuration)

  // Animation classes
  const overlayClasses = clsx(
    'fixed inset-0 z-50',
    'flex items-center justify-center',
    'overflow-y-auto',
    'py-4',
    'bg-black/60',
    'transition-opacity',
    durationClass,
    'ease-out',
    // Overlay fades in on open, fades out on close
    isOpening || isClosing ? 'opacity-0' : 'opacity-100',
    overlayClassName
  )

  const contentClasses = clsx(
    'bg-white',
    borderRadius,
    padding,
    maxWidth,
    'w-full mx-4',
    'max-h-[90vh]',
    allowOverflow ? 'overflow-visible' : 'overflow-y-auto',
    'shadow-xl',
    'relative',
    contentClassName,
    useAdvancedAnimations
      ? clsx(
          'transition-all',
          durationClass,
          'ease-out',
          // Enhanced enter animation: starts smaller, lower, and transparent
          isOpening
            ? 'opacity-0 scale-90 translate-y-4'
            : isClosing
            ? 'opacity-0 scale-90 translate-y-4' // Enhanced exit: same as enter but reversed
            : 'opacity-100 scale-100 translate-y-0'
        )
      : clsx(
          'transform transition-all',
          durationClass,
          'ease-out',
          // Simple animations: fade and scale in/out
          isOpening
            ? 'opacity-0 scale-95'
            : isClosing
            ? 'opacity-0 scale-95' // Exit animation matches enter
            : 'opacity-100 scale-100'
        )
  )

  return (
    <div
      className={overlayClasses}
      onClick={handleClose}
    >
      <div
        className={contentClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type='button'
            onClick={handleClose}
            className={clsx(
              'absolute top-4 right-4',
              'text-gray-500 hover:text-gray-700',
              'text-2xl font-bold',
              'w-8 h-8',
              'flex items-center justify-center',
              'rounded-full hover:bg-gray-100',
              'transition-colors',
              'z-10'
            )}
            aria-label={closeButtonAriaLabel}
          >
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
