import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProductItem({productItem}) {
  return (
    <Link href={`/product-details/${productItem.id}`} className='p-1 border-teal-400 hover:border hover:shadow-md rounded-lg hover:cursor-pointer'>
        <Image className='object-cover h-[200px] w-full rounded-t-lg min-w-full' src={productItem?.attributes?.banner?.data?.attributes?.url} alt='Banner Product' width={400} height={400}/>
        <div className='p-5 rounded-b-lg'>
            <h2 className='text-[20px] line-clamp-1'>{productItem.attributes.title}</h2>
            <div className='flex justify-between items-center'>
                <h2 className='text-sm text-gray-400 font-semibold'>{productItem.attributes.category}</h2>
                <span className='text-primary font-bold text-sm'>{productItem?.attributes?.price} L.E</span>
            </div>
        </div>
    </Link>
  )
}

export default ProductItem