//  libs
import clsx from 'clsx'

//  props
interface Props {
  placeId?: string
  className?: string
}

export default function LeaveReviewButton({ placeId, className }: Props) {
  if (!placeId) {
    return null
  }

  return (
    <a
      href={`https://search.google.com/local/writereview?placeid=${placeId}`}
      target='_blank'
      rel='noopener noreferrer'
      className={clsx(
        'inline-flex',
        'items-center',
        'justify-center',
        'text-sm',
        'sm:text-base',
        'text-white',
        'bg-red',
        'font-semibold',
        'whitespace-nowrap',
        'px-6',
        'py-3',
        'rounded-md',
        'transition-all',
        'duration-300',
        'hover:opacity-90',
        'hover:scale-105',
        className
      )}
    >
      Leave a Review
    </a>
  )
}

