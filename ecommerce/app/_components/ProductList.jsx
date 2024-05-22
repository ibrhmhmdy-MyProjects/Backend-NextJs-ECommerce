import React from 'react'
import ProductItem from './ProductItem'

function ProductList({products}) {
  
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
      {products?.map((product)=>(
        <ProductItem key={product.id} productItem={product}/>
      ))}
    </div>
  )
}

export default ProductList