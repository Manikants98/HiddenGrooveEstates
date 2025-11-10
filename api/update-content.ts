import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const content = req.body;

    if (!content || typeof content !== "object") {
      return res.status(400).json({
        success: false,
        error: "Invalid content data",
      });
    }

    // In Vercel serverless environment, we can't write to the file system
    // The file update will be handled client-side via download
    // In production, consider using:
    // - Vercel KV for key-value storage
    // - A database (MongoDB, PostgreSQL)
    // - Cloud storage (AWS S3, Google Cloud Storage)
    // - A headless CMS

    return res.status(200).json({
      success: true,
      message: "Content update received successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
