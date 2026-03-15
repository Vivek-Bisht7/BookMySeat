import React from "react";
import { Mail, Github, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-neutral-500 py-12 overflow-hidden border-t border-neutral-900/50 select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-10">
          <div className="text-center space-y-2">
            <h1
              className="font-bold text-neutral-100 tracking-wider text-base md:text-2xl cursor-pointer whitespace-nowrap shrink-0"
              onClick={() => navigate("/")}
            >
              BookMy
              <span className="text-red-500">Seat</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.3em] opacity-40">
              <span>Cinema</span>
              <span className="w-1 h-1 rounded-full bg-neutral-700" />
              <span>Experience</span>
              <span className="w-1 h-1 rounded-full bg-neutral-700" />
              <span>Reserve</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { Icon: Github, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Mail, href: "mailto:support@bookmyseat.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="hover:text-white transition-colors duration-300"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-neutral-900/30 text-[11px] tracking-widest uppercase">
            <p className="opacity-50">© {currentYear} • Global Edition</p>

            <div className="flex items-center gap-2 group cursor-default">
              <span className="opacity-40">Architected by</span>
              <span className="text-neutral-300 font-semibold group-hover:text-red-500 transition-colors">
                Vivek Bisht
              </span>
              <Heart
                size={10}
                className="text-red-600 fill-red-600 animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
