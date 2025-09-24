// public-site/app/events/page.tsx

import axios from 'axios';

interface Event {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
}

async function getAllEvents() {
  try {
    const res = await axios.get('http://localhost:5001/api/events');
    // Sort events by date, most recent first
    return res.data.sort((a: Event, b: Event) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events: Event[] = await getAllEvents();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the beginning of the day for accurate comparison

  const upcomingEvents = events.filter(event => new Date(event.eventDate) >= today);
  const pastEvents = events.filter(event => new Date(event.eventDate) < today);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Events & Seminars</h1>
      
      {/* Upcoming Events Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6">Upcoming Events</h2>
        <div className="space-y-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event._id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-md font-semibold text-blue-700">{formatDate(event.eventDate)}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{event.title}</h3>
                <p className="text-md text-gray-600 font-medium mt-1">Location: {event.location}</p>
                <p className="text-gray-700 mt-2">{event.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming events scheduled.</p>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section>
        <h2 className="text-3xl font-semibold border-b-2 border-gray-300 pb-2 mb-6">Past Events</h2>
        <div className="space-y-6">
          {pastEvents.map((event) => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-md opacity-75">
              <p className="text-md font-semibold text-gray-600">{formatDate(event.eventDate)}</p>
              <h3 className="text-2xl font-bold text-gray-700 mt-1">{event.title}</h3>
              <p className="text-md text-gray-500 font-medium mt-1">Location: {event.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}