import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
  const {price, name, email, _id} = booking;
  const [cardError, setCardError] = useState("");
  const [success , setSuccess] = useState('');
  const [transactionId, setTransactionId] = useState('')
  const [clientSecret, setClientSecret] = useState(" ");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://the-look-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({price}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      return
    }

    
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email
          },
        },
      },
    );

    
    

    if(confirmError){
      setCardError(confirmError.message)
      return
    }

    if(paymentIntent.status === 'succeeded'){
     const payment = {
      email,
      price,
      transactionId: paymentIntent.id,
      bookingId: _id

     }
     fetch('https://the-look-server.vercel.app/payment', {
      method: 'POST',
      headers: {
       'content-type': 'application/json',
       authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(payment)
     
     })
     .then(res => res.json())
     .then(data => {
      if(data?.insertedId){
        setSuccess(`congrats, your payment is completed `);
        setTransactionId(paymentIntent.id);
        console.log(data)
      }
     })
    }

  };



  

  return (
    <>  
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

    
     


      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn btn-sm btn-primary mt-5"
      >
        Pay
      </button>
    </form>

    {cardError && <p className="text-red-500">{cardError}</p>}

    {

    success && <div>
    <p>{success}</p>
    <p>{transactionId}</p>
    </div>

    }

    
    </>
  );
};

export default CheckoutForm;
