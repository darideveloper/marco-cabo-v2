//  libs
import clsx from "clsx"

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
        'aspect-[4/3]',
        className
      )}>
        <img
          src={imageProps.image}
          alt={imageProps.title || 'Info'}
          className={clsx(
            'w-full h-full object-cover'
          )}
        />
      </div>
    )
  }

  if (props.type === 'details') {
    return (
      <div className={clsx(
        'rounded-lg overflow-hidden relative',
        'aspect-[4/3]',
        className
      )}>
        <img
          src={props.image}
          alt={props.title}
          className={clsx(
            'w-full h-full object-cover'
          )}
        />
        <div className={clsx(
          'absolute top-0 left-0 right-0 bottom-0',
          'p-6 flex flex-col',
          'justify-center items-center'
        )}>
          <h3 className={clsx(
            'text-white font-bold text-lg md:text-2xl',
            'uppercase mb-4',
            'm-0',
            'text-center'
          )}>
            {props.title}
          </h3>
          <ul className={clsx(
            'text-white text-sm md:text-base',
            'space-y-2',
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
        'aspect-[4/3]',
        'flex flex-col',
        'p-6',
        className
      )}>
        <div className={clsx(
          'flex flex-col items-center',
          'mb-4'
        )}>
          <h3 className={clsx(
            'text-white font-bold text-lg md:text-2xl',
            'uppercase mb-4',
            'm-0'
          )}>
            Price
          </h3>
          <p className={clsx(
            'text-red font-bold text-2xl md:text-4xl',
            'm-0'
          )}>
            {props.price}
          </p>
        </div>
        
        <div className={clsx(
          'bg-grey-dark',
          'rounded-lg',
          'p-4',
          'flex-1',
          'flex flex-col justify-center',
          'mb-4'
        )}>
          <div className={clsx(
            'space-y-3',
            'text-white text-sm md:text-base'
          )}>
            {props.vehicle && (
              <div className={clsx('flex justify-between')}>
                <span className={clsx('font-medium')}>Vehicle:</span>
                <span>{props.vehicle}</span>
              </div>
            )}
            {props.serviceType && (
              <div className={clsx('flex justify-between')}>
                <span className={clsx('font-medium')}>Service Type:</span>
                <span>{props.serviceType}</span>
              </div>
            )}
            {props.destination && (
              <div className={clsx('flex justify-between')}>
                <span className={clsx('font-medium')}>Destination:</span>
                <span>{props.destination}</span>
              </div>
            )}
          </div>
        </div>

        <p className={clsx(
          'text-white text-xs md:text-sm',
          'm-0',
          'text-left'
        )}>
          * Prices in USD
        </p>
      </div>
    )
  }

  return null
}

