import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Seats = () => {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await axios.get(`${API_URL}/show/getShow/${id}`);
        setShow(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id, API_URL]);

  if (loading)
    return <div className="text-white p-6">Loading...</div>;

  if (!show)
    return <div className="text-white p-6">Show not found</div>;

  const { screen, bookedSeats, movie } = show;
  const { seatLayout, seatTypes } = screen;
  const { rows, cols, aisleAfter } = seatLayout;

  /* Seat Category */
  const getSeatCategory = (rowIndex) => {
    for (let type of seatTypes) {
      if (type.rows.includes(rowIndex)) return type;
    }
    return seatTypes[0];
  };

  /* Seat Click */
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  /* Total Price */
  const totalPrice = selectedSeats.reduce((total, seat) => {
    const rowIndex = seat.charCodeAt(0) - 65;
    const category = getSeatCategory(rowIndex);
    return total + category.price;
  }, 0);

  return (
    <div className="p-6 text-white min-h-screen bg-zinc-950">

      {/* Header */}
      <div className="flex justify-between bg-zinc-800 p-4 rounded-xl">
        <span className="text-2xl font-semibold">
          Select Seats - {movie.title}
        </span>
        <Link to={`/movie/${movie._id}`} className="px-4 py-2 bg-zinc-700 rounded-xl">
          Back
        </Link>
      </div>

      {/* Screen */}
      <div className="relative mb-10 mt-8 select-none">
        <div className="w-[70%] h-1 bg-blue-500 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
        <div className="text-center text-[10px] tracking-[1em] text-zinc-500 mt-2 uppercase">
          Screen This Way
        </div>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col gap-3 items-center select-none">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {[...Array(cols)].map((_, colIndex) => {
              const seat = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              const category = getSeatCategory(rowIndex);
              const borderColor = category.color;

              return (
                <React.Fragment key={seat}>
                  <div className="relative group">
                    <button
                      disabled={isBooked}
                      onClick={() => handleSeatClick(seat)}
                      className={`w-10 h-10 rounded-lg text-xs font-bold border-2 transition
                        ${borderColor}
                        ${isBooked
                          ? "bg-red-500 cursor-not-allowed"
                          : isSelected
                          ? "bg-green-500"
                          : "bg-zinc-700 hover:bg-zinc-600"
                        }
                      `}
                    >
                      {seat}
                    </button>
                    
                    {!isBooked && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                        bg-zinc-800 text-white text-xs px-3 py-1 rounded-md 
                        opacity-0 group-hover:opacity-100 transition-opacity 
                        whitespace-nowrap z-20 shadow-lg">
                        {category.name} • ₹{category.price}
                      </div>
                    )}
                  </div>

                  {aisleAfter.includes(colIndex + 1) && (
                    <div className="w-6"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      {/* Booking Summary */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-125
          bg-zinc-900 border border-zinc-700 p-5 rounded-2xl shadow-2xl 
          flex justify-between items-center z-10">
          <div>
            <p className="text-zinc-400 text-xs uppercase">
              Selected {selectedSeats.length} seats
            </p>
            <p className="text-2xl font-bold text-green-400">
              ₹{totalPrice}
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold transition-transform active:scale-95">
            Book Tickets
          </button>
        </div>
      )}
    </div>
  );
};

export default Seats;