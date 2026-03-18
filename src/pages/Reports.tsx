import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Pill, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const dailyData = [
  { date: "Mar 1", revenue: 1240, cost: 820, profit: 420 },
  { date: "Mar 2", revenue: 1890, cost: 1200, profit: 690 },
  { date: "Mar 3", revenue: 2100, cost: 1380, profit: 720 },
  { date: "Mar 4", revenue: 1760, cost: 1150, profit: 610 },
  { date: "Mar 5", revenue: 2340, cost: 1520, profit: 820 },
  { date: "Mar 6", revenue: 2780, cost: 1780, profit: 1000 },
  { date: "Mar 7", revenue: 1450, cost: 940, profit: 510 },
  { date: "Mar 8", revenue: 1980, cost: 1280, profit: 700 },
  { date: "Mar 9", revenue: 2560, cost: 1650, profit: 910 },
  { date: "Mar 10", revenue: 2120, cost: 1370, profit: 750 },
  { date: "Mar 11", revenue: 1870, cost: 1210, profit: 660 },
  { date: "Mar 12", revenue: 2450, cost: 1590, profit: 860 },
  { date: "Mar 13", revenue: 2890, cost: 1860, profit: 1030 },
  { date: "Mar 14", revenue: 1680, cost: 1090, profit: 590 },
];

const topProducts = [
  { name: "Paracetamol 500mg", sold: 245, revenue: 1960 },
  { name: "Amoxicillin 500mg", sold: 189, revenue: 2362 },
  { name: "Omeprazole 20mg", sold: 156, revenue: 1872 },
  { name: "Metformin 850mg", sold: 134, revenue: 1675 },
  { name: "Ibuprofen 400mg", sold: 121, revenue: 968 },
];

const categoryData = [
  { name: "Antibiotic", value: 35 },
  { name: "Analgesic", value: 25 },
  { name: "PPI", value: 15 },
  { name: "Antidiabetic", value: 12 },
  { name: "Other", value: 13 },
];

const COLORS = [
  "hsl(160, 84%, 39%)",
  "hsl(160, 60%, 50%)",
  "hsl(160, 40%, 60%)",
  "hsl(38, 92%, 50%)",
  "hsl(240, 5%, 65%)",
];

type Period = "daily" | "weekly" | "monthly";

export default function Reports() {
  const [period, setPeriod] = useState<Period>("daily");

  const totalRevenue = dailyData.reduce((s, d) => s + d.revenue, 0);
  const totalProfit = dailyData.reduce((s, d) => s + d.profit, 0);
  const totalSales = topProducts.reduce((s, p) => s + p.sold, 0);
  const avgMargin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">Financial overview for your pharmacy</p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border bg-secondary/50 p-0.5">
          {(["daily", "weekly", "monthly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                period === p
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Revenue</span>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-2xl font-semibold font-mono tabular-nums">${totalRevenue.toLocaleString()}</p>
          <span className="flex items-center text-xs font-medium text-primary mt-1">
            <TrendingUp className="mr-0.5 h-3 w-3" /> +18% vs last period
          </span>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Net Profit</span>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-semibold font-mono tabular-nums text-primary">${totalProfit.toLocaleString()}</p>
          <span className="text-xs text-muted-foreground mt-1">Margin: {avgMargin}%</span>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Units Sold</span>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-2xl font-semibold font-mono tabular-nums">{totalSales}</p>
          <span className="text-xs text-muted-foreground mt-1">Across {topProducts.length} products</span>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Period</span>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-2xl font-semibold font-mono tabular-nums">{dailyData.length}</p>
          <span className="text-xs text-muted-foreground mt-1 capitalize">{period} data points</span>
        </div>
      </div>

      {/* Revenue & Profit Chart */}
      <div className="rounded-lg border border-border bg-card p-4 elevation-1">
        <h2 className="text-sm font-medium mb-4">Revenue vs Profit Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(160, 84%, 39%)" fill="url(#colorRev)" strokeWidth={2} />
            <Area type="monotone" dataKey="profit" stroke="hsl(38, 92%, 50%)" fill="url(#colorProfit)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Top Selling Products */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card p-4 elevation-1">
          <h2 className="text-sm font-medium mb-4">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="sold" fill="hsl(160, 84%, 39%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4 elevation-1">
          <h2 className="text-sm font-medium mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(var(--card))"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="font-mono font-medium tabular-nums">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
