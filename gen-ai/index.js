import 'dotenv/config'
import readline from "readline/promises";

import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, HumanMessage, tool } from "langchain";
import { sendEmail } from './tool/email.service.js';
import * as z from 'zod';
import { webSearchTool } from './tool/websearch.service.js';

const emailtool = tool(
    sendEmail,
    {
        name: "mailtool",
        description: "use this tool for send mail",
        schema: z.object({
            to: z.string().describe("the recipient's email adress"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        })
    });



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const model = new ChatMistralAI({
    model: "mistral-small-latest",

});

const agent = createAgent({
    model,
    tools: [emailtool, webSearchTool]
});

let messages = [
    {
        role: "ai",
        content:
            "If you don't know the answer or the question requires latest information, use the web_search tool."
    }
]

while (true) {
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")
    messages.push(new HumanMessage(userInput))
    const response = await agent.invoke({
        messages
    })
    messages.push(response.messages[response.messages.length - 1])

    console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[response.messages.length - 1].content}`)
}

rl.close()