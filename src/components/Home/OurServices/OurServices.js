import React from "react";
import shave from "../../../assets/img1.png";
import facial from "../../../assets/img2.png";
import skinCare from "../../../assets/img3.png";
const OurServices = () => {
  const services = [
    {
      name: "Shaving",
      price: 199,
      description: "We craft stunning and amazing web UI, using a well drrafted UX to fit your product.",
      img: shave,
    },
    {
        name: "Facial",
        price: 199,
        description: "We craft stunning and amazing web UI, using a well drrafted UX to fit your product.",
        img: facial,
      },
      {
        name: "Skin care treatment",
        price: 199,
        description: "We craft stunning and amazing web UI, using a well drrafted UX to fit your product.",
        img: skinCare,
      },
  ];
  return (
    <div className="my-10 px-5">
      <h1 className="text-center font-bold text-4xl my-20 text-secondary">Our Awesome Services</h1>
      <div className="grid lg:grid-cols-3 gap-5">
       {
        services.map((service, i) => <div key={i} className="card w-100 shadow-xl">
        <figure className="">
          <img src={service.img} alt="#" className=" bg-secondary"/>
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="card-title">{service.name}</h1>
          <h1>${service.price}</h1>
          <p>{service.description}</p>
          
        </div>
      </div>)
       }
      </div>
    </div>
  );
};

export default OurServices;
