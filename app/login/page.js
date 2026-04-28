"use client";

import { useState } from "react";
import API, { setAuthToken } from "../../utils/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 🔥 FIXED LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data); // DEBUG

      const token = res.data?.token;

      if (!token) {
        alert("Login failed: No token received");
        return;
      }

      // ✅ store token
      localStorage.setItem("token", token);

      // ✅ set token in axios headers (if your util supports it)
      setAuthToken(token);

      // 🔥 confirm it's saved
      console.log("Saved token:", localStorage.getItem("token"));

      // redirect
      router.push("/dashboard");

    } catch (err) {
      console.log("LOGIN ERROR FULL:", err);
      console.log("BACKEND ERROR:", err.response?.data);

      alert(err.response?.data?.message || "Login failed");
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
          placeholder="Password"
          value={password}
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