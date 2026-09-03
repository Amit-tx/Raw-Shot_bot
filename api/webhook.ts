import { Telegraf } from 'telegraf';
import type { Update } from 'telegraf/types';

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is required');
}

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🚀 Bot Running!');
});

bot.on('message', async (ctx) => {
  ctx.reply('📊 Data received');
});

export default async (req: any, res: any) => {
  try {
    await bot.handleUpdate(req.body as Update);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal error' });
  }
};