//  libs
import clsx from 'clsx'

//  props
interface Props {
  className?: string
  children: React.ReactNode
}

export default function H3({ className, children }: Props) {
  return (
    <h3 className={clsx('text-lg lg:text-2xl', 'font-bold', className)}>
      {children}
    </h3>
  )
}
