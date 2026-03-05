import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LocationContext } from "../contexts/LocationContext";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle, MapPin } from "lucide-react";
import CustomSelect from "../components/CustomSelect";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const { userLocation, setUserLocation, locationLoading, locationError } =
    useContext(LocationContext);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const savedCity = localStorage.getItem("userCity");

    if (savedCity) {
      setUserLocation(savedCity);
    }
  }, []);

  const locationOptions = [
    {
      value: "delhi",
      label: "Delhi",
    },
    {
      value: "mumbai",
      label: "Mumbai",
    },
    {
      value: "bangalore",
      label: "Bangalore",
    },
    {
      value: "hyderabad",
      label: "Hyderabad",
    },
    {
      value: "chennai",
      label: "Chennai",
    },
    {
      value: "kolkata",
      label: "Kolkata",
    },
    {
      value: "pune",
      label: "Pune",
    },
    {
      value: "ahmedabad",
      label: "Ahmedabad",
    },
    {
      value: "jaipur",
      label: "Jaipur",
    },
    {
      value: "chandigarh",
      label: "Chandigarh",
    },
    {
      value: "lucknow",
      label: "Lucknow",
    },
    {
      value: "dehradun",
      label: "Dehradun",
    },
    {
      value: "indore",
      label: "Indore",
    },
    {
      value: "bhopal",
      label: "Bhopal",
    },
    {
      value: "surat",
      label: "Surat",
    },
  ];

  const handleLocationChange = (option) => {
    const city = option.label;

    setUserLocation(city);
    localStorage.setItem("userCity", city);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setQuery("");
  };

  if (loading) {
    return (
      <div className="bg-neutral-900 h-16 w-full flex items-center px-6 border-b border-neutral-800 select-none shadow-lg gap-6">
        <div className="w-32 h-6 bg-neutral-800 rounded animate-pulse"></div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md h-8 bg-neutral-800 rounded-full animate-pulse"></div>
        </div>

        <div className="w-24 h-5 bg-neutral-800 rounded animate-pulse"></div>

        <div className="w-10 h-10 bg-neutral-800 rounded-full animate-pulse"></div>
      </div>
    );
  }
  return (
    <div className="bg-neutral-900 h-16 w-full flex items-center px-6 border-b border-neutral-800 select-none shadow-lg">
      {/* Logo */}
      <h1
        className="font-bold text-neutral-100 tracking-wider text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        BookMySeat
      </h1>

      {/* Center */}
      {!isLoginPage && (
        <div className="flex-1 flex justify-center items-center">
          {isAdminRoute ? (
            <h2 className="text-xl font-semibold text-white">
              Administrator Dashboard
            </h2>
          ) : (
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-full px-4 py-1 w-full">
                <IoSearch className="text-neutral-400 text-lg" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, theatres..."
                  className="bg-transparent outline-none text-sm text-neutral-200 w-full placeholder:text-neutral-500"
                />
              </div>
            </form>
          )}
        </div>
      )}

      {/* Location */}
      {localStorage.getItem("userCity") && (
          <div className="flex items-center gap-2 text-white px-4">
              <MapPin className="text-red-500" />
              <span>{localStorage.getItem("userCity")}</span>
            </div>
      )}

      {!localStorage.getItem("userCity") && !isLoginPage && (
        <div className="flex items-center text-sm text-neutral-400 gap-3 mx-4">
          {locationLoading && (
            <>
              <LoaderCircle className="animate-spin text-blue-400" />
              <span>Detecting Location...</span>
            </>
          )}
          {userLocation && !locationLoading && !locationError && (
            <div className="flex items-center gap-2 text-white px-4">
              <MapPin className="text-red-500" />
              <span>{userLocation}</span>
            </div>
          )}
        </div>
      )}

      {!localStorage.getItem("userCity") && !isLoginPage && locationError && (
        <div className="flex items-center gap-2 text-white px-4">
          <MapPin className="text-red-500" />

          <CustomSelect
            options={locationOptions}
            placeholder="Choose city"
            onChange={handleLocationChange}
          />
        </div>
      )}

      {/* Right */}
      {!isLoginPage && (
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={menuRef}>
              <img
                src={user.photoURL}
                alt="profile"
                className="rounded-full h-10 w-10 cursor-pointer border border-white"
                onClick={() => setOpen((prev) => !prev)}
                referrerPolicy="no-referrer"
              />
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-20">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-700 rounded-md"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-white text-neutral-900 px-4 py-2 rounded-full font-medium hover:bg-neutral-200 transition"
              onClick={() =>
                navigate("/login", { state: { from: location.pathname } })
              }
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
