// public-site/app/publications/page.tsx

import axios from 'axios';
import Link from 'next/link';

interface Publication {
  _id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  link: string;
}

async function getAllPublications() {
  try {
    const res = await axios.get('http://localhost:5001/api/publications');
    return res.data;
  } catch (error) {
    console.error("Failed to fetch publications:", error);
    return [];
  }
}

export default async function PublicationsPage() {
  const publications: Publication[] = await getAllPublications();

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Publications</h1>
      <div className="space-y-6 max-w-4xl mx-auto">
        {publications.map((pub) => (
          <div key={pub._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {pub.title}
            </h2>
            <p className="text-md text-gray-600 font-semibold mb-2">
              {pub.authors.join(', ')}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Published in {pub.publicationYear}
            </p>
            <a 
              href={pub.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              View Publication &rarr;
            </a>
          </div>
        ))}
        {publications.length === 0 && (
          <p className="text-center text-gray-500">No publications found.</p>
        )}
      </div>
    </div>
  );
}