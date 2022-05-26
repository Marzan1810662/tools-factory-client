import React from 'react';

const AboutUs = () => {
    return (
        <div className='border-t py-5 my-2'>
            {/* <h1 className='text-4xl mb-5 font-bold text-[#421700]'>Who Are We?</h1> */}
            <div className='flex flex-col md:flex-row lg:px-28 items-center md:mx-2 lg:mx-10'>
                <div className='md:w-1/2'>
                    <img className='w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpaBUP5kC9MlT5Kpo7xZ8xo-2vrU4W0T0Wg&usqp=CAU" alt="" />
                </div>
                <div className='md:w-1/2 lg:ml-4'>
                    <h1 className='text-4xl mb-5 font-bold text-[#421700]'>Tools Factory</h1>
                    <p className='break-Words text-xl font-bold italic'>"We are electric tool manufacturing organization that makes sustanable tools for wholesale since 2022"</p>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;