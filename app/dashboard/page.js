/*"use client";

import { useEffect, useState } from "react";
import API from "../../utils/api";
import { jwtDecode } from "jwt-decode";
import Layout from "../../components/Layout";
import AuthGuard from "../../components/AuthGuard";
import ExpenseChart from "../../components/ExpenseChart";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [role, setRole] = useState("");

  // 🔥 FETCH TRANSACTIONS
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("DATA FROM API:", res.data);
      setData([...res.data]); // 🔥 force state update
    } catch (err) {
      console.log("Transaction error:", err.response?.data);
    }
  };

  // 🔥 FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(res.data);
    } catch (err) {
      console.log("Category error:", err.response?.data);
    }
  };

  // 🔥 INIT
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      console.log("ROLE:", decoded.role); // DEBUG
      setRole(decoded.role);

      await fetchCategories();
      await fetchData();
    };

    init();
  }, []);

  // 🔥 ADD TRANSACTION
  const addTransaction = async () => {
    if (!amount || isNaN(amount)) return;

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/api/transactions",
        {
          amount: Number(amount),
          type: "expense",
          note,
          categoryId,
          date: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAmount("");
      setNote("");
      setCategoryId("");

      fetchData();
    } catch (err) {
      console.log("Add error:", err.response?.data);
    }
  };

  // 🔥 CALCULATIONS
  const totalExpense = data
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalIncome = data
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  // 🔥 CHART DATA
  const chartData = Object.values(
    data
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => {
        const category = categories.find((c) => c._id === tx.categoryId);
        const name = category ? category.name : "Other";

        if (!acc[name]) acc[name] = { name, value: 0 };
        acc[name].value += tx.amount;

        return acc;
      }, {})
  );

  return (
    <AuthGuard allowedRoles={["admin", "user"]}>
      <Layout>

        {/* HEADER */}
        /*
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            {role === "admin"
              ? "Admin view: All users"
              : "Track your finances"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-500 text-white p-5 rounded-xl">
            <p>Income</p>
            <h2 className="text-xl font-bold">₹{totalIncome}</h2>
          </div>

          <div className="bg-red-500 text-white p-5 rounded-xl">
            <p>Expense</p>
            <h2 className="text-xl font-bold">₹{totalExpense}</h2>
          </div>

          <div className="bg-blue-500 text-white p-5 rounded-xl">
            <p>Balance</p>
            <h2 className="text-xl font-bold">₹{balance}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Spending</h2>
            <ExpenseChart data={chartData} />
          </div>

          
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Add Transaction</h2>

            <div className="flex flex-col gap-3">
              <input
                className="p-2 border rounded"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                className="p-2 border rounded"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <select
                className="p-2 border rounded"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <button
                onClick={addTransaction}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>

   
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Transactions</h2>

          {data.length === 0 ? (
            <p>No transactions found</p>
          ) : (
            Object.entries(
              data.reduce((acc, tx) => {
                const key = tx.userId || "unknown";
                if (!acc[key]) acc[key] = [];
                acc[key].push(tx);
                return acc;
              }, {})
            ).map(([userId, userTxs]) => {
              const total = userTxs.reduce((sum, t) => sum + t.amount, 0);

              return (
                <div key={userId} className="mb-4 border p-3 rounded">

                
                  {Object.keys(
                    data.reduce((acc, tx) => {
                      acc[tx.userId] = true;
                      return acc;
                    }, {})
                  ).length > 1 && (
                    <div className="flex justify-between font-semibold mb-2">
                      <span>User: {userId}</span>
                      <span>₹{total}</span>
                    </div>
                  )}

                  {userTxs.map((tx) => (
                    <div
                      key={tx._id}
                      className="flex justify-between text-sm border-b py-1"
                    >
                      <span>₹{tx.amount}</span>
                      <span>{tx.note}</span>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>

      </Layout>
    </AuthGuard>
  );
}
  */
 "use client";

import { useEffect, useState } from "react";
import API from "../../utils/api";
import { jwtDecode } from "jwt-decode";
import Layout from "../../components/Layout";
import AuthGuard from "../../components/AuthGuard";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        console.log("ROLE:", decoded.role);

        const res = await API.get("/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API DATA:", res.data);
        setData(res.data);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    load();
  }, []);

  return (
    <AuthGuard allowedRoles={["admin", "user"]}>
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* RAW DEBUG */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">Raw Data</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        {/* SIMPLE LIST */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Transactions</h2>

          {data.length === 0 ? (
            <p>No data</p>
          ) : (
            data.map((tx) => (
              <div key={tx._id} className="flex justify-between border-b py-2">
                <span>₹{tx.amount}</span>
                <span>{tx.note}</span>
                <span className="text-xs text-gray-400">
                  {tx.userId}
                </span>
              </div>
            ))
          )}
        </div>
      </Layout>
    </AuthGuard>
  );
}