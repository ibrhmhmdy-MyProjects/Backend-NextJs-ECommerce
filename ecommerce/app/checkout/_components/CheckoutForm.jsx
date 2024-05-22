import React, { useContext, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { CartContext } from '../../_context/CartContext';
import CartApis from '../../_utils/CartApis';
import OrderApis from '../../_utils/OrderApis';

const CheckoutForm = ({ amount }) => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useUser();
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setLoading(false);
            setError('Failed to initialize payment.');
            return;
        }

        try {
            const response = await fetch('api/create-checkout', {
                method: 'POST',
                body: JSON.stringify({ amount: amount })
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session.');
            }

            const session = await response.json();
            const { error } = await stripe.confirmCardPayment(session.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.fullName, // You can dynamically set this value
                    }
                }
            });

            if (error) {
                throw new Error(error.message);
            } else {
                await handleOrderCreation();
                await sendEmailClient();
                router.push('/payment-success');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOrderCreation = async () => {
        try {
            let productIds = cart.map(el => el?.product?.id);
            const orderResponse = await OrderApis.createOrder({
                data: {
                    email: user.primaryEmailAddress.emailAddress,
                    username: user.fullName,
                    amount,
                    products: productIds,
                }
            });

            if (!orderResponse) {
                throw new Error('Failed to create order.');
            }

            await Promise.all(cart.map(async (el) => {
                const result = await CartApis.getDeleteItemCart(el?.id);
                if (!result) {
                    throw new Error('Failed to delete item from cart.');
                }
            }));
            
            setCart([]); // Clear the cart after successful order creation
        } catch (err) {
            throw new Error(err.message);
        }
    };
    const sendEmailClient = async()=>{
        const res = await fetch('/api/send-email',{
            method: 'POST',
        }).then(res => {
            console.log("Email is sended Successfully")
        })
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-3">
            <div className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '22px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
            </div>
            <button disabled={!stripe || loading} className="w-full bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
};

export default CheckoutForm;




// Old Code
// import React, { useContext } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// import { useRouter } from 'next/navigation';
// import { useUser } from '@clerk/nextjs';
// import { CartContext } from '../../_context/CartContext';
// import CartApis from '../../_utils/CartApis';
// import OrderApis from '../../_utils/OrderApis';

// const CheckoutForm = ({amount}) => {
//     const {cart, setCart} = useContext(CartContext);
//     const {user} = useUser();
//     const stripe = useStripe();
//     const elements = useElements();
//     const router = useRouter()
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const response = await fetch('/api/create-checkout', {
//             method: 'POST',
//             body: JSON.stringify({ amount: amount })
//         });
//         const session = await response.json();
//         const { error } = await stripe.confirmCardPayment(session.client_secret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     name: 'Doe John',
//                 }
//             }
//         });
        
//         if (error) {
//             // Show error to your customer
//             console.log(error.message);
//         } else {
//             CreateOrder();
//             // The payment has been processed!
//             console.log('Payment succeeded');
//             router.push('/payment-success');
//         }
//     };

//     const CreateOrder = ()=>{
//         let productIds = [];
//         cart.forEach(el => {
//             productIds.push(el?.product?.id);
//         });
//         OrderApis.createOrder({
//             data: {
    // email: user.primaryEmailAddress.emailAddress,
//             username: user.fullName,
//             amount: amount,
//             products: productIds,
// }
//         }).then(res => {
//             console.log(res)
//             if(res){
//                 cart.forEach(el => {
//                     CartApis.getDeleteItemCart(el?.id).then(result => {
//                         console.log(result);
//                     })
//                 })
//             }
//         })
//       }

//     return (
//         <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-3">
//             <div className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
//                 <CardElement options={{
//                     style: {
//                         base: {
//                             fontSize: '22px',
//                             color: '#424770',
//                             '::placeholder': {
//                                 color: '#aab7c4',
//                             },
//                         },
//                         invalid: {
//                             color: '#9e2146',
//                         },
//                     },
//     }}/>

//             </div>
//         <button  disabled={!stripe} className="w-full bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Pay Now</button>
//     </form>
//     );
// };

// export default CheckoutForm;
