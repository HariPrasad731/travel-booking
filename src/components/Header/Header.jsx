import { useState } from "react";
import { motion } from "framer-motion";
import SignupModal from "../Auth/SignupModal";

export default function Header() {
  const [openSignup, setOpenSignup] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            Travellow
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-blue-600 transition"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-blue-600 transition"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("packages")}
              className="hover:text-blue-600 transition"
            >
              Packages
            </button>

            <button
              onClick={() => scrollToSection("community")}
              className="hover:text-blue-600 transition"
            >
              Community
            </button>
          </nav>

          {/* Sign Up */}
          <button
            onClick={() => setOpenSignup(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign up
          </button>
        </div>
      </motion.header>

      {/* Signup Modal */}
      <SignupModal
        open={openSignup}
        onClose={() => setOpenSignup(false)}
      />
    </>
  );
}
