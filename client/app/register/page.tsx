"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}
/api/admins/register`, {
        username,
        password,
      });

      // Check if the server sent a token (for the first admin)
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_role', response.data.role); // Store role
        router.push('/dashboard');
      } else {
        // For subsequent admins who need approval
        setMessage(response.data.message);
      }
    } catch (err) { // Correctly handle the error type
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Invalid credentials.');
      } else {
        setError('An unexpected error occurred.');
      }}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Admin Registration
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Form fields are similar to the login page */}
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md text-black"
            />
          </div>
          
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          {message && <p className="text-sm text-center text-green-600">{message}</p>}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-indigo-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
