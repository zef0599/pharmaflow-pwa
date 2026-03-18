import { useState } from "react";
import { Search, Plus, User, Phone, CreditCard, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: number;
  name: string;
  phone: string;
  totalPurchases: number;
  balance: number;
  lastVisit: string;
  visits: number;
}

const mockCustomers: Customer[] = [
  { id: 1, name: "Mohammed Al-Rashid", phone: "+962-79-1112233", totalPurchases: 1240.0, balance: -85.0, lastVisit: "2026-03-17", visits: 24 },
  { id: 2, name: "Fatima Hassan", phone: "+962-78-4445566", totalPurchases: 890.0, balance: 0, lastVisit: "2026-03-16", visits: 15 },
  { id: 3, name: "Ahmad Noor", phone: "+962-77-7778899", totalPurchases: 2340.0, balance: -220.0, lastVisit: "2026-03-14", visits: 42 },
  { id: 4, name: "Layla Karim", phone: "+962-79-3334455", totalPurchases: 450.0, balance: 0, lastVisit: "2026-03-10", visits: 8 },
  { id: 5, name: "Omar Saeed", phone: "+962-78-6667788", totalPurchases: 1680.0, balance: -45.0, lastVisit: "2026-03-08", visits: 31 },
];

const recentTransactions = [
  { id: 1, customer: "Mohammed Al-Rashid", type: "purchase", amount: 45.0, date: "2026-03-17 14:22" },
  { id: 2, customer: "Ahmad Noor", type: "payment", amount: 100.0, date: "2026-03-16 10:15" },
  { id: 3, customer: "Mohammed Al-Rashid", type: "purchase", amount: 28.5, date: "2026-03-15 16:40" },
  { id: 4, customer: "Fatima Hassan", type: "purchase", amount: 12.0, date: "2026-03-14 09:30" },
  { id: 5, customer: "Omar Saeed", type: "purchase", amount: 67.0, date: "2026-03-12 11:55" },
];

export default function Customers() {
  const [search, setSearch] = useState("");

  const totalOwed = mockCustomers.reduce((sum, c) => sum + Math.abs(Math.min(c.balance, 0)), 0);
  const filtered = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Customer Ledger</h1>
          <p className="text-sm text-muted-foreground">Track customer purchases, balances, and history</p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Total Customers</span>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums">{mockCustomers.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums text-primary">
            ${mockCustomers.reduce((s, c) => s + c.totalPurchases, 0).toFixed(0)}
          </p>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <span className="text-xs font-medium text-muted-foreground">Outstanding Balance</span>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums text-destructive">
            ${totalOwed.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Avg. Visits</span>
          <p className="mt-1 text-2xl font-semibold font-mono tabular-nums">
            {Math.round(mockCustomers.reduce((s, c) => s + c.visits, 0) / mockCustomers.length)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      {/* Customer List */}
      <div className="space-y-2">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 elevation-1 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{customer.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {customer.phone}
                  </span>
                  <span>·</span>
                  <span>{customer.visits} visits</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-mono font-medium tabular-nums">
                  ${customer.totalPurchases.toFixed(2)}
                </p>
                {customer.balance < 0 && (
                  <p className="text-[10px] font-medium text-destructive flex items-center justify-end gap-0.5">
                    <CreditCard className="h-3 w-3" />
                    Owes ${Math.abs(customer.balance).toFixed(2)}
                  </p>
                )}
                {customer.balance === 0 && (
                  <p className="text-[10px] font-medium text-primary">Paid up</p>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Recent Activity</h2>
        <div className="rounded-lg border border-border bg-card elevation-1 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Customer</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Type</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Amount</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 text-xs font-medium">{txn.customer}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={txn.type === "payment" ? "default" : "secondary"}
                      className="text-[10px] px-1.5 py-0 capitalize"
                    >
                      {txn.type}
                    </Badge>
                  </td>
                  <td className={`px-4 py-3 text-right font-mono tabular-nums font-medium ${txn.type === "payment" ? "text-primary" : ""}`}>
                    {txn.type === "payment" ? "+" : ""}${txn.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
