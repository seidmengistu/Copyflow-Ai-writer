export interface ToolField {
  key: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  required?: boolean;
}

export interface Tool {
  slug: string;
  name: string;
  /** Short label used in nav/cards. */
  short: string;
  tagline: string;
  icon: string; // maps to a lucide icon in <ToolIcon>
  category: "Social Media" | "Marketing" | "Writing" | "Career";
  seoTitle: string;
  seoDescription: string;
  intro: string;
  fields: ToolField[];
  tones: string[];
  /** System prompt for Claude. */
  system: string;
  buildPrompt: (inputs: Record<string, string>, tone: string) => string;
  /** Sample outputs — shown on the page for SEO + used as the no-API demo. */
  examples: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const DEFAULT_TONES = ["Casual", "Professional", "Funny", "Bold", "Inspirational"];

export const tools: Tool[] = [
  {
    slug: "instagram-caption-generator",
    name: "Instagram Caption Generator",
    short: "Instagram Captions",
    tagline: "Scroll-stopping captions for any post, in seconds.",
    icon: "Camera",
    category: "Social Media",
    seoTitle: "Free Instagram Caption Generator (AI, No Sign-Up)",
    seoDescription:
      "Generate catchy Instagram captions with hashtags and emojis in seconds. Free AI Instagram caption generator — describe your photo and get scroll-stopping captions.",
    intro:
      "Describe your photo or post and get catchy, ready-to-paste Instagram captions — complete with emojis and a few relevant hashtags. Perfect for creators, brands and anyone tired of staring at a blank caption box.",
    fields: [
      { key: "topic", label: "What's the post about?", placeholder: "Sunset hike with friends in the mountains", type: "textarea", required: true },
      { key: "keywords", label: "Keywords or hashtags to include (optional)", placeholder: "#hiking, adventure, weekend", type: "text" },
    ],
    tones: DEFAULT_TONES,
    system:
      "You are an expert social media manager who writes high-engagement Instagram captions. Each caption is 1–3 short lines, may include tasteful emojis, ends with 3–5 relevant hashtags, and avoids clichés.",
    buildPrompt: (i, tone) =>
      `Write Instagram captions in a ${tone.toLowerCase()} tone for a post about: "${i.topic}".${
        i.keywords ? ` Try to weave in: ${i.keywords}.` : ""
      } Each caption should hook the reader and end with 3–5 relevant hashtags.`,
    examples: [
      "Chasing light, not perfection. ⛰️ Some views are worth every step. #hiking #goldenhour #weekendvibes #adventure",
      "Found my happy place — it has an altitude. 🌄 Tag who you'd bring next time. #mountainlife #hiking #explore #friends",
      "Tired legs, full heart, zero regrets. 💚 #trailtherapy #getoutside #hikingadventures #naturelover",
    ],
    faqs: [
      { q: "Is this Instagram caption generator free?", a: "Yes. You can generate captions for free, no sign-up required to try. Create a free account for more daily generations." },
      { q: "Does it add hashtags?", a: "Yes — each caption ends with a few relevant hashtags you can keep or swap out." },
    ],
    related: ["tiktok-bio-generator", "business-slogan-generator", "youtube-title-generator"],
  },
  {
    slug: "blog-title-generator",
    name: "Blog Title Generator",
    short: "Blog Titles",
    tagline: "Click-worthy, SEO-friendly headlines for any topic.",
    icon: "PenLine",
    category: "Writing",
    seoTitle: "Free Blog Title Generator (AI Headline Maker)",
    seoDescription:
      "Generate catchy, SEO-friendly blog titles and headlines in seconds. Free AI blog title generator — enter your topic and get click-worthy headline ideas.",
    intro:
      "Enter your topic or keyword and get a batch of catchy, SEO-friendly blog post titles. Great for bloggers, marketers and writers who want headlines that actually get clicks.",
    fields: [
      { key: "topic", label: "What is your blog post about?", placeholder: "How to start a vegetable garden for beginners", type: "textarea", required: true },
      { key: "keyword", label: "Target keyword (optional)", placeholder: "vegetable garden", type: "text" },
    ],
    tones: ["How-to", "Listicle", "Curiosity", "Professional", "Bold"],
    system:
      "You are an expert content strategist and SEO copywriter. You write blog titles that are specific, click-worthy and under 65 characters where possible, naturally including the target keyword.",
    buildPrompt: (i, tone) =>
      `Write blog post titles in a ${tone.toLowerCase()} style for an article about: "${i.topic}".${
        i.keyword ? ` Include the keyword "${i.keyword}" naturally where it fits.` : ""
      } Make them specific and click-worthy.`,
    examples: [
      "The Beginner's Guide to Starting a Vegetable Garden (No Experience Needed)",
      "7 Vegetable Garden Mistakes Beginners Make — And How to Avoid Them",
      "How to Start a Vegetable Garden This Weekend, Step by Step",
    ],
    faqs: [
      { q: "Are these blog titles SEO-friendly?", a: "Yes — enter a target keyword and the generator works it into natural, click-worthy headlines." },
      { q: "Can I use these titles commercially?", a: "Absolutely. Generated titles are yours to use on your blog, newsletter or anywhere else." },
    ],
    related: ["youtube-title-generator", "product-description-generator", "email-subject-line-generator"],
  },
  {
    slug: "product-description-generator",
    name: "Product Description Generator",
    short: "Product Descriptions",
    tagline: "Persuasive product copy that sells, instantly.",
    icon: "ShoppingBag",
    category: "Marketing",
    seoTitle: "Free Product Description Generator (AI for Ecommerce)",
    seoDescription:
      "Write persuasive product descriptions in seconds. Free AI product description generator for Shopify, Etsy and Amazon — enter product details and get ready-to-use copy.",
    intro:
      "Enter your product name and a few details, and get polished, benefit-driven product descriptions ready for Shopify, Etsy, Amazon or your own store.",
    fields: [
      { key: "product", label: "Product name", placeholder: "Handmade soy candle — Vanilla & Amber", type: "text", required: true },
      { key: "details", label: "Key features / details", placeholder: "40-hour burn time, hand-poured, reusable amber jar, all-natural", type: "textarea", required: true },
    ],
    tones: ["Premium", "Friendly", "Minimalist", "Playful", "Professional"],
    system:
      "You are an expert ecommerce copywriter. You write concise, benefit-led product descriptions (2–4 sentences) that turn features into reasons to buy, with a light, on-brand voice.",
    buildPrompt: (i, tone) =>
      `Write product descriptions in a ${tone.toLowerCase()} tone for the product "${i.product}". Key details: ${i.details}. Lead with the main benefit and keep each description to 2–4 sentences.`,
    examples: [
      "Fill any room with warmth and a soft vanilla-amber glow. Hand-poured into a reusable amber jar, this all-natural soy candle burns clean for up to 40 hours — cozy nights, sorted.",
      "Slow evenings deserve a little ritual. Our hand-poured soy candle wraps the room in vanilla and amber for 40+ hours, then leaves you a beautiful amber jar to keep.",
      "Clean-burning, hand-poured, and made to last 40 hours. Natural soy wax, a warm vanilla-amber scent, and a reusable jar you'll actually want to reuse.",
    ],
    faqs: [
      { q: "Does it work for Shopify, Etsy and Amazon?", a: "Yes — the descriptions are platform-agnostic and ready to paste into any store or marketplace listing." },
      { q: "Can I generate descriptions in bulk?", a: "Generate as many as you need. Free accounts get a daily limit; Pro is unlimited." },
    ],
    related: ["business-slogan-generator", "ad-copy-generator", "email-subject-line-generator"],
  },
  {
    slug: "email-subject-line-generator",
    name: "Email Subject Line Generator",
    short: "Email Subjects",
    tagline: "Subject lines that get your emails opened.",
    icon: "Mail",
    category: "Marketing",
    seoTitle: "Free Email Subject Line Generator (AI, Higher Open Rates)",
    seoDescription:
      "Generate catchy email subject lines that boost open rates. Free AI email subject line generator for newsletters, marketing and cold outreach.",
    intro:
      "Describe your email and get a batch of high-open-rate subject lines — for newsletters, promotions, product launches or cold outreach.",
    fields: [
      { key: "about", label: "What is the email about?", placeholder: "Summer sale — 30% off everything this weekend only", type: "textarea", required: true },
    ],
    tones: ["Catchy", "Urgent", "Professional", "Curiosity", "Friendly"],
    system:
      "You are an email marketing expert. You write subject lines under 55 characters that maximize open rate without sounding spammy, occasionally using a tasteful emoji.",
    buildPrompt: (i, tone) =>
      `Write email subject lines in a ${tone.toLowerCase()} style for an email about: "${i.about}". Keep them under 55 characters and avoid spammy words.`,
    examples: [
      "Your weekend just got 30% better 🛍️",
      "48 hours. 30% off everything. Go.",
      "Psst… everything's 30% off (this weekend only)",
    ],
    faqs: [
      { q: "Will these improve my open rates?", a: "Strong subject lines are one of the biggest levers on open rate. Generate several and A/B test the top two." },
      { q: "Do they work for cold email?", a: "Yes — pick the 'Professional' or 'Curiosity' tone for outreach and keep it short." },
    ],
    related: ["ad-copy-generator", "product-description-generator", "blog-title-generator"],
  },
  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    short: "YouTube Titles",
    tagline: "High-CTR video titles your audience can't ignore.",
    icon: "Video",
    category: "Social Media",
    seoTitle: "Free YouTube Title Generator (AI, High CTR)",
    seoDescription:
      "Generate clickable, high-CTR YouTube video titles in seconds. Free AI YouTube title generator — enter your video topic and get title ideas that get views.",
    intro:
      "Tell us what your video is about and get a batch of clickable, high-CTR YouTube titles — optimized to earn the click without going full clickbait.",
    fields: [
      { key: "topic", label: "What is your video about?", placeholder: "Beginner guitar lesson — first 5 chords to learn", type: "textarea", required: true },
    ],
    tones: ["High-CTR", "How-to", "Listicle", "Bold", "Curiosity"],
    system:
      "You are a YouTube growth expert. You write video titles under 70 characters that maximize click-through rate using curiosity, specificity and numbers, without misleading clickbait.",
    buildPrompt: (i, tone) =>
      `Write YouTube video titles in a ${tone.toLowerCase()} style for a video about: "${i.topic}". Keep them under 70 characters and optimized for click-through.`,
    examples: [
      "The Only 5 Guitar Chords Beginners Actually Need",
      "Play Your First Song in 20 Minutes (5 Easy Chords)",
      "I Wish I Learned These 5 Chords First (Beginner Guitar)",
    ],
    faqs: [
      { q: "Are the titles within YouTube's length limit?", a: "Yes — they're kept short enough to display fully on desktop and mobile (~70 characters)." },
      { q: "Is it really free?", a: "Yes. Try it with no sign-up; create a free account for more generations per day." },
    ],
    related: ["blog-title-generator", "instagram-caption-generator", "tiktok-bio-generator"],
  },
  {
    slug: "business-slogan-generator",
    name: "Business Slogan Generator",
    short: "Slogans",
    tagline: "Memorable taglines and slogans for your brand.",
    icon: "Megaphone",
    category: "Marketing",
    seoTitle: "Free Business Slogan & Tagline Generator (AI)",
    seoDescription:
      "Generate catchy business slogans and taglines in seconds. Free AI slogan generator — describe your business and get memorable tagline ideas for your brand.",
    intro:
      "Describe your business and get a batch of short, memorable slogans and taglines — perfect for logos, landing pages, packaging and ads.",
    fields: [
      { key: "business", label: "Business name or type", placeholder: "A mobile dog-grooming service called Pawfect", type: "text", required: true },
      { key: "audience", label: "What makes it special? (optional)", placeholder: "we come to your home, stress-free for pets", type: "text" },
    ],
    tones: ["Catchy", "Premium", "Playful", "Bold", "Trustworthy"],
    system:
      "You are a brand strategist. You write slogans that are short (2–6 words), memorable and easy to say, capturing the brand's main promise.",
    buildPrompt: (i, tone) =>
      `Write ${tone.toLowerCase()} slogans/taglines for: "${i.business}".${
        i.audience ? ` What makes it special: ${i.audience}.` : ""
      } Keep each to 2–6 words and make them memorable.`,
    examples: ["Grooming that comes to you.", "Pawfect, every time.", "Happy pets, zero stress."],
    faqs: [
      { q: "How long are the slogans?", a: "Short and punchy — usually 2 to 6 words, the sweet spot for memorability." },
      { q: "Can I trademark a generated slogan?", a: "You're free to use them, but run a trademark search before registering any slogan commercially." },
    ],
    related: ["product-description-generator", "ad-copy-generator", "tiktok-bio-generator"],
  },
  {
    slug: "ad-copy-generator",
    name: "Ad Copy Generator",
    short: "Ad Copy",
    tagline: "Convert-ready ads for Google, Facebook & Instagram.",
    icon: "Megaphone",
    category: "Marketing",
    seoTitle: "Free Ad Copy Generator (AI for Facebook & Google Ads)",
    seoDescription:
      "Write high-converting ad copy in seconds. Free AI ad copy generator for Facebook, Instagram and Google Ads — describe your offer and get ready-to-run ads.",
    intro:
      "Describe your product and offer, and get ready-to-run ad copy with a hook, a benefit and a clear call to action — built for Facebook, Instagram and Google Ads.",
    fields: [
      { key: "product", label: "Product or service", placeholder: "Online course teaching watercolor painting", type: "text", required: true },
      { key: "offer", label: "Offer / call to action (optional)", placeholder: "First lesson free, join 10,000 students", type: "text" },
    ],
    tones: ["Persuasive", "Friendly", "Urgent", "Bold", "Professional"],
    system:
      "You are a direct-response advertising copywriter. You write short ads with a scroll-stopping hook, one clear benefit and a strong call to action, suitable for paid social and search.",
    buildPrompt: (i, tone) =>
      `Write ${tone.toLowerCase()} ad copy for: "${i.product}".${
        i.offer ? ` Offer/CTA: ${i.offer}.` : ""
      } Each ad needs a hook, one key benefit and a clear call to action. Keep it tight.`,
    examples: [
      "Always wanted to paint? Start today. 🎨 Your first watercolor lesson is free — join 10,000+ students learning at their own pace. Tap to begin.",
      "You're 1 brushstroke away from a new hobby. Free first lesson, beginner-friendly, learn at home. Start painting today →",
      "No talent required — just a brush. Learn watercolor step by step with 10,000+ students. Claim your free lesson now.",
    ],
    faqs: [
      { q: "Which platforms is this for?", a: "The copy works for Facebook, Instagram and Google Ads. Generate a few and test the strongest performer." },
      { q: "Does it follow ad policies?", a: "It avoids obvious policy triggers, but always review against each platform's advertising policies before publishing." },
    ],
    related: ["email-subject-line-generator", "product-description-generator", "business-slogan-generator"],
  },
  {
    slug: "tiktok-bio-generator",
    name: "TikTok Bio Generator",
    short: "TikTok Bios",
    tagline: "A bio that makes people hit follow.",
    icon: "Sparkles",
    category: "Social Media",
    seoTitle: "Free TikTok Bio Generator (AI, with Emojis)",
    seoDescription:
      "Generate a catchy TikTok bio in seconds. Free AI TikTok bio generator with emojis — describe yourself and get aesthetic, follow-worthy bio ideas.",
    intro:
      "Tell us who you are and what you post, and get short, aesthetic TikTok bios (with emojis) that turn profile visits into follows. Works great for Instagram and X too.",
    fields: [
      { key: "about", label: "Who are you / what do you post?", placeholder: "fitness creator sharing home workouts and healthy recipes", type: "textarea", required: true },
    ],
    tones: ["Aesthetic", "Funny", "Bold", "Minimalist", "Inspirational"],
    system:
      "You are a social media expert. You write very short profile bios (under 80 characters) that are catchy and use tasteful emojis and line breaks where helpful.",
    buildPrompt: (i, tone) =>
      `Write ${tone.toLowerCase()} TikTok bios for someone described as: "${i.about}". Keep each under 80 characters, use tasteful emojis, and make people want to follow.`,
    examples: [
      "home workouts that actually fit your life 🏋️‍♀️ | recipes ⬇️",
      "no gym, no excuses 💪 daily workouts + easy healthy eats 🥗",
      "your hype friend for fitness 🌟 sweat • snack • repeat",
    ],
    faqs: [
      { q: "Does it work for Instagram and X?", a: "Yes — the bios are short enough for TikTok, Instagram and X (Twitter) profiles." },
      { q: "Will it add emojis?", a: "Yes, tasteful emojis are included by default. Pick the 'Minimalist' tone if you'd prefer fewer." },
    ],
    related: ["instagram-caption-generator", "business-slogan-generator", "youtube-title-generator"],
  },
  {
    slug: "linkedin-post-generator",
    name: "LinkedIn Post Generator",
    short: "LinkedIn Posts",
    tagline: "Engaging LinkedIn posts that build your personal brand.",
    icon: "Briefcase",
    category: "Career",
    seoTitle: "Free LinkedIn Post Generator (AI, High Engagement)",
    seoDescription:
      "Generate engaging LinkedIn posts in seconds. Free AI LinkedIn post generator — turn an idea into a scroll-stopping post with a strong hook and clear takeaway.",
    intro:
      "Turn a rough idea into a polished, engagement-ready LinkedIn post — with a strong opening hook, skimmable lines and a question that sparks comments.",
    fields: [
      { key: "idea", label: "What do you want to post about?", placeholder: "A lesson I learned after my first year freelancing", type: "textarea", required: true },
    ],
    tones: ["Professional", "Story", "Thought-leadership", "Conversational", "Bold"],
    system:
      "You are a LinkedIn ghostwriter. You open with a one-line scroll-stopping hook, use short one- to two-line paragraphs with line breaks, deliver one clear insight, and end with a question that invites comments. Use at most 3 relevant hashtags.",
    buildPrompt: (i, tone) =>
      `Write LinkedIn posts in a ${tone.toLowerCase()} style about: "${i.idea}". Start with a strong hook line, keep paragraphs short and skimmable, and end with a question to drive engagement.`,
    examples: [
      "I almost quit freelancing after month one.\n\nNo clients. No pipeline. Just doubt.\n\nThen I changed one thing: I stopped pitching services and started sharing what I knew, publicly, every day.\n\n90 days later my inbox looked completely different.\n\nWhat's the one habit that changed your career?",
      "Nobody tells you this about your first year freelancing:\n\nThe hardest part isn't the work. It's the silence between projects.\n\nWhat got me through it: a simple daily routine and a public learning habit.\n\nIf you're in the quiet right now — keep going. What helped you push through?",
      "Year one of freelancing taught me more than any course:\n\n→ Consistency beats talent\n→ Visibility beats perfection\n→ Relationships beat cold pitches\n\nWhich one took you the longest to learn?",
    ],
    faqs: [
      { q: "Will these posts get engagement?", a: "They're built around a hook and a comment-driving question — the two biggest levers for LinkedIn reach. Post a few and see what resonates with your audience." },
      { q: "Can I edit the posts?", a: "Yes — treat them as a strong first draft, then add your own specifics and voice." },
    ],
    related: ["cover-letter-generator", "x-post-generator", "blog-title-generator"],
  },
  {
    slug: "cover-letter-generator",
    name: "Cover Letter Generator",
    short: "Cover Letters",
    tagline: "A tailored cover letter that gets you interviews.",
    icon: "FileText",
    category: "Career",
    seoTitle: "Free Cover Letter Generator (AI, Tailored in Seconds)",
    seoDescription:
      "Write a professional cover letter in seconds. Free AI cover letter generator — enter the role and your highlights and get a tailored, interview-winning letter.",
    intro:
      "Enter the role you're applying for and a few of your highlights, and get a tailored, professional cover letter you can send today — no staring at a blank page.",
    fields: [
      { key: "role", label: "Role you're applying for", placeholder: "Marketing Coordinator at Acme Co.", type: "text", required: true },
      { key: "highlights", label: "Your top skills / achievements", placeholder: "3 years in social media, grew followers 4x, fluent in analytics", type: "textarea", required: true },
    ],
    tones: ["Professional", "Enthusiastic", "Confident", "Concise"],
    system:
      "You are an expert career coach. You write tailored cover letters of about three short paragraphs: an engaging opening, a middle that connects the candidate's achievements to the role, and a confident closing with a call to action. No clichés like 'I am writing to apply'.",
    buildPrompt: (i, tone) =>
      `Write a ${tone.toLowerCase()} cover letter for the role "${i.role}". The candidate's highlights: ${i.highlights}. Keep it to three short paragraphs, specific and confident, avoiding generic filler.`,
    examples: [
      "When I saw the Marketing Coordinator opening at Acme Co., it felt like a perfect match for where I've been heading. Over the last three years I've lived and breathed social media — and I'd love to bring that energy to your team.\n\nIn my current role I grew our following 4x in 18 months by pairing a consistent content calendar with weekly analytics reviews. I'm comfortable owning a channel end to end, from idea to report.\n\nI'd welcome the chance to talk about how I can help Acme grow. Thank you for your time and consideration.",
      "I've been following Acme Co. for a while, so the Marketing Coordinator role immediately caught my eye. Social media is where I do my best work, and I'd be thrilled to do it for your brand.\n\nAt my current company I 4x'd our audience in under two years and built the reporting habits that kept that growth on track. I move fast, test often, and let the data lead.\n\nI'd love to discuss how I can contribute. Thanks so much for considering my application.",
      "The Marketing Coordinator position at Acme Co. is exactly the kind of role I've been working toward. I bring three years of hands-on social media experience and a track record of measurable growth.\n\nMy proudest result: growing our following fourfold by combining a disciplined content calendar with rigorous weekly analysis. I'm fluent in turning numbers into next steps.\n\nI'd be glad to share more in an interview. Thank you for your consideration.",
    ],
    faqs: [
      { q: "Is this cover letter generator free?", a: "Yes — generate a tailored cover letter for free. Sign up for more per day, or go Pro for unlimited." },
      { q: "Should I edit the letter before sending?", a: "Always add the company name, the hiring manager if you know it, and one specific detail about why you want this role." },
    ],
    related: ["linkedin-post-generator", "cold-email-generator", "business-slogan-generator"],
  },
  {
    slug: "paraphrasing-tool",
    name: "Paraphrasing Tool",
    short: "Paraphraser",
    tagline: "Reword any text while keeping the meaning.",
    icon: "Repeat",
    category: "Writing",
    seoTitle: "Free Paraphrasing Tool (AI Reworder & Rephraser)",
    seoDescription:
      "Paraphrase and reword any text in seconds. Free AI paraphrasing tool — rewrite sentences clearly while keeping the original meaning. No sign-up to try.",
    intro:
      "Paste a sentence or paragraph and get clear, natural rewordings that keep your meaning intact — great for fixing clunky lines, avoiding repetition or finding a fresh way to say something.",
    fields: [
      { key: "text", label: "Text to paraphrase", placeholder: "Our product helps small businesses save time on social media.", type: "textarea", required: true },
    ],
    tones: ["Standard", "Formal", "Simple", "Creative", "Fluent"],
    system:
      "You are an expert editor. You rewrite text to be clear and natural while preserving the original meaning. Each variation is a genuinely different rephrasing, not a synonym swap.",
    buildPrompt: (i, tone) =>
      `Paraphrase the following text in a ${tone.toLowerCase()} style, keeping the meaning intact and making each version distinct:\n\n"${i.text}"`,
    examples: [
      "Our platform gives small businesses back the hours they'd otherwise lose to social media.",
      "We help small businesses spend less time on social media and more time running their business.",
      "Small businesses use our product to handle social media faster and reclaim their time.",
    ],
    faqs: [
      { q: "Does it keep the original meaning?", a: "Yes — the tool rewrites for clarity and flow while preserving what you meant. Always re-read to confirm the nuance is right." },
      { q: "Can I use it to avoid repetition?", a: "Absolutely — generate a few versions and pick the one that fits the surrounding text best." },
    ],
    related: ["text-summarizer", "blog-title-generator", "product-description-generator"],
  },
  {
    slug: "text-summarizer",
    name: "Text Summarizer",
    short: "Summarizer",
    tagline: "Turn long text into a clear, short summary.",
    icon: "AlignLeft",
    category: "Writing",
    seoTitle: "Free Text Summarizer (AI Summary Generator)",
    seoDescription:
      "Summarize long text in seconds. Free AI text summarizer — paste an article, email or notes and get a clear, concise summary or key takeaways. No sign-up.",
    intro:
      "Paste a long article, email thread or set of notes and get a clear, concise summary in seconds — choose bullet points, a TL;DR or the key takeaways.",
    fields: [
      { key: "text", label: "Text to summarize", placeholder: "Paste the article or text you want summarized…", type: "textarea", required: true },
    ],
    tones: ["Bullet points", "One paragraph", "TL;DR", "Key takeaways"],
    system:
      "You are an expert at distilling information. You produce accurate, concise summaries that capture the main points without adding new information. Match the requested format.",
    buildPrompt: (i, tone) =>
      `Summarize the following text as "${tone}". Be accurate and concise, and do not add information that isn't in the text:\n\n"${i.text}"`,
    examples: [
      "• The product saves small businesses time on social media\n• It automates posting and reporting\n• Users reclaim hours each week",
      "TL;DR: A tool that automates social media for small businesses so owners can save time and focus on running their company.",
      "Key takeaway: Small businesses lose hours to social media — this product automates the busywork so they can get that time back.",
    ],
    faqs: [
      { q: "How long can the text be?", a: "You can paste long passages. For very large documents, summarize section by section for the best results." },
      { q: "Is the summary accurate?", a: "It sticks to what's in your text and avoids inventing details — but always skim the result to confirm it captured what matters to you." },
    ],
    related: ["paraphrasing-tool", "blog-title-generator", "email-subject-line-generator"],
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    short: "Hashtags",
    tagline: "Relevant hashtags to grow your reach.",
    icon: "Hash",
    category: "Social Media",
    seoTitle: "Free Hashtag Generator (AI, for Instagram & TikTok)",
    seoDescription:
      "Generate relevant hashtags in seconds. Free AI hashtag generator for Instagram, TikTok and more — enter your topic and get a mix of popular and niche hashtags.",
    intro:
      "Enter your post topic and get ready-to-paste hashtag sets — a smart mix of popular and niche tags to help the right people discover your content.",
    fields: [
      { key: "topic", label: "What's your post about?", placeholder: "Vegan meal prep recipes", type: "text", required: true },
    ],
    tones: ["Mixed", "Niche", "Popular", "Branded"],
    system:
      "You are a social media growth expert. You produce sets of 10–15 relevant, correctly formatted hashtags blending broad-reach and niche tags. No banned or spammy tags.",
    buildPrompt: (i, tone) =>
      `Generate ${tone.toLowerCase()} hashtag sets for a post about: "${i.topic}". Each set should have 10–15 relevant hashtags blending popular and niche tags.`,
    examples: [
      "#veganmealprep #plantbased #veganrecipes #mealprep #vegansofig #healthyeating #veganfood #mealprepsunday #plantpower #veganlife #easyvegan #whatveganseat",
      "#veganmealprep #highproteinvegan #budgetvegan #mealprepideas #veganmeals #plantbasedmealprep #veganbatchcooking #veganonabudget #weeklymealprep #crueltyfreefood",
      "#veganmealprep #vegancommunity #plantbasedeating #mealprepgoals #veganfoodshare #healthyvegan #mealpreplife #veganinspiration #plantbasedrecipes #eatmoreplants",
    ],
    faqs: [
      { q: "How many hashtags should I use?", a: "A set of 10–15 targeted hashtags is a good range for most platforms. Mix broad and niche tags so you're not lost in the biggest feeds." },
      { q: "Are these hashtags safe to use?", a: "The generator avoids known banned or spammy tags, but it's smart to glance through before posting." },
    ],
    related: ["instagram-caption-generator", "tiktok-bio-generator", "youtube-title-generator"],
  },
  {
    slug: "cold-email-generator",
    name: "Cold Email Generator",
    short: "Cold Emails",
    tagline: "Cold emails that actually get replies.",
    icon: "Send",
    category: "Marketing",
    seoTitle: "Free Cold Email Generator (AI for Sales & Outreach)",
    seoDescription:
      "Write cold emails that get replies. Free AI cold email generator for sales and outreach — describe your offer and get short, personalized emails with a clear CTA.",
    intro:
      "Describe what you're offering and who you're emailing, and get short, personalized cold emails built to get opened and answered — with a clear, low-friction call to action.",
    fields: [
      { key: "offer", label: "What are you offering?", placeholder: "A service that designs Shopify product pages that convert", type: "text", required: true },
      { key: "recipient", label: "Who are you emailing? (optional)", placeholder: "Founders of small ecommerce brands", type: "text" },
    ],
    tones: ["Friendly", "Direct", "Professional", "Casual"],
    system:
      "You are a cold email expert. You write short emails (under 120 words) with a personalized opener, one clear value proposition, social proof if natural, and a single low-friction call to action. No spammy language or hard selling.",
    buildPrompt: (i, tone) =>
      `Write ${tone.toLowerCase()} cold emails offering: "${i.offer}".${
        i.recipient ? ` Recipient: ${i.recipient}.` : ""
      } Keep each under 120 words with a personalized opener and one clear, low-friction call to action.`,
    examples: [
      "Subject: quick idea for your product pages\n\nHi [Name] — I came across [Brand] and loved your products, but noticed the product pages could convert harder.\n\nI design Shopify product pages that turn more browsers into buyers (one client saw +22% in 30 days).\n\nWorth a quick look? Happy to send a free mockup of your best-seller — just reply 'yes'.\n\nBest,\n[You]",
      "Subject: a free mockup for [Brand]?\n\nHey [Name], big fan of what you're building at [Brand].\n\nI help small ecommerce brands redesign product pages to lift conversions — usually the fastest revenue win that doesn't need more ad spend.\n\nWant me to mock up your top product, free, so you can see the difference? Just say the word.\n\n[You]",
      "Subject: turning browsers into buyers\n\nHi [Name] — your products deserve pages that sell as well as they look.\n\nI redesign Shopify product pages for conversion; recent client: +22% sales in a month.\n\nCan I send one free example using your best-seller? Reply and I'll get started.\n\nThanks,\n[You]",
    ],
    faqs: [
      { q: "Will these get past spam filters?", a: "They avoid common spam triggers and stay short and personal, which helps. Always send from a warmed-up domain and personalize the brackets." },
      { q: "How do I personalize them?", a: "Replace the [Name], [Brand] and offer details, and add one genuine, specific observation about the recipient." },
    ],
    related: ["email-subject-line-generator", "ad-copy-generator", "cover-letter-generator"],
  },
  {
    slug: "meta-description-generator",
    name: "Meta Description Generator",
    short: "Meta Descriptions",
    tagline: "Click-worthy SEO meta descriptions under 155 characters.",
    icon: "Search",
    category: "Marketing",
    seoTitle: "Free Meta Description Generator (AI, SEO-Optimized)",
    seoDescription:
      "Generate SEO meta descriptions in seconds. Free AI meta description generator — enter your page topic and keyword and get click-worthy descriptions under 155 characters.",
    intro:
      "Enter your page topic and target keyword and get click-worthy meta descriptions — kept under 155 characters and written to lift your click-through rate from Google.",
    fields: [
      { key: "page", label: "Page topic or title", placeholder: "Best running shoes for beginners in 2026", type: "text", required: true },
      { key: "keyword", label: "Target keyword (optional)", placeholder: "running shoes for beginners", type: "text" },
    ],
    tones: ["Compelling", "Informative", "Action-oriented"],
    system:
      "You are an SEO copywriter. You write meta descriptions under 155 characters that include the target keyword naturally, summarize the page, and include a subtle call to action to maximize click-through rate.",
    buildPrompt: (i, tone) =>
      `Write ${tone.toLowerCase()} SEO meta descriptions for a page about: "${i.page}".${
        i.keyword ? ` Include the keyword "${i.keyword}" naturally.` : ""
      } Keep each under 155 characters with a subtle call to action.`,
    examples: [
      "New to running? Discover the best running shoes for beginners in 2026 — comfort, support and value compared, so you can lace up with confidence.",
      "Find the best running shoes for beginners in 2026. We compare cushioning, fit and price to help you pick the perfect first pair. Start running today.",
      "The best beginner running shoes of 2026, ranked. Comfort-first picks for every budget — find your perfect match and hit the ground running.",
    ],
    faqs: [
      { q: "Why under 155 characters?", a: "Google typically truncates descriptions beyond ~155–160 characters, so staying under keeps your full message visible in search results." },
      { q: "Does it include my keyword?", a: "Yes — add a target keyword and it's woven in naturally, which can improve relevance and click-through." },
    ],
    related: ["blog-title-generator", "product-description-generator", "ad-copy-generator"],
  },
  {
    slug: "review-response-generator",
    name: "Review Response Generator",
    short: "Review Replies",
    tagline: "Professional replies to customer reviews, fast.",
    icon: "Star",
    category: "Marketing",
    seoTitle: "Free Review Response Generator (AI for Google & Yelp)",
    seoDescription:
      "Respond to customer reviews in seconds. Free AI review response generator for Google, Yelp and more — paste a review and get a professional, on-brand reply.",
    intro:
      "Paste a customer review — positive or negative — and get a professional, on-brand reply you can post in seconds. Responding to reviews builds trust and helps local SEO.",
    fields: [
      { key: "review", label: "The customer's review", placeholder: "Great food but we waited 40 minutes for a table.", type: "textarea", required: true },
      { key: "business", label: "Business name (optional)", placeholder: "Bella's Trattoria", type: "text" },
    ],
    tones: ["Grateful", "Professional", "Apologetic", "Warm"],
    system:
      "You are a customer experience expert. You write concise, sincere replies to reviews: thank the customer, address their specific points, stay positive and professional even with criticism, and invite them back. Never be defensive.",
    buildPrompt: (i, tone) =>
      `Write ${tone.toLowerCase()} replies to this customer review${
        i.business ? ` for ${i.business}` : ""
      }. Address the specific points, stay professional and warm, and invite them back:\n\n"${i.review}"`,
    examples: [
      "Thank you so much for the kind words about our food! You're absolutely right that the wait was longer than we'd like — we're adding staff on weekends to fix exactly that. We'd love to make your next visit perfect. See you soon!",
      "We really appreciate you taking the time to review us — and we're thrilled you enjoyed the food! The 40-minute wait isn't the experience we want for you, and we're actively working on our weekend seating. Please come back and let us make it right.",
      "Thanks for your honest feedback! It means a lot that you loved the food. We hear you on the wait time and are making changes to speed things up during busy hours. We hope to welcome you back soon for a smoother visit.",
    ],
    faqs: [
      { q: "Does it handle negative reviews?", a: "Yes — pick the 'Apologetic' or 'Professional' tone and it responds calmly, addresses the issue, and invites the customer back without being defensive." },
      { q: "Why respond to reviews at all?", a: "Replying to reviews builds trust with future customers and is a positive signal for local SEO on Google and similar platforms." },
    ],
    related: ["business-slogan-generator", "ad-copy-generator", "product-description-generator"],
  },
  {
    slug: "x-post-generator",
    name: "X Post Generator",
    short: "X / Twitter Posts",
    tagline: "Punchy posts and threads for X (Twitter).",
    icon: "Send",
    category: "Social Media",
    seoTitle: "Free X (Twitter) Post Generator (AI Tweet Maker)",
    seoDescription:
      "Generate punchy X (Twitter) posts in seconds. Free AI tweet generator — turn an idea into scroll-stopping posts optimized for engagement and reach.",
    intro:
      "Turn an idea into punchy, scroll-stopping posts for X (Twitter) — tight, quotable, and built to earn likes, replies and reposts.",
    fields: [
      { key: "idea", label: "What do you want to post about?", placeholder: "Why most to-do lists fail", type: "textarea", required: true },
    ],
    tones: ["Punchy", "Witty", "Insightful", "Contrarian", "Inspirational"],
    system:
      "You are a viral X (Twitter) writer. You write tight posts under 280 characters that are quotable and engaging — strong hooks, clean line breaks, no hashtag spam.",
    buildPrompt: (i, tone) =>
      `Write ${tone.toLowerCase()} X (Twitter) posts about: "${i.idea}". Keep each under 280 characters, punchy and quotable, with a strong hook and no hashtag spam.`,
    examples: [
      "Most to-do lists fail for one reason:\n\nThey're a list of wishes, not a plan.\n\nPick 3. Time-block them. Ignore the rest.",
      "Your to-do list isn't too long.\n\nIt's too vague.\n\n'Work on launch' → 'Write 3 launch emails by noon'.\n\nClarity beats motivation.",
      "Nobody finishes a 20-item to-do list.\n\nEveryone finishes a 3-item one.\n\nShrink the list. Grow the output.",
    ],
    faqs: [
      { q: "Are the posts within the character limit?", a: "Yes — each post is kept under 280 characters so it fits without being cut off." },
      { q: "Can it write threads?", a: "Each generation gives you several standalone posts; string the best ones together to form a thread." },
    ],
    related: ["instagram-caption-generator", "linkedin-post-generator", "hashtag-generator"],
  },
];

const bySlug = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): Tool | undefined {
  return bySlug.get(slug);
}

export const toolCategories = Array.from(new Set(tools.map((t) => t.category)));
