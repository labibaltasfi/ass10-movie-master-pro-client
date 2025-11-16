import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";

const GenreSection = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const axiosInstance = useAxios();


  useEffect(() => {
    axiosInstance
      .get("/allMovies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [axiosInstance]);


  const genres = Array.from(
    new Set(
      movies.flatMap((movie) =>
        movie.genre?.split(",").map((g) => g.trim()) || []
      )
    )
  );


  const filteredMovies = selectedGenre
    ? movies.filter((movie) =>
      movie.genre
        ?.toLowerCase()
        .split(",")
        .map((g) => g.trim())
        .includes(selectedGenre.toLowerCase())
    )
    : movies;


  const sortedMovies = [...filteredMovies].sort(
    (a, b) => new Date(b.addedAt || b._id) - new Date(a.addedAt || a._id)
  );

  return (
    <div className="p-5 w-11/12 mx-auto">
      <h2 className="text-4xl text-center py-10 font-semibold mb-3">
        Choose Your Category
      </h2>


      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() =>
              setSelectedGenre(selectedGenre === genre ? null : genre)
            }
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer
              ${selectedGenre === genre
                ? "bg-[#00BFA6] text-white border-[#00BFA6] scale-105"
                : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-[#00BFA630]"
              }`}
          >
            {genre}
          </button>
        ))}
      </div>


      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {sortedMovies.map(movie => (
          <Link key={movie._id} to={`/allMovies/${movie._id}`} className="card border-4 border-[#00A8E7] shadow-gray-900 mx-2.5 w-80 mb-10">
            <figure>
              <img className='h-[500px]'
                src={movie.posterUrl}
                alt="movies Poster" />
            </figure>
            <div className="px-5 py-4">
              <h2 className="card-title">{movie.title}</h2>
              <p>Rating:{movie.rating}, </p>
              <p> {movie.releaseYear}, {movie.genre}</p>
              <div className="card-actions justify-end mt-2">
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sortedMovies.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No movies found.</p>
      )}
    </div>
  );
};

export default GenreSection;
