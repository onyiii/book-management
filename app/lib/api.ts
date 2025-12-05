import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000",
});

export async function signup(payload: any) {
  // expect backend to return { id, email, role, token }
  const { data } = await API.post("/auth/signup", payload);
  return data;
}
export async function login(payload: any) {
  const { data } = await API.post("/auth/login", payload);
  return data;
}
export async function searchBooks(q: string) {
  const { data } = await API.get("/books", { params: { q } });
  return data;
}
export async function buyBook(id: string, qty = 1) {
  const { data } = await API.post(`/books/${id}/buy`, { qty });
  return data;
}
export async function getAllBooks() {
  const { data } = await API.get("/books/all");
  return data;
}
export async function createBook(book: any) {
  const { data } = await API.post("/books", book);
  return data;
}
export async function updateBook(id: string, book: any) {
  const { data } = await API.put(`/books/${id}`, book);
  return data;
}
