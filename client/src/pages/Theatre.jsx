import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { LocationContext } from "../contexts/LocationContext";

const formatDateWithDay = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

const convertTo12Hour = (time24) => {
  if (!time24) return "";

  const [hours, minutes] = time24.split(":");
  const date = new Date();
  date.setHours(hours, minutes);

  return date
    .toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase(); 
};

const Theatre = () => {
  const { id } = useParams();
  
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [movie, setMovie] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   

  const { userLocation, locationLoading, locationError } =
    useContext(LocationContext);

      console.log(userLocation);


  useEffect(() => {
  const fetchData = async () => {
    try {
      if (!userLocation) return;

      setLoading(true);
      setError("");

      const [movieRes, showRes] = await Promise.all([
        axios.get(`${API_URL}/movie/getMovie/${id}`),
        axios.get(`${API_URL}/show/${id}?city=${userLocation}`),
      ]);
      const movieData = movieRes.data?.movie || movieRes.data;
      setMovie(movieData);

      const showData = showRes.data || {};

      const uniqueDates = [
        ...new Set(
          (showData.dates || []).map((d) => d.split("T")[0])
        ),
      ];

      setDates(uniqueDates);
      setSelectedDate(uniqueDates[0] || "");
      setTheatres(showData.theatres || []);

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  if (id && userLocation && !locationLoading) {
    fetchData();
  }
}, [id, API_URL, userLocation, locationLoading]);

  if (loading) return <div className="text-white m-6">Loading...</div>;
  if (error) return <div className="text-red-500 m-6">{error}</div>;
  if (!movie) return <div className="text-white m-6">Movie not found</div>;

  return (
    <div className="m-6 select-none min-h-screen">
      {/* Movie Title */}
      <h1 className="text-white font-semibold text-4xl mb-6">{movie.title}</h1>

      {/* Date Selector */}
      {dates.length > 0 && (
        <div className="flex gap-4 mb-8 p-4 border-t border-b border-gray-600">
          {dates.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 text-white rounded-lg transition ${
                selectedDate === date
                  ? "bg-red-700"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {formatDateWithDay(date)}
            </button>
          ))}
        </div>
      )}

      {/* Theatre List */}
      <div className="space-y-4">
        {theatres.map((theatre) => {
          const filteredShows =
            theatre.showtimes?.filter(
              (show) => show.date.split("T")[0] === selectedDate
            ) || [];

          if (filteredShows.length === 0) return null;

          return (
            <div
              key={theatre._id}
              className="bg-zinc-800 flex justify-between items-center rounded-lg"
            >
              <h2 className="text-white font-semibold text-2xl p-5">
                {theatre.name}
              </h2>

              <div className="flex flex-wrap items-center p-4 gap-6 text-gray-300">
                {filteredShows.map((show) => (
                  <Link
                    key={show._id}
                    to={`/seats/${show._id}`}
                    className="border border-l-4 border-green-500 p-3 hover:bg-zinc-700 transition"
                  >
                    {convertTo12Hour(show.time)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {theatres.length === 0 && (
        <div className="text-gray-400 mt-6">
          No shows available for this movie.
        </div>
      )}
    </div>
  );
};

export default Theatre;