# ⚡ RawShot Bot - 5 Minute Quick Start

**सबसे तेज़ तरीका bot को launch करने का!**

## 🚀 Step 1: Get Bot Token (2 min)

```
1. Telegram खोलो
2. @BotFather को search करो
3. /newbot भेजो
4. Bot का name enter करो: RawShot
5. Bot का username enter करो: rawshot_bot
6. Token copy करो
```

**Token मिल गया? अगले step पर जाओ! ✅**

## 📁 Step 2: Download & Setup (2 min)

```bash
# All files download करो
# Extract करो

# Folder में जाओ
cd rawshot-bot

# .env file बनाओ
cp .env.example .env
```

## 🔑 Step 3: Add Bot Token (1 min)

**`.env` file को edit करो:**

```
BOT_TOKEN=your_token_here_paste_करो
ADMIN_ID=6924478999
```

## 📦 Step 4: Install (1 min)

```bash
npm install
```

## 🌐 Step 5: Deploy (1-2 min)

### Option A: GitHub + Vercel (Recommended)

```bash
# GitHub पर upload करो
git init
git add .
git commit -m "RawShot Bot"
git remote add origin https://github.com/YOUR_USERNAME/rawshot-bot.git
git branch -M main
git push -u origin main

# Vercel पर जाओ
# New Project → Select GitHub repo
# Add env variables
# Deploy! 🎉
```

### Option B: Direct Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

## ✅ Test करो (1 min)

```
1. Telegram खोलो
2. @rawshot_bot search करो
3. /start भेजो
4. कोई message forward करो
5. Bot data extract करेगा! ✨
```

---

## 🎯 Done! Bot Live है! 🎉

**Total Time: ~10 minutes**

```
✅ Bot running
✅ Data extracting
✅ Deployed on Vercel
✅ Auto-updating
```

---

## 🆘 Issues?

- **Bot token नहीं है?** → BotFather से नया बनाओ
- **Deploy failed?** → Check Vercel logs
- **Bot respond नहीं कर रहा?** → Wait 2-3 min, फिर try करो

---

**Ready? Let's go!** 🚀
