import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';

const ManageAllOrders = () => {
    const navigate = useNavigate();
    const { data: orders, isLoading, refetch } = useQuery('orders', () =>
        fetch(`https://tools-factory.herokuapp.com/order`)
            .then(res => res.json()));


    if (isLoading) {
        return <LoadingSpinner />
    }
    refetch()
    return (
        <div className='my-5'>
            <h1 className='text-2xl font-bold mb-5'>Manage All Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-left">
                    <thead>
                        <tr className='text-xl text-center'>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Shipping Address</th>
                            <th>order Quantity</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <tr key={order._id} className='hover text-center'>
                                <th>{++index}</th>
                                <td>{order?.productName}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 rounded">
                                            <img src={order?.productImage} alt={order?.productName} />
                                        </div>
                                    </div>
                                </td>
                                <td>{order?.userName}</td>
                                <td>{order?.userEmail}</td>
                                <td><span>{order?.shippingAddress}</span></td>
                                <td>{order?.orderedQty}</td>
                                <td>{order?.priceAmount}</td>
                                <td>{order?.status}</td>
                                <td><button
                                    // onClick={() => HandleDelete(order._id)}
                                    className={`btn btn-outline btn-primary ${order.status === 'Pending' ? 'hidden' : 'block'}`}>
                                    <FontAwesomeIcon icon={faCancel} />
                                </button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAllOrders;