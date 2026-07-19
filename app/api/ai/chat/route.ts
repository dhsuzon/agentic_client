import { NextRequest, NextResponse } from "next/server";

const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_KEY}`;

const SYSTEM_PROMPT = `You are a helpful AI assistant for TutorialsPoint, an AI-powered learning platform. 
You help users with:
- Finding and enrolling in courses
- Creating new courses using AI content generation
- Answering questions about the platform
- Providing learning recommendations

Keep responses concise, friendly, and helpful. If you don't know something specific, guide the user to the right page (e.g., /explore for browsing courses, /courses/new for creating courses, /help for FAQ).

Do not make up information. Be honest about what the platform can and cannot do.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I'm ready to help users of TutorialsPoint." }],
      },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini API error:", err);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
