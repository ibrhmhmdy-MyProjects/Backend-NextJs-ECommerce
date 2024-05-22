'use client'
import { CartContext } from '../../../_context/CartContext.js';
import CartApis from '../../../_utils/CartApis.js';
import { useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function ProductInfo({product}) {
  const { user } = useUser();
  const {setCart} = useContext(CartContext);
  const router = useRouter();

  const handleAddToCart = ()=>{
    if(!user){
      router.push('/sign-in');
    }else{
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      CartApis.addToCart(data)
      .then(res => {
        console.log('Cart created successfully', res?.data?.data);
        setCart((oldCart)=> [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            product
          }
        ])

      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  return (
    <div>
        <div className='flex flex-col gap-3 py-6'>
            <div className='py-2'>
                <h2 className='text-[26px]'>{product?.attributes?.title}</h2>    
                <span className='text-[20px] text-gray-500'>{product?.attributes?.category}</span> 
            </div>
            <p className='text-[20px] font-semibold md:hidden lg:block'>{product?.attributes?.description[0]?.children[0].text}</p>
            <div className='flex flex-col gap-3'>
                <span className='text-3xl text-primary font-semibold'>${product?.attributes?.price}</span>
                <button onClick={()=>handleAddToCart()} className='flex  items-center gap-2 bg-teal-400 text-xl w-fit text-white px-5 py-2 rounded-lg hover:bg-primary'>
                    <ShoppingCart size={32}/> Add to Cart
                </button>
            </div>  
        </div>
    </div>
  )
}

export default ProductInfo