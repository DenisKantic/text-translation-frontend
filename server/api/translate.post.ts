// import { GoogleGenAI } from "@google/genai";

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const text = body.text;
//   const language = body.language

//   if (!text) return { error: "Missing text" };
//   if (!language) return {error: "Missing language"}

//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });

//   // Measure response time
//   const start = Date.now();

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `Translate this to ${language} directly, no talk: ${text} `,
//   });


//   return {
//     translation: response.text,
//     usage: response.usageMetadata?.totalTokenCount,   // Total tokens  
//     raw: response,           // OPTIONAL full raw response
//   };
// });


import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const text = body.text;
  const language = body.language;
  const provider = body.provider; // <-- NEW

  if (!text) return { error: "Missing text" };
  if (!language) return { error: "Missing language" };
  if (!provider) return { error: "Missing provider (gemini/chatgpt)" };

  // Measure time
  const start = Date.now();

  // ------------------------------------------------------------
  //  GEMINI
  // ------------------------------------------------------------
  if (provider === "gemini") {


    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const start = Date.now(); 

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate this to ${language} directly, no talk: ${text}`,
    });

    const end = Date.now();
    const Ms = end - start

    return {
      provider: "gemini",
      translation: response.text,
      responseTimeMs: Ms,
      usage: response.usageMetadata?.totalTokenCount,
      raw: response,
    };
  }

  // ------------------------------------------------------------
  //  CHATGPT (OpenAI REST API)
  // ------------------------------------------------------------
  if (provider === "chatgpt") {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // add to .env
    });

      const start = Date.now(); // ⏱️ start timer


    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini", // or gpt-4.1, gpt-4.1-preview, etc.
      messages: [
        {
          role: "system",
          content: "You are a translation engine. No explanations.",
        },
        {
          role: "user",
          content: `Translate this to ${language}: ${text}`,
        },
      ],
    });

     const end = Date.now(); // ⏱️ stop timer
  const timeMs = end - start;

    return {
      provider: "chatgpt",
      translation: response.choices[0].message.content,
      usage: response.usage.total_tokens,
      responseTimeMs: timeMs,
      raw: response,
    };
  }

  // ------------------------------------------------------------
  //  Invalid provider
  // ------------------------------------------------------------
  return { error: "Invalid provider. Must be 'gemini' or 'chatgpt'." };
});
