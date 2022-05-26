import React from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Review from './Review';

const Reviews = () => {
    const { data: reviews, isLoading, refetch } = useQuery('reviews', () =>
        fetch('https://tools-factory.herokuapp.com/review')
            .then(res => res.json()));
    refetch()
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className='py-5 my-2'>
            <h1 className='text-4xl pb-3 font-bold text-[#421700]'>Reviews from Our Customers</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 my-4 px-2 lg:px-14 lg:mx-16'>
                {
                    reviews.map(review => <Review key={review._id} review={review} />)
                }
            </div>

        </div>
    );
};

export default Reviews;