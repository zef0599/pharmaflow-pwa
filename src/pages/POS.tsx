import { useState, useRef } from "react";
import { Search, Plus, Minus, Trash2, Banknote, User, Camera, X, FileText, Truck, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  batchNo: string;
  expiry: string;
  wholesaleCost: number;
  price: number;
  qty: number;
  maxQty: number;
}

const mockProducts = [
  { id: 1, name: "Amoxicillin 500mg", batchNo: "B882", expiry: "12/2025", wholesaleCost: 8.0, price: 12.5, stock: 45, daysToExpiry: 275 },
  { id: 2, name: "Paracetamol 500mg", batchNo: "B441", expiry: "03/2026", wholesaleCost: 3.0, price: 8.0, stock: 120, daysToExpiry: 365 },
  { id: 3, name: "Omeprazole 20mg", batchNo: "B223", expiry: "08/2025", wholesaleCost: 6.5, price: 12.0, stock: 32, daysToExpiry: 141 },
  { id: 4, name: "Metformin 850mg", batchNo: "B119", expiry: "01/2026", wholesaleCost: 5.0, price: 12.5, stock: 60, daysToExpiry: 310 },
  { id: 5, name: "Ibuprofen 400mg", batchNo: "B554", expiry: "06/2025", wholesaleCost: 4.0, price: 8.0, stock: 85, daysToExpiry: 93 },
  { id: 6, name: "Ciprofloxacin 500mg", batchNo: "B667", expiry: "09/2025", wholesaleCost: 7.5, price: 15.0, stock: 28, daysToExpiry: 188 },
];

const mockSuppliers = [
  { id: 1, name: "MedPharma Distributors" },
  { id: 2, name: "National Drug Co." },
  { id: 3, name: "Al-Hikma Pharmaceuticals" },
];

const mockCustomersWithDebt = [
  { id: 1, name: "Mohammed Al-Rashid", debt: 285.0, phone: "+962-79-111" },
  { id: 2, name: "Ahmad Noor", debt: 520.0, phone: "+962-77-777" },
  { id: 3, name: "Omar Saeed", debt: 45.0, phone: "+962-78-666" },
];

type POSMode = "sell" | "supplier_purchase" | "customer_debt";

