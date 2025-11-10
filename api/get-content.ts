import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (kvUrl && kvToken) {
      try {
        const { kv } = await import("@vercel/kv");
        const storedContent = await kv.get("website-content");
        if (storedContent) {
          return res.status(200).json(storedContent);
        }
      } catch (kvError) {
        console.warn("Vercel KV error, using default content:", kvError);
      }
    }

    const defaultContentPath = path.join(
      process.cwd(),
      "src/data/content.json"
    );
    let defaultContent;
    try {
      const fileContent = fs.readFileSync(defaultContentPath, "utf8");
      defaultContent = JSON.parse(fileContent);
    } catch {
      defaultContent = {};
    }

    return res.status(200).json(defaultContent);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
