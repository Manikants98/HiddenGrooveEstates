import { toast } from "react-toastify";
import type { WebsiteContent } from "../types/content";

/**
 * Deep clone an object using JSON serialization
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Export content to a JSON file
 */
export function exportToFile(
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

/**
 * Import content from a JSON file
 */
export async function importFromFile(
  file: File
): Promise<WebsiteContent | null> {
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

/**
 * Import content from file with toast notifications
 */
export async function importWithToast(
  file: File,
  onSuccess?: (content: WebsiteContent) => void
): Promise<void> {
  const importPromise = importFromFile(file).then((imported) => {
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
