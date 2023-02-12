import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar/Navbar';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
    return (
        <> 
        <Navbar></Navbar>
        <div className="drawer drawer-mobile">
         
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
 
  <div className="drawer-content bg-secondary">
    {/* <!-- Page content here --> */}
    
    <Outlet></Outlet>
    
   
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content bg-slate-700">
      {/* <!-- Sidebar content here --> */}
      <li className ='text-white font-bold text-xl'> <Link to='/dashboard'>My Appointment</Link> </li>
     {
      isAdmin && <div>
         <li className='text-white font-bold text-xl'> <Link to="/dashboard/allUsers">All Users</Link> </li>
         <li className='text-white font-bold text-xl '> <Link to="/dashboard/manageBarber">Manage Barber</Link></li>
         <li className='text-white font-bold text-xl '> <Link to="/dashboard/addBarber">Add Barber</Link> </li>
         
      </div>
      
      
      
     }
    </ul>
  
  </div>
</div>
</>
    );
};

export default DashboardLayout;