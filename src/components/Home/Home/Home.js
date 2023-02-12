import React from 'react';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import HandleScreen from '../HandleScreen/HandleScreen';
import OurServices from '../OurServices/OurServices';
import Testimonial from '../Testimonial/Testimonial';
const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <OurServices></OurServices>
           <HandleScreen></HandleScreen>
           <Testimonial></Testimonial>
           <Contact></Contact>
        </div>
    );
};

export default Home;