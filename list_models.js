import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// 1. Read API Key from .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error("Could not read .env.local file");
    process.exit(1);
}

if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY not found in .env.local");
    process.exit(1);
}

console.log("Using API Key from .env.local...");

// 2. Fetch Models
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // Note: listModels is not directly exposed on the client class in all versions, 
        // but we can try to access the model manager if available, or just try a raw request if needed.
        // Actually, the SDK has a generic way. Let's try the standard way.
        // Spec: https://ai.google.dev/api/rest/v1/models/list

        // Changing approach: The JS SDK doesn't always expose listModels easily in the high-level helper.
        // Let's use a raw fetch to be 100% sure we see what the API sees.

        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", data.error);
            return;
        }

        if (!data.models) {
            console.log("No models found.");
            return;
        }

        console.log("\nAvailable Models:");
        console.log("-----------------");
        data.models.forEach(model => {
            if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                console.log(`- ${model.name} (${model.displayName})`);
            }
        });

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
