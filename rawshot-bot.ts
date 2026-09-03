import { Bot, Context, InputFile } from "grammy";
import { Message, User, Chat, Update } from "grammy/types";
import * as fs from "fs";

// Types
interface ExtractedData {
  user?: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
  };
  chat?: {
    id: number;
    type: string;
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_forum?: boolean;
    photo?: any;
  };
  message?: {
    message_id: number;
    date: number;
    text?: string;
    caption?: string;
    edit_date?: number;
  };
  media?: {
    photo?: Array<{
      file_id: string;
      file_unique_id: string;
      width: number;
      height: number;
      file_size?: number;
    }>;
    video?: {
      file_id: string;
      file_unique_id: string;
      width: number;
      height: number;
      duration: number;
      thumbnail?: any;
      mime_type?: string;
      file_size?: number;
    };
    voice?: {
      file_id: string;
      file_unique_id: string;
      duration: number;
      mime_type?: string;
      file_size?: number;
    };
    audio?: {
      file_id: string;
      file_unique_id: string;
      duration: number;
      performer?: string;
      title?: string;
      mime_type?: string;
      file_size?: number;
    };
    document?: {
      file_id: string;
      file_unique_id: string;
      file_name?: string;
      mime_type?: string;
      file_size?: number;
    };
    animation?: {
      file_id: string;
      file_unique_id: string;
      width: number;
      height: number;
      duration: number;
      thumbnail?: any;
      mime_type?: string;
      file_size?: number;
    };
  };
  reply_to_message?: {
    message_id: number;
    from?: {
      id: number;
      is_bot: boolean;
      first_name: string;
    };
    text?: string;
    caption?: string;
  };
  forward_from?: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username?: string;
  };
  forward_from_chat?: {
    id: number;
    type: string;
    title?: string;
  };
  forward_date?: number;
  reply_markup?: any;
  entities?: Array<{
    type: string;
    offset: number;
    length: number;
    url?: string;
    user?: any;
  }>;
  caption_entities?: Array<{
    type: string;
    offset: number;
    length: number;
  }>;
  update_type?: string;
  raw_json?: any;
}

class RawShotBot {
  bot: Bot;
  adminId = 6924478999;
  
  constructor(token: string) {
    this.bot = new Bot(token);
    this.setupHandlers();
  }

  private setupHandlers() {
    this.bot.command("start", (ctx) => this.handleStart(ctx));
    this.bot.command("help", (ctx) => this.handleHelp(ctx));
    this.bot.command("info", (ctx) => this.handleInfo(ctx));
    this.bot.on("message", (ctx) => this.handleForwardedMessage(ctx));
  }

  private async handleStart(ctx: Context) {
    const message = `
🚀 *Welcome to RawShot Bot!*

I extract raw data from Telegram messages. Here's how to use me:

📋 *Commands:*
/info - Get your account information
/help - Show this help message

🎯 *How to use:*
1. Forward any message to me
2. I'll extract all the raw data from it

📊 *What I extract:*
• User ID, Username, Chat ID
• Message ID, Date, Text
• Media information (photos, videos, documents)
• Reply & Forward information
• Inline keyboard data
• Complete JSON data
• And much more!

🔗 *Deep-link example:*
/start deep-link-data

💡 Just forward a message and see the magic! ✨
    `;

    await ctx.reply(message, { parse_mode: "Markdown" });
  }

  private async handleHelp(ctx: Context) {
    const helpText = `
📖 *RawShot Bot Help*

*Available Commands:*
/start - Welcome message
/help - This help message
/info - Your account info

*Features:*
✨ Extract all data from any message
✨ See media information
✨ View raw JSON
✨ Check forwarded messages
✨ Analyze inline keyboards

*How to use:*
1️⃣ Forward a message to this bot
2️⃣ I'll show you all the extracted data
3️⃣ You can view it in different formats

*Example Data Extracted:*
- User ID & Username
- Chat/Group/Channel ID
- Message ID & Timestamp
- Photo/Video/Audio/Document info
- Reply & Forward history
- Complete JSON response

🎨 *Formatting:*
- Text format (readable)
- JSON format (complete data)
- CSV format (for analysis)

Need help? Just forward a message! 📬
    `;

    await ctx.reply(helpText, { parse_mode: "Markdown" });
  }

