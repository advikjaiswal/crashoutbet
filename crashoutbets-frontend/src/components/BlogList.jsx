import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Fetching blogs...');
        const apiUrl = process.env.VITE_API_BASE_URL || 'https://y0h0i3cmkmkd.manus.space';
        const response = await fetch(`${apiUrl}/api/public/posts`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setBlogs(data.posts || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            CrashOut <span className="text-green-400">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert insights, betting strategies, and tips to help you make more informed bets and increase your edge.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts available yet.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <article key={blog.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category || 'General'}
                    </span>
                    <span className="text-gray-400 text-sm ml-4">
                      {new Date(blog.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  {blog.excerpt && (
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  )}
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link 
                    to={`/blogs/${blog.slug}`}
                    className="inline-flex items-center text-green-400 hover:text-green-300 font-medium"
                  >
                    Read more
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

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

export default BlogList;

