import React, { useState, useEffect } from "react";
import {  useLocation, useNavigate } from "react-router";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(false);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      setLoading(true);
      setTimeout(() => navigate(path), 100);
    }
  };

  const links = (
    <>
      <li
        onClick={() => handleNavigation("/")}
        className={`m-2 px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/"
          ? "text-white bg-[#00A8E795]"
          : "text-gray-700 "
          }`}
      >
        Home
      </li>

      <li
        onClick={() => handleNavigation("/allMovies")}
        className={`m-2 px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/Apps"
          ? "text-white bg-[#00A8E7]"
          : "text-gray-700 hover:text-[#00A8E7]"
          }`}
      >
        All Movies
      </li>
      <li
        onClick={() => handleNavigation("/myCollection")}
        className={`m-2 px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/Apps"
          ? "text-white bg-[#00A8E7]"
          : "text-gray-700 hover:text-[#00A8E7]"
          }`}
      >
       My Collection
      </li>
    </>
  );

  return (
    <div className="relative">
      {loading && (
        <div className="flex items-center justify-center h-screen bg-white">
          <div className="flex">
            <img className="animate-spin h-30 w-30 mr-7 mb-3" src="" alt="" /> <h1 className="text-[50px] font-bold"> Loading...</h1>
          </div>
        </div>
      )}

      <div className="navbar bg-white md:px-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl">
            <span className="font-extrabold text-[#00A8E7] ">
              MovieMaster Pro
            </span>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end hidden md:flex">
        </div>
      </div>
    </div>
  );
};

export default Navbar;