  private async handleInfo(ctx: Context) {
    const user = ctx.from;
    const chat = ctx.chat;

    const infoText = `
👤 *Your Account Information*

*User Details:*
🔹 User ID: \`${user?.id}\`
🔹 Username: @${user?.username || "N/A"}
🔹 First Name: ${user?.first_name || "N/A"}
🔹 Last Name: ${user?.last_name || "N/A"}
🔹 Language: ${user?.language_code || "N/A"}
🔹 Is Bot: ${user?.is_bot ? "Yes" : "No"}
🔹 Is Premium: ${user?.is_premium ? "Yes" : "No"}

*Chat Details:*
🔹 Chat ID: \`${chat?.id}\`
🔹 Chat Type: ${chat?.type || "N/A"}
🔹 Title: ${(chat as any)?.title || "N/A"}

*Timestamp:*
🔹 Current Unix: \`${Math.floor(Date.now() / 1000)}\`

---
Forward any message to see its complete extracted data! 📬
    `;

    await ctx.reply(infoText, { parse_mode: "Markdown" });
  }

  private async handleForwardedMessage(ctx: Context) {
    try {
      const message = ctx.message;
      if (!message) return;

      const extracted = this.extractData(message);
      
      // Send in parts to avoid message size limits
      await this.sendExtractedData(ctx, extracted);
    } catch (error) {
      console.error("Error processing message:", error);
      await ctx.reply("❌ Error processing message. Please try again.");
    }
  }

