import React, { useContext } from 'react';
import DisplayLoading from '../../components/Shared/DisplayLoading/DisplayLoading';
import { AuthContext } from '../../context/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({children}) => {
    // const location = useLocation();
    // <Navigate to='/login' state={{from: location}} replace/>


    const {user, loading,   userSignOut} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user.email)

    if(loading || isAdminLoading){
        return <DisplayLoading></DisplayLoading>
    }

    
    if(user && isAdmin) {
    return children
    }

    return userSignOut()
        
};

export default AdminRoute;