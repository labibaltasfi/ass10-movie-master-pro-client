import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const WatchlistPage = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    const [watchlist, setWatchlist] = useState([]);


  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://movie-master-pro-server-eta.vercel.app/watchlist/user/${user.email}`)
        .then(res => res.json())
        .then(data => setWatchlist(data));
}, [user]);



  
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Remove this movie from your watchlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://movie-master-pro-server-eta.vercel.app/watchlist/${_id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Movie removed from watchlist.", "success");

                    
                            setWatchlist(prev => prev.filter(item => item._id !== _id));
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        toast.error("Failed to remove movie");
                    });
            }
        });
    };

    return (
        <div className="p-5 w-11/12 mx-auto min-h-screen">
            <title>Watchlist</title>
            <h2 className="text-4xl text-center py-10 font-semibold mb-3">
                My Watchlist
            </h2>

            <ToastContainer />

            <div>
                {watchlist.map(item => (
                    <div
                        key={item._id}
                        className="sm:flex justify-between bg-[#EDEDF5] text-black rounded-2xl mb-3"
                    >
                        <div className="flex sm:p-0 pb-5 pl-5 pt-5">
                            <figure>
                                <img
                                    className="h-[100px] w-[100px] rounded-2xl mr-3"
                                    src={item.movie.posterUrl}
                                    alt="Movie Poster"
                                />
                            </figure>

                            <div className="flex flex-col justify-center">
                                <h2 className="card-title">{item.movie.title}</h2>
                                <p>{item.movie.releaseYear}, {item.movie.genre}</p>
                            </div>
                        </div>

                        <div className="flex items-center sm:justify-end justify-center sm:px-4 sm:pb-0 pb-5">
                           
                            <button
                                className="btn btn-red mr-4"
                                onClick={() => handleDelete(item._id)}
                            >
                                Delete
                            </button>

                            <button
                                className="btn btn-primary ml-3"
                                onClick={() => navigate(`/watchlist/${item._id}`)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WatchlistPage;
