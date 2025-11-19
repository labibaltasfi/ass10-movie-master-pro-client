import React, { use } from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router';
import useAxios from '../hooks/useAxios';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider';

const RecentlyAdded = () => {
    const [movies, setMovies] = useState([]);
    const axiosInstance = useAxios();
    const { user } = use(AuthContext)

    useEffect(() => {
        axiosInstance.get("/recent-movies")
            .then(res => setMovies(res.data))
            .catch(err => console.error(err));
    }, [axiosInstance]);


     const handleAddToWatchlist = (movie) => {
        fetch("https://movie-master-pro-server-eta.vercel.app/watchlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                movie: movie   
            })
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Movie already add watchlist");
            } else {
                toast.success("Added to watchlist");
            }
        })
        .catch(err => {
            console.error(err);
            toast.error("Failed to add movie");
        });
    };



    return (
        <div className="">
            <div className='p-5 w-11/12 mx-auto'>
            <ToastContainer></ToastContainer>
                <h2 className="text-4xl text-center py-10 mb-20 font-semibold "> Recently Added</h2>
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 ">
                    {movies.map((movie) => (
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
                                        <div className="flex justify-end mt-2">
                                            <button className="btn btn-info text-white" onClick={() => handleAddToWatchlist(movie)}>
                                                Add Watchlist
                                            </button>


                                            <Link to={`/allMovies/${movie._id}`} className="btn btn-primary ml-2">
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
};

export default RecentlyAdded;