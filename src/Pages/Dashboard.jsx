import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../hooks/useAxios";


const generateColors = (count) =>
  Array.from({ length: count }, (_, i) =>
    `hsl(${(i * 360) / count}, 70%, 50%)`
  );

const Dashboard = () => {
  const axiosInstance = useAxios();

  const [movies, setMovies] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, usersRes] = await Promise.all([
          axiosInstance.get("/allMovies"),
          axiosInstance.get("/users"),
        ]);

        setMovies(moviesRes.data);
        setTotalUsers(usersRes.data.length);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

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

  const COLORS = useMemo(() => generateColors(genres.length), [genres]);


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

  return (
    <div className="p-6 w-9/12 mx-auto min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#EDEDF5] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold text-gray-600">
            Total Movies
          </h3>
          <p className="text-5xl font-bold text-[#00A8E7] mt-4">
            {movies.length}
          </p>
        </div>

        <div className="bg-[#EDEDF5] rounded-2xl p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold text-gray-600">
            Total Users
          </h3>
          <p className="text-5xl font-bold text-[#192489] mt-4">
            {totalUsers}
          </p>
        </div>
      </div>

     
      <div className="bg-[#EDEDF5] rounded-2xl p-6 h-[450px]">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Movies by Genre
        </h3>

        {genrePieData.length === 0 ? (
          <p className="text-center text-gray-500">
            No movie data available
          </p>
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
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
