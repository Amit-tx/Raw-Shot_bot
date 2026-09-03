# 🚀 RawShot Bot

**Extract complete raw data from any Telegram message!**

---

## 📊 What is RawShot?

RawShot is a powerful Telegram bot that extracts and analyzes all raw data from messages, including:

✨ **User Information**
- User ID
- Username
- Full Name
- Language Code
- Bot/Premium Status

💬 **Chat Information**
- Chat ID
- Group/Channel ID
- Chat Type
- Chat Title

📨 **Message Details**
- Message ID
- Timestamp & Date
- Message Text
- Caption

🎥 **Media Information**
- Photo dimensions
- Video duration & resolution
- Audio/Voice duration
- Document name & size
- Animation details

📍 **Advanced Features**
- Reply/Forward tracking
- Inline keyboard data
- Deep-link parameters
- Entity information
- Complete JSON export
- CSV export

---

## 🎯 Use Cases

```
1. 🔍 Data Analysis
   - Analyze Telegram message structure
   - Extract metadata for research

2. 👨‍💻 Development
   - Test Telegram Bot API integration
   - Debug bot interactions
   - Learn API responses

3. 📊 Research & Analytics
   - Study message patterns
   - Analyze group dynamics
   - User behavior research

4. 🔐 Security
   - Identify bot behavior
   - Detect suspicious patterns
   - Analyze forwarding chains

5. 📱 Content Management
   - Extract media metadata
   - Batch analyze messages
   - Audit media information
```

---

## 💻 Tech Stack

```
Frontend: Telegram Bot (Grammy Framework)
Runtime: Node.js 18+
Language: TypeScript
Hosting: Vercel (Free)
Framework: Grammy v1.24+
```

---

## 🚀 Quick Start

### 1️⃣ **Local Development**

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run locally
npm run dev
```

### 2️⃣ **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3️⃣ **Start Using**

- Open Telegram
- Search `@rawshot_bot`
- Send `/start`
- Forward any message to extract data!

---

## 📋 Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/start` | Welcome message | `/start` |
| `/help` | Help & features | `/help` |
| `/info` | Your account info | `/info` |
| Forward message | Extract data | Forward any message |

---

## 📸 Example Usage

### Input
Forward any Telegram message to @rawshot_bot

### Output

The bot will send you:

1. **Formatted Text Message** - Readable summary
```
📊 Extracted Data

👤 User Info:
🔹 ID: `6924478999`
🔹 Username: @Amit_yadav_tx
🔹 Name: Amit Yadav
🔹 Is Bot: No ❌
🔹 Is Premium: No

💬 Chat Info:
🔹 ID: `6924478999`
🔹 Type: private

📨 Message Info:
🔹 Message ID: `5459162`
🔹 Timestamp: `1725274800`
```

2. **Raw JSON** - Complete API response
```json
{
  "user": {
    "id": 6924478999,
    "is_bot": false,
    "first_name": "Amit",
    "username": "Amit_yadav_tx",
    "language_code": "en"
  },
  ...
}
```

3. **CSV File** - Data export
```
Field,Value
User ID,6924478999
Username,@Amit_yadav_tx
First Name,Amit
...
```

---

## 🔧 Configuration

Create `.env` file:

```env
BOT_TOKEN=your_bot_token_here
ADMIN_ID=your_user_id_here
```

Get these values:
- **BOT_TOKEN**: From @BotFather on Telegram
- **ADMIN_ID**: Use `/id` in any bot chat

---

## 📁 Project Structure

```
rawshot-bot/
├── rawshot-bot.ts          # Main bot code
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vercel.json             # Vercel config
├── .env.example            # Example env file
├── .env                    # Actual env (gitignored)
├── SETUP.md               # Detailed setup guide
├── README.md              # This file
├── dist/                  # Compiled JavaScript
└── node_modules/          # Dependencies
```

---

## 🔐 Privacy & Security

✅ **What the bot does:**
- Reads messages you forward
- Extracts metadata
- Shows you the data

