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

  // Generate table of contents from content headings
  const generateTableOfContents = (content) => {
    const headings = content.match(/^#{2,3}\s+(.+)$/gm) || [];
    return headings.map((heading, index) => {
      const level = heading.match(/^#{2,3}/)[0].length;
      const text = heading.replace(/^#{2,3}\s+/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { level, text, id, index };
    });
  };

  const tableOfContents = generateTableOfContents(blog.content);

  // Convert markdown-like content to HTML (basic implementation)
  const formatContent = (content) => {
    return content
      .replace(/^#{2}\s+(.+)$/gm, '<h2 id="$1" class="text-2xl font-bold text-white mb-4 mt-8">$1</h2>')
      .replace(/^#{3}\s+(.+)$/gm, '<h3 id="$1" class="text-xl font-semibold text-white mb-3 mt-6">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/^\*\s+(.+)$/gm, '<li class="mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-4 text-gray-300 space-y-2">$1</ul>')
      .replace(/\n\n/g, '</p><p class="text-gray-300 mb-4 leading-relaxed">')
      .replace(/^(?!<[h|u|l])/gm, '<p class="text-gray-300 mb-4 leading-relaxed">')
      .replace(/(?<!>)$/gm, '</p>');
  };

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

      {/* Hero Section */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-8">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-green-400 font-semibold mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.index}
                        href={`#${item.id}`}
                        className={`block text-sm hover:text-green-400 transition-colors ${
                          item.level === 2 ? 'text-white font-medium' : 'text-gray-400 ml-4'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
                <Link
                  to="/blogs"
                  className="mt-6 inline-flex items-center text-green-400 hover:text-green-300 font-medium"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blogs
                </Link>
              </div>
            </aside>
          )}

          {/* Article Content */}
          <article className="flex-1 max-w-none">
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
                className="blog-content"
              />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h4 className="text-white font-semibold mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
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
                  <span className="text-white font-bold text-lg">
                    {blog.author ? blog.author.charAt(0) : 'C'}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-white font-semibold">{blog.author || 'CrashoutBets Team'}</p>
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

