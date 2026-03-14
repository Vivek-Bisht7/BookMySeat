import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import DashBoard from "../AdminPages/DashBoard";
import Movie from "../AdminPages/Movie";
import Show from "../AdminPages/Show";
import Theatre from "../AdminPages/Theatre";
import Screen from "../AdminPages/Screen";
import Banners from "../AdminPages/Banners";

const Admin = () => {
  const { user } = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!user) return;

    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${encodeURIComponent(user?.email)}`,
      )
      .then((res) => {
        if (res.data.role === "admin") setIsAdmin(true);
        else setIsAdmin(false);
      })
      .catch((err) => {
        console.log(err);
        setIsAdmin(false);
      });
  }, [user]);

  
  if (!user) {
    return (
      <div className="flex justify-center items-center text-white text-4xl font-bold min-h-screen">
        Login is required
      </div>
    );
  }

  if (isAdmin === false) {
  return (
    <div className="flex justify-center items-center text-white text-4xl font-bold min-h-screen">
      Access Denied
    </div>
  );
}

  return (
    <div className="min-h-screen text-white select-none flex">
      {/* Sidebar */}
      <div className="w-[25%] bg-zinc-900 pt-4 space-y-2 p-2 text-gray-200">
        <button
          onClick={() => {
            setActiveTab("dashboard");
          }}
          className={`w-full ${activeTab === "dashboard" ? "bg-zinc-800" : "bg-zinc-950"}  p-2 cursor-pointer rounded-md hover:bg-zinc-800`}
        >
          Dashboard
        </button>

        <button
          onClick={() => {
            setActiveTab("Movie");
          }}
          className={`w-full ${activeTab === "Movie" ? "bg-zinc-800" : "bg-zinc-950"}  p-2 cursor-pointer rounded-md hover:bg-zinc-800`}
        >
          Movie
        </button>

        <button
          onClick={() => {
            setActiveTab("Theatre");
          }}
          className={`w-full ${activeTab === "Theatre" ? "bg-zinc-800" : "bg-zinc-950"}  p-2 cursor-pointer rounded-md hover:bg-zinc-800`}
        >
          Theatre
        </button>

        <button
          onClick={() => {
            setActiveTab("Show");
          }}
          className={`w-full ${activeTab === "Show" ? "bg-zinc-800" : "bg-zinc-950"}  p-2 cursor-pointer rounded-md hover:bg-zinc-800`}
        >
          Show
        </button>

        <button
          onClick={() => {
            setActiveTab("Screen");
          }}
          className={`w-full ${activeTab === "Screen" ? "bg-zinc-800" : "bg-zinc-950"}  p-2 cursor-pointer rounded-md hover:bg-zinc-800`}
        >
          Screen
        </button>

        <button
          onClick={() => {
            setActiveTab("Banners");
          }}
          className={`w-full ${activeTab === "Banners" ? "bg-zinc-800" : "bg-zinc-950"}  p-2 cursor-pointer rounded-md hover:bg-zinc-800`}
        >
          Banners
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-zinc-950">
        <div className="bg-zinc-900 rounded-xl p-6 shadow-lg border border-zinc-800 h-full">
          {activeTab === "dashboard" && <DashBoard />}
          {activeTab === "Movie" && <Movie />}
          {activeTab === "Theatre" && <Theatre />}
          {activeTab === "Show" && <Show />}
          {activeTab === "Screen" && <Screen />}
          {activeTab === "Banners" && <Banners />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
