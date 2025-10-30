//  libs
import clsx from "clsx"

//  props
interface Props {
  className?: string,
  text: string,
  onClick?: () => void,
}

export default function ButtonAction({ 
  className, 
  text="Start Planning Now",
  onClick 
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
        'hover:opacity-90',
        'cursor-pointer',
        className
      )}
    >
      {text}
    </button>
  )
}
