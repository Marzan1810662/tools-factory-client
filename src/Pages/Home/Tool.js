import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tool = ({ tool }) => {
    const {_id,productName,productImage,productDescription,stockQty,minOrderQty,price} = tool;
    const navigate = useNavigate();
    return (
        <div className="card card-compact md:w-96 bg-base-100 shadow-xl border">
            <figure><img src={productImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p className='text-left break-words'>{productDescription}</p>
                <p className='text-left'><strong>In Stock:</strong> {stockQty}</p>
                <p className='text-left'><strong>Minimum Order Quantity:</strong> {minOrderQty}</p>
                <p className='text-left'><strong>Price per Unit:</strong> {price} </p>
                <div className="card-actions justify-start">
                    <button onClick={()=>navigate(`/purchase/${_id}`)} className="w-full btn btn-wide btn-primary btn-outline">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;