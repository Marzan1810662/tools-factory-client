import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div class="hero min-h-screen bg-bottom" style={{background: "url(https://i.ibb.co/DCK5qRD/notfound.jpg)"}}>
            <div class="hero-overlay bg-opacity-60"></div>
            <div class="hero-content text-center text-neutral-content">
                <div class="max-w-md">
                    <h1 class="mb-5 text-8xl font-bold">404</h1>
                    <h2 class="mb-5 text-2xl font-bold">oops!</h2>
                    <p class="mb-5 font-bold text-4xl">Page Does Not Exist or Or Is Unavailable</p>
                    <button onClick={()=>navigate('/')} class="btn md:btn-wide btn-primary">Go Back Home</button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;