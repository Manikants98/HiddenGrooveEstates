import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    try {
      await kv.set("website-content", content);
    } catch (kvError) {
      return res.status(500).json({
        success: false,
        error:
          "Vercel KV not configured. Please set up Vercel KV in your project settings.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Content updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
