import React, { useState } from "react";
import axios from "axios";

const Movie = () => {
  const [movie, setMovie] = useState({
    title: "",
    rating: "",
    language: "",
    genre: "",
    description: "",
    trailerCode: "",
  });

  const [posterFile, setPosterFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPosterFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", movie.title);
      formData.append("rating", movie.rating);
      formData.append("language", movie.language);
      formData.append(
        "genre",
        JSON.stringify(movie.genre.split(",").map((g) => g.trim()))
      );
      formData.append("description", movie.description);
      formData.append("trailerCode", movie.trailerCode);
      formData.append("poster", posterFile);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/movie/addMovie`,
        formData
      );

      alert("Movie Added Successfully");

      setMovie({
        title: "",
        rating: "",
        language: "",
        genre: "",
        description: "",
        trailerCode: "",
      });

      setPosterFile(null);
      setPreview(null);

    } catch (err) {
      console.error(err);
      alert("Error adding movie");
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-zinc-950 text-white flex justify-center items-start py-10 px-4">

      <div className="w-full max-w-3xl">

        <h2 className="text-4xl font-bold mb-8 tracking-tight">
          Add New Movie
        </h2>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="title"
              placeholder="Movie Title"
              value={movie.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              autoComplete="off"
            />

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Movie Poster
              </label>

              <div className="flex items-center justify-between w-full p-4 rounded-xl 
                              bg-zinc-800 border border-zinc-700 
                              hover:border-indigo-500 transition">

                <span className="text-zinc-400 text-sm truncate">
                  {posterFile ? posterFile.name : "Choose an image file"}
                </span>

                <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 
                                  text-white font-semibold px-4 py-2 
                                  rounded-lg transition">
                  Browse
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Poster Preview"
                    className="w-40 h-56 object-cover rounded-xl border border-zinc-700"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-10)"
                min="0"
                max="10"
                step="0.1"
                value={movie.rating}
                onChange={handleChange}
                className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                           focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />

              <input
                type="text"
                name="language"
                placeholder="Language"
                value={movie.language}
                onChange={handleChange}
                className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                           focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
                autoComplete="off"
              />
            </div>

            <input
              type="text"
              name="genre"
              placeholder="Genre (comma separated)"
              value={movie.genre}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              autoComplete="off"
            />

            <textarea
              name="description"
              placeholder="Movie Description"
              rows="4"
              value={movie.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
              required
            />

            <input
              type="text"
              name="trailerCode"
              placeholder="YouTube Trailer Code"
              value={movie.trailerCode}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              autoComplete="off"
            />

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 
                         text-white font-semibold rounded-xl 
                         transition-all duration-200 shadow-lg hover:shadow-indigo-500/30"
            >
              Add Movie
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Movie;