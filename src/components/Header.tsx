import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center me-5">
            <img
              src={
                data?.header?.logo ||
                "https://revtripindia.com/hidden_site/images/logo1.png"
              }
              alt="Hidden Groove Estates Logo"
              className="h-24 md:h-28 w-auto"
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

          {/* Tagline - Right */}
          <div className="hidden lg:flex ml-auto flex-nowrap justify-end text-start">
            <h4
              className="mb-0 leading-6"
              style={{ fontFamily: "'Edu NSW ACT Cursive', cursive" }}
            >
              <span className="text-[#D1AB2A] text-lg font-semibold block">
                {data?.header?.tagline?.line1 || "The Most Prestigious"}
              </span>
              <span className="text-white text-xl font-semibold block">
                {data?.header?.tagline?.line2 || "Neighborhood"}
              </span>
              <span className="text-[#D1AB2A] text-sm font-normal block">
                {data?.header?.tagline?.line3 || "in North Mcallen"}
              </span>
            </h4>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-[#1a3640] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-[#1a3640] pt-4">
            <Link
              to="/"
              className="block text-white hover:text-[#F6BA33] transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="block text-white hover:text-[#F6BA33] transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="block text-white hover:text-[#F6BA33] transition-colors font-medium py-2"
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
