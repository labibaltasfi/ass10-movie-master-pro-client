import { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      toast("Logged out");
      navigate("/login"); 
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">

        <img
          src={user?.photoURL || "https://i.ibb.co/2jY4P1G/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 object-cover"
        />

        <h2 className="text-3xl font-bold mt-4 text-black">
          {user?.displayName || "No Name"}
        </h2>

        <p className="text-gray-600">{user?.email}</p>

        <button
          className="btn btn-error text-white w-full mt-8"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
