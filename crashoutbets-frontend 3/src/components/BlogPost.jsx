import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const apiUrl = process.env.VITE_API_BASE_URL || 'https://y0h0i3cmkmkd.manus.space';
        const response = await fetch(`${apiUrl}/api/public/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Blog post not found');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-500 mb-4">Error: {error || 'Blog post not found'}</div>
          <Link to="/blogs" className="text-green-400 hover:text-green-300">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Special handling for the Understanding Value Bets article to match original exactly
  const isValueBetsArticle = slug === 'understanding-value-bets';

  // Table of contents for the original article
  const originalTableOfContents = [
    { text: 'Introduction', id: 'introduction', color: 'bg-green-600' },
    { text: 'What is a Value Bet?', id: 'what-is-value-bet', color: 'bg-red-600' },
    { text: 'Understanding Expected Value (EV)', id: 'understanding-ev', color: 'bg-blue-600' },
    { text: 'How to Calculate a Value Bet', id: 'calculate-value-bet', color: 'bg-red-600' },
    { text: 'How to Identify and Find Value Bets', id: 'identify-value-bets', color: 'bg-gray-600' }
  ];

  // Original content for Understanding Value Bets
  const originalContent = `
## Introduction

In the ever-evolving world of sports betting, success isn't just about predicting winners — it's about identifying opportunities where the **odds are in your favor**. This concept is known as **value betting**, and it's the secret weapon used by professional bettors to maintain long-term profitability.

Whether you're wagering on the WNBA, MLB, or any other sport, understanding how to spot a **value bet** can make all the difference. Unlike casual betting, which often relies on gut feelings or hype, value betting uses logic, **expected value (EV)**, and a deep understanding of **odds vs probability** to give you a consistent edge.

In this blog, we'll break down what value betting really means, why it matters, and how you can apply it to your own betting strategy — whether you're a beginner or someone looking to refine their skills. If you've ever wondered why some bettors win more over time while others struggle to stay afloat, this is the knowledge gap that separates them.

Let's dive into the core principles that make value betting the **cornerstone of smart, data-driven betting** — and explore how you can use it to turn short-term guesses into long-term gains.

## What is a Value Bet?

### 📊 Definition Simplified

A value bet is when the odds set by a bookmaker underestimate the true probability of an event. It's like buying something on sale — you get more than what you paid for.

For instance, if a team's real chance of winning is 70% (fair odds of 1.43), but the bookmaker offers 1.90, you're getting tremendous value. Consistently finding such bets can significantly improve your long-term profits.

### 🎯 Why Do Value Bets Exist?

- **Market Inefficiencies:** Bookmakers can't always price perfectly.
- **Public Bias:** Odds shift based on betting volume, not logic.
- **Human Error:** Odds compilers may overlook injuries, news, or form.

🧠 **Example:** If Manchester United has a 65% win probability but the bookmaker offers odds of 2.00 (implying 50%), you're getting an edge.

#### 💡 Pro Insight

You don't have to win every bet. The goal is to consistently make decisions where the odds are in your favor. Over hundreds of bets, this strategy leads to a profitable edge.

##### ⚖️ Fair Odds vs. Offered Odds

Fair odds reflect real probability. If your estimated win rate is 60%, fair odds = 1.67. If you get 2.10, that's value.

##### 📈 Long-Term Strategy

Betting is not about luck, it's about playing the numbers smart. The more value bets you place, the more your bankroll grows.

## Understanding Expected Value (EV)

Expected Value (EV) is a mathematical concept used to calculate the average outcome of a bet if repeated many times. It's the true north for value bettors — helping them determine whether a bet is profitable in the long run.

**EV Formula**

EV = (Win% × WinAmount) - (Loss% × LossAmount)

#### 🎯 Scenario Example

You bet $100 on a game with a 60% chance of winning at odds of 2.0.

EV = (0.60 × 100) - (0.40 × 100) = +20

This means you're expected to profit $20 per bet over time.

🔍 **Insight**

- EV reflects long-term profitability.
- Helps ignore short-term variance.
- Essential for serious bettors.

📈 **Positive EV**

Good bets. Expect to profit over time.

📉 **Negative EV**

Bad bets. Expect to lose in the long run.

Remember: Smart betting isn't luck — it's about knowing your edge.

## How to Calculate a Value Bet

Identifying a **value bet** means spotting when the bookmaker's odds underestimate the true chance of an outcome. To do this accurately, you need to calculate the _implied probability_ from the odds and compare it with your estimated probability.

### Step-by-Step Calculation

1. **Convert odds to implied probability:**
   \`Implied Probability = 1 / Decimal Odds\`
2. **Estimate your true probability:** based on research, stats, or expert insight.
3. **Compare the two:** if your estimated probability is higher than the implied probability, you've found a value bet!

**Example:** Suppose a bookmaker offers odds of 3.0 for a team to win. The implied probability is 1/3.0 = 33.33%.

If your analysis shows the team has a 40% chance to win, this is a value bet because your estimated probability exceeds the implied probability.

Remember, consistently betting on value bets is the key to long-term success, not chasing risky favorites or gut feelings.

## How to Identify and Find Value Bets

Spotting value bets is a skill every successful bettor needs. It involves more than just picking favorites — it's about finding opportunities where the bookmaker's odds underestimate the real chance of an outcome.

- **Analyze the odds carefully:** Compare bookmaker odds with your own probability estimates. If the odds are higher than your calculated chance, you've found potential value. This margin is where profitability lies.
- **Use statistical models and data analysis:** Incorporate player form, team dynamics, injury updates, and historical data. Advanced bettors rely on algorithms and predictive models to calculate precise probabilities.
- **Understand market movements:** Watch how odds shift in the market. Significant changes can indicate insider knowledge or betting patterns worth investigating.
- **Stay disciplined and avoid emotional bets:** Emotions can cloud judgment. Always bet based on data and clear expected value rather than gut feelings or popular opinion.
- **Shop for the best odds:** Odds vary across bookmakers. By using multiple betting platforms, you can maximize returns by placing bets where odds offer the highest value.
- **Maintain thorough records:** Track all bets, outcomes, and the reasoning behind each bet. Reviewing your data helps refine your strategy and identify strengths and weaknesses.
- **Leverage technology:** Use odds comparison websites, betting calculators, and automated alerts to spot and capitalize on value bets quickly.

Mastering value betting requires patience, detailed analysis, and a disciplined approach. By consistently identifying value, you increase your chances of long-term betting success.

## Conclusion: Embrace Value Betting for Sustainable Profit

Understanding and applying value betting is essential for anyone serious about turning sports betting into a profitable venture. It shifts your focus from merely chasing wins to making informed bets that offer positive expected value. This strategic mindset is what separates consistent winners from casual bettors.

By analyzing odds and comparing them with your own calculated probabilities, you can identify bets that are undervalued by bookmakers. Betting on these "value bets" increases your chances of long-term profitability, even if you lose some short-term wagers.

> "Patience and discipline in value betting can transform your betting experience, turning luck into skill."

Keep in mind, successful value betting requires:

- Continuous research and data analysis to refine your probability models.
- Keeping emotions in check and avoiding impulsive bets driven by personal bias.
- Maintaining proper bankroll management to weather inevitable downswings.
- Tracking your bets meticulously to understand your performance and improve over time.

The sports betting landscape is always evolving, and bookmakers adjust odds constantly. Staying informed and adapting your strategies is key to staying ahead of the curve.

Ready to elevate your betting game? Visit [crashoutbets.com]() — your go-to platform for real-time EV odds, detailed betting insights, and expertly curated "Picks of the Hour." We help you make smarter, data-driven bets and stay ahead with up-to-date analytics all in one place.
  `;

  // Convert markdown-like content to HTML with proper styling
  const formatContent = (content) => {
    return content
      .replace(/^## (.+)$/gm, '<h2 id="$1" class="text-3xl font-bold text-white mb-6 mt-12">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-white mb-4 mt-8">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold text-white mb-3 mt-6">$1</h4>')
      .replace(/^##### (.+)$/gm, '<h5 class="text-base font-semibold text-white mb-2 mt-4">$1</h5>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic text-gray-300">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/^- (.+)$/gm, '<li class="mb-2 text-gray-300">$1</li>')
      .replace(/(<li.*?<\/li>\s*)+/gs, '<ul class="list-disc list-inside mb-6 space-y-2">$&</ul>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-green-500 pl-4 italic text-gray-300 my-6">$1</blockquote>')
      .replace(/\n\n/g, '</p><p class="text-gray-300 mb-4 leading-relaxed">')
      .replace(/^(?!<[h|u|l|b])/gm, '<p class="text-gray-300 mb-4 leading-relaxed">')
      .replace(/(?<!>)$/gm, '</p>')
      .replace(/<p class="text-gray-300 mb-4 leading-relaxed"><\/p>/g, '');
  };

  const contentToUse = isValueBetsArticle ? originalContent : blog.content;
  const tocToUse = isValueBetsArticle ? originalTableOfContents : [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img src="/logo.png" alt="CrashOut Logo" className="h-8 w-auto" />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Pricing</a>
              <a href="#" className="bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium">Blogs</a>
              <a href="#" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">Calculator</a>
              <a href="#" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium">Affiliates</a>
              <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">Dashboard</a>
            </nav>
            <button className="bg-green-500 text-black px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Casino Background */}
      {isValueBetsArticle ? (
        <div className="relative h-96 bg-gradient-to-r from-green-900 via-blue-900 to-purple-900">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><defs><pattern id="casino" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="30" fill="%23ff6b6b" opacity="0.3"/><circle cx="50" cy="50" r="20" fill="%2351cf66" opacity="0.4"/><circle cx="50" cy="50" r="10" fill="%23ffd93d" opacity="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(%23casino)"/></svg>')`
            }}
          ></div>
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-4">
                <div className="h-1 w-24 bg-white mx-auto mb-4"></div>
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
                  VALUE
                </h1>
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
                  BETTING
                </h1>
                <div className="h-1 w-24 bg-white mx-auto mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-green-900 py-16">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-300">
              <span>{new Date(blog.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span>•</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {blog.category || 'General'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Article Title and Meta (for Value Bets article) */}
      {isValueBetsArticle && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Understanding Value Bets: The Key to Long-Term Betting Success
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-300">
            <span>May 27, 2025</span>
            <span>•</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Strategy</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents */}
          {(tocToUse.length > 0 || (!isValueBetsArticle && blog.content)) && (
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-8">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-green-400 font-semibold mb-4 text-lg">Table of Contents</h3>
                  <nav className="space-y-3">
                    {isValueBetsArticle ? (
                      tocToUse.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.id}`}
                          className={`block text-sm hover:text-white transition-colors p-2 rounded ${item.color} text-white font-medium`}
                        >
                          {index + 1}. {item.text}
                        </a>
                      ))
                    ) : (
                      // Generate TOC for other articles
                      blog.content.match(/^#{2,3}\s+(.+)$/gm)?.map((heading, index) => {
                        const text = heading.replace(/^#{2,3}\s+/, '');
                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        return (
                          <a
                            key={index}
                            href={`#${id}`}
                            className="block text-sm text-gray-300 hover:text-green-400 transition-colors"
                          >
                            {text}
                          </a>
                        );
                      })
                    )}
                  </nav>
                </div>
                <Link
                  to="/blogs"
                  className="mt-6 inline-flex items-center text-green-400 hover:text-green-300 font-medium"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Link>
              </div>
            </aside>
          )}

          {/* Article Content */}
          <article className="flex-1 max-w-none">
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: formatContent(contentToUse) }}
                className="blog-content"
              />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h4 className="text-white font-semibold mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {(isValueBetsArticle ? ['Value Betting', 'Bankroll Management', 'Probabilistic Thinking', 'Long-Term Profits'] : blog.tags).map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Info */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="ml-4">
                  <p className="text-white font-semibold">CrashoutBets Expert Team</p>
                  <p className="text-gray-400 text-sm">Sports Betting Expert</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="/logo.png" alt="CrashOut Logo" className="h-8 w-auto mb-4" />
              <p className="text-gray-400">
                Data-driven sports betting picks with proven results.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Calculator</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blogs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;