export default function POS() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentType, setPaymentType] = useState<"cash" | "customer">("cash");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [mode, setMode] = useState<POSMode>("sell");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [debtPaymentAmount, setDebtPaymentAmount] = useState("");
  const [selectedDebtor, setSelectedDebtor] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: typeof mockProducts[0]) => {
    if (product.daysToExpiry <= 90) {
      toast({
        title: "⚠️ Near Expiry Alert",
        description: `${product.name} (Batch #${product.batchNo}) expires in ${product.daysToExpiry} days. FEFO applied.`,
        variant: "destructive",
      });
    }
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        if (existing.qty >= existing.maxQty) return prev;
        return prev.map((c) => c.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id: product.id, name: product.name, batchNo: product.batchNo, expiry: product.expiry, wholesaleCost: product.wholesaleCost, price: product.price, qty: 1, maxQty: product.stock }];
    });
    setSearch("");
    searchRef.current?.focus();
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const newQty = c.qty + delta;
        if (newQty <= 0) return null as any;
        if (newQty > c.maxQty) return c;
        return { ...c, qty: newQty };
      }).filter(Boolean)
    );
  };

  const updatePrice = (id: number, newPrice: number) => {
    setCart((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return { ...c, price: Math.max(newPrice, c.wholesaleCost + 0.01) };
      })
    );
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const totalMargin = cart.reduce((sum, c) => sum + (c.price - c.wholesaleCost) * c.qty, 0);

  const confirmSale = () => {
    toast({ title: "✅ Sale Confirmed", description: `Invoice generated for $${total.toFixed(2)} (${paymentType}). ${cart.length} items sold.` });
    setCart([]);
  };

  const confirmSupplierPurchase = () => {
    toast({ title: "✅ Purchase Recorded", description: `Supplier order from ${selectedSupplier} — $${total.toFixed(2)} recorded. Inventory updated.` });
    setCart([]);
    setSelectedSupplier("");
  };

  const confirmDebtPayment = () => {
    const debtor = mockCustomersWithDebt.find((d) => d.name === selectedDebtor);
    toast({ title: "✅ Debt Payment Recorded", description: `${selectedDebtor} paid $${debtPaymentAmount}. Remaining: $${((debtor?.debt || 0) - parseFloat(debtPaymentAmount || "0")).toFixed(2)}` });
    setDebtPaymentAmount("");
    setSelectedDebtor("");
  };

  return (
    <div className="space-y-4">
      {/* Mode Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <h1 className="text-xl font-bold mr-2">Point of Sale</h1>
        <div className="flex gap-1 rounded-lg border border-border bg-secondary/50 p-0.5">
          {([
            { key: "sell", label: "Sell", icon: FileText },
            { key: "supplier_purchase", label: "Supplier Purchase", icon: Truck },
            { key: "customer_debt", label: "Debt Payment", icon: CreditCard },
          ] as const).map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                mode === m.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <m.icon className="h-3 w-3" />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Debt Payment Mode */}
      {mode === "customer_debt" && (
        <div className="rounded-xl border border-border bg-card p-5 elevation-1 space-y-4 max-w-lg">
          <h2 className="text-sm font-semibold">Record Customer Debt Payment</h2>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Customer</label>
            <select
              value={selectedDebtor}
              onChange={(e) => setSelectedDebtor(e.target.value)}
              className="mt-1 w-full h-9 rounded-lg border border-border bg-card px-3 text-sm"
            >
              <option value="">Select customer...</option>
              {mockCustomersWithDebt.map((c) => (
                <option key={c.id} value={c.name}>{c.name} — Owes ${c.debt.toFixed(2)}</option>
              ))}
            </select>
          </div>
          {selectedDebtor && (
            <>
              <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                <p className="text-xs text-muted-foreground">Current Debt</p>
                <p className="text-xl font-bold font-mono text-destructive">
                  ${mockCustomersWithDebt.find((d) => d.name === selectedDebtor)?.debt.toFixed(2)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Payment Amount</label>
                <Input
                  type="number"
                  value={debtPaymentAmount}
                  onChange={(e) => setDebtPaymentAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-1 font-mono"
                />
              </div>
              <Button className="w-full" onClick={confirmDebtPayment} disabled={!debtPaymentAmount || parseFloat(debtPaymentAmount) <= 0}>
                <DollarSign className="mr-2 h-4 w-4" />
                Confirm Payment · ${debtPaymentAmount || "0.00"}
              </Button>
            </>
          )}
        </div>
      )}

      {/* Sell / Supplier Purchase Mode */}
      {mode !== "customer_debt" && (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Product Search */}
          <div className="flex-1 space-y-3">
            {mode === "supplier_purchase" && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
                <h3 className="text-xs font-semibold text-primary flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5" /> Supplier Purchase Mode
                </h3>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full h-9 rounded-lg border border-border bg-card px-3 text-sm"
                >
                  <option value="">Select supplier...</option>
                  {mockSuppliers.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Search + Scanner */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={searchRef}
                  placeholder="Search by name or scan barcode..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 font-mono text-sm"
                  autoFocus
                />
              </div>
              <Button
                variant={scannerOpen ? "default" : "outline"}
                size="icon"
                onClick={() => setScannerOpen(!scannerOpen)}
                title="Open barcode scanner"
              >
                {scannerOpen ? <X className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              </Button>
            </div>

            {scannerOpen && (
              <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
                <Camera className="h-10 w-10 mx-auto text-primary/50 mb-2" />
                <p className="text-sm font-medium text-primary">Camera Barcode Scanner</p>
                <p className="text-xs text-muted-foreground mt-1">Point your device camera at a barcode</p>
                <div className="mt-3 h-40 bg-foreground/5 rounded-lg flex items-center justify-center border border-border">
                  <span className="text-xs text-muted-foreground font-mono">Camera feed will appear here</span>
                </div>
              </div>
            )}

            {/* Product List */}
            <div className="space-y-1 max-h-[calc(100vh-340px)] overflow-y-auto">
              {(search ? filtered : mockProducts).map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 text-left hover:bg-secondary hover:border-primary/20 transition-all"
                >
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Exp: {product.expiry} · Batch #{product.batchNo} · Stock: {product.stock}
                      {product.daysToExpiry <= 90 && (
                        <span className="ml-1 text-warning font-medium">⚠ {product.daysToExpiry}d</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-medium tabular-nums">${product.price.toFixed(2)}</p>
                    <p className="text-[10px] text-primary font-medium">
                      +{(((product.price - product.wholesaleCost) / product.wholesaleCost) * 100).toFixed(0)}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cart Panel */}
          <div className="w-full lg:w-96 flex flex-col rounded-xl border border-border bg-card elevation-1">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">
                {mode === "sell" ? "Sale" : "Purchase"} Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <ShoppingCartEmpty />
                  <p className="text-sm mt-2">Scan or search to add items</p>
                </div>
              ) : (
                cart.map((item) => {
                  const margin = ((item.price - item.wholesaleCost) / item.wholesaleCost) * 100;
                  const belowCost = item.price <= item.wholesaleCost;
                  return (
                    <div key={item.id} className="rounded-xl bg-secondary/50 p-2">
                      <div className="flex justify-between items-center p-2 bg-card rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Exp: {item.expiry} · #{item.batchNo}</p>
                        </div>
                        <div className="text-right ml-3">
                          <input
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updatePrice(item.id, parseFloat(e.target.value) || 0)}
                            className={`w-20 text-right font-mono text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded px-1 ${belowCost ? "text-destructive" : ""}`}
                          />
                          <p className={`text-[10px] font-medium ${belowCost ? "text-destructive" : "text-primary"}`}>
                            {belowCost ? "Below cost!" : `+${margin.toFixed(0)}%`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1.5 px-1">
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQty(item.id, -1)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-card border border-border hover:bg-secondary transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-mono tabular-nums font-medium">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-card border border-border hover:bg-secondary transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-semibold tabular-nums">${(item.price * item.qty).toFixed(2)}</span>
                          <button onClick={() => removeItem(item.id)} className="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                {mode === "sell" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Margin</span>
                    <span className="font-mono font-medium text-primary tabular-nums">+${totalMargin.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-mono font-bold tabular-nums">${total.toFixed(2)}</span>
                </div>

                {mode === "sell" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPaymentType("cash")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium border transition-colors ${
                        paymentType === "cash" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <Banknote className="h-4 w-4" /> Cash
                    </button>
                    <button
                      onClick={() => setPaymentType("customer")}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium border transition-colors ${
                        paymentType === "customer" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <User className="h-4 w-4" /> Customer
                    </button>
                  </div>
                )}

                <Button className="w-full" size="lg" onClick={mode === "sell" ? confirmSale : confirmSupplierPurchase}>
                  {mode === "sell" ? (
                    <><FileText className="mr-2 h-4 w-4" /> Confirm Sale · ${total.toFixed(2)}</>
                  ) : (
                    <><Truck className="mr-2 h-4 w-4" /> Record Purchase · ${total.toFixed(2)}</>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ShoppingCartEmpty() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
