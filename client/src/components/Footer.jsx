import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-950 text-white select-none overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-600/10 blur-[100px] rounded-full"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-600/10 blur-[100px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter bg-linear-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              BOOK MY SEAT
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Experience cinema like never before. From blockbusters to indie gems, 
              reserve your perfect spot in seconds.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-gray-900 rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h3>
            <nav className="flex flex-col gap-4">
              {["Home", "Now Showing", "Upcoming Movies", "Offers"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '')}`} 
                   className="text-gray-400 hover:text-yellow-400 transition-colors w-fit">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h3>
            <nav className="flex flex-col gap-4">
              {["Help Center", "Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-yellow-400 transition-colors w-fit">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs">Get In Touch</h3>
            <div className="space-y-4">
              <a href="mailto:support@bookmyseat.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail size={16} className="text-yellow-500" />
                <span className="text-sm">support@bookmyseat.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={16} className="text-yellow-500" />
                <span className="text-sm">+91 8171155002</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={16} className="text-yellow-500" />
                <span className="text-sm">Uttarakhand, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-gray-300">Book My Seat</span>. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm italic">
            Designed & Developed by <span className="text-yellow-500/80 font-medium">Vivek Bisht</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;