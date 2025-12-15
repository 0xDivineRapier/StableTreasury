export interface RouteOption {
  id: string;
  name: string;
  provider: string;
  rate: number; // IDR per USD
  type: 'BANK' | 'FINTECH' | 'CRYPTO';
  feeDescription: string;
  calculateUsdReceived: (inputIdr: number) => number;
  calculateFeesIdr: (inputIdr: number) => number;
}

export interface CalculationResult {
  routeId: string;
  usdReceived: number;
  feesIdr: number;
  effectiveRate: number;
}

export interface MarketInsight {
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  summary: string;
  recommendation: string;
}

export interface User {
  type: 'WEB3' | 'WEB2';
  identifier: string; // Wallet Address or Email
  isConnected: boolean;
}

export type View = 'LANDING' | 'PLATFORM' | 'API' | 'ENTERPRISE' | 'DASHBOARD';