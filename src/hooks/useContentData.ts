import { useState, useEffect } from "react";
import type { WebsiteContent } from "../types/content";

/**
 * Custom hook for managing website content data.
 *
 * Loads content from localStorage (if available from admin edits) or falls back to the default JSON file.
 * Provides methods to update, reset, and manage the content data.
 *
 * @returns {Object} An object containing:
 * @returns {WebsiteContent | null} data - The current website content data
 * @returns {boolean} loading - Loading state indicator
 * @returns {string | null} error - Error message if data loading fails
 * @returns {Function} updateData - Function to update and persist content data
 * @returns {Function} resetToDefault - Function to reset content to default JSON file
 *
 * @example
 * ```tsx
 * const { data, loading, updateData } = useContentData();
 *
 * if (loading) return <div>Loading...</div>;
 * if (data) {
 *   // Use data.home, data.aboutUs, etc.
 * }
 * ```
 */
export const useContentData = () => {
  const [data, setData] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const savedData = localStorage.getItem("contentData");
        if (savedData) {
          setData(JSON.parse(savedData));
          setLoading(false);
          return;
        }

        const response = await fetch("/data/content.json");
        if (!response.ok) throw new Error("Failed to load content");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /**
   * Updates the content data and persists it to localStorage.
   *
   * @param {WebsiteContent} newData - The new content data to set
   */
  const updateData = (newData: WebsiteContent): void => {
    setData(newData);
    localStorage.setItem("contentData", JSON.stringify(newData));
  };

  /**
   * Resets the content data to the default values from the JSON file.
   * Clears localStorage and reloads from the default content.json file.
   *
   * @returns {Promise<void>}
   */
  const resetToDefault = async (): Promise<void> => {
    try {
      const response = await fetch("/data/content.json");
      if (!response.ok) throw new Error("Failed to load default content");
      const jsonData = await response.json();
      setData(jsonData);
      localStorage.setItem("contentData", JSON.stringify(jsonData));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return { data, loading, error, updateData, resetToDefault };
};
