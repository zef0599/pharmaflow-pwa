import { useState } from "react";
import {
  Search,
  CreditCard,
  User,
  Phone,
  Calendar,
  Clock,
  Filter,
  ArrowUpDown,
  DollarSign,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CustomerDebt {
  id: number;
  name: string;
  phone: string;
  email: string;
  bankAccount: string;
  address: string;
  totalDebt: number;
  debtSince: string;
  daysSinceDebt: number;
  lastPayment: string;
  transactions: { id: string; date: string; description: string; amount: number; type: "purchase" | "payment" }[];
}

const mockDebts: CustomerDebt[] = [
  {
    id: 1, name: "Mohammed Al-Rashid", phone: "+962-79-1112233", email: "mohammed@email.com",
    bankAccount: "JO94 CBJO 0010 0000 0000 1234 5678", address: "Amman, Jordan",
    totalDebt: 285.0, debtSince: "2026-02-10", daysSinceDebt: 37, lastPayment: "2026-03-05",
    transactions: [
      { id: "TXN-201", date: "2026-03-17", description: "Amoxicillin 500mg x2", amount: 25.0, type: "purchase" },
      { id: "TXN-195", date: "2026-03-15", description: "Paracetamol x3, Omeprazole x1", amount: 36.0, type: "purchase" },
      { id: "PAY-042", date: "2026-03-05", description: "Partial payment", amount: -100.0, type: "payment" },
      { id: "TXN-178", date: "2026-02-28", description: "Metformin 850mg x2", amount: 25.0, type: "purchase" },
    ],
  },
  {
    id: 2, name: "Ahmad Noor", phone: "+962-77-7778899", email: "",
    bankAccount: "", address: "Zarqa, Jordan",
    totalDebt: 520.0, debtSince: "2025-12-20", daysSinceDebt: 89, lastPayment: "2026-01-15",
    transactions: [
      { id: "TXN-199", date: "2026-03-14", description: "Multiple items (5)", amount: 120.0, type: "purchase" },
      { id: "TXN-180", date: "2026-03-01", description: "Ciprofloxacin 500mg x4", amount: 60.0, type: "purchase" },
      { id: "PAY-035", date: "2026-01-15", description: "Partial payment", amount: -200.0, type: "payment" },
    ],
  },
  {
    id: 3, name: "Omar Saeed", phone: "+962-78-6667788", email: "omar.s@email.com",
    bankAccount: "", address: "",
    totalDebt: 45.0, debtSince: "2026-03-08", daysSinceDebt: 11, lastPayment: "",
    transactions: [
      { id: "TXN-192", date: "2026-03-08", description: "Ibuprofen 400mg x2, Paracetamol x1", amount: 24.0, type: "purchase" },
      { id: "TXN-189", date: "2026-03-06", description: "Omeprazole 20mg x1", amount: 12.0, type: "purchase" },
    ],
  },
  {
    id: 4, name: "Layla Karim", phone: "+962-79-3334455", email: "layla.k@email.com",
    bankAccount: "JO94 CBJO 0010 0000 0000 9876 5432", address: "Irbid, Jordan",
    totalDebt: 150.0, debtSince: "2026-01-05", daysSinceDebt: 73, lastPayment: "2026-02-20",
    transactions: [
      { id: "TXN-186", date: "2026-03-02", description: "Metformin x3", amount: 37.5, type: "purchase" },
      { id: "PAY-040", date: "2026-02-20", description: "Partial payment", amount: -50.0, type: "payment" },
    ],
  },
];

type SortBy = "debt_high" | "debt_low" | "oldest" | "newest";
type DebtFilter = "all" | "overdue" | "recent";

export default function CustomerDebts() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("debt_high");
  const [filter, setFilter] = useState<DebtFilter>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  let filtered = mockDebts.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.phone.includes(search)
  );

  if (filter === "overdue") filtered = filtered.filter((d) => d.daysSinceDebt > 30);
  if (filter === "recent") filtered = filtered.filter((d) => d.daysSinceDebt <= 30);

  filtered.sort((a, b) => {
    switch (sortBy) {
      case "debt_high": return b.totalDebt - a.totalDebt;
      case "debt_low": return a.totalDebt - b.totalDebt;
      case "oldest": return b.daysSinceDebt - a.daysSinceDebt;
      case "newest": return a.daysSinceDebt - b.daysSinceDebt;
    }
  });

  const totalDebt = mockDebts.reduce((s, d) => s + d.totalDebt, 0);
  const overdueCount = mockDebts.filter((d) => d.daysSinceDebt > 30).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Customer Debts</h1>
        <p className="text-sm text-muted-foreground">Track outstanding balances and payment history</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-destructive" />
            <span className="text-xs font-medium text-muted-foreground">Total Outstanding</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums text-destructive">${totalDebt.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Debtors</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums">{mockDebts.length}</p>
        </div>
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-xs font-medium text-muted-foreground">Overdue (30d+)</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums text-warning">{overdueCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Avg. Debt</span>
          </div>
          <p className="mt-2 text-2xl font-bold font-mono tabular-nums">${(totalDebt / mockDebts.length).toFixed(0)}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 rounded-lg border border-border bg-secondary/50 p-0.5">
            {(["all", "overdue", "recent"] as DebtFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                  filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {f === "all" ? "All" : f === "overdue" ? "Overdue 30d+" : "Recent"}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="h-9 rounded-lg border border-border bg-card px-3 text-xs"
          >
            <option value="debt_high">Highest Debt</option>
            <option value="debt_low">Lowest Debt</option>
            <option value="oldest">Oldest Debt</option>
            <option value="newest">Newest Debt</option>
          </select>
        </div>
      </div>

      {/* Debtor Cards */}
      <div className="space-y-3">
        {filtered.map((debtor) => (
          <div key={debtor.id} className="rounded-xl border border-border bg-card elevation-1 overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
              onClick={() => setExpandedId(expandedId === debtor.id ? null : debtor.id)}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive text-sm font-bold">
                  {debtor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{debtor.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {debtor.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {debtor.daysSinceDebt}d
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold font-mono tabular-nums text-destructive">${debtor.totalDebt.toFixed(2)}</p>
                {debtor.daysSinceDebt > 30 && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Overdue</Badge>
                )}
              </div>
            </div>

            {expandedId === debtor.id && (
              <div className="border-t border-border p-4 space-y-4 bg-secondary/20">
                {/* Customer Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Phone</span>
                    <p className="font-medium mt-0.5">{debtor.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email</span>
                    <p className="font-medium mt-0.5">{debtor.email || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bank Account</span>
                    <p className="font-medium mt-0.5 font-mono text-[10px]">{debtor.bankAccount || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Address</span>
                    <p className="font-medium mt-0.5">{debtor.address || "—"}</p>
                  </div>
                </div>

                {/* Transaction History */}
                <div>
                  <h4 className="text-xs font-semibold mb-2">Transaction History</h4>
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border bg-secondary/50">
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground">ID</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground">Date</th>
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground">Description</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {debtor.transactions.map((txn) => (
                          <tr key={txn.id} className="border-b border-border last:border-0">
                            <td className="px-3 py-2 font-mono">{txn.id}</td>
                            <td className="px-3 py-2 font-mono text-muted-foreground">{txn.date}</td>
                            <td className="px-3 py-2">{txn.description}</td>
                            <td className={`px-3 py-2 text-right font-mono font-semibold tabular-nums ${
                              txn.type === "payment" ? "text-primary" : "text-destructive"
                            }`}>
                              {txn.type === "payment" ? "" : "+"}${Math.abs(txn.amount).toFixed(2)}
                              {txn.type === "payment" && " ✓"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="text-xs">
                    <DollarSign className="mr-1 h-3 w-3" />
                    Record Payment
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Send Reminder
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
