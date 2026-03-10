import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const generateContent = (toolId: string, toolName: string, input: string): string => {
  const templates: Record<string, (input: string) => string> = {
    'text-summarizer': (text) => {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim());
      const summary = sentences.slice(0, Math.max(2, Math.ceil(sentences.length * 0.3))).join('. ');
      return `Summary:\n\n${summary}.`;
    },
    'blog-title-generator': (input) => {
      const titles = [
        `The Ultimate Guide to ${input}`,
        `How to Master ${input} in 2024`,
        `10 Things You Need to Know About ${input}`,
        `${input}: A Complete Beginner's Guide`,
        `Why ${input} Matters More Than Ever`
      ];
      return titles.join('\n\n');
    },
    'youtube-title-generator': (input) => {
      const titles = [
        `${input} - You Won't Believe What Happens Next!`,
        `The TRUTH About ${input} (Revealed)`,
        `${input} - Step by Step Tutorial`,
        `I Tried ${input} For 30 Days - Here's What Happened`,
        `${input} Explained in 5 Minutes`
      ];
      return titles.join('\n\n');
    },
    'viral-hook-generator': (input) => {
      const hooks = [
        `Stop scrolling! Here's why ${input} will change your life...`,
        `Everyone is talking about ${input}, but they're missing THIS...`,
        `The secret to ${input} that nobody tells you...`,
        `I wish I knew this about ${input} sooner...`,
        `This ${input} hack saved me hours of work!`
      ];
      return hooks.join('\n\n');
    },
    'instagram-caption-generator': (input) => {
      return `✨ ${input} ✨\n\nExperience the magic and let your journey begin! This moment captures everything beautiful about ${input}. Swipe to see more!\n\n#${input.replace(/\s+/g, '')} #InstaDaily #Inspiration #LifeStyle #PhotoOfTheDay`;
    },
    'hashtag-generator': (input) => {
      const words = input.toLowerCase().split(' ').filter(w => w);
      const hashtags = [
        `#${input.replace(/\s+/g, '')}`,
        ...words.map(w => `#${w}`),
        '#Trending',
        '#Viral',
        '#Daily',
        '#Inspiration',
        '#Love',
        '#InstaGood',
        '#PhotoOfTheDay',
        '#Beautiful'
      ];
      return hashtags.join(' ');
    },
    'story-idea-generator': (input) => {
      return `Story Idea:\n\nA young protagonist discovers a hidden world where ${input} holds the key to saving their reality. As they navigate through challenges and forge unexpected alliances, they must confront their deepest fears and unlock ancient secrets before time runs out.\n\nThemes: Adventure, Self-discovery, ${input}\nGenre: ${input} Fiction\nTarget Audience: Young Adult`;
    },
    'character-name-generator': (input) => {
      const names = [
        'Aria Moonstone',
        'Kai Thornfield',
        'Luna Winterbourne',
        'Marcus Ravencroft',
        'Seraphina Blackwood',
        'Damon Stormrider',
        'Elara Nightshade',
        'Phoenix Ashborne'
      ];
      return `Character Names for ${input}:\n\n${names.join('\n')}`;
    },
    'dialogue-generator': (input) => {
      return `"Listen," she said, leaning forward. "I know what you're thinking about ${input}, but trust me—it's not what it seems."\n\n"Then what is it?" he demanded, frustration evident in his voice.\n\n"It's complicated. ${input} has always been complicated. But if you give me a chance, I can explain everything."\n\nHe studied her face for a long moment before finally nodding. "Alright. I'm listening."`;
    },
    'email-writer': (input) => {
      return `Subject: Regarding ${input}\n\nDear [Recipient],\n\nI hope this email finds you well. I am reaching out regarding ${input}.\n\nI would like to discuss this matter further at your earliest convenience. Please let me know when you would be available for a brief call or meeting.\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]`;
    },
    'resume-summary-generator': (input) => {
      return `Professional Summary:\n\nResults-driven ${input} with proven track record of delivering exceptional outcomes. Skilled in leading cross-functional teams, implementing strategic initiatives, and driving organizational growth. Strong analytical and problem-solving abilities combined with excellent communication skills. Passionate about innovation and continuous improvement.`;
    },
    'product-description-generator': (input) => {
      return `Discover the Ultimate ${input}\n\nExperience premium quality and unmatched performance with our ${input}. Crafted with attention to detail and designed for modern lifestyles, this product combines functionality with style.\n\nKey Features:\n• Superior quality materials\n• Innovative design\n• Easy to use\n• Durable and long-lasting\n• Perfect for daily use\n\nTransform your experience with ${input}. Order now and enjoy the difference!`;
    },
    'ad-copy-generator': (input) => {
      return `🚀 Introducing ${input} - Your Life, Upgraded!\n\nTired of settling for less? ${input} is here to revolutionize the way you live, work, and play.\n\n✓ Premium Quality\n✓ Unbeatable Value\n✓ Instant Results\n\n🎯 Limited Time Offer: Get 20% OFF!\n\nDon't miss out - Join thousands of satisfied customers today!\n\n👉 Click here to claim your discount now!`;
    },
    'tweet-generator': (input) => {
      const tweets = [
        `Just discovered ${input} and it's a game-changer! 🚀 #Innovation`,
        `Hot take: ${input} is the future. Here's why 👇`,
        `${input} hits different when you really understand it 💯`,
        `The ${input} community is amazing! So grateful to be part of this journey ✨`,
        `Can we talk about how underrated ${input} is? Thread 🧵`
      ];
      return tweets.join('\n\n');
    },
    'linkedin-post-generator': (input) => {
      return `I'm excited to share my thoughts on ${input}.\n\nOver the past few months, I've had the opportunity to dive deep into this area, and here are my key takeaways:\n\n1️⃣ ${input} is transforming how we approach modern challenges\n2️⃣ The potential for innovation is unprecedented\n3️⃣ Success requires both strategy and execution\n\nWhat's your experience with ${input}? I'd love to hear your perspective in the comments.\n\n#ProfessionalDevelopment #Innovation #Leadership`;
    },
    'startup-idea-generator': (input) => {
      return `Startup Idea: ${input} Solutions\n\nProblem: Current solutions in the ${input} space are outdated, expensive, or difficult to use.\n\nSolution: A modern, AI-powered platform that simplifies ${input} for businesses and individuals. Subscription-based model with freemium tier.\n\nTarget Market: Small to medium businesses, freelancers, and professionals\n\nRevenue Model: SaaS subscription ($29-$99/month)\n\nUnique Value Proposition: Combine cutting-edge technology with intuitive design to make ${input} accessible to everyone.`;
    },
    'domain-name-generator': (input) => {
      const base = input.toLowerCase().replace(/\s+/g, '');
      const domains = [
        `${base}.com`,
        `${base}hq.com`,
        `get${base}.com`,
        `${base}pro.com`,
        `${base}hub.com`,
        `try${base}.com`,
        `${base}app.com`,
        `my${base}.com`
      ];
      return `Available Domain Names:\n\n${domains.join('\n')}`;
    },
    'keyword-generator': (input) => {
      const keywords = [
        input,
        `${input} guide`,
        `best ${input}`,
        `${input} tips`,
        `how to ${input}`,
        `${input} tutorial`,
        `${input} for beginners`,
        `${input} examples`,
        `learn ${input}`,
        `${input} strategies`
      ];
      return `SEO Keywords:\n\n${keywords.join('\n')}`;
    },
    'ai-prompt-generator': (input) => {
      return `AI Prompt:\n\n"Create a detailed and comprehensive explanation of ${input}. Include key concepts, practical examples, and step-by-step guidance. Make it accessible for beginners while providing valuable insights for advanced users. Focus on real-world applications and actionable advice."\n\nAlternative Prompt:\n\n"Act as an expert in ${input}. Provide a deep analysis covering the fundamentals, advanced techniques, and future trends. Include specific examples and case studies to illustrate your points."`;
    },
    'motivation-quote-generator': (input) => {
      const quotes = [
        `"The journey of ${input} begins with a single step. Take it today."`,
        `"Success in ${input} isn't about being perfect—it's about being persistent."`,
        `"Every expert in ${input} was once a beginner who refused to give up."`,
        `"Your potential in ${input} is limitless. Believe in yourself."`,
        `"The best time to start with ${input} was yesterday. The second best time is now."`
      ];
      return quotes.join('\n\n');
    }
  };

  const generator = templates[toolId];
  if (!generator) {
    return `Generated content for ${toolName}:\n\n${input}\n\nThis is a demo output. The AI generation would provide more sophisticated results with a proper AI API integration.`;
  }

  return generator(input);
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

    if (!input || !toolId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const output = generateContent(toolId, toolName, input);

    return new Response(
      JSON.stringify({ output, success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
