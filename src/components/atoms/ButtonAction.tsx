//  libs
import clsx from "clsx"

//  props
interface Props {
  className?: string,
  text: string,
  onClick?: () => void,
  isDisabled?: boolean,
}

export default function ButtonAction({ 
  className, 
  text="Start Planning Now",
  onClick,
  isDisabled = false,
}: Props) {

  return (
    <button
      onClick={onClick}
      className={clsx(
        'bg-red',
        'text-white',
        'font-bold',
        'uppercase',
        'px-6 py-3',
        'rounded-lg',
        'transition-all duration-300',
        
        'hover:scale-105',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        isDisabled ? 'opacity-50' : 'opacity-100 hover:opacity-80',
        className
      )}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}
