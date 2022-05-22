import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import auth from '../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';

const SocialLogin = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if ( gUser) {
            console.log( gUser);
            navigate(from, { replace: true });
        }
    }, [ gUser, from, navigate]);

    if ( gLoading) {
        return <LoadingSpinner />
    }

    let signInError;
    if (gError) {
        signInError = <p className='text-red-500'>
            <small>{gError?.message}</small>
        </p>
    }

    return (
        <>
            <div className="divider">OR</div>
            {signInError}
            <button onClick={() => signInWithGoogle()}
                className="btn btn-outline btn-primary">
                <FontAwesomeIcon className='mr-2' icon={faGoogle}></FontAwesomeIcon>
                Continue With Google
            </button>
        </>
    );
};

export default SocialLogin;