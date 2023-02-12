import { createBrowserRouter } from "react-router-dom";
import Services from "../../components/Appointment/Services/Services";
import AddBarber from "../../components/Dashboard/AddBarber/AddBarber";
import AllUsers from "../../components/Dashboard/AllUsers/AllUsers";
import ManageBarber from "../../components/Dashboard/ManageBarber/ManageBarber";
import MyAppointment from "../../components/Dashboard/MyAppointment/MyAppointment";
import MyPayment from "../../components/Dashboard/MyPayment/MyPayment";
import Home from "../../components/Home/Home/Home";
import Login from "../../components/Home/Login/Login";
import Register from "../../components/Home/Register/Register";
import DisplayError from "../../components/Shared/DisplayError/DisplayError";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
      path: "/",
      element: <Home></Home>
      },

     
      {
        path: "/services",
        element: <PrivateRoute> <Services></Services> </PrivateRoute>
      },
      
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      }
    ],
  },


  {
    path: '/dashboard',
    element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: '/dashboard',
        element: <MyAppointment></MyAppointment>
      },
      {
        path: '/dashboard/payment/:id',
        element: <MyPayment></MyPayment>,
        loader: async ({ params }) =>  fetch(`https://the-look-server.vercel.app/booking/${params.id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        })
        
      },
      {
        path: '/dashboard/allUsers',
        element: <AdminRoute> <AllUsers></AllUsers> </AdminRoute>,
        
      },

      {
        path: '/dashboard/addBarber',
        element: <AdminRoute> <AddBarber></AddBarber> </AdminRoute>
      },
      {
        path: '/dashboard/manageBarber',
        element: <AdminRoute> <ManageBarber></ManageBarber> </AdminRoute>
      }
    ]
  }
]);

export default router;
