import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import DisplayLoading from "../../Shared/DisplayLoading/DisplayLoading";
const AddBarber = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: specialties = [], isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("https://the-look-server.vercel.app/serviceSpecialty");
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <DisplayLoading></DisplayLoading>;
  }

  const imgHostKey = process.env.REACT_APP_imgbb_key;

  const handleAddBarber = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
      method: 'POST',
      
      body: formData
    })

    .then(res => res.json())
    .then(imgData => {
      if(imgData.success){

        const barber = {
          name: data.name,
          email: data.email,
          specialty: data.specialty,
          img: imgData.data.url
        }
        
        fetch('https://the-look-server.vercel.app/barber', {
          method: 'POST',
          headers: {'content-type': 'application/json'}
          ,
          body: JSON.stringify(barber)
        })
        .then(res => res.json())
        
        .then(result => {
          if(result.acknowledged){
            toast.success(`${data.name} is added successfully`)
            navigate('/dashboard/manageBarber')
          }
        })
      }
    })

    reset()
    
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl text-white">Add Barber</h1>

      <form
        onSubmit={handleSubmit(handleAddBarber)}
        className="lg:w-1/2 bg-slate-700 text-white p-5 rounded-xl mt-5"
      >
        <div>
          <label className="label">Full-Name:</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Specialty</label>
          <select
            className="select select-bordered w-full text-slate-700"
            {...register("specialty", { required: true })}
          >
            {specialties.map((specialty) => (
              <option key={specialty._id}>{specialty.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label"></label>
          <input
            type="file"
            className="file-input file-input-bordered w-full text-black mt-5"
            {...register("img", { required: true })}
          />
        </div>

        <input
          type="submit"
          className="btn btn-secondary w-full mt-10"
          value="ADD"
        />
      </form>
    </div>
  );
};

export default AddBarber;
