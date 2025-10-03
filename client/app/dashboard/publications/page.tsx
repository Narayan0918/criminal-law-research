// client/app/dashboard/publications/page.tsx

"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Define a type for our Publication data
interface Publication {
  _id: string;
  title: string;
  authors: string[];
  publicationYear: number;
}

export default function ManagePublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        // Use the publications API endpoint
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}
/api/publications`);
        setPublications(response.data);
      } catch (err) {
        setError('Failed to fetch publications.');
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      // Use the publications API endpoint for deleting
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}
/api/publications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPublications(publications.filter((pub) => pub._id !== id));
    } catch (err) {
      setError('Failed to delete the publication.');
    }
  };

  if (loading) return <p className="text-center mt-8">Loading publications...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-black font-bold">Manage Publications</h1>
        <Link href="/dashboard/publications/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          + Add New Publication
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Authors</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Year</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {publications.length > 0 ? (
              publications.map((pub) => (
                <tr key={pub._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{pub.title}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* Join the authors array into a string */}
                    <p className="text-gray-900 whitespace-no-wrap">{pub.authors.join(', ')}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{pub.publicationYear}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <Link href={`/dashboard/publications/edit/${pub._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(pub._id)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10">No publications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}