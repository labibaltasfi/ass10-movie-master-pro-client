import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import useAxios from '../hooks/useAxios';
import { useLoaderData, useNavigate } from 'react-router';

const UpdateMovies = () => {
    const [movie, setMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user } = use(AuthContext);
    const { _id: id } = useLoaderData();
    const axiosInstance = useAxios()

    useEffect(() => {
        axiosInstance.get("/allMovies")
            .then(res => setMovies(res.data))
            .catch(err => console.error(err));
    }, [axiosInstance]);

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



    const [addMovies, setAddMovies] = useState([])


    const handleUpdateMovie = (e) => {
        e.preventDefault();
        const title = e.target.name.value;
        const genre = e.target.genre.value;
        const releaseYear = e.target.releaseYear.value;
        const director = e.target.director.value;
        const cast = e.target.cast.value;
        const rating = e.target.rating.value;
        const duration = e.target.duration.value;
        const plotSummary = e.target.plotSummary.value;
        const posterUrl = e.target.posterUrl.value;
        const language = e.target.language.value;
        const country = e.target.country.value;
        const email = e.target.email.value;



        const updatedMovie = {
            title: title,
            genre: genre,
            releaseYear: releaseYear,
            director: director,
            cast: cast,
            rating: rating,
            duration: duration,
            plotSummary: plotSummary,
            posterUrl: posterUrl,
            language: language,
            country: country,
            addedBy: email,
        }

        fetch(`https://movie-master-pro-server-eta.vercel.app/allMovies/${movie._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMovie)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast('Movie updated successfully!');
                    setAddMovies(prev => prev.map(m =>
                        m._id === movie._id ? { ...m, ...updatedMovie } : m
                    ));

                } else {
                    toast('No changes made!');
                }
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            })
            .catch(err => {
                console.error(err);
                toast.error('Update failed!');
            });
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-[#EDEDF5] px-4 py-10'>
            <ToastContainer></ToastContainer>
            <title>Register</title>
            <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl">
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8'>Add Movie</h2>
                <form onSubmit={handleUpdateMovie} className="space-y-4 sm:space-y-6">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Movie Name</label>
                        <input
                            type="text"
                            name='name'
                            placeholder="Movie Name"
                            defaultValue={movie?.title}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Genre</label>
                        <input
                            type="text"
                            name='genre'
                            placeholder="genre"
                            defaultValue={movie?.genre}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Release Year</label>
                        <input
                            type="text"
                            name='releaseYear'
                            placeholder="Release Year"
                            defaultValue={movie?.releaseYear}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Director</label>
                        <input
                            type="text"
                            name='director'
                            placeholder="Director"
                            defaultValue={movie?.director}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Cast</label>
                        <input
                            type="text"
                            name='cast'
                            placeholder="Cast"
                            defaultValue={movie?.cast}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Rating</label>
                        <input
                            type="text"
                            name='rating'
                            placeholder="Rating"
                            defaultValue={movie?.rating}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Duration</label>
                        <input
                            type="text"
                            name='duration'
                            placeholder="Duration"
                            defaultValue={movie?.duration}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">PlotSummary</label>
                        <input
                            type="text"
                            name='plotSummary'
                            placeholder="PlotSummary"
                            defaultValue={movie?.plotSummary}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Poster URL</label>
                        <input
                            type="text"
                            name='posterUrl'
                            placeholder="Poster URL"
                            defaultValue={movie?.posterUrl}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Language</label>
                        <input
                            type="text"
                            name='language'
                            placeholder="Language"
                            defaultValue={movie?.language}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Country</label>
                        <input
                            type="text"
                            name='country'
                            placeholder="Country"
                            defaultValue={movie?.country}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>


                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Email</label>
                        <input
                            type="email"
                            name='email'
                            readOnly defaultValue={user?.email}
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 sm:py-4 rounded-xl bg-[#00BFA6] text-white font-semibold text-sm sm:text-base lg:text-lg hover:bg-[#00a98f] active:bg-[#00987a] transition-colors duration-200 cursor-pointer"
                    >
                        Add Movie
                    </button>
                </form>



            </div>
        </div>
    );
};

export default UpdateMovies;