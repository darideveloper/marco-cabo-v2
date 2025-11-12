//  libs
import clsx from 'clsx'

// Icons
import { IoFingerPrint } from 'react-icons/io5'

//  props
interface Props {
  className?: string
  title: string
  numberOfGuests: number
  image: string
  isSelected?: boolean
  onClick?: () => void
  index: number
}

export default function CardVehicle({
  className,
  title = 'Luxury SUV',
  numberOfGuests = 4,
  image = '/images/Sprinter.webp',
  isSelected = false,
  onClick,
  index,
}: Props) {
  return (
    <article
      data-aos='fade-up'
      data-aos-delay={index * 500}
      className={clsx('group')}
    >
      <div
        onClick={onClick}
        className={clsx(
          'rounded-lg overflow-hidden relative',
          'transition-all duration-300',
          'border-4',
          'cursor-pointer',
          isSelected
            ? 'border-red shadow-[0_0_20px_rgba(249,41,5,0.6)]'
            : 'border-transparent',
          className,
          'debug'
        )}
      >
        <div
          className={clsx(
            'absolute',
            'bottom-1/2 lg:bottom-0',
            'left-1/2',
            '-translate-x-1/2',
            '-translate-y-1/2 lg:translate-y-0',
            'z-10',
            isSelected ? 'opacity-60' : 'opacity-0',
            'transition-all',
            'duration-700',
            '-mb-6 lg:mb-4'
          )}
        >
          <IoFingerPrint className={clsx('text-red', 'text-6xl lg:text-4xl')} />
        </div>

        <img
          src={image}
          alt={title}
          className={clsx(
            'w-full',
            isSelected ? 'scale-110' : 'group-hover:scale-110',
            isSelected ? 'opacity-100' : 'opacity-80 group-hover:opacity-100',
            'transition-all duration-300'
          )}
        />

        {/* Bottom text section - positioned on top of image */}
        <div
          className={clsx(
            'flex flex-col lg:flex-row justify-between items-center lg:items-center',
            'absolute bottom-0 left-0 right-0',
            'p-4',
            'gap-2'
          )}
        >
          <p className={clsx('text-white font-medium text-lg', 'm-0')}>
            {title}
          </p>
          <p className={clsx('text-white text-sm', 'm-0')}>
            {numberOfGuests} guest maximum
          </p>
        </div>
      </div>
    </article>
  )
}
