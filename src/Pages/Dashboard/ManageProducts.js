import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';

const ManageProducts = () => {
    const { data: tools, isLoading, refetch } = useQuery('tools', () =>
        fetch(`https://tools-factory.herokuapp.com/tool?tools=${''}`)
            .then(res => res.json()));
    refetch()
    if (isLoading) {
        return <LoadingSpinner />
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
                            <th>Product Description</th>
                            <th>Stock Quantity</th>
                            <th>Minimum Order <br /> Quantity</th>
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
                                <td className='whitespace-normal'>{tool?.productDescription}</td>
                                <td>{tool?.stockQty}</td>
                                <td>{tool?.minOrderQty}</td>
                                <td><button className='btn btn-outline btn-primary'>
                                    <FontAwesomeIcon icon={faTrash}/>
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