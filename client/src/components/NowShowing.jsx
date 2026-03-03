import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const NowShowing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieCount, setMovieCount] = useState(null);

  const [showMoreStatus, setShowMoreStatus] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/movie/getAllMovie`,
        );
        setMovies(res.data.movies);
        setMovieCount(res.data.count);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (showMoreStatus) {
      headerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showMoreStatus]);

  const limitedMovies = movies.slice(0, 5);

  return (
    <div className="mt-8 px-6 mb-4 select-none w-full">
      <h2 className="text-2xl text-white font-bold mb-6" ref={headerRef}>
        Recommended Movies
      </h2>

      {loading && <p className="text-white">Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-5 gap-6">
            {(showMoreStatus ? movies : limitedMovies).map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
          {movieCount > 5 && (
            <div className="w-full flex justify-center">
              <button
                className="flex justify-center m-6 px-6 py-2 cursor-pointer 
                 rounded-xl text-indigo-400 border border-indigo-400 
                 hover:bg-indigo-600 hover:text-white transition"
                onClick={() => setShowMoreStatus(!showMoreStatus)}
              >
                {showMoreStatus ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
          )
        </>
      )}
    </div>
  );
};

export default NowShowing;
