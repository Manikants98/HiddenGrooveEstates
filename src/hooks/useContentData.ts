import { useState, useEffect } from "react";
import type { WebsiteContent } from "../types/content";

export const useContentData = () => {
  const [data, setData] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Try to load from localStorage first (admin edits)
        const savedData = localStorage.getItem("contentData");
        if (savedData) {
          setData(JSON.parse(savedData));
          setLoading(false);
          return;
        }

        // Otherwise load from JSON file
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

  const updateData = (newData: WebsiteContent) => {
    setData(newData);
    localStorage.setItem("contentData", JSON.stringify(newData));
  };

  const resetToDefault = async () => {
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
