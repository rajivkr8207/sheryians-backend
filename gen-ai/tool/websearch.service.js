import { tavily } from "@tavily/core";
import { tool } from "langchain";
import * as z from "zod";
const tvly = tavily({
    apiKey: process.env.TAVILY_KEY,
    maxResults: 3
});



export const webSearchTool = tool(
    async ({ query }) => {

        const res = await tvly.search(query);

        const context = res.results
            .slice(0, 3)
            .map(r => r.content)
            .join("\n");
        
        return context;

    },
    {
        name: "web_search",
        description: "Search the internet for latest information",
        schema: z.object({
            query: z.string().describe("search query for web")
        })
    }
);