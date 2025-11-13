import { use, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const MyCollection = () => {
    const [movies, setMovies] = useState([]);
    const axiosInstance = useAxios()
   const {user} = use(AuthContext);

   useEffect(() => {
    axiosInstance
      .get("/myCollection")
      .then(res => {
        const filtered = res.data.filter(movie => movie.addedBy === user?.email);
        setMovies(filtered);
      })
      .catch(err => console.error(err));
  }, [axiosInstance, user]);



    return (
        <div className="bg-[#EDEDF5]">
            <div className='p-5 w-11/12 mx-auto'>
                <h2 className="text-4xl text-center py-10 font-semibold mb-3">My Collection Movies</h2>
                <div className="">
                    {movies.map(movie => (
                        <div key={movie._id} className="sm:flex justify-between bg-white rounded-2xl">
                            <div className="flex sm:p-0 pb-5 pl-5 pt-5">
                                <figure>
                                    <img className='h-[100px] rounded-2xl mr-3'
                                        src={movie.posterUrl}
                                        alt="movies Poster" />
                                </figure>
                                <div className="flex flex-col  justify-center">
                                    <h2 className="card-title">{movie.title}</h2>
                                    <p> {movie.releaseYear}, {movie.genre}</p>
                                </div>
                            </div>
                            <div className="flex items-center sm:justify-end justify-center sm:px-4 sm:pb-0 pb-5">
                                <button className="btn  btn-red mr-4">Delete</button>
                                <Link to={`/myCollection/${movie._id}`}>
                                    <button className="btn btn-primary">Details</button>
                                </Link>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default MyCollection;