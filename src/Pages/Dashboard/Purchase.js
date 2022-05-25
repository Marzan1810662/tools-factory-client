import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Purchase = () => {
    const [user, loading, error] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors }, getFieldState } = useForm();
    const { id } = useParams();
    const [disable, setDisable] = useState(false);
    const { data: tool, isLoading } = useQuery('tool',
        () => fetch(`https://tools-factory.herokuapp.com/tool/${id}`)
            .then(res => res.json())
    )
    if (isLoading) {
        return <LoadingSpinner />
    }

    const handleQuantity = (qty) => {
        console.log(typeof qty);
        const quantity = parseInt(qty);
        const minOrderQty = parseInt(tool.minOrderQty);
        const stockQty = parseInt(tool.stockQty)
        if (quantity < minOrderQty) {
            Swal.fire({
                icon: 'warning',
                text: `Minimum order quanty is ${minOrderQty}. Quantity must be greater than minimum order quantity`
            })
            setDisable(true)
            return
        }
        else if (quantity > stockQty) {
            Swal.fire({
                icon: 'warning',
                text: `In Stock quantity is ${stockQty}.Quantity must be smaller or equal to in stock quantity`
            })
            setDisable(true)
        }
        setDisable(false)
    }

    const onSubmit = async data => {
        const amount = parseFloat(tool.price) * parseInt(data.qty);
        console.log(data);
        const OrderdInformation = {
            userName: user.displayName,
            userEmail: user.email,
            userPhone: data.phone,
            shippingAddress: data.address,
            productName: tool.productName,
            minOrderQty: tool.minOrderQty,
            orderedQty: data.qty,
            priceAmount: amount
        }
        console.log(OrderdInformation);
        fetch('https://tools-factory.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(OrderdInformation)
        })
            .then(res => {
                if (res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    Navigate('/login');
                }
                return res.json();
            })
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        text: `Your order is placed.Proceed to payment`
                    })
                }
            })
    }

    return (
        <div className='md:w-2/4 mx-2 md:mx-auto my-12'>
            <div className="card lg:card-side bg-base-100 border shadow-xl p-4">
                <figure><img className='w-3/4' src={tool.productImage} alt={tool.productName} /></figure>
                <div className="card-body md:ml-10">
                    <h2 className="card-title text-3xl">{tool.productName}</h2>
                    <p className='text-left break-words'><strong>Description: </strong>{tool.productDescription}</p>
                    <p className='text-left'><strong>In Stock:</strong> {tool.stockQty}</p>
                    <p className='text-left'><strong>Minimum Order Quantity:</strong> {tool.minOrderQty}</p>
                    <p className='text-left'><strong>Price per Unit:</strong> {tool.price} </p>
                </div>
            </div>
            <div className='lg:w-3/4 border rounded-md my-4 mx-auto'>
                <div className="card-body">
                    <h1 className='text-2xl font-bold mb-5'>Order Information</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Name</span>
                            </label>
                            <input {...register("name")}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                defaultValue={user?.displayName}
                                disabled={true}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input {...register("email")}
                                type="email"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                defaultValue={user.email}
                                disabled={true}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold"> Quantity</span>
                            </label>
                            <input {...register("qty", {
                                required: {
                                    value: true,
                                    message: 'Product  quantity is required'
                                },
                            })}
                                name="qty"
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                min={1}
                                onBlur={(e) => handleQuantity(e.target.value)}
                            />
                            <label className="label">
                                {errors.qty?.type === 'required' && <span className="label-text-alt text-red-500">{errors.qty.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Phone</span>
                            </label>
                            <input {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Phone number is required"
                                }
                            })}
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                            />
                            <label className="label">
                                {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Shipping Address </span>
                            </label>
                            <textarea {...register("address", {
                                required: {
                                    value: true,
                                    message: "Address is required"
                                }
                            })}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                            />
                            <label className="label">
                                {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.address.message}</span>}
                            </label>
                        </div>
                        <input className={`btn w-full max-w-xs text-white my-4 mx-auto `} disabled={disable} type="submit" value='Order' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Purchase;