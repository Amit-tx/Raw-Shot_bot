# ⚡ RawShot Bot - Quick Start (5 Minutes)

**सबसे तेज़ तरीका bot को चलाने का!**

---

## 🚀 Super Quick Setup

### Step 1: Setup Files (30 seconds)
```bash
# Create folder
mkdir rawshot-bot
cd rawshot-bot

# Put these files in the folder:
# - rawshot-bot.ts
# - package.json
# - tsconfig.json
# - .env.example
# - README.md
# - SETUP.md
```

### Step 2: Install (1 minute)
```bash
npm install
```

### Step 3: Configure (.env file)
Create `.env` file:
```
BOT_TOKEN=8974371850:AAHL4aj6iNVhL9DhiuwAL6-O8x1jsMAn7kU
ADMIN_ID=6924478999
```

### Step 4: Build (30 seconds)
```bash
npm run build
```

### Step 5: Test Locally (Optional, 1 minute)
```bash
npm run dev
```

Then message `@rawshot_bot` on Telegram!

---

## 🌐 Deploy to Vercel (3 Minutes)

### Option A: Using GitHub (Easiest)

```bash
# Initialize git
git init
git add .
git commit -m "RawShot Bot"

# Create repo on GitHub.com
# Then:
git remote add origin https://github.com/YOUR_USERNAME/rawshot-bot.git
git branch -M main
git push -u origin main
```

Then:
1. Go to https://vercel.com
2. Click "New Project"
3. Select GitHub repository
4. Click "Import"
5. Add environment variables
6. Done! 🎉

### Option B: Direct Vercel Deploy

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## ✅ That's it!

Your bot is now **live and ready to use!**

```
Search for @rawshot_bot on Telegram
Forward any message
See the magic happen! ✨
```

---

## 🎯 Commands to Try

```
/start     - Welcome message
/help      - Help info
/info      - Your account info

Forward any message → Get all data extracted!
```

---

## 📊 What Gets Extracted

When you forward a message, you'll get:

✅ User ID & Username
✅ Chat ID & Type
✅ Message ID & Date
✅ Photo/Video/Document info
✅ Reply/Forward tracking
✅ Complete JSON
✅ CSV export

---

## 🔄 Need Help?

- **Local issues?** → Read `SETUP.md`
- **Deployment issues?** → Check Vercel logs
- **Code issues?** → Look at `README.md`

---

## 🎉 You're Done!

**Enjoy your new bot!** 🚀

Questions? You can modify the code anytime!

---

**Happy extracting!** 📊
