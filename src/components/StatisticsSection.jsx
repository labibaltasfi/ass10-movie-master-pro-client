import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";


const StatisticsSection = () => {
    const axiosInstance = useAxios();

    const [totalMovies, setTotalMovies] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        // Fetch total movies
        axiosInstance.get("/allMovies")
            .then(res => setTotalMovies(res.data.length))
            .catch(err => console.error("Movies Error:", err));

        // Fetch total users
        axiosInstance.get("/users")
            .then(res => setTotalUsers(res.data.length))
            .catch(err => console.error("Users Error:", err));
    }, []);

    return (
        <div className="w-11/12 mx-auto pt-20">
            <h3 className="text-4xl text-center font-semibold mb-20">
                Movies & Users Overview
            </h3>

            <div className="">
                <div className="flex justify-center gap-30 mx-auto">
                    <div className="p-6 py-10 bg-[#00BFA6] text-white rounded-xl shadow-md text-center flex-1">
                        <h2 className="pb-3 font-bold text-5xl">{totalMovies}</h2>
                        <p className="text-2xl font-semibold">Total Movies</p>
                    </div>

                    <div className="p-6 py-10 bg-[#00A8E7] text-white rounded-xl shadow-md text-center flex-1">
                        <h2 className="pb-3 font-bold text-5xl">{totalUsers}</h2>
                        <p className="text-2xl font-semibold">Total Users</p>
                    </div>
                </div>
            </div>

        </div>



    );
};



export default StatisticsSection;