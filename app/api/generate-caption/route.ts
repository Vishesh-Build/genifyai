import { NextRequest, NextResponse } from "next/server";

// Fallback templates jab API na ho
const fallbackTemplates: Record<string, string[]> = {
  funny: [
    "Me pretending to work while actually thinking about {topic} all day 😂",
    "POV: You just discovered {topic} and now your entire personality changed 💀",
    "Nobody:\nAbsolutely nobody:\nMe at 2am: One more {topic} deep dive 🔥",
    "The face I make when someone doesn't care about {topic} 👁️👄👁️",
    "Plot twist: {topic} was the main character all along ✨",
  ],
  motivational: [
    "Your future self is counting on what you do with {topic} today. 🚀",
    "Every {topic} expert was once a beginner who refused to quit. 💪",
    "{topic} isn't a destination — it's a daily decision. ✨",
    "The secret to {topic}? Show up when it's hardest. 🔥",
    "Stop waiting. Your {topic} journey starts right now. 💫",
  ],
  professional: [
    "3 things nobody tells you about {topic} until it's too late 👇",
    "After deep diving into {topic}, here's what changed everything:",
    "The {topic} landscape is shifting. Are you keeping up? 🎯",
    "Breaking down {topic} so simply anyone can understand it:",
    "Here's my honest take on {topic} after working with it closely:",
  ],
  aesthetic: [
    "soft mornings & {topic} ✨🌙",
    "in a world full of noise, {topic} is my peace 🤍",
    "{topic} energy. no explanation needed 🌿",
    "romanticizing my {topic} era ✨",
    "living slowly. thinking deeply. embracing {topic} 🌸",
  ],
  viral: [
    "This {topic} hack has been living rent free in my mind 🤯",
    "I tried {topic} for 30 days. Here's what nobody tells you:",
    "Stop scrolling. This {topic} info will change things for you ⬇️",
    "{topic} is about to blow up and I have receipts 👀",
    "The {topic} girlies are eating good today 🙌",
  ],
};

function getFallback(topic: string, mood: string): string[] {
  const templates = fallbackTemplates[mood] ?? fallbackTemplates["viral"];
  return templates.map((t) => t.replace(/{topic}/g, topic));
}

async function generateWithGroq(topic: string, mood: string): Promise<string[]> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  const moodInstructions: Record<string, string> = {
    funny:        "humorous, witty, Gen-Z tone, funny observations, 1-2 emojis each",
    motivational: "inspiring, empowering, action-driven, powerful words, 1-2 fire emojis",
    professional: "polished, LinkedIn-worthy, insightful hook + value + CTA, minimal emojis",
    aesthetic:    "soft, poetic, dreamy, short sentences, nature metaphors, 1-2 gentle emojis",
    viral:        "scroll-stopping, curiosity hook, bold claims, open loops, 1-2 emojis",
  };

  const prompt = `You are a world-class social media copywriter who creates viral content.

Generate exactly 5 unique social media captions about: "${topic}"
Style: ${mood} — ${moodInstructions[mood] ?? moodInstructions.viral}

Rules:
- Each caption must be completely different in structure and angle
- Do NOT number them or add any labels
- Separate each caption with exactly: ---NEXT---
- Make each one feel genuinely crafted, not generic
- Mix short punchy ones with longer storytelling ones
- Ready to post as-is

Output ONLY the 5 captions separated by ---NEXT--- and nothing else.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",   // Llama3 70B — best quality
      max_tokens: 1024,
      temperature: 0.85,
      messages: [
        {
          role: "system",
          content: "You are a viral social media expert. Always respond with exactly the requested format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error: ${err}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content ?? "";

  const captions = rawText
    .split("---NEXT---")
    .map((c: string) => c.trim())
    .filter((c: string) => c.length > 10)
    .slice(0, 5);

  if (captions.length < 3) throw new Error("Not enough captions returned");

  return captions;
}

export async function POST(req: NextRequest) {
  try {
    const { topic, mood } = await req.json();

    if (!topic || !mood) {
      return NextResponse.json(
        { error: "Topic and mood are required" },
        { status: 400 }
      );
    }

    const cleanTopic = topic.trim();
    let captions: string[];
    let source: "ai" | "fallback" = "ai";

    try {
      captions = await generateWithGroq(cleanTopic, mood);
    } catch (err) {
      console.warn("Groq API failed, using fallback templates:", err);
      captions = getFallback(cleanTopic, mood);
      source = "fallback";
    }

    return NextResponse.json({ captions, topic: cleanTopic, mood, source }, { status: 200 });

  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
