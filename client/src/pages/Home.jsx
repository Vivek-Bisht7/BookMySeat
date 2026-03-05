import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import NowShowing from "../components/NowShowing";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500"></div>
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col">
        <HeroCarousel/> 
        <NowShowing/>
      </div>
    </div>
  );
};

export default Home;
