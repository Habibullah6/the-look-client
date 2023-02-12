import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import bannerImg from "../../../assets/facial.jpg";

export default function ServicesBanner({selectedDay, setSelectedDay}) {
   
  
   
  
    return (
      <div className='grid lg:grid-cols-2 gap-5 justify-center items-center my-10'>
        <div className='mx-auto shadow-xl rounded-xl'>
        <DayPicker
        mode="single"
        required
        selected={selectedDay}
        onSelect={setSelectedDay}
        
      />
        </div>

        <div className=''>
          <img src={bannerImg} alt="banner-img" className='w-1/2 mx-auto' />
        </div>
      </div>
    );
  }