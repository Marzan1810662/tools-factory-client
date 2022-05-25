import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const MyProfile = () => {
    const [disable, setDisable] = useState(true);
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors }, getFieldState } = useForm();

    const { data: userProfile, isLoading, refetch } = useQuery(['user', user.email],
        () => fetch(`https://tools-factory.herokuapp.com/user/${user.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.status === 403) {
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
            return res.json();
        }));

    if (loading || isLoading) {
        return <LoadingSpinner />
    }

    const handleEdit = () => {
        setDisable(false)
    }
    // console.log(userProfile);

    const onSubmit = async data => {
        console.log(data);
        !getFieldState('education').isTouched && (data.education = userProfile.education ? userProfile.education : '')
        !getFieldState('location').isTouched && (data.location = userProfile.location ? userProfile.location : '')
        !getFieldState('phone').isTouched && (data.phone = userProfile.phone ? userProfile.phone : '')
        !getFieldState('linkedIn').isTouched && (data.linkedIn = userProfile.linkedIn ? userProfile.linkedIn : '')
        console.log(getFieldState('education').isTouched)
        console.log(getFieldState('location').isTouched)
        console.log(getFieldState('phone').isTouched)
        console.log(getFieldState('linkedIn').isTouched)
        setDisable(true)
        // https://tools-factory.herokuapp.com/user/updateProfile/${user?.email}`
        fetch(`https://tools-factory.herokuapp.com/user/updateProfile/${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
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
                        text: `${user.email} profile updated`
                    })

                }
                refetch();
            })
    };

    return (
        <div className='w-11/12 md:w-2/4 bg-base-100 drop-shadow-lg border-2 my-5 mx-auto md:p-4'>
            <div className="card-body">
                <div className=' text-right'>
                    <button onClick={handleEdit} className='btn btn-sm btn-outline'>Edit <FontAwesomeIcon icon={faEdit} /></button></div>
                <h1 className='text-2xl font-bold mb-5'>My Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Name</span>
                        </label>
                        <input {...register("name")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userProfile.name}
                            disabled={true}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input {...register("email")}
                            type="email"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userProfile.email}
                            disabled={true}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Education Institution</span>
                        </label>
                        <input {...register("education")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userProfile?.education}
                            disabled={disable}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">{`Location (City)`}</span>
                        </label>
                        <input {...register("location")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userProfile?.location}
                            disabled={disable}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">Phone</span>
                        </label>
                        <input {...register("phone")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userProfile?.phone}
                            disabled={disable}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold">LinkedIn Profile Link</span>
                        </label>
                        <input {...register("linkedIn")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userProfile?.linkedIn}
                            disabled={disable}
                        />
                    </div>
                    <input className={`btn w-full max-w-xs text-white my-4 mx-auto ${disable ? 'hidden' : 'block'}`} type="submit" value='Update' />
                </form></div>
        </div>
    );
};

export default MyProfile;