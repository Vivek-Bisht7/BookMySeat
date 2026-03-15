import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import HeroCarousel from "../components/HeroCarousel";
import NowShowing from "../components/NowShowing";
import { LocationContext } from "../contexts/LocationContext";
import toast from "react-hot-toast";

const Home = () => {
  const { loading } = useContext(AuthContext);
  const { locationError } = useContext(LocationContext);

  useEffect(() => {
    if (locationError) {
      toast.error(locationError);
    }
  }, [locationError]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] select-none">
        <div className="w-full px-0 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4">
          <div className="w-full h-40 sm:h-64 md:h-100 bg-neutral-900 animate-pulse rounded-none sm:rounded-2xl md:rounded-4xl" />
        </div>

        <div className="mt-12 px-4 md:px-10 max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-8">
            <div className="h-8 w-48 bg-neutral-900 animate-pulse rounded-lg" />
            <div className="h-4 w-64 bg-neutral-900/40 animate-pulse rounded-md" />
          </div>

          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-48 md:w-full shrink-0 flex flex-col gap-4">
                <div className="aspect-2/3 bg-neutral-900 animate-pulse rounded-2xl shadow-lg" />
                <div className="space-y-2">
                  <div className="h-5 bg-neutral-900 animate-pulse rounded-md w-3/4" />
                  <div className="h-4 bg-neutral-900/40 animate-pulse rounded-md w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#050505] select-none">
      <div className="flex-1 pb-10">
        <HeroCarousel />
        <NowShowing />
      </div>
    </main>
  );
};

export default Home;