//  libs
import clsx from 'clsx'

// components
import H2 from '../atoms/H2'

// Icons
import { FaArrowsRotate, FaArrowRight } from 'react-icons/fa6'

//  props
interface Props {
  className?: string
  title: string
  isSelected?: boolean
  onClick?: () => void
}

export default function TripButton({
  className,
  title = 'One Way',
  isSelected = false,
  onClick,
}: Props) {
  const icons = {
    'One Way': <FaArrowRight />,
    'Round Trip': <FaArrowsRotate />,
  }

  const icon = icons[title as keyof typeof icons]

  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-lg overflow-hidden relative',
        'transition-all duration-300',
        'border-4',
        'min-h-[200px]',
        'flex items-center justify-center',
        'cursor-pointer',
        isSelected
          ? 'bg-grey-dark border-red shadow-[0_0_20px_rgba(249,41,5,0.6)]'
          : 'bg-grey-light border-transparent',
        className
      )}
    >
      <H2
        className={clsx(
          'text-white text-2xl lg:text-3xl',
          'm-0',
          'uppercase',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'gap-2'
        )}
      >
        <span>{title}</span>
        <span>{icon}</span>
      </H2>
    </button>
  )
}
