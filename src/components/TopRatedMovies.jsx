import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router';


// const TopRatedMoviesPromise = fetch('../../public/movies.json').then(res => res.json())
const TopRatedMovies = () => {


    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("../../public/movies.json")
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error("Error fetching JSON:", err));
    }, []);

    return (
         <div className="">
            <div className='p-5 w-11/12 mx-auto'>
                <h2 className="text-2xl text-center py-5 font-semibold mb-3">🔥 Most  Popular  Games</h2>
            <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
               {movies.map(movie => (
                    <Link key={movie._id} className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img className='h-[500px]'
                                src={movie.posterUrl}
                                alt="Shoes" />
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

export default TopRatedMovies;