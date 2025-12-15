# Technical Guide & Architecture

## 🏗️ Architecture Pattern

Stable-Treasury operates as a **Single Page Application (SPA)** with a custom client-side router. It avoids heavy routing libraries to maintain a lightweight footprint, managing view state directly within `App.tsx`.

### Core Data Flow

1.  **Input**: User enters an Invoice Amount (IDR) in the dashboard.
2.  **Calculation (Memoized)**:
    -   The `useMemo` hook in `App.tsx` listens for changes in `amountIdr`.
    -   It iterates through the `routes` array (BCA, Wise, USDT).
    -   It applies specific fee formulas defined in the `RouteOption` interface.
    -   It determines the `bestResult` based on the highest `usdReceived`.
3.  **Visualization**: Results are passed down to `RateCard` components for rendering.

## 🧩 Key Components

### `App.tsx` (The Controller)
Acts as the central store for:
-   `currentUser`: Authentication state (Web2 vs Web3).
-   `currentView`: Navigation state (Landing, Platform, Dashboard, etc.).
-   `marketInsight`: Async data fetched from Gemini.

### `services/geminiService.ts`
Encapsulates all interaction with the Google GenAI SDK.
-   **Model**: `gemini-2.5-flash`
-   **Output Schema**: Enforces strict JSON typing using `responseSchema`. This ensures the UI never breaks from "hallucinated" formats and allows TypeScript to infer the `MarketInsight` type safely.
-   **Fallback**: Includes a robust mock fallback in case the API key is missing or the rate limit is hit.

## 🔐 Authentication Simulation

The app implements a **Strategy Pattern** for login inside `LoginModal.tsx`:
-   **Web3**: Simulates a wallet connection (returning a masked hex address like `0x71C...`).
-   **Web2**: Standard email capture.

Both methods result in a unified `User` object consumed by the rest of the app:
```typescript
interface User {
  type: 'WEB3' | 'WEB2';
  identifier: string;
  isConnected: boolean;
}
```

## 💹 Financial Logic

The application simulates real-world FX mechanics to calculate the "Effective Rate".

### Formulas used:

**1. Bank TT (BCA)**
*   Legacy infrastructure typically charges a flat fee + spread.
*   `Fees = 50,000 IDR (Flat)`
*   `USD Received = (Input - Fees) / Rate`

**2. Fintech (Wise)**
*   Modern rails often charge a percentage fee but offer better mid-market rates.
*   `Fees = Input * 0.6%`
*   `USD Received = (Input - Fees) / Rate`

**3. Crypto Rail (USDT)**
*   Stablecoin rails involve a trading fee (0.1% - 0.3%) and a fixed network gas fee (e.g., $1 - $5).
*   `Fees = (Input * 0.3%) + (1 USDT * Rate)`
*   `USD Received = ((Input - TradingFees) / Rate) - NetworkFee`

## 🎨 Design System

The UI uses **Tailwind CSS** with a specific configuration for a "Financial Terminal" aesthetic:
-   **Font**: Inter (UI) & JetBrains Mono (Numbers/Data).
-   **Colors**: Slate (Backgrounds), Emerald (Success/Profit), Red (Loss/Fees).
-   **Effects**: CSS Gradients and Box Shadows to create a "glassmorphic" depth effect on cards.
