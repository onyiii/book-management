"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  remaining: number;
  image: string;
}

export default function LibraryPage() {
  const router = useRouter();

  // 🔐 simple role protection
  //   useEffect(() => {
  //     const role = localStorage.getItem("role");
  //     if (role !== "user") {
  //       router.push("/login");
  //     }
  //   }, [router]);

  // 📚 sample data (replace with API later)
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "Crimson Dawn",
      author: "Fleur McDonald",
      price: 4500,
      remaining: 12,
      image: "picture",
    },
    {
      id: 2,
      title: "The French Promise",
      author: "Fiona McIntosh",
      price: 3800,
      remaining: 5,
      image: "picture",
    },
    {
      id: 3,
      title: "Blue Horizon",
      author: "John Marsden",
      price: 5200,
      remaining: 9,
      image: "picture",
    },
    {
      id: 4,
      title: "Paper Without Glory",
      author: "Vintage Author",
      price: 3000,
      remaining: 20,
      image: "picture",
    },
  ]);

  // keeps track of last deduction per book (for undo)
  const [history, setHistory] = useState<Record<number, number>>({});

  const [query, setQuery] = useState("");

  // 🔍 search by title or author
  // 🔍 available books (in stock)
  const availableBooks = useMemo(() => {
    return books.filter(
      (b) =>
        (b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase())) &&
        b.remaining > 0
    );
  }, [books, query]);

  // 📦 books we had before but are now out of stock
  const outOfStockBooks = useMemo(() => {
    return books.filter(
      (b) =>
        (b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase())) &&
        b.remaining === 0
    );
  }, [books, query]);

  // ➖ reduce remaining count
  const sellBook = (id: number) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === id && b.remaining > 0) {
          setHistory((h) => ({ ...h, [id]: 1 }));
          return { ...b, remaining: b.remaining - 1 };
        }
        return b;
      })
    );
  };

  // ↩ undo last deduction
  const undoSell = (id: number) => {
    if (!history[id]) return;

    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, remaining: b.remaining + history[id] } : b
      )
    );

    setHistory((h) => {
      const copy = { ...h };
      delete copy[id];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif">My Library</h1>
          <p className="text-gray-600 mt-1">
            Search and manage your available books
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by book title or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Price (₦)</th>
                <th className="px-4 py-3 text-left">Remaining</th>
                <th className="px-4 py-3 text-left">Actions</th>
                <th className="px-4 py-3 text-left">Cover</th>
              </tr>
            </thead>
            <tbody>
              {/* Available books */}
              {availableBooks.map((book) => (
                <tr key={book.id} className="border-t">
                  <td className="px-4 py-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-14 h-20 object-cover rounded"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.price.toLocaleString()}</td>
                  <td className="px-4 py-3">{book.remaining}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => sellBook(book.id)}
                      className="px-3 py-1 rounded bg-red-100 text-red-700"
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              ))}

              {/* Out of stock books */}
              {outOfStockBooks.map((book) => (
                <tr key={book.id} className="border-t bg-gray-50 text-gray-500">
                  <td className="px-4 py-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-14 h-20 object-cover rounded opacity-50"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.price.toLocaleString()}</td>
                  <td className="px-4 py-3 italic text-red-600">
                    Out of stock
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs italic">Previously available</span>
                  </td>
                </tr>
              ))}

              {/* Nothing found at all */}
              {availableBooks.length === 0 && outOfStockBooks.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
