import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import HeroCarousel from "../components/HeroCarousel";
import NowShowing from "../components/NowShowing";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-white w-full min-h-screen flex justify-center items-center">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="flex flex-1 flex-col">
        <HeroCarousel/> 
        <NowShowing/>
      </div>
    </div>
  );
};

export default Home;
