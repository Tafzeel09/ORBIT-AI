# 🚀 Orbit AI — Life Operating System

A production-ready AI-powered productivity web app built with **React + Vite**.


🌐 Live Demo

Live Demo: https://orbit-ai-wheat.vercel.app/

## ✨ Features

| Module | Description |
|--------|-------------|
| 🏠 Dashboard | Personalized welcome, stats, quick navigation |
| 🧠 AI Planner | Task management with priorities, categories, due dates |
| 🎙️ Voice Notes | Browser speech-to-text with full mic cleanup |
| ✍️ Proposal Gen | AI-powered freelance proposal generator |
| 💰 Expenses | Budget tracker with category charts |
| 🤖 AI Assistant | Bilingual chat (English + اردو) |
| ⚙️ Settings | Profile, dark mode, language, privacy, API key, data export |

---

## 📁 Project Structure

```
orbit-ai/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── index.jsx        # Shared: Btn, Card, Inp, Sel, Txt, Toggle, Badge
│   │   ├── AuthPage.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AIPlanner.jsx
│   │   ├── VoiceNotes.jsx
│   │   ├── ProposalGenerator.jsx
│   │   ├── ExpenseTracker.jsx
│   │   ├── UrduAssistant.jsx
│   │   └── SettingsPage.jsx
│   ├── data/
│   │   └── index.js             # Seed data, constants
│   ├── utils/
│   │   └── index.js             # Helpers, theme tokens, Claude API
│   ├── App.jsx                  # Root component + state
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles + animations
├── .github/
│   └── workflows/
│       └── deploy.yml           # Auto-deploy to GitHub Pages
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 🛠️ Installation & Development

```bash
# 1. Clone or download the project
git clone https://github.com/YOUR_USERNAME/orbit-ai.git
cd orbit-ai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173/orbit-ai/
```

---

## 🏗️ Build for Production

```bash
npm run build
# Output in /dist folder
```

---

## 🌐 GitHub Pages Deployment

### Step 1 — Update base path
Edit `vite.config.js` and change `/orbit-ai/` to your repo name:
```js
base: '/YOUR-REPO-NAME/',
```

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch: `gh-pages` → folder: `/ (root)`
4. Click **Save**

GitHub Actions will automatically build & deploy on every push to `main`.

**Your app will be live at:**
```
https://YOUR_USERNAME.github.io/YOUR-REPO-NAME/
```

---

## 🤖 AI Features Setup

To enable AI Chat and Proposal Generator:
1. Get a free API key from [console.anthropic.com](https://console.anthropic.com)
2. Open the app → **Settings** → **AI Preferences**
3. Paste your API key and click **Save**

> API key is stored locally in your browser only. Never shared.

---

## 🔐 Authentication

Uses mock authentication with localStorage. Any valid email + password (6+ chars) works.
No backend required.

---

## 🌙 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **lucide-react** — Icons
- **Web Speech API** — Voice recording
- **Anthropic Claude API** — AI features
- **localStorage** — Data persistence
- **CSS-in-JS (inline styles)** — Zero CSS dependencies

---

## 📱 Responsive Design

| Breakpoint | Layout |
|-----------|--------|
| Mobile (`< 1024px`) | Hamburger menu, stacked cards |
| Desktop (`≥ 1024px`) | Fixed 240px sidebar, wide content |

---

## 🔒 Privacy

- All data stored in browser `localStorage`
- Voice processed on-device (Web Speech API)
- AI features only activate when you provide your own API key
- No tracking, no telemetry, no cloud sync

---

## 📄 License

MIT License — Free to use, modify, and distribute.

👨‍💻 Developer

Taiba Shabbir

Freelance Web Developer • AI Enthusiast • Quran Teacher

⭐ If you like this project, consider giving it a Star on GitHub!
