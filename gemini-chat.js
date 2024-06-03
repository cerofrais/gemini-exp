const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function run() {
    // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history: [
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    async function askAndRespond(question) {
        rl.question(question, async (answer) => {
            if (answer === "exit") {
                rl.close();
            }
            else{
            
            const result = await chat.sendMessage(answer);
            const response = await result.response;
            const text = response.text();
            console.log("AI: ",text);
            askAndRespond();
            }
        });
    }
    askAndRespond();
}

run();