import movies from "../data/movies";
import MovieCard from "./MovieCard";

const NowShowing = () => {
  return (
    <div className="mt-8 px-6 mb-4">
      <h2 className="text-3xl text-white font-bold mb-6"> 
        Now Showing 🎬
      </h2>

      <div className="grid grid-cols-5  gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default NowShowing;
