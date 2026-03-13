import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LocationContext } from "../contexts/LocationContext";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const { setUserLocation, locationLoading } = useContext(LocationContext);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Select City");
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (locationLoading) {
      setPlaceholder("Detecting...");
    }
  }, [locationLoading]);

  useEffect(() => {
    const savedCity = localStorage.getItem("userCity");

    if (savedCity) {
      setUserLocation(savedCity);
    }
  }, []);

  const locationOptions = [
    {
      label: "Delhi",
    },
    {
      label: "Mumbai",
    },
    {
      label: "Bangalore",
    },
    {
      label: "Hyderabad",
    },
    {
      label: "Chennai",
    },
    {
      label: "Kolkata",
    },
    {
      label: "Pune",
    },
    {
      label: "Ahmedabad",
    },
    {
      label: "Jaipur",
    },
    {
      label: "Chandigarh",
    },
    {
      label: "Lucknow",
    },
    {
      label: "Dehradun",
    },
    {
      label: "Indore",
    },
    {
      label: "Bhopal",
    },
    {
      label: "Surat",
    },
  ];

  const handleLocationChange = (option) => {
    const city = option?.label;

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

      {!isLoginPage && (
        <CustomSelect
          options={locationOptions}
          placeholder={placeholder}
          onChange={handleLocationChange}
        />
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
