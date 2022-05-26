import React from 'react';
import AboutUs from './AboutUs';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Help from './Help';
import NewsLetter from './NewsLetter';
import Reviews from './Reviews';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Tools/>
            <AboutUs/>
            <BusinessSummary/>
            <Reviews/>
            <Help/>
            <NewsLetter/>
        </div>
    );
};

export default Home;