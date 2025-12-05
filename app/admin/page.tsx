"use client";
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import { getAllBooks, createBook, updateBook } from "../lib/api";

// type Book = {
//   id: string;
//   title: string;
//   price: number;
//   copies: number;
//   imageUrl: string;
// };

type BookInput = {
  title: string;
  price: number;
  copies: number;
  imageUrl: string;
};
export default function AdminPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setBooks(await getAllBooks());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin - Manage Library</h1>
      <div className="mb-6">
        <h2 className="text-xl">Add new book</h2>
        <BookForm
          onSave={async (book: BookInput) => {
            await createBook(book);
            load();
          }}
        />
      </div>

      <h2 className="text-xl mb-3">Existing books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((b) => (
            <div key={b.id} className="p-4 border rounded bg-white">
              <img
                src={b.imageUrl}
                alt={b.title}
                className="h-40 w-full object-cover mb-3"
              />
              <h3 className="font-semibold">{b.title}</h3>
              <p>Price: ${b.price}</p>
              <p>Copies: {b.copies}</p>
              <BookForm
                book={b}
                onSave={async (upd: Partial<BookInput>) => {
                  await updateBook(b.id, upd);
                  load();
                }}
                isEdit
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
