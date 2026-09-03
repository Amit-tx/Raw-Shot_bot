
import { Telegraf } from 'telegraf';
import type { Update } from 'telegraf/types';

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('BOT_TOKEN not found');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// Start command
bot.start((ctx) => {
  ctx.reply('🚀 Raw Shot Bot is running!\n\nForward any message to extract raw data');
});

// Help command
bot.help((ctx) => {
  ctx.reply('📖 Available commands:\n/start - Start bot\n/help - Show this message');
});

// Message handler
bot.on('message', async (ctx) => {
  try {
    const rawData = {
      update_id: ctx.update.update_id,
      message: {
        message_id: ctx.message?.message_id,
        date: ctx.message?.date,
        text: (ctx.message as any)?.text || null,
      },
      from: {
        id: ctx.from?.id,
        is_bot: ctx.from?.is_bot,
        first_name: ctx.from?.first_name,
        username: ctx.from?.username,
        language_code: ctx.from?.language_code,
      },
      chat: {
        id: ctx.chat?.id,
        type: ctx.chat?.type,
        title: (ctx.chat as any)?.title || null,
      },
    };

    await ctx.replyWithHTML(
      `<pre>${JSON.stringify(rawData, null, 2)}</pre>`,
      { reply_to_message_id: ctx.message?.message_id }
    );
  } catch (error) {
    console.error('Error:', error);
    await ctx.reply('❌ Error processing message');
  }
});

// Webhook handler
export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const update: Update = req.body;
      if (update) {
        await bot.handleUpdate(update);
      }
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(200).json({ ok: true }); // Always return 200
    }
  } else {
    res.status(200).json({ status: 'webhook is ready' });
  }
};