import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { WebsiteContent } from "../types/content";
import { ContentService } from "../services/contentService";

interface ContentContextType {
  data: WebsiteContent | null;
  loading: boolean;
  error: string | null;
  updateData: (newData: WebsiteContent) => void;
  reload: () => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (): Promise<void> => {
    try {
      setLoading(true);
      const content = await ContentService.load();
      setData(content);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const reload = async (): Promise<void> => {
    await loadData();
  };

  const updateData = (newData: WebsiteContent): void => {
    setData(newData);
  };

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

  return (
    <ContentContext.Provider
      value={{ data, loading, error, updateData, reload, resetToDefault }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContentData = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContentData must be used within a ContentProvider");
  }
  return context;
};
