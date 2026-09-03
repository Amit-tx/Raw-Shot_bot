# 🚀 RawShot Bot

**Extract complete raw data from any Telegram message!**

## 📊 What is RawShot?

RawShot is a powerful Telegram bot that extracts and analyzes all raw data from messages.

### ✨ Features:

- **User Information**: ID, username, name, language, premium status
- **Chat Details**: Chat ID, group/channel info
- **Message Data**: Message ID, timestamp, content
- **Media Analysis**: Photo dimensions, video duration, document info
- **Advanced Tracking**: Reply chains, forward history
- **Multiple Exports**: JSON format, CSV download

## 🚀 Quick Start

### 1. Get Bot Token
1. Message `@BotFather` on Telegram
2. Use `/newbot` command
3. Follow the steps
4. Copy your bot token

### 2. Clone/Setup Files
```bash
mkdir rawshot-bot
cd rawshot-bot
# Copy all files here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment
```bash
cp .env.example .env
# Edit .env with your bot token and user ID
```

### 5. Test Locally (Optional)
```bash
npm run build
npm run dev
```

### 6. Deploy to Vercel
1. Push to GitHub
2. Connect Vercel
3. Add environment variables
4. Deploy!

## 📋 Commands

| Command | Description |
|---------|-------------|
| `/start` | Welcome message |
| `/help` | Help & features |
| `/info` | Your account info |
| Forward any message | Extract data |

## 💻 Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Grammy (Telegram Bot)
- **Hosting**: Vercel (Free)
- **No Database**: Pure processing

## 🔐 Security

- ✅ Bot token in `.env` (not in repo)
- ✅ No data storage
- ✅ No tracking
- ✅ Private by default
- ✅ `.gitignore` protects secrets

## 📁 Project Structure

```
rawshot-bot/
├── rawshot-bot.ts       # Main bot code
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── .env.example         # Environment template
├── .env                 # Your actual env (create this)
├── vercel.json          # Vercel config
├── .gitignore          # Git security
├── README.md           # This file
└── dist/               # Compiled code (auto-generated)
```

## 🎯 Data Extracted

### User Information
```
- User ID
- Username
- First & Last Name
- Language Code
- Bot Status
- Premium Status
```

### Chat Information
```
- Chat ID
- Chat Type (private/group/channel)
- Group/Channel Title
- Chat Members
```

### Message Details
```
- Message ID
- Timestamp
- Message Text
- Caption
- Edit Date
```

### Media Information
```
- Photo: dimensions, file size
- Video: duration, resolution, file size
- Audio: duration, title, performer
- Voice: duration, file size
- Document: file name, type, size
- Animation: duration, dimensions
```

### Advanced Data
```
- Reply Information
- Forward History
- Inline Keyboard Data
- Entity Information
- Complete JSON Response
```

## 🧪 Testing

### Local Testing
```bash
npm run dev
# Message @botname on Telegram
```

### Live Testing
1. Search `@rawshot_bot` on Telegram
2. Send `/start`
3. Try `/info` command
4. Forward any message to extract data

## 🔄 Deployment Steps

### GitHub Setup
```bash
git init
git add .
git commit -m "Initial commit: RawShot Bot"
git remote add origin https://github.com/YOUR_USERNAME/rawshot-bot.git
git branch -M main
git push -u origin main
```

### Vercel Setup
1. Go to vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Add Environment Variables:
   - `BOT_TOKEN`: Your bot token
   - `ADMIN_ID`: Your Telegram ID
5. Deploy!

## 🐛 Troubleshooting

### Bot not responding?
- Check BOT_TOKEN in .env
- Verify bot is running in Vercel
- Check Vercel logs

### Build fails?
```bash
npm install
npm run build
```

### Local test error?
- Node version: v18+
- Check environment variables
- Verify BOT_TOKEN format

## 📞 Support

- Issues? Check GitHub repo
- Telegram? Message @rawshot_bot
- Questions? Read documentation

## 📝 License

MIT License - Free to use and modify!

## 🎉 Get Started

```bash
1. npm install
2. cp .env.example .env
3. Add your bot token to .env
4. npm run build
5. vercel --prod
```

**Happy extracting!** 🚀
