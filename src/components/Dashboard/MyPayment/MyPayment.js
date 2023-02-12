import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const MyPayment = () => {
  const data = useLoaderData();
  const { serviceName, price, date } = data;

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
  console.log(stripePromise);

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl text-white">
        Payment for: {serviceName}
      </h1>
      <p className="text-white font-bold">
        Pay <strong className="text-black">${price} </strong> for your
        appointment on {date}
      </p>
      <hr/>
      <div className="mt-5 card shadow-xl p-10 bg-white lg:w-1/2">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={data}/>
        </Elements>
      </div>
    </div>
  );
};

export default MyPayment;
