import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LocationContext } from "../contexts/LocationContext";
import { IoSearch, IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const { setUserLocation, locationLoading } = useContext(LocationContext);

  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Select City");
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (locationLoading) setPlaceholder("Detecting...");
  }, [locationLoading]);

  useEffect(() => {
    const savedCity = localStorage.getItem("userCity");
    if (savedCity) setUserLocation(savedCity);
  }, []);

  const locationOptions = [
    { label: "Delhi" },
    { label: "Mumbai" },
    { label: "Bangalore" },
    { label: "Hyderabad" },
    { label: "Chennai" },
    { label: "Kolkata" },
    { label: "Pune" },
    { label: "Ahmedabad" },
    { label: "Jaipur" },
    { label: "Chandigarh" },
    { label: "Lucknow" },
    { label: "Dehradun" },
    { label: "Indore" },
    { label: "Bhopal" },
    { label: "Surat" },
  ];

  const handleLocationChange = (option) => {
    const city = option?.label;
    setUserLocation(city);
    localStorage.setItem("userCity", city);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral-900 h-16 w-full flex items-center px-6 border-b border-neutral-800 animate-pulse gap-6">
        <div className="w-32 h-6 bg-neutral-800 rounded"></div>
        <div className="flex-1 hidden md:block h-8 bg-neutral-800 rounded-full mx-10"></div>
        <div className="w-10 h-10 bg-neutral-800 rounded-full"></div>
      </div>
    );
  }

  const search = (e) => {
    e.preventDefault();

    setQuery('');
    
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-sm w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4`}
        >
          <div className="flex items-center gap-3">
            <IoSearch className="text-red-500 text-xl" />
            <div>
              <p className="text-xs font-black text-neutral-100 uppercase tracking-widest">
                Search Coming Soon
              </p>
              <p className="text-[11px] text-neutral-500 font-medium">
                We're still tuning the engine!
              </p>
            </div>
          </div>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-[10px] font-black uppercase text-neutral-400 hover:text-white transition-colors"
          >
            OK
          </button>
        </div>
      ),
      {
        duration: 3000,
        position: "bottom-right",
      },
    );
  };

  return (
    <div className="bg-neutral-900 h-16 w-full flex items-center px-4 md:px-6 border-b border-neutral-800 select-none shadow-lg transition-colors duration-300">
      <h1
        className="font-bold text-neutral-100 tracking-wider text-base md:text-lg cursor-pointer whitespace-nowrap shrink-0"
        onClick={() => navigate("/")}
      >
        BookMy
        <span className="text-red-500">Seat</span>
      </h1>

      {!isLoginPage && (
        <div className="flex-1 flex justify-center items-center px-2 md:px-4">
          {isAdminRoute ? (
            <h2 className="hidden md:block text-xl font-semibold text-white">
              Administrator Dashboard
            </h2>
          ) : (
            <form
              onSubmit={(e) => {
                search(e);
              }}
              className="hidden md:flex w-full max-w-md"
            >
              <div className="flex items-center gap-3 bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-2 w-full transition-all duration-200 focus-within:border-neutral-700 focus-within:bg-neutral-800/80">
                <IoSearch className="text-neutral-500 text-lg shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies, theatres..."
                  className="bg-transparent outline-none text-[13px] font-medium text-neutral-200 w-full placeholder:text-neutral-600 tracking-tight"
                />
              </div>
            </form>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        {!isLoginPage && !isAdminRoute && (
          <button
            className="md:hidden p-2 text-neutral-400 shrink-0"
            onClick={() => setMobileSearchOpen(true)}
          >
            <IoSearch size={22} />
          </button>
        )}

        {!isLoginPage && !isAdminRoute && (
          <div className="scale-90 md:scale-100 shrink-0 z-40">
            <CustomSelect
              options={locationOptions}
              placeholder={placeholder}
              onChange={handleLocationChange}
            />
          </div>
        )}

        {!isLoginPage && (
          <div className="relative flex items-center shrink-0" ref={menuRef}>
            {user ? (
              <div className="flex items-center shrink-0">
                <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 flex items-center justify-center">
                  <img
                    src={user.photoURL}
                    alt="p"
                    className="rounded-full h-full w-full cursor-pointer border-2 border-neutral-700 shadow-sm object-cover flex-none"
                    onClick={() => setOpen((prev) => !prev)}
                    referrerPolicy="no-referrer"
                  />
                </div>
                {open && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl z-20 overflow-hidden">
                    <div className="px-4 py-3 border-b border-neutral-700">
                      <p className="text-[10px] font-bold text-neutral-500 uppercase">
                        Signed in as
                      </p>
                      <p className="text-xs text-neutral-200 truncate font-medium">
                        {user.displayName || "User"}
                      </p>
                    </div>
                    <button
                      className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-neutral-700 transition font-semibold"
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
                className="bg-white text-neutral-900 px-5 py-2 rounded-full text-xs md:text-sm font-bold hover:bg-neutral-200 transition whitespace-nowrap shrink-0"
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

      {mobileSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-16 bg-neutral-900 z-50 flex items-center px-4 gap-2 border-b border-neutral-800">
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              setMobileSearchOpen(false);
            }}
          >
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-neutral-800 text-neutral-100 rounded-lg px-4 py-2 outline-none text-sm border border-neutral-700"
            />
          </form>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="text-neutral-400"
          >
            <IoClose size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
