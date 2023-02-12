import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import DisplayLoading from '../../Shared/DisplayLoading/DisplayLoading';

const MyAppointment = () => {
    const {user} = useContext(AuthContext);

    
   
    const url = `https://the-look-server.vercel.app/booking?email=${user.email}`
    
    const {data: bookings = [], isLoading} = useQuery({
        queryKey: [user.email],
         
        queryFn: async() => {
        const res = await fetch(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.json()
        return data;
        }
    })

    if(isLoading){
        return <DisplayLoading></DisplayLoading>
    }
    

    
    return (
        <div className='p-5'>
            <h1 className='text-2xl mb-5 text-white font-bold'>My All Appointment</h1>
            <div className='grid lg:grid-cols-3 gap-5'>
             {
              bookings &&  bookings?.map((book, i) => (<div key={i} className="card w-100 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Name: {book.displayName}</h2>
                  <p>Service-booked: {book.serviceName}</p>
                  <p>Time: {book.slot}</p>
                  <p>Price: ${book.price}</p>
                  {
                    book.price && !book.paid && <Link to={`/dashboard/payment/${book._id}`} className='btn btn-sm btn-primary'>Pay</Link>
                  }

                  {
                    book.price && book.paid && <p className='text-secondary'>paid</p>
                  }
                </div>
              </div>))
             }
            </div>
        </div>
    );
};

export default MyAppointment;