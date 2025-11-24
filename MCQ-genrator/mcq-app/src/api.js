import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const MODELS = [
  "models/gemini-2.5-flash",
  "models/gemini-2.0-flash-001"
];

export async function generateMCQ(topic) {
  const prompt = `
  Generate 50 MCQs on the topic "${topic}", covering
  3 levels: Basic, Medium, Advanced.
  Make sure questions progress from easy to difficult.
  Return ONLY pure JSON.
  DO NOT wrap JSON in code blocks like \`\`\`json.
  Format strictly as:
  [
    {
      "question": "",
      "options": ["A","B","C","D"],
      "answer": "",
      "explanation": ""
    }
  ]
`;


  for (let modelName of MODELS) {
    try {
      console.log("Trying model:", modelName);

      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      let text = result.response.text();

      // 🔥 Remove code fences if Gemini adds them
      text = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(text);

    } catch (err) {
      if (err.message.includes("503")) {
        console.warn(modelName, "is overloaded. Switching to next model...");
        continue; // try next model
      }

      console.error("Error with model:", modelName, err);
    }
  }

  console.error("All models failed.");
  return null;
}