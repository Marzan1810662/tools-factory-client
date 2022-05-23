import React from 'react';

const Banner = () => {
    return (
        <div className="hero h-[600px] bg-[url('https://i.ibb.co/17yv998/banner-small.jpg')] md:bg-right-top md:bg-[url('https://i.ibb.co/zmR1bGH/banner-lg.jpg')]" >
            <div className="hero-overlay bg-opacity-60"></div>
            <div data-aos="fade-up" className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Tools factory is electric tools manufacuring company that builds sustainable and long lasting tools. With over 5000+ customer world wide, we are gowing rapidly... </p>
                    <button className="btn md:btn-wide btn-primary">Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;