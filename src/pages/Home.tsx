import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";
import { useContentData } from "../hooks/useContentData";
import { samplePropertyListing } from "../data/sampleData";

export const Home = () => {
  const { data } = useContentData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const property: any = data?.home?.property || samplePropertyListing.property;
  const lots = data?.home?.lots || samplePropertyListing.lots;
  const slides = data?.home?.slider?.images || [
    "/images/banner.jpg",
    "/images/Hidden-Gloves-Street1.png",
    "/images/Hidden-Gloves-Street2.png",
  ];
  const sliderInterval = data?.home?.slider?.autoAdvanceInterval || 5000;

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, sliderInterval);
    return () => clearInterval(timer);
  }, [slides.length, sliderInterval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A181D" }}>
      <section className="px-4 md:px-10 py-6">
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white text-2xl transition-all"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white text-2xl transition-all"
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 px-10 sm:px-10 lg:px-10">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
            <div className="lg:col-span-5">
              <div
                className="rounded-xl overflow-hidden shadow-lg"
                style={{
                  backgroundColor: "#18272B",
                  border: "1px solid #3C412A",
                }}
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#D1AB3F",
                        border: "1px solid #3C412A",
                      }}
                    >
                      <th className="text-left py-3 px-3 text-white font-medium text-xs uppercase">
                        Lot
                      </th>
                      <th className="text-right py-3 px-2 text-white font-medium text-xs uppercase">
                        Lot Size
                      </th>
                      <th className="text-right py-3 px-2 text-white font-medium text-xs uppercase">
                        Price
                      </th>
                      <th className="text-center py-3 px-2 text-white font-medium text-xs uppercase">
                        Available?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lots.map((lot) => (
                      <tr
                        key={lot.id}
                        className="hover:bg-[#1a3640] transition-colors cursor-pointer"
                        style={{
                          border: "1px solid #243c44",
                        }}
                      >
                        <td className="py-1 px-3 text-white font-medium text-xs uppercase">
                          {lot.lotNumber}
                        </td>
                        <td className="text-right py-1 px-2 text-white font-medium text-xs">
                          {lot.size.toLocaleString()}
                        </td>
                        <td className="text-right py-1 px-2 text-white font-semibold text-xs">
                          {formatCurrency(lot.price)}
                        </td>
                        <td className="text-center py-1 px-2 text-xs">
                          {lot.available ? (
                            <span className="text-[#71DF82] font-medium">
                              Yes
                            </span>
                          ) : (
                            <span className="text-[#EC6F70] font-medium">
                              No
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-7">
              <img
                src={
                  data?.home?.streetImage || "/images/Hidden-Gloves-Street3.png"
                }
                alt="Hidden Groove Estates Street View"
                className="w-full h-[240px] object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
            <div className="lg:col-span-4">
              <div
                className="rounded-xl h-[185px] overflow-hidden flex items-center justify-center shadow-lg p-3 text-center"
                style={{
                  backgroundColor: "#18272B",
                  border: "1px solid #3C412A",
                }}
              >
                <img
                  src={data?.home?.lotLayoutImage || "/images/LOT_1.png"}
                  alt="Lot Layout"
                  className="h-auto object-contain rounded-xl"
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <div
                className="rounded-2xl p-6 md:p-8 text-center shadow-lg"
                style={{
                  background: "linear-gradient(to right, #D3AE3A, #C79A58)",
                }}
              >
                <h4
                  className="text-white text-xl md:text-2xl font-semibold mb-3"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {data?.home?.goldenBox?.title ||
                    "An Exclusive And Highly Secluded 8-lot"}
                </h4>
                <h4
                  className="text-white text-xl md:text-2xl font-semibold mb-4"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {data?.home?.goldenBox?.subtitle ||
                    "Subdivision Situated On Second Street (N Col Rowe Blvd)"}
                </h4>
                <h5
                  className="text-white text-lg"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {data?.home?.goldenBox?.description ||
                    "Between Frontera Rd And Northgate Ln."}
                </h5>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div
                className="rounded-3xl p-8 shadow-lg"
                style={{
                  backgroundColor: "#18272B",
                  border: "1px solid #3C412A",
                }}
              >
                <div className="mb-6 pb-4 border-b-2 border-[#D1AB2A]">
                  <h3
                    className="text-2xl md:text-3xl font-semibold text-[#D1AB2A]"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    Property Details
                  </h3>
                </div>
                <div className="space-y-0">
                  <table className="w-full table-bordered">
                    <tbody>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          SubType
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.subType}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Type
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.type}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Living Area
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.livingArea || "Square Feet"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Status
                        </th>
                        <td className="py-3 px-4 text-sm">
                          <span className="text-[#71DF82]">
                            {property.status || "Active"}
                          </span>
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Property Tax
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.propertyTax}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          HOA Free
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          Annually, {property.hoaFee}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          HOA
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.hoa || "City Place at Chapin"}
                        </td>
                      </tr>
                      <tr>
                        <th
                          colSpan={2}
                          scope="row"
                          className="py-3 px-4 text-center"
                          style={{
                            color: "#FFF086",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontStyle: "italic",
                            width: "50%",
                            border: "1px solid #2d4348",
                          }}
                        >
                          Exterior
                        </th>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Fencing
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.fencing || "None"}
                        </td>
                      </tr>
                      <tr>
                        <th
                          colSpan={2}
                          scope="row"
                          className="py-3 px-4 text-center"
                          style={{
                            color: "#FFF086",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontStyle: "italic",
                            width: "50%",
                            border: "1px solid #2d4348",
                          }}
                        >
                          Amenities / Utilities
                        </th>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Utilities
                        </th>
                        <td
                          style={{ border: "1px solid #2d4348" }}
                          className="py-3 px-4 text-white text-sm"
                        >
                          {property.utilities || "Water Connected"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Sewer
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.sewer || "City Sewer"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Irrigation
                        </th>
                        <td
                          style={{ border: "1px solid #2d4348" }}
                          className="py-3 px-4 text-white text-sm"
                        >
                          {property.irrigation ||
                            "Irrigation Water District: Other"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          HOA Amenities
                        </th>
                        <td
                          style={{ border: "1px solid #2d4348" }}
                          className="py-3 px-4 text-white text-sm"
                        >
                          {property.hoaAmenities || "Property Owners' Assoc."}
                        </td>
                      </tr>
                      <tr>
                        <th
                          colSpan={2}
                          scope="row"
                          className="py-3 px-4 text-center"
                          style={{
                            color: "#FFF086",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontStyle: "italic",
                            width: "50%",
                            border: "1px solid #2d4348",
                          }}
                        >
                          Location
                        </th>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          County
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.county}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Subdivision
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.subdivision}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Community Features
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.communityFeatures || "Gated"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Eementarv School
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.elementarySchool || "Lincoln"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          High School
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.highSchool || "Economedes H.S."}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Middle School District
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.middleSchoolDistrict || "Edinburg ISD"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Elementary School District
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.elementarySchoolDistrict || "Edinburg ISD"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Middle School
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.middleSchool || "Memorial"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          High School District
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.highSchoolDistrict || "Edinburg ISD"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          APN
                        </th>
                        <td
                          style={{ border: "1px solid #2d4348" }}
                          className="py-3 px-4 text-white text-sm"
                        >
                          {property.apn || "City Place At Chapin Lot 25"}
                        </td>
                      </tr>
                      <tr>
                        <th
                          colSpan={2}
                          scope="row"
                          className="py-3 px-4 text-center"
                          style={{
                            color: "#FFF086",
                            fontWeight: 700,
                            fontSize: "14px",
                            border: "1px solid #2d4348",
                            fontStyle: "italic",
                            width: "50%",
                          }}
                        >
                          Lot/ Land Details
                        </th>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Road Frontage
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.roadFrontage || "City Street"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Road Surface
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.roadSurface || "Paved"}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #2d4348" }}>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Possible Use
                        </th>
                        <td className="py-3 px-4 text-white text-sm">
                          {property.possibleUse || "Residential"}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="text-right py-3 px-4 text-[#D1AB2A] font-medium text-sm"
                          style={{ width: "50%", border: "1px solid #2d4348" }}
                        >
                          Topography
                        </th>
                        <td
                          style={{ border: "1px solid #2d4348" }}
                          className="py-3 px-4 text-white text-sm"
                        >
                          {property.topography || "Level"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-6 text-start">
                    <a
                      href="#RequestForm"
                      className="inline-block px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(to right, #313B4C, #465163)",
                        border: "1px solid #6E684D",
                        color: "#fff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #C79A58, #D3AE3A)";
                        e.currentTarget.style.boxShadow =
                          "0px 5px 12px 2px rgba(155, 121, 11, 0.52)";
                        e.currentTarget.style.transform =
                          "translate(0px, -5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #313B4C, #465163)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translate(0px, 0px)";
                      }}
                    >
                      <i className="fa fa-chain mr-2"></i> Schedule Tour
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="rounded-3xl p-6 shadow-lg"
                style={{
                  backgroundColor: "#18272B",
                  border: "1px solid #3C412A",
                }}
              >
                <div className="mb-4">
                  <h4
                    className="text-[#D1AB2A] text-lg font-semibold uppercase mb-3"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {data?.home?.requestTour?.title || "Request Tour"}
                  </h4>
                  <p className="text-white text-sm mb-4">
                    {data?.home?.requestTour?.description ||
                      "When would you like to see this home?"}
                  </p>
                </div>
                <img
                  src={data?.home?.aerialViewImage || "/images/aerial-view.png"}
                  alt="Aerial View"
                  className="w-full rounded-2xl mb-4"
                />
                <form id="RequestForm" className="space-y-4">
                  <div>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none text-sm"
                      style={{
                        backgroundColor: "#33444B",
                        border: "1px solid #63633F",
                        height: "54px",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      name="email"
                      type="text"
                      required
                      placeholder="Email Id"
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none text-sm"
                      style={{
                        backgroundColor: "#33444B",
                        border: "1px solid #63633F",
                        height: "54px",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      name="phone"
                      type="text"
                      required
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none text-sm"
                      style={{
                        backgroundColor: "#33444B",
                        border: "1px solid #63633F",
                        height: "54px",
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg font-semibold text-sm uppercase transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(to right, #D3AE3A, #C79A58)",
                        color: "#fff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #C79A58, #D3AE3A)";
                        e.currentTarget.style.boxShadow =
                          "0px 5px 15px 2px rgba(155, 121, 11, 0.52)";
                        e.currentTarget.style.transform =
                          "translate(0px, -5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #D3AE3A, #C79A58)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translate(0px, 0px)";
                      }}
                    >
                      {data?.home?.requestTour?.submitButtonText ||
                        "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>

              <div
                className="rounded-3xl p-6 shadow-lg"
                style={{
                  background: "linear-gradient(to right, #1B365C, #2A374A)",
                  border: "1px solid #3C412A",
                }}
              >
                <div className="mb-4">
                  <h4
                    className="text-[#D1AB2A] text-lg font-semibold mb-3"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {data?.home?.customHomeBuilder?.title ||
                      "Need a custom home builder?"}
                  </h4>
                  <p className="text-white text-sm mb-4 leading-relaxed text-justify">
                    {data?.home?.customHomeBuilder?.paragraph1 ||
                      "We specialize in turning your vision of a dream home into reality. As a premier custom home builder, we offer personalized service, expert craftsmanship, and a commitment to quality that shows in every detail. Whether you're building your forever home or a unique getaway, we work closely with you from design to move-in day, ensuring your home reflects your lifestyle, needs, and personality."}
                  </p>
                  <p className="text-white text-sm mb-6 leading-relaxed text-justify">
                    {data?.home?.customHomeBuilder?.paragraph2 ||
                      "With decades of experience and a passion for excellence, we handle everything from custom floor plans and premium materials to the latest in energy efficiency and smart home technology. No two families are the same, and your home shouldn't be either. Let us help you create a truly one-of-a-kind space—built to last, designed to inspire. Contact us today to start building something extraordinary."}
                  </p>
                </div>
                <form id="ContactForm" className="space-y-4">
                  <div>
                    <input
                      name="first_name"
                      type="text"
                      required
                      placeholder={
                        data?.home?.customHomeBuilder?.formPlaceholders
                          ?.fullName || "Full Name"
                      }
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none text-sm"
                      style={{
                        backgroundColor: "#324157",
                        border: "1px solid #646149",
                        height: "45px",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      name="email"
                      type="text"
                      required
                      placeholder={
                        data?.home?.customHomeBuilder?.formPlaceholders
                          ?.email || "Email Address"
                      }
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none text-sm"
                      style={{
                        backgroundColor: "#324157",
                        border: "1px solid #646149",
                        height: "45px",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      name="phone"
                      type="text"
                      required
                      placeholder={
                        data?.home?.customHomeBuilder?.formPlaceholders
                          ?.phone || "Mobile Number"
                      }
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none text-sm"
                      style={{
                        backgroundColor: "#324157",
                        border: "1px solid #646149",
                        height: "45px",
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder={
                        data?.home?.customHomeBuilder?.formPlaceholders
                          ?.message || "Tell About Your home"
                      }
                      className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-400 focus:outline-none text-sm"
                      style={{
                        backgroundColor: "#324157",
                        border: "1px solid #646149",
                      }}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg font-semibold text-sm uppercase transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(to right, #D3AE3A, #C79A58)",
                        color: "#fff",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #C79A58, #D3AE3A)";
                        e.currentTarget.style.boxShadow =
                          "0px 5px 15px 2px rgba(155, 121, 11, 0.52)";
                        e.currentTarget.style.transform =
                          "translate(0px, -5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(to right, #D3AE3A, #C79A58)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translate(0px, 0px)";
                      }}
                    >
                      {data?.home?.customHomeBuilder?.submitButtonText ||
                        "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-0">
        <section
          className="py-4 flex items-center"
          style={{ background: "linear-gradient(to right, #141C2C, #1E473C)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8">
                <p className="text-white text-sm font-medium">
                  {data?.footer?.copyright ||
                    "© Copyright 2025, Hidden Groove Estates | All rights reserved."}
                </p>
              </div>
              <div className="md:col-span-4">
                <ul className="flex justify-start md:justify-end space-x-10 list-none items-center">
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
