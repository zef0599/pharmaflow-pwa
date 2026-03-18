import { useState } from "react";
import { Search, Plus, Phone, Mail, Building2, TrendingDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
}

const mockSuppliers: Supplier[] = [
  { id: 1, name: "MedPharma Distributors", contact: "Ahmad Hassan", email: "ahmad@medpharma.com", phone: "+962-79-1234567", totalOrders: 47, outstandingDebt: 3420.0, lastOrder: "2026-03-15", status: "active" },
  { id: 2, name: "National Drug Co.", contact: "Sara Khaled", email: "sara@nationaldrug.com", phone: "+962-78-9876543", totalOrders: 32, outstandingDebt: 1250.0, lastOrder: "2026-03-12", status: "active" },
  { id: 3, name: "Al-Hikma Pharmaceuticals", contact: "Omar Nabil", email: "omar@alhikma.com", phone: "+962-77-5551234", totalOrders: 18, outstandingDebt: 0, lastOrder: "2026-02-28", status: "active" },
  { id: 4, name: "Jordanian Pharma Supply", contact: "Lina Tariq", email: "lina@jps.com", phone: "+962-79-4443210", totalOrders: 9, outstandingDebt: 780.0, lastOrder: "2026-01-20", status: "inactive" },
];

const recentPurchases = [
  { id: 1, supplier: "MedPharma Distributors", invoice: "INV-2026-0312", items: 12, total: 1840.0, date: "2026-03-15", paid: false },
  { id: 2, supplier: "National Drug Co.", invoice: "INV-2026-0298", items: 8, total: 960.0, date: "2026-03-12", paid: true },
  { id: 3, supplier: "MedPharma Distributors", invoice: "INV-2026-0285", items: 15, total: 2100.0, date: "2026-03-08", paid: false },
  { id: 4, supplier: "Al-Hikma Pharmaceuticals", invoice: "INV-2026-0270", items: 6, total: 720.0, date: "2026-02-28", paid: true },
];

export default function Suppliers() {
  const [search, setSearch] = useState("");

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
          <h1 className="text-lg font-semibold">Suppliers</h1>
          <p className="text-sm text-muted-foreground">Manage your supply chain and debts</p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Total Suppliers</span>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums">{mockSuppliers.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Active</span>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums text-primary">
            {mockSuppliers.filter((s) => s.status === "active").length}
          </p>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-1.5">
            <TrendingDown className="h-3.5 w-3.5 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Total Debt</span>
          </div>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums text-destructive">
            ${totalDebt.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Pending Invoices</span>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums">
            {recentPurchases.filter((p) => !p.paid).length}
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

      {/* Supplier Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((supplier) => (
          <div
            key={supplier.id}
            className="rounded-lg border border-border bg-card p-4 elevation-1 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {supplier.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{supplier.contact}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={supplier.status === "active" ? "default" : "secondary"}
                  className="text-[10px] px-1.5 py-0"
                >
                  {supplier.status}
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Orders</span>
                <p className="font-mono font-medium tabular-nums">{supplier.totalOrders}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Debt</span>
                <p className={`font-mono font-medium tabular-nums ${supplier.outstandingDebt > 0 ? "text-destructive" : "text-primary"}`}>
                  ${supplier.outstandingDebt.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Order</span>
                <p className="font-mono tabular-nums">{supplier.lastOrder}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> {supplier.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" /> {supplier.email}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Purchase Orders */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Recent Purchase Orders</h2>
        <div className="rounded-lg border border-border bg-card elevation-1 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Invoice</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Supplier</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Items</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Total</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map((po) => (
                <tr key={po.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-mono font-medium text-xs">{po.invoice}</p>
                    <p className="text-xs text-muted-foreground">{po.date}</p>
                  </td>
                  <td className="px-4 py-3 text-xs">{po.supplier}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">{po.items}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums font-medium">${po.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={po.paid ? "default" : "destructive"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {po.paid ? "Paid" : "Unpaid"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
