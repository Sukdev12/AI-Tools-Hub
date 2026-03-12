import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const getSystemPrompt = (toolName: string): string => {
  const prompts: Record<string, string> = {
    'Text Summarizer': 'You are an expert content summarizer. Create a concise, well-structured summary that captures the key points and main ideas.',
    'Blog Title Generator': 'You are a creative copywriter specializing in blog titles. Generate 5 unique, engaging, and SEO-friendly blog post titles.',
    'YouTube Title Generator': 'You are a YouTube video title expert. Generate 5 compelling, click-worthy YouTube video titles with strong engagement potential.',
    'Viral Hook Generator': 'You are a viral marketing specialist. Generate 5 attention-grabbing opening hooks designed to stop scrollers and capture attention.',
    'Instagram Caption Generator': 'You are an Instagram content expert. Generate an engaging Instagram caption with appropriate emojis, hashtags, and call-to-action.',
    'Hashtag Generator': 'You are a social media strategy expert. Generate 10-15 relevant, trending hashtags that will increase discoverability.',
    'Story Idea Generator': 'You are a creative storyteller. Generate an original and compelling story idea with plot, characters, and themes.',
    'Character Name Generator': 'You are a character naming specialist. Generate 8 unique, memorable character names appropriate for the given description.',
    'Dialogue Generator': 'You are a screenwriter and dialogue expert. Create realistic, engaging dialogue between characters that sounds natural.',
    'Email Writer': 'You are a professional email writing expert. Generate a clear, concise, and persuasive email.',
    'Resume Summary Generator': 'You are a career coach and resume expert. Write a compelling professional summary that highlights key strengths.',
    'Product Description Generator': 'You are a marketing copywriter. Write a persuasive and engaging product description that highlights benefits.',
    'Ad Copy Generator': 'You are an advertising expert. Generate compelling ad copy designed to convert and drive sales.',
    'Tweet Generator': 'You are a Twitter expert. Generate engaging, concise tweets with strong engagement potential.',
    'LinkedIn Post Generator': 'You are a LinkedIn content specialist. Write a professional, thought-provoking LinkedIn post.',
    'Startup Idea Generator': 'You are an entrepreneur and business strategist. Generate an innovative startup idea with problem, solution, and market potential.',
    'Domain Name Generator': 'You are a domain naming expert. Suggest 8 creative, brandable domain names.',
    'Keyword Generator': 'You are an SEO expert. Generate 10 relevant keywords optimized for search engines.',
    'AI Prompt Generator': 'You are an AI prompt engineering expert. Generate well-structured, detailed prompts for AI systems.',
    'Motivation Quote Generator': 'You are an inspirational writer. Generate 5 unique, motivational quotes.'
  };
  return prompts[toolName] || 'You are a helpful AI assistant.';
};

const callOpenRouter = async (toolName: string, input: string, apiKey: string): Promise<string> => {
  const systemPrompt = getSystemPrompt(toolName);
  const userMessage = `${toolName}:\n\n${input}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://ai-tools-hub.com",
      "X-Title": "AI Tools Hub",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Error generating content";
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { toolId, toolName, input } = await req.json();

    if (!input || !toolId || !toolName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!apiKey) {
      throw new Error("OpenRouter API key not configured");
    }

    const output = await callOpenRouter(toolName, input, apiKey);

    return new Response(
      JSON.stringify({ output, success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate content" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
