import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Convert lat/lng to city
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await response.json();

      const city =
        data.address.state_district ||
        data.address.city ||
        data.address.town ||
        data.address.village;

      return city || "Unknown Location";
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return null;
    }
  };

  // Fetch location when user logs in
  useEffect(() => {
    if (!user) return;
    if (userLocation) return; // prevent multiple prompts

    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const city = await reverseGeocode(latitude, longitude);

        if (city) {
          setUserLocation(city);
        } else {
          setLocationError("Could not detect city");
        }

        setLocationLoading(false);
      },
      () => {
        setLocationError("Location permission denied");
        setLocationLoading(false);
      }
    );
  }, [user]);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        locationLoading,
        locationError,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};