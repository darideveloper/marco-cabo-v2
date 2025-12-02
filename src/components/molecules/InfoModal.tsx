// libs
import clsx from 'clsx'

// components
import Modal from './Modal'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  type?: 'error' | 'success' | 'info'
  showCloseButton?: boolean
}

export default function InfoModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  showCloseButton = true,
}: InfoModalProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          iconBg: 'bg-red-100',
          iconText: 'text-red-600',
          titleColor: 'text-red-900',
          messageColor: 'text-red-700',
          borderColor: 'border-red-200',
        }
      case 'success':
        return {
          iconBg: 'bg-green-100',
          iconText: 'text-green-600',
          titleColor: 'text-green-900',
          messageColor: 'text-green-700',
          borderColor: 'border-green-200',
        }
      default:
        return {
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
          titleColor: 'text-blue-900',
          messageColor: 'text-blue-700',
          borderColor: 'border-blue-200',
        }
    }
  }

  const styles = getTypeStyles()
  const defaultTitle = type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Information'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      padding="p-6"
      borderRadius="rounded-xl"
      animationDuration={300}
      useAdvancedAnimations={true}
      showCloseButton={showCloseButton}
      closeButtonAriaLabel="Close modal"
    >
      <div className={clsx('flex items-start gap-4')}>
        {/* Icon */}
        <div className={clsx('flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center', styles.iconBg)}>
          {type === 'error' && (
            <svg className={clsx('w-6 h-6', styles.iconText)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {type === 'success' && (
            <svg className={clsx('w-6 h-6', styles.iconText)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === 'info' && (
            <svg className={clsx('w-6 h-6', styles.iconText)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={clsx('text-lg font-semibold mb-2', styles.titleColor)}>
            {title || defaultTitle}
          </h3>
          <p className={clsx('text-sm', styles.messageColor)}>
            {message}
          </p>
        </div>
      </div>
    </Modal>
  )
}


