//  libs
import clsx from 'clsx'

// components
import VideoCard from './VideoCard'
import PlanningCard from './PlanningCard'

//  props
interface Props {
  className?: string
}

export default function PlanningCards({ className }: Props) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 lg:grid-cols-2 gap-4',
        'mx-auto',
        'w-full',
        'max-w-[500px] lg:max-w-none',
        className
      )}
    >
      {/* Video Card */}
      <VideoCard videoUrl='https://www.youtube.com/watch?v=Y0LySXt64Qo' />

      {/* Planning Card */}
      <PlanningCard
        title1='EXPERIENCES'
        title2='VACATION PLANNING'
        buttonText='START PLANNING NOW'
      />
    </div>
  )
}
