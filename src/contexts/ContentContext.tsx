import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { WebsiteContent } from "../types/content";
import { getData } from "../services/apiService";
import { toast } from "react-toastify";

/**
 * Content context type definition
 * @interface ContentContextType
 */
interface ContentContextType {
  data: WebsiteContent | null;
  loading: boolean;
  error: string | null;
  updateData: (newData: WebsiteContent) => void;
  reload: () => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

/**
 * Content provider component that manages website content state
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<WebsiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Loads website content from the server using the API service
   * @returns {Promise<void>}
   */
  const loadData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const content = await getData();
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

  /**
   * Reloads website content from the server
   * @returns {Promise<void>}
   */
  const reload = async (): Promise<void> => {
    await loadData();
  };

  /**
   * Updates the website content in the context
   * @param {WebsiteContent} newData - New website content to set
   * @returns {void}
   */
  const updateData = (newData: WebsiteContent): void => {
    setData(newData);
  };

  /**
   * Resets content to default values
   * @returns {Promise<void>}
   * @note Reset functionality requires backup data from server. This is a placeholder - implement based on your API requirements.
   */
  const resetToDefault = async (): Promise<void> => {
    try {
      setError(null);
      toast.error(
        "Reset functionality is not available. Please contact administrator."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <ContentContext.Provider
      value={{ data, loading, error, updateData, reload, resetToDefault }}
    >
      {loading && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center"
          style={{
            background: "rgba(10, 24, 29, 0.95)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <img
                src={data?.header?.logo || "/images/logo1.png"}
                alt="Hidden Groove Estates"
                className="w-32 h-32 md:w-40 p-5 md:h-40 object-contain animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(211, 174, 58, 0.5))",
                }}
              />
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
                style={{
                  borderTopColor: "#D3AE3A",
                  borderRightColor: "#C79A58",
                }}
              />
            </div>
            <div
              className="text-white text-lg md:text-xl font-semibold"
              style={{
                fontFamily: "'Noto Serif', serif",
                color: "#D3AE3A",
              }}
            >
              Loading...
            </div>
          </div>
        </div>
      )}
      {children}
    </ContentContext.Provider>
  );
};

/**
 * Custom hook to access content context
 * @returns {ContentContextType} Content context value
 * @throws {Error} If used outside of ContentProvider
 */
export const useContentData = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContentData must be used within a ContentProvider");
  }
  return context;
};
