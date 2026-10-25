import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (prefix && !pathname.startsWith(`${prefix}/`))
        throw new Error("Not found");
      let file = path.resolve(root, `.${pathname.slice(prefix.length)}`);
      if (file !== root && !file.startsWith(`${root}${path.sep}`))
        throw new Error("Not found");
      if ((await fs.stat(file)).isDirectory())
        file = path.join(file, "index.html");
      let body = await fs.readFile(file);
      const ext = path.extname(file);
      res.setHeader("Content-Type", types[ext] ?? "application/octet-stream");
      if (
        /\bgzip\b/.test(req.headers["accept-encoding"] ?? "") &&
        [".html", ".js", ".css", ".json", ".txt", ".xml", ".svg"].includes(ext)
      ) {
        body = gzipSync(body);
        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Vary", "Accept-Encoding");
      }
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(Number(process.env.PORT ?? 3000), "0.0.0.0", () =>
    console.log(
      `Static preview: http://localhost:${process.env.PORT ?? 3000}${prefix}/`,
    ),
  );
