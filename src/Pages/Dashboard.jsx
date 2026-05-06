import { useEffect, useMemo, useState, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../context/AuthProvider";


const generateColors = (count) =>
  Array.from({ length: count }, (_, i) =>
    `hsl(${(i * 360) / count}, 70%, 50%)`
  );

const Dashboard = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get("/allMovies");
        setMovies(res.data);
      } catch (error) {
        console.error("Movies Fetch Error:", error);
      }
    };

    fetchMovies();
  }, [axiosInstance]);


  useEffect(() => {
    if (!user) return;

    const fetchUserMovies = async () => {
      try {
        const res = await axiosInstance.get("/myCollection");
        const filtered = res.data.filter(
          (movie) => movie.addedBy === user.email
        );
        setUserMovies(filtered);
        setLoading(false);
      } catch (error) {
        console.error("User Collection Error:", error);
      }
    };

    fetchUserMovies();
  }, [axiosInstance, user]);

 
  const genres = useMemo(() => {
    return Array.from(
      new Set(
        movies.flatMap(
          (movie) =>
            movie.genre?.split(",").map((g) => g.trim()) || []
        )
      )
    );
  }, [movies]);

 
  const userGenres = useMemo(() => {
    return Array.from(
      new Set(
        userMovies.flatMap(
          (movie) =>
            movie.genre?.split(",").map((g) => g.trim()) || []
        )
      )
    );
  }, [userMovies]);

  
  const COLORS = useMemo(() => generateColors(genres.length), [genres]);
  const USER_COLORS = useMemo(() => generateColors(userGenres.length), [userGenres]);

 
  const genrePieData = useMemo(() => {
    return genres.map((genre) => ({
      name: genre,
      value: movies.filter((movie) =>
        movie.genre
          ?.toLowerCase()
          .split(",")
          .map((g) => g.trim())
          .includes(genre.toLowerCase())
      ).length,
    }));
  }, [genres, movies]);

 
  const userGenrePieData = useMemo(() => {
    return userGenres.map((genre) => ({
      name: genre,
      value: userMovies.filter((movie) =>
        movie.genre
          ?.toLowerCase()
          .split(",")
          .map((g) => g.trim())
          .includes(genre.toLowerCase())
      ).length,
    }));
  }, [userGenres, userMovies]);

  return (
    <div className="p-6 w-11/12 mx-auto min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10">Dashboard</h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#EDEDF5] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold text-gray-600">Total Movies</h3>
          <p className="text-5xl font-bold text-[#00A8E7] mt-4">{movies.length}</p>
        </div>

        <div className="bg-[#EDEDF5] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold text-gray-600">Your Movies</h3>
          <p className="text-5xl font-bold text-[#00BFA6] mt-4">
            {loading ? "..." : userMovies.length}
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
       
        <div className="bg-[#EDEDF5] rounded-2xl h-[600px] p-6 sm:h-[500px] mb-15">
          <h3 className="text-2xl font-semibold text-center mb-6">
            Movies by Genre (All)
          </h3>
          {genrePieData.length === 0 ? (
            <p className="text-center text-gray-500">No movie data available</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genrePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={60}
                  label
                  isAnimationActive
                  animationDuration={1200}
                >
                  {genrePieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      
        <div className="bg-[#EDEDF5] rounded-2xl h-[550px] p-6 sm:h-[500px] mb-12">
          <h3 className="text-2xl font-semibold text-center mb-6">
            Your Movies by Genre
          </h3>
          {userGenrePieData.length === 0 ? (
            <p className="text-center text-gray-500">
              You haven't added any movies yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userGenrePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={60}
                  label
                  isAnimationActive
                  animationDuration={1200}
                >
                  {userGenrePieData.map((_, index) => (
                    <Cell key={index} fill={USER_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
