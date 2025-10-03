// client/app/dashboard/blogs/new/page.tsx

"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor'; // Import our new editor

export default function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // This will now hold HTML
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const newPost = { title, content, author: `Admin` };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}
/api/blogs`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push('/dashboard/blogs');
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl text-black font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          {/* Use the new TipTap editor component */}
          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Publish Post
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}