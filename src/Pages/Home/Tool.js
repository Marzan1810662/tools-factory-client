import React from 'react';

const Tool = ({ tool }) => {
    const {productName,productImage,productDescription,stockQty,minOrderQty,price} = tool;
    return (
        <div className="card card-compact md:w-96 bg-base-100 shadow-xl border">
            <figure><img src={productImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p className='text-left'>{productDescription}</p>
                <p className='text-left'><strong>In Stock:</strong> {stockQty}</p>
                <p className='text-left'><strong>Minimum Order Quantity:</strong> {minOrderQty}</p>
                <p className='text-left'><strong>Price per Unit:</strong> {price} </p>
                <div className="card-actions justify-start">
                    <button className="w-full btn btn-wide btn-primary btn-outline">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;