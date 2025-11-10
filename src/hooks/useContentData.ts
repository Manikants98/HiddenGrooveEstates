import { useState, useEffect } from "react";
import type { WebsiteContent } from "../types/content";
import { ContentService } from "../services/contentService";

export const useContentData = () => {
  const [data, setData] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const content = await ContentService.load();
        setData(content);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const resetToDefault = async (): Promise<void> => {
    try {
      const result = await ContentService.reset();
      if (result.success) {
        const backupData = ContentService.getBackupContent();
        setData(backupData);
      } else {
        setError(result.error || "Failed to reset content");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return { data, loading, error, resetToDefault };
};
