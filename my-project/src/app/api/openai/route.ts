import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_MY_KEY
})

export async function GET(
    req: NextRequest,
    res: NextResponse
) {
    const prompt =  req.nextUrl.searchParams.get("prompt");


    // if(!prompt) {
    //     return res.status(400).json({ error: "Prompt is required" });
    // }
    
    // if(prompt.length > 100) {
    //     return res.status(400).json({ error: "Prompt is too long" });
    // }

    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "You are a mindmap creator assistant. Generate a mindmap in the form of a markdown, with roots starting with \n* and branches with \n** and so on; there should be no ` symbol and no indetation"},
            {"role": "user", "content": `${prompt}`},
          ],
        model: "gpt-4o-mini",
      });

    const mindmap = completion.choices[0].message.content;
    // const mindmap = "This is a mindmap";

    return NextResponse.json({ mindmap });
}  