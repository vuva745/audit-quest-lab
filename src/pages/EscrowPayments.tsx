import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { DollarSign, TrendingUp, Clock } from "lucide-react";

export const EscrowPayments = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Escrow & Payments Dashboard</h1>
          <p className="text-muted-foreground">Overview of sponsor transactions, escrow batch releases, and financial data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="default" className="glow-sm">Release Escrow Batch</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Escrow Balance"
          value="€9.7M"
          icon={DollarSign}
          subtitle="Across all campaigns"
        />
        <StatCard
          title="Released This Month"
          value="€2.3M"
          icon={TrendingUp}
          trend="↑ 18% vs last month"
        />
        <StatCard
          title="Pending Releases"
          value="12"
          icon={Clock}
          subtitle="Awaiting verification"
        />
      </div>

      <Card className="p-6 border-primary/30 bg-card/50">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Sponsor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Campaign</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "2025-10-15", sponsor: "Omega Cola", campaign: "Airport Prime", amount: "€46,000", status: "Released" },
                { date: "2025-10-14", sponsor: "Tech Corp", campaign: "City Center", amount: "€32,000", status: "Released" },
                { date: "2025-10-14", sponsor: "Fashion Brand", campaign: "Mall Display", amount: "€28,500", status: "Pending" },
                { date: "2025-10-13", sponsor: "Food Chain", campaign: "Bus Routes", amount: "€21,000", status: "Released" }
              ].map((tx, i) => (
                <tr key={i} className="border-b border-primary/20 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{tx.date}</td>
                  <td className="py-3 px-4 text-foreground">{tx.sponsor}</td>
                  <td className="py-3 px-4 text-foreground">{tx.campaign}</td>
                  <td className="py-3 px-4 text-primary font-semibold">{tx.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      tx.status === 'Released' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Batch Release Schedule</h2>
          <div className="space-y-3">
            {[
              { batch: "Batch #124", amount: "€46,000", date: "Oct 15, 2025", verified: true },
              { batch: "Batch #125", amount: "€52,000", date: "Oct 18, 2025", verified: false },
              { batch: "Batch #126", amount: "€38,000", date: "Oct 20, 2025", verified: false }
            ].map((batch, i) => (
              <div key={i} className={`p-4 border rounded ${
                batch.verified ? 'border-success/50 bg-success/10' : 'border-primary/30 bg-primary/5'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{batch.batch}</p>
                    <p className="text-sm text-muted-foreground">{batch.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{batch.amount}</p>
                    <p className={`text-xs ${batch.verified ? 'text-success' : 'text-warning'}`}>
                      {batch.verified ? 'Verified' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Payment Distribution</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 80, 55, 70, 60, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary/40 rounded-t hover:from-primary hover:to-primary/60 transition-all"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
