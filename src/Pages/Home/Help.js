import { faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import contact from '../../images/contact.png'
import warranty from '../../images/warranty.jpg'
import services from '../../images/service.png'

const Help = () => {
    return (
        <div>
            <div className='py-2 my-2 '>
                <h1 className='text-4xl font-bold text-[#421700]'>How Can We Help!</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 px-4 lg:px-28 my-6'>
                    <div data-aos="fade-up" className='text-[#421700] p-3 flex flex-col justify-center items-center'>
                        <img className='w-44' src={contact} alt="" />
                        <button className='btn btn-primary btn-link text-xl'>
                            Contact Us <FontAwesomeIcon  className='ml-2 text-sm' icon={faAngleRight} />
                        </button>
                        <p className='text-lg font-bold'>Have a question? Need help?
                            Click here to contact us.</p>
                    </div>
                    <div data-aos="fade-up" className='text-[#421700] p-3  flex flex-col justify-center items-center'>
                        <img className='w-44' src={warranty} alt="" />
                        <button className='btn btn-primary btn-link text-xl'>
                            Warranty <FontAwesomeIcon className='ml-2 text-sm' icon={faAngleRight} />
                        </button>
                        <p className='text-lg font-bold'>Questions about the warranty of your product?
                            Learn more on our Warranty page.</p>
                    </div>
                    <div data-aos="fade-up" className='text-[#421700] p-3  flex flex-col justify-center items-center'>
                        <img className='w-44' src={services} alt="" />
                        <button className='btn btn-primary btn-link text-xl'>
                            Service <FontAwesomeIcon className='ml-2 text-sm' icon={faAngleRight} />
                        </button>
                        <p className='text-lg font-bold'>Have a tool that needs to be serviced?
                            We’ll help you get back to work.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;