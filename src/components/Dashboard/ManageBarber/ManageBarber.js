import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import DisplayModal from "../../Shared/DisplayModal/DisplayModal";

const ManageBarber = () => {
  const [deleteBarber, setDeleteBarber] = useState(null)
  const { data: barbers = [], refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("https://the-look-server.vercel.app/barber", {
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
      });
      const data = res.json();
      return data;
    },
  });
  const handleDeleteBarber = (barber) => {
    const url = `https://the-look-server.vercel.app/barber/${barber._id}`
    fetch(url, {
      method: 'DELETE',
      
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount>0){
        refetch()
        toast.success(`${barber.name} deleted successfully`)
      }
    })
  }
  
  const closeModal = () => {
    setDeleteBarber(null)
  }

 

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl text-white">Manage Barber: </h1>

      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber, i) => (
              <tr key={barber._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-14 rounded-full">
                      <img src={barber.img} />
                    </div>
                  </div>
                </td>
                <td>{barber.name}</td>
                <td>{barber.email}</td>
                <td>{barber.specialty}</td>
                <td>
                <label onClick={()=> setDeleteBarber(barber)} htmlFor="my-modal" className="btn btn-secondary btn-sm">Delete</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        deleteBarber &&  <DisplayModal
        title={`are you sure you want to delete?`}
        message={`if you delete ${deleteBarber.name} it can not be undone.`}
        
        successModal={handleDeleteBarber}
        modalData={deleteBarber}

        closeModal={closeModal}
        ></DisplayModal>
      }
    </div>
  );
};



export default ManageBarber;
