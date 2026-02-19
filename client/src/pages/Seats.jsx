import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import movies from "../data/movies";

const Seats = ({
  rows = 6,
  cols = 8,
  aisleAfter = [2, 4],
  bookedSeats = ["B3", "D6"],

  seatTypes = {
    VIP: { rows: [0, 1], price: 250, color: "border-blue-500" },
    Regular: { rows: [2, , 3], price: 400, color: "border-yellow-600" },
    Recliner: { rows: [4, 5], price: 600, color: "border-purple-500" },
  },
}) => {
  const { id } = useParams();

  // Find selected movie
  const movie = movies.find((m) => m.id === Number(id));

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

  // Selected seats state
  const [selectedSeats, setSelectedSeats] = useState([]);

  // ✅ Find seat category based on row index
  const getSeatCategory = (rowIndex) => {
    for (let type in seatTypes) {
      if (seatTypes[type].rows.includes(rowIndex)) {
        return type;
      }
    }
    return "Regular";
  };

  // ✅ Handle seat click
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // ✅ Total Price Calculation
  const totalPrice = selectedSeats.reduce((total, seat) => {
    const rowChar = seat[0];
    const rowIndex = rowChar.charCodeAt(0) - 65;

    const category = getSeatCategory(rowIndex);
    return total + seatTypes[category].price;
  }, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-white flex justify-between bg-zinc-800 p-4 rounded-xl">
        <span className="font-semibold text-2xl">
          Select your Seats for {movie.title}
        </span>

        <Link to={`/movie/${id}`} className="px-6 py-2 bg-zinc-700 rounded-2xl">
          Back
        </Link>
      </div>

      {/* Screen */}
      <img
        src="/assets/screen.png"
        alt="Screen"
        className="w-[80%] mt-4 ml-26"
      />

      {/* ✅ Seat Type + Price Legend */}
      <div className="flex justify-center gap-8 text-sm mb-8 mt-4 flex-wrap">
        <span className="text-blue-300 font-semibold">
          🟦 Classic – ₹{seatTypes.VIP.price}
        </span>

        <span className="text-yellow-300 font-semibold">
          🟨 Prime – ₹{seatTypes.Regular.price}
        </span>

        <span className="text-purple-300 font-semibold">
          🟪 Recliner – ₹{seatTypes.Recliner.price}
        </span>

        <span className="text-green-400 font-semibold">🟩 Selected</span>

        <span className="text-red-400 font-semibold">🟥 Booked</span>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col gap-3 items-center text-gray-950 select-none">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {[...Array(cols)].map((_, colIndex) => {
              const seat = `${String.fromCharCode(65 + rowIndex)}${
                colIndex + 1
              }`;

              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              // Category styling
              const category = getSeatCategory(rowIndex);
              const borderColor = seatTypes[category].color;

              return (
                <React.Fragment key={seat}>
                  {/* Seat Button */}
                  <button
                    disabled={isBooked}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-10 h-10 rounded-lg text-xs font-bold transition
                      ${borderColor} border-2
                      ${
                        isBooked
                          ? "bg-red-500 cursor-not-allowed"
                          : isSelected
                            ? "bg-green-500"
                            : "bg-zinc-700 hover:bg-zinc-500"
                      }
                    `}
                  >
                    {seat}
                  </button>

                  {/* Aisle Gap */}
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
      <div
        className="mt-12 bg-linear-to-br from-zinc-900 to-zinc-800 
        p-8 w-[65%] rounded-2xl shadow-lg border border-zinc-700 
                    select-none mx-auto text-center"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-6">Booking Summary</h2>

        {/* Selected Seats */}
        <div className="mb-5">
          <p className="text-gray-300 text-lg mb-2">Selected Seats</p>

          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="px-3 py-1 bg-green-500/20 text-green-300 
            rounded-lg font-semibold text-sm border border-green-400"
                >
                  {seat}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-red-400 font-semibold">No seats selected</p>
          )}
        </div>

        {/* Total Price */}
        <div className="mb-6">
          <p className="text-gray-300 text-lg">Total Amount</p>
          <p className="text-3xl font-extrabold text-yellow-300 mt-1">
            ₹{totalPrice}
          </p>
        </div>

        {/* Confirm Button */}
        <button
          className="w-full max-w-62.5 py-3 rounded-xl 
    bg-green-500 text-gray-900 font-bold text-lg 
    hover:bg-green-400 active:scale-95 transition-all duration-200"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Seats;
