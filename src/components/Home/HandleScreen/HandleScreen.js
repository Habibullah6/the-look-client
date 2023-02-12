import React from "react";
import screenImg from "../../../assets/massage.jpg";
const HandleScreen = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row">
        <img src={screenImg} alt="screen" className=" max-w-sm shadow-xl rounded-lg"/>

        <div className="my-20 lg:ml-20">
          <h1 className="text-4xl">
            Let us handle your screen Professionally.
          </h1>
          <p className="mt-8">
            With well written codes, we build amazing apps for all platforms,
            mobile and web apps in general ipsum.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Purus commodo ipsum.
          </p>
        
        <div className="flex  items-center mt-8">
            <div className="text-2xl text-secondary font-bold">
              <h1>500+</h1>
              <p>Happy Customer</p>
            </div>

            <div className="text-2xl text-secondary font-bold ml-16">
              <h1>16+</h1>
              <p>Total Service</p>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default HandleScreen;
