import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const NowShowing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieCount, setMovieCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sectionRef = useRef(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/movie/getAllMovie`);
        setMovies(data.movies || []);
        setMovieCount(data.count || 0);
      } catch (err) {
        setError("We couldn't load the movies right now.");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const desktopMovies = isExpanded ? movies : movies.slice(0, 5);

  if (loading) {
    return (
      <section className="mt-12 px-4 md:px-10 mb-12 w-full max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-neutral-800 rounded-md mb-8 animate-pulse" />
        <div className="flex gap-4 md:grid md:grid-cols-5 md:gap-6 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-44 md:w-full shrink-0">
              <div className="aspect-2/3 bg-neutral-800 rounded-2xl mb-4 animate-pulse" />
              <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-400 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-neutral-800 text-white rounded-full hover:bg-neutral-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="mt-12 px-4 md:px-10 mb-12 w-full max-w-7xl mx-auto" ref={sectionRef}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl text-white font-extrabold tracking-tight">
            Now Showing
          </h2>
          <p className="text-neutral-500 text-sm md:text-base mt-1">
            The latest releases currently in theaters
          </p>
        </div>

        {movieCount > 5 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:block text-red-500 text-sm font-bold hover:text-red-400 transition-colors"
          >
            {isExpanded ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      <div className="relative">
        <div className="flex md:hidden overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide">
          {movies.map((movie) => (
            <div key={movie._id} className="w-48 shrink-0 snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-8">
          {desktopMovies.map((movie) => (
            <div key={movie._id} className="transition-transform duration-300 hover:scale-[1.02]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NowShowing;