import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get the API key.
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key is missing" }, { status: 500 });
    }

    // Get the prompt from the request body.
    const { prompt } = await req.json();
    if (!prompt) {
      return new NextResponse(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }

    // Request AI response from DeepSeek R1.
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1:free",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });

    // Get the data and return it.
    const data = await response.json();
    const markdownText = data.choices?.[0]?.message?.content;
    return NextResponse.json({ response: markdownText });
  } catch (error) {
    // Check if there are any errors.
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), { status: 400 });
  }
}