  private extractData(message: Message): ExtractedData {
    const data: ExtractedData = {};

    // Extract User Info
    if (message.from) {
      data.user = {
        id: message.from.id,
        is_bot: message.from.is_bot,
        first_name: message.from.first_name,
        last_name: message.from.last_name,
        username: message.from.username,
        language_code: message.from.language_code,
        is_premium: message.from.is_premium,
        added_to_attachment_menu: message.from.added_to_attachment_menu,
      };
    }

    // Extract Chat Info
    if (message.chat) {
      data.chat = {
        id: message.chat.id,
        type: message.chat.type,
        title: (message.chat as any).title,
        username: (message.chat as any).username,
        first_name: (message.chat as any).first_name,
        last_name: (message.chat as any).last_name,
        is_forum: (message.chat as any).is_forum,
      };
    }

    // Extract Message Info
    data.message = {
      message_id: message.message_id,
      date: message.date,
      text: message.text,
      caption: message.caption,
      edit_date: message.edit_date,
    };

    // Extract Media Info
    data.media = {};

    if (message.photo) {
      data.media.photo = message.photo.map(p => ({
        file_id: p.file_id,
        file_unique_id: p.file_unique_id,
        width: p.width,
        height: p.height,
        file_size: p.file_size,
      }));
    }

    if (message.video) {
      data.media.video = {
        file_id: message.video.file_id,
        file_unique_id: message.video.file_unique_id,
        width: message.video.width,
        height: message.video.height,
        duration: message.video.duration,
        mime_type: message.video.mime_type,
        file_size: message.video.file_size,
      };
    }

    if (message.voice) {
      data.media.voice = {
        file_id: message.voice.file_id,
        file_unique_id: message.voice.file_unique_id,
        duration: message.voice.duration,
        mime_type: message.voice.mime_type,
        file_size: message.voice.file_size,
      };
    }

    if (message.audio) {
      data.media.audio = {
        file_id: message.audio.file_id,
        file_unique_id: message.audio.file_unique_id,
        duration: message.audio.duration,
        performer: message.audio.performer,
        title: message.audio.title,
        mime_type: message.audio.mime_type,
        file_size: message.audio.file_size,
      };
    }

    if (message.document) {
      data.media.document = {
        file_id: message.document.file_id,
        file_unique_id: message.document.file_unique_id,
        file_name: message.document.file_name,
        mime_type: message.document.mime_type,
        file_size: message.document.file_size,
      };
    }

    if (message.animation) {
      data.media.animation = {
        file_id: message.animation.file_id,
        file_unique_id: message.animation.file_unique_id,
        width: message.animation.width,
        height: message.animation.height,
        duration: message.animation.duration,
        mime_type: message.animation.mime_type,
        file_size: message.animation.file_size,
      };
    }

    // Extract Reply Info
    if (message.reply_to_message) {
      data.reply_to_message = {
        message_id: message.reply_to_message.message_id,
        from: message.reply_to_message.from ? {
          id: message.reply_to_message.from.id,
          is_bot: message.reply_to_message.from.is_bot,
          first_name: message.reply_to_message.from.first_name,
        } : undefined,
        text: message.reply_to_message.text,
        caption: message.reply_to_message.caption,
      };
    }

    // Extract Forward Info
    if (message.forward_from) {
      data.forward_from = {
        id: message.forward_from.id,
        is_bot: message.forward_from.is_bot,
        first_name: message.forward_from.first_name,
        username: message.forward_from.username,
      };
    }

    if (message.forward_from_chat) {
      data.forward_from_chat = {
        id: message.forward_from_chat.id,
        type: message.forward_from_chat.type,
        title: (message.forward_from_chat as any).title,
      };
    }

    if (message.forward_date) {
      data.forward_date = message.forward_date;
    }

    // Extract Entities
    if (message.entities) {
      data.entities = message.entities.map(e => ({
        type: e.type,
        offset: e.offset,
        length: e.length,
        url: (e as any).url,
        user: (e as any).user,
      }));
    }

    if (message.caption_entities) {
      data.caption_entities = message.caption_entities.map(e => ({
        type: e.type,
        offset: e.offset,
        length: e.length,
      }));
    }

    // Extract Inline Keyboard
    if (message.reply_markup) {
      data.reply_markup = message.reply_markup;
    }

    // Set update type
    data.update_type = "message";

    // Store raw JSON
    data.raw_json = message;

    return data;
  }

