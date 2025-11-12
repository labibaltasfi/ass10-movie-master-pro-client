import React from 'react';
import { useEffect, useState } from "react";
import {Link } from 'react-router';
import useAxios from '../hooks/useAxios';

const RecentlyAdded = () => {
    const [movies, setMovies] = useState([]);
    const axiosInstance = useAxios()
    
  useEffect(() => {
  axiosInstance.get("/allMovies")
    .then(res => setMovies(res.data))
    .catch(err => console.error(err));
}, []); 

    

    return (
         <div className="">
            <div className='p-5 w-11/12 mx-auto'>
                <h2 className="text-4xl text-center py-10 font-semibold mb-3"> Recently Added</h2>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 ">
               {movies.slice(0, 6).map(movie => (
                    <Link key={movie._id} className="card bg-base-100 shadow-sm mx-2.5 w-80 mb-10">
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
            </div>
        </div>
    );
};

export default RecentlyAdded;