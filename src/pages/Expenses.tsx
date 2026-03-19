import { useState } from "react";
import {
  DollarSign,
  Plus,
  Building2,
  Users,
  Zap,
  Truck,
  Filter,
  Calendar,
  TrendingDown,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const expenseCategories = [
  { key: "supplier", label: "Supplier Payments", icon: Truck, color: "text-primary" },
  { key: "salary", label: "Salaries", icon: Users, color: "text-warning" },
  { key: "rent", label: "Rent", icon: Building2, color: "text-destructive" },
  { key: "utilities", label: "Utilities", icon: Zap, color: "text-muted-foreground" },
];

const mockExpenses = [
  { id: 1, category: "supplier", description: "MedPharma Distributors - Invoice #INV-0312", amount: 1840, date: "2026-03-18", paid: true },
  { id: 2, category: "salary", description: "March Salaries - 3 Employees", amount: 4500, date: "2026-03-15", paid: true },
  { id: 3, category: "rent", description: "Monthly Rent - March 2026", amount: 1200, date: "2026-03-01", paid: true },
  { id: 4, category: "supplier", description: "National Drug Co. - Invoice #INV-0298", amount: 960, date: "2026-03-12", paid: false },
  { id: 5, category: "utilities", description: "Electricity Bill - March", amount: 320, date: "2026-03-10", paid: true },
  { id: 6, category: "supplier", description: "Al-Hikma Pharmaceuticals - Invoice #INV-0285", amount: 2100, date: "2026-03-08", paid: false },
  { id: 7, category: "utilities", description: "Internet & Phone - March", amount: 85, date: "2026-03-05", paid: true },
  { id: 8, category: "salary", description: "Bonus - Dr. Sarah (Employee of Month)", amount: 300, date: "2026-03-03", paid: true },
];

const monthlyTrend = [
  { month: "Oct", amount: 8200 },
  { month: "Nov", amount: 9100 },
  { month: "Dec", amount: 10500 },
  { month: "Jan", amount: 8800 },
  { month: "Feb", amount: 9400 },
  { month: "Mar", amount: 11305 },
];

type FilterCat = "all" | "supplier" | "salary" | "rent" | "utilities";

export default function Expenses() {
  const [filter, setFilter] = useState<FilterCat>("all");

  const filtered = filter === "all" ? mockExpenses : mockExpenses.filter((e) => e.category === filter);
  const totalExpenses = mockExpenses.reduce((s, e) => s + e.amount, 0);
  const totalPaid = mockExpenses.filter((e) => e.paid).reduce((s, e) => s + e.amount, 0);
  const totalPending = totalExpenses - totalPaid;

  const getCategoryIcon = (cat: string) => {
    const found = expenseCategories.find((c) => c.key === cat);
    return found ? found : expenseCategories[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Expenses</h1>
          <p className="text-sm text-muted-foreground">Track salaries, rent, utilities & supplier payments</p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Total Expenses</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Paid</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums text-primary">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Pending</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums text-destructive">${totalPending.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">This Month</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums">{mockExpenses.length}</p>
          <span className="text-xs text-muted-foreground">transactions</span>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="rounded-xl border border-border bg-card p-5 elevation-1">
        <h2 className="text-sm font-semibold mb-4">Monthly Expense Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
            <Area type="monotone" dataKey="amount" stroke="hsl(0, 84%, 60%)" fill="url(#expGrad)" strokeWidth={2} name="Expenses" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Filter + Table */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          className="text-xs"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        {expenseCategories.map((cat) => (
          <Button
            key={cat.key}
            variant={filter === cat.key ? "default" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => setFilter(cat.key as FilterCat)}
          >
            <cat.icon className="mr-1 h-3 w-3" />
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card elevation-1 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Category</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Description</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Date</th>
              <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Amount</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((expense) => {
              const cat = getCategoryIcon(expense.category);
              return (
                <tr key={expense.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-lg bg-secondary flex items-center justify-center ${cat.color}`}>
                        <cat.icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium capitalize">{expense.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">{expense.description}</td>
                  <td className="px-4 py-3 text-xs font-mono tabular-nums text-muted-foreground">{expense.date}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums font-semibold">${expense.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={expense.paid ? "default" : "destructive"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {expense.paid ? "Paid" : "Pending"}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
