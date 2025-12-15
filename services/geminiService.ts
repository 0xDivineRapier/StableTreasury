import { GoogleGenAI, Type } from "@google/genai";
import { MarketInsight } from "../types";

const apiKey = process.env.API_KEY || '';

// Fallback mock if no API key is present (for demo robustness, though instruction implies env is there)
const MOCK_INSIGHT: MarketInsight = {
  sentiment: 'NEUTRAL',
  summary: 'Market volatility is moderate. IDR is trading within expected range against USD. API key missing for live analysis.',
  recommendation: 'Monitor BCA counter rates closely before executing large volume transfers.'
};

export const getMarketAnalysis = async (amountIdr: number): Promise<MarketInsight> => {
  if (!apiKey) {
    console.warn("No API_KEY found in process.env");
    return MOCK_INSIGHT;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a Senior FX Treasury Analyst. The user is planning to convert ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amountIdr)} to USD.
      
      Current Market Snapshot (Mock Data):
      - USD/IDR Spot: 16,500
      - Trend: IDR weakening slightly due to global bond yields.
      
      Provide a JSON response with:
      1. Sentiment (BULLISH, BEARISH, NEUTRAL) regarding the USD (is USD getting stronger?).
      2. A concise 1-sentence summary of the market.
      3. A strategic recommendation for this specific transaction size.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ['BULLISH', 'BEARISH', 'NEUTRAL'] },
            summary: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          },
          required: ["sentiment", "summary", "recommendation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as MarketInsight;
    }
    throw new Error("Empty response from Gemini");

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      sentiment: 'NEUTRAL',
      summary: 'AI Analysis temporarily unavailable. Utilizing standard fallback protocols.',
      recommendation: 'Proceed with the most cost-effective route shown below.'
    };
  }
};
