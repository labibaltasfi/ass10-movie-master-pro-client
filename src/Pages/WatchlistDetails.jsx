import React, { use, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate, } from 'react-router';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import Error from '../components/Error';
import Cinema from '../assets/cinema.png'


const WatchlistDetails = () => {
    const { _id: id } = useLoaderData();
    const axiosInstance = useAxios();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axiosInstance.get(`/watchlist/${id}`)
            .then(res => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, axiosInstance]);


if (loading || !movie) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="flex">
                    <img className="animate-spin h-30 w-30 mr-7 mb-3" src={Cinema} alt="" /> <h1 className="text-[50px] font-bold"> Loading...</h1>
                </div>
            </div>
        );
    }


    if (!movie) {
        return <Error></Error>
    }



   
    if (loading) return <p className="text-center mt-10">Loading...</p>;
   

    return (
        <div className=''>
            <title>{movie.movie.title}</title>
           
            <div className='p-5 w-11/12 mx-auto py-10 '>
                <div className='grid md:grid-cols-2 items-center gap-8 grid-cols-1'>
                    <div className='flex justify-center'>
                        <img src={movie.movie.posterUrl} alt="" />
                    </div>
                    <div className='text-left'>
                        <h2 className='lg:text-5xl text-3xl font-bold pb-2'>{movie.movie.title}</h2>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Rating: </span> {movie.movie.rating}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Genres: </span> {movie.movie.genre}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Release Year: </span> {movie.movie.releaseYear}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Runtime: </span> {movie.movie.duration} minutes</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Country: </span> {movie.movie.country}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Language: </span> {movie.movie.language}</p>
                        <p className='font-semibold lg:text-2xl text-1xl lg:py-2'> <span className='text-[#34CD9F]'>Director: </span> {movie.movie.director}</p>
                        <h3 className='font-bold lg:text-3xl text-2xl text-[#34CD9F] pt-5 pb-2'>Storyline: </h3>
                        <p className='lg:text-2xl text-xs '>{movie.movie.plotSummary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchlistDetails;
