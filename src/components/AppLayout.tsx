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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/app", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/app/pos", icon: ShoppingCart, label: "Point of Sale" },
  { to: "/app/inventory", icon: Package, label: "Inventory" },
  { to: "/app/shortages", icon: AlertTriangle, label: "Shortages" },
  { to: "/app/returns", icon: RotateCcw, label: "Returns" },
  { to: "/app/suppliers", icon: Truck, label: "Suppliers" },
  { to: "/app/customers", icon: Users, label: "Customers" },
  { to: "/app/reports", icon: BarChart3, label: "Reports" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [online] = useState(true); // Mock offline indicator

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <Pill className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold tracking-tight">PharmOps</span>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 p-2 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3 space-y-1">
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
          <button
            onClick={toggleDark}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            {!online && (
              <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-sm flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Offline
              </span>
            )}
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-sm">
              Trial: 5 days left
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
