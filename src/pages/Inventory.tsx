import { useState } from "react";
import { Search, Plus, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockInventory = [
  { id: 1, name: "Amoxicillin 500mg", generic: "Amoxicillin", barcode: "8901234567890", category: "Antibiotic", batches: [{ batchNo: "B882", expiry: "2025-12-15", stock: 45, cost: 8.0 }, { batchNo: "B901", expiry: "2026-06-20", stock: 30, cost: 8.5 }], minStock: 20 },
  { id: 2, name: "Paracetamol 500mg", generic: "Acetaminophen", barcode: "8901234567891", category: "Analgesic", batches: [{ batchNo: "B441", expiry: "2026-03-10", stock: 120, cost: 3.0 }], minStock: 50 },
  { id: 3, name: "Omeprazole 20mg", generic: "Omeprazole", barcode: "8901234567892", category: "PPI", batches: [{ batchNo: "B223", expiry: "2025-08-05", stock: 8, cost: 6.5 }], minStock: 15 },
  { id: 4, name: "Metformin 850mg", generic: "Metformin", barcode: "8901234567893", category: "Antidiabetic", batches: [{ batchNo: "B119", expiry: "2026-01-30", stock: 60, cost: 5.0 }], minStock: 25 },
  { id: 5, name: "Ibuprofen 400mg", generic: "Ibuprofen", barcode: "8901234567894", category: "NSAID", batches: [{ batchNo: "B554", expiry: "2025-06-18", stock: 5, cost: 4.0 }], minStock: 30 },
  { id: 6, name: "Ciprofloxacin 500mg", generic: "Ciprofloxacin", barcode: "8901234567895", category: "Antibiotic", batches: [{ batchNo: "B667", expiry: "2025-09-22", stock: 28, cost: 7.5 }], minStock: 10 },
];

export default function Inventory() {
  const [search, setSearch] = useState("");

  const filtered = mockInventory.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.generic.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Inventory</h1>
          <p className="text-sm text-muted-foreground">{mockInventory.length} products tracked</p>
        </div>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products, generics, or barcodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Product</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Category</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Stock</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground text-xs">Min</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Nearest Expiry</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const totalStock = product.batches.reduce((sum, b) => sum + b.stock, 0);
                const nearestExpiry = product.batches.sort(
                  (a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime()
                )[0];
                const isLowStock = totalStock <= product.minStock;
                const daysToExpiry = Math.ceil(
                  (new Date(nearestExpiry.expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );
                const isExpiringSoon = daysToExpiry <= 30;

                return (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.generic}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-xs font-normal">{product.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums">{totalStock}</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-muted-foreground">{product.minStock}</td>
                    <td className="px-4 py-3 text-xs font-mono tabular-nums">
                      {nearestExpiry.expiry}
                      <span className="ml-1 text-muted-foreground">({nearestExpiry.batchNo})</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {isLowStock && (
                          <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Low Stock</Badge>
                        )}
                        {isExpiringSoon && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-warning text-warning-foreground hover:bg-warning/90">
                            Exp {daysToExpiry}d
                          </Badge>
                        )}
                        {!isLowStock && !isExpiringSoon && (
                          <span className="text-xs text-muted-foreground">OK</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
