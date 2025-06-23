import React from 'react'
import Image from 'next/image'

const PropertyHeaderImage = ({ image }) => {
  if (!image) return null

  return (
    <section>
      <div className="container-xl m-auto">
        <div className="relative w-full h-[400px]">
          <Image
            src={image}
            alt="Property"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyHeaderImage
