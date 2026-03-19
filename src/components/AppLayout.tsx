import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  AlertTriangle,
  RotateCcw,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
  Pill,
  Truck,
  Users,
  BarChart3,
  WifiOff,
  Wifi,
  DollarSign,
  UserCheck,
  CreditCard,
  Search,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navSections = [
  {
    title: "Main",
    items: [
      { to: "/app", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/app/pos", icon: ShoppingCart, label: "Point of Sale" },
    ],
  },
  {
    title: "Inventory",
    items: [
      { to: "/app/inventory", icon: Package, label: "Inventory" },
      { to: "/app/shortages", icon: AlertTriangle, label: "Shortages & Expiry" },
    ],
  },
  {
    title: "Transactions",
    items: [
      { to: "/app/returns", icon: RotateCcw, label: "Returns" },
      { to: "/app/debts", icon: CreditCard, label: "Customer Debts" },
    ],
  },
  {
    title: "People",
    items: [
      { to: "/app/customers", icon: Users, label: "Customers" },
      { to: "/app/suppliers", icon: Truck, label: "Suppliers" },
      { to: "/app/employees", icon: UserCheck, label: "Employees" },
    ],
  },
  {
    title: "Finance",
    items: [
      { to: "/app/expenses", icon: DollarSign, label: "Expenses" },
      { to: "/app/reports", icon: BarChart3, label: "Reports" },
    ],
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [online] = useState(true);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Pill className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight">PharmOps</span>
            <p className="text-[10px] text-muted-foreground leading-none">Pharmacy Management</p>
          </div>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-3 space-y-1">
          <Link
            to="/app/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              location.pathname === "/app/settings"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          {/* Offline Sync Indicator */}
          <div className="flex items-center gap-3 px-3 py-2 text-xs">
            {online ? (
              <>
                <Wifi className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Connected</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5 text-warning" />
                <span className="text-warning font-medium">Offline — saving locally</span>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Search Bar */}
          <div className="relative hidden md:block flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products, customers, transactions..."
              className="pl-9 h-9 text-sm bg-secondary/50 border-none"
            />
          </div>
          
          <div className="flex-1 md:flex-none" />
          
          <div className="flex items-center gap-2">
            {!online && (
              <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-md flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Offline
              </span>
            )}
            <button
              onClick={toggleDark}
              className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="relative h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2 ml-1 pl-3 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                AD
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-medium leading-none">Admin</p>
                <p className="text-[10px] text-muted-foreground">Central Pharmacy</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
