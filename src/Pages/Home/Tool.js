import React from 'react';

const Tool = ({ tool }) => {
    const {productName,productImage,productDescription,stockQty,minOrderQty,price} = tool;
    return (
        <div class="card card-compact md:w-96 bg-base-100 shadow-xl border">
            <figure><img src={productImage} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">{productName}</h2>
                <p className='text-left'>{productDescription}</p>
                <p className='text-left'><strong>In Stock:</strong> {stockQty}</p>
                <p className='text-left'><strong>Minimum Order Quantity:</strong> {minOrderQty}</p>
                <p className='text-left'><strong>Price per Unit:</strong> {price} </p>
                <div class="card-actions justify-start">
                    <button class="w-full btn btn-wide btn-primary btn-outline">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;