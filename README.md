Meridian 🌐

The autonomous operating system for the multi-trillion dollar syndicated loan market.

🏆 LMA Edge Hackathon Submission

(Note: Replace with a screenshot of your dashboard if available)

📖 The Problem

The syndicated loan market is the engine of global finance, yet it runs on fragmented spreadsheets, email chains, and static PDFs. Bankers spend 40% of their time on manual reconciliation and compliance checking, leading to settlement delays (T+20) and significant operational risk.

💡 The Solution

Meridian is a unified desktop workspace that transforms loan management from a passive system of record into an active system of intelligence.

By integrating real-time exposure analytics with an AI-driven command center, Meridian automates the most friction-heavy parts of the lending lifecycle—from verifying ESG targets via IoT data to detecting covenant breaches instantly.

🚀 Key Innovations

1. 🧠 AI Command Center

A "Risk Engine" that continuously monitors borrower covenants and ESG targets.

Feature: One-click "Auto-Apply" for margin adjustments when ESG targets are met.

Impact: Reduces manual review time from hours to seconds.

2. 📉 Dynamic Liquidity

Real-time visibility into secondary market interest.

Feature: Matches sell-side axes with buy-side interest directly on the dashboard.

Impact: Bridges the gap between origination and trading, improving market liquidity.

3. 🏛️ Institutional UX

A "Bloomberg-grade" interface designed for high-density information processing.

Feature: Dark mode "Glassmorphism" UI, custom data visualization, and keyboard-first workflows.

Impact: Reduces eye strain and increases efficiency for power users.

🛠️ Tech Stack

Frontend

Framework: React.js (Vite)

Styling: Tailwind CSS v4

Animation: Framer Motion (Cinema-grade interactions)

Visualization: Custom CSS-based charts (Performance optimized)

Backend

API: Python FastAPI

Data Validation: Pydantic

Server: Uvicorn

⚡ Getting Started

Follow these instructions to run Meridian locally.

Prerequisites

Node.js (v18+)

Python (v3.10+)

1. Clone the Repository

git clone [https://github.com/your-username/meridian.git](https://github.com/your-username/meridian.git)
cd meridian


2. Setup Frontend

cd frontend
npm install
npm run dev


The frontend will launch at http://localhost:5173

3. Setup Backend

Open a new terminal window:

cd backend
pip install -r requirements.txt
uvicorn main:app --reload


The backend API will launch at http://127.0.0.1:8000

📊 Commercial Viability

Meridian was built to address the specific judging criteria of the LMA Edge Hackathon:

Criteria

Strategy

Value Proposition

Reduces loan administration time by ~30% via automated actions.

Scalability

Modular architecture allows banks to plug into legacy databases without a full rip-and-replace.

Efficiency Gains

Eliminates the "Email -> Spreadsheet -> PDF" loop.

Potential Impact

Mitigates credit risk by surfacing covenant breaches in real-time.

👥 Team

Aaryan Pawar - Lead Developer & Product Designer

Built with ❤️ for the LMA Edge Hackathon.