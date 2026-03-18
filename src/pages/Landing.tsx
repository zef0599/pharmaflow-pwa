import { Link } from "react-router-dom";
import {
  Pill,
  ShoppingCart,
  BarChart3,
  Package,
  Shield,
  Zap,
  ArrowRight,
  Check,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const features = [
  {
    icon: ShoppingCart,
    title: "Lightning POS",
    desc: "Barcode scanning, auto-cart, FEFO-based batch tracking. Sell fast, sell smart.",
  },
  {
    icon: Package,
    title: "Inventory & Supply Chain",
    desc: "Track batches, expiry dates, supplier debts, and reorder points in one place.",
  },
  {
    icon: BarChart3,
    title: "Profit Analytics",
    desc: "Real-time margins, daily/weekly/monthly profit breakdowns, and top-selling items.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    desc: "Admins see everything. Pharmacists focus on sales. Data stays protected.",
  },
  {
    icon: Zap,
    title: "Offline-Ready",
    desc: "Sell even without internet. Data syncs automatically when you're back online.",
  },
  {
    icon: Pill,
    title: "Multi-Pharmacy",
    desc: "Each pharmacy gets an isolated tenant. Manage one or many from a single account.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free Trial",
    period: "7 days",
    features: ["1 pharmacy", "Unlimited sales", "Basic analytics", "Email support"],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    features: [
      "Up to 3 pharmacies",
      "Advanced analytics",
      "Supplier management",
      "Customer ledger",
      "Priority support",
    ],
    cta: "Start 7-Day Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited pharmacies",
      "API access",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Landing() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold tracking-tight">PharmOps</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/app">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/app">
              <Button size="sm">
                Start Free Trial
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
            <Zap className="h-3 w-3" />
            Built for Modern Pharmacies
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
            Your Pharmacy,
            <br />
            <span className="text-primary">Supercharged.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base lg:text-lg">
            POS, inventory, analytics, and customer management — all in one
            lightning-fast platform built for pharmacies that move fast.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/app">
              <Button size="lg" className="text-sm">
                Start 7-Day Free Trial
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-sm">
              Watch Demo
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            No credit card required · Setup in 2 minutes
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold">Everything You Need to Run a Pharmacy</h2>
          <p className="mt-2 text-muted-foreground text-sm lg:text-base">
            From the counter to the back office, PharmOps covers it all.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">{f.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Start free. Scale when ready.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.highlighted
                    ? "border-primary bg-card shadow-xl shadow-primary/10 ring-1 ring-primary/20 scale-105"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlighted && (
                  <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold font-mono">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/app">
                  <Button
                    className="w-full mt-5"
                    size="sm"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-primary" />
            <span>© 2026 PharmOps. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
