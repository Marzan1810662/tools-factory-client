import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React, { Children } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const ManageProducts = () => {
    const navigate = useNavigate();
    const { data: tools, isLoading, refetch } = useQuery('tools', () =>
        fetch(`https://tools-factory.herokuapp.com/tool?tools=${''}`)
            .then(res => res.json()));


    if (isLoading) {
        return <LoadingSpinner />
    }
    const HandleDelete = (id) => {
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
                fetch(`https://tools-factory.herokuapp.com/tool/${id}`, {
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
                                text: `Product has been deleted.`
                            })
                        }
                    })
            }
        })
        refetch();
    }
    return (
        <div className='my-5'>
            <h1 className='text-2xl font-bold mb-5'>Manage Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-left">
                    <thead>
                        <tr className='text-xl text-center'>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            {/* <th >Product Description</th> */}
                            <th>Stock Quantity</th>
                            <th>Minimum Order <br /> Quantity</th>
                            <th>Price per unit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tools?.map((tool, index) => <tr key={tool._id} className='hover text-center'>
                                <th>{++index}</th>
                                <td>{tool?.productName}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 rounded">
                                            <img src={tool?.productImage} alt={tool?.productName} />
                                        </div>
                                    </div>
                                </td>
                                {/* <td>{tool?.productDescription}</td> */}
                                <td>{tool?.stockQty}</td>
                                <td>{tool?.minOrderQty}</td>
                                <td>{tool?.price}</td>
                                <td><button
                                    onClick={() => HandleDelete(tool._id)}
                                    className='btn btn-outline btn-primary'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;