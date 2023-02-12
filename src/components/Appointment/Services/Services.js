import { format } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ServicesBanner from "../../Appointment/ServicesBanner/ServicesBanner";
import DisplayLoading from "../../Shared/DisplayLoading/DisplayLoading";
import BookingServiceModal from "../BookingServiceModal/BookingServiceModal";
const Services = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);
  const date = format(selectedDay, "PPP");

  const [service, setService] = useState({});

  const handleServiceBooking = (id) => {
    fetch(`https://the-look-server.vercel.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
      });
  };

  const { data: services = [], isLoading, refetch } = useQuery({
    queryKey: ["services", date],
    queryFn: async () => {
      const res = await fetch(`https://the-look-server.vercel.app/services?date=${date}`);
      const data = await res.json();
      return data;
    
    },
  
  });

  if (isLoading) {
    return <DisplayLoading></DisplayLoading>;
  }

  return (
    <div>
      <ServicesBanner
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      ></ServicesBanner>
      <p className="text-center text-2xl">{date}</p>
      <div className="grid lg:grid-cols-3 gap-5 p-5">
        {services.map((service, i) => (
          <div key={i} className="card  bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h2 className="text-xl font-bold text-secondary">{service.name}</h2>
              <p>{service.slots[0]}</p>
              <p>
                {service.slots.length}{" "}
                {service.slots.length < 2 ? "slot" : "slots"} available
              </p>
              <p>Price: ${service.price}</p>
              <div className="card-actions justify-center">
                <label
                  onClick={() => handleServiceBooking(service._id)}
                  htmlFor="my-modal-3"
                  className="btn btn-secondary"
                >
                  Appointment Now
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      {service && <BookingServiceModal
          service={service}
          setService={setService}
          date={date}
          refetch={refetch}
        ></BookingServiceModal>
      }
    </div>
  );
};

export default Services;
