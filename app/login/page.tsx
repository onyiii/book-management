"use client";
import { useState } from "react";
import { login } from "../lib/api";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  async function handle(e: any) {
    e.preventDefault();
    try {
      const user = await login({ phoneNumber, password });
      localStorage.setItem("bm_user", JSON.stringify(user));
      location.href = "/";
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Log in</h2>
      <form onSubmit={handle} className="space-y-3">
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone number"
          className="w-full p-2 border rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Log in
        </button>
      </form>
    </div>
  );
}
