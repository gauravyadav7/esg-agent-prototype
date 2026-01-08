import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
let apiKey = '';
try {
    apiKey = fs.readFileSync(envPath, 'utf-8').match(/VITE_GEMINI_API_KEY=(.*)/)[1].trim();
} catch (e) { process.exit(1); }

const genAI = new GoogleGenerativeAI(apiKey);

async function testGenericSearch() {
    console.log("Testing tools: [{ googleSearch: {} }] ...");
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            tools: [{ googleSearch: {} }]
        });
        const result = await model.generateContent("What is the latest major ESG news from last week?");
        console.log("Success with googleSearch!");
        console.log(result.response.text());
    } catch (e) {
        console.log("Failed with googleSearch:", e.message);
    }
}

testGenericSearch();
