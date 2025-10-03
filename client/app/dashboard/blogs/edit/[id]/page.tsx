// client/app/dashboard/blogs/edit/[id]/page.tsx

"use client";

import { useState, useEffect, use } from 'react'; // 1. Add 'use' to the import
import axios from 'axios';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';

// 2. Update the type of params to be a Promise
export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // 3. Use the hook to get the id
  const { id } = use(params);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(`http://localhost:5001/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Pre-fill the form with the fetched data
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
      } catch (err) {
        setError('Failed to fetch post data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('admin_token');
      const updatedPost = { title, content, author };

      // Use a PUT request to update the existing post
      await axios.put(`http://localhost:5001/api/blogs/${id}`, updatedPost, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push('/dashboard/blogs'); // Redirect on success
    } catch (err) {
      setError('Failed to update post.');
    }
  };
  
  if (loading) return <p className="text-center p-8">Loading post...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl text-black font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>
        
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}