  private async sendExtractedData(ctx: Context, data: ExtractedData) {
    // Part 1: Formatted Text
    let textOutput = "📊 *Extracted Data*\n\n";

    if (data.user) {
      textOutput += "👤 *User Info:*\n";
      textOutput += `🔹 ID: \`${data.user.id}\`\n`;
      textOutput += `🔹 Username: @${data.user.username || "N/A"}\n`;
      textOutput += `🔹 Name: ${data.user.first_name} ${data.user.last_name || ""}\n`;
      textOutput += `🔹 Is Bot: ${data.user.is_bot ? "Yes ✅" : "No ❌"}\n`;
      textOutput += `🔹 Is Premium: ${data.user.is_premium ? "Yes ✨" : "No"}\n`;
      textOutput += `🔹 Language: ${data.user.language_code || "N/A"}\n\n`;
    }

    if (data.chat) {
      textOutput += "💬 *Chat Info:*\n";
      textOutput += `🔹 ID: \`${data.chat.id}\`\n`;
      textOutput += `🔹 Type: ${data.chat.type}\n`;
      textOutput += `🔹 Title: ${data.chat.title || "N/A"}\n`;
      textOutput += `🔹 Username: @${data.chat.username || "N/A"}\n\n`;
    }

    if (data.message) {
      textOutput += "📨 *Message Info:*\n";
      textOutput += `🔹 Message ID: \`${data.message.message_id}\`\n`;
      textOutput += `🔹 Timestamp: \`${data.message.date}\`\n`;
      textOutput += `🔹 Date: ${new Date(data.message.date * 1000).toISOString()}\n\n`;
    }

    if (data.media && Object.keys(data.media).length > 0) {
      textOutput += "🎥 *Media Info:*\n";
      
      if (data.media.photo) {
        textOutput += `📸 Photos: ${data.media.photo.length}\n`;
        data.media.photo.forEach((p, i) => {
          textOutput += `   Photo ${i + 1}: ${p.width}x${p.height}px\n`;
        });
      }

      if (data.media.video) {
        textOutput += `🎬 Video: ${data.media.video.duration}s, ${data.media.video.width}x${data.media.video.height}px\n`;
      }

      if (data.media.voice) {
        textOutput += `🎤 Voice: ${data.media.voice.duration}s\n`;
      }

      if (data.media.audio) {
        textOutput += `🎵 Audio: ${data.media.audio.title || "N/A"} - ${data.media.audio.duration}s\n`;
      }

      if (data.media.document) {
        textOutput += `📄 Document: ${data.media.document.file_name || "N/A"}\n`;
      }

      textOutput += "\n";
    }

    if (data.reply_to_message) {
      textOutput += "↩️ *Reply To:*\n";
      textOutput += `🔹 Message ID: ${data.reply_to_message.message_id}\n`;
      textOutput += `🔹 From: ${data.reply_to_message.from?.first_name || "N/A"}\n\n`;
    }

    if (data.forward_from) {
      textOutput += "↪️ *Forwarded From:*\n";
      textOutput += `🔹 User: ${data.forward_from.first_name}\n`;
      textOutput += `🔹 Username: @${data.forward_from.username || "N/A"}\n\n`;
    }

    await ctx.reply(textOutput, { parse_mode: "Markdown" });

    // Part 2: JSON Data
    const jsonOutput = JSON.stringify(data.raw_json || data, null, 2);
    
    // Send as document if too large
    if (jsonOutput.length > 4000) {
      const buffer = Buffer.from(jsonOutput);
      await ctx.replyWithDocument(new InputFile(buffer, "raw_data.json"), {
        caption: "📄 Raw JSON Data",
      });
    } else {
      await ctx.reply(
        `\`\`\`json\n${jsonOutput}\`\`\``,
        { parse_mode: "Markdown" }
      );
    }

    // Part 3: CSV Export
    const csvOutput = this.generateCSV(data);
    if (csvOutput) {
      const buffer = Buffer.from(csvOutput);
      await ctx.replyWithDocument(new InputFile(buffer, "data.csv"), {
        caption: "📊 CSV Export",
      });
    }
  }

  private generateCSV(data: ExtractedData): string {
    const rows: string[] = [];
    
    rows.push("Field,Value");
    
    if (data.user) {
      rows.push(`User ID,${data.user.id}`);
      rows.push(`Username,@${data.user.username || "N/A"}`);
      rows.push(`First Name,"${data.user.first_name}"`);
      rows.push(`Last Name,"${data.user.last_name || "N/A"}"`);
      rows.push(`Is Bot,${data.user.is_bot ? "Yes" : "No"}`);
      rows.push(`Is Premium,${data.user.is_premium ? "Yes" : "No"}`);
    }
    
    if (data.chat) {
      rows.push(`Chat ID,${data.chat.id}`);
      rows.push(`Chat Type,${data.chat.type}`);
      rows.push(`Chat Title,"${data.chat.title || "N/A"}"`);
    }
    
    if (data.message) {
      rows.push(`Message ID,${data.message.message_id}`);
      rows.push(`Message Date,${new Date(data.message.date * 1000).toISOString()}`);
    }
    
    return rows.join("\n");
  }

  async start() {
    console.log("🚀 RawShot Bot started...");
    await this.bot.start();
  }
}

// Main execution
const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN not set in environment variables");
}

const rawshot = new RawShotBot(token);
rawshot.start().catch(console.error);

export default rawshot;