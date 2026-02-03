import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef(null);

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // operation
    setQuery("");
  };

  return (
    <div className="bg-neutral-900 h-12 w-full flex items-center px-4 border-b border-neutral-800">
      
      {/* Left */}
      <h1 className="font-bold text-neutral-100 tracking-wider">
        BookMySeat
      </h1>

      {/* Center */}
      {user && (
        <form
        onSubmit={handleSearch}
        className="flex-1 flex justify-center"
      >
        <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1 w-full max-w-md">
          <IoSearch className="text-neutral-400" />
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

      {/* Right */}
      {user && (
        <div className="relative ml-4" ref={menuRef}>
          <img
            src={user.photoURL}
            alt="profile"
            className="rounded-full h-8 w-8 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-700"
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
      )}

    </div>
  );
};

export default Navbar;
