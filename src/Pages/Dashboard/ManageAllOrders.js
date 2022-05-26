import { faCancel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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

    const handleStatusChange = (id) => {
        fetch(`https://tools-factory.herokuapp.com/order/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ status: 'Shipped' })
        })
            .then(res => {
                if (res.status === 403) {
                    Swal.fire({
                        icon: 'success',
                        text: `Forbidden Access!`
                    })
                    // signOut(auth);
                    // localStorage.removeItem('accessToken');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount === 1) {
                    Swal.fire({
                        icon: 'success',
                        text: `Order id${id} Status has been changed to shipped`
                    })

                }
                refetch();
            })
    }

    const handleCancel = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://tools-factory.herokuapp.com/order/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        if (res.status === 403) {
                            // signOut(auth);
                            // localStorage.removeItem('accessToken');
                            // navigate('/login');
                            console.log('403');
                        }
                        return res.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            refetch();
                            Swal.fire({
                                icon: 'success',
                                text: `Order has been cancelled.`
                            })
                        }
                    })
            }
        })
        refetch();
    }
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
                                <td className={`${order.status === 'Shipped' ? 'text-success font-bold' : ''}`}>{order?.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleCancel(order._id)}
                                        className={`btn btn-sm btn-outline btn-primary mx-auto ${order.status === 'Pending' || order.status === 'Shipped' ? 'hidden' : 'block'}`}>
                                        Cancel <FontAwesomeIcon icon={faCancel} />
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(order._id)}
                                        className={`btn btn-sm btn-outline btn-success ${order.status === 'Pending' ? 'block' : 'hidden'}`}>
                                        Ship Order
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAllOrders;