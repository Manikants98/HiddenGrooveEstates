import { Link } from "react-router-dom";

export const ContactUs = () => {
  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(to right, #242328, #252F40)" }}
    >
      {/* Page Header */}
      <section className="pt-0 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Get In{" "}
              <mark
                className="text-white"
                style={{
                  background: "linear-gradient(to right, #F5B233, #E1832F)",
                  padding: "5px 2px 2px",
                }}
              >
                Touch
              </mark>
            </h1>
            <div className="flex justify-center">
              <div className="max-w-3xl">
                <p className="text-white text-base mb-4">
                  Ready to discover your dream home in North McAllen's most
                  prestigious neighborhood? We're here to help you every step of
                  the way.
                </p>
                <ul className="flex justify-center flex-wrap gap-4 list-none text-sm text-[#5C626F]">
                  <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#F6BA33] before:rounded-full">
                    Premium Lots Available
                  </li>
                  <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#F6BA33] before:rounded-full">
                    Exclusive Community
                  </li>
                  <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#F6BA33] before:rounded-full">
                    Prime Location
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(to right, #151E30, #252F40)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Form */}
            <div>
              <div
                className="rounded-3xl p-6 md:p-8"
                style={{
                  background: "linear-gradient(to right, #1B2638, #161F32)",
                  border: "1px solid #4A5565",
                }}
              >
                <div className="mb-6">
                  <h3
                    className="text-white text-3xl md:text-4xl mb-2"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    Contact Information
                  </h3>
                  <p className="text-white text-sm">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>
                </div>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white mb-2 text-sm">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5565] text-sm"
                        style={{
                          backgroundColor: "#1E2939",
                          border: "1px solid #4A5565",
                          height: "45px",
                        }}
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 text-sm">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5565] text-sm"
                        style={{
                          backgroundColor: "#1E2939",
                          border: "1px solid #4A5565",
                          height: "45px",
                        }}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5565] text-sm"
                      style={{
                        backgroundColor: "#1E2939",
                        border: "1px solid #4A5565",
                        height: "45px",
                      }}
                      placeholder="Email Address"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-sm">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5565] text-sm"
                      style={{
                        backgroundColor: "#1E2939",
                        border: "1px solid #4A5565",
                        height: "45px",
                      }}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-sm">
                      Interested In
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-md border text-white focus:outline-none focus:border-[#4A5565] text-sm appearance-none"
                      style={{
                        backgroundColor: "#1E2939",
                        border: "1px solid #4A5565",
                        height: "45px",
                        backgroundImage:
                          "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option>Select your interest…</option>
                      <option value="Purchasing A Lot">Purchasing A Lot</option>
                      <option value="Building A Home">Building A Home</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-sm">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none focus:border-[#4A5565] text-sm"
                      style={{
                        backgroundColor: "#1E2939",
                        border: "1px solid #4A5565",
                      }}
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold text-sm uppercase transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(to right, #D3AE3A, #C79A58)",
                      color: "#fff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(to right, #C79A58, #D3AE3A)";
                      e.currentTarget.style.boxShadow =
                        "0px 5px 15px 2px rgba(155, 121, 11, 0.52)";
                      e.currentTarget.style.transform = "translate(0px, -5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(to right, #D3AE3A, #C79A58)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translate(0px, 0px)";
                    }}
                  >
                    Send Email
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-6">
              {/* Contact Information Card */}
              <div
                className="rounded-3xl p-6 md:p-8"
                style={{
                  background: "linear-gradient(to right, #1B2638, #161F32)",
                  border: "1px solid #4A5565",
                }}
              >
                <h4
                  className="text-white text-xl mb-6"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Visit Our Sales Office
                </h4>

                {/* Address */}
                <div className="flex mb-5">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: "#F19933" }}
                  >
                    <svg
                      className="w-5 h-5 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6
                      className="text-white text-sm font-semibold mb-1"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      Address
                    </h6>
                    <p className="text-white text-sm">
                      Second Street, North McAllen
                      <br />
                      Between Frontera Rd and Northgate L.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex mb-5">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: "#F19933" }}
                  >
                    <svg
                      className="w-5 h-5 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h6
                      className="text-white text-sm font-semibold mb-1"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      Phone
                    </h6>
                    <p className="text-white text-sm mb-1">
                      <a href="tel:9565554678" className="text-white">
                        (956) 555-GROVE
                      </a>
                    </p>
                    <p className="text-white text-sm">
                      <a href="tel:9565554678" className="text-white">
                        (956) 555-4678
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex mb-5">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: "#F19933" }}
                  >
                    <svg
                      className="w-5 h-5 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h6
                      className="text-white text-sm font-semibold mb-1"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      Email
                    </h6>
                    <p className="text-white text-sm mb-1">
                      <a
                        href="mailto:info@hiddengroove.com"
                        className="text-white"
                      >
                        info@hiddengroove.com
                      </a>
                    </p>
                    <p className="text-white text-sm">
                      <a
                        href="mailto:sales@hiddengroove.com"
                        className="text-white"
                      >
                        sales@hiddengroove.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                    style={{ backgroundColor: "#F19933" }}
                  >
                    <svg
                      className="w-5 h-5 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6
                      className="text-white text-sm font-semibold mb-1"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      Office Hours
                    </h6>
                    <p className="text-white text-sm mb-1">
                      Mon - Fri: 9AM - 6PM
                    </p>
                    <p className="text-white text-sm">Sat - Sun: 10AM - 4PM</p>
                  </div>
                </div>
              </div>

              {/* Ready to Tour Card */}
              <div
                className="text-center rounded-3xl p-6 md:p-8"
                style={{
                  background: "linear-gradient(to right, #1B2638, #161F32)",
                  border: "1px solid #4A5565",
                }}
              >
                <h4
                  className="text-white text-xl mb-3"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Ready to Tour?
                </h4>
                <p className="text-white text-sm mb-6">
                  Schedule your private tour of Hidden Groove Estates today and
                  see why this is North McAllen's most prestigious neighborhood.
                </p>
                <a
                  href="#"
                  className="inline-block px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                  style={{
                    background: "linear-gradient(to right, #F5B233, #E1832F)",
                    color: "#000",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to right, #E1832F, #F5B233)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to right, #F5B233, #E1832F)";
                  }}
                >
                  Schedule Tour
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-0">
        <section
          className="py-4 flex items-center"
          style={{ background: "linear-gradient(to right, #141C2C, #1E473C)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8">
                <p className="text-white text-sm font-medium">
                  © Copyright 2025, Hidden Groove Estates | All rights reserved.
                </p>
              </div>
              <div className="md:col-span-4">
                <ul className="flex justify-start md:justify-end space-x-10 list-none items-center">
                  <li>
                    <a
                      href="#"
                      className="text-white text-sm hover:text-[#fda31b] transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white text-sm hover:text-[#fda31b] transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="contact-us.html"
                      className="text-white text-sm hover:text-[#fda31b] transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="text-white text-sm hover:text-[#fda31b] transition-colors"
                    >
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};
