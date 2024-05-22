import React, { useContext, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import Link from 'next/link';
import CartApis from '../_utils/CartApis';

function Cart() {
    const [openCart, setOpenCart] = useState(false);
    const {cart, setCart} = useContext(CartContext);
    const getTotalPrice = ()=>{
      let totalPrice = 0;
      cart.forEach(item => {
         totalPrice = totalPrice + Number(item?.product?.attributes?.price)
      });
      return totalPrice
  }
  const deleteItemCart = (id)=>{
    CartApis.getDeleteItemCart(id).then(res => {
        if(res) {
            setCart((oldCart) => oldCart.filter(item =>item.id !== res?.data?.data?.id))
        }
    }).catch(error=>console.log(error))
  }


  return !openCart && 
    <div
  className="absolute w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[800px]  sm:h-[500px] right-0 md:right-10 top-12 z-10 mx-5 p-5 overflow-auto bg-gray-100 shadow-sm rounded-md border"
>
  <div className="mt-4 space-y-6">
    <ul className="space-y-4">
        {console.log(cart)}
        {cart?.map((item) => (
            <li key={item?.id} className="flex items-center gap-4 border-b py-2 flex-col sm:flex-row" onClick={()=>setOpenCart(false)}>
                <Link href={`/product-details/${item?.product?.id}`} >
                    <div className='w-[100px] h-[100px] flex items-stretch'>
                      <img
                      src={item?.product?.attributes?.banner?.data?.attributes?.url}
                      alt="Banner Product"
                      className=" rounded object-cover"

                      />
                    </div>
                </Link>
                <div>
                  <h3 className="text-sm text-gray-900">{item?.product?.attributes?.title}</h3>

                  <div className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div className='flex gap-2 items-center text-sm'>
                          <span className="inline">Category:</span>
                          <span className="inline">{item?.product?.attributes?.category}</span>
                      </div>

                      <div className='flex gap-2 items-center text-sm'>
                          <span className="inline">Price:</span>
                          <span className="inline">${item?.product?.attributes?.price}</span>
                      </div>
                  </div>
                </div>
                <button className="bg-gray-300 text-sm p-2 w-full rounded-md  text-gray-600 transition border-1 border-black hover:text-red-600 flex items-center justify-center md:flex-col" onClick={()=>deleteItemCart(item?.id)}>
                  <span className="sr-only">Remove item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Remove
                </button>
            
            </li>
        ))}
    </ul>

    <div className="space-y-4 text-center">
      <Link
        href="/cart"
        className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
      >
        View my cart ({cart?.length})
      </Link>

      <Link
        href={`/checkout?amount=${getTotalPrice()}`} 
        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
      >
        Checkout
      </Link>

      <Link
        href="/"
        className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
      >
        Continue shopping
      </Link>
    </div>
  </div>
</div>

  
}

export default Cart