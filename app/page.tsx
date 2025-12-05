"use client";
import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import { searchBooks, buyBook } from "./lib/api";

export default function HomePage() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function doSearch() {
    setLoading(true);
    try {
      const res = await searchBooks(q);
      setBooks(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    doSearch();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search books</h1>
      <div className="flex gap-2 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search title or author"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={doSearch}
          className="py-2 px-4 rounded bg-blue-600 text-white"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((b) => (
            <BookCard
              key={b.id}
              book={b}
              onBuy={async (qty: number) => {
                // optimistic UI: reduce locally then call API
                const original = b.copies;
                b.copies = Math.max(0, b.copies - qty);
                setBooks([...books]);
                try {
                  await buyBook(b.id, qty);
                } catch (err) {
                  b.copies = original;
                  setBooks([...books]);
                  alert("Purchase failed");
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
