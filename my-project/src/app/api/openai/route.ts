import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const prompt =  req.nextUrl.searchParams.get("prompt");
    
    console.log("Prompt:", prompt);

    // if(!prompt) {
    //     return res.status(400).json({ error: "Prompt is required" });
    // }
    
    // if(prompt.length > 100) {
    //     return res.status(400).json({ error: "Prompt is too long" });
    // }

    const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Create a mindmap in the form of a markdown with no indentaion based on the following topic: ${prompt} : \n
        `,
        // max_tokens: 400,
        temperature: 0.5,
        presence_penalty: 0.0,
        frequency_penalty: 0.0,
      });

    const mindmap = completion.choices[0].text.trim();
    // const mindmap = "This is a mindmap";

    return NextResponse.json({ mindmap });
}  