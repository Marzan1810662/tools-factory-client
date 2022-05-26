import React from 'react';

const NewsLetter = () => {
    return (
        <div>
            <div className='py-2 mt-2 bg-neutral'>
                <h1 className='text-4xl font-bold text-[#421700] my-4'>Subscribe To Know About New Products</h1>
                <div className='flex flex-col md:flex-row justify-center items-center gap-2 lg:px-60 mx-auto'>
                    <input type="text" placeholder="Your Email" class="input rounded-none w-full max-w-xs" />
                    <button className='btn btn-primary w-44 md:ml-4 '>Subscribe</button>
                </div>
                <p><small>We Don't Share Your Email Anywhere Else!</small></p>
            </div>

        </div>
    );
};

export default NewsLetter;