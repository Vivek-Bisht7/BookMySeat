import React, { useEffect, useState } from "react";
import Authentication from "./pages/Authentication";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import MovieDetails from "./pages/MovieDetails";
import Seats from "./pages/Seats";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Theatre from "./pages/Theatre";
import Admin from "./pages/Admin";
import { LocationProvider } from "./contexts/LocationContext";
import BookingConfirmation from "./pages/BookingConfirmation";
import { Toaster } from "react-hot-toast";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useLocation().pathname]);

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <Toaster position="top-center" />
      <AuthProvider>
        <LocationProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Authentication />} />
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movie/:id/Theatres" element={<Theatre />} />
            <Route path="/seats/:id" element={<Seats />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/confirmation/:id" element={<BookingConfirmation />} />
          </Routes>
          <Footer />
        </LocationProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
