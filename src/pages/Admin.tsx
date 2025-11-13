import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContentData } from "../contexts/ContentContext";
import {
  updateData as updateDataAPI,
  uploadImage,
} from "../services/apiService";
import {
  deepClone,
  exportToFile,
  importWithToast,
} from "../utils/contentUtils";
import type { WebsiteContent } from "../types/content";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

/**
 * Admin component for managing website content
 * @returns {JSX.Element}
 */
export const Admin = () => {
  const { data, loading, updateData } = useContentData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WebsiteContent | null>(null);
  const [activeTab, setActiveTab] = useState<
    "home" | "about" | "contact" | "header" | "footer"
  >("home");
  const [saved, setSaved] = useState(false);
  const [expandedLotProperties, setExpandedLotProperties] = useState<
    Set<number>
  >(new Set());

  useEffect(() => {
    if (data) {
      const dataCopy = deepClone(data);

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

      if (dataCopy.home.lots && dataCopy.home.lots.length > 0) {
        const firstLotPropertyDetail = dataCopy.home.lots[0]?.propertyDetail;
        dataCopy.home.lots.forEach((lot: any) => {
          if (!lot.propertyDetail && firstLotPropertyDetail) {
            lot.propertyDetail = { ...firstLotPropertyDetail };
          }
        });
      }

      setFormData(dataCopy);
    }
  }, [data]);

  /**
   * Updates a nested value in the form data using a path array
   * @param {string[]} path - Array of keys representing the path to the value
   * @param {any} value - New value to set
   * @returns {void}
   */
  const handleChange = (path: string[], value: any) => {
    if (!formData) return;

    const newData = deepClone(formData);
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

  /**
   * Updates a field in an array item within the form data
   * @param {string[]} path - Array of keys representing the path to the array
   * @param {number} index - Index of the item in the array
   * @param {string} field - Field name to update
   * @param {any} value - New value to set
   * @returns {void}
   */
  const handleArrayChange = (
    path: string[],
    index: number,
    field: string,
    value: any
  ) => {
    if (!formData) return;

    const newData = deepClone(formData);
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

  /**
   * Adds a new lot to the form data
   * @returns {void}
   */
  const handleAddLot = () => {
    if (!formData) return;
    const newData = deepClone(formData);
    const defaultProperty =
      newData.home.lots.length > 0 && newData.home.lots[0]?.propertyDetail
        ? { ...newData.home.lots[0].propertyDetail }
        : {
            subType: "Residential Lot",
            type: "Land",
            status: "Active",
            propertyTax: 1000,
            hoaFee: 650,
            county: "Hidalgo",
            subdivision: "City Place at Chapin Subdivision",
          };
    const newLot = {
      id: String(Date.now()),
      lotNumber: `Lot ${newData.home.lots.length + 1}`,
      lotImage: "",
      size: 0,
      price: 0,
      available: true,
      propertyDetail: { ...defaultProperty },
    };
    newData.home.lots.push(newLot);
    setFormData(newData);
    setSaved(false);
  };

  /**
   * Updates a property detail field for a specific lot
   * @param {number} lotIndex - Index of the lot in the array
   * @param {string} field - Property detail field name to update
   * @param {any} value - New value to set
   * @returns {void}
   */
  const handleLotPropertyChange = (
    lotIndex: number,
    field: string,
    value: any
  ) => {
    if (!formData) return;
    const newData = deepClone(formData);
    if (newData.home.lots[lotIndex]) {
      if (!newData.home.lots[lotIndex].propertyDetail) {
        const firstLotPropertyDetail =
          newData.home.lots.length > 0 && newData.home.lots[0]?.propertyDetail
            ? { ...newData.home.lots[0].propertyDetail }
            : {
                subType: "Residential Lot",
                type: "Land",
                status: "Active",
                propertyTax: 1000,
                hoaFee: 650,
                county: "Hidalgo",
                subdivision: "City Place at Chapin Subdivision",
              };
        newData.home.lots[lotIndex].propertyDetail = firstLotPropertyDetail;
      }
      (newData.home.lots[lotIndex].propertyDetail as any)[field] = value;
    }
    setFormData(newData);
    setSaved(false);
  };

  /**
   * Removes a lot from the form data
   * @param {number} index - Index of the lot to remove
   * @returns {void}
   */
  const handleRemoveLot = (index: number) => {
    if (!formData) return;
    const newData = deepClone(formData);
    newData.home.lots.splice(index, 1);
    setFormData(newData);
    setSaved(false);
  };

  /**
   * Adds a new empty image URL to the slider images array
   * @returns {void}
   */
  const handleAddSliderImage = () => {
    if (!formData) return;
    const newData = deepClone(formData);
    newData.home.slider.images.push("");
    setFormData(newData);
    setSaved(false);
  };

  /**
   * Removes an image from the slider images array
   * @param {number} index - Index of the image to remove
   * @returns {void}
   */
  const handleRemoveSliderImage = (index: number) => {
    if (!formData) return;
    const newData = deepClone(formData);
    newData.home.slider.images.splice(index, 1);
    setFormData(newData);
    setSaved(false);
  };

  /**
   * Uploads an image for a specific lot and updates the lotImage field
   * @param {number} lotIndex - Index of the lot in the array
   * @param {File} file - Image file to upload
   * @returns {Promise<void>}
   */
  const handleLotImageUpload = async (
    lotIndex: number,
    file: File
  ): Promise<void> => {
    if (!formData) return;
    try {
      const imageUrl = await uploadImage(file);
      handleArrayChange(["home", "lots"], lotIndex, "lotImage", imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload image. Please try again."
      );
    }
  };

  /**
   * Uploads an image and updates the specified path in form data
   * @param {string[]} path - Array of keys representing the path to the image field
   * @param {File} file - Image file to upload
   * @returns {Promise<void>}
   */
  const handleImageUpload = async (
    path: string[],
    file: File
  ): Promise<void> => {
    if (!formData) return;
    try {
      const imageUrl = await uploadImage(file);
      handleChange(path, imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload image. Please try again."
      );
    }
  };

  /**
   * Uploads an image for a specific slider image and updates the array
   * @param {number} index - Index of the slider image in the array
   * @param {File} file - Image file to upload
   * @returns {Promise<void>}
   */
  const handleSliderImageUpload = async (
    index: number,
    file: File
  ): Promise<void> => {
    if (!formData) return;
    try {
      const imageUrl = await uploadImage(file);
      const newImages = [...formData.home.slider.images];
      newImages[index] = imageUrl;
      handleChange(["home", "slider", "images"], newImages);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload image. Please try again."
      );
    }
  };

  /**
   * Saves the current form data to the server
   * @returns {Promise<void>}
   */
  const handleSave = async () => {
    if (!formData) return;

    const savePromise = updateDataAPI(formData)
      .then((response) => {
        if (response.status === "success") {
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);

          const updatedData = deepClone(response.data);

          if (!updatedData.home.requestTour) {
            updatedData.home.requestTour = {
              title: "Request Tour",
              description: "When would you like to see this home?",
              submitButtonText: "Submit Request",
            };
          }

          if (!updatedData.home.customHomeBuilder) {
            updatedData.home.customHomeBuilder = {
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

          setFormData(updatedData);
          updateData(updatedData);

          return response;
        } else {
          throw new Error(response.message || "Failed to update content");
        }
      })
      .catch((error: any) => {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to update content on server";
        throw new Error(errorMessage);
      });

    toast.promise(savePromise, {
      pending: "Updating content on server...",
      success: "Content updated successfully on server!",
      error: "Failed to update content. Please try again.",
    });
  };

  /**
   * Exports the current form data to a JSON file
   * @returns {void}
   */
  const handleExport = () => {
    if (!formData) return;
    exportToFile(formData);
  };

  /**
   * Imports website content from a JSON file
   * @param {React.ChangeEvent<HTMLInputElement>} e - File input change event
   * @returns {void}
   */
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importWithToast(file, (imported) => {
      setFormData(imported);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  /**
   * Logs out the user and redirects to login page
   * @returns {void}
   */
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Content Management
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Click "Save Changes" to update content on the server.
                </p>
              </div>
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
                onClick={handleSave}
                className={`px-6 py-2 rounded font-semibold ${
                  saved
                    ? "bg-green-500 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                          className="flex-1 px-3 py-2 border border-gray-300 rounded"
                          placeholder="/images/banner.jpg"
                        />
                        <label className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-xs whitespace-nowrap flex items-center">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleSliderImageUpload(idx, file);
                              }
                              e.target.value = "";
                            }}
                            className="hidden"
                          />
                        </label>
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
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg shadow">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Lot Number
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Lot Image
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Size (sq ft)
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Price ($)
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Available
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.home.lots.map((lot, idx) => (
                        <React.Fragment key={lot.id}>
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="border border-gray-300 px-4 py-2">
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
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={lot.lotImage || ""}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      ["home", "lots"],
                                      idx,
                                      "lotImage",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="/images/lot-image.jpg"
                                />
                                <label className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-xs whitespace-nowrap flex items-center">
                                  Upload
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleLotImageUpload(idx, file);
                                      }
                                      e.target.value = "";
                                    }}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
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
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
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
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <Listbox
                                value={lot.available ? "true" : "false"}
                                onChange={(value) =>
                                  handleArrayChange(
                                    ["home", "lots"],
                                    idx,
                                    "available",
                                    value === "true"
                                  )
                                }
                              >
                                <div className="relative">
                                  <Listbox.Button className="relative w-full cursor-default rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                    <span className="block truncate">
                                      {lot.available ? "Yes" : "No"}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
                                      {["true", "false"].map((option) => (
                                        <Listbox.Option
                                          key={option}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? "bg-blue-100 text-blue-900"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value={option}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                {option === "true"
                                                  ? "Yes"
                                                  : "No"}
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    const newExpanded = new Set(
                                      expandedLotProperties
                                    );
                                    if (newExpanded.has(idx)) {
                                      newExpanded.delete(idx);
                                    } else {
                                      newExpanded.add(idx);
                                    }
                                    setExpandedLotProperties(newExpanded);
                                  }}
                                  className="w-8 h-8 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center transition-colors"
                                  title={
                                    expandedLotProperties.has(idx)
                                      ? "Hide Details"
                                      : "Show Details"
                                  }
                                >
                                  <i className="fa-solid fa-circle-info"></i>
                                </button>
                                <button
                                  onClick={() => handleRemoveLot(idx)}
                                  className="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center transition-colors"
                                  title="Remove Lot"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                          {expandedLotProperties.has(idx) && (
                            <tr
                              className="transition-all duration-500 ease-in-out"
                              style={{
                                animation: "fadeInSlideDown 0.5s ease-in-out",
                              }}
                            >
                              <td
                                colSpan={6}
                                className="border border-gray-300 px-4 py-4 bg-gray-50"
                              >
                                <div
                                  className="transition-all duration-500 ease-in-out"
                                  style={{
                                    animation: "fadeIn 0.5s ease-in-out",
                                  }}
                                >
                                  {lot.propertyDetail && (
                                    <>
                                      <h4 className="text-lg font-semibold mb-3 text-gray-700">
                                        Property Details for {lot.lotNumber}
                                      </h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            SubType
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.subType || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "subType",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Type
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.type || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "type",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.status || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "status",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Property Tax
                                          </label>
                                          <input
                                            type="number"
                                            value={
                                              lot.propertyDetail.propertyTax ||
                                              0
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "propertyTax",
                                                parseInt(e.target.value) || 0
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            HOA Fee
                                          </label>
                                          <input
                                            type="number"
                                            value={
                                              lot.propertyDetail.hoaFee || 0
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "hoaFee",
                                                parseInt(e.target.value) || 0
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            County
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.county || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "county",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Subdivision
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.subdivision ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "subdivision",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            HOA
                                          </label>
                                          <input
                                            type="text"
                                            value={lot.propertyDetail.hoa || ""}
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "hoa",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fencing
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.fencing || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "fencing",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Utilities
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.utilities || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "utilities",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Sewer
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.sewer || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "sewer",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Irrigation
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.irrigation ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "irrigation",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            HOA Amenities
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.hoaAmenities ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "hoaAmenities",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Community Features
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail
                                                .communityFeatures || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "communityFeatures",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Elementary School
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail
                                                .elementarySchool || ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "elementarySchool",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            High School
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.highSchool ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "highSchool",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Middle School
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.middleSchool ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "middleSchool",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            APN
                                          </label>
                                          <input
                                            type="text"
                                            value={lot.propertyDetail.apn || ""}
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "apn",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Road Frontage
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.roadFrontage ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "roadFrontage",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Road Surface
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.roadSurface ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "roadSurface",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Possible Use
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.possibleUse ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "possibleUse",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Topography
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              lot.propertyDetail.topography ||
                                              ""
                                            }
                                            onChange={(e) =>
                                              handleLotPropertyChange(
                                                idx,
                                                "topography",
                                                e.target.value
                                              )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                          />
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  Images
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.home.streetImage}
                        onChange={(e) =>
                          handleChange(["home", "streetImage"], e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="/images/street-image.jpg"
                      />
                      <label className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-xs whitespace-nowrap flex items-center">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(["home", "streetImage"], file);
                            }
                            e.target.value = "";
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aerial View Image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.home.aerialViewImage}
                        onChange={(e) =>
                          handleChange(
                            ["home", "aerialViewImage"],
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="/images/aerial-view.jpg"
                      />
                      <label className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-xs whitespace-nowrap flex items-center">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(
                                ["home", "aerialViewImage"],
                                file
                              );
                            }
                            e.target.value = "";
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.aboutUs.profileImage}
                    onChange={(e) =>
                      handleChange(["aboutUs", "profileImage"], e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="/images/profile-image.jpg"
                  />
                  <label className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-xs whitespace-nowrap flex items-center">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(["aboutUs", "profileImage"], file);
                        }
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.header.logo}
                    onChange={(e) =>
                      handleChange(["header", "logo"], e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="/images/logo.png"
                  />
                  <label className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-xs whitespace-nowrap flex items-center">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(["header", "logo"], file);
                        }
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
