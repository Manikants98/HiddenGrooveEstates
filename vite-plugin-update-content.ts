import type { Plugin } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function updateContentPlugin(): Plugin {
  return {
    name: "update-content",
    configureServer(server) {
      const contentPath = path.resolve(__dirname, "public/data/content.json");

      server.middlewares.use("/api/get-content", (req, res, next) => {
        if (req.method === "GET") {
          try {
            if (fs.existsSync(contentPath)) {
              const content = fs.readFileSync(contentPath, "utf8");
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(content);
            } else {
              res.writeHead(404, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: false,
                  error: "No content found",
                })
              );
            }
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
              })
            );
          }
        } else {
          next();
        }
      });

      server.middlewares.use("/api/update-content", (req, res, next) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const content = JSON.parse(body);
              fs.writeFileSync(
                contentPath,
                JSON.stringify(content, null, 2),
                "utf8"
              );
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: true,
                  message: "Content updated successfully",
                })
              );
            } catch (error) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  success: false,
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                })
              );
            }
          });
        } else {
          next();
        }
      });
    },
  };
}
