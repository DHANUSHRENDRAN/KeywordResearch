import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    const MODEL_NAME = process.env.BRANDING_MODEL || "gpt-4o-mini";

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "Missing OpenAI API Key." }, { status: 500 });
    }

    try {
        const { blog_content } = await request.json();

        if (!blog_content) {
            return NextResponse.json({ error: "Blog content is required" }, { status: 400 });
        }

        const prompt = `
            Rate this blog on a scale 1-100 for brand alignment (Empathetic, Nurturing, Professional).
            Reference: https://www.astrokids.ai/blogs/vedic-astrology-child-mental-health
            
            Blog:
            ${blog_content.slice(0, 4000)} // Increased slice size for 4o-mini
            
            JSON Output:
            - score (0-100)
            - feedback (one sentence)
            - strengths (list)
            - weaknesses (list)
            
            Output ONLY valid JSON.
        `;

        const response = await openai.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: "You are a branding expert specializing in brand alignment analysis." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const text = response.choices[0].message.content || "{}";

        let analysis;
        try {
            analysis = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            analysis = { raw_output: text };
        }

        return NextResponse.json({
            status: "success",
            analysis
        });

    } catch (error: any) {
        console.error("Branding Agent Error:", error);
        return NextResponse.json({ error: "Failed to analyze blog for branding", details: error.message }, { status: 500 });
    }
}

