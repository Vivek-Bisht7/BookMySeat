import React, { useState } from "react";
import axios from "axios";

const Banners = () => {
  const [posterFiles, setPosterFiles] = useState([null, null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedFiles = [...posterFiles];
    updatedFiles[index] = file;
    setPosterFiles(updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posterFiles.some((file) => file !== null)) {
      alert("Please select at least one banner.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      posterFiles.forEach((file, index) => {
        if (file) formData.append(`banner${index + 1}`, file);
      });

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/banner/addBanners`, formData);

      alert("Banners Added Successfully!");
      setPosterFiles([null, null, null, null, null]);
      setPreviews([null, null, null, null, null]);
    } catch (err) {
      console.error(err);
      alert("Error adding banners");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all banners?")) return;

    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/banner/deleteAllBanners`);
      alert("All banners deleted successfully!");
      setPosterFiles([null, null, null, null, null]);
      setPreviews([null, null, null, null, null]);
    } catch (err) {
      console.error(err);
      alert("Error deleting banners");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-zinc-950 text-white flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl">
        {/* Header with Delete All button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold tracking-tight">Add Banners</h2>
          <button
            type="button"
            onClick={handleDeleteAll}
            disabled={loading}
            className="py-3 px-6 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/30"
          >
            Delete All
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">
          {posterFiles.map((file, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Banner {index + 1}
              </label>

              <div className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-indigo-500 transition">
                <span className="text-zinc-400 text-sm truncate">
                  {file ? file.name : "Choose an image file"}
                </span>

                <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition">
                  Browse
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, index)}
                    className="hidden"
                  />
                </label>
              </div>

              {previews[index] && (
                <div className="mt-4">
                  <img
                    src={previews[index]}
                    alt={`Banner ${index + 1}`}
                    className="w-64 h-32 object-cover rounded-xl border border-zinc-700"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/30"
          >
            Add Banners
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banners;