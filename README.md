# 🛡️ TruthLayer.AI - Real-Time AI Fact-Checking Platform

TruthLayer AI is a premium, futuristic, full-stack AI-powered Fact-Checking platform. Users upload digital PDF documents, and the system extracts core factual assertions (statistics, financial figures, dates, and technical specs), searches the live web in real-time, verifies claim validity against active databases, and produces an immersive, interactive verification report.

---

## 🚀 Key Platform Features

1. **Futuristic Glassmorphic UI**: Premium responsive dashboard containing stunning glowing panels, smooth theme switches, and animated active transitions powered by `Framer Motion` and `Tailwind CSS`.
2. **Interactive File Upload**: Seamless Drag-and-Drop file staging with digital specifications tracking and size validation filters.
3. **Document Intelligence Stepper**: High-fidelity terminal-like stepper detailing active parsing logs (transfer, text extraction, claim isolation, web crawls, and discrepancy checks) in real-time.
4. **Parallel Live Verification**: Query live search engines (Tavily or SerpAPI) in parallel for ultra-fast, concurrent assertion checking.
5. **Smart LLM Synthesis**: Google Gemini (preferred) or OpenAI models cross-reference extracted claims side-by-side with web results, rating claims as:
   - **Verified ✅** (Perfect match to active facts)
   - **Inaccurate ⚠️** (Contains slight statistical tolerance errors or outdated figures)
   - **False ❌** (Contradicted or disproved by live reports)
6. **Executive Summary Banner**: Dynamic AI-generated paragraph outlining document integrity metrics and a global "Document Truth Score" indicator.
7. **Document previewer widget**: Digital sheets previewer showcasing page skeleton sheets and plain text parsed streams.
8. **Exportable Vector PDF Reports**: Vector-optimized page views allowing users to download beautiful printable fact-checking audit certificates with a single click.
9. **Out-of-the-Box Demo Mode**: If no API keys are present in `.env`, a highly context-aware smart fallback engine takes over, allowing full out-of-the-box UI demonstration with pre-built test templates!

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS (v3 with PostCSS and Autoprefixer)
- **Animations**: Framer Motion
- **Icons**: Lucide React Icons
- **HTTP Client**: Axios

### Backend
- **Server**: Node.js + Express
- **File Parsing**: Multer (in-memory) + pdf-parse
- **AI Integrations**: Google Gemini SDK (`@google/generative-ai`) & OpenAI SDK (`openai`)
- **Web Crawlers**: Tavily Search API & SerpAPI
- **Environment**: CORS, Dotenv

---

## 📂 Project Architecture

```text
Product management Trainee/
├── README.md
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── index.css
│       ├── App.jsx
│       ├── context/ThemeContext.jsx
│       ├── components/ (Sidebar, Header, UploadZone, PDFPreview, ClaimCard, StatsWidget, SourceCard)
│       ├── pages/ (LandingPage, DashboardPage, ResultsPage)
│       └── services/api.js
└── backend/
    ├── package.json
    ├── server.js
    ├── .env
    ├── routes/verify.js
    ├── controllers/verifyController.js
    └── services/ (pdfService, aiService, searchService)
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (`v20.0.0` or higher recommended)
- npm (`v10.0.0` or higher)

### 1. Backend Service Launch
1. Navigate into the backend folder:
   ```bash
   cd backend
   ```
2. Setup environment properties:
   - Duplicate `.env.example` and name the file `.env`
   - Fill in your API keys to enable live searches:
     ```env
     PORT=5000
     GEMINI_API_KEY=your_gemini_api_key_here
     TAVILY_API_KEY=your_tavily_api_key_here
     ```
     *(If left blank, the app triggers **Smart Contextual Mock Mode** for seamless test-driving)*
3. Run the development server:
   ```bash
   npm run dev
   ```
   The backend server launches at `http://localhost:5000`.

### 2. Frontend Interface Launch
1. Navigate into the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Launch the developer bundle:
   ```bash
   npm run dev
   ```
   The Vite dashboard launches at `http://localhost:5173`. Open this URL in your web browser!

---

## 🛡️ REST API Specifications

### `POST /api/verify/upload`
Initiates the fact-checking pipeline for a digital PDF document.

- **Request Format**: `multipart/form-data`
- **Fields**: 
  - `pdf`: File payload (strictly `.pdf`, max 10MB)
- **Response Example**:
  ```json
  {
    "documentName": "Q1_Financials.pdf",
    "truthScore": 67,
    "summary": "Moderate factual accuracy detected. While several primary claims are validated, significant statistical discrepancies were identified.",
    "metadata": {
      "verifiedAt": "2026-05-26T15:47:55Z",
      "totalClaims": 3,
      "verifiedCount": 2,
      "inaccurateCount": 0,
      "falseCount": 1,
      "pageCount": 1,
      "averageConfidence": 91
    },
    "results": [
      {
        "claim": "ChatGPT weekly active users surpassed 250 million.",
        "status": "Verified",
        "confidence": 93,
        "correctFact": "ChatGPT has successfully surpassed 250 million weekly active users.",
        "explanation": "Search indexes corroborate OpenAI statements from late 2025/2026.",
        "source": {
          "title": "OpenAI User Base Report",
          "url": "https://techcrunch.com/openai",
          "snippet": "OpenAI ChatGPT weekly active users hit 250M."
        }
      }
    ]
  }
  ```

---

## 🚀 Production Deployments

### Backend (Render / Heroku)
1. Set the root folder environment to run from `backend`.
2. Configure **Environment Variables** in the provider dashboard (`PORT=5000`, `GEMINI_API_KEY`, `TAVILY_API_KEY`).
3. Set the start script to:
   ```bash
   npm install && npm start
   ```

### Frontend (Vercel / Netlify)
1. Point build directories to the `frontend/` folder.
2. Build command:
   ```bash
   npm run build
   ```
3. Output directory:
   ```text
   dist
   ```
