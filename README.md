# Stable-Treasury 🏦

> A high-performance FX optimization engine and treasury terminal for comparing banking, fintech, and crypto rails for IDR settlements.

![Status](https://img.shields.io/badge/Status-Beta-emerald) ![Tech](https://img.shields.io/badge/Stack-React_|_Tailwind_|_Gemini-blue) ![License](https://img.shields.io/badge/License-MIT-slate)

## ⚡ Overview

**Stable-Treasury** is a financial dashboard designed to help CFOs and Treasury Managers find arbitrage opportunities in cross-border payments. It aggregates real-time data from traditional banks (SWIFT), fintech providers (Wise), and stablecoin rails (USDT) to visualize the most cost-effective settlement route.

## 🚀 Key Features

- **Real-Time Arbitrage Engine**: Instantly compares effective exchange rates across BCA, Wise, and USDT rails.
- **AI Market Intelligence**: Integrated with **Google Gemini 2.5 Flash** to provide real-time sentiment analysis and strategic execution recommendations based on transaction volume.
- **Interactive Charting**: Visualizes spread history and volatility over a 7-day period to track banking vs. stablecoin efficiency.
- **Institutional UI**: Dark-mode, terminal-inspired interface built for high-density information display.
- **Hybrid Authentication**: Supports both **Web3** (Wallet Connect simulation) and **Web2** (Email) login workflows.
- **Trade Execution**: Full "Buy/Sell" workflow simulation for crypto assets with slippage warnings and fee calculation.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS (Dark mode optimized)
- **AI/LLM**: Google GenAI SDK (`@google/genai`)
- **Visualization**: Recharts
- **Icons**: Lucide React

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key (get one at [aistudio.google.com](https://aistudio.google.com))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stable-treasury.git
   cd stable-treasury
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment:
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

4. Start the application:
   ```bash
   npm start
   ```

## 📂 Project Structure

```bash
├── components/          # UI Components
│   ├── RateCard.tsx     # Core rate comparison logic & display
│   ├── Landing.tsx      # Marketing landing page
│   ├── TradeModal.tsx   # Buy/Sell execution modal
│   └── ...
├── services/            # External API integrations
│   └── geminiService.ts # Google GenAI implementation
├── docs/                # Technical documentation
├── types.ts             # Shared TypeScript definitions
├── App.tsx              # Main application logic & routing
└── index.tsx            # Entry point
```

## 🧠 AI Integration

This project uses the **Google Gemini 2.5 Flash** model to analyze simulated market conditions. The prompt engineering is located in `services/geminiService.ts`.

It requests a structured **JSON** response to ensure type safety in the UI, providing:
1.  **Sentiment**: `BULLISH` | `BEARISH` | `NEUTRAL`
2.  **Summary**: Concise market overview.
3.  **Recommendation**: Actionable advice for the specific transaction volume.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
