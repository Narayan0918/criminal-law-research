// client/app/dashboard/publications/new/page.tsx

"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NewPublicationPage() {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [abstract, setAbstract] = useState('');
  const [publicationYear, setPublicationYear] = useState<number | ''>(new Date().getFullYear());
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!title || !authors || !publicationYear || !link) {
      setError('All fields except abstract are required.');
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      // Split the comma-separated authors string into an array
      const authorsArray = authors.split(',').map(author => author.trim());
      const newPublication = { title, authors: authorsArray, abstract, publicationYear, link };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}
/api/publications`, newPublication, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push('/dashboard/publications');
    } catch (err) {
      setError('Failed to create publication. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl text-black font-bold mb-6">Add New Publication</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authors" className="block text-gray-700 font-bold mb-2">Authors (comma-separated)</label>
          <input
            type="text"
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="publicationYear" className="block text-gray-700 font-bold mb-2">Publication Year</label>
          <input
            type="number"
            id="publicationYear"
            value={publicationYear}
            onChange={(e) => setPublicationYear(parseInt(e.target.value) || '')}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700 font-bold mb-2">Link (URL to PDF or source)</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="abstract" className="block text-gray-700 font-bold mb-2">Abstract</label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            rows={6}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Publish Publication
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}