import React, { useEffect, useState } from 'react';
import { useLoaderData, } from 'react-router';
import useAxios from '../hooks/useAxios';


const MovieDetails = () => {
    const { _id: id } = useLoaderData();
    const axiosInstance = useAxios();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get(`/allMovies/${id}`)
            .then(res => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, axiosInstance]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!movie) return <p className="text-center mt-10">Movie not found.</p>;

    return (
        <div className='bg-[#EDEDF5]'>
            <div className='p-5 w-11/12 mx-auto py-10 '>
                <div className='grid md:grid-cols-2 items-center gap-8 grid-cols-1'>
                    <div className='flex justify-center'>
                        <img src={movie.posterUrl} alt="" />
                    </div>
                    <div className='text-left'>
                        <h2 className='lg:text-5xl text-3xl font-bold pb-2'>{movie.title}</h2>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Rating: </span> {movie.rating}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Genres: </span> {movie.genre}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Release Year: </span> {movie.releaseYear}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Runtime: </span> {movie.duration} minutes</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Country: </span> {movie.country}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Language: </span> {movie.language}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Director: </span> {movie.director}</p>
                        <h3 className='font-bold lg:text-3xl text-2xl text-[#34CD9F] pt-5 pb-2'>Storyline: </h3>
                        <p className='lg:text-2xl text-xs '>{movie.plotSummary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
