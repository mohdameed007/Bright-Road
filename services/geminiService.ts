import { GoogleGenAI, Chat } from "@google/genai";
import { DESTINATIONS, HOTELS, CARS } from '../constants';

// Use optional chaining for safety. 
// In a correct Vite build, import.meta.env is defined, but this prevents white-screen crashes if misconfigured.
const apiKey = import.meta.env?.VITE_API_KEY;

// Fail gracefully if key is missing (prevents crash, allows UI to load)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are "Bright Road Assistant", a knowledgeable and friendly AI guide for Oman tourism. 
Your goal is to help users explore Oman, find hotels, rent cars, and plan their trips.
The app "Bright Road" has the following specific inventory:

DESTINATIONS:
${JSON.stringify(DESTINATIONS.map(d => ({name: d.name, location: d.location})))}

HOTELS:
${JSON.stringify(HOTELS.map(h => ({name: h.name, location: h.location, price: h.price})))}

CARS:
${JSON.stringify(CARS.map(c => ({name: c.name, type: c.type, price: c.pricePerDay})))}

When users ask about these specific places or items, provide details based on this data.
If they ask general questions about Oman (culture, visa, weather, other locations), use your general knowledge and the Google Maps tool to provide accurate answers.
Be concise, helpful, and polite. Use emojis sparingly but effectively to keep the tone light and vacation-oriented.
`;

export const createChatSession = (): Chat => {
  if (!ai) {
    // If AI is null, checking apiKey again gives a clearer error for debugging
    if (!apiKey) {
      console.error("Gemini API Key is missing. Ensure VITE_API_KEY is set in Vercel Environment Variables.");
      throw new Error("API Key is missing. The chat feature is currently unavailable.");
    }
    throw new Error("AI client failed to initialize.");
  }
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleMaps: {} }],
    },
  });
};