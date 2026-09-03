import { Telegraf } from 'telegraf';
import type { Update } from 'telegraf/types';

const BOT_TOKEN = process.env.BOT_TOKEN!;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🚀 Raw Shot Bot Running!\n\nForward any message to extract raw data');
});

bot.help((ctx) => {
  ctx.reply('📖 Features:\n✨ Extract user data\n📨 Extract message IDs\n🎯 Extract chat info');
});

bot.on('message', async (ctx) => {
  try {
    const data = {
      user: {
        id: ctx.from?.id,
        username: ctx.from?.username || 'N/A',
        first_name: ctx.from?.first_name,
        is_bot: ctx.from?.is_bot
      },
      chat: {
        id: ctx.chat?.id,
        type: ctx.chat?.type
      },
      message: {
        id: ctx.message?.message_id,
        text: (ctx.message as any)?.text || 'No text',
        date: ctx.message?.date,
        has_entities: !!(ctx.message as any)?.entities
      },
      timestamp: new Date().toISOString()
    };

    const jsonStr = JSON.stringify(data, null, 2);
    await ctx.replyWithHTML(`<pre>${jsonStr}</pre>`);
  } catch (error) {
    ctx.reply('❌ Error extracting data');
    console.error(error);
  }
});

export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const update: Update = req.body;
      await bot.handleUpdate(update);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ ok: false, error: 'Internal error' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ status: 'Bot is running ✅' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};