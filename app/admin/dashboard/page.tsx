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

export default function AdminDashboard() {
  const router = useRouter();

  // 🔐 Protect admin route
  //   useEffect(() => {
  //     const role = localStorage.getItem("role");
  //     if (role !== "admin") {
  //       router.push("/login");
  //     }
  //   }, [router]);

  // 📚 Books (mock – replace with API later)
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "Crimson Dawn",
      author: "Fleur McDonald",
      price: 4500,
      remaining: 12,
      image: "/images/book1.jpg",
    },
    {
      id: 2,
      title: "The French Promise",
      author: "Fiona McIntosh",
      price: 3800,
      remaining: 0,
      image: "/images/book2.jpg",
    },
  ]);

  // 🔍 Search
  const [query, setQuery] = useState("");

  const availableBooks = useMemo(() => {
    return books.filter(
      (b) =>
        (b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase())) &&
        b.remaining > 0
    );
  }, [books, query]);

  const outOfStockBooks = useMemo(() => {
    return books.filter(
      (b) =>
        (b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase())) &&
        b.remaining === 0
    );
  }, [books, query]);

  // ➖ Sell
  const sellBook = (id: number) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id && b.remaining > 0
          ? { ...b, remaining: b.remaining - 1 }
          : b
      )
    );
  };

  // ➕ Restock
  const restockBook = (id: number) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, remaining: b.remaining + 1 } : b))
    );
  };

  // 🆕 New book form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [copies, setCopies] = useState("");
  const [image, setImage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const addBook = () => {
    if (!title || !author || !price || !copies || !image) return;

    setBooks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        author,
        price: Number(price),
        remaining: Number(copies),
        image,
      },
    ]);

    setTitle("");
    setAuthor("");
    setPrice("");
    setCopies("");
    setImage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif">Admin Library Dashboard</h1>
          <p className="text-gray-600">Full control over your book inventory</p>
        </div>

        {/* Add new book */}
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-lg font-semibold mb-4">Add Newly Bought Book</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              placeholder="Number of copies"
              type="number"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // reset errors
                setImageError("");

                // ✅ validate file type
                if (!file.type.startsWith("image/")) {
                  setImageError("Only image files are allowed");
                  return;
                }

                // ✅ validate file size (max 2MB)
                const maxSize = 2 * 1024 * 1024;
                if (file.size > maxSize) {
                  setImageError("Image size must not exceed 2MB");
                  return;
                }

                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);
                setImage(previewUrl); // later replace with uploaded URL from backend
              }}
              className="border rounded px-3 py-2"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Image Preview</p>
              <div className="flex items-start gap-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview("");
                    setImage("");
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove image
                </button>
              </div>
            </div>
          )}

          {imageError && (
            <p className="mt-2 text-sm text-red-600">{imageError}</p>
          )}

          <button
            onClick={addBook}
            disabled={!image || !!imageError}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded font-medium disabled:opacity-50"
          >
            Add Book
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 border rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Inventory table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Cover</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Price (₦)</th>
                <th className="px-4 py-3 text-left">Remaining</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...availableBooks, ...outOfStockBooks].map((book) => (
                <tr
                  key={book.id}
                  className={`border-t ${
                    book.remaining === 0 ? "bg-gray-50 text-gray-500" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className={`w-14 h-20 object-cover rounded ${
                        book.remaining === 0 ? "opacity-50" : ""
                      }`}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {book.remaining === 0 ? "Out of stock" : book.remaining}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => sellBook(book.id)}
                      disabled={book.remaining === 0}
                      className="px-3 py-1 rounded bg-red-100 text-red-700 disabled:opacity-50"
                    >
                      Sell
                    </button>
                    <button
                      onClick={() => restockBook(book.id)}
                      className="px-3 py-1 rounded bg-green-100 text-green-700"
                    >
                      Restock
                    </button>
                  </td>
                </tr>
              ))}

              {availableBooks.length === 0 && outOfStockBooks.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
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
