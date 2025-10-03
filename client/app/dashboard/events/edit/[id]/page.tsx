// client/app/dashboard/events/edit/[id]/page.tsx

"use client";

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // 3. Use the hook to get the id
  const { id } = use(params);
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}
/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { title, eventDate, location, description } = response.data;
        setTitle(title);
        // Format the date to YYYY-MM-DD for the date input
        setEventDate(new Date(eventDate).toISOString().split('T')[0]);
        setLocation(location);
        setDescription(description);
      } catch (err) {
        setError('Failed to fetch event data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('admin_token');
      const updatedEvent = { title, eventDate, location, description };

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}
/api/events/${id}`, updatedEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push('/dashboard/events');
    } catch (err) {
      setError('Failed to update event.');
    }
  };

  if (loading) return <p className="text-center p-8">Loading event...</p>;

  return (
    <div className="container mx-auto p-8 ">
      <h1 className="text-3xl text-black font-bold mb-6">Edit Event</h1>
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
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
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
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Update Event
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}