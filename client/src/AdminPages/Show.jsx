import React, { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);

  const [show, setShow] = useState({
    movie: "",
    theatre: "",
    screen: "",
    date: "",
    time: "",
    price: "",
  });

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(`${API}/movie/getAllMovie`);
      
      setMovies(res.data.movies || []);
    };

    const fetchTheatres = async () => {
      const res = await axios.get(`${API}/theatre/getAllTheatres`);
      setTheatres(res.data || []);
    };

    fetchMovies();
    fetchTheatres();
  }, []);

  // 🔹 Fetch Screens when theatre changes
  useEffect(() => {
    if (!show.theatre) return;
    
    const fetchScreens = async () => {
      const res = await axios.get(
        `${API}/screen/getScreensByTheatre/${show.theatre}`
      );
      setScreens(res.data.data || []);
    };

    fetchScreens();
  }, [show.theatre]);

  const handleChange = (e) => {
    setShow({ ...show, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/show/addShow`, {
        ...show,
        price: Number(show.price),
      });

      alert("Show Added Successfully");

      setShow({
        movie: "",
        theatre: "",
        screen: "",
        date: "",
        time: "",
        price: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error adding show");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl">

        <h2 className="text-4xl font-bold mb-8">
          Add New Show
        </h2>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Movie Dropdown */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Select Movie
              </label>
              <select
                name="movie"
                value={show.movie}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Choose Movie</option>
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Theatre Dropdown */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Select Theatre
              </label>
              <select
                name="theatre"
                value={show.theatre}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Choose Theatre</option>
                {theatres.map((theatre) => (
                  <option key={theatre._id} value={theatre._id}>
                    {theatre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Screen Dropdown */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Select Screen
              </label>
              <select
                name="screen"
                value={show.screen}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                required
                disabled={!show.theatre}
              >
                <option value="">Choose Screen</option>
                {screens.map((screen) => (
                  <option key={screen._id} value={screen._id}>
                    {screen.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Show Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={show.date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">
                  Show Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={show.time}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold"
            >
              Add Show
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Show;