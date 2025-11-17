import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {

    const [error, setError] = useState("");
    const emailRef = useRef();
    const { signIn, signInWithGoogle, setUser, } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
  

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(() => {
                navigate(`${location.state ? location.state : "/"}`)
                form.reset();
                toast('Login Successful')
            })
            .catch((error) => {
                console.log(error.message)
                setError("Email or password is incorrect.");
                toast('Email or password is incorrect.')
            });
    }



    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                setUser(result.user);
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }

             
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                toast('Login Successful')
                navigate("/");
            })
            .catch(error => {
                console.log(error)
            })
    }






    return (
        <div className='min-h-screen flex items-center justify-center bg-[#EDEDF5] px-4 py-10'>
            <ToastContainer />
            <title>Login</title>
            <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-3xl shadow-2xl">
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8'>Login to your account</h2>
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6 lg:space-y-8">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            ref={emailRef}
                            required
                            className="p-3 sm:p-4 rounded-xl border border-gray-300 bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            required
                            className="p-3 sm:p-4 rounded-xl border border-gray-300 bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="text-right">
                        <Link to={'/forgetPassword'} className='text-[#00BFA6] hover:text-[#00a98f] text-xs sm:text-sm lg:text-base'>
                            Forgot password?
                        </Link>
                    </div>

                    {error && <p className='text-red-500 text-[18px]'>{error}</p>}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 sm:py-4 rounded-xl bg-[#00BFA6] text-white font-semibold text-sm sm:text-base lg:text-lg hover:bg-[#00a98f] active:bg-[#00987a] transition-colors duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* OR Separator */}
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm sm:text-base">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 sm:py-4 rounded-xl bg-white text-gray-800 font-semibold text-sm sm:text-base lg:text-lg 
             hover:bg-gray-100 flex items-center justify-center gap-3 transition-colors duration-200
             border-2 border-[#00BFA6] cursor-pointer"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    Login with Google
                </button>
                {/* Register Link */}
                <p className='pt-4 sm:pt-6 text-center text-gray-600 text-xs sm:text-sm lg:text-base'>
                    Don’t have an account?
                    <Link to='/register' className='text-[#00BFA6] font-semibold hover:text-[#00a98f] ml-1'>Register</Link>
                </p>
            </div>
        </div>

    );
};

export default Login;
