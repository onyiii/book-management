"use client";

export default function Home() {
  const newBooks = [
    {
      id: 1,
      title: "Crimson Dawn",
      author: "Fleur McDonald",
      cover: "/images/book1.jpg",
    },
    {
      id: 2,
      title: "The French Promise",
      author: "Fiona McIntosh",
      cover: "/images/book2.jpg",
    },
    {
      id: 3,
      title: "Blue Horizon",
      author: "John Marsden",
      cover: "/images/book3.jpg",
    },
    {
      id: 4,
      title: "Paper Without Glory",
      author: "Vintage Author",
      cover: "/images/book4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero / Header */}
      <header className="relative">
        <div
          className="h-64 md:h-96 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/bookshelf.jpg')` }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 px-6 py-10 md:px-14 md:py-16 rounded-md shadow-md text-center max-w-3xl pointer-events-auto">
            <h1 className="text-4xl md:text-6xl font-serif">
              Information Desk
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Book Collector's Personal Page
            </p>
            <a
              href="#collection"
              className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-3 rounded-md"
            >
              Visit my book collection
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 -mt-10">
        {/* Welcome card */}
        <section className="bg-white rounded-md shadow p-6 text-center">
          <h2 className="text-xl font-semibold">
            Welcome to my Personal Page!
          </h2>
          <p className="mt-3 text-gray-600">
            A small collection of rare books, personal notes and stories about
            my library.
          </p>
        </section>

        {/* New in my library */}
        <section className="mt-8">
          <h3 className="text-lg font-medium mb-4">New In My Library</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {newBooks.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-md shadow overflow-hidden"
              >
                <img
                  src={b.cover}
                  alt={b.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-semibold">{b.title}</h4>
                  <p className="text-xs text-gray-500">{b.author}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <a
              href="#collection"
              className="inline-block bg-yellow-400 px-4 py-2 rounded-md font-medium"
            >
              View all
            </a>
          </div>
        </section>

        {/* Two column features */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-md shadow">
            <h4 className="font-semibold">Rare Books & Manuscripts</h4>
            <p className="mt-2 text-sm text-gray-600">
              Short description about your rare books, provenance notes and
              cataloguing details.
            </p>
            <a
              className="mt-4 inline-block text-sm font-medium text-yellow-600"
              href="#"
            >
              More
            </a>
          </div>

          <div className="bg-white p-5 rounded-md shadow">
            <h4 className="font-semibold">Organizing Your Collection</h4>
            <p className="mt-2 text-sm text-gray-600">
              How you manage categories, tags, and locations for each book.
            </p>
            <a
              className="mt-4 inline-block text-sm font-medium text-yellow-600"
              href="#"
            >
              More
            </a>
          </div>
        </section>

        {/* Article / profile */}
        <section className="mt-8 bg-white p-6 rounded-md shadow flex gap-4 items-start">
          <img
            src="/images/author.jpg"
            alt="owner"
            className="w-20 h-20 rounded-md object-cover"
          />
          <div>
            <h4 className="font-semibold">
              What is the difference between a first and a limited edition?
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              A short explanation to introduce visitors to book-collecting
              terminology and tips.
            </p>
            <a
              className="mt-3 inline-block text-sm font-medium text-yellow-600"
              href="#"
            >
              Read more
            </a>
          </div>
        </section>

        {/* Footer like social icons */}
        <footer className="mt-10 text-center text-sm text-gray-500 pb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span>Follow me on social networks</span>
            <div className="flex gap-3 ml-4">
              <div className="w-7 h-7 rounded-full bg-gray-200" />
              <div className="w-7 h-7 rounded-full bg-gray-200" />
              <div className="w-7 h-7 rounded-full bg-gray-200" />
            </div>
          </div>
          <div>
            © {new Date().getFullYear()} Aaron Rodgers — Privacy • Terms
          </div>
        </footer>
      </main>
    </div>
  );
}
