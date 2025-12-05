"use client";
export default function BookCard({ book, onBuy }: any) {
  return (
    <div className="p-4 border rounded bg-white flex flex-col">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="h-48 w-full object-cover mb-3"
      />
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm">
        ${book.price} • {book.copies} copies
      </p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onBuy(1)} className="py-1 px-3 border rounded">
          Buy 1
        </button>
        <button
          onClick={() => {
            const q = prompt("How many to buy?", "1");
            const n = Number(q || 0);
            if (n > 0) onBuy(n);
          }}
          className="py-1 px-3 bg-blue-600 text-white rounded"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
