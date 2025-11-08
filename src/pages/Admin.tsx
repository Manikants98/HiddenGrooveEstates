import { useState, useEffect } from "react";
import { useContentData } from "../hooks/useContentData";
import type { WebsiteContent } from "../types/content";

export const Admin = () => {
  const { data, loading, updateData, resetToDefault } = useContentData();
  const [formData, setFormData] = useState<WebsiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<
    "home" | "about" | "contact" | "header" | "footer"
  >("home");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      const dataCopy = JSON.parse(JSON.stringify(data));

      if (!dataCopy.home.requestTour) {
        dataCopy.home.requestTour = {
          title: "Request Tour",
          description: "When would you like to see this home?",
          submitButtonText: "Submit Request",
        };
      }

      if (!dataCopy.home.customHomeBuilder) {
        dataCopy.home.customHomeBuilder = {
          title: "Need a custom home builder?",
          paragraph1:
            "We specialize in turning your vision of a dream home into reality. As a premier custom home builder, we offer personalized service, expert craftsmanship, and a commitment to quality that shows in every detail. Whether you're building your forever home or a unique getaway, we work closely with you from design to move-in day, ensuring your home reflects your lifestyle, needs, and personality.",
          paragraph2:
            "With decades of experience and a passion for excellence, we handle everything from custom floor plans and premium materials to the latest in energy efficiency and smart home technology. No two families are the same, and your home shouldn't be either. Let us help you create a truly one-of-a-kind space—built to last, designed to inspire. Contact us today to start building something extraordinary.",
          formPlaceholders: {
            fullName: "Full Name",
            email: "Email Address",
            phone: "Mobile Number",
            message: "Tell About Your home",
          },
          submitButtonText: "Submit",
        };
      }

      setFormData(dataCopy);
    }
  }, [data]);

  const handleChange = (path: string[], value: any) => {
    if (!formData) return;

    const newData = JSON.parse(JSON.stringify(formData));
    let current: any = newData;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    setFormData(newData);
    setSaved(false);
  };

  const handleArrayChange = (
    path: string[],
    index: number,
    field: string,
    value: any
  ) => {
    if (!formData) return;

    const newData = JSON.parse(JSON.stringify(formData));
    let current: any = newData;

    for (let i = 0; i < path.length; i++) {
      current = current[path[i]];
    }

    if (current[index]) {
      current[index][field] = value;
    }

    setFormData(newData);
    setSaved(false);
  };

  const handleAddLot = () => {
    if (!formData) return;
    const newData = JSON.parse(JSON.stringify(formData));
    const newLot = {
      id: String(Date.now()),
      lotNumber: `Lot ${newData.home.lots.length + 1}`,
      size: 0,
      price: 0,
      available: true,
    };
    newData.home.lots.push(newLot);
    setFormData(newData);
    setSaved(false);
  };

  const handleRemoveLot = (index: number) => {
    if (!formData) return;
    const newData = JSON.parse(JSON.stringify(formData));
    newData.home.lots.splice(index, 1);
    setFormData(newData);
    setSaved(false);
  };

  const handleAddSliderImage = () => {
    if (!formData) return;
    const newData = JSON.parse(JSON.stringify(formData));
    newData.home.slider.images.push("");
    setFormData(newData);
    setSaved(false);
  };

  const handleRemoveSliderImage = (index: number) => {
    if (!formData) return;
    const newData = JSON.parse(JSON.stringify(formData));
    newData.home.slider.images.splice(index, 1);
    setFormData(newData);
    setSaved(false);
  };

  const handleSave = () => {
    if (formData) {
      updateData(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleExport = () => {
    if (!formData) return;
    const dataStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "content.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          setFormData(imported);
          updateData(imported);
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        } catch (err) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = async () => {
    if (
      confirm(
        "Are you sure you want to reset to default content? This will overwrite all changes."
      )
    ) {
      await resetToDefault();
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading content</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="bg-white shadow-lg border-b-2 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Content Management
              </h1>
              <a
                href="/"
                className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                ← Back to Site
              </a>
            </div>
            <div className="flex gap-3">
              <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Export JSON
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Reset to Default
              </button>
              <button
                onClick={handleSave}
                className={`px-6 py-2 rounded font-semibold ${
                  saved
                    ? "bg-green-500 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg mb-6 border-2 border-gray-200">
          <div className="flex">
            {(["home", "about", "contact", "header", "footer"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm uppercase tracking-wider ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "home"
                    ? "Home Page"
                    : tab === "about"
                    ? "About Us"
                    : tab === "contact"
                    ? "Contact Us"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "home" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Home Page Content</h2>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Hero Slider
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto Advance Interval (ms)
                    </label>
                    <input
                      type="number"
                      value={formData.home.slider.autoAdvanceInterval}
                      onChange={(e) =>
                        handleChange(
                          ["home", "slider", "autoAdvanceInterval"],
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slider Images
                    </label>
                    {formData.home.slider.images.map((img, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={img}
                          onChange={(e) => {
                            const newImages = [...formData.home.slider.images];
                            newImages[idx] = e.target.value;
                            handleChange(
                              ["home", "slider", "images"],
                              newImages
                            );
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="/images/banner.jpg"
                        />
                        <button
                          onClick={() => handleRemoveSliderImage(idx)}
                          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSliderImage}
                      className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      + Add Image
                    </button>
                  </div>
                </div>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Lots
                </h3>
                <div className="space-y-4">
                  {formData.home.lots.map((lot, idx) => (
                    <div key={lot.id} className="rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lot Number
                          </label>
                          <input
                            type="text"
                            value={lot.lotNumber}
                            onChange={(e) =>
                              handleArrayChange(
                                ["home", "lots"],
                                idx,
                                "lotNumber",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Size (sq ft)
                          </label>
                          <input
                            type="number"
                            value={lot.size}
                            onChange={(e) =>
                              handleArrayChange(
                                ["home", "lots"],
                                idx,
                                "size",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($)
                          </label>
                          <input
                            type="number"
                            value={lot.price}
                            onChange={(e) =>
                              handleArrayChange(
                                ["home", "lots"],
                                idx,
                                "price",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Available
                          </label>
                          <select
                            value={lot.available ? "true" : "false"}
                            onChange={(e) =>
                              handleArrayChange(
                                ["home", "lots"],
                                idx,
                                "available",
                                e.target.value === "true"
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => handleRemoveLot(idx)}
                            className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleAddLot}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    + Add Lot
                  </button>
                </div>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Property Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SubType
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.subType}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "subType"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.type}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "type"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.status}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "status"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Tax
                    </label>
                    <input
                      type="number"
                      value={formData.home.property.propertyTax}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "propertyTax"],
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HOA Fee
                    </label>
                    <input
                      type="number"
                      value={formData.home.property.hoaFee}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "hoaFee"],
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      County
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.county}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "county"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subdivision
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.subdivision}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "subdivision"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HOA
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.hoa || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "hoa"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fencing
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.fencing || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "fencing"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Utilities
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.utilities || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "utilities"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sewer
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.sewer || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "sewer"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Irrigation
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.irrigation || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "irrigation"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HOA Amenities
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.hoaAmenities || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "hoaAmenities"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Community Features
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.communityFeatures || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "communityFeatures"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Elementary School
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.elementarySchool || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "elementarySchool"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      High School
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.highSchool || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "highSchool"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Middle School
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.middleSchool || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "middleSchool"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      APN
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.apn || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "apn"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Road Frontage
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.roadFrontage || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "roadFrontage"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Road Surface
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.roadSurface || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "roadSurface"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Possible Use
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.possibleUse || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "possibleUse"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topography
                    </label>
                    <input
                      type="text"
                      value={formData.home.property.topography || ""}
                      onChange={(e) =>
                        handleChange(
                          ["home", "property", "topography"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Golden Info Box
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.home.goldenBox.title}
                      onChange={(e) =>
                        handleChange(
                          ["home", "goldenBox", "title"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.home.goldenBox.subtitle}
                      onChange={(e) =>
                        handleChange(
                          ["home", "goldenBox", "subtitle"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.home.goldenBox.description}
                      onChange={(e) =>
                        handleChange(
                          ["home", "goldenBox", "description"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Images
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Image
                    </label>
                    <input
                      type="text"
                      value={formData.home.streetImage}
                      onChange={(e) =>
                        handleChange(["home", "streetImage"], e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lot Layout Image
                    </label>
                    <input
                      type="text"
                      value={formData.home.lotLayoutImage}
                      onChange={(e) =>
                        handleChange(["home", "lotLayoutImage"], e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aerial View Image
                    </label>
                    <input
                      type="text"
                      value={formData.home.aerialViewImage}
                      onChange={(e) =>
                        handleChange(
                          ["home", "aerialViewImage"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Request Tour Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.home.requestTour.title}
                      onChange={(e) =>
                        handleChange(
                          ["home", "requestTour", "title"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.home.requestTour.description}
                      onChange={(e) =>
                        handleChange(
                          ["home", "requestTour", "description"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Submit Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.home.requestTour.submitButtonText}
                      onChange={(e) =>
                        handleChange(
                          ["home", "requestTour", "submitButtonText"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="pb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Custom Home Builder Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.home.customHomeBuilder.title}
                      onChange={(e) =>
                        handleChange(
                          ["home", "customHomeBuilder", "title"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paragraph 1
                    </label>
                    <textarea
                      value={formData.home.customHomeBuilder.paragraph1}
                      onChange={(e) =>
                        handleChange(
                          ["home", "customHomeBuilder", "paragraph1"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paragraph 2
                    </label>
                    <textarea
                      value={formData.home.customHomeBuilder.paragraph2}
                      onChange={(e) =>
                        handleChange(
                          ["home", "customHomeBuilder", "paragraph2"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={4}
                    />
                  </div>
                  <div className="pt-4">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 border-l-4 border-green-500 pl-3">
                      Form Placeholders
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name Placeholder
                        </label>
                        <input
                          type="text"
                          value={
                            formData.home.customHomeBuilder.formPlaceholders
                              .fullName
                          }
                          onChange={(e) =>
                            handleChange(
                              [
                                "home",
                                "customHomeBuilder",
                                "formPlaceholders",
                                "fullName",
                              ],
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Placeholder
                        </label>
                        <input
                          type="text"
                          value={
                            formData.home.customHomeBuilder.formPlaceholders
                              .email
                          }
                          onChange={(e) =>
                            handleChange(
                              [
                                "home",
                                "customHomeBuilder",
                                "formPlaceholders",
                                "email",
                              ],
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Placeholder
                        </label>
                        <input
                          type="text"
                          value={
                            formData.home.customHomeBuilder.formPlaceholders
                              .phone
                          }
                          onChange={(e) =>
                            handleChange(
                              [
                                "home",
                                "customHomeBuilder",
                                "formPlaceholders",
                                "phone",
                              ],
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message Placeholder
                        </label>
                        <input
                          type="text"
                          value={
                            formData.home.customHomeBuilder.formPlaceholders
                              .message
                          }
                          onChange={(e) =>
                            handleChange(
                              [
                                "home",
                                "customHomeBuilder",
                                "formPlaceholders",
                                "message",
                              ],
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Submit Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.home.customHomeBuilder.submitButtonText}
                      onChange={(e) =>
                        handleChange(
                          ["home", "customHomeBuilder", "submitButtonText"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">About Us Page Content</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  value={formData.aboutUs.title}
                  onChange={(e) =>
                    handleChange(["aboutUs", "title"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.aboutUs.subtitle}
                  onChange={(e) =>
                    handleChange(["aboutUs", "subtitle"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <input
                  type="text"
                  value={formData.aboutUs.profileImage}
                  onChange={(e) =>
                    handleChange(["aboutUs", "profileImage"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.aboutUs.name}
                  onChange={(e) =>
                    handleChange(["aboutUs", "name"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.aboutUs.tagline}
                  onChange={(e) =>
                    handleChange(["aboutUs", "tagline"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  History Section
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    History Title
                  </label>
                  <input
                    type="text"
                    value={formData.aboutUs.history.title}
                    onChange={(e) =>
                      handleChange(
                        ["aboutUs", "history", "title"],
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    History Paragraphs
                  </label>
                  {formData.aboutUs.history.paragraphs.map((para, idx) => (
                    <textarea
                      key={idx}
                      value={para}
                      onChange={(e) => {
                        const newParas = [
                          ...formData.aboutUs.history.paragraphs,
                        ];
                        newParas[idx] = e.target.value;
                        handleChange(
                          ["aboutUs", "history", "paragraphs"],
                          newParas
                        );
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                      rows={4}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">
                Contact Us Page Content
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.contactUs.title}
                    onChange={(e) =>
                      handleChange(["contactUs", "title"], e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Highlighted Title
                  </label>
                  <input
                    type="text"
                    value={formData.contactUs.highlightedTitle}
                    onChange={(e) =>
                      handleChange(
                        ["contactUs", "highlightedTitle"],
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.contactUs.description}
                  onChange={(e) =>
                    handleChange(["contactUs", "description"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features
                </label>
                {formData.contactUs.features.map((feature, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...formData.contactUs.features];
                      newFeatures[idx] = e.target.value;
                      handleChange(["contactUs", "features"], newFeatures);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                  />
                ))}
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Office Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value={formData.contactUs.office.address}
                      onChange={(e) =>
                        handleChange(
                          ["contactUs", "office", "address"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={formData.contactUs.office.phone}
                      onChange={(e) =>
                        handleChange(
                          ["contactUs", "office", "phone"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Display
                    </label>
                    <input
                      type="text"
                      value={formData.contactUs.office.phoneDisplay}
                      onChange={(e) =>
                        handleChange(
                          ["contactUs", "office", "phoneDisplay"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactUs.office.email}
                      onChange={(e) =>
                        handleChange(
                          ["contactUs", "office", "email"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sales Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactUs.office.emailSales}
                      onChange={(e) =>
                        handleChange(
                          ["contactUs", "office", "emailSales"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weekdays Hours
                    </label>
                    <input
                      type="text"
                      value={formData.contactUs.office.hours.weekdays}
                      onChange={(e) =>
                        handleChange(
                          ["contactUs", "office", "hours", "weekdays"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weekends Hours
                    </label>
                    <input
                      type="text"
                      value={formData.contactUs.office.hours.weekends}
                      onChange={(e) =>
                        handleChange(
                          ["contactUs", "office", "hours", "weekends"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "header" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Header Content</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={formData.header.logo}
                  onChange={(e) =>
                    handleChange(["header", "logo"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Tagline
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Line 1
                    </label>
                    <input
                      type="text"
                      value={formData.header.tagline.line1}
                      onChange={(e) =>
                        handleChange(
                          ["header", "tagline", "line1"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Line 2
                    </label>
                    <input
                      type="text"
                      value={formData.header.tagline.line2}
                      onChange={(e) =>
                        handleChange(
                          ["header", "tagline", "line2"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Line 3
                    </label>
                    <input
                      type="text"
                      value={formData.header.tagline.line3}
                      onChange={(e) =>
                        handleChange(
                          ["header", "tagline", "line3"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Footer Content</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Copyright Text
                </label>
                <input
                  type="text"
                  value={formData.footer.copyright}
                  onChange={(e) =>
                    handleChange(["footer", "copyright"], e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Privacy Policy URL
                    </label>
                    <input
                      type="text"
                      value={formData.footer.links.privacy}
                      onChange={(e) =>
                        handleChange(
                          ["footer", "links", "privacy"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Terms URL
                    </label>
                    <input
                      type="text"
                      value={formData.footer.links.terms}
                      onChange={(e) =>
                        handleChange(
                          ["footer", "links", "terms"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact URL
                    </label>
                    <input
                      type="text"
                      value={formData.footer.links.contact}
                      onChange={(e) =>
                        handleChange(
                          ["footer", "links", "contact"],
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
