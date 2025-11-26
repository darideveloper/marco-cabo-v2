//  libs
import clsx from 'clsx'

// components
import H3 from '../atoms/H3'

//  Type definitions
interface BaseCardProps {
  className?: string
  aosAnimation?: string
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

export default function InfoCard({
  className,
  aosAnimation = '',
  ...props
}: InfoCardProps) {
  // Default to image type if no type is specified
  if (!props.type || props.type === 'image') {
    const imageProps = props as ImageCardProps
    return (
      <div
        className={clsx(
          'rounded-lg overflow-hidden',
          'w-full',
          'h-full',
          'aspect-4/3',
          'relative',
          className
        )}
        data-aos={aosAnimation}
        suppressHydrationWarning
      >
        <img
          src={imageProps.image}
          alt={
            imageProps.title
              ? `${imageProps.title} - Mar Co. CABO Los Cabos Transportation Services`
              : 'Mar Co. CABO Transportation Services in Los Cabos'
          }
          title={
            imageProps.title
              ? `${imageProps.title} - Los Cabos Transportation`
              : 'Mar Co. CABO Transportation Services'
          }
          className={clsx('w-full h-full object-cover', 'absolute inset-0')}
        />
      </div>
    )
  }

  if (props.type === 'details') {
    return (
      <div
        className={clsx(
          'rounded-lg overflow-hidden relative',
          'w-full',
          'h-full',
          'aspect-4/3',
          className
        )}
        data-aos={aosAnimation}
        suppressHydrationWarning
      >
        <img
          src={props.image}
          alt={`${props.title} - Mar Co. CABO Los Cabos Transportation Services`}
          title={`${props.title} - Los Cabos Transportation`}
          className={clsx('w-full h-full object-cover', 'absolute inset-0')}
        />
        <div className={clsx('absolute inset-0', 'bg-black/60')} />
        <div
          className={clsx(
            'absolute top-0 left-0 right-0 bottom-0',
            'p-3 lg:p-6 flex flex-col',
            'justify-center items-center',
            'z-10'
          )}
        >
          <H3
            className={clsx(
              'text-white',
              'uppercase mb-2 lg:mb-4',
              'text-2xl! lg:text-4xl!',
              'm-0',
              'text-center'
            )}
          >
            {props.title}
          </H3>
          <ul
            className={clsx(
              'text-white text-xs lg:text-base',
              'space-y-1 lg:space-y-2',
              'list-none',
              'p-0',
              'm-0',
              'text-center'
            )}
          >
            {props.items.map((item, index) => (
              <li
                key={index}
                className={clsx(
                  'flex items-center justify-center',
                  'font-bold',
                  'text-base! lg:text-lg!'
                )}
              >
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
      <div
        className={clsx(
          'rounded-lg overflow-hidden',
          'bg-black',
          'w-full',
          'h-full',
          'flex flex-col',
          'p-3 lg:p-6',
          className
        )}
        data-aos={aosAnimation}
        suppressHydrationWarning
      >
        <div
          className={clsx(
            'flex flex-col items-center',
            'mb-2 lg:mb-4',
            'shrink-0'
          )}
        >
          <H3
            className={clsx(
              'text-white',
              'uppercase mb-2 lg:mb-4',
              'm-0',
              'text-sm lg:text-base'
            )}
          >
            Price
          </H3>
          <p
            className={clsx(
              'text-red font-bold text-xl lg:text-4xl',
              'wrap-break-words',
              '-ml-4!'
            )}
          >
            {props.price}
          </p>
        </div>

        <div
          className={clsx(
            'bg-grey-dark',
            'rounded-lg',
            'p-3 lg:p-4',
            'flex-1',
            'flex flex-col justify-center',
            'mb-2 lg:mb-4',
            'overflow-hidden'
          )}
        >
          <div
            className={clsx(
              'space-y-2 lg:space-y-3',
              'text-white text-xs lg:text-base'
            )}
          >
            {props.vehicle && (
              <div
                className={clsx(
                  'flex flex-row justify-between items-center gap-2 border-b border-white/60 pb-2'
                )}
              >
                <span className={clsx('font-medium whitespace-nowrap')}>
                  Vehicle:
                </span>
                <span className={clsx('text-right wrap-break-words')}>
                  {props.vehicle}
                </span>
              </div>
            )}
            {props.serviceType && (
              <div
                className={clsx(
                  'flex flex-row justify-between items-center gap-2 border-b border-white/60 pb-2tr '
                )}
              >
                <span className={clsx('font-medium whitespace-nowrap')}>
                  Service Type:
                </span>
                <span className={clsx('text-right wrap-break-words')}>
                  {props.serviceType}
                </span>
              </div>
            )}
            {props.destination && (
              <div
                className={clsx(
                  'flex flex-row justify-between items-center gap-2'
                )}
              >
                <span className={clsx('font-medium whitespace-nowrap')}>
                  Destination:
                </span>
                <span className={clsx('text-right wrap-break-words')}>
                  {props.destination}
                </span>
              </div>
            )}
          </div>
        </div>

        <p
          className={clsx(
            'text-white text-xs lg:text-sm',
            'm-0',
            'text-center',
            'shrink-0'
          )}
        >
          Prices in USD
        </p>
      </div>
    )
  }

  return null
}
