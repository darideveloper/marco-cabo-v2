//  libs
import clsx from "clsx"

//  props
interface Props {
  className?: string,
  children: React.ReactNode,
}

export default function H2({ 
  className, 
  children 
}: Props) {
  return (
    <h2 className={clsx(
      'text-xl md:text-4xl',
      'font-bold',
      className
    )}>
      {children}
    </h2>
  )
}

