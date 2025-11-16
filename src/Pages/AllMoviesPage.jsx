import { useState, useEffect, use } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AuthContext } from "../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const AllMoviesPage = () => {
    const axiosInstance = useAxios();
    const [movies, setMovies] = useState([]);
    const { user } = use(AuthContext);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/allMovies")
            .then((res) => setMovies(res.data))
            .catch((err) => console.error(err));
    }, []);


    const genres = Array.from(
        new Set(
            movies.flatMap((movie) => {
                if (Array.isArray(movie.genre)) return movie.genre;
                if (typeof movie.genre === "string")
                    return movie.genre.split(",").map((g) => g.trim());
                return [];
            })
        )
    );


    const ratings = Array.from(
        new Set(
            movies
                .map((movie) => Math.floor(Number(movie.rating)))
                .filter((r) => r > 0)
        )
    ).sort((a, b) => b - a);


    const toggleGenre = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        );
    };


    const toggleRating = (rating) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating]
        );
    };


    const filteredMovies = movies.filter((movie) => {
        const movieGenres = Array.isArray(movie.genre)
            ? movie.genre
            : movie.genre?.split(",").map((g) => g.trim()) || [];


        const genreMatch =
            selectedGenres.length === 0 ||
            movieGenres.some((g) =>
                selectedGenres.includes(g)
            );


        const ratingMatch =
            selectedRatings.length === 0 ||
            selectedRatings.some((r) => movie.rating >= r);

        return genreMatch && ratingMatch;
    });

    const handleAddToWatchlist = (movie) => {
        fetch("http://localhost:3000/watchlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                title: movie.title   // ✅ now correct
            })
        })
            .then(res => res.json())
            .then(() => toast.success("Added to watchlist"));
    };

    return (
        <div className="min-h-screen p-5">
            <ToastContainer></ToastContainer>
            <div className="w-11/12 mx-auto flex gap-8">
                <div>
                    <div className="my-15">
                        <h2 className="text-4xl text-center font-semibold">
                            All Movies
                        </h2>


                        <div className="dropdown xl:hidden mt-5">
                            <button tabIndex={0} className="btn">
                                Filter by <RiArrowDropDownLine />
                            </button>

                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box mt-3 w-64 p-4 shadow"
                            >

                                <h3 className="text-lg font-bold mb-2">
                                    Filter by Genres
                                </h3>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {genres.map((genre) => (
                                        <label key={genre} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedGenres.includes(genre)}
                                                onChange={() => toggleGenre(genre)}
                                                className="accent-blue-500"
                                            />
                                            {genre}
                                        </label>
                                    ))}
                                </div>


                                <h3 className="text-lg font-bold mb-2">
                                    Filter by Rating
                                </h3>
                                <div className="flex flex-col gap-1">
                                    {ratings.map((rating) => (
                                        <label key={rating} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedRatings.includes(rating)}
                                                onChange={() => toggleRating(rating)}
                                                className="accent-yellow-400"
                                            />
                                            <div className="flex">
                                                {Array.from({ length: rating }).map((_, i) => (
                                                    <span key={i} className="text-yellow-400">
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="gap-6 flex xl:flex-row flex-col-reverse">

                        <div className="xl:w-64 hidden xl:block">
                            <div className="p-5 bg-gray-900 text-white rounded">

                                <h3 className="text-lg font-bold mb-3">Filter by Genres</h3>
                                <div className="grid grid-cols-2 gap-2 mb-5">
                                    {genres.map((genre) => (
                                        <label key={genre} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedGenres.includes(genre)}
                                                onChange={() => toggleGenre(genre)}
                                                className="accent-blue-500"
                                            />
                                            {genre}
                                        </label>
                                    ))}
                                </div>


                                <h3 className="text-lg font-bold mb-3">Filter by Rating</h3>
                                <div className="flex flex-col gap-1">
                                    {ratings.map((rating) => (
                                        <label key={rating} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedRatings.includes(rating)}
                                                onChange={() => toggleRating(rating)}
                                                className="accent-yellow-400"
                                            />
                                            <div className="flex">
                                                {Array.from({ length: rating }).map((_, i) => (
                                                    <span key={i} className="text-yellow-400">
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
                            {filteredMovies.map((movie) => (
                                <div
                                    key={movie._id}
                                    to={`/allMovies/${movie._id}`}
                                    className="card border-4 border-[#00A8E7] shadow-gray-900 w-80 mb-10"
                                >
                                    <figure>
                                        <img
                                            className="h-[500px]"
                                            src={movie.posterUrl}
                                            alt="movies Poster"
                                        />
                                    </figure>
                                    <div className="px-5 py-4">
                                        <h2 className="card-title">{movie.title}</h2>
                                        <p>Rating: {movie.rating}</p>
                                        <p>{movie.releaseYear}, {movie.genre}</p>
                                        <div className="card-actions justify-end mt-2">
                                            <button onClick={() => handleAddToWatchlist(movie)}>
                                                Add to Watchlist
                                            </button>

                                            <Link to={`/allMovies/${movie._id}`} className="btn btn-primary">
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllMoviesPage;
