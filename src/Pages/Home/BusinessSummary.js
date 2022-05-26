import { faFlag, faHammer, faPeopleGroup, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const BusinessSummary = () => {
    return (
        <div className='py-5 my-7 bg-gradient-to-r from-[#a7665afa] to-[#f0d4c5]'>
            <h1 className='text-4xl font-bold text-[#421700]'>Our Success Story!</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-10 px-4 lg:px-28 my-6'>
                <div data-aos="fade-up" className='h-60  text-white p-3'>
                    <FontAwesomeIcon className='w-20 h-20 mt-9' icon={faFlag}/>
                    <p className='text-3xl font-bold'>20+ Countries</p>
                </div>
                <div data-aos="fade-up" className='h-60  text-white p-3'>
                    <FontAwesomeIcon className='w-full h-20 mt-9'  icon={faPeopleGroup}/>
                    <p className='text-3xl font-bold'>5000+ Customers</p>
                </div>
                <div data-aos="fade-up" className='h-60  text-white p-3'>
                <FontAwesomeIcon className='w-full h-20 mt-9'  icon={faHammer}/>
                    <p className='text-3xl font-bold'>300+ Products</p>
                </div>
                <div data-aos="fade-up" className='h-60  text-white p-3'>
                <FontAwesomeIcon className='w-full h-20 mt-9'  icon={faShippingFast}/>
                    <p className='text-3xl font-bold'>10000+ Shipment</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;