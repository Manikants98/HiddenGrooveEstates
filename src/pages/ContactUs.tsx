import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContentData } from "../contexts/ContentContext";

export const ContactUs = () => {
  const { data } = useContentData();
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
  const [section1Padding, setSection1Padding] = useState(
    isDesktop ? "0 0 40px" : "0 0 30px"
  );
  const [section1Container, setSection1Container] = useState(
    isDesktop
      ? { maxWidth: "1320px", margin: "0 60px", padding: "0 12px" }
      : { maxWidth: "none", margin: "0", padding: "0 12px" }
  );
  const [h1FontSize, setH1FontSize] = useState(isDesktop ? "55px" : "35px");
  const [h1LineHeight, setH1LineHeight] = useState(isDesktop ? "66px" : "42px");
  const [h1FontWeight, setH1FontWeight] = useState("700");
  const [section2Padding, setSection2Padding] = useState(
    isDesktop ? "0 0 40px" : "0 0 30px"
  );
  const [section2Container, setSection2Container] = useState(
    isDesktop
      ? { maxWidth: "1320px", margin: "0 60px", padding: "0 12px" }
      : { maxWidth: "none", margin: "0", padding: "0 12px" }
  );

  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth >= 768) {
        setSection1Padding("0 0 40px");
        setSection1Container({
          maxWidth: "1320px",
          margin: "0 60px",
          padding: "0 12px",
        });
        setH1FontSize("55px");
        setH1LineHeight("66px");
        setH1FontWeight("700");
        setSection2Padding("0 0 40px");
        setSection2Container({
          maxWidth: "1320px",
          margin: "0 60px",
          padding: "0 12px",
        });
      } else {
        setSection1Padding("0 0 30px");
        setSection1Container({
          maxWidth: "none",
          margin: "0",
          padding: "0 12px",
        });
        setH1FontSize("35px");
        setH1LineHeight("42px");
        setH1FontWeight("700");
        setSection2Padding("0 0 30px");
        setSection2Container({
          maxWidth: "none",
          margin: "0",
          padding: "0 12px",
        });
      }
    };

    updateStyles();
    window.addEventListener("resize", updateStyles);
    return () => window.removeEventListener("resize", updateStyles);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(to right, #242328, #252F40)" }}
    >
      <section style={{ padding: section1Padding }}>
        <div style={section1Container}>
          <div className="text-center" style={{ marginBottom: "0px" }}>
            <h1
              className="text-white"
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: h1FontSize,
                lineHeight: h1LineHeight,
                fontWeight: h1FontWeight,
                marginTop: "0px",
                marginBottom: "8px",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              {data?.contactUs?.title || "Get In"}{" "}
              <mark
                className="text-white"
                style={{
                  background: "linear-gradient(to right, #F5B233, #E1832F)",
                  padding: "5px 2px 2px",
                  display: "inline",
                }}
              >
                {data?.contactUs?.highlightedTitle || "Touch"}
              </mark>
            </h1>
            <div className="flex justify-center">
              <div className="max-w-3xl">
                <p
                  className="text-white"
                  style={{
                    fontSize: "16px",
                    lineHeight: "22px",
                    marginTop: "0px",
                    marginBottom: "16px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    textAlign: "center",
                  }}
                >
                  {data?.contactUs?.description ||
                    "Ready to discover your dream home in North McAllen's most prestigious neighborhood? We're here to help you every step of the way."}
                </p>
                <ul
                  className="flex justify-center flex-wrap list-none"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "normal",
                    marginTop: "0px",
                    marginBottom: "0px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  {(
                    data?.contactUs?.features || [
                      "Premium Lots Available",
                      "Exclusive Community",
                      "Prime Location",
                    ]
                  ).map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-[#5C626F] relative"
                      style={{
                        fontSize: "16px",
                        marginLeft: "0px",
                        marginRight:
                          idx < (data?.contactUs?.features?.length || 3) - 1
                            ? "16px"
                            : "0px",
                        paddingLeft: "16px",
                        paddingRight: "0px",
                        display: "list-item",
                      }}
                    >
                      <span
                        className="absolute rounded-full"
                        style={{
                          backgroundColor: "#F6BA33",
                          width: "8px",
                          height: "8px",
                          left: "0px",
                          top: "8px",
                        }}
                      ></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: section2Padding,
          background: "linear-gradient(to right, #151E30, #252F40)",
        }}
      >
        <div style={section2Container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <div className="space-y-6">
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
                    <p className="text-white text-sm whitespace-pre-line">
                      {data?.contactUs?.office?.address ||
                        "Second Street, North McAllen\nBetween Frontera Rd and Northgate L."}
                    </p>
                  </div>
                </div>

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
                      <a
                        href={`tel:${
                          data?.contactUs?.office?.phone?.replace(/\D/g, "") ||
                          "9565554678"
                        }`}
                        className="text-white"
                      >
                        {data?.contactUs?.office?.phoneDisplay ||
                          "(956) 555-GROVE"}
                      </a>
                    </p>
                    <p className="text-white text-sm">
                      <a
                        href={`tel:${
                          data?.contactUs?.office?.phone?.replace(/\D/g, "") ||
                          "9565554678"
                        }`}
                        className="text-white"
                      >
                        {data?.contactUs?.office?.phone || "(956) 555-4678"}
                      </a>
                    </p>
                  </div>
                </div>

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
                        href={`mailto:${
                          data?.contactUs?.office?.email ||
                          "info@hiddengrooveestates.com"
                        }`}
                        className="text-white"
                      >
                        {data?.contactUs?.office?.email ||
                          "info@hiddengrooveestates.com"}
                      </a>
                    </p>
                    <p className="text-white text-sm">
                      <a
                        href={`mailto:${
                          data?.contactUs?.office?.emailSales ||
                          "sales@hiddengrooveestates.com"
                        }`}
                        className="text-white"
                      >
                        {data?.contactUs?.office?.emailSales ||
                          "sales@hiddengrooveestates.com"}
                      </a>
                    </p>
                  </div>
                </div>

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
                      {data?.contactUs?.office?.hours?.weekdays ||
                        "Mon - Fri: 9AM - 6PM"}
                    </p>
                    <p className="text-white text-sm">
                      {data?.contactUs?.office?.hours?.weekends ||
                        "Sat - Sun: 10AM - 4PM"}
                    </p>
                  </div>
                </div>
              </div>

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

      <footer className="pt-0">
        <section
          className="py-4 flex  items-center"
          style={{
            background: "linear-gradient(to right, #141C2C, #1E473C)",
          }}
        >
          <div className="px-4 lg:px-[30px] flex items-center w-full">
            <div className="grid grid-cols-1 lg:px-5 md:grid-cols-12 gap-4 w-full items-center">
              <div className="md:col-span-8">
                <p className="text-white text-sm font-medium">
                  {data?.footer?.copyright ||
                    "© Copyright 2025, Hidden Groove Estates | All rights reserved."}
                </p>
              </div>
              <div className="md:col-span-4">
                <ul className="flex justify-start lg:justify-end space-x-10 list-none items-center">
                  <li>
                    <a
                      href={data?.footer?.links?.privacy || "#"}
                      className="text-white text-sm hover:text-[#fda31b] transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href={data?.footer?.links?.terms || "#"}
                      className="text-white text-sm hover:text-[#fda31b] transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href={data?.footer?.links?.contact || "contact-us.html"}
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
