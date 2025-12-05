"use client";
import { useState } from "react";

export default function BookForm({ book, onSave, isEdit }: any) {
  const [title, setTitle] = useState(book?.title || "");
  const [price, setPrice] = useState(book?.price || 0);
  const [copies, setCopies] = useState(book?.copies || 0);
  const [imageUrl, setImageUrl] = useState(book?.imageUrl || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          title,
          price: Number(price),
          copies: Number(copies),
          imageUrl,
        });
      }}
      className="space-y-2"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="Price"
        className="w-full p-2 border rounded"
      />
      <input
        value={copies}
        onChange={(e) => setCopies(e.target.value)}
        type="number"
        placeholder="Copies"
        className="w-full p-2 border rounded"
      />
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
      />
      <button className="py-1 px-3 bg-green-600 text-white rounded">
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
