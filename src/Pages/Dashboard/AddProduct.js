import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';

const AddProduct = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors },getValues } = useForm();
    const [qtyError, setQtyError] = useState('');


    const onSubmit = async data => {
        if( parseInt(data.minOrderQty) > parseInt(data.stockQty) ){
            setQtyError('Minimum order quantity can not be greater then in stock quantity')
            return;
        }
        setQtyError('')
        fetch('https://tools-factory.herokuapp.com/tool', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json();
            })
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        text: `Product added Successfully`
                    })
                }
            })
    };

    return (
        <div className='w-11/12 md:w-2/4 bg-base-100 drop-shadow-lg border-2 my-5 mx-auto md:p-4'>
            <div className="card-body p-2">
                <h1 className='text-2xl font-bold mb-5'>Add Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Product Name</span>
                        </label>
                        <input {...register("productName", {
                            required: {
                                value: true,
                                message: 'Product Name is required'
                            },
                        })}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            {errors.productName?.type === 'required' && <span className={`label-text-alt text-red-500`}>{errors.productName.message}</span>}

                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Product Image Link</span>
                        </label>
                        <input {...register("productImage", {
                            required: {
                                value: true,
                                message: 'Product Image is required'
                            },
                        })}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            {errors.productImage?.type === 'required' && <span className="label-text-alt text-red-500">{errors.productImage.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Description</span>
                        </label>
                        <textarea {...register("productDescription", {
                            required: {
                                value: true,
                                message: 'Product Description is required'
                            },
                            maxLength: {
                                value: 200,
                                message: 'Description must not exceed 200 characters'
                            }
                        })}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            {errors.productDescription?.type === 'required' && <span className={`label-text-alt text-red-500 `}>{errors.productDescription.message}</span>}
                            {errors.productDescription?.type === 'maxLength' && <span className="label-text-alt text-red-500">{errors.productDescription.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Stock Quantity</span>
                        </label>
                        <input {...register("stockQty", {
                            required: {
                                value: true,
                                message: 'Product stock quantity is required'
                            },
                        })}
                            type="number"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            min={1}
                        />
                        <label className="label">
                            {errors.stockQty?.type === 'required' && <span className="label-text-alt text-red-500">{errors.stockQty.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Minimum Order Quantity</span>
                        </label>
                        <input {...register("minOrderQty", {
                            required: {
                                value: true,
                                message: 'Product minimum order quantity is required'
                            },
                        })}
                            type="number"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            min={1}
                        />
                        <label className="label">
                            {errors.minOrderQty?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minOrderQty.message}</span>}
                            <span className={`label-text-alt text-red-500 ${qtyError} ? 'inline' : 'hidden'` }>{qtyError}</span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Price Per Unit</span>
                        </label>
                        <input {...register("price", {
                            required: {
                                value: true,
                                message: 'Product price is required'
                            },
                        })}
                            type="number"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            min={1}
                        />
                        <label className="label">
                            {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                        </label>
                    </div>
                    <input className={`btn w-full max-w-xs text-white my-4 mx-auto`} type="submit" value='Add Product' />
                </form></div>
        </div>
    );
};

export default AddProduct;