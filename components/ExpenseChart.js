"use client";

import {
  PieChart, Pie, Cell, Tooltip, Legend
} from "recharts";

export default function ExpenseChart({ data }) {
  const COLORS = [
    "#22c55e", "#ef4444", "#3b82f6",
    "#f59e0b", "#8b5cf6", "#14b8a6"
  ];

  return (
    <PieChart width={350} height={280}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={90}
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}