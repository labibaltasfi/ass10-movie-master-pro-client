import { use, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const MyCollection = () => {
    const [movies, setMovies] = useState([]);
    const axiosInstance = useAxios()
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/myCollection")
            .then(res => {
                const filtered = res.data.filter(movie => movie.addedBy === user?.email);
                setMovies(filtered);
            })
            .catch(err => console.error(err));
    }, [axiosInstance, user]);


   const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/allMovies/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });

                            // 
                            const remainingMovies = movies.filter(movie => movie._id !== _id);
                            setMovies(remainingMovies)
                        }
                    })
            }
        });
    }



    return (
        
            <div className='p-5 w-11/12 mx-auto min-h-screen'>
                <title>My Collection Movies</title>
                <h2 className="text-4xl text-center py-10 font-semibold mb-3">My Collection Movies</h2>
                
                    {movies.map(movie => (
                        <div key={movie._id} className="sm:flex justify-between bg-[#EDEDF5] text-black rounded-2xl mb-3">
                            <div className="flex sm:p-0 pb-5 pl-5 pt-5">
                                <figure>
                                    <img className='h-[100px]  w-[100px] rounded-2xl mr-3'
                                        src={movie.posterUrl}
                                        alt="movies Poster" />
                                </figure>
                                <div className="flex flex-col  justify-center">
                                    <h2 className="card-title">{movie.title}</h2>
                                    <p> {movie.releaseYear}, {movie.genre}</p>
                                </div>
                            </div>
                            <div className="flex items-center sm:justify-end justify-center sm:px-4 sm:pb-0 pb-5">
                                <button
                                    onClick={() => handleDelete(movie._id)}
                                    className="btn btn-red mr-4"
                                >
                                    Delete
                                </button>
                               <button
                                className="btn btn-primary ml-3"
                                onClick={() => navigate(`/updateMovies/${movie._id}`)}
                            >
                                Update
                            </button>
                            </div>
                        </div>
                    ))}

                </div>
      
    );
};

export default MyCollection;