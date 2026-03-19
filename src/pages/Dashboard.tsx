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
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Clock,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const salesData = [
  { day: "Sat", revenue: 2780, profit: 710, expenses: 450 },
  { day: "Sun", revenue: 1450, profit: 340, expenses: 200 },
  { day: "Mon", revenue: 1240, profit: 320, expenses: 380 },
  { day: "Tue", revenue: 1890, profit: 480, expenses: 290 },
  { day: "Wed", revenue: 2100, profit: 520, expenses: 310 },
  { day: "Thu", revenue: 1760, profit: 410, expenses: 260 },
  { day: "Fri", revenue: 2340, profit: 620, expenses: 180 },
];

const topSelling = [
  { name: "Paracetamol 500mg", units: 245, revenue: 1960 },
  { name: "Amoxicillin 500mg", units: 189, revenue: 2362 },
  { name: "Omeprazole 20mg", units: 156, revenue: 1872 },
  { name: "Metformin 850mg", units: 134, revenue: 1675 },
  { name: "Ibuprofen 400mg", units: 121, revenue: 968 },
];

const expenseBreakdown = [
  { name: "Supplier Payments", value: 45 },
  { name: "Salaries", value: 30 },
  { name: "Rent", value: 12 },
  { name: "Utilities", value: 8 },
  { name: "Other", value: 5 },
];

const COLORS = [
  "hsl(160, 84%, 39%)",
  "hsl(160, 60%, 50%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
  "hsl(240, 5%, 65%)",
];

const recentTransactions = [
  { id: 1, type: "sale", product: "Amoxicillin 500mg", qty: 2, amount: 25.0, margin: 9.0, time: "2 min ago", customer: "Mohammed" },
  { id: 2, type: "sale", product: "Paracetamol 500mg", qty: 1, amount: 8.0, margin: 5.0, time: "15 min ago", customer: "Walk-in" },
  { id: 3, type: "return", product: "Omeprazole 20mg", qty: 1, amount: -12.0, margin: -5.5, time: "22 min ago", customer: "Ahmad" },
  { id: 4, type: "sale", product: "Metformin 850mg", qty: 1, amount: 12.5, margin: 7.5, time: "35 min ago", customer: "Walk-in" },
  { id: 5, type: "payment", product: "Customer Debt Payment", qty: 0, amount: 85.0, margin: 0, time: "1 hr ago", customer: "Fatima" },
];

const stockAlerts = [
  { name: "Ibuprofen 400mg", batch: "B554", issue: "expiring", days: 93, stock: 5 },
  { name: "Aspirin 300mg", batch: "B331", issue: "expiring", days: 34, stock: 12 },
  { name: "Omeprazole 20mg", batch: "B223", issue: "low_stock", days: 141, stock: 8 },
  { name: "Losartan 50mg", batch: "B772", issue: "low_stock", days: 335, stock: 3 },
];

type Period = "daily" | "weekly" | "monthly";

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("weekly");

  const totalRevenue = salesData.reduce((s, d) => s + d.revenue, 0);
  const totalProfit = salesData.reduce((s, d) => s + d.profit, 0);
  const totalExpenses = salesData.reduce((s, d) => s + d.expenses, 0);

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "+12%", up: true, icon: DollarSign, accent: false },
    { label: "Net Profit", value: `$${totalProfit.toLocaleString()}`, change: "+15%", up: true, icon: TrendingUp, accent: true },
    { label: "Total Expenses", value: `$${totalExpenses.toLocaleString()}`, change: "-8%", up: false, icon: ArrowDownRight, accent: false },
    { label: "Transactions", value: "47", change: "+8%", up: true, icon: ShoppingCart, accent: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Pharmacy Operations Overview</p>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-4 transition-all hover:shadow-md ${
              stat.accent
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-card elevation-1"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.accent ? "bg-primary/10" : "bg-secondary"}`}>
                <stat.icon className={`h-4 w-4 ${stat.accent ? "text-primary" : "text-muted-foreground"}`} />
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-2xl font-bold font-mono tabular-nums ${stat.accent ? "text-primary" : ""}`}>
                {stat.value}
              </span>
            </div>
            <span
              className={`flex items-center text-xs font-medium mt-1 ${
                stat.up ? "text-primary" : "text-destructive"
              }`}
            >
              {stat.up ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
              {stat.change} vs last {period === "daily" ? "day" : period === "weekly" ? "week" : "month"}
            </span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Revenue & Profit Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Revenue & Profit Trend</h2>
            <Link to="/app/reports">
              <Button variant="ghost" size="sm" className="text-xs h-7">View All</Button>
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(160, 84%, 39%)" fill="url(#colorRevenue)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="hsl(38, 92%, 50%)" fill="url(#colorProfit)" strokeWidth={2} name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="rounded-xl border border-border bg-card p-5 elevation-1">
          <h2 className="text-sm font-semibold mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(var(--card))"
              >
                {expenseBreakdown.map((_, index) => (
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
            {expenseBreakdown.map((cat, i) => (
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

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 elevation-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Recent Transactions</h2>
            <Link to="/app/returns">
              <Button variant="ghost" size="sm" className="text-xs h-7">View All</Button>
            </Link>
          </div>
          <div className="space-y-1">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                    txn.type === "sale" ? "bg-primary/10 text-primary" :
                    txn.type === "return" ? "bg-destructive/10 text-destructive" :
                    "bg-warning/10 text-warning"
                  }`}>
                    {txn.type === "sale" ? <ShoppingCart className="h-3.5 w-3.5" /> :
                     txn.type === "return" ? <ArrowDownRight className="h-3.5 w-3.5" /> :
                     <DollarSign className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{txn.product}</p>
                    <p className="text-xs text-muted-foreground">{txn.customer} · {txn.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-mono font-semibold tabular-nums ${
                    txn.amount < 0 ? "text-destructive" : txn.type === "payment" ? "text-primary" : ""
                  }`}>
                    {txn.amount >= 0 ? "+" : ""}${Math.abs(txn.amount).toFixed(2)}
                  </span>
                  {txn.margin !== 0 && (
                    <p className={`text-[10px] font-medium ${txn.margin >= 0 ? "text-primary" : "text-destructive"}`}>
                      Margin: {txn.margin >= 0 ? "+" : ""}${txn.margin.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="rounded-xl border border-border bg-card p-5 elevation-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Stock Alerts</h2>
            <Link to="/app/shortages">
              <Button variant="ghost" size="sm" className="text-xs h-7">View All</Button>
            </Link>
          </div>
          <div className="space-y-2">
            {stockAlerts.map((alert, i) => (
              <div key={i} className="rounded-lg bg-secondary/50 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium">{alert.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Batch #{alert.batch}</p>
                  </div>
                  <Badge
                    variant={alert.issue === "expiring" ? "secondary" : "destructive"}
                    className={`text-[10px] px-1.5 py-0 ${
                      alert.issue === "expiring" ? "bg-warning/10 text-warning border-warning/20" : ""
                    }`}
                  >
                    {alert.issue === "expiring" ? (
                      <><Clock className="h-2.5 w-2.5 mr-0.5" /> {alert.days}d</>
                    ) : (
                      <><Package className="h-2.5 w-2.5 mr-0.5" /> {alert.stock} left</>
                    )}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Bar */}
      <div className="rounded-xl border border-border bg-card p-5 elevation-1">
        <h2 className="text-sm font-semibold mb-4">Top Selling Products</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={topSelling}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="units" fill="hsl(160, 84%, 39%)" radius={[6, 6, 0, 0]} name="Units Sold" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
