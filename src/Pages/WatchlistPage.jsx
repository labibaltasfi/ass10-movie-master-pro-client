import { useEffect } from "react";

const WatchlistPage = () => {
    const { user } = useContext(AuthContext);
    const [allMovies, setAllMovies] = useState([]);
    const [watchlistTitles, setWatchlistTitles] = useState([]);
    const [watchlistMovies, setWatchlistMovies] = useState([]);

    useEffect(() => {
        // 1️⃣ Fetch all movies
        fetch("http://localhost:3000/allMovies")
            .then(res => res.json())
            .then(data => setAllMovies(data));

        // 2️⃣ Fetch watchlist titles
        fetch(`http://localhost:3000/watchlist/${user.email}`)
            .then(res => res.json())
            .then(data => setWatchlistTitles(data));
    }, [user]);

    useEffect(() => {
        // 3️⃣ Match titles and build full movies list
        const matched = allMovies.filter(movie =>
            watchlistTitles.some(w => w.title === movie.title)
        );
        setWatchlistMovies(matched);
    }, [allMovies, watchlistTitles]);

    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold mb-5">My Watchlist</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {watchlistMovies.map(movie => (
                    <div key={movie._id} className="shadow p-3 rounded bg-white">
                        <img src={movie.posterUrl} className="rounded" />
                        <h3 className="font-bold mt-2">{movie.title}</h3>
                        <p>{movie.genre}</p>
                        <p>Rating: {movie.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WatchlistPage;