function getTelegramToken() {
  const token = process.env.TELEGRAM_BOT_TOKEN || "";
  return token.includes("PASTE_") ? "" : token.trim();
}

function parseChatIds(value) {
  return String(value || "")
    .split(/[,\s;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function telegramApi(token, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {})
  });

  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.description || "Telegram API error");
  }
  return data.result;
}

async function resolveChatIds(token) {
  const configured = parseChatIds(process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID);
  if (configured.length) return [...new Set(configured)];

  const updates = await telegramApi(token, "getUpdates", { limit: 50, timeout: 0 });
  const ids = [];
  for (const update of updates) {
    const id = update.message?.chat?.id || update.channel_post?.chat?.id;
    if (id) ids.push(String(id));
  }
  return [...new Set(ids)];
}

async function resolveChatId(token) {
  const ids = await resolveChatIds(token);
  return ids[0] || "";
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

module.exports = {
  formatRequestMessage,
  getTelegramToken,
  resolveChatId,
  resolveChatIds,
  telegramApi
};
