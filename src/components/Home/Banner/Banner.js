import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import bannerImg from "../../../assets/facial.jpg";
const Banner = () => {
  return (
    <div className="hero mt-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={bannerImg} className="max-w-sm rounded-lg shadow-2xl lg:ml-20" />
        <div className="mr-auto lg:mr-20">
          <h1 className="font-bold text-secondary text-4xl"> The Look <Typewriter
           words={['For Every Men And Discover Your Beauty.']}
           loop={0}
           cursor
           cursorStyle='|'
           typeSpeed={70}
           deleteSpeed={50}
           delaySpeed={1000}
           ></Typewriter>
               
          
         

          </h1>
          <p className="py-6 text-justify">
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quidem illum error libero. Repudiandae, quisquam.
          </p>
          <button className="btn btn-secondary">Get an appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
