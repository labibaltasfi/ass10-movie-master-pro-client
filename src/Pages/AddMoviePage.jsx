import React, { use, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddMoviePage = () => {

    const {user} = use(AuthContext);
     const [addMovies, setAddMovies] = useState([])
       const navigate = useNavigate();



     const handleAddMovie = (e) => {
        e.preventDefault();
         const form = e.target;
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

     

        const newMovie = {
            title: title,
            genre:genre,
            releaseYear: releaseYear,
            director: director,
            cast: cast,
            rating: rating,
            duration: duration,
            plotSummary: plotSummary,
            posterUrl: posterUrl,
            language:language,
            country: country,
            addedBy: email,
        }

        fetch('http://localhost:3000/allMovies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        })
            .then(res => res.json())
            .then(data => {
                    newMovie._id = data.insertedId;
                    const newMovies = [...addMovies, newMovie];
                    setAddMovies(newMovies);
                toast('Add movie successful')
                form.reset();
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            })

    }

    return (
       <div className='min-h-screen flex items-center justify-center bg-[#EDEDF5] px-4 py-10'>
            <ToastContainer></ToastContainer>
            <title>Register</title>
            <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl">
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8'>Add Movie</h2>
                <form onSubmit={handleAddMovie} className="space-y-4 sm:space-y-6">
                    {/* Name */}
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Movie Name</label> */}
                        <input
                            type="text"
                            name='name'
                            placeholder="Movie Name"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    

                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Genre</label> */}
                        <input
                            type="text"
                            name='genre'
                            placeholder="genre"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Release Year</label> */}
                        <input
                            type="text"
                            name='releaseYear'
                            placeholder="Release Year"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Director</label> */}
                        <input
                            type="text"
                            name='director'
                            placeholder="Director"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Cast</label> */}
                        <input
                            type="text"
                            name='cast'
                            placeholder="Cast"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Rating</label> */}
                        <input
                            type="text"
                            name='rating'
                            placeholder="Rating"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Duration</label> */}
                        <input
                            type="text"
                            name='duration'
                            placeholder="Duration"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">PlotSummary</label> */}
                        <input
                            type="text"
                            name='plotSummary'
                            placeholder="PlotSummary"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                     <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Poster URL</label> */}
                        <input
                            type="text"
                            name='posterUrl'
                            placeholder="Poster URL"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Language</label> */}
                        <input
                            type="text"
                            name='language'
                            placeholder="Language"
                            required
                            className="p-2 sm:p-2 rounded-xl border border-[#00BFA6] bg-white text-gray-800 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                    </div>
                    <div className="flex flex-col">
                        {/* <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Country</label> */}
                        <input
                            type="text"
                            name='country'
                            placeholder="Country"
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

export default AddMoviePage;