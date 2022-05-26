import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Tool from './Tool';

const Tools = () => {
    const navigate = useNavigate();
    const { data: reviews, isLoading, refetch } = useQuery('tools', () =>
        fetch(`https://tools-factory.herokuapp.com/tool?tools=${6}`)
            .then(res => res.json()));
    refetch()
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className='py-12 my-2'>
            <h1 className='text-4xl pb-3 font-bold text-[#421700]'>Our Newest Products</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 my-4 px-2 lg:px-10 lg:mx-10'>
                {
                    reviews.map(tool => <Tool key={tool._id} tool={tool} />)
                }
            </div>
            <button onClick={() => navigate('/allTools')} className='btn btn-link'>Show All Products</button>
        </div>
    );
};

export default Tools;