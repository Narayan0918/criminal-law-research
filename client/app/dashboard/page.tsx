// client/app/dashboard/page.tsx (Updated)

"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin!</h1>
        <p className="mt-2 text-gray-600">This is your secure dashboard.</p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/dashboard/blogs" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded">
            Manage Blog Posts
          </Link>
          <Link href="/dashboard/publications" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded">
            Manage Publications
          </Link>
          {/* Add the new link for Events */}
          <Link href="/dashboard/events" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded">
            Manage Events
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="w-full max-w-xs px-4 py-2 mt-8 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}