import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { LocationContext } from "../contexts/LocationContext";
import { ChevronLeft, MapPin, CalendarDays } from "lucide-react";

const formatTime = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDateParts = (isoDate) => {
  const date = new Date(isoDate);
  return {
    dayName: date.toLocaleDateString("en-IN", { weekday: "short" }),
    dayNum: date.getDate(),
    month: date.toLocaleDateString("en-IN", { month: "short" }),
  };
};

const Theatre = () => {
  const { id } = useParams();
  const { userLocation, locationLoading } = useContext(LocationContext);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [movie, setMovie] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userLocation || locationLoading) return;

      try {
        setLoading(true);

        const [movieRes, showRes] = await Promise.all([
          axios.get(`${API_URL}/movie/getMovie/${id}`),
          axios.get(`${API_URL}/show/${id}?city=${userLocation}`),
        ]);

        const availableDates = [
          ...new Set((showRes.data.dates || []).map((d) => d.split("T")[0])),
        ];

        setMovie(movieRes.data.movie || movieRes.data);
        setDates(availableDates);
        setSelectedDate(availableDates[0] || "");
        setTheatres(showRes.data.theatres || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, userLocation, locationLoading]);

  if (loading || locationLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!userLocation)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center">
        <MapPin className="text-red-500 mb-4" size={40} />
        <h2 className="text-xl font-semibold text-white">Select your location</h2>
        <p className="text-gray-400 text-sm">
          Choose a city to see theatres near you
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white select-none">

      <div className="bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">

          <Link
            to={`/movie/${id}`}
            className="p-2 bg-gray-900 rounded-full "
          >
            <ChevronLeft size={22} />
          </Link>

            <h1 className="text-4xl font-semibold mb-4">{movie?.title}</h1>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-4 flex gap-3 overflow-x-auto">

          {dates.map((date) => {
            const { dayName, dayNum, month } = formatDateParts(date);
            const active = selectedDate === date;

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center px-4 py-2 rounded-lg border text-sm transition
                ${
                  active
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-gray-900 border-gray-800 hover:border-red-500"
                }`}
              >
                <span className="text-xs">{dayName}</span>
                <span className="font-semibold">{dayNum}</span>
                <span className="text-xs">{month}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {theatres.filter((t) =>
          t.showtimes?.some((s) => s.date.split("T")[0] === selectedDate)
        ).length > 0 ? (
          theatres.map((theatre) => {

            const shows =
              theatre.showtimes?.filter(
                (s) => s.date.split("T")[0] === selectedDate
              ) || [];

            if (shows.length === 0) return null;

            return (
              <div
                key={theatre._id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:bg-gray-800 transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div>
                    <h2 className="text-lg font-semibold">{theatre.name}</h2>
                    <p className="text-xs text-green-400 mt-1">
                      M-Ticket Available
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    {shows.map((show) => (
                      <Link
                        key={show._id}
                        to={`/seats/${show._id}`}
                        className="px-4 py-2 border border-green-500 text-green-400 text-sm font-medium hover:bg-green-500 hover:text-black transition border-l-4 placeholder-green-500"
                      >
                        {formatTime(show.time)}
                      </Link>
                    ))}

                  </div>

                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-16">
            <CalendarDays className="mx-auto text-gray-600 mb-3" size={40} />
            <p className="text-gray-400">
              No shows available for this date
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Theatre;