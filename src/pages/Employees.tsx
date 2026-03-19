import { useState } from "react";
import {
  Search,
  Plus,
  Star,
  ShoppingCart,
  Clock,
  TrendingUp,
  ChevronRight,
  UserCheck,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Employee {
  id: number;
  name: string;
  role: string;
  phone: string;
  startDate: string;
  totalSales: number;
  totalProfit: number;
  transactionCount: number;
  rating: number;
  reviewCount: number;
  status: "active" | "on_leave";
  attendance: { present: number; absent: number; total: number };
  monthlySales: { month: string; sales: number }[];
}

const mockEmployees: Employee[] = [
  {
    id: 1, name: "Dr. Sarah Ahmad", role: "Pharmacist", phone: "+962-79-1112233",
    startDate: "2024-06-15", totalSales: 45200, totalProfit: 12800, transactionCount: 892,
    rating: 4.7, reviewCount: 34, status: "active",
    attendance: { present: 22, absent: 1, total: 23 },
    monthlySales: [
      { month: "Oct", sales: 6800 }, { month: "Nov", sales: 7200 }, { month: "Dec", sales: 8100 },
      { month: "Jan", sales: 7500 }, { month: "Feb", sales: 7800 }, { month: "Mar", sales: 7800 },
    ],
  },
  {
    id: 2, name: "Ahmad Khaled", role: "Pharmacist", phone: "+962-78-4445566",
    startDate: "2025-01-10", totalSales: 28400, totalProfit: 7900, transactionCount: 567,
    rating: 4.3, reviewCount: 21, status: "active",
    attendance: { present: 20, absent: 3, total: 23 },
    monthlySales: [
      { month: "Oct", sales: 0 }, { month: "Nov", sales: 0 }, { month: "Dec", sales: 0 },
      { month: "Jan", sales: 8200 }, { month: "Feb", sales: 9800 }, { month: "Mar", sales: 10400 },
    ],
  },
  {
    id: 3, name: "Lina Mansour", role: "Cashier", phone: "+962-77-7778899",
    startDate: "2025-03-01", totalSales: 12100, totalProfit: 3200, transactionCount: 234,
    rating: 4.9, reviewCount: 12, status: "active",
    attendance: { present: 14, absent: 0, total: 14 },
    monthlySales: [
      { month: "Oct", sales: 0 }, { month: "Nov", sales: 0 }, { month: "Dec", sales: 0 },
      { month: "Jan", sales: 0 }, { month: "Feb", sales: 0 }, { month: "Mar", sales: 12100 },
    ],
  },
];

const mockReviews = [
  { id: 1, employee: "Dr. Sarah Ahmad", customer: "Mohammed Al-Rashid", rating: 5, comment: "Very helpful and professional", date: "2026-03-16" },
  { id: 2, employee: "Ahmad Khaled", customer: "Fatima Hassan", rating: 4, comment: "Good service, a bit slow", date: "2026-03-15" },
  { id: 3, employee: "Lina Mansour", customer: "Ahmad Noor", rating: 5, comment: "Excellent and friendly!", date: "2026-03-14" },
  { id: 4, employee: "Dr. Sarah Ahmad", customer: "Omar Saeed", rating: 4, comment: "Knowledgeable pharmacist", date: "2026-03-12" },
];

export default function Employees() {
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filtered = mockEmployees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Employees</h1>
          <p className="text-sm text-muted-foreground">Performance tracking & customer reviews</p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Total Staff</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums">{mockEmployees.length}</p>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Total Sales</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums text-primary">
            ${mockEmployees.reduce((s, e) => s + e.totalSales, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
              <Star className="h-4 w-4 text-warning" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Avg Rating</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums">
            {(mockEmployees.reduce((s, e) => s + e.rating, 0) / mockEmployees.length).toFixed(1)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Total Reviews</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums">
            {mockEmployees.reduce((s, e) => s + e.reviewCount, 0)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      {/* Employee Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelectedEmployee(selectedEmployee?.id === emp.id ? null : emp)}
            className={`rounded-xl border bg-card p-4 elevation-1 hover:border-primary/30 transition-all cursor-pointer ${
              selectedEmployee?.id === emp.id ? "border-primary ring-1 ring-primary/20" : "border-border"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                  {emp.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{emp.name}</h3>
                  <p className="text-xs text-muted-foreground">{emp.role}</p>
                </div>
              </div>
              <Badge variant={emp.status === "active" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                {emp.status === "active" ? "Active" : "On Leave"}
              </Badge>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-secondary/50 p-2 text-center">
                <p className="text-lg font-bold font-mono tabular-nums">${(emp.totalSales / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-muted-foreground">Sales</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2 text-center">
                <p className="text-lg font-bold font-mono tabular-nums">{emp.transactionCount}</p>
                <p className="text-[10px] text-muted-foreground">Transactions</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2 text-center">
                <div className="flex items-center justify-center gap-0.5">
                  <Star className="h-3 w-3 text-warning fill-warning" />
                  <span className="text-lg font-bold font-mono tabular-nums">{emp.rating}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{emp.reviewCount} reviews</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Since {emp.startDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {emp.attendance.present}/{emp.attendance.total} days
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Employee Sales Chart */}
      {selectedEmployee && (
        <div className="rounded-xl border border-border bg-card p-5 elevation-1">
          <h2 className="text-sm font-semibold mb-4">
            {selectedEmployee.name} — Monthly Sales Performance
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={selectedEmployee.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="sales" fill="hsl(160, 84%, 39%)" radius={[6, 6, 0, 0]} name="Sales ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Customer Reviews */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Recent Customer Reviews</h2>
        <div className="space-y-2">
          {mockReviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border bg-card p-4 elevation-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{review.employee}</p>
                  <p className="text-xs text-muted-foreground">by {review.customer} · {review.date}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < review.rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
