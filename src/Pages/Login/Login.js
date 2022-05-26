import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin';
import Swal from 'sweetalert2';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, handleSubmit, getValues, resetField, watch, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resertPasswordError] = useSendPasswordResetEmail(auth);
    const [token] = useToken(user);
    const [disableField,setDisableFeild] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from?.pathname || '/';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token,from,navigate])


    let signInError;

    if (loading || sending) {
        return <LoadingSpinner />
    }

    if (error || resertPasswordError) {
        signInError = <p className='text-red-500'>
            <small>{error?.message || resertPasswordError?.message}</small>
        </p>
    }


    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    const handleResetPassword = async () => {
        setDisableFeild(true);
        const emailPattern=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!getValues('email')|| !emailPattern.test(getValues('email'))) {
            return;
        }
        await sendPasswordResetEmail(getValues('email'));
        Swal.fire({
            icon: 'success',
            text: 'An email has been sent to you with the password reset link'
        })
        resetField('email')
    }

    return (
        <div className='flex justify-center items-center my-12'>
            <div className="card w-11/12 md:w-96 bg-base-100 drop-shadow-lg border-2">
                <div className="card-body">
                    <h2 className="text-primary text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

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
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                                disabled={disableField}
                                type="password"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className={`label-text-alt text-red-500 ${disableField? 'hidden' : 'inline'}`}>{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <p className='text-left my-1'><small>Forgot password? <button onClick={handleResetPassword} className='text-primary font-bold hover:underline'>reset</button> </small></p>
                        {signInError}
                        <input className='btn w-full max-w-xs text-white' type="submit" value='Login' />
                    </form>
                    <p><small>New to Tools Factory? <Link className='text-primary font-bold hover:underline' to='/register'>Create New Account</Link> </small></p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;