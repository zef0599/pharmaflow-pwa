import { useState } from "react";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Building2,
  TrendingDown,
  ChevronRight,
  DollarSign,
  Package,
  Calendar,
  FileText,
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

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  totalOrders: number;
  outstandingDebt: number;
  lastOrder: string;
  status: "active" | "inactive";
  monthlyPurchases: { month: string; amount: number }[];
  invoices: { id: string; date: string; items: number; total: number; paid: boolean; dueDate: string }[];
}

const mockSuppliers: Supplier[] = [
  {
    id: 1, name: "MedPharma Distributors", contact: "Ahmad Hassan", email: "ahmad@medpharma.com",
    phone: "+962-79-1234567", totalOrders: 47, outstandingDebt: 3420.0, lastOrder: "2026-03-15", status: "active",
    monthlyPurchases: [
      { month: "Oct", amount: 4200 }, { month: "Nov", amount: 5100 }, { month: "Dec", amount: 6200 },
      { month: "Jan", amount: 4800 }, { month: "Feb", amount: 5500 }, { month: "Mar", amount: 3940 },
    ],
    invoices: [
      { id: "INV-0312", date: "2026-03-15", items: 12, total: 1840, paid: false, dueDate: "2026-04-15" },
      { id: "INV-0285", date: "2026-03-08", items: 15, total: 2100, paid: false, dueDate: "2026-04-08" },
      { id: "INV-0260", date: "2026-02-20", items: 8, total: 1200, paid: true, dueDate: "2026-03-20" },
    ],
  },
  {
    id: 2, name: "National Drug Co.", contact: "Sara Khaled", email: "sara@nationaldrug.com",
    phone: "+962-78-9876543", totalOrders: 32, outstandingDebt: 1250.0, lastOrder: "2026-03-12", status: "active",
    monthlyPurchases: [
      { month: "Oct", amount: 2800 }, { month: "Nov", amount: 3200 }, { month: "Dec", amount: 3800 },
      { month: "Jan", amount: 3100 }, { month: "Feb", amount: 2900 }, { month: "Mar", amount: 2210 },
    ],
    invoices: [
      { id: "INV-0298", date: "2026-03-12", items: 8, total: 960, paid: true, dueDate: "2026-04-12" },
      { id: "INV-0275", date: "2026-02-25", items: 10, total: 1250, paid: false, dueDate: "2026-03-25" },
    ],
  },
  {
    id: 3, name: "Al-Hikma Pharmaceuticals", contact: "Omar Nabil", email: "omar@alhikma.com",
    phone: "+962-77-5551234", totalOrders: 18, outstandingDebt: 0, lastOrder: "2026-02-28", status: "active",
    monthlyPurchases: [
      { month: "Oct", amount: 1500 }, { month: "Nov", amount: 1800 }, { month: "Dec", amount: 2100 },
      { month: "Jan", amount: 1600 }, { month: "Feb", amount: 1900 }, { month: "Mar", amount: 0 },
    ],
    invoices: [
      { id: "INV-0270", date: "2026-02-28", items: 6, total: 720, paid: true, dueDate: "2026-03-28" },
    ],
  },
  {
    id: 4, name: "Jordanian Pharma Supply", contact: "Lina Tariq", email: "lina@jps.com",
    phone: "+962-79-4443210", totalOrders: 9, outstandingDebt: 780.0, lastOrder: "2026-01-20", status: "inactive",
    monthlyPurchases: [
      { month: "Oct", amount: 900 }, { month: "Nov", amount: 1100 }, { month: "Dec", amount: 800 },
      { month: "Jan", amount: 780 }, { month: "Feb", amount: 0 }, { month: "Mar", amount: 0 },
    ],
    invoices: [
      { id: "INV-0240", date: "2026-01-20", items: 5, total: 780, paid: false, dueDate: "2026-02-20" },
    ],
  },
];

