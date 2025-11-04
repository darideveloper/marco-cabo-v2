//  libs
import clsx from "clsx"

// components
import H3 from "../atoms/H3"

//  Type definitions
interface BaseCardProps {
  className?: string
}

interface ImageCardProps extends BaseCardProps {
  type?: 'image'
  image: string
  title?: string
}

interface DetailsCardProps extends BaseCardProps {
  type: 'details'
  image: string
  title: string
  items: string[]
}

interface SummaryCardProps extends BaseCardProps {
  type: 'summary'
  price: string
  vehicle?: string
  serviceType?: string
  destination?: string
}

type InfoCardProps = ImageCardProps | DetailsCardProps | SummaryCardProps

export default function InfoCard(props: InfoCardProps) {
  const { className } = props

  // Default to image type if no type is specified
  if (!props.type || props.type === 'image') {
    const imageProps = props as ImageCardProps
    return (
      <div className={clsx(
        'rounded-lg overflow-hidden',
        'w-full',
        'h-full',
        'min-h-[280px] md:aspect-[4/3]',
        'relative',
        className
      )}>
        <img
          src={imageProps.image}
          alt={imageProps.title || 'Info'}
          className={clsx(
            'w-full h-full object-cover',
            'absolute inset-0'
          )}
        />
      </div>
    )
  }

  if (props.type === 'details') {
    return (
      <div className={clsx(
        'rounded-lg overflow-hidden relative',
        'w-full',
        'h-full',
        'min-h-[280px] md:aspect-[4/3]',
        className
      )}>
        <img
          src={props.image}
          alt={props.title}
          className={clsx(
            'w-full h-full object-cover',
            'absolute inset-0'
          )}
        />
        <div className={clsx(
          'absolute inset-0',
          'bg-black/60'
        )} />
        <div className={clsx(
          'absolute top-0 left-0 right-0 bottom-0',
          'p-3 md:p-6 flex flex-col',
          'justify-center items-center',
          'z-10'
        )}>
          <H3 className={clsx(
            'text-white',
            'uppercase mb-2 md:mb-4',
            'm-0',
            'text-center',
            'text-sm md:text-base'
          )}>
            {props.title}
          </H3>
          <ul className={clsx(
            'text-white text-xs md:text-base',
            'space-y-1 md:space-y-2',
            'list-none',
            'p-0',
            'm-0',
            'text-center'
          )}>
            {props.items.map((item, index) => (
              <li key={index} className={clsx(
                'flex items-center justify-center',
                'font-bold',
                'before:content-["•"]',
                'before:mr-2',
                'before:text-white',
                'before:font-bold'
              )}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (props.type === 'summary') {
    return (
      <div className={clsx(
        'rounded-lg overflow-hidden',
        'bg-black',
        'w-full',
        'h-full',
        'min-h-[280px]',
        'flex flex-col',
        'p-3 md:p-6',
        className
      )}>
        <div className={clsx(
          'flex flex-col items-center',
          'mb-2 md:mb-4',
          'flex-shrink-0'
        )}>
          <H3 className={clsx(
            'text-white',
            'uppercase mb-2 md:mb-4',
            'm-0',
            'text-sm md:text-base'
          )}>
            Price
          </H3>
          <p className={clsx(
            'text-red font-bold text-xl md:text-4xl',
            'm-0',
            'break-words'
          )}>
            {props.price}
          </p>
        </div>
        
        <div className={clsx(
          'bg-grey-dark',
          'rounded-lg',
          'p-3 md:p-4',
          'flex-1',
          'flex flex-col justify-center',
          'mb-2 md:mb-4',
          'min-h-0',
          'overflow-hidden'
        )}>
          <div className={clsx(
            'space-y-2 md:space-y-3',
            'text-white text-xs md:text-base'
          )}>
            {props.vehicle && (
              <div className={clsx('flex flex-row justify-between items-center gap-2')}>
                <span className={clsx('font-medium whitespace-nowrap')}>Vehicle:</span>
                <span className={clsx('text-right break-words')}>{props.vehicle}</span>
              </div>
            )}
            {props.serviceType && (
              <div className={clsx('flex flex-row justify-between items-center gap-2')}>
                <span className={clsx('font-medium whitespace-nowrap')}>Service Type:</span>
                <span className={clsx('text-right break-words')}>{props.serviceType}</span>
              </div>
            )}
            {props.destination && (
              <div className={clsx('flex flex-row justify-between items-center gap-2')}>
                <span className={clsx('font-medium whitespace-nowrap')}>Destination:</span>
                <span className={clsx('text-right break-words')}>{props.destination}</span>
              </div>
            )}
          </div>
        </div>

        <p className={clsx(
          'text-white text-xs md:text-sm',
          'm-0',
          'text-left',
          'flex-shrink-0'
        )}>
          * Prices in USD
        </p>
      </div>
    )
  }

  return null
}

