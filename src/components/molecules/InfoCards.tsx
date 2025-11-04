//  libs
import clsx from "clsx"

// components
import InfoCard from "./InfoCard"

//  props
interface Props {
  className?: string
}

export default function InfoCards({ className }: Props) {
  return (
    <div className={clsx(
      'rounded-lg',
      'grid grid-cols-1 lg:grid-cols-3 gap-4',
      'items-stretch',
      'mx-auto',
      'w-full',
      'max-w-[500px] lg:max-w-none',
      className
    )}>
      {/* Card 1: Visual/Branding Card - Image type */}
      <InfoCard
        type="image"
        image="/images/airport-representative.webp"
        title="Meet & Greet Staff"
      />

      {/* Card 2: Transfer Includes Card - Details type */}
      <InfoCard
        type="details"
        image="/images/SUB.webp"
        title="YOUR TRANSFER INCLUDES"
        items={[
          'Private Transportation',
          'Bottled Water',
          'Meet & Greet Staff',
          '20 min. Groceries Shopping Stop'
        ]}
      />

      {/* Card 3: Price Card - Summary type */}
      <InfoCard
        type="summary"
        price="$ 180.00"
        vehicle="Luxury SUV"
        serviceType="One Way"
        destination="Montage"
      />
    </div>
  )
}

