import { axiosInstance } from "./axiosInstance";
import type { WebsiteContent } from "../types/content";
import { toast } from "react-toastify";

// Response types
export interface UpdateDataResponse {
  status: string;
  message: string;
  data: WebsiteContent;
}

export interface UploadImageResponse {
  status: string;
  message: string;
  url: string;
}

/**
 * Get website content from the server
 * @returns {Promise<WebsiteContent>}
 */
export const getData = async (): Promise<WebsiteContent> => {
  try {
    const response = await axiosInstance.get<any>("/getData.php");

    if (response.data?.data) {
      return response.data.data as WebsiteContent;
    }

    return response.data as WebsiteContent;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/**
 * Update website content on the server
 * @param {WebsiteContent} data - The website content to update
 * @returns {Promise<UpdateDataResponse>}
 */
export const updateData = async (
  data: WebsiteContent
): Promise<UpdateDataResponse> => {
  try {
    const response = await axiosInstance.post<UpdateDataResponse>(
      "/update_json.php",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

/**
 * Upload an image file to the server
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string>} Returns the uploaded image URL
 */
export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const uploadPromise = axiosInstance
    .post<UploadImageResponse>("/upload_image.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.data.status === "success" && response.data.url) {
        return response.data.url;
      } else {
        throw new Error(response.data.message || "Image upload failed");
      }
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      throw error;
    });

  toast.promise(uploadPromise, {
    pending: "Uploading image...",
    success: "Image uploaded successfully!",
    error: "Failed to upload image. Please try again.",
  });

  return uploadPromise;
};

/**
 * Upload multiple images and return their URLs
 * @param {File[]} imageFiles - Array of image files to upload
 * @returns {Promise<string[]>} Returns array of uploaded image URLs
 */
export const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
  const uploadPromises = imageFiles.map((file) => uploadImage(file));

  const imagesPromise = Promise.all(uploadPromises)
    .then((urls) => {
      return urls;
    })
    .catch((error) => {
      console.error("Error uploading images:", error);
      throw error;
    });

  toast.promise(imagesPromise, {
    pending: `Uploading ${imageFiles.length} image(s)...`,
    success: `Successfully uploaded ${imageFiles.length} image(s)!`,
    error: "Failed to upload images. Please try again.",
  });

  return imagesPromise;
};
