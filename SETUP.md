# 📋 RawShot Bot - Complete Setup Guide

## Prerequisites

- Node.js 18+ installed
- Telegram account
- GitHub account (recommended)
- Vercel account (free)

## 🔧 Step 1: Get Telegram Bot Token

### Create Bot via BotFather

```
1. Open Telegram
2. Search for @BotFather
3. Send /newbot
4. Enter bot name: RawShot
5. Enter username: rawshot_bot (or unique name)
6. Copy the token provided
```

**Keep this token safe!**

## 📁 Step 2: Setup Local Files

```bash
# Create folder
mkdir rawshot-bot
cd rawshot-bot

# Download/Copy all files here:
# - rawshot-bot.ts
# - package.json
# - tsconfig.json
# - .env.example
# - vercel.json
# - .gitignore
# - README.md
# - QUICKSTART.md
# - SETUP.md
```

## 🔑 Step 3: Create .env File

```bash
cp .env.example .env
```

**Edit `.env` file:**

```
BOT_TOKEN=paste_your_token_here
ADMIN_ID=your_telegram_user_id
```

**Get your User ID:**
- Send any message to @userinfobot
- It will show your ID

## 📦 Step 4: Install Dependencies

```bash
npm install
```

This installs:
- grammy (Telegram bot framework)
- dotenv (environment variables)
- TypeScript tools

## 🧪 Step 5: Test Locally (Optional)

```bash
npm run build
npm run dev
```

**Then on Telegram:**
- Search for your bot
- Send /start
- Try /help and /info
- Forward a message

Stop with: `Ctrl + C`

## 🌐 Step 6: GitHub Setup

### Initialize Git

```bash
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

### Create GitHub Repository

1. Go to github.com
2. Click "New repository"
3. Name: rawshot-bot
4. Make it Public or Private
5. Click "Create repository"

### Push Code

```bash
git add .
git commit -m "Initial commit: RawShot Bot"
git remote add origin https://github.com/YOUR_USERNAME/rawshot-bot.git
git branch -M main
git push -u origin main
```

## 🚀 Step 7: Deploy on Vercel

### Option A: GitHub Integration (Recommended)

1. Go to vercel.com
2. Click "New Project"
3. Click "Import Git Repository"
4. Select your GitHub repository
5. Click "Import"

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 🔑 Step 8: Add Environment Variables

**In Vercel Dashboard:**

1. Project Settings
2. Environment Variables
3. Add Variable:
   - Key: `BOT_TOKEN`
   - Value: `your_bot_token`
4. Add Variable:
   - Key: `ADMIN_ID`
   - Value: `your_user_id`
5. Click "Save"

Vercel will auto-redeploy.

## ✅ Step 9: Verify Deployment

### Check Vercel Status

1. Go to vercel.com
2. Click on your project
3. Check "Deployments" tab
4. Wait for green checkmark ✅

### Test on Telegram

1. Search for @rawshot_bot
2. Send /start
3. Bot should respond! ✅

If not:
- Wait 2-3 minutes
- Check Vercel logs
- Verify environment variables

## 🔄 Step 10: Update Code Later

### Make Changes Locally

```bash
# Edit rawshot-bot.ts (or other files)
# Test locally
npm run build
npm run dev
```

### Push to GitHub

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will auto-deploy! 🎉

## 🐛 Troubleshooting

### Bot not responding?

**Check:**
1. BOT_TOKEN in .env is correct?
2. Vercel deployment successful?
3. Bot is online in Telegram?

**Fix:**
1. Verify token from BotFather
2. Check Vercel logs: https://vercel.com
3. Wait 2-3 minutes for deployment

### Build error?

```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Can't push to GitHub?

```bash
# Verify remote
git remote -v

# If wrong:
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/rawshot-bot.git
git push -u origin main
```

### Environment variables not working?

1. Vercel Dashboard
2. Settings → Environment Variables
3. Check names exactly match code
4. Redeploy

## 📊 File Structure

```
rawshot-bot/
├── rawshot-bot.ts      # Main bot code
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── .env.example        # Template (commit this)
├── .env               # Actual (don't commit!)
├── vercel.json        # Vercel config
├── .gitignore         # Git ignore rules
├── README.md          # Full documentation
├── QUICKSTART.md      # Fast start
├── SETUP.md           # This file
└── dist/              # Compiled code (auto-generated)
```

## ✨ Success Checklist

- [ ] Bot token created
- [ ] .env file setup
- [ ] npm install done
- [ ] Local test passed
- [ ] Code pushed to GitHub
- [ ] Vercel connected
- [ ] Environment variables added
- [ ] Deployment successful (green checkmark)
- [ ] Bot responds on Telegram

## 🎉 Done!

Your bot is now live and ready to use!

```
Bot: @rawshot_bot
Status: Active ✅
Data extraction: Working ✅
Exports: JSON + CSV ✅
```

## 📞 Need Help?

- Check GitHub issues
- Read README.md
- Review logs in Vercel
- Test locally first

**Happy bot building!** 🚀
