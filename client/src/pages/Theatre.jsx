import React, { useState } from "react";
import movies from "../data/movies";
import { Link, useParams } from "react-router-dom";
import showData from "../data/showData.js";

const Theatre = () => {
  const { id } = useParams();

  // Find selected movie
  const movie = movies.find((m) => m.id === Number(id));

  const [selectedDate, setSelectedDate] = useState(showData.dates[0]);

  const { dates, theatres } = showData; 

  return <div className="m-6 select-none">
    <h1 className="text-white font-semibold text-4xl">{movie.title}</h1>

    <div className="flex gap-4 mt-4 mb-8 p-4 border-t border-b border-gray-600">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 text-white rounded-lg ${
              selectedDate === date
                ? "bg-red-700"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {date}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {theatres.map((theatre)=>(
            <div key={theatre.id} className="bg-zinc-800 flex justify-between">
                <h2 className="text-white font-semibold text-2xl p-5">
                    {theatre.name}
                </h2>

                
              <div className="flex flex-wrap items-center p-2 gap-6 text-gray-300 ">
                {theatre.showtimes.map((show) => (
                    <Link  
                        to={`/movie/${id}/seats`}
                    className="border border-l-4 border-green-500 p-3 cursor-pointer">
                        {show.time}
                    </Link>
                ))}

              </div> 
            </div>
        ))}
      </div>
  </div>;
};

export default Theatre;
