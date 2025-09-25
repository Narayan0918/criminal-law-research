// public-site/app/page.tsx

import axios from "axios";
import Link from "next/link";
import "./globals.css"

// Define types for our data
interface Blog {
  _id: string;
  title: string;
  createdAt: string;
}
interface Publication {
  _id: string;
  title: string;
  authors: string[];
}
interface Event {
  _id: string;
  title: string;
  eventDate: string;
}

// Helper functions to fetch data from our API
async function getLatestBlogs() {
  try {
    const res = await axios.get("http://localhost:5001/api/blogs");
    return res.data.slice(0, 3); // Return only the 3 most recent
  } catch (error) {
    return []; // Return empty array on error
  }
}

async function getLatestPublications() {
  try {
    const res = await axios.get("http://localhost:5001/api/publications");
    return res.data.slice(0, 3);
  } catch (error) {
    return [];
  }
}

async function getUpcomingEvents() {
  try {
    const res = await axios.get("http://localhost:5001/api/events");
    // Filter for events that are in the future
    return res.data
      .filter((event: Event) => new Date(event.eventDate) > new Date())
      .slice(0, 3);
  } catch (error) {
    return [];
  }
}

// The main Homepage component
export default async function HomePage() {
  // Fetch all data in parallel
  const [latestBlogs, latestPublications, upcomingEvents] = await Promise.all([
    getLatestBlogs(),
    getLatestPublications(),
    getUpcomingEvents(),
  ]);

  console.log('HOMEPAGE PUBLICATIONS:', latestPublications);


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* We will add a proper Header/Navbar later */}
      <header className="bg-white shadow-sm p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Centre for Criminal Law Research
        </h1>
        <p className="text-gray-600">
          Exploring the frontiers of criminal jurisprudence.
        </p>
      </header>

      <main className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Latest Blogs Section */}
        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">
            Latest Research & Analysis
          </h2>
          <div className="space-y-6">
            {latestBlogs.map((blog: Blog) => (
              <div key={blog._id} className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-bold text-blue-700 hover:underline">
                  <Link href={`/blogs/${blog._id}`}>{blog.title}</Link>
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar for Events and Publications */}
        <aside className="space-y-8">
          {/* Upcoming Events Section */}
          <div>
            <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event: Event) => (
                <div key={event._id}>
                  <p className="font-bold">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Publications Section */}
          <div>
  <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">
    Recent Publications
  </h2>
  <div className="space-y-4">
    {latestPublications.map((pub: Publication) => (
      <div key={pub._id}>
        <p className="font-bold hover:underline">
          {/* Ensure this Link component is exactly as written below */}
          <Link href={`/publications/${pub._id}`}>{pub.title}</Link>
        </p>
        <p className="text-sm text-gray-600">{pub.authors.join(', ')}</p>
      </div>
    ))}
  </div>
</div>
        </aside>
      </main>
    </div>
  );
}
