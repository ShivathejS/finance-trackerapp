"use client";

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

  // ✅ FETCH TRANSACTIONS (WITH TOKEN)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);

    } catch (err) {
      console.log("Transaction error:", err.response?.data);
    }
  };

  // ✅ FETCH CATEGORIES (WITH TOKEN)
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("CATEGORIES:", res.data);
      setCategories(res.data);

    } catch (err) {
      console.log("Category error:", err.response?.data);
    }
  };

  // ✅ INIT
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      setRole(decoded.role);

      await fetchCategories();
      await fetchData();
    };

    init();
  }, []);

  // ✅ ADD TRANSACTION (WITH TOKEN)
  const addTransaction = async () => {
    if (!amount || isNaN(amount)) return;

    try {
      const token = localStorage.getItem("token");

      await API.post("/api/transactions", {
        amount: Number(amount),
        type: "expense",
        note,
        categoryId,
        date: new Date()
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAmount("");
      setNote("");
      setCategoryId("");

      fetchData();

    } catch (err) {
      console.log("Add error:", err.response?.data);
    }
  };

  // CALCULATIONS
  const totalExpense = data
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalIncome = data
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  // CHART
  const chartData = Object.values(
    data
      .filter(tx => tx.type === "expense")
      .reduce((acc, tx) => {
        const category = categories.find(c => c._id === tx.categoryId);
        const name = category ? category.name : "Other";

        if (!acc[name]) {
          acc[name] = { name, value: 0 };
        }

        acc[name].value += tx.amount;
        return acc;
      }, {})
  );

  return (
    <AuthGuard allowedRoles={["admin", "user"]}>
      <Layout>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Track your finances</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-green-500 text-white p-6 rounded-xl shadow">
            <p>Income</p>
            <h2 className="text-xl font-bold">₹{totalIncome}</h2>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-xl shadow">
            <p>Expense</p>
            <h2 className="text-xl font-bold">₹{totalExpense}</h2>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
            <p>Balance</p>
            <h2 className="text-xl font-bold">₹{balance}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Spending</h2>
            <ExpenseChart data={chartData} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Add Transaction</h2>

            <div className="flex flex-col gap-3">

              <input
                className="p-3 border rounded"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                className="p-3 border rounded"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <select
                className="p-3 border rounded"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>

                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}

              </select>

              <button
                onClick={addTransaction}
                className="bg-blue-500 text-white py-2 rounded"
              >
                Add
              </button>

            </div>
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Transactions</h2>

          {data.map(tx => (
            <div key={tx._id} className="flex justify-between py-2 border-b">
              <span>₹{tx.amount}</span>
              <span>{tx.note}</span>
            </div>
          ))}
        </div>

      </Layout>
    </AuthGuard>
  );
}