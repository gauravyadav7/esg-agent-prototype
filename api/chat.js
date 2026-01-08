import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, contextData } = request.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return response.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            tools: [{ googleSearch: {} }]
        });

        const prompt = `
      You are an expert ESG (Environmental, Social, and Governance) AI analyst for a company called "Clenergize".
      
      CAPABILITIES:
      - You can access the company's internal dashboard data (provided below).
      - You can SEARCH THE WEB for the latest external ESG news, benchmarks, and regulations.
      
      Here is the current carbon footprint dashboard data for the company:
      ${JSON.stringify(contextData, null, 2)}

      Your goal is to answer the user's question based on the Data AND External News if relevant.
      - "Scope 1" means direct emissions (fuel).
      - "Scope 2" means indirect emissions (electricity).
      - "Scope 3" means all other indirect emissions.

      User Question: "${message}"
    `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return response.status(200).json({ reply: text });

    } catch (error) {
        console.error('Gemini API Error:', error);
        return response.status(500).json({ error: 'Failed to generate response from AI.' });
    }
}
