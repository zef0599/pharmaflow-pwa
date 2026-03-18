import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  AlertTriangle,
  DollarSign,
  Pill,
} from "lucide-react";

const salesData = [
  { day: "Mon", revenue: 1240, profit: 320 },
  { day: "Tue", revenue: 1890, profit: 480 },
  { day: "Wed", revenue: 2100, profit: 520 },
  { day: "Thu", revenue: 1760, profit: 410 },
  { day: "Fri", revenue: 2340, profit: 620 },
  { day: "Sat", revenue: 2780, profit: 710 },
  { day: "Sun", revenue: 1450, profit: 340 },
];

const topSelling = [
  { name: "Paracetamol", units: 245 },
  { name: "Amoxicillin", units: 189 },
  { name: "Omeprazole", units: 156 },
  { name: "Metformin", units: 134 },
  { name: "Ibuprofen", units: 121 },
];

const stats = [
  { label: "Today's Revenue", value: "$2,780", sub: "Actual sale total", change: "+12%", up: true, icon: DollarSign },
  { label: "Today's Profit", value: "$710", sub: "Sale − Wholesale", change: "+15%", up: true, icon: TrendingUp },
  { label: "Today's Sales", value: "47", sub: "Transactions", change: "+8%", up: true, icon: ShoppingCart },
  { label: "Low Stock Items", value: "12", sub: "Below reorder level", change: "+3", up: false, icon: AlertTriangle },
];

const recentSales = [
  { id: 1, product: "Amoxicillin 500mg", qty: 2, total: 24.50, margin: 9.0, time: "2 min ago" },
  { id: 2, product: "Paracetamol 500mg", qty: 1, total: 8.0, margin: 5.0, time: "15 min ago" },
  { id: 3, product: "Omeprazole 20mg", qty: 3, total: 36.0, margin: 16.5, time: "22 min ago" },
  { id: 4, product: "Metformin 850mg", qty: 1, total: 12.5, margin: 7.5, time: "35 min ago" },
  { id: 5, product: "Ibuprofen 400mg", qty: 2, total: 16.0, margin: 8.0, time: "1 hr ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Pharmacy Operations Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-4 elevation-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-semibold font-mono tabular-nums">{stat.value}</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</p>
            </div>
            <span
              className={`flex items-center text-xs font-medium mt-1 ${
                stat.up ? "text-primary" : "text-destructive"
              }`}
            >
              {stat.up ? <TrendingUp className="mr-0.5 h-3 w-3" /> : <TrendingDown className="mr-0.5 h-3 w-3" />}
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Chart + Recent Sales + Top Selling */}
      <div className="grid gap-4 lg:grid-cols-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card p-4 elevation-1">
          <h2 className="text-sm font-medium mb-4">Weekly Revenue & Profit</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(160, 84%, 39%)" fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="profit" stroke="hsl(160, 60%, 50%)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Sales */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-4 elevation-1">
          <h2 className="text-sm font-medium mb-3">Recent Sales</h2>
          <div className="space-y-1">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{sale.product}</p>
                  <p className="text-xs text-muted-foreground">
                    x{sale.qty} · {sale.time}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-medium tabular-nums">
                    ${sale.total.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-primary font-medium">+${sale.margin.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling */}
        <div className="lg:col-span-1 rounded-lg border border-border bg-card p-4 elevation-1">
          <h2 className="text-sm font-medium mb-3">Top Products</h2>
          <div className="space-y-2">
            {topSelling.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground w-4">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{p.name}</p>
                  <div className="mt-0.5 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(p.units / topSelling[0].units) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono tabular-nums text-muted-foreground">{p.units}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