✅ **What the bot doesn't do:**
- Store any data (unless you add database)
- Access private chats without forwarding
- Track users
- Share data with anyone

---

## 🌟 Features Breakdown

### Level 1: Basic Extraction
- User ID extraction
- Chat ID extraction
- Message ID extraction
- Simple formatting

### Level 2: Media Analysis
- Photo dimensions
- Video metadata
- Document information
- Audio duration

### Level 3: Advanced Analysis
- Reply chain tracking
- Forward history
- Entity detection
- Keyboard button data

### Level 4: Data Export
- JSON export
- CSV export
- Formatted text
- Complete API response

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Auto-deploy on push

### Other Platforms

```bash
# Build
npm run build

# Output directory: dist/
```

Works on:
- ✅ Vercel
- ✅ Heroku
- ✅ Railway
- ✅ Replit
- ✅ AWS Lambda
- ✅ Local server

---

## 📊 Data Extracted

### Complete List

```javascript
{
  // User
  userId,
  username,
  firstName,
  lastName,
  languageCode,
  isBot,
  isPremium,
  
  // Chat
  chatId,
  chatType,
  chatTitle,
  
  // Message
  messageId,
  timestamp,
  date,
  text,
  caption,
  
  // Media
  photos[],
  video { duration, resolution },
  voice { duration },
  audio { title, duration },
  document { name, size },
  
  // Relations
  replyTo { messageId, userId },
  forwardFrom { userId, username },
  forwardDate,
  
  // Extras
  entities[],
  buttons[],
  rawJSON
}
```

---

## 🤝 Contributing

Want to improve? Fork or modify:

```bash
# Clone
git clone https://github.com/amit/rawshot-bot.git

# Modify code
# Build & test
npm run build
npm run dev

# Push changes
git push origin main
```

---

## 📝 License

MIT License - Free to use, modify, and distribute!

---

## 🎯 Roadmap

- [x] Basic data extraction
- [x] Media information
- [x] JSON export
- [x] CSV export
- [ ] Database integration (optional)
- [ ] Analytics dashboard
- [ ] Batch processing
- [ ] API access

---

## 💡 Tips & Tricks

### Extract from Groups
1. Add bot to group
2. Forward message to bot
3. See complete data

### Track Message Chains
Forward a reply to see:
- Original message ID
- Reply chain
- All participants

### Analyze Media
Forward media message to see:
- Exact dimensions
- File size
- MIME type
- Duration (for video/audio)

### Export Data
Bot automatically sends:
- JSON file (if large)
- CSV file (for spreadsheets)
- Formatted text (readable)

---

## ❓ FAQ

**Q: Is the bot free?**
A: Yes, completely free! No ads, no payments.

**Q: Does it store my data?**
A: No data is stored unless you add a database. Messages are processed and forgotten.

**Q: Can it read private chats?**
A: No, you must forward the message manually.

**Q: Works with channels?**
A: Yes, if bot is admin in channel.

**Q: Can I host it myself?**
A: Yes, works on any Node.js server.

---

## 🐛 Troubleshooting

**Bot not responding?**
- Check BOT_TOKEN in .env
- Verify bot is started
- Check Vercel logs

**Build errors?**
```bash
npm run build  # Rebuild
npx tsc --noEmit  # Check errors
```

**Webhook issues?**
```bash
curl "https://api.telegram.org/bot{TOKEN}/getWebhookInfo"
```

---

## 📞 Support

- **Questions?** Open an issue on GitHub
- **Bug reports?** Describe with example
- **Feature requests?** Tell us your use case

---

## 🎉 Get Started Now!

```bash
# 1. Clone this repo
git clone <repo-url>

# 2. Install
npm install

# 3. Configure
cp .env.example .env
# Edit .env with your token

# 4. Run
npm run dev

# 5. Deploy
vercel --prod
```

---

**Made with ❤️ by Amit Yadav**

🚀 **Happy extracting!**
