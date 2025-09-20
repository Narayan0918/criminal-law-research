// public-site/app/blogs/page.tsx

import axios from 'axios';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  createdAt: string;
  content: string; // We'll use this for a snippet
}

async function getAllBlogs() {
  try {
    const res = await axios.get('http://localhost:5001/api/blogs');
    return res.data;
  } catch (error) {
    return [];
  }
}

export default async function BlogsPage() {
  const blogs: Blog[] = await getAllBlogs();

  // Function to create a plain text snippet from HTML content
  const createSnippet = (html: string, length = 150) => {
    const text = html.replace(/<[^>]+>/g, ''); // Strip HTML tags
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Research & Analysis</h1>
      <div className="space-y-8 max-w-4xl mx-auto">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 mb-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
            <h2 className="text-2xl font-bold mb-2">
              <Link href={`/blogs/${blog._id}`} className="text-blue-700 hover:underline">
                {blog.title}
              </Link>
            </h2>
            <p className="text-gray-700 mb-4">
              {createSnippet(blog.content)}
            </p>
            <Link href={`/blogs/${blog._id}`} className="font-semibold text-blue-600 hover:text-blue-800">
              Read More &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}