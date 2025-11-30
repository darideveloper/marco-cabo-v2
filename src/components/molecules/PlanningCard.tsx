//  libs
import clsx from 'clsx'

// components
import ButtonAction from '../atoms/ButtonAction'
import H2 from '../atoms/H2'

//  props
interface Props {
  className?: string
  title1?: string
  title2?: string
  buttonText?: string
  onClick?: () => void
}

export default function PlanningCard({
  className,
  title1 = 'EXPERIENCES',
  title2 = 'VACATION PLANNING',
  buttonText = 'START PLANNING NOW',
  onClick,
}: Props) {
  return (
    <div
      className={clsx(
        'rounded-lg overflow-hidden',
        'bg-grey-dark',
        'flex flex-col',
        'justify-between lg:justify-center',
        'p-4 md:p-6 lg:p-8',
        'items-center',
        className
      )}
      data-aos='fade-up'
      suppressHydrationWarning
    >
      <div className={clsx('flex flex-col', 'items-center', 'mt-0 lg:mt-0')}>
        <H2
          className={clsx(
            'text-white text-2xl! lg:text-4xl!',
            'uppercase',
            'text-center',
            'm-0 mb-2'
          )}
        >
          {title1}
        </H2>
        <span
          className={clsx(
            'font-bold',
            'text-white text-2xl lg:text-4xl',
            'm-0'
          )}
        >
          &
        </span>
        <H2
          className={clsx(
            'text-white text-2xl lg:text-4xl!',
            'uppercase',
            'text-center',
            'm-0 mb-4'
          )}
        >
          {title2}
        </H2>
      </div>

      <div className={clsx('mt-auto lg:mt-0', 'w-full', 'flex justify-center')}>
        <ButtonAction
          text={buttonText}
          onClick={onClick}
        />
      </div>
    </div>
  )
}
