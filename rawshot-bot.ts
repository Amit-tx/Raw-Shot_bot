import { Bot, Context, InputFile } from "grammy";
import { Message } from "grammy/types";

interface ExtractedData {
  user?: any;
  chat?: any;
  message?: any;
  media?: any;
  reply_to_message?: any;
  forward_from?: any;
  forward_from_chat?: any;
  forward_date?: number;
  entities?: any[];
  caption_entities?: any[];
  reply_markup?: any;
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
    this.bot.on("message", (ctx) => this.handleMessage(ctx));
  }

  private async handleStart(ctx: Context) {
    const message = `
🚀 *Welcome to RawShot Bot!*

Extract raw data from Telegram messages instantly!

📋 *Commands:*
/info - Your account info
/help - Help & features

🎯 *How to use:*
1️⃣ Forward any message to me
2️⃣ I'll extract all raw data
3️⃣ Get JSON & CSV exports

📊 *What I extract:*
• User ID, Username, Name
• Chat ID, Group ID, Channel ID
• Message ID, Timestamp
• Photo/Video/Audio/Document info
• Reply & Forward tracking
• Inline keyboard data
• Complete JSON export
• CSV export

🔗 *Deep links & entities*
*Inline keyboards & buttons*

✨ Just forward a message!
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

*How to use:*
Simply forward any message to this bot and I'll:
✅ Extract all user information
✅ Show chat/group details
✅ Analyze message content
✅ Display media information
✅ Track reply chains
✅ Show forwarded message details
✅ Export as JSON
✅ Export as CSV

*Data Extracted:*
🔹 User ID & Username
🔹 Chat ID & Type
🔹 Message ID & Date
🔹 Photo dimensions
🔹 Video duration & resolution
🔹 Audio & Voice info
🔹 Document details
🔹 Reply information
🔹 Forward history
🔹 Complete JSON

🎨 Multiple format outputs!
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

---
Forward any message to extract its data! 📬
    `;

    await ctx.reply(infoText, { parse_mode: "Markdown" });
  }

  private async handleMessage(ctx: Context) {
    try {
      const message = ctx.message;
      if (!message) return;

      const extracted = this.extractData(message);
      await this.sendExtractedData(ctx, extracted);
    } catch (error) {
      console.error("Error:", error);
      await ctx.reply("❌ Error processing message. Please try again.");
    }
  }

  private extractData(message: Message): ExtractedData {
    const data: ExtractedData = {};

    // User Info
    if (message.from) {
      data.user = {
        id: message.from.id,
        is_bot: message.from.is_bot,
        first_name: message.from.first_name,
        last_name: message.from.last_name,
        username: message.from.username,
        language_code: message.from.language_code,
        is_premium: message.from.is_premium,
      };
    }

    // Chat Info
    if (message.chat) {
      data.chat = {
        id: message.chat.id,
        type: message.chat.type,
        title: (message.chat as any).title,
        username: (message.chat as any).username,
        first_name: (message.chat as any).first_name,
        last_name: (message.chat as any).last_name,
      };
    }

    // Message Info
    data.message = {
      message_id: message.message_id,
      date: message.date,
      text: message.text,
      caption: message.caption,
    };

    // Media Info
    data.media = {};

    if (message.photo) {
      data.media.photo = message.photo.map((p) => ({
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
        duration: message.voice.duration,
        mime_type: message.voice.mime_type,
        file_size: message.voice.file_size,
      };
    }

    if (message.audio) {
      data.media.audio = {
        file_id: message.audio.file_id,
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
        file_name: message.document.file_name,
        mime_type: message.document.mime_type,
        file_size: message.document.file_size,
      };
    }

    if (message.animation) {
      data.media.animation = {
        file_id: message.animation.file_id,
        width: message.animation.width,
        height: message.animation.height,
        duration: message.animation.duration,
        file_size: message.animation.file_size,
      };
    }

    // Reply Info
    if (message.reply_to_message) {
      data.reply_to_message = {
        message_id: message.reply_to_message.message_id,
        from: message.reply_to_message.from ? {
          id: message.reply_to_message.from.id,
          first_name: message.reply_to_message.from.first_name,
          username: message.reply_to_message.from.username,
        } : undefined,
        text: message.reply_to_message.text,
      };
    }

    // Forward Info
    if ((message as any).forward_from) {
      data.forward_from = {
        id: (message as any).forward_from.id,
        first_name: (message as any).forward_from.first_name,
        username: (message as any).forward_from.username,
      };
    }

    if ((message as any).forward_from_chat) {
      data.forward_from_chat = {
        id: (message as any).forward_from_chat.id,
        type: (message as any).forward_from_chat.type,
        title: (message as any).forward_from_chat.title,
      };
    }

    data.forward_date = (message as any).forward_date;
    data.entities = message.entities;
    data.caption_entities = message.caption_entities;
    data.reply_markup = message.reply_markup;
    data.update_type = "message";
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
      textOutput += `🔹 Is Premium: ${data.user.is_premium ? "Yes ✨" : "No"}\n\n`;
    }

    if (data.chat) {
      textOutput += "💬 *Chat Info:*\n";
      textOutput += `🔹 ID: \`${data.chat.id}\`\n`;
      textOutput += `🔹 Type: ${data.chat.type}\n`;
      textOutput += `🔹 Title: ${data.chat.title || "N/A"}\n\n`;
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
      }
      if (data.media.video) {
        textOutput += `🎬 Video: ${data.media.video.duration}s\n`;
      }
      if (data.media.voice) {
        textOutput += `🎤 Voice: ${data.media.voice.duration}s\n`;
      }
      if (data.media.audio) {
        textOutput += `🎵 Audio: ${data.media.audio.title || "N/A"}\n`;
      }
      if (data.media.document) {
        textOutput += `📄 Document: ${data.media.document.file_name || "N/A"}\n`;
      }
      textOutput += "\n";
    }

    await ctx.reply(textOutput, { parse_mode: "Markdown" });

    // Part 2: JSON Export
    const jsonOutput = JSON.stringify(data.raw_json || data, null, 2);

    if (jsonOutput.length > 4000) {
      const buffer = Buffer.from(jsonOutput);
      await ctx.replyWithDocument(new InputFile(buffer, "raw_data.json"), {
        caption: "📄 Raw JSON Data",
      });
    } else {
      await ctx.reply(`\`\`\`json\n${jsonOutput}\`\`\``, {
        parse_mode: "Markdown",
      });
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
    const rows: string[] = ["Field,Value"];

    if (data.user) {
      rows.push(`User ID,${data.user.id}`);
      rows.push(`Username,@${data.user.username || "N/A"}`);
      rows.push(`First Name,"${data.user.first_name}"`);
      rows.push(`Is Bot,${data.user.is_bot ? "Yes" : "No"}`);
    }

    if (data.chat) {
      rows.push(`Chat ID,${data.chat.id}`);
      rows.push(`Chat Type,${data.chat.type}`);
    }

    if (data.message) {
      rows.push(
        `Message Date,${new Date(data.message.date * 1000).toISOString()}`
      );
    }

    return rows.join("\n");
  }

  async start() {
    console.log("🚀 RawShot Bot started...");
    await this.bot.start();
  }
}

// Main
const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN environment variable not set");
}

const bot = new RawShotBot(token);
bot.start().catch(console.error);

export default bot;
