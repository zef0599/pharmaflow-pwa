import { useState } from "react";
import {
  Search,
  Plus,
  User,
  Phone,
  CreditCard,
  ChevronRight,
  Mail,
  MapPin,
  Star,
  MessageSquare,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  bankAccount: string;
  address: string;
  totalPurchases: number;
  balance: number;
  lastVisit: string;
  visits: number;
  purchaseHistory: { id: string; date: string; items: string; amount: number }[];
  complaints: { id: number; date: string; subject: string; status: "open" | "resolved" }[];
}

const mockCustomers: Customer[] = [
  {
    id: 1, name: "Mohammed Al-Rashid", phone: "+962-79-1112233", email: "mohammed@email.com",
    bankAccount: "JO94 CBJO ****5678", address: "Amman, Jordan",
    totalPurchases: 1240.0, balance: -285.0, lastVisit: "2026-03-17", visits: 24,
    purchaseHistory: [
      { id: "TXN-201", date: "2026-03-17", items: "Amoxicillin 500mg x2", amount: 25.0 },
      { id: "TXN-195", date: "2026-03-15", items: "Paracetamol x3, Omeprazole x1", amount: 36.0 },
      { id: "TXN-178", date: "2026-02-28", items: "Metformin 850mg x2", amount: 25.0 },
    ],
    complaints: [
      { id: 1, date: "2026-03-10", subject: "Long wait time on Friday", status: "resolved" },
    ],
  },
  {
    id: 2, name: "Fatima Hassan", phone: "+962-78-4445566", email: "fatima.h@email.com",
    bankAccount: "", address: "Amman, Jordan",
    totalPurchases: 890.0, balance: 0, lastVisit: "2026-03-16", visits: 15,
    purchaseHistory: [
      { id: "TXN-198", date: "2026-03-16", items: "Paracetamol 500mg x1", amount: 8.0 },
    ],
    complaints: [],
  },
  {
    id: 3, name: "Ahmad Noor", phone: "+962-77-7778899", email: "",
    bankAccount: "", address: "Zarqa, Jordan",
    totalPurchases: 2340.0, balance: -520.0, lastVisit: "2026-03-14", visits: 42,
    purchaseHistory: [
      { id: "TXN-199", date: "2026-03-14", items: "Multiple items (5)", amount: 120.0 },
      { id: "TXN-180", date: "2026-03-01", items: "Ciprofloxacin 500mg x4", amount: 60.0 },
    ],
    complaints: [
      { id: 2, date: "2026-03-12", subject: "Wrong medication dispensed", status: "open" },
    ],
  },
  {
    id: 4, name: "Layla Karim", phone: "+962-79-3334455", email: "layla.k@email.com",
    bankAccount: "JO94 CBJO ****5432", address: "Irbid, Jordan",
    totalPurchases: 450.0, balance: -150.0, lastVisit: "2026-03-10", visits: 8,
    purchaseHistory: [
      { id: "TXN-186", date: "2026-03-02", items: "Metformin x3", amount: 37.5 },
    ],
    complaints: [],
  },
  {
    id: 5, name: "Omar Saeed", phone: "+962-78-6667788", email: "omar.s@email.com",
    bankAccount: "", address: "",
    totalPurchases: 1680.0, balance: -45.0, lastVisit: "2026-03-08", visits: 31,
    purchaseHistory: [
      { id: "TXN-192", date: "2026-03-08", items: "Ibuprofen 400mg x2", amount: 16.0 },
    ],
    complaints: [],
  },
];

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const totalOwed = mockCustomers.reduce((sum, c) => sum + Math.abs(Math.min(c.balance, 0)), 0);
  const filtered = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Customers</h1>
          <p className="text-sm text-muted-foreground">Profiles, purchase history & complaints</p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Total Customers</span>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums">{mockCustomers.length}</p>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
          <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums text-primary">
            ${mockCustomers.reduce((s, c) => s + c.totalPurchases, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <span className="text-xs font-medium text-muted-foreground">Outstanding Debts</span>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums text-destructive">
            ${totalOwed.toFixed(2)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 elevation-1">
          <span className="text-xs font-medium text-muted-foreground">Open Complaints</span>
          <p className="mt-1 text-2xl font-bold font-mono tabular-nums text-warning">
            {mockCustomers.reduce((s, c) => s + c.complaints.filter((x) => x.status === "open").length, 0)}
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

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Customer List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map((customer) => (
            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className={`flex items-center justify-between rounded-xl border bg-card px-4 py-3 elevation-1 transition-all cursor-pointer ${
                selectedCustomer?.id === customer.id
                  ? "border-primary ring-1 ring-primary/20"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-medium">{customer.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{customer.visits} visits</span>
                    {customer.complaints.some((c) => c.status === "open") && (
                      <Badge variant="destructive" className="text-[10px] px-1 py-0">
                        <AlertCircle className="h-2.5 w-2.5 mr-0.5" />
                        Complaint
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {customer.balance < 0 && (
                  <p className="text-xs font-mono font-semibold text-destructive">
                    ${Math.abs(customer.balance).toFixed(2)}
                  </p>
                )}
                {customer.balance === 0 && (
                  <Badge variant="default" className="text-[10px] px-1.5 py-0">Paid</Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Customer Detail */}
        <div className="lg:col-span-3">
          {selectedCustomer ? (
            <div className="rounded-xl border border-border bg-card p-5 elevation-1 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                    {selectedCustomer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-base font-bold">{selectedCustomer.name}</h2>
                    <p className="text-xs text-muted-foreground">Customer since {selectedCustomer.visits} visits</p>
                  </div>
                </div>
                {selectedCustomer.balance < 0 && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Outstanding</p>
                    <p className="text-lg font-bold font-mono text-destructive">${Math.abs(selectedCustomer.balance).toFixed(2)}</p>
                  </div>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <span className="text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</span>
                  <p className="font-medium mt-1">{selectedCustomer.phone}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <span className="text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</span>
                  <p className="font-medium mt-1">{selectedCustomer.email || "—"}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <span className="text-muted-foreground flex items-center gap-1"><CreditCard className="h-3 w-3" /> Bank</span>
                  <p className="font-medium mt-1 font-mono text-[10px]">{selectedCustomer.bankAccount || "—"}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</span>
                  <p className="font-medium mt-1">{selectedCustomer.address || "—"}</p>
                </div>
              </div>

              {/* Purchase History */}
              <div>
                <h3 className="text-xs font-semibold mb-2 flex items-center gap-1">
                  <ShoppingCart className="h-3.5 w-3.5" /> Purchase History
                </h3>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">ID</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Date</th>
                        <th className="px-3 py-2 text-left font-medium text-muted-foreground">Items</th>
                        <th className="px-3 py-2 text-right font-medium text-muted-foreground">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCustomer.purchaseHistory.map((p) => (
                        <tr key={p.id} className="border-b border-border last:border-0">
                          <td className="px-3 py-2 font-mono">{p.id}</td>
                          <td className="px-3 py-2 font-mono text-muted-foreground">{p.date}</td>
                          <td className="px-3 py-2">{p.items}</td>
                          <td className="px-3 py-2 text-right font-mono font-semibold">${p.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Complaints */}
              {selectedCustomer.complaints.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold mb-2 flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" /> Complaints
                  </h3>
                  <div className="space-y-2">
                    {selectedCustomer.complaints.map((c) => (
                      <div key={c.id} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
                        <div>
                          <p className="text-xs font-medium">{c.subject}</p>
                          <p className="text-[10px] text-muted-foreground">{c.date}</p>
                        </div>
                        <Badge
                          variant={c.status === "open" ? "destructive" : "default"}
                          className="text-[10px] px-1.5 py-0"
                        >
                          {c.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" className="text-xs">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  Add Complaint
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  View Full History
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
              <User className="h-10 w-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
