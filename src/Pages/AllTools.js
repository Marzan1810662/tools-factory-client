import React from 'react';
import { useQuery } from 'react-query';
import Tool from './Home/Tool';
import LoadingSpinner from './Shared/LoadingSpinner';

const AllTools = () => {
    const { data: reviews, isLoading, refetch } = useQuery('tools', () =>
        fetch(`https://tools-factory.herokuapp.com/tool?tools=${''}`)
            .then(res => res.json()));
    refetch()
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className='py-2 my-2'>
            <h1 className='text-4xl font-bold text-[#421700]'>Our Products</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 my-4 px-2 lg:px-10 lg:mx-10'>
                {
                    reviews.map(tool => <Tool key={tool._id} tool={tool} />)
                }
            </div>
        </div>

    );
};

export default AllTools;