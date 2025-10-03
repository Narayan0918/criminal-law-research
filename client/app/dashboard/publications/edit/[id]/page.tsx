"use client";

import { useState, useEffect, use } from 'react'; // 1. Add 'use'
import axios from 'axios';
import { useRouter } from 'next/navigation';

// 2. Update the type of params
export default function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [abstract, setAbstract] = useState('');
  const [publicationYear, setPublicationYear] = useState<number | ''>('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // 3. Use the hook to get the id
  const { id } = use(params);

  useEffect(() => {
    if (!id) return;

    const fetchPublication = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/publications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { title, authors, abstract, publicationYear, link } = response.data;
        setTitle(title);
        setAuthors(authors.join(', '));
        setAbstract(abstract);
        setPublicationYear(publicationYear);
        setLink(link);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch publication data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('admin_token');
      const authorsArray = authors.split(',').map(author => author.trim());
      const updatedPublication = { title, authors: authorsArray, abstract, publicationYear, link };

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/publications/${id}`, updatedPublication, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push('/dashboard/publications');
    } catch (err) {
      console.error(err);
      setError('Failed to update publication.');
    }
  };

  if (loading) return <p className="text-center p-8">Loading publication...</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Publication</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authors" className="block text-gray-700 font-bold mb-2">Authors (comma-separated)</label>
          <input
            type="text"
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="publicationYear" className="block text-gray-700 font-bold mb-2">Publication Year</label>
          <input
            type="number"
            id="publicationYear"
            value={publicationYear}
            onChange={(e) => setPublicationYear(parseInt(e.target.value) || '')}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700 font-bold mb-2">Link (URL to PDF or source)</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="abstract" className="block text-gray-700 font-bold mb-2">Abstract</label>
          <textarea
            id="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            rows={6}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Update Publication
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}