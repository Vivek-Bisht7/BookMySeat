import { useState, useRef, useEffect, useContext } from "react";
import { ChevronDown, MapPin, LocateFixed } from "lucide-react";
import { LocationContext } from "../contexts/LocationContext";

const CustomSelect = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLocation, detectLocation, locationLoading } = useContext(LocationContext);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const onSelectCity = (city) => {
    onChange(city);
    setIsOpen(false);
  };

  const onDetectClick = () => {
    detectLocation();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-44 text-sm font-medium">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 border transition-all duration-200 
          ${isOpen 
            ? "bg-neutral-800 border-red-500 ring-2 ring-red-500/10 text-white" 
            : "bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-neutral-500"
          }`}
      >
        <div className="flex items-center gap-2 truncate">
          <MapPin 
            size={16} 
            className={`shrink-0 ${locationLoading ? "animate-bounce text-red-500" : "text-red-500"}`} 
          />
          <span className="truncate">
            {locationLoading ? "Detecting..." : userLocation || placeholder}
          </span>
        </div>
        <ChevronDown 
          size={14} 
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : "opacity-60"}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-45 md:w-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-100 overflow-hidden">
          
          <button
            onClick={onDetectClick}
            className="flex w-full items-center gap-3 p-4 md:p-3 text-red-500 hover:bg-red-500/5 border-b border-neutral-800 transition-colors group active:bg-red-500/10"
          >
            <LocateFixed size={18} className="shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-bold whitespace-nowrap">Detect My City</span>
          </button>

          <div className="max-h-60 overflow-y-auto scrollbar-hide">
            <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Popular Cities
            </p>
            
            <div className="py-1">
              {options.map((city) => (
                <button
                  key={city.label}
                  onClick={() => onSelectCity(city)}
                  className={`flex w-full items-center justify-between px-4 py-3 md:py-2.5 transition-colors
                    ${userLocation === city.label 
                      ? "text-red-500 bg-red-500/5 font-bold" 
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    }`}
                >
                  <span className="truncate">{city.label}</span>
                  {userLocation === city.label && (
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;