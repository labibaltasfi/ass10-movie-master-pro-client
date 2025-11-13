import React, { useState, useEffect, use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {

    logOut()
      .then(() => {
        console.log('logOut successful')
      })
      .catch()
  }


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
        className={`m-2 px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${location.pathname === "/allMovies"
          ? "text-white bg-[#00A8E795]"
          : "text-gray-700 "
          }`}
      >
        All Movies
      </li>
        {user && (
        <>
          <li
            onClick={() => handleNavigation("/myCollection")}
            className={`m-2 px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${
              location.pathname === "/myCollection"
                ? "text-white bg-[#00A8E7]"
                : "text-gray-700 hover:text-[#00A8E7]"
            }`}
          >
            My Collection
          </li>
          <li
            onClick={() => handleNavigation("/addMovies")}
            className={`m-2 px-3 py-1 rounded-md cursor-pointer transition-colors duration-200 btn-secondary ${
              location.pathname === "/addMovies"
                ? "text-white bg-[#00A8E7]"
                : "text-gray-700 hover:text-[#00A8E7]"
            }`}
          >
            Add Movie
          </li>
        </>
      )}
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl">
            <span className="font-extrabold text-[#00A8E7] ">
              MovieMaster Pro
            </span>
          </div>
        </div>

        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 gap-5  text-[#0B3954] text-2xl  hidden lg:flex">
            {
              links
            }
          </ul>
        </div>

        <div className="navbar-end">
          <div className='login-btn flex  text-[#0B3954] text-2xl font-semibold items-center px-4'>
            {
              user ? (
                <button onClick={handleLogOut} className='mr-4 cursor-pointer'>Logout</button>
              ) : (
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="cursor-pointer">
                    <img src="https://i.ibb.co.com/hR0p6qhz/user.png" alt="" />  
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-4 mt-3 w-35 p-2  shadow">
                      <ul className="dropdown-menu sub-menu">
                    <li><Link to='login' className="text-2xl">Login</Link></li>
                    <li><Link to='register' className="text-2xl">Register</Link></li>
                  </ul>
                  </ul>
                </div>

              )
            }
            <Link to="/profile">
              {user && (
                <img
                  className="w-20 h-10 md:h-11 xl:h-14 2xl:h-16  rounded-full object-cover border-2 border-white sm:mr-0 mr-8"
                  src={
                    user?.photoURL ? user.photoURL : "https://i.ibb.co.com/hR0p6qhz/user.png"
                  }
                  alt="User"
                />
              )}
            </Link>

          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
