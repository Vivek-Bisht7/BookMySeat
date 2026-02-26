import { useEffect, useRef, useState } from "react";
import movies from "../data/movies";
import MovieCard from "./MovieCard";

const NowShowing = () => {

  const limitedMovies = movies.slice(0,5);
  const [showMoreStatus, setShowMoreStatus] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if(showMoreStatus){
      headerRef.current?.scrollIntoView({behavior:"smooth"})
    }
  }, [showMoreStatus])
  

  return (
    <div className="mt-8 px-6 mb-4 select-none w-full">
      <h2 className="text-2xl text-white font-bold mb-6" ref={headerRef}> 
        Recommended Movies
      </h2>

      <div className="grid grid-cols-5  gap-6">
        {
          showMoreStatus?
            movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
        :
          limitedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>

      <div className="w-full flex justify-center">
          <button 
            className="flex justify-center m-4 p-2 cursor-pointer rounded-2xl text-amber-50 border-2 border-amber-50"
            onClick={()=>{setShowMoreStatus(!showMoreStatus)}}
            >{showMoreStatus?`${"Show Less"}`:`${"Show More"}`}</button>
      </div>
    </div>
  );
};

export default NowShowing;
