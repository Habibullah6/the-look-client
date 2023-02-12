import React from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import DisplayLoading from "../../Shared/DisplayLoading/DisplayLoading";

const AllUsers = () => {
  
 const {data: users = [], isLoading, refetch} = useQuery({
    
    queryKey: [],
    queryFn: async () => {
    const res = await fetch('https://the-look-server.vercel.app/users', {
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


 
const handleMakeAdmin = id => {
    fetch(`https://the-look-server.vercel.app/user/admin/${id}`, {
        method: 'PUT',
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.modifiedCount > 0){
            toast.success('admin created successfully')
            refetch()
        }
        else{
        toast.error('sorry your role in not admin , talk to the admin, thanks in advance.')
        }
        
    })

}

 
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-white">All Users List:</h1>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users?.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                   {
                    user?.role ? '' :  <button onClick={() => handleMakeAdmin(user._id)} className="btn-sm btn btn-secondary">Make Admin</button>
                   }
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
