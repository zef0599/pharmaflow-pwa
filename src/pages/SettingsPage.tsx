import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Pharmacy configuration</p>
      </div>

      {/* Pharmacy Info */}
      <div className="rounded-lg border border-border bg-card p-5 elevation-1 space-y-4">
        <h2 className="text-sm font-semibold">Pharmacy Details</h2>
        <div className="grid gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Pharmacy Name</label>
            <Input defaultValue="Central Pharmacy" className="mt-1" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">License Number</label>
            <Input defaultValue="PH-2024-001234" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="rounded-lg border border-border bg-card p-5 elevation-1 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Subscription</h2>
          <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">Trial</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Your 7-day trial ends in <span className="font-medium text-foreground">5 days</span>. Contact support to activate your account.
        </p>
        <Button variant="outline" size="sm">Contact Support</Button>
      </div>

      {/* Roles Info */}
      <div className="rounded-lg border border-border bg-card p-5 elevation-1 space-y-3">
        <h2 className="text-sm font-semibold">User Roles</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 rounded bg-secondary/50">
            <div>
              <p className="font-medium">Admin (Owner)</p>
              <p className="text-xs text-muted-foreground">Full access to profits, supplier debts, settings</p>
            </div>
            <Badge variant="secondary">Current</Badge>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-secondary/50">
            <div>
              <p className="font-medium">Pharmacist (Staff)</p>
              <p className="text-xs text-muted-foreground">Sales only, no access to profits or debts</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs h-7">Invite</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
