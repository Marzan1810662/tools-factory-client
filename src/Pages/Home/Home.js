import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Help from './Help';
import Reviews from './Reviews';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Tools/>
            <BusinessSummary/>
            <Reviews/>
            <Help/>

        </div>
    );
};

export default Home;