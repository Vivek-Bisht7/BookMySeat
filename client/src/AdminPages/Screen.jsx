import React, { useState, useEffect } from "react";
import axios from "axios";

const AddScreen = () => {
  const [theatres, setTheatres] = useState([]);
  const [loadingTheatres, setLoadingTheatres] = useState(true);

  const [screen, setScreen] = useState({
    theatre: "",
    name: "",
    rows: 6,
    cols: 8,
    aisleAfter: "2,4",
  });

  const [seatTypes, setSeatTypes] = useState([
    { name: "VIP", rows: "0,1", price: 250, color: "border-blue-500" },
    { name: "Regular", rows: "2,3", price: 400, color: "border-yellow-600" },
    { name: "Recliner", rows: "4,5", price: 600, color: "border-purple-500" },
  ]);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/theatre/getAllTheatres`
        );

        setTheatres(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTheatres(false);
      }
    };

    fetchTheatres();
  }, []);

  const handleChange = (e) => {
    setScreen({ ...screen, [e.target.name]: e.target.value });
  };

  const handleSeatTypeChange = (index, field, value) => {
    const updated = [...seatTypes];
    updated[index][field] = value;
    setSeatTypes(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        theatre: screen.theatre,
        name: screen.name,
        seatLayout: {
          rows: Number(screen.rows),
          cols: Number(screen.cols),
          aisleAfter: screen.aisleAfter
            .split(",")
            .map((n) => Number(n.trim())),
        },
        seatTypes: seatTypes.map((type) => ({
          ...type,
          rows: type.rows.split(",").map((r) => Number(r.trim())),
          price: Number(type.price),
        })),
      };

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/screen/addScreen`,
        payload
      );

      alert("Screen Added Successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding screen");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-8">Add New Screen</h2>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* THEATRE */}
            <div>
              <label className="block mb-2 text-sm text-zinc-400">
                Select Theatre
              </label>

              <select
                name="theatre"
                value={screen.theatre}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                required
              >
                <option value="">-- Select Theatre --</option>
                {loadingTheatres ? (
                  <option disabled>Loading...</option>
                ) : (
                  theatres.map((theatre) => (
                    <option key={theatre._id} value={theatre._id}>
                      {theatre.name} ({theatre.city})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* SCREEN NAME */}
            <div>
              <label className="block mb-2 text-sm text-zinc-400">
                Screen Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Example: Screen 1 / IMAX Hall"
                value={screen.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                required
                autoComplete="off"
              />
            </div>

            {/* LAYOUT */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Seat Layout Configuration
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-zinc-400">Total Rows</label>
                  <input
                    type="number"
                    name="rows"
                    value={screen.rows}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">Total Columns</label>
                  <input
                    type="number"
                    name="cols"
                    value={screen.cols}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">
                    Aisle After Columns
                  </label>
                  <input
                    type="text"
                    name="aisleAfter"
                    value={screen.aisleAfter}
                    onChange={handleChange}
                    placeholder="Example: 2,4"
                    className="w-full mt-1 p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    Adds walking space after selected column numbers.
                  </p>
                </div>
              </div>
            </div>

            {/* SEAT TYPES */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Seat Categories & Pricing
              </h3>

              {seatTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 p-4 rounded-xl mb-4 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={type.name}
                        onChange={(e) =>
                          handleSeatTypeChange(index, "name", e.target.value)
                        }
                        className="w-full mt-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-zinc-400">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={type.price}
                        onChange={(e) =>
                          handleSeatTypeChange(index, "price", e.target.value)
                        }
                        className="w-full mt-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400">
                      Rows (0-based index)
                    </label>
                    <input
                      type="text"
                      value={type.rows}
                      onChange={(e) =>
                        handleSeatTypeChange(index, "rows", e.target.value)
                      }
                      placeholder="Example: 0,1"
                      className="w-full mt-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      Row indexing starts from 0. Example: 0 = first row.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold"
            >
              Add Screen
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScreen;