import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import LoadingSpinner from '../Shared/LoadingSpinner';
import SocialLogin from './SocialLogin';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token,from,navigate])

    let signInError;

    if (loading || updating) {
        return <LoadingSpinner />
    }

    if (error || updateError) {
        signInError = <p className='text-red-500'>
            <small>{error?.message || updateError.message}</small>
        </p>
    }

/*     if (user) {
        console.log(user);
    } */


    const onSubmit = async data => {
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });

        navigate('/');
    };
    return (
        <div className='flex justify-center items-center my-12'>
            <div className="card w-11/12 lg:w-96 bg-base-100 drop-shadow-lg border-2">
                <div className="card-body">
                    <h2 className="text-center text-primary text-2xl font-bold">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name",
                                {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    }
                                }
                            )}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email",
                                {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid email'
                                    }
                                }
                            )}
                                type="email"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password",
                                {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be 6 characters or longer'
                                    }
                                }
                            )}
                                type="password"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input className='btn w-full max-w-xs text-white' type="submit" value='Sign up' />
                    </form>
                    <p><small>Already Have an Account? <Link className='text-primary font-bold hover:underline' to='/login'>Please Login</Link> </small></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;