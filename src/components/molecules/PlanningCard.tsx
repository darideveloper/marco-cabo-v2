//  libs
import clsx from "clsx"

// components
import ButtonAction from "../atoms/ButtonAction"

//  props
interface Props {
  className?: string,
  title1?: string,
  title2?: string,
  buttonText?: string,
  onClick?: () => void,
}

export default function PlanningCard({ 
  className, 
  title1="EXPERIENCES",
  title2="VACATION PLANNING",
  buttonText="START PLANNING NOW",
  onClick
}: Props) {

  return (
    <div className={clsx(
      'rounded-lg overflow-hidden',
      'bg-grey-dark',
      'aspect-[2/1]',
      'flex flex-col',
      'justify-between',
      'p-6 md:p-8',
      'items-center',
      className
    )}>
      <div className={clsx(
        'flex flex-col',
        'items-center',
        'mt-8'
      )}>
        <h2 className={clsx(
          'text-white font-bold text-3xl md:text-5xl',
          'uppercase',
          'text-center',
          'm-0 mb-2'
        )}>
          {title1}
        </h2>
        <span className={clsx(
          'text-white text-2xl md:text-4xl',
          'm-0'
        )}>
          &
        </span>
        <h2 className={clsx(
          'text-white font-bold text-3xl md:text-5xl',
          'uppercase',
          'text-center',
          'm-0 mt-2'
        )}>
          {title2}
        </h2>
      </div>

      <div className={clsx(
        'mt-auto',
        'w-full',
        'flex justify-center'
      )}>
        <ButtonAction 
          text={buttonText}
          onClick={onClick}
        />
      </div>
    </div>
  )
}

