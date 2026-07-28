const {
  formatRequestMessage,
  getTelegramToken,
  resolveChatIds,
  telegramApi
} = require("../lib/telegram");

function getBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

module.exports = async function request(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const token = getTelegramToken();
  if (!token) {
    res.status(400).json({
      ok: false,
      error: "Telegram bot token is not configured"
    });
    return;
  }

  try {
    const chatIds = await resolveChatIds(token);
    if (!chatIds.length) {
      res.status(400).json({
        ok: false,
        error: "Telegram chat_id is not configured. Send any message to the bot first or set TELEGRAM_CHAT_ID."
      });
      return;
    }

    const payload = getBody(req);
    const text = formatRequestMessage(payload);
    await Promise.all(chatIds.map((chatId) => telegramApi(token, "sendMessage", {
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })));

    res.status(200).json({ ok: true, recipients: chatIds.length });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
