// client/app/dashboard/events/new/page.tsx

"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!title || !eventDate || !location) {
      setError('Title, date, and location are required.');
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const newEvent = { title, eventDate, location, description };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}
/api/events`, newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push('/dashboard/events');
    } catch (err) {
      console.error(err)
      setError('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl text-black font-bold mb-6">Add New Event</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Event Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="eventDate" className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location (e.g., &apos;Online&apos; or an address)</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="shadow text-black appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Event
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}