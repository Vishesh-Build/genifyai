import { NextRequest, NextResponse } from "next/server";

// Fallback archetypes jab API na ho
const archetypes = [
  {
    id: "visionary",
    name: "The Visionary",
    emoji: "🔭",
    tagline: "You see what others can't yet imagine.",
    description: "You're a big-picture thinker who naturally spots patterns, trends, and possibilities that others miss. You thrive on innovation, get bored with routine, and often feel like you're living 3 steps ahead of everyone around you.",
    traits: ["Creative", "Futuristic", "Inspiring", "Restless"],
    color: "#8b5cf6",
    strengths: "Vision, innovation, inspiring others",
    challenge: "Following through on details",
    celebrities: ["Elon Musk", "Steve Jobs", "Nikola Tesla"],
    score_range: [0, 25],
  },
  {
    id: "architect",
    name: "The Architect",
    emoji: "⚙️",
    tagline: "You build systems where there was once chaos.",
    description: "Logical, strategic, and precise — you're the person who actually makes things happen. You love frameworks, clear processes, and turning complex problems into elegant solutions.",
    traits: ["Analytical", "Strategic", "Precise", "Reliable"],
    color: "#3b82f6",
    strengths: "Systems thinking, problem-solving, execution",
    challenge: "Embracing ambiguity",
    celebrities: ["Bill Gates", "Marie Curie", "Ada Lovelace"],
    score_range: [26, 40],
  },
  {
    id: "connector",
    name: "The Connector",
    emoji: "🌐",
    tagline: "Your network is your superpower.",
    description: "You're energized by people, relationships, and building bridges. You have an uncanny ability to bring the right people together, read social dynamics, and make everyone feel included.",
    traits: ["Empathetic", "Social", "Charismatic", "Warm"],
    color: "#ec4899",
    strengths: "Relationships, communication, teamwork",
    challenge: "Setting boundaries, saying no",
    celebrities: ["Oprah Winfrey", "Richard Branson", "Brené Brown"],
    score_range: [41, 55],
  },
  {
    id: "maverick",
    name: "The Maverick",
    emoji: "⚡",
    tagline: "Rules are just suggestions to you.",
    description: "Bold, unconventional, and unapologetically yourself — you challenge the status quo, take risks others won't, and often discover paths that didn't exist before you walked them.",
    traits: ["Bold", "Independent", "Disruptive", "Authentic"],
    color: "#f59e0b",
    strengths: "Courage, originality, risk-taking",
    challenge: "Working within constraints",
    celebrities: ["Kanye West", "Lady Gaga", "Elon Musk"],
    score_range: [56, 68],
  },
  {
    id: "guardian",
    name: "The Guardian",
    emoji: "🛡️",
    tagline: "You protect what matters most.",
    description: "Dependable, caring, and principled — you're the bedrock that others lean on. You take commitments seriously, value loyalty deeply, and have an innate drive to keep people and systems safe.",
    traits: ["Loyal", "Protective", "Principled", "Steady"],
    color: "#10b981",
    strengths: "Reliability, integrity, nurturing others",
    challenge: "Adapting to rapid change",
    celebrities: ["Nelson Mandela", "Michelle Obama", "Warren Buffett"],
    score_range: [69, 80],
  },
  {
    id: "catalyst",
    name: "The Catalyst",
    emoji: "🔥",
    tagline: "You ignite change wherever you go.",
    description: "Passionate, persuasive, and relentlessly driven — you don't just want to be part of the movement, you want to start it. You have extraordinary energy and inspire others to take action.",
    traits: ["Passionate", "Driven", "Persuasive", "Energetic"],
    color: "#ef4444",
    strengths: "Motivation, leadership, creating momentum",
    challenge: "Patience and sustainable pace",
    celebrities: ["Martin Luther King Jr.", "Malala Yousafzai", "Gary Vaynerchuk"],
    score_range: [81, 100],
  },
];

function scoreToArchetype(score: number) {
  return (
    archetypes.find((a) => score >= a.score_range[0] && score <= a.score_range[1]) ??
    archetypes[0]
  );
}

async function getAIPersonalityResult(
  answers: number[],
  score: number,
  baseArchetype: typeof archetypes[0]
) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("No GROQ_API_KEY");

  const prompt = `You are a professional psychologist and personality analyst.

A user just completed a 10-question personality test. Their score is ${score}/100.
Based on the scoring, they are classified as: "${baseArchetype.name}" (${baseArchetype.id})

Their answer pattern (1=least like them, 4=most like them):
${answers.map((a, i) => `Q${i + 1}: ${a}/4`).join(", ")}

Write a personalized personality analysis in this EXACT JSON format, nothing else:
{
  "personalizedDescription": "3-4 sentences deeply describing THIS person based on their specific answer pattern. Make it feel personal and accurate, not generic.",
  "uniqueInsight": "One surprising, specific insight about this person that most people wouldn't tell them. Should feel like a 'wow that's so true' moment.",
  "careerMatches": ["Career 1", "Career 2", "Career 3"],
  "relationshipStyle": "One sentence about how they are in relationships",
  "growthTip": "One specific, actionable tip for their biggest growth area"
}

Return ONLY valid JSON, no extra text.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      max_tokens: 600,
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content:
            "You are a professional personality analyst. Always respond with valid JSON only, no markdown, no extra text.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) throw new Error("Groq API failed");

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content?.trim() ?? "";

  // Clean any accidental markdown fences
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return parsed;
}

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
    }

    // Calculate score
    const raw = answers.reduce((sum: number, v: number) => sum + v, 0);
    const max = answers.length * 4;
    const score = Math.round((raw / max) * 100);

    // Get base archetype from score
    const baseArchetype = scoreToArchetype(score);

    // Try to get AI-enhanced personalized result
    let aiEnhancements = null;
    let aiEnhanced = false;

    try {
      aiEnhancements = await getAIPersonalityResult(answers, score, baseArchetype);
      aiEnhanced = true;
    } catch (err) {
      console.warn("Groq personality API failed, using fallback:", err);
    }

    // Merge base archetype with AI enhancements
    const result = {
      ...baseArchetype,
      score,
      aiEnhanced,
      // Override with AI-generated content if available
      ...(aiEnhancements && {
        description: aiEnhancements.personalizedDescription ?? baseArchetype.description,
        uniqueInsight: aiEnhancements.uniqueInsight ?? null,
        careerMatches: aiEnhancements.careerMatches ?? [],
        relationshipStyle: aiEnhancements.relationshipStyle ?? null,
        growthTip: aiEnhancements.growthTip ?? null,
      }),
    };

    return NextResponse.json({ archetype: result, score }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to compute result" },
      { status: 500 }
    );
  }
}