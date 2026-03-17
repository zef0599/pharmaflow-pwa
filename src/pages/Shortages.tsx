import { AlertTriangle, Clock, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ShortageItem {
  id: number;
  name: string;
  batchNo: string;
  stock: number;
  minStock: number;
  expiry: string;
  daysToExpiry: number;
  reason: "low_stock" | "expiring" | "both";
}

const shortageItems: ShortageItem[] = [
  { id: 1, name: "Omeprazole 20mg", batchNo: "B223", stock: 8, minStock: 15, expiry: "2025-08-05", daysToExpiry: 141, reason: "low_stock" },
  { id: 2, name: "Ibuprofen 400mg", batchNo: "B554", stock: 5, minStock: 30, expiry: "2025-06-18", daysToExpiry: 93, reason: "both" },
  { id: 3, name: "Aspirin 300mg", batchNo: "B331", stock: 12, minStock: 10, expiry: "2025-04-20", daysToExpiry: 34, reason: "expiring" },
  { id: 4, name: "Losartan 50mg", batchNo: "B772", stock: 3, minStock: 20, expiry: "2026-02-15", daysToExpiry: 335, reason: "low_stock" },
  { id: 5, name: "Amlodipine 5mg", batchNo: "B445", stock: 7, minStock: 25, expiry: "2025-05-10", daysToExpiry: 54, reason: "both" },
];

export default function Shortages() {
  const lowStockCount = shortageItems.filter((i) => i.reason !== "expiring").length;
  const expiringCount = shortageItems.filter((i) => i.reason !== "low_stock").length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Shortages & Alerts</h1>
        <p className="text-sm text-muted-foreground">Items requiring attention</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium">Low Stock</span>
          </div>
          <p className="mt-1 text-2xl font-mono font-bold tabular-nums">{lowStockCount}</p>
          <p className="text-xs text-muted-foreground">Below minimum level</p>
        </div>
        <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium">Expiring Soon</span>
          </div>
          <p className="mt-1 text-2xl font-mono font-bold tabular-nums">{expiringCount}</p>
          <p className="text-xs text-muted-foreground">Within 90 days</p>
        </div>
      </div>

      {/* Items List */}
      <div className="rounded-lg border border-border bg-card elevation-1 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Product</th>
              <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Stock / Min</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Expiry</th>
              <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Issue</th>
              <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {shortageItems.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Batch #{item.batchNo}</p>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-mono tabular-nums font-medium ${item.stock <= item.minStock ? "text-destructive" : ""}`}>
                    {item.stock}
                  </span>
                  <span className="text-muted-foreground font-mono"> / {item.minStock}</span>
                </td>
                <td className="px-4 py-3 font-mono tabular-nums text-xs">
                  {item.expiry}
                  {item.daysToExpiry <= 90 && (
                    <span className="ml-1 text-warning font-medium">({item.daysToExpiry}d)</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {(item.reason === "low_stock" || item.reason === "both") && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Low</Badge>
                    )}
                    {(item.reason === "expiring" || item.reason === "both") && (
                      <Badge className="text-[10px] px-1.5 py-0 bg-warning text-warning-foreground hover:bg-warning/90">Expiring</Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    Order
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
