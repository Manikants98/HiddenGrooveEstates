import type { VercelRequest, VercelResponse } from "@vercel/node";

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

    if (!kvUrl || !kvToken) {
      return res.status(500).json({
        success: false,
        error:
          "Vercel KV not configured. Please follow these steps:\n\n1. Go to your Vercel Dashboard\n2. Select your project\n3. Go to the 'Storage' tab\n4. Click 'Create Database' and select 'KV'\n5. Name it and create it\n6. Vercel will automatically link it\n7. Redeploy your application\n\nSee VERCEL_KV_SETUP.md for detailed instructions.",
        requiresSetup: true,
      });
    }

    try {
      const { kv } = await import("@vercel/kv");
      await kv.set("website-content", content);
    } catch (kvError) {
      return res.status(500).json({
        success: false,
        error:
          "Failed to save to Vercel KV. Please ensure Vercel KV is properly configured in your project settings.",
        requiresSetup: true,
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
