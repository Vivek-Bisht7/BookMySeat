import React, { useState } from "react";
import Authentication from "./pages/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import MovieDetails from "./pages/MovieDetails";
import Seats from "./pages/Seats";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Authentication />} />
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
          <Route path="/movie/:id/seats" element={<Seats/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
