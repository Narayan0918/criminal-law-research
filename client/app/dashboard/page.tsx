// client/app/dashboard/page.tsx

"use client";

import { useRouter } from 'next/navigation';

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