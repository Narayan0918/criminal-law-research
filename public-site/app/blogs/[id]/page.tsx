// public-site/app/blogs/[id]/page.tsx

import axios from 'axios';

interface Blog {
  title: string;
  author: string;
  createdAt: string;
  content: string; // This will contain the HTML from the rich-text editor
}

async function getBlogById(id: string) {
  try {
    const res = await axios.get(`http://localhost:5001/api/blogs/${id}`);
    return res.data;
  } catch (error) {
    return null; // Handle cases where the blog is not found
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const blog: Blog = await getBlogById(params.id);

  if (!blog) {
    return <div className="text-center p-8">Blog post not found.</div>;
  }

  return (
    <article className="container mx-auto px-6 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <div className="text-gray-500 mb-6">
        <span>By {blog.author}</span> | <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      {/* This renders the HTML content from your TipTap editor */}
      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}