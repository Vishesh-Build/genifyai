import { NextRequest, NextResponse } from "next/server";

async function enhanceSummaryWithGroq(name: string, title: string, rawSummary: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("No API key");

  const prompt = rawSummary
    ? `Improve this professional resume summary for ${name}, a ${title}. Make it more impactful, ATS-friendly, and compelling in 2-3 sentences. Return ONLY the improved summary text, nothing else:\n\n"${rawSummary}"`
    : `Write a compelling 2-3 sentence professional resume summary for ${name}, a ${title}. Make it ATS-friendly, results-oriented, and impressive. Return ONLY the summary text, nothing else.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      max_tokens: 200,
      temperature: 0.7,
      messages: [
        { role: "system", content: "You are an expert resume writer. Return only the requested text, no extra commentary." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) throw new Error("Groq API failed");
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, title, email, phone, location, summary, experience, education, skills } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Try to enhance summary with AI
    let finalSummary = summary?.trim() || "";
    let aiEnhanced = false;

    try {
      finalSummary = await enhanceSummaryWithGroq(name, title || "Professional", summary || "");
      aiEnhanced = true;
    } catch {
      // Fallback to manual summary
      finalSummary = summary?.trim() ||
        `Results-driven ${title || "professional"} with a strong track record of delivering impactful solutions. Skilled in collaborating across teams to achieve strategic goals and drive measurable outcomes.`;
    }

    const resumeData = {
      name: name.trim(),
      title: title?.trim() || "Professional",
      email: email.trim(),
      phone: phone?.trim() || "",
      location: location?.trim() || "",
      summary: finalSummary,
      experience: (experience || []).filter((e: { role: string }) => e.role),
      education: (education || []).filter((e: { degree: string }) => e.degree),
      skills: skills?.split(",").map((s: string) => s.trim()).filter(Boolean) || [],
      aiEnhanced,
    };

    return NextResponse.json({ resume: resumeData }, { status: 200 });

  } catch {
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 });
  }
}
