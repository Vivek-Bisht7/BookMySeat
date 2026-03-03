import React, { useState } from "react";
import axios from "axios";

const Theatre = () => {
  const [theatre, setTheatre] = useState({
    name: "",
    city: "",
    address: "",
    type: "",
    facilities: "",
  });

  const handleChange = (e) => {
    setTheatre({ ...theatre, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: theatre.name,
        city: theatre.city,
        address: theatre.address,
        type: theatre.type,
        facilities: theatre.facilities
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f !== ""),
      };

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/theatre/addTheatre`,
        payload
      );

      alert("Theatre Added Successfully");

      setTheatre({
        name: "",
        city: "",
        address: "",
        type: "",
        facilities: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error adding theatre");
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-zinc-950 text-white flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl">

        <h2 className="text-4xl font-bold mb-8 tracking-tight">
          Add New Theatre
        </h2>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Theatre Name */}
            <input
              type="text"
              name="name"
              placeholder="Theatre Name"
              value={theatre.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              autoComplete="off"
            />

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={theatre.city}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              autoComplete="off"
            />

            {/* Address */}
            <textarea
              name="address"
              placeholder="Full Address"
              rows="3"
              value={theatre.address}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
              required
              autoComplete="off"
            />

            {/* Theatre Type */}
            <input
              type="text"
              name="type"
              placeholder="Type (IMAX, 3D, Multiplex, etc.)"
              value={theatre.type}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              autoComplete="off"
            />

            {/* Facilities */}
            <input
              type="text"
              name="facilities"
              placeholder="Facilities (comma separated e.g. Parking, Food Court, Recliner)"
              value={theatre.facilities}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 
                         focus:ring-2 focus:ring-indigo-500 outline-none transition"
              autoComplete="off"
            />

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 
                         text-white font-semibold rounded-xl 
                         transition-all duration-200 shadow-lg hover:shadow-indigo-500/30"
            >
              Add Theatre
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Theatre;