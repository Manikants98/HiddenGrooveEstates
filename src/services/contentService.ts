import { toast } from "react-toastify";
import type { WebsiteContent } from "../types/content";
import defaultContent from "../data/content.json";
import backupContent from "../data/content.backup.json";

export interface SaveResponse {
  success: boolean;
  message?: string;
  error?: string;
  requiresSetup?: boolean;
}

export class ContentService {
  private static readonly API_ENDPOINT = "/api/update-content";

  static async load(): Promise<WebsiteContent> {
    try {
      const response = await fetch("/api/get-content", {
        cache: "no-store",
      });
      if (response.ok) {
        const storedContent = await response.json();
        return storedContent as WebsiteContent;
      }
    } catch (error) {
      console.warn("Failed to load from API, using default content:", error);
    }
    return defaultContent as WebsiteContent;
  }

  static getBackupContent(): WebsiteContent {
    return backupContent as WebsiteContent;
  }

  static async save(content: WebsiteContent): Promise<SaveResponse> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  static async saveWithToast(
    content: WebsiteContent,
    onSuccess?: (savedContent: WebsiteContent) => void,
    onDataUpdate?: (updatedContent: WebsiteContent) => void
  ): Promise<void> {
    const savePromise = this.save(content).then((result) => {
      if (result.success) {
        if (onDataUpdate) {
          onDataUpdate(content);
        }
        onSuccess?.(content);
        return result;
      } else {
        const errorMsg = result.error || "Failed to save content";
        if (result.requiresSetup) {
          throw new Error(
            `${errorMsg}\n\nPlease set up Vercel KV in your project settings.`
          );
        }
        throw new Error(errorMsg);
      }
    });

    toast.promise(savePromise, {
      pending: "Saving content...",
      success: "Content saved successfully! Changes are now live.",
      error: "Failed to save content. See error details above.",
    });
  }

  static exportToFile(
    content: WebsiteContent,
    filename: string = "content.json"
  ): void {
    const dataStr = JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async importFromFile(file: File): Promise<WebsiteContent | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          resolve(imported as WebsiteContent);
        } catch (err) {
          reject(new Error("Invalid JSON file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }

  static async importWithToast(
    file: File,
    onSuccess?: (content: WebsiteContent) => void
  ): Promise<void> {
    const importPromise = this.importFromFile(file).then((imported) => {
      if (imported) {
        onSuccess?.(imported);
        return imported;
      } else {
        throw new Error("Failed to import file");
      }
    });

    toast.promise(importPromise, {
      pending: "Importing content...",
      success: "Content imported successfully!",
      error: "Failed to import content. Invalid JSON file.",
    });
  }

  static async reset(): Promise<SaveResponse> {
    const backupData = this.getBackupContent();
    return await this.save(backupData);
  }

  static async resetWithToast(onSuccess?: () => void): Promise<void> {
    const resetPromise = this.reset().then((result) => {
      if (result.success) {
        onSuccess?.();
        return result;
      } else {
        throw new Error(result.error || "Failed to reset content");
      }
    });

    toast.promise(resetPromise, {
      pending: "Resetting to default content...",
      success: "Content reset to default successfully!",
      error: "Failed to reset content",
    });
  }

  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
