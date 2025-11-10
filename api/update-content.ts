import type { VercelRequest, VercelResponse } from "@vercel/node";

const STORAGE_KEY = "website-content";

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

    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (kvUrl && kvToken) {
      try {
        const { kv } = await import("@vercel/kv");
        await kv.set(STORAGE_KEY, content);
        return res.status(200).json({
          success: true,
          message: "Content updated successfully",
        });
      } catch (kvError) {
        console.error("Vercel KV error:", kvError);
      }
    }

    const jsonbinApiKey = process.env.JSONBIN_API_KEY;
    const jsonbinBinId = process.env.JSONBIN_BIN_ID;

    if (jsonbinApiKey && jsonbinBinId) {
      try {
        const response = await fetch(
          `https://api.jsonbin.io/v3/b/${jsonbinBinId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": jsonbinApiKey,
            },
            body: JSON.stringify(content),
          }
        );

        if (response.ok) {
          return res.status(200).json({
            success: true,
            message: "Content updated successfully",
          });
        }
      } catch (jsonbinError) {
        console.error("JSONBin error:", jsonbinError);
      }
    }

    return res.status(500).json({
      success: false,
      error:
        "No storage configured. Please set up either:\n\n1. Vercel KV (recommended):\n   - Go to Vercel Dashboard → Storage → Create KV Database\n\n2. OR JSONBin.io (free alternative):\n   - Sign up at https://jsonbin.io\n   - Create a bin and get API key\n   - Add JSONBIN_API_KEY and JSONBIN_BIN_ID to Vercel environment variables",
      requiresSetup: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
