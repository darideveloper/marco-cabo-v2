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
      data-aos-delay={(index + 1) * 500}
      className={clsx('group')}
      suppressHydrationWarning
    >
      <button
        onClick={onClick}
        type="button"
        aria-label={`Select ${title} vehicle for up to ${numberOfGuests} guests`}
        aria-pressed={isSelected}
        className={clsx(
          'rounded-lg overflow-hidden relative',
          'transition-all duration-300',
          'border-4',
          'cursor-pointer',
          'w-full',
          'bg-transparent',
          'p-0',
          isSelected
            ? 'border-red shadow-[0_0_20px_rgba(249,41,5,0.6)]'
            : 'border-transparent',
          className
        )}
      >
        <div
          className={clsx(
            'overlay',
            'bg-linear-to-b from-transparent to-black',
            'w-full',
            'h-1/2',
            'absolute',
            'z-10',
            'bottom-0',
            'left-0'
          )}
        />

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
          alt={`${title} - Luxury Vehicle for ${numberOfGuests} Guests - Mar Co. CABO Los Cabos Transportation`}
          title={`${title} Vehicle - Up to ${numberOfGuests} Passengers - Los Cabos`}
          loading="lazy"
          decoding="async"
          className={clsx(
            'w-full',
            isSelected ? 'scale-110' : 'group-hover:scale-110',
            isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100',
            'transition-all duration-300'
          )}
        />

        {/* Bottom text section - positioned on top of image */}
        <div
          className={clsx(
            'flex flex-col lg:flex-row justify-between items-center lg:items-center',
            'absolute bottom-0 left-0 right-0',
            'p-4',
            'gap-2',
            'z-20',
            'transition-all duration-1000',
            isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'
          )}
        >
          <p className={clsx('text-white font-medium text-lg', 'm-0')}>
            {title}
          </p>
          <p className={clsx('text-white text-sm', 'm-0')}>
            {numberOfGuests} guest maximum
          </p>
        </div>
      </button>
    </article>
  )
}
