import Link from "next/link";

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

async function getLatestPublications() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/publications`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch publications:", error);
    return [];
  }
}

async function getUpcomingEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, { cache: 'no-store' });
    if (!res.ok) {
        // Log the error if the response is not OK
        console.error("API returned an error:", res.status, res.statusText);
        return [];
    }
    const data = await res.json();
    return data
      .filter((event: Event) => new Date(event.eventDate) > new Date())
      .slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

// The main Homepage component
export default async function HomePage() {
  const [latestBlogs, latestPublications, upcomingEvents] = await Promise.all([
    getLatestBlogs(),
    getLatestPublications(),
    getUpcomingEvents(),
  ]);

  return (
    // The <main> tag is now the root element, as the layout provides the rest
    <main className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-12 min-h-screen">
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
              <h3 className="text-xl font-bold text-accent hover:underline">
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
              <div key={event._id} className="p-4 bg-white rounded-lg shadow-sm">
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
              <div key={pub._id} className="p-4 bg-white rounded-lg shadow-sm">
                <p className="font-bold hover:underline">
                  <Link href={`/publications/${pub._id}`}>{pub.title}</Link>
                </p>
                <p className="text-sm text-gray-600">{pub.authors.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}