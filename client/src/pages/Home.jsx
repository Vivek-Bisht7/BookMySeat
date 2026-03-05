import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import NowShowing from "../components/NowShowing";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 p-6 animate-pulse">
        <div className="w-full h-105 bg-zinc-800 rounded-xl mb-6"></div>

        <div className="h-10 w-60 bg-zinc-800 rounded mb-6"></div>

        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-60 shrink-0">
              <div className="h-70 bg-zinc-800 rounded-lg mb-3"></div>
              <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col">
        <HeroCarousel />
        <NowShowing />
      </div>
    </div>
  );
};

export default Home;