export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const totalDebt = mockSuppliers.reduce((sum, s) => sum + s.outstandingDebt, 0);
  const filtered = mockSuppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Suppliers</h1>
          <p className="text-sm text-muted-foreground">Manage suppliers, purchase orders & debts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-1.5 h-4 w-4" />
            New Order
          </Button>
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Total Suppliers</span>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums">{mockSuppliers.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Active</span>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums text-primary">
            {mockSuppliers.filter((s) => s.status === "active").length}
          </p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-1.5">
            <TrendingDown className="h-3.5 w-3.5 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Total Debt</span>
          </div>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums text-destructive">
            ${totalDebt.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Pending Invoices</span>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums">
            {mockSuppliers.reduce((s, sup) => s + sup.invoices.filter((i) => !i.paid).length, 0)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Supplier List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((supplier) => (
            <div
              key={supplier.id}
              onClick={() => setSelectedSupplier(supplier)}
              className={`rounded-xl border bg-card p-4 elevation-1 transition-all cursor-pointer ${
                selectedSupplier?.id === supplier.id
                  ? "border-primary ring-1 ring-primary/20"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {supplier.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{supplier.contact}</p>
                </div>
                <Badge variant={supplier.status === "active" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                  {supplier.status}
                </Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Orders</span>
                  <p className="font-mono font-medium tabular-nums">{supplier.totalOrders}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Debt</span>
                  <p className={`font-mono font-medium tabular-nums ${supplier.outstandingDebt > 0 ? "text-destructive" : "text-primary"}`}>
                    ${supplier.outstandingDebt.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Order</span>
                  <p className="font-mono tabular-nums">{supplier.lastOrder}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supplier Detail */}
        <div className="lg:col-span-3">
          {selectedSupplier ? (
            <div className="space-y-4">
              {/* Supplier Info */}
              <div className="rounded-xl border border-border bg-card p-5 elevation-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold">{selectedSupplier.name}</h2>
                    <p className="text-xs text-muted-foreground">{selectedSupplier.contact}</p>
                  </div>
                  {selectedSupplier.outstandingDebt > 0 && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Outstanding Debt</p>
                      <p className="text-lg font-bold font-mono text-destructive">${selectedSupplier.outstandingDebt.toLocaleString()}</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <span className="text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</span>
                    <p className="font-medium mt-1">{selectedSupplier.phone}</p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <span className="text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</span>
                    <p className="font-medium mt-1">{selectedSupplier.email}</p>
                  </div>
                </div>
              </div>

              {/* Monthly Purchases Chart */}
              <div className="rounded-xl border border-border bg-card p-5 elevation-1">
                <h3 className="text-sm font-semibold mb-4">Monthly Purchases</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={selectedSupplier.monthlyPurchases}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="amount" fill="hsl(160, 84%, 39%)" radius={[6, 6, 0, 0]} name="Amount ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Invoices */}
              <div className="rounded-xl border border-border bg-card p-5 elevation-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Invoices</h3>
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <DollarSign className="mr-1 h-3 w-3" />
                    Record Payment
                  </Button>
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Invoice</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Date</th>
                        <th className="px-3 py-2 text-right font-medium text-muted-foreground">Items</th>
                        <th className="px-3 py-2 text-right font-medium text-muted-foreground">Total</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Due</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSupplier.invoices.map((inv) => (
                        <tr key={inv.id} className="border-b border-border last:border-0">
                          <td className="px-3 py-2 font-mono font-medium">{inv.id}</td>
                          <td className="px-3 py-2 font-mono text-muted-foreground">{inv.date}</td>
                          <td className="px-3 py-2 text-right font-mono tabular-nums">{inv.items}</td>
                          <td className="px-3 py-2 text-right font-mono font-semibold tabular-nums">${inv.total.toLocaleString()}</td>
                          <td className="px-3 py-2 font-mono text-muted-foreground">{inv.dueDate}</td>
                          <td className="px-3 py-2">
                            <Badge variant={inv.paid ? "default" : "destructive"} className="text-[10px] px-1.5 py-0">
                              {inv.paid ? "Paid" : "Unpaid"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
              <Building2 className="h-10 w-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Select a supplier to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
