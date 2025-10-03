// public-site/app/blogs/[id]/page.tsx

import axios from 'axios';

interface Blog {
  title: string;
  author: string;
  createdAt: string;
  content: string;
}

async function getBlogById(id: string) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}
/api/blogs/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  // The fix is to await params before using the id
  const { id } = await params;
  const blog: Blog = await getBlogById(id);

  if (!blog) {
    return <div className="text-center p-8">Blog post not found.</div>;
  }

  return (
    <article className="container mx-auto px-6 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <div className="text-gray-500 mb-6">
        <span>By {blog.author}</span> | <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      <div
        className="p-6 rounded-lg prose lg:prose-xl max-w-none bg-white"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}