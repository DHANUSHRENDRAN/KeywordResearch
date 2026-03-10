import { NextResponse } from 'next/server';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const WRITING_MODEL = process.env.WRITING_MODEL || "llama3-70b-8192";

export async function POST(request: Request) {
    try {
        const { instructions } = await request.json();

        if (!instructions) {
            return NextResponse.json({ error: "Instructions are required" }, { status: 400 });
        }

        if (!GROQ_API_KEY || GROQ_API_KEY === "your_groq_api_key_here") {
            return NextResponse.json({ error: "Groq API Key is not configured. Please add GROQ_API_KEY to your .env.local file." }, { status: 500 });
        }

        const prompt = `
            You are a professional blog writer (Llama 3).
            Task: Write a blog post based on these instructions.
            Instructions: ${JSON.stringify(instructions).slice(0, 1500)} // Slice to save tokens
            
            Style Reference: https://www.astrokids.ai/blogs/vedic-astrology-child-mental-health
            - Tone: Empathetic, Nurturing, Informative.
            - Format: H1, H2, H3, bullets, tables for remedies.
            
            Write the complete blog post now.
        `;

        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: WRITING_MODEL,
                messages: [
                    { role: "system", content: "You are an empathetic professional blog writer specializing in high-quality SEO content." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 4096,
                stream: false
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to call Groq API: ${errorText}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        return NextResponse.json({
            status: "success",
            blog_content: content
        });

    } catch (error: any) {
        console.error("Writing Agent Error:", error);
        return NextResponse.json({ error: "Failed to generate blog content", details: error.message }, { status: 500 });
    }
}

