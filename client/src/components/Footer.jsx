const Footer = () => {
  return (
    <footer className="relative bg-[url('/assets/footerBackground.jpg')] bg-center bg-cover text-white select-none">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">
            Book My Seat
          </h2>
          <p className="text-sm text-gray-300 mt-3 leading-relaxed">
            Your trusted platform for booking movie tickets and reserving seats
            instantly with ease and comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Now Showing
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Upcoming Movies
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
          <p className="text-sm text-gray-300">
            📧 support@bookmyseat.com
          </p>
          <p className="text-sm text-gray-300 mt-2">
            📞 +91 8171155002
          </p>
          <p className="text-sm text-gray-300 mt-2">
            📍 India
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-gray-600 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Book My Seat. Built by Vivek Bisht.
      </div>
    </footer>
  );
};

export default Footer;
