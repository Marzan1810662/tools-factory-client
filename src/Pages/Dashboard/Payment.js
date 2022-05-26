import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51L1WjvBBwhDAgChMqzBnk5Qkj5kV3CYs81f5qaGIa8UxM7O6gE4P7oubb9ZtBhHwwLJuh1Qjc6hdS2wcgzRYW3sE00PqFu1ZCy');


const Payment = () => {
    const { id } = useParams();

    const { data: order, isLoading } = useQuery(['order', id], () =>
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())); 

   if (isLoading) {
        return <LoadingSpinner/>
    } 

    return (
        <div>
        <div className="card w-50 max-w-md mx-auto bg-base-100 shadow-xl my-12">
            <div className="card-body border">
                <h2 className="card-title mx-auto"> Order Id: {order._id}</h2>
                <p className="text-left">Name : <strong>{order.userName}</strong> </p>
                <p className='text-left'>Product Name : <strong>{order.productName}</strong></p>
                <p className='text-left'>Product quantity : {order?.orderedQty}</p>
                <p className='text-left'>Amount : {order?.priceAmount} $</p>
            </div>
            <div className="card-body my-4 border">
                <Elements stripe={stripePromise}>
                    <Checkout order={order}/>
                </Elements>
            </div>
        </div>

    </div>
    );
};

export default Payment;