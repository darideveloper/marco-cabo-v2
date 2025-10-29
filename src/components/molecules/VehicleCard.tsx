//  libs
import clsx from "clsx"

//  props
interface Props {
    className?: string,
    title: string,
    numberOfGuests: number,
    image: string,
    isSelected?: boolean,
}


export default function CardVehicle({ 
  className, 
  title="Luxury SUV",
  numberOfGuests=4,
  image="/images/Sprinter.webp",
  isSelected=false }: Props) {

  return (
    <div className={clsx(
      'rounded-lg overflow-hidden relative',
      'transition-all duration-300',
      'border-4',
      isSelected ? 'border-red shadow-[0_0_20px_rgba(249,41,5,0.6)]' : 'border-transparent',
      className
    )}>
      <img src={image} alt={title} className={clsx('w-full')} />
      
      {/* Bottom text section - positioned on top of image */}
      <div className={clsx(
        'flex flex-col md:flex-row justify-between items-center md:items-center',
        'absolute bottom-0 left-0 right-0',
        'p-4',
        'gap-2'
      )}>
        <p className={clsx(
          'text-white font-medium text-lg',
          'm-0'
        )}>
          {title}
        </p>
        <p className={clsx(
          'text-white text-sm',
          'm-0'
        )}>
          {numberOfGuests} guest maximum
        </p>
      </div>
    </div>
  )
}