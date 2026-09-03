const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN || '8974371850:AAFyl2nBajmoaQ2pXJvKztutcSdR_P3AdWU';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🚀 Bot Ready!');
});

bot.on('message', async (ctx) => {
  try {
    const data = JSON.stringify({
      user_id: ctx.from.id,
      username: ctx.from.username || 'N/A',
      message_id: ctx.message.message_id,
      text: ctx.message.text || 'No text'
    }, null, 2);

    await ctx.replyWithHTML(`<pre>${data}</pre>`);
  } catch (error) {
    await ctx.reply('Error');
  }
});

module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(200).json({ ok: true });
  }
};