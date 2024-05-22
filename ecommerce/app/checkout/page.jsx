'use client'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
    const searchParams = useSearchParams();
    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: searchParams.get('amount') * 100,
    };

  return (
    <div className='my-32 min-h-screen'>
     <div className='flex justify-center items-center gap-4 flex-col'>
        <h1 className='text-4xl'>Checkout Now</h1>
        <p className='text-md text-gray-400'>Please Fill Your Information Payment Method</p>
      </div>
     <Elements stripe={stripePromise} options={options} >
      <CheckoutForm amount={Number(searchParams.get('amount'))}/>
    </Elements>
   </div>
  )
}

export default Checkout