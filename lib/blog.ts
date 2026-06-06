export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO date */
  date: string;
  readMins: number;
  category: string;
  /** Slug of the tool this post promotes. */
  tool: string;
  /** Post body as trusted HTML (authored in this file). */
  body: string;
}

export const posts: BlogPost[] = [
  {
    slug: "how-to-write-instagram-captions",
    title: "How to Write Instagram Captions That Get Engagement (with Examples)",
    description:
      "A simple, repeatable formula for writing Instagram captions that stop the scroll and earn comments — plus real examples and a free caption generator.",
    date: "2026-06-02",
    readMins: 6,
    category: "Social Media",
    tool: "instagram-caption-generator",
    body: `
<p>Your photo gets people to stop. Your <strong>caption</strong> gets them to care, comment, and follow. Yet most captions are an afterthought — a single emoji, or a flat description of what's already in the image. Here's a simple framework you can reuse for every post.</p>

<h2>The 3-part caption formula</h2>
<p>Great captions almost always follow the same shape:</p>
<ol>
<li><strong>The hook</strong> — a first line that creates curiosity or emotion. This is the only part visible before the "more" cut, so it has to earn the tap.</li>
<li><strong>The value or story</strong> — one or two short lines that pay off the hook with a tip, a feeling, or a tiny story.</li>
<li><strong>The call to action</strong> — a question or prompt that makes commenting easy.</li>
</ol>

<h3>Example</h3>
<blockquote>Chasing light, not perfection. ⛰️<br/>Some views are worth every single step.<br/>Where's the best sunset you've ever seen? 👇</blockquote>
<p>Notice the hook ("Chasing light, not perfection") works on its own, and the question invites a one-word reply — the easiest kind of comment to leave.</p>

<h2>5 rules for higher-engagement captions</h2>
<ul>
<li><strong>Front-load the hook.</strong> Put your most interesting words first. Don't waste the opening line on "Had such a great day…"</li>
<li><strong>Write like you talk.</strong> Short sentences. Line breaks. One idea per line.</li>
<li><strong>Ask a real question.</strong> "Thoughts?" is weak. "Which one would you pick — 1 or 2?" gets replies.</li>
<li><strong>Use 3–5 relevant hashtags,</strong> not 30. Mix one or two big tags with niche ones. (Our <a href="/tools/hashtag-generator">hashtag generator</a> does this for you.)</li>
<li><strong>End with a reason to act</strong> — comment, save, share, or tap the link.</li>
</ul>

<h2>The fastest way to do all of this</h2>
<p>If you'd rather not start from a blank box every time, describe your post and let AI draft a few options for you. Our free <a href="/tools/instagram-caption-generator">Instagram caption generator</a> writes scroll-stopping captions — complete with a hook, emojis, and relevant hashtags — in seconds. Generate three, pick your favorite, tweak it in your own voice, and post.</p>

<p>Consistency beats perfection. Use the formula above, post regularly, and pay attention to which hooks earn the most comments — then do more of that.</p>
`,
  },
  {
    slug: "blog-title-formulas-that-get-clicks",
    title: "12 Blog Title Formulas That Get More Clicks",
    description:
      "Twelve proven headline formulas that boost click-through from Google and social — with examples you can copy, plus a free blog title generator.",
    date: "2026-06-03",
    readMins: 7,
    category: "Writing",
    tool: "blog-title-generator",
    body: `
<p>You can write the best article on the internet, but if the <strong>title</strong> doesn't earn the click, nobody reads it. The good news: clickable titles aren't magic — they follow patterns. Here are 12 formulas that consistently win, with examples.</p>

<h2>How-to and guide formulas</h2>
<ul>
<li><strong>How to [Result] (Without [Pain])</strong> — "How to Start a Garden Without Killing Every Plant"</li>
<li><strong>The Beginner's Guide to [Topic]</strong> — "The Beginner's Guide to Index Investing"</li>
<li><strong>How to [Result] in [Time]</strong> — "How to Learn 5 Guitar Chords in One Weekend"</li>
</ul>

<h2>List formulas</h2>
<ul>
<li><strong>[Number] Ways to [Result]</strong> — "9 Ways to Save Money on Groceries"</li>
<li><strong>[Number] [Topic] Mistakes (and How to Fix Them)</strong> — "7 Resume Mistakes That Cost You Interviews"</li>
<li><strong>[Number] [Tools/Tips] That [Benefit]</strong> — "12 Free Tools That Save Marketers Hours"</li>
</ul>

<h2>Curiosity and contrarian formulas</h2>
<ul>
<li><strong>Why [Common Belief] Is Wrong</strong> — "Why 'Follow Your Passion' Is Terrible Advice"</li>
<li><strong>What Nobody Tells You About [Topic]</strong> — "What Nobody Tells You About Freelancing"</li>
<li><strong>The [Adjective] Truth About [Topic]</strong> — "The Uncomfortable Truth About Side Hustles"</li>
</ul>

<h2>Results and proof formulas</h2>
<ul>
<li><strong>I [Did Thing] for [Time]. Here's What Happened.</strong> — "I Woke Up at 5am for 30 Days. Here's What Happened."</li>
<li><strong>How [Person/Company] [Achieved Result]</strong> — "How a Solo Founder Hit $10k/Month"</li>
<li><strong>[Result] — Here's Exactly How</strong> — "We Doubled Traffic in 90 Days — Here's Exactly How"</li>
</ul>

<h2>3 quick rules</h2>
<ul>
<li><strong>Be specific.</strong> Numbers and concrete outcomes beat vague promises.</li>
<li><strong>Keep it under ~60 characters</strong> so it doesn't get cut off in search results.</li>
<li><strong>Promise one clear benefit</strong> — don't try to cram three ideas into one title.</li>
</ul>

<h2>Generate ten titles in five seconds</h2>
<p>Stuck choosing? Drop your topic into our free <a href="/tools/blog-title-generator">blog title generator</a> and get a batch of click-worthy options using these exact formulas. Then run your top two as an A/B test — the data will tell you which hook your audience prefers. Pair it with our <a href="/tools/meta-description-generator">meta description generator</a> to finish your on-page SEO.</p>
`,
  },
  {
    slug: "how-to-write-a-cover-letter",
    title: "How to Write a Cover Letter That Lands Interviews",
    description:
      "A clear, modern structure for cover letters that actually get read — what to include, what to cut, and a free cover letter generator to do it in seconds.",
    date: "2026-06-04",
    readMins: 6,
    category: "Career",
    tool: "cover-letter-generator",
    body: `
<p>Most cover letters are skimmed in seconds — or skipped entirely. The ones that work are short, specific, and clearly about <em>this</em> job, not a generic template. Here's a structure you can reuse for every application.</p>

<h2>The 3-paragraph structure</h2>
<h3>1. The opening (2–3 sentences)</h3>
<p>Skip "I am writing to apply for…" — the reader already knows. Open with genuine interest and a hint of fit:</p>
<blockquote>When I saw the Marketing Coordinator opening at Acme, it felt like a perfect match for where I've been heading. Social media is where I do my best work.</blockquote>

<h3>2. The proof (3–4 sentences)</h3>
<p>Connect <strong>one or two real achievements</strong> to what the role needs. Use numbers — they're concrete and memorable:</p>
<blockquote>In my current role I grew our following 4x in 18 months by pairing a consistent content calendar with weekly analytics reviews.</blockquote>
<p>Don't restate your whole résumé. Pick the highlights most relevant to this job.</p>

<h3>3. The close (1–2 sentences)</h3>
<p>Be warm and confident, and invite the next step:</p>
<blockquote>I'd welcome the chance to talk about how I can help Acme grow. Thank you for your consideration.</blockquote>

<h2>What to cut</h2>
<ul>
<li><strong>Clichés</strong> — "team player," "hard worker," "I am writing to apply."</li>
<li><strong>Your life story</strong> — keep it to what's relevant to the role.</li>
<li><strong>Repeating your résumé</strong> line by line. The letter adds context, not a duplicate.</li>
<li><strong>Anything over one page.</strong> Half a page is often better.</li>
</ul>

<h2>A 30-second checklist</h2>
<ul>
<li>Did you name the company and role specifically?</li>
<li>Is there at least one concrete, measurable result?</li>
<li>Could this letter <em>only</em> be for this job (not any job)?</li>
<li>Is it under one page and free of typos?</li>
</ul>

<h2>Write yours in seconds</h2>
<p>Staring at a blank page is the hardest part. Our free <a href="/tools/cover-letter-generator">cover letter generator</a> turns the role and a few of your highlights into a tailored, three-paragraph letter using the structure above. Generate it, then add the company name and one specific reason you want the job — that personal touch is what gets interviews. While you're at it, polish your <a href="/tools/linkedin-post-generator">LinkedIn presence</a> too, since recruiters almost always check.</p>
`,
  },
];

const bySlug = new Map(posts.map((p) => [p.slug, p]));

export function getPost(slug: string): BlogPost | undefined {
  return bySlug.get(slug);
}
