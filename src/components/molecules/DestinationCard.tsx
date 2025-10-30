//  libs
import clsx from "clsx"

//  props
interface Props {
    className?: string,
    title: string,
    image: string,
    isSelected?: boolean,
    onClick?: () => void,
}


export default function DestinationCard({ 
  className, 
  title="Destination",
  image="/images/destination.webp",
  isSelected=false,
  onClick }: Props) {

  return (
    <div 
      onClick={onClick}
      className={clsx(
        'rounded-lg overflow-hidden relative',
        'transition-all duration-300',
        'border-4',
        'cursor-pointer',
        'aspect-[4/3]',
        isSelected ? 'border-red shadow-[0_0_20px_rgba(249,41,5,0.6)]' : 'border-transparent',
        className
      )}
    >
      <img 
        src={image} 
        alt={title} 
        className={clsx(
          'w-full h-full object-cover'
        )} 
      />
      
      {/* Centered H2 section - positioned on top of image */}
      <div className={clsx(
        'flex justify-center items-center',
        'absolute top-0 left-0 right-0 bottom-0',
        'p-4'
      )}>
        <h2 className={clsx(
          'text-white font-bold text-xl md:text-4xl',
          'text-center',
          'm-0'
        )}>
          {title}
        </h2>
      </div>
    </div>
  )
}

