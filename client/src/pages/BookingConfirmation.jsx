import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import {Ticket,Calendar,MapPin,CreditCard,ChevronLeft,CheckCircle2,Clock,} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";

const Confirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchBooking = async () => {
    try {
      if (!user) return;
      const res = await api.get(`/booking/${id}`);
      setBooking(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      if (user) setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id, user]);

  const handlePayment = async () => {
    try {
      setPayLoading(true);
      const { data: order } = await api.post("/booking/create-order", {
        bookingId: booking._id,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "BookMySeat",
        description: "Movie Ticket Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            await api.post("/booking/verify-payment", {
              ...response,
              bookingId: booking._id,
            });
            await fetchBooking();
          } catch (err) {
            console.error("Verification failed", err);
          }
        },
        theme: { color: "#ef4444" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    } finally {
      setPayLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
      </div>
    );

  if (!booking)
    return <div className="text-white p-10 text-center">Booking not found</div>;

  const { show, seats, totalAmount, status, paymentId } = booking;
  const { movie, theatre, date, time } = show;
  const isConfirmed = status === "CONFIRMED";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30 select-none">
      <div className="fixed  z-0">
        <img
          src={movie.poster}
          alt=""
          className="w-full h-full object-cover opacity-20 blur-3xl"
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-950/80 to-zinc-950"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft size={20} /> <span>Back to Home</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-12">
              <img
                src={movie.poster}
                className="rounded-2xl shadow-2xl border border-white/10 w-full transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                alt={movie.title}
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
             
              <div
                className={`p-4 text-center text-sm font-bold tracking-widest uppercase ${isConfirmed ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isConfirmed ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Clock size={18} />
                  )}
                  {isConfirmed ? "Booking Confirmed" : "Payment Awaiting"}
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {movie.title}
                    </h1>
                    <div className="flex gap-3 mt-2">
                      <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-400 uppercase tracking-tighter">
                        {movie.language}
                      </span>
                      <span className="text-xs px-2 py-1 bg-zinc-800 rounded text-zinc-400 uppercase tracking-tighter">
                        {movie.genre}
                      </span>
                    </div>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-zinc-500 text-xs uppercase">
                      Booking ID
                    </p>
                    <p className="font-mono text-zinc-300">
                      {booking._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 py-8 border-b border-white/5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Location</p>
                        <p className="font-semibold">
                          {theatre.name}, {theatre.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Date & Time</p>
                        <p className="font-semibold">
                          {new Date(date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          • {time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                        <Ticket size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">
                          Seats ({seats.length})
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {seats.map((s, i) => (
                            <span
                              key={i}
                              className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded italic"
                            >
                              {s.seatNumber}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-zinc-400">Total Paid</p>
                        <p className="text-xl font-bold text-white">
                          ₹{totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  {!isConfirmed && (
                    <button
                      onClick={handlePayment}
                      disabled={payLoading}
                      className="flex-1 bg-red-600 hover:bg-red-500 disabled:bg-zinc-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/20 transition-all transform active:scale-95"
                    >
                      {payLoading ? "Processing..." : "Complete Payment"}
                    </button>
                  )}
                  {isConfirmed && (
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL}/booking/ticket/${booking._id}`}
                      className="flex-1 bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-4 rounded-2xl transition-all text-center"
                      download
                    >
                      Download Ticket (PDF)
                    </a>
                  )}
                </div>

                {paymentId && (
                  <p className="text-center text-[10px] text-zinc-600 mt-6 tracking-widest uppercase italic">
                    Transaction: {paymentId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
