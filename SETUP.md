# 🚀 RawShot Bot - Complete Setup Guide

## 📋 Prerequisites

- Node.js 18+ installed
- Telegram Bot Token (already have: `8974371850:AAHL4aj6iNVhL9DhiuwAL6-O8x1jsMAn7kU`)
- Vercel Account (free)
- Git installed

---

## 🔧 Local Setup

### Step 1: Clone/Download Files

```bash
# Create a new directory
mkdir rawshot-bot
cd rawshot-bot

# Copy all files here:
# - rawshot-bot.ts
# - package.json
# - tsconfig.json
# - .env.example
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `grammy` - Telegram bot framework
- `dotenv` - Environment variables
- TypeScript and related tools

### Step 3: Setup Environment Variables

Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

**Your `.env` file should look like:**

```
BOT_TOKEN=8974371850:AAHL4aj6iNVhL9DhiuwAL6-O8x1jsMAn7kU
ADMIN_ID=6924478999
```

### Step 4: Build TypeScript

```bash
npm run build
```

This creates `dist/` folder with compiled JavaScript.

### Step 5: Test Locally (Optional)

```bash
npm run dev
```

The bot will start and you can test it by messaging @rawshot_bot on Telegram.

**To stop:** Press `Ctrl + C`

---

## 🌐 Deploy to Vercel (Recommended)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up (or login)
3. Click "New Project"

### Step 2: Connect GitHub Repository

**Option A: Using GitHub (Recommended)**

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: RawShot Bot"

# Create GitHub repo (on github.com)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/rawshot-bot.git
git branch -M main
git push -u origin main
```

Then on Vercel:
- Click "New Project"
- Select your GitHub repository
- Click "Import"

**Option B: Direct Upload**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Step 3: Configure Vercel

In Vercel Dashboard:

1. Go to Project Settings
2. Click "Environment Variables"
3. Add:
   - Key: `BOT_TOKEN`
   - Value: `8974371850:AAHL4aj6iNVhL9DhiuwAL6-O8x1jsMAn7kU`
4. Add:
   - Key: `ADMIN_ID`
   - Value: `6924478999`
5. Click "Save"

### Step 4: Create Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "rawshot-bot.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### Step 5: Deploy

```bash
vercel deploy --prod
```

Or trigger auto-deploy by pushing to GitHub:

```bash
git push origin main
```

---

## 🤖 Setup Webhook (For Vercel)

After deployment, update your bot's webhook:

```bash
# Replace YOUR_VERCEL_URL with your actual Vercel domain
curl "https://api.telegram.org/bot8974371850:AAHL4aj6iNVhL9DhiuwAL6-O8x1jsMAn7kU/setWebhook?url=https://YOUR_VERCEL_URL/api/webhook"
```

**Example:**
```bash
curl "https://api.telegram.org/bot8974371850:AAHL4aj6iNVhL9DhiuwAL6-O8x1jsMAn7kU/setWebhook?url=https://rawshot-bot.vercel.app/api/webhook"
```

---

## 🧪 Testing the Bot

1. Open Telegram
2. Search for `@rawshot_bot`
3. Click "Start"
4. Try these commands:

```
/start      - Welcome message
/help       - Help information
/info       - Your account info
[forward message] - See extracted data
```

---

## 📊 What the Bot Does

**When you forward a message:**
1. Extracts all user information
2. Extracts chat/group/channel info
3. Extracts message details
4. Analyzes media (photos, videos, documents)
5. Shows reply/forward information
6. Generates JSON data
7. Exports as CSV

**Output includes:**
- User ID, Username, Name
- Chat ID, Chat Type
- Message ID, Timestamp
- Photo dimensions, Video duration, Document size
- Complete JSON response
- CSV export file

---

## 🔄 Updating the Bot

### To modify the code:

1. Edit `rawshot-bot.ts`
2. Build: `npm run build`
3. Test: `npm run dev`
4. Push to GitHub:

```bash
git add .
git commit -m "Update: [your changes]"
git push origin main
```

Vercel will automatically redeploy!

---

## 🐛 Troubleshooting

### Bot not responding

1. Check environment variables in Vercel
2. Verify BOT_TOKEN is correct
3. Check Vercel logs: `vercel logs`

### Build errors

```bash
# Clear cache
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Webhook errors

```bash
# Check webhook status
curl "https://api.telegram.org/bot8974371850:AAHL4aj6iNVhL9DhiuwAL6-O8x1jsMAn7kU/getWebhookInfo"
```

---

## 📝 File Structure

```
rawshot-bot/
├── rawshot-bot.ts       # Main bot code
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── .env                 # Environment variables (create from .env.example)
├── .env.example         # Example variables
├── vercel.json          # Vercel config
├── SETUP.md            # This file
├── dist/               # Compiled JavaScript (auto-generated)
└── node_modules/       # Dependencies (auto-generated)
```

---

## 🚀 Advanced Options

### Option 1: Add to More Chats

The bot works in:
- ✅ Private messages (1-on-1)
- ✅ Groups
- ✅ Supergroups
- ✅ Channels (if bot is admin)

### Option 2: Rate Limiting

Add to the code to limit free usage:

```typescript
const userUsage: Map<number, number> = new Map();
const DAILY_LIMIT = 10;

// Check before processing
if (!userUsage.has(userId)) {
  userUsage.set(userId, 0);
}

const usage = userUsage.get(userId) || 0;
if (usage >= DAILY_LIMIT) {
  await ctx.reply("Daily limit reached");
  return;
}
```

### Option 3: Database Integration

To add database:

```typescript
import { neon } from '@neondatabase/serverless';

const db = neon(process.env.DATABASE_URL);

// Log usage
await db('INSERT INTO logs (user_id, action) VALUES ($1, $2)', [userId, 'extract']);
```

---

## 📞 Support

- Telegram: @rawshot_bot
- Issues: Check the code or Vercel logs
- Performance: Monitor at Vercel Dashboard

---

## 📄 License

MIT License - Free to use and modify!

---

## ✨ Features Summary

| Feature | Status |
|---------|--------|
| User data extraction | ✅ |
| Chat/Group ID extraction | ✅ |
| Media information | ✅ |
| JSON export | ✅ |
| CSV export | ✅ |
| Reply/Forward tracking | ✅ |
| Inline keyboard data | ✅ |
| Message timestamp | ✅ |
| Beautiful formatting | ✅ |
| Vercel deployment | ✅ |

---

**Happy deploying! 🎉**
