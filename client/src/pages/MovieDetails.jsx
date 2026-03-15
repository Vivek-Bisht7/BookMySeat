import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft,Ticket,Star,ShieldCheck,Zap,Info,} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/movie/getMovie/${id}`
        );
        setMovie(data.movie);
      } catch (err) {
        console.error("Failed to load movie details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-red-200 border-t-red-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-center">
        <Info className="text-gray-700" size={48} />
        <h2 className="text-xl text-gray-400">Movie details unavailable</h2>

        <Link to="/" className="text-red-500 font-semibold hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white select-none">

      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-black">

        <iframe
          className="absolute top-1/2 left-1/2 w-[110vw] h-[61.87vw] min-h-full min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
          src={`https://www.youtube.com/embed/${movie.trailerCode}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailerCode}&rel=0`}
          allow="autoplay"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

        <Link
          to="/"
          className="absolute top-8 left-8 p-3 bg-black/40 backdrop-blur border border-gray-700 rounded-full hover:bg-gray-800 transition"
        >
          <ChevronLeft size={22} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-10 pb-20">

        <div className="flex flex-col lg:flex-row gap-12 items-end">

          <div className="w-64 md:w-80 shrink-0 self-center lg:self-end">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-900 -rotate-2">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full aspect-2/3 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">

            <div className="space-y-4">

              <div className="flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-1.5 bg-red-100/10 text-red-500 px-4 py-2 rounded-full text-xs font-semibold border border-red-400/30">
                  <Star size={12} className="fill-red-500" />
                  {movie.rating}
                </div>

                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="text-xs font-medium text-gray-300 px-4 py-2 bg-gray-800 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                {movie.title}
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                {movie.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <Link
                to={`/movie/${id}/Theatres`}
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-3 rounded-xl font-semibold text-sm transition hover:bg-red-600 hover:text-white active:scale-95"
              >
                <Ticket size={18} />
                Book Tickets
              </Link>

              <div className="flex items-center gap-2 px-5 py-3 bg-gray-900 border border-gray-700 rounded-xl">
                <ShieldCheck size={18} className="text-green-500" />
                <span className="text-xs text-gray-300">
                  Instant booking confirmation
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">

          {[
            {
              label: "Status",
              value: "Available Now",
              icon: Zap,
              sub: "Booking open for all shows",
            },
            {
              label: "Language",
              value: movie.language,
              icon: Info,
              sub: "Original audio with subtitles",
            },
            {
              label: "Safety",
              value: "Verified Seats",
              icon: ShieldCheck,
              sub: "Guaranteed entry at venue",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl hover:bg-gray-900 transition"
            >
              <item.icon size={20} className="text-red-500 mb-3" />

              <p className="text-xs text-gray-500 mb-1">
                {item.label}
              </p>

              <p className="text-lg font-semibold text-white mb-1">
                {item.value}
              </p>

              <p className="text-xs text-gray-400">
                {item.sub}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default MovieDetails;