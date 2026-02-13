import { Link } from "react-router-dom";

const MovieCard = ({movie}) => {
    return (
        <div className="rounded-2xl bg-zinc-900 overflow-hidden transform transition duration-500 hover:scale-105 select-none">

            <img 
                src={movie.poster}
                alt={movie.title}
                className="h-80 object-cover w-full"
            />

            <div className="p-3 space-y-2">

                <h3 className="text-white font-bold text-lg truncate">
                    {movie.title}
                </h3>

                <p className="text-zinc-400 text-sm truncate">
                    ⭐ {movie.rating} • {movie.language} • {movie.genre}
                </p>

                <Link className="bg-red-600 text-white w-full rounded-xl py-2 font-semibold hover:bg-red-700 flex justify-center" to={`movie/${movie.id}`}>
                    Book Now
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;