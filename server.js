const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const rootDir = __dirname;
const port = Number(process.env.PORT || 8787);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon"
};

function readLocalConfig() {
  const configPath = path.join(rootDir, "telegram.local.json");
  if (!fs.existsSync(configPath)) return {};

  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    console.error(`Cannot read telegram.local.json: ${error.message}`);
    return {};
  }
}

const config = readLocalConfig();
const rawTelegramBotToken = process.env.TELEGRAM_BOT_TOKEN || config.telegramBotToken || "";
const telegramBotToken = rawTelegramBotToken.includes("PASTE_") ? "" : rawTelegramBotToken;
let telegramChatId = process.env.TELEGRAM_CHAT_ID || config.telegramChatId || "";

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function telegramApi(method, payload) {
  if (!telegramBotToken) {
    return Promise.reject(new Error("Telegram bot token is not configured"));
  }

  const body = JSON.stringify(payload || {});
  const options = {
    hostname: "api.telegram.org",
    path: `/bot${telegramBotToken}/${method}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body)
    }
  };

  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (!parsed.ok) {
            reject(new Error(parsed.description || "Telegram API error"));
            return;
          }
          resolve(parsed.result);
        } catch (error) {
          reject(new Error(`Telegram response parse error: ${error.message}`));
        }
      });
    });

    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

async function resolveChatId() {
  if (telegramChatId) return telegramChatId;
  if (!telegramBotToken) return "";

  const updates = await telegramApi("getUpdates", { limit: 20, timeout: 0 });
  const lastMessage = [...updates].reverse().find((update) => update.message?.chat?.id);
  if (!lastMessage) return "";

  telegramChatId = String(lastMessage.message.chat.id);
  return telegramChatId;
}

function formatRequestMessage(payload) {
  const fields = payload.fields || {};
  const items = Array.isArray(payload.items) ? payload.items : [];
  const lines = [
    "[WONTECH] Новая заявка на расчет",
    "",
    `Имя: ${fields.name || "-"}`,
    `Компания: ${fields.company || "-"}`,
    `Контакт: ${fields.contact || "-"}`,
    `Регион доставки: ${fields.region || "-"}`,
    ""
  ];

  if (items.length) {
    lines.push("Позиции из каталога:");
    items.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.title || "-"}`);
      lines.push(`   Категория: ${item.label || "-"}`);
      lines.push(`   Система: ${item.system || "-"}`);
      lines.push(`   Позиции: ${item.positions || "-"}`);
    });
    lines.push("");
  } else {
    lines.push("Позиции из каталога: не выбраны");
    lines.push("");
  }

  if (fields.specification) {
    lines.push("Спецификация:");
    lines.push(fields.specification);
    lines.push("");
  }

  lines.push(`Комментарий: ${fields.comment || "-"}`);
  lines.push(`Страница: ${payload.source || "-"}`);

  return lines.join("\n");
}

async function handleStatus(req, res) {
  try {
    const chatId = await resolveChatId();
    sendJson(res, 200, {
      ok: true,
      telegramConfigured: Boolean(telegramBotToken),
      telegramReady: Boolean(telegramBotToken && chatId),
      chatId: chatId ? "configured" : ""
    });
  } catch (error) {
    sendJson(res, 200, {
      ok: true,
      telegramConfigured: Boolean(telegramBotToken),
      telegramReady: false,
      error: error.message
    });
  }
}

async function handleRequest(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    const payload = JSON.parse(rawBody || "{}");
    const chatId = await resolveChatId();

    if (!chatId) {
      sendJson(res, 400, {
        ok: false,
        error: "Telegram chat_id is not configured. Send any message to the bot first."
      });
      return;
    }

    await telegramApi("sendMessage", {
      chat_id: chatId,
      text: formatRequestMessage(payload),
      disable_web_page_preview: true
    });

    sendJson(res, 200, { ok: true });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message });
  }
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === "/") pathname = "/index.html";
  if (pathname.endsWith("/")) pathname += "index.html";

  const filePath = path.normalize(path.join(rootDir, pathname));
  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url.startsWith("/api/status")) {
    handleStatus(req, res);
    return;
  }

  if (req.method === "POST" && req.url.startsWith("/api/request")) {
    handleRequest(req, res);
    return;
  }

  if (req.method !== "GET") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }

  serveStatic(req, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`WONTECH site: http://127.0.0.1:${port}`);
  console.log(telegramBotToken ? "Telegram token: configured" : "Telegram token: missing");
});
