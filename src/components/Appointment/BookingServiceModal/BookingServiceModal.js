import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const BookingServiceModal = ({ service, setService, date, refetch }) => {
  const { user } = useContext(AuthContext);
  const { name, price, slots  } = service;



  const handleBooking = (e) => {
   
    const form = e.target;
    const serviceName = form.serviceName.value;
    const price = form.price.value;
    const slot = form.slot.value;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const booking = {
      date: date,
      serviceName: serviceName,
      price,
      slot,
      displayName,
      email,
      phone,
    
    }

    fetch('https://the-look-server.vercel.app/booking', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(booking)
    })
    
    .then(res => res.json())
    .then(data => {
      if(!data?.acknowledged){
        // toast.success('booking successfully')
        // setService(null)
        // refetch()
        
        toast.error(data.message)
        setService(null)
        console.log(data)
      
      }
      else{
        // toast.error(`you have already book on ${date}`)
        // setService(null)
         console.log(data)
         toast.success('booking successfully')
        setService(null)
        refetch()
      }
     
    })

    e.preventDefault()
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <h1 className="text-2xl">{name}</h1>

            <form onSubmit={handleBooking}>
              <input
                name="serviceName"
                type="text"
                className="input input-bordered w-full mt-5"
                defaultValue={name}
                disabled
              />
              <input
                name="price"
                type="text"
                className="input input-bordered w-full mt-5"
                defaultValue={price}
                disabled
              />

              <select
                name="slot"
                className="select select-bordered w-full mt-5"
              >
                {
                  slots?.map((slot, i) => <option value={slot} key={i}>{slot}</option>)
                }
              </select>

              <input
                name="displayName"
                type="text"
                className="input input-bordered w-full mt-5"
                defaultValue={user?.displayName}
                disabled
              />

              <input
                name="email"
                type="email"
                className="input input-bordered w-full mt-5"
                defaultValue={user?.email}
                disabled
              />

              <input
                name="phone"
                type="text"
                className="input input-bordered w-full mt-5"
                
              />

              <input
                type="submit"
                value="submit"
                className="btn btn-secondary mt-5 w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingServiceModal;
