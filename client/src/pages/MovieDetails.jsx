import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import movies from "../data/movies";

const MovieDetails = () => {
  const { id } = useParams();

  // Find the selected movie using route param
  const movie = movies.find((m) => m.id === Number(id));

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-6">
      
      {/* ===================== Header ===================== */}
      <div className="bg-zinc-900 p-4 rounded-2xl flex justify-between items-center mb-6 shadow-lg">
        
        {/* Movie Title + Info */}
        <div>
          <h1 className="font-bold text-3xl">{movie.title}</h1>

          <p className="text-zinc-400 mt-1">
            ⭐ {movie.rating} • {movie.language} • {movie.genre}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-xl font-semibold transition"
          >
            Back
          </Link>

          <Link
            to={`/movie/${movie.id}/seats`}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl font-bold transition"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* ===================== Main Section ===================== */}
      <div className="flex">
        
        {/* -------- Trailer -------- */}
        <iframe
          width="700"
          height="400"
          title="YouTube video"
          allowFullScreen
          src={`https://www.youtube.com/embed/${movie.trailerCode}?autoplay=1&mute=1&controls=0`}
        />

        {/* -------- Movie Info -------- */}
        <div className="flex-1 p-4">
          
          {/* Description */}
          <p className="text-zinc-400 leading-relaxed">
            Experience the magic of{" "}
            <span className="text-white font-semibold">{movie.title}</span> on
            the big screen. Book your seats now and enjoy an unforgettable
            cinematic journey.
          </p>

          {/* Highlight Box */}
          <div className="mt-6 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md">
            <h3 className="text-lg font-bold">Limited Seats Available!</h3>

            <p className="text-zinc-400 text-sm mt-2">
              Book your tickets now and enjoy the cinematic experience on the
              big screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
