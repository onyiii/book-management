"use client";
import { useState } from "react";
import { signup } from "../lib/api";

export default function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  async function handle(e: any) {
    e.preventDefault();
    try {
      const user = await signup({ phoneNumber, password, role });
      localStorage.setItem("bm_user", JSON.stringify(user));
      location.href = "/";
    } catch (err: any) {
      alert(err.message || "Sign up failed");
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Create account</h2>
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
        <div>
          <label className="mr-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="w-full py-2 bg-green-600 text-white rounded">
          Sign up
        </button>
      </form>
    </div>
  );
}
