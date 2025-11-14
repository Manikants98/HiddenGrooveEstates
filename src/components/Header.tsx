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
    <header
      style={{ background: getBackground(), width: "100%", padding: "10px 0" }}
    >
      <div className="max-w-[1326px] mx-auto py-[3px] px-[15px]">
        <div className="flex items-center justify-between relative flex-wrap md:flex-nowrap">
          {/* Logo - Left */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="header-logo-link">
              <img
                src={
                  data?.header?.logo ||
                  "https://revtripindia.com/hidden_site/images/logo1.png"
                }
                alt="Hidden Groove Estates Logo"
                className="h-[55px] md:h-[80px] lg:h-[114px] w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center/Right */}
          <nav className="hidden md:flex items-center">
            <ul className="flex flex-row list-none m-0 p-0 header-nav-list">
              <li>
                <Link
                  to="/"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                  className="text-white hover:text-[#F6BA33] transition-colors text-lg font-semibold relative header-nav-link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                  className="text-white hover:text-[#F6BA33] transition-colors text-lg font-semibold relative header-nav-link"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                  className="text-white hover:text-[#F6BA33] transition-colors text-lg font-semibold relative header-nav-link"
                >
                  Contact Us!
                </Link>
              </li>
            </ul>
          </nav>

          {/* Tagline - Right (Desktop) */}
          <div className="hidden md:flex items-center text-left">
            <h4
              className="mb-0"
              style={{
                fontFamily: "'Edu NSW ACT Cursive', cursive",
                fontSize: "20px",
                lineHeight: "24px",
                fontWeight: "500",
                color: "#D1AB2A",
              }}
            >
              {data?.header?.tagline?.line1 || "The Most Prestigious"}
              <br />
              <b className="text-white" style={{ fontWeight: "600" }}>
                {data?.header?.tagline?.line2 || "Neighborhood"}
              </b>
              <br />
              <span className="small" style={{ fontSize: "15px" }}>
                {data?.header?.tagline?.line3 || "in North Mcallen"}
              </span>
            </h4>
          </div>

          {/* Tagline - Right (Mobile) */}
          <div className="flex md:hidden items-center text-left flex-1 justify-end mr-[10px]">
            <h4
              className="mb-0"
              style={{
                fontFamily: "'Edu NSW ACT Cursive', cursive",
                fontSize: "12px",
                lineHeight: "1.2",
                fontWeight: "500",
                color: "#D1AB2A",
              }}
            >
              {data?.header?.tagline?.line1 || "The Most Prestigious"}
              <br />
              <b
                className="text-white"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                {data?.header?.tagline?.line2 || "Neighborhood"}
              </b>
              <br />
              <span className="small" style={{ fontSize: "11px" }}>
                {data?.header?.tagline?.line3 || "in North Mcallen"}
              </span>
            </h4>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer p-2 shrink-0"
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
        <nav
          className={`md:hidden mt-5 pb-4 w-full ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="block text-white hover:text-[#F6BA33] transition-colors text-base font-bold py-4"
            style={{ fontFamily: "'Noto Serif', serif" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="block text-white hover:text-[#F6BA33] transition-colors text-base font-bold py-4"
            style={{ fontFamily: "'Noto Serif', serif" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="block text-white hover:text-[#F6BA33] transition-colors text-base font-bold py-4"
            style={{ fontFamily: "'Noto Serif', serif" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us!
          </Link>
        </nav>
      </div>
    </header>
  );
};
