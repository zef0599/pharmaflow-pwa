import { useState } from "react";
import { Search, RotateCcw, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockTransactions = [
  { id: "TXN-001", date: "2026-03-17 14:22", items: [{ name: "Amoxicillin 500mg", qty: 2, price: 12.5 }], total: 25.0, payment: "cash", returned: false },
  { id: "TXN-002", date: "2026-03-17 13:45", items: [{ name: "Paracetamol 500mg", qty: 1, price: 8.0 }, { name: "Ibuprofen 400mg", qty: 1, price: 8.0 }], total: 16.0, payment: "customer", returned: false },
  { id: "TXN-003", date: "2026-03-17 11:30", items: [{ name: "Omeprazole 20mg", qty: 3, price: 12.0 }], total: 36.0, payment: "cash", returned: true },
  { id: "TXN-004", date: "2026-03-16 16:10", items: [{ name: "Metformin 850mg", qty: 1, price: 12.5 }], total: 12.5, payment: "cash", returned: false },
];

export default function Returns() {
  const [search, setSearch] = useState("");

  const filtered = mockTransactions.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Returns</h1>
        <p className="text-sm text-muted-foreground">Process returns as reverse transactions — no deletions</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by transaction ID or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      <div className="rounded-lg border border-border bg-card elevation-1 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Transaction</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Items</th>
              <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Total</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Payment</th>
              <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((txn) => (
              <tr key={txn.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-mono font-medium text-xs">{txn.id}</p>
                  <p className="text-xs text-muted-foreground">{txn.date}</p>
                </td>
                <td className="px-4 py-3">
                  {txn.items.map((item, i) => (
                    <p key={i} className="text-xs">
                      {item.name} x{item.qty}
                    </p>
                  ))}
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums font-medium">
                  ${txn.total.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="text-xs font-normal capitalize">{txn.payment}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {txn.returned ? (
                    <span className="inline-flex items-center gap-1 text-xs text-primary">
                      <CheckCircle className="h-3 w-3" />
                      Returned
                    </span>
                  ) : (
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      <RotateCcw className="mr-1 h-3 w-3" />
                      Return
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
