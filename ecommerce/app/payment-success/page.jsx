'use client'
import {  CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function PaymentSuccess() {
  
  const router = useRouter();
  return (
    <div className='flex flex-col gap-4  items-center my-8  min-h-screen'>
        <CheckCircle size={120} color='green' />
        <h1 className='text-3xl text-center'>Payment Succeeded!</h1>
        <p className='text-sm text-gray-400 text-center'>we sent an email with your order confirmation along with Digital Content</p>
        <button onClick={()=>router.push('/')} className='text-white p-3 text-xl bg-primary rounded-md max-w-fit'>Go to Home</button>
    </div>
  )
}

export default PaymentSuccess