import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`movie/${movie._id}`} className="block group">
      <div className="relative rounded-2xl bg-neutral-900 overflow-hidden transition-all duration-300 shadow-lg group-hover:shadow-red-500/20 group-hover:shadow-2xl">
        
        <div className="relative aspect-2/3 overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
            <span className="text-yellow-400 text-xs">⭐</span>
            <span className="text-white text-xs font-bold">{movie.rating}</span>
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-white font-bold text-base md:text-lg truncate group-hover:text-red-500 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-neutral-400 text-xs font-medium uppercase tracking-wider">
              {movie.language}
            </span>
            <span className="text-neutral-600 text-xs">•</span>
            <span className="text-neutral-400 text-xs truncate">
              {movie.genre}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;