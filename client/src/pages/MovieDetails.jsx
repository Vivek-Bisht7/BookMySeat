import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/movie/getMovie/${id}`
        );

        setMovie(res.data.movie);
        setLoading(false);

      } catch (err) {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
      </div>
    );

  if (!movie) {
    return (
      <div className="min-h-screen text-white p-6 flex flex-col justify-center items-center text-4xl gap-5">
        Movie not found
        <Link to="/" className="text-green-400">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-6 select-none">

      <div className="bg-zinc-900 p-4 rounded-2xl flex justify-between items-center mb-6 shadow-lg">
        <div>
          <h1 className="font-bold text-3xl">{movie.title}</h1>
          <p className="text-zinc-400 mt-1">
            ⭐ {movie.rating} • {movie.language} • {movie.genre.join(", ")}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-xl font-semibold transition"
          >
            Back
          </Link>

          <Link
            to={`/movie/${id}/Theatres`}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-xl font-bold transition"
          >
            Book Tickets
          </Link>
        </div>
      </div>

      <div className="flex gap-6">

        <iframe
          width="700"
          height="400"
          title="YouTube video"
          allowFullScreen
          src={`https://www.youtube.com/embed/${movie.trailerCode}?autoplay=1&mute=1&controls=0`}
        />

        <div className="flex-1 p-4">
          <p className="text-zinc-400 leading-relaxed">
            {movie.description}
          </p>

          <div className="mt-6 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md">
            <h3 className="text-lg font-bold">
              Limited Seats Available!
            </h3>

            <p className="text-zinc-400 text-sm mt-2">
              Book your tickets now and enjoy the cinematic experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;