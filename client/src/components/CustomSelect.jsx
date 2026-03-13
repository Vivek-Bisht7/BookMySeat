import { useState, useRef, useEffect, useContext } from "react";
import { ChevronDown, MapPin, LocateFixed } from "lucide-react";
import { LocationContext } from "../contexts/LocationContext";

const CustomSelect = ({ options, placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { userLocation, detectLocation, locationLoading } =
    useContext(LocationContext);

  const ref = useRef();

  useEffect(() => {
    if (userLocation) {
      setSelected(userLocation);
      setOpen(false);
    }
  }, [userLocation]);

  useEffect(() => {
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSelect = (option) => {
    setSelected(option.label);
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-40 text-sm mr-2">
      {/* control */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-neutral-900 border border-neutral-700 text-neutral-200 rounded-full px-4 py-2 cursor-pointer"
      >
        <div className="flex items-center gap-1">
          <MapPin className="text-red-500" size={16} />
          {locationLoading ? placeholder : userLocation || placeholder}
        </div>

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* menu */}
      {open && (
        <div className="absolute mt-2 w-full bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg z-50 overflow-hidden">
          <button
            className="text-white flex p-4 gap-1 cursor-pointer"
            onClick={() => {
              detectLocation();
              setOpen(false);
            }}
          >
            <LocateFixed size={16} />
            <div>Detect Location</div>
          </button>
          {options.map((option) => (
            <div
              key={option.label}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-neutral-200 hover:bg-neutral-800 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
