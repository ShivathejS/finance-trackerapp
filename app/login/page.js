"use client";

import { useState } from "react";
import API, { setAuthToken } from "../../utils/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);

      router.push("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Welcome Back
        </h1>

        <input
          className="w-full border p-3 rounded mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}