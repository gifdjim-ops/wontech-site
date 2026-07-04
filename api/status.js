const { getTelegramToken, resolveChatId } = require("../lib/telegram");

module.exports = async function status(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const token = getTelegramToken();
  if (!token) {
    res.status(200).json({
      ok: true,
      telegramConfigured: false,
      telegramReady: false,
      chatId: ""
    });
    return;
  }

  try {
    const chatId = await resolveChatId(token);
    res.status(200).json({
      ok: true,
      telegramConfigured: true,
      telegramReady: Boolean(chatId),
      chatId: chatId ? "configured" : ""
    });
  } catch (error) {
    res.status(200).json({
      ok: true,
      telegramConfigured: true,
      telegramReady: false,
      error: error.message
    });
  }
};
