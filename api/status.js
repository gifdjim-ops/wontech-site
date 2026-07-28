const { getTelegramToken, resolveChatIds } = require("../lib/telegram");

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
    const chatIds = await resolveChatIds(token);
    res.status(200).json({
      ok: true,
      telegramConfigured: true,
      telegramReady: Boolean(chatIds.length),
      chatId: chatIds.length ? "configured" : "",
      recipients: chatIds.length
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
