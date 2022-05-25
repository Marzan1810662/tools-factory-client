import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const AddReview = () => {
    const [rating, setrating] = useState(1);
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();

    if (loading) {
        return <LoadingSpinner />
    }

    const onSubmit = async data => {
        const review = {
            name: user?.displayName,
            email: user.email,
            rating: rating,
            review: data.review
        }
        console.log(review);
        fetch('https://tools-factory.herokuapp.com/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        })
            .then(res => {
                if (res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json();
            })
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        text: `Thank you for rating us.`
                    })
                }
                console.log(data);
            })
    }
    return (
        <div className='w-11/12 md:w-2/4 bg-base-100 drop-shadow-lg border-2 my-5 mx-auto md:p-4'>
            <div className="card-body">
                <h1 className='text-2xl font-bold mb-5'>Add A Review</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl font-bold">Rate Your Experience</span>
                        </label>
                        <Rating
                            onClick={(value) => setrating(value)}
                            initialRating={rating}
                            emptySymbol={<FontAwesomeIcon icon={faStar} />}
                            fullSymbol={<FontAwesomeIcon style={{ color: '#AD4328' }} icon={faStar} />}
                        ></Rating>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl font-bold">Review</span>
                        </label>
                        <textarea {...register("review")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full h-28"
                        />
                    </div>
                    <p className='text-left text-sm text-gray-400'>***Your reviews helps us to improve our service</p>
                    <input className={`btn w-full max-w-xs text-white my-4 mx-auto `} type="submit" value='Add Review' />
                </form>
            </div>
        </div>
    );
};

export default AddReview;