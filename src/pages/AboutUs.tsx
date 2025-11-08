import { Link } from "react-router-dom";

export const AboutUs = () => {
  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(to right, #123233, #225150)" }}
    >
      {/* Page Header */}
      <section className="pt-0 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-5xl md:text-6xl font-normal text-[#E8D28E] mb-4"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              About Us
            </h1>
            <p className="text-white text-lg italic">
              <em>Crafting Excellence in Every Detail</em>
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Profile */}
            <div className="lg:col-span-4">
              <div className="text-center">
                <div
                  className="w-[230px] h-[230px] mx-auto mb-5 rounded-full overflow-hidden border-3 shadow-lg"
                  style={{
                    border: "3px solid #9A761C",
                    boxShadow: "0px 0px 25px 3px rgba(154, 118, 28, 0.49)",
                  }}
                >
                  <img
                    src="/images/user-pic.png"
                    alt="Hidden Groove Estates"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className="text-3xl font-normal text-[#D1AB2A] mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Hidden Groove Estates
                </h3>
                <p className="text-white text-base italic">
                  <em>Professional Excellence</em>
                </p>
              </div>
            </div>

            {/* Right Column - Our History */}
            <div className="lg:col-span-8">
              <div
                className="rounded-3xl p-8 md:p-11 shadow-lg"
                style={{
                  background: "linear-gradient(to right, #1D4848, #214F4E)",
                  border: "1px solid #4C663E",
                }}
              >
                <div className="mb-6">
                  <h3
                    className="text-[#D1AB2A] text-3xl font-normal mb-2"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    Our History
                  </h3>
                  <img
                    src="/images/border-line.png"
                    alt=""
                    className="w-[120px]"
                  />
                </div>
                <div className="space-y-4 text-white leading-relaxed text-justify">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur inventore repudiandae ipsam soluta sint, impedit
                    voluptatem corporis, eos laborum nulla qui vitae quasi?
                    Voluptates laboriosam fuga nihil, adipisci repellat animi
                    dicta id ratione soluta culpa, vero nostrum ad.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sint ab commodi cupiditate enim labore officiis distinctio
                    nisi, aliquid cum dolor error aut sed repellat. Perspiciatis
                    eaque doloribus provident numquam aspernatur neque
                    recusandae omnis.
                  </p>
                </div>
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
