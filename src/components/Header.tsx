import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContentData } from "../contexts/ContentContext";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data } = useContentData();

  // Determine background based on current page
  const getBackground = () => {
    if (location.pathname === "/about-us") {
      return "linear-gradient(to right, #123233, #225150)";
    } else if (location.pathname === "/contact-us") {
      return "linear-gradient(to right, #242328, #252F40)";
    }
    // Default for home page - dark teal
    return "#0A181D";
  };

  return (
    <header style={{ background: getBackground() }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Left */}
          <Link
            to="/"
            className="flex items-center shrink-0 pr-4 sm:pr-6 md:pr-8"
          >
            <img
              src={
                data?.header?.logo ||
                "https://revtripindia.com/hidden_site/images/logo1.png"
              }
              alt="Hidden Groove Estates Logo"
              className="h-[55px] lg:h-[114px] xl:h-[114px] w-auto"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <Link
              to="/"
              style={{ fontFamily: "'Noto Serif', serif" }}
              className="text-white hover:text-[#F6BA33] transition-colors font-semibold text-lg relative pb-1 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F6BA33] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about-us"
              style={{ fontFamily: "'Noto Serif', serif" }}
              className="text-white hover:text-[#F6BA33] transition-colors font-semibold text-lg relative pb-1 group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F6BA33] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact-us"
              style={{ fontFamily: "'Noto Serif', serif" }}
              className="text-white hover:text-[#F6BA33] transition-colors font-semibold text-lg relative pb-1 group"
            >
              Contact Us!
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F6BA33] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Tagline - Center/Right (Visible on Mobile and Desktop) */}
          <div className="flex flex-1 justify-end md:justify-center items-center min-w-0 px-4 sm:px-6 md:px-8">
            <h4 className="mb-0 leading-tight text-left">
              <span
                className="text-[#D1AB2A] text-xs sm:text-sm md:text-lg font-semibold block whitespace-nowrap"
                style={{ fontFamily: "'Edu NSW ACT Cursive', cursive" }}
              >
                {data?.header?.tagline?.line1 || "The Most Prestigious"}
              </span>
              <span
                className="text-white text-sm sm:text-base md:text-xl font-bold block whitespace-nowrap"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {data?.header?.tagline?.line2 || "Neighborhood"}
              </span>
              <span
                className="text-[#D1AB2A] text-xs sm:text-xs md:text-sm font-normal block whitespace-nowrap"
                style={{ fontFamily: "'Edu NSW ACT Cursive', cursive" }}
              >
                {data?.header?.tagline?.line3 || "in North Mcallen"}
              </span>
            </h4>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden pl-4 sm:pl-6 shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <img
              src="https://revtripindia.com/hidden_site/images/menuW.png"
              alt="Menu"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-4">
            <Link
              to="/"
              className="block text-white hover:text-[#F6BA33] transition-colors font-bold text-base py-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="block text-white hover:text-[#F6BA33] transition-colors font-bold text-base py-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="block text-white hover:text-[#F6BA33] transition-colors font-bold text-base py-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us!
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
