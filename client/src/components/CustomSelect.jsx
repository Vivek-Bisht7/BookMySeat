import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({ options, placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-40 text-sm">
      {/* control */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-neutral-900 border border-neutral-700 text-neutral-200 rounded-full px-4 py-2 cursor-pointer"
      >
        {selected ? selected.label : placeholder}

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* menu */}
      {open && (
        <div className="absolute mt-2 w-full bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
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