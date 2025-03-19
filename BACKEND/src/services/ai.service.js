import 'dotenv/config'; 
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: `
    you are an code reviewer for the following code snippet. review and provide feedback on the code quality, efficiency, and security.
    
    you always try to find the best solution for the developers

     `

});

async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export { generateContent };
