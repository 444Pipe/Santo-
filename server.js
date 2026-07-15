/* ═══════════════════════════════════════════════════
   SANTO — Servidor estático para producción (Railway)
   Sin dependencias: solo módulos nativos de Node.
   Soporta rangos de bytes (necesario para que los
   videos funcionen en iOS/Safari).
   ═══════════════════════════════════════════════════ */

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

// Cache: los assets pesados (video/imagen) se cachean 1 día;
// html, css y js nunca, para que cada deploy se vea al instante.
function cacheControl(ext) {
  if ([".mp4", ".webm", ".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(ext))
    return "public, max-age=86400";
  return "no-cache";
}

function send(req, res, filePath, stats) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": cacheControl(ext),
    "Accept-Ranges": "bytes",
    "X-Content-Type-Options": "nosniff",
  };

  // Soporte de peticiones parciales (Range) para streaming de video
  const range = req.headers.range;
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match && (match[1] || match[2])) {
      let start, end;
      if (match[1] === "") {
        // Sufijo: "bytes=-500" → últimos 500 bytes
        const suffix = parseInt(match[2], 10);
        start = Math.max(0, stats.size - suffix);
        end = stats.size - 1;
      } else {
        start = parseInt(match[1], 10);
        end = match[2] ? parseInt(match[2], 10) : stats.size - 1;
      }
      if (start > end || start >= stats.size) {
        res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        return res.end();
      }
      end = Math.min(end, stats.size - 1);
      res.writeHead(206, {
        ...headers,
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Content-Length": end - start + 1,
      });
      if (req.method === "HEAD") return res.end();
      return fs.createReadStream(filePath, { start, end }).pipe(res);
    }
  }

  res.writeHead(200, { ...headers, "Content-Length": stats.size });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end("Método no permitido");
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400);
    return res.end("Petición inválida");
  }

  if (urlPath === "/") urlPath = "/index.html";

  // Evitar salirse de la carpeta del proyecto (path traversal)
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    return res.end("Prohibido");
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) return send(req, res, filePath, stats);

    // Ruta desconocida → volver a la página principal
    const index = path.join(ROOT, "index.html");
    fs.stat(index, (err2, stats2) => {
      if (err2) {
        res.writeHead(404);
        return res.end("No encontrado");
      }
      send(req, res, index, stats2);
    });
  });
});

server.listen(PORT, () => {
  console.log(`SANTO Hamburguesas & Bistró — sirviendo en el puerto ${PORT}`);
});
