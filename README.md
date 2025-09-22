# 🔬 SciDebug – AI-Powered Science Debugger

SciDebug is an AI-powered educational debugger that not only fixes Python code but also teaches you the science, math, or physics concepts behind the bugs.

It's built as a single Next.js 14 application with server actions, making it easy to deploy and use.

🌐 **Live Demo:** [scidebug.vercel.app](https://scidebug.vercel.app)

## 🚀 Features

- 🔍 **AI Bug Detection** – Upload .py scripts and get AI-generated fixes
- 📖 **Science Explanations** – Learn the underlying science/math/physics behind your mistakes
- 🛡️ **Sandboxed Execution** – Secure Python runtime with restricted imports and timeouts
- 🧠 **Powered by Gemini** – Uses Google Gemini 1.5 Flash via LangChain for AI reasoning
- 💾 **Auto-Save** – Automatically saves fixed code and explanations
- 🎨 **Modern UI** – Clean Next.js + Tailwind design with dark mode support

## 🏗️ Tech Stack

### Frontend & Backend (Next.js 14)
- ⚛️ **Next.js 14** - App Router with Server Actions
- 🎨 **Tailwind CSS** - Utility-first styling
- 📱 **TypeScript** - Type-safe development
- 🔗 **LangChain** - AI orchestration
- 🤖 **Google Gemini 1.5 Flash** - AI model
- 🛡️ **Server Actions** - Secure server-side processing

### AI Agent Tools (7-Tool System)
1. **read_file** - Read Python file content
2. **python_executor** - Safe code execution with sandbox
3. **debug_code_with_gemini** - AI-powered bug analysis
4. **fix_code_with_gemini** - AI-powered code fixing
5. **explain_science_concept** - Scientific concept explanations
6. **save_fixed_code** - Save corrected code
7. **save_explanation** - Save scientific explanations

## 📂 Project Structure
```
scidebug-nextjs/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx          # Main UI
│   └── api/download/     # File download API
├── components/
│   ├── FileUpload.tsx
│   ├── CodeViewer.tsx
│   ├── ScienceExplanation.tsx
│   └── CodeTabs.tsx
├── lib/
│   └── scifix-agent.ts   # SciDebugAgent class
├── actions/
│   └── process-code.ts   # Server Action
├── output/               # Auto-created - saves files
├── .env.local           # Environment variables
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone Repo
```bash
git clone https://github.com/anaszia60/SciDebug.git
cd SciDebug
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Setup
Create a `.env.local` file:
```bash
GOOGLE_API_KEY=your_gemini_api_key_here
```

### 4️⃣ Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🖥️ Usage

1. **Upload Python File** - Drag & drop or click to upload a .py file
2. **Debug & Learn** - Click the button to start AI processing
3. **View Results** - See original vs fixed code side by side
4. **Learn Science** - Read detailed explanations of the concepts
5. **Download Files** - Get the fixed code and explanation files

## ✅ Example

**Upload:**
```python
import math
print(math.sqqrt(16))
```

**SciDebug will return:**
- **Fixed Code:** `import math\nprint(math.sqrt(16))`
- **Explanation:** The square root function in Python is `math.sqrt(x)`. Square root is the number that, when multiplied by itself, equals x.

## 🔒 Security Features

- **Sandboxed Execution** - Blocks dangerous imports (os, sys, subprocess, etc.)
- **Timeout Protection** - 30-second execution limit
- **File Validation** - Only accepts .py files under 1MB
- **Server Actions** - Secure server-side processing

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add `GOOGLE_API_KEY` environment variable
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

## 📜 License

MIT License – free to use, modify, and distribute.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure your Gemini API key is valid
3. Verify the uploaded file is a valid Python file
4. Check the GitHub Issues page

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**

---

## 🔧 AI Agent Tools (7-Tool System)

SciDebug uses a sophisticated 7-tool AI agent system:

1. **read_file** - Read Python file content
2. **python_executor** - Safe code execution with sandbox
3. **debug_code_with_gemini** - AI-powered bug analysis
4. **fix_code_with_gemini** - AI-powered code fixing
5. **explain_science_concept** - Scientific concept explanations
6. **save_fixed_code** - Save corrected code
7. **save_explanation** - Save scientific explanations

Each tool is designed to work together seamlessly, providing a complete debugging and learning experience.
