import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/AuthProvider";
const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const menuItems = (
    <>
      <li>
        {" "}
        <Link to="/">Home</Link>{" "}
      </li>
     
      <li>
        {" "}
        <Link to="/services">Services</Link>{" "}
      </li>
      {user?.email && (
        <li>
          {" "}
          <Link to="/dashboard">Dashboard</Link>{" "}
        </li>
      )}

      {user?.email ? (
        <button onClick={userSignOut} className="btn btn-secondary">
          Logout
        </button>
      ) : (
        <li>
          {" "}
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>{" "}
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 bg-accent text-white rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-2xl font-bold text-secondary">
          THE LOOK
        </Link>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{menuItems}</ul>
      </div>

      <label htmlFor="my-drawer-2" className="ml-auto cursor-pointer lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
