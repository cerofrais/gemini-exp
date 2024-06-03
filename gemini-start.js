const dotenv = require('dotenv');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt = "What is the traffic violation in the image? extract the number of the vehicle if visible";
    const prompt = "What is the traffic violation in the image? extract the number of the vehicle if visible";

    const imageParts = [
        fileToGenerativePart("data/image1.png", "image/png"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();