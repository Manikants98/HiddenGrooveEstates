import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContentData } from "../contexts/ContentContext";

export const AboutUs = () => {
  const { data } = useContentData();
  // Initialize with desktop values if window is available
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
  const [sectionPadding, setSectionPadding] = useState(
    isDesktop ? "0 0 40px" : "0 0 30px"
  );
  const [containerStyle, setContainerStyle] = useState(
    isDesktop
      ? { maxWidth: "1320px", margin: "0 60px", padding: "0 12px" }
      : { maxWidth: "none", margin: "0", padding: "0 12px" }
  );
  const [h1FontSize, setH1FontSize] = useState(isDesktop ? "55px" : "35px");
  const [h1LineHeight, setH1LineHeight] = useState(isDesktop ? "66px" : "42px");
  const [subtitleFontSize, setSubtitleFontSize] = useState(
    isDesktop ? "18px" : "15px"
  );
  const [titleMarginBottom, setTitleMarginBottom] = useState("48px");
  const [nameFontSize, setNameFontSize] = useState(isDesktop ? "28px" : "23px");
  const [profileMargin, setProfileMargin] = useState(
    isDesktop ? "0 93px 20px" : "0 auto 20px"
  );
  const [historyPadding, setHistoryPadding] = useState(
    isDesktop ? "45px 35px" : "30px 20px"
  );

  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth >= 768) {
        setSectionPadding("0 0 40px");
        setContainerStyle({
          maxWidth: "1320px",
          margin: "0 60px",
          padding: "0 12px",
        });
        setH1FontSize("55px");
        setH1LineHeight("66px");
        setSubtitleFontSize("18px");
        setTitleMarginBottom("48px");
        setNameFontSize("28px");
        setProfileMargin("0 93px 20px");
        setHistoryPadding("45px 35px");
      } else {
        setSectionPadding("0 0 30px");
        setContainerStyle({
          maxWidth: "none",
          margin: "0",
          padding: "0 12px",
        });
        setH1FontSize("35px");
        setH1LineHeight("42px");
        setSubtitleFontSize("15px");
        setTitleMarginBottom("48px");
        setNameFontSize("23px");
        setProfileMargin("0 auto 20px");
        setHistoryPadding("30px 20px");
      }
    };

    updateStyles();
    window.addEventListener("resize", updateStyles);
    return () => window.removeEventListener("resize", updateStyles);
  }, []);

  return (
    <div
      className="min-h-[90vh]"
      style={{ background: "linear-gradient(to right, #123233, #225150)" }}
    >
      <section style={{ padding: sectionPadding }}>
        <div style={containerStyle}>
          <div
            className="text-center"
            style={{ marginBottom: titleMarginBottom }}
          >
            <h1
              className="font-normal text-[#E8D28E]"
              style={{
                fontFamily: "'Noto Serif', serif",
                fontSize: h1FontSize,
                lineHeight: h1LineHeight,
                marginTop: "0px",
                marginBottom: "8px",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              {data?.aboutUs?.title || "About Us"}
            </h1>
            <p
              className="text-white italic"
              style={{
                fontSize: subtitleFontSize,
                lineHeight: "22px",
                marginTop: "0px",
                marginBottom: "16px",
                paddingTop: "0px",
                paddingBottom: "0px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <em>
                {data?.aboutUs?.subtitle ||
                  "Crafting Excellence in Every Detail"}
              </em>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="text-center">
                <div
                  className="w-[230px] h-[230px] rounded-full overflow-hidden"
                  style={{
                    border: "3px solid #9A761C",
                    boxShadow: "0px 0px 25px 3px rgba(154, 118, 28, 0.49)",
                    margin: profileMargin,
                  }}
                >
                  <img
                    src={data?.aboutUs?.profileImage || "/images/user-pic.png"}
                    alt="Hidden Groove Estates"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="font-normal text-[#D1AB2A]"
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: nameFontSize,
                    marginTop: "0px",
                    marginBottom: "8px",
                    marginLeft: "0px",
                    marginRight: "0px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    textAlign: "center",
                  }}
                >
                  {data?.aboutUs?.name || "Hidden Groove Estates"}
                </h3>
                <p
                  className="text-white"
                  style={{
                    fontSize: "14px",
                    fontFamily: "Poppins, sans-serif",
                    marginTop: "0px",
                    marginBottom: "16px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    textAlign: "center",
                  }}
                >
                  <em>{data?.aboutUs?.tagline || "Professional Excellence"}</em>
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div
                style={{
                  background: "linear-gradient(to right, #1D4848, #214F4E)",
                  border: "1px solid #4C663E",
                  borderRadius: "20px",
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 8px 16px 0px",
                  padding: historyPadding,
                }}
              >
                <div
                  style={{
                    marginTop: "0px",
                    marginBottom: "8px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  <h3
                    className="text-[#D1AB2A] font-normal"
                    style={{
                      fontFamily: "'Noto Serif', serif",
                      fontSize: "26px",
                      marginTop: "0px",
                      marginBottom: "0px",
                      marginLeft: "0px",
                      marginRight: "0px",
                      paddingTop: "0px",
                      paddingBottom: "7px",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                    }}
                  >
                    {data?.aboutUs?.history?.title || "Our History"}
                  </h3>
                  <img
                    src="/images/border-line.png"
                    alt=""
                    style={{
                      width: "120px",
                      height: "5px",
                      marginTop: "0px",
                      marginBottom: "0px",
                      marginLeft: "0px",
                      marginRight: "0px",
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  className="text-white"
                  style={{
                    marginTop: "0px",
                    paddingTop: "7px",
                  }}
                >
                  {data?.aboutUs?.history?.paragraphs?.map(
                    (para: string, idx: number) => (
                      <p
                        key={idx}
                        style={{
                          fontSize: "14px",
                          lineHeight: "22px",
                          textAlign: "justify",
                          marginBottom: idx === 0 ? "24px" : "16px",
                        }}
                      >
                        {para}
                      </p>
                    )
                  ) || (
                    <>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "22px",
                          textAlign: "justify",
                          marginBottom: "24px",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur inventore repudiandae ipsam soluta sint, impedit
                        voluptatem corporis, eos laborum nulla qui vitae quasi?
                        Voluptates laboriosam fuga nihil, adipisci repellat
                        animi dicta id ratione soluta culpa, vero nostrum ad.
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "22px",
                          textAlign: "justify",
                          marginBottom: "16px",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sint ab commodi cupiditate enim labore officiis
                        distinctio nisi, aliquid cum dolor error aut sed
                        repellat. Perspiciatis eaque doloribus provident numquam
                        aspernatur neque recusandae omnis.
                      </p>
                    </>
                  )}
                </div>
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
