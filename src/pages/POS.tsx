import { useState, useRef } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  { id: 1, name: "Amoxicillin 500mg", batchNo: "B882", expiry: "12/2025", wholesaleCost: 8.0, price: 12.5, stock: 45 },
  { id: 2, name: "Paracetamol 500mg", batchNo: "B441", expiry: "03/2026", wholesaleCost: 3.0, price: 8.0, stock: 120 },
  { id: 3, name: "Omeprazole 20mg", batchNo: "B223", expiry: "08/2025", wholesaleCost: 6.5, price: 12.0, stock: 32 },
  { id: 4, name: "Metformin 850mg", batchNo: "B119", expiry: "01/2026", wholesaleCost: 5.0, price: 12.5, stock: 60 },
  { id: 5, name: "Ibuprofen 400mg", batchNo: "B554", expiry: "06/2025", wholesaleCost: 4.0, price: 8.0, stock: 85 },
  { id: 6, name: "Ciprofloxacin 500mg", batchNo: "B667", expiry: "09/2025", wholesaleCost: 7.5, price: 15.0, stock: 28 },
];

export default function POS() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentType, setPaymentType] = useState<"cash" | "customer">("cash");
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: typeof mockProducts[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        if (existing.qty >= existing.maxQty) return prev;
        return prev.map((c) =>
          c.id === product.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          batchNo: product.batchNo,
          expiry: product.expiry,
          wholesaleCost: product.wholesaleCost,
          price: product.price,
          qty: 1,
          maxQty: product.stock,
        },
      ];
    });
    setSearch("");
    searchRef.current?.focus();
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id !== id) return c;
          const newQty = c.qty + delta;
          if (newQty <= 0) return null as any;
          if (newQty > c.maxQty) return c;
          return { ...c, qty: newQty };
        })
        .filter(Boolean)
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

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const totalMargin = cart.reduce(
    (sum, c) => sum + (c.price - c.wholesaleCost) * c.qty,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Product Search Panel */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Point of Sale</h1>
          <kbd className="hidden lg:inline-flex items-center rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            N
          </kbd>
        </div>

        {/* Search */}
        <div className="relative">
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

        {/* Product List */}
        <div className="space-y-1 max-h-[calc(100vh-240px)] overflow-y-auto">
          {(search ? filtered : mockProducts).map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2.5 text-left hover:bg-secondary transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  Exp: {product.expiry} · Batch #{product.batchNo} · Stock: {product.stock}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-medium tabular-nums">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-[10px] text-primary font-medium">
                  Margin: +{(((product.price - product.wholesaleCost) / product.wholesaleCost) * 100).toFixed(0)}%
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Panel */}
      <div className="w-full lg:w-96 flex flex-col rounded-lg border border-border bg-card elevation-1">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold">
            Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
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
                <div
                  key={item.id}
                  className="rounded-[12px] bg-secondary/50 p-2"
                >
                  <div className="flex justify-between items-center p-2 bg-card rounded-[4px]">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        Exp: {item.expiry} · Batch #{item.batchNo}
                      </p>
                    </div>
                    <div className="text-right ml-3">
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updatePrice(item.id, parseFloat(e.target.value) || 0)}
                        className={`w-20 text-right font-mono text-sm bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-ring rounded px-1 ${
                          belowCost ? "text-destructive" : ""
                        }`}
                      />
                      <p className={`text-[10px] font-medium ${belowCost ? "text-destructive" : "text-primary"}`}>
                        {belowCost ? "Below cost!" : `Margin: +${margin.toFixed(0)}%`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 px-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="h-7 w-7 flex items-center justify-center rounded bg-card border border-border hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-mono tabular-nums font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="h-7 w-7 flex items-center justify-center rounded bg-card border border-border hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold tabular-nums">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
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
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Margin</span>
              <span className="font-mono font-medium text-primary tabular-nums">
                +${totalMargin.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-mono font-bold tabular-nums">${total.toFixed(2)}</span>
            </div>

            {/* Payment Type */}
            <div className="flex gap-2">
              <button
                onClick={() => setPaymentType("cash")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium border transition-colors ${
                  paymentType === "cash"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Banknote className="h-4 w-4" />
                Cash
              </button>
              <button
                onClick={() => setPaymentType("customer")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium border transition-colors ${
                  paymentType === "customer"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                <User className="h-4 w-4" />
                Customer
              </button>
            </div>

            <Button className="w-full" size="lg">
              <CreditCard className="mr-2 h-4 w-4" />
              Complete Sale · ${total.toFixed(2)}
            </Button>
          </div>
        )}
      </div>
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
