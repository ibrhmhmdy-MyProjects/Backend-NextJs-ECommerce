import Image from 'next/image'
import React from 'react'

function ProductBanner({banner}) {
  return (
    <div>
        <Image 
        src={banner?.url} 
        alt='Banner Product' 
        width={400} 
        height={400}
        className='rounded-lg min-w-full'/>
    </div>
  )
}

export default ProductBanner