import React, { use, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { sendEmailVerification } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { auth } from '../firebase/firebase.init';

const Register = () => {
    const [error, setError] = useState("");
    const { createUser, setUser, updateUser, } = use(AuthContext);
    const navigate = useNavigate();
    const nameRef = useRef();


    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast(
                "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
            );
            return;
        }


        createUser(auth, email, password)
            .then((result) => {
                const currentUser = result.user;

           
                return sendEmailVerification(currentUser).then(() => {
                    toast("📩 Please verify your email address");


                    return updateUser({ displayName: name, photoURL: photo });
                });
            })
            .then(() => {
 
                setUser((prev) => ({ ...prev, displayName: name, photoURL: photo }));

   
                const newUser = {
                    name,
                    email,
                    image: photo,
                };


                return fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(newUser),
                });
            })
            .then((res) => res.json())
            .then(() => {
                toast.success("✅ Account created successfully!");
                form.reset();

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch((err) => {
                console.error("❌ Error:", err);
                toast.error("⚠️ Something went wrong.");
                setError("Please try again.");
            });
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#EDEDF5] px-4 py-10'>
            <ToastContainer />
            <title>Register</title>
            <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl">
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8'>Register your account</h2>
                <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Name</label>
                        <input
                            type="text"
                            name='name'
                            placeholder="Your Name"
                            ref={nameRef}
                            required
                            className="p-3 sm:p-4 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            required
                            className="p-3 sm:p-4 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Photo URL</label>
                        <input
                            type="text"
                            name='photo'
                            placeholder="Photo URL"
                            required
                            className="p-3 sm:p-4 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            required
                            className="p-3 sm:p-4 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>


                    {error && <p className='text-red-500 text-[18px]'>{error}</p>}


                    <button
                        type="submit"
                        className="w-full py-3 sm:py-4 rounded-xl bg-[#00BFA6] text-white font-semibold text-sm sm:text-base lg:text-lg hover:bg-[#00a98f] active:bg-[#00987a] transition-colors duration-200 cursor-pointer"
                    >
                        Register
                    </button>
                </form>


                <p className='pt-4 sm:pt-6 text-center text-gray-600 text-xs sm:text-sm lg:text-base'>
                    Already have an account?
                    <Link to='/login' className='text-[#00BFA6] font-semibold hover:text-[#00987a] ml-1'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
