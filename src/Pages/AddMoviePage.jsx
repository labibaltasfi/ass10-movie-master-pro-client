import React, { use, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';

const AddMoviePage = () => {

    const {user} = use(AuthContext);
     const [addMovies, setAddMovies] = useState([])


     const handleAddMovie = (e) => {
        e.preventDefault();
         const form = e.target;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const genre = e.target.genre.value;
        const releaseYear = e.target.releaseYear.value;
        const language = e.target.language.value;
        const posterUrl = e.target.posterUrl.value;
        const duration = e.target.duration.value;

        // console.log(productId, name, email, bid)

        const newBid = {
            title: name,
            genre:genre,
            releaseYear: releaseYear,
            posterUrl: posterUrl,
            language:language,
            duration: duration,
            addedBy: email,
        }

        fetch('http://localhost:3000/add-movies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                    newBid._id = data.insertedId;
                    const newBids = [...addMovies, newBid];
                    setAddMovies(newBids);
                toast('Add movie successful')
                form.reset();
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
                        <label className="mb-1 font-medium text-sm sm:text-base lg:text-lg">Movie Name</label>
                        <input
                            type="text"
                            name='name'
                            placeholder="Movie Name"
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