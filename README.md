# Stable-Treasury 🏦

> **The Operating System for Cross-Border Capital.**
> Compare banking rails, fintech providers, and stablecoins in real-time to find the arbitrage in every invoice.

![Status](https://img.shields.io/badge/Status-Beta-emerald) ![Tech](https://img.shields.io/badge/Stack-React_|_Tailwind_|_Gemini-blue) ![License](https://img.shields.io/badge/License-MIT-slate)

---

## 🧐 The Problem
Treasury Managers and CFOs often lose **1-3%** on cross-border settlements due to opaque banking spreads and hidden fees. Comparing rates manually between SWIFT, Fintechs (like Wise), and Crypto rails (USDT) is slow, manual, and inefficient.

## 💡 The Solution
**Stable-Treasury** is a unified terminal that aggregates real-time data to visualize the most cost-effective settlement route for IDR/USD pairs. It leverages **Google Gemini 2.5 Flash** to analyze market sentiment and suggest execution timing.

---

## ⚡ Core Features

### 1. Real-Time Arbitrage Engine 📊
Instantly calculate the **Effective Exchange Rate** across three distinct rails:
*   **Bank TT (BCA)**: Traditional SWIFT transfers (High flat fees, stable rates).
*   **Fintech (Wise)**: Mid-market rate providers (Percentage fees, fast settlement).
*   **Stablecoin (USDT)**: Blockchain-based settlement (Low fees, high volatility).

### 2. AI Market Intelligence 🧠
Integrated with **Google Gemini 2.5 Flash**, the app analyzes market conditions to provide:
*   **Sentiment Analysis**: Bullish/Bearish indicators for USD.
*   **Strategic Advice**: "Wait for better rates" or "Execute now" based on transaction size.

### 3. Institutional Execution 🛡️
*   **Terminal UI**: Built for high-density information with a "Bloomberg Terminal" aesthetic.
*   **Simulated Trading**: Full Buy/Sell workflow for crypto assets with slippage protection.
*   **Hybrid Auth**: Seamless support for both Web2 (Email) and Web3 (Wallet) login.

---

## 🚀 Quick Start

### Prerequisites
*   Node.js (v18+)
*   Google Gemini API Key (Get it [here](https://aistudio.google.com))

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/stable-treasury.git
    cd stable-treasury
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run Development Server**
    ```bash
    npm start
    ```

---

## 🏗️ Architecture Overview

This project is built as a lightweight **Single Page Application (SPA)** using React 19.

| Component | Description |
| :--- | :--- |
| **`App.tsx`** | Central controller managing routing, user state, and memoized calculations. |
| **`services/geminiService.ts`** | Handles AI prompt engineering and JSON schema validation. |
| **`components/RateCard.tsx`** | Visualizes rate data and highlights the best option. |
| **`components/TradeModal.tsx`** | Simulates the execution layer with async state handling. |

## 💹 Financial Logic

The engine uses memoized formulas to calculate **Net USD Received**:

*   **Bank**: `(Input - FlatFee) / BankRate`
*   **Fintech**: `(Input - %Fee) / MidMarketRate`
*   **Crypto**: `((Input - TradingFee) / ExchangeRate) - GasFee`

*Check `docs/TECHNICAL_GUIDE.md` for deep dives into specific formulas.*

---

## 📄 License
MIT © Stable-Treasury Systems
