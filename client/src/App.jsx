import React, { useState } from "react";
import Authentication from "./pages/Authentication";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Authentication />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
