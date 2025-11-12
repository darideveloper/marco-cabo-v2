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

  const aosAnimations = [
    'fade-up',
    'fade-down',
  ]

  return (
    <article
      data-aos={aosAnimations[index]}
    >
      <div
        onClick={onClick}
        className={clsx(
          'rounded-lg overflow-hidden relative',
          'transition-all duration-300',
          'border-4',
          'cursor-pointer',
          'aspect-[4/3]',
          isSelected
            ? 'border-red shadow-[0_0_20px_rgba(249,41,5,0.6)]'
            : 'border-transparent',
          className
        )}
      >
        <img
          src={image}
          alt={title}
          className={clsx('w-full h-full object-cover')}
        />

        {/* Overlay gradient for better text readability */}
        <div className={clsx('absolute inset-0')} />

        {/* Centered Title */}
        <div
          className={clsx(
            'flex justify-center items-center',
            'absolute top-0 left-0 right-0 bottom-0',
            'p-4'
          )}
        >
          <H2
            className={clsx(
              'text-white',
              'text-center',
              'm-0',
              'drop-shadow-lg'
            )}
          >
            {title}
          </H2>
        </div>

        {/* Selected Hotel Display - positioned at bottom */}
        {selectedHotel && (
          <div
            className={clsx(
              'absolute bottom-4 left-4 right-4',
              'text-white text-sm',
              'text-center',
              'bg-white/20 backdrop-blur-sm',
              'rounded-lg px-3 py-2'
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
              'rounded-lg px-3 py-2'
            )}
          >
            <div className={clsx('font-semibold')}>
              {selectedPostalCode.name}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
