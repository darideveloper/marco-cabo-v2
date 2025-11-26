//  libs
import clsx from 'clsx'

// components
import H2 from '../atoms/H2'

//  props
interface Props {
  className?: string
  title: string
  image: string
  isSelected?: boolean
  onClick?: () => void
  selectedHotel?: { name: string; hotelName: string } | null
  selectedPostalCode?: { name: string } | null
  index: number
}

export default function DestinationCard({
  className,
  title,
  image,
  isSelected,
  onClick,
  selectedHotel,
  selectedPostalCode,
  index,
}: Props) {
  const aosAnimations = ['fade-up', 'fade-down']

  return (
    <article
      data-aos={aosAnimations[index]}
      suppressHydrationWarning
    >
      <button
        onClick={onClick}
        type="button"
        aria-label={`Select ${title} destination`}
        aria-pressed={isSelected}
        className={clsx(
          'rounded-lg overflow-hidden relative',
          'transition-all duration-300',
          'border-4',
          'cursor-pointer',
          'aspect-4/3',
          'w-full',
          'bg-transparent',
          'p-0',
          isSelected
            ? 'border-red shadow-[0_0_20px_rgba(249,41,5,0.6)]'
            : 'border-transparent',
          'group',
          className
        )}
      >
        <img
          src={image}
          alt={`${title} Destination Selection - Los Cabos Transportation - Mar Co. CABO`}
          title={`${title} - Choose Your Los Cabos Destination`}
          loading="lazy"
          decoding="async"
          className={clsx(
            'w-full h-full object-cover',
            'transition-all duration-300',
            isSelected ? 'scale-105' : 'group-hover:scale-105',
            isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
          )}
        />

        {/* Overlay gradient for better text readability */}
        <div className={clsx('absolute inset-0')} />

        {/* Centered Title with overlay */}
        <H2
          className={clsx(
            'text-white',
            'text-center',
            'm-0',
            'drop-shadow-lg',
            'inline-block',
            'text-shadow-black/40',
            isSelected ? 'scale-115' : 'scale-100 group-hover:scale-115',
            'transition-all duration-300',
            'w-full',
            'absolute',
            'top-1/2',
            'left-1/2',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'z-20',
            'py-4'
          )}
        >
          {title}

          <span
            className={clsx(
              'absolute',
              'bottom-0',
              'left-0',
              'right-0',
              'top-0',
              'bg-black/40',
              'blur-sm',
              '-z-10'
            )}
          />
        </H2>

        {/* Selected Hotel Display - positioned at bottom */}
        {selectedHotel && (
          <div
            className={clsx(
              'absolute bottom-4 left-4 right-4',
              'text-white text-sm',
              'text-center',
              'bg-white/20 backdrop-blur-sm',
              'rounded-lg px-3 py-2',
              'z-20'
            )}
          >
            <div className={clsx('font-semibold')}>{selectedHotel.name}</div>
            <div className={clsx('text-xs opacity-90')}>
              {selectedHotel.hotelName}
            </div>
          </div>
        )}

        {/* Selected Postal Code Display - positioned at bottom */}
        {selectedPostalCode && (
          <div
            className={clsx(
              'absolute bottom-4 left-4 right-4',
              'text-white text-sm',
              'text-center',
              'bg-white/20 backdrop-blur-sm',
              'rounded-lg px-3 py-2',
              'z-20'
            )}
          >
            <div className={clsx('font-semibold')}>
              {selectedPostalCode.name}
            </div>
          </div>
        )}

        <div
          className={clsx(
            'overlay',
            'bg-linear-to-b from-transparent to-black/50',
            'w-full',
            'h-1/2',
            'absolute',
            'z-10',
            'bottom-0',
            'left-0',
            'transition-all duration-600',
            selectedPostalCode || selectedHotel ? 'opacity-100' : 'opacity-0'
          )}
        />
      </button>
    </article>
  )
}
