import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate , Navigate} from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

const Seats = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [seatStatus, setSeatStatus] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { user} = useContext(AuthContext);



  const fetchShow = async () => {
    try {
      const res = await api.get(`/show/getShow/${id}`);
      setShow(res.data);
    } catch (err) {
      console.error(err);
    }
  }; 

  const fetchSeatStatus = async () => {
    try {
      const res = await api.get(`/booking/show/${id}/seats`);
      setSeatStatus(res.data);
    } catch (err) {
      console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchShow();
    fetchSeatStatus();

    const interval = setInterval(() => {
      fetchSeatStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [id , user]);

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
      </div>
    );

  if (!show) return <div className="text-white p-6 min-h-screen ">Show not found</div>;

  const { screen, movie } = show;
  const { seatLayout, seatTypes } = screen;
  const { rows, cols, aisleAfter } = seatLayout;

  const getSeatCategory = (rowIndex) => {
    for (let type of seatTypes) {
      if (type.rows.includes(rowIndex)) return type;
    }
    return seatTypes[0];
  };

  const getSeatStatus = (seat) => {
    const found = seatStatus.find((s) => s.seatNumber === seat);
    if (!found) return "AVAILABLE";
    return found.status;
  };

  const handleSeatClick = (seat) => {
    const status = getSeatStatus(seat);
    if (status !== "AVAILABLE") return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.reduce((total, seat) => {
    const rowIndex = seat.charCodeAt(0) - 65;
    const category = getSeatCategory(rowIndex);
    return total + category.price;
  }, 0);

  const handleBookNow = async () => {
    if (selectedSeats.length === 0) return;

    if (!user) {
    navigate("/login", { state: { from: window.location.pathname } });
    return;
  }

    try {
      setBookingLoading(true);

      const res = await api.post("/booking/lock", {
        showId: id,
        seats: selectedSeats,
      });

      navigate(`/confirmation/${res.data.booking._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
      fetchSeatStatus();
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="p-8 text-white min-h-screen bg-linear-to-br from-black via-zinc-900 to-black">

      {/* Header */}
      <div className="flex justify-between bg-zinc-800/70 backdrop-blur-md p-4 rounded-2xl border border-zinc-700">
        <span className="text-2xl font-semibold">
          Select Seats – {movie.title}
        </span>
        <Link
          to={`/movie/${movie._id}/Theatres`}
          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition"
        >
          Back
        </Link>
      </div>

      {/* Screen */}
      <div className="relative mb-10 mt-10 select-none">
        <div className="w-[70%] h-1 bg-blue-500 mx-auto rounded-full shadow-[0_0_25px_rgba(59,130,246,0.9)]"></div>
        <div className="text-center text-xs tracking-[0.5em] text-zinc-500 mt-2 uppercase">
          Screen This Way
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mb-8 text-xs text-zinc-400">
        <Legend color="bg-zinc-700" label="Available" />
        <Legend color="bg-green-500" label="Selected" />
        <Legend color="bg-yellow-500" label="Pending" />
        <Legend color="bg-red-600" label="Booked" />
      </div>

      {/* Seats */}
      <div className="flex flex-col gap-4 items-center select-none">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-3">
            {[...Array(cols)].map((_, colIndex) => {
              const seat = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              const status = getSeatStatus(seat);
              const isSelected = selectedSeats.includes(seat);
              const category = getSeatCategory(rowIndex);

              return (
                <React.Fragment key={seat}>
                  <button
                    disabled={status !== "AVAILABLE"}
                    onClick={() => handleSeatClick(seat)}
                    onMouseEnter={() =>
                      setHoveredSeat({
                        seat,
                        type: category.name,
                        price: category.price,
                      })
                    }
                    onMouseLeave={() => setHoveredSeat(null)}
                    className={`relative w-11 h-11 rounded-xl text-[11px] font-semibold border transition-all duration-200 transform
                      ${
                        status === "CONFIRMED"
                          ? "bg-red-600 border-red-400 cursor-not-allowed opacity-80"
                          : status === "PENDING"
                          ? "bg-yellow-500 border-yellow-300 cursor-not-allowed opacity-80"
                          : isSelected
                          ? "bg-green-500 border-green-300 scale-110 shadow-lg"
                          : "bg-zinc-800 border-zinc-600 hover:scale-110 hover:bg-zinc-700"
                      }
                    `}
                  >
                    {seat}
                  </button>

                  {aisleAfter.includes(colIndex + 1) && (
                    <div className="w-6"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      {/* Hover Tooltip */}
      {hoveredSeat && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-2xl shadow-2xl text-sm text-white z-20">
          <span className="font-bold">{hoveredSeat.seat}</span> •{" "}
          {hoveredSeat.type} • ₹{hoveredSeat.price}
        </div>
      )}

      {/* Booking Summary */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 p-6 rounded-2xl shadow-2xl flex justify-between items-center z-10">
          <div>
            <p className="text-zinc-400 text-xs uppercase">
              {selectedSeats.length} Seats Selected
            </p>
            <p className="text-3xl font-bold text-green-400">
              ₹{totalPrice}
            </p>
          </div>

          <button
            onClick={handleBookNow}
            disabled={bookingLoading}
            className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold transition disabled:opacity-50"
          >
            {bookingLoading ? "Processing..." : "Book Tickets"}
          </button>
        </div>
      )}
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 ${color} rounded`}></div>
    {label}
  </div>
);

export default Seats;