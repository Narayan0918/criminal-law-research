// public-site/app/publications/[id]/page.tsx

interface Publication {
  title: string;
  authors: string[];
  publicationYear: number;
  abstract: string;
  link: string;
}

// Rewritten function using native fetch for better compatibility
async function getPublicationById(id: string): Promise<Publication | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}
/api/publications/${id}`, {
      cache: 'no-store', // Ensures fresh data is fetched every time
    });

    // If the request was not successful (e.g., 404), return null
    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}

export default async function PublicationPage({ params }: { params: { id: string } }) {
  const { id } = await params; 
  const pub = await getPublicationById(id);

  if (!pub) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Publication not found.</h1>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-6 py-12 max-w-4xl">
      <p className="text-gray-500 mb-2">Published in {pub.publicationYear}</p>
      <h1 className="text-4xl font-bold mb-2">{pub.title}</h1>
      <p className="text-xl text-gray-700 font-semibold mb-6">
        By {pub.authors.join(', ')}
      </p>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Abstract</h2>
        <p className="text-gray-800 leading-relaxed">{pub.abstract}</p>
      </div>

      <a 
        href={pub.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        View Full Publication &rarr;
      </a>
    </article>
  );
}