import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Trophy, Target, Award } from "lucide-react";

export const CampaignControl = () => {
  const winners = [
    { id: "#2438", uid: "A12-09", prize: "M-Pesa €100", status: "claimed" as const },
    { id: "#2376", uid: "B7-33", prize: "Pizza Voucher", status: "claimed" as const },
    { id: "#2299", uid: "C4-88", prize: "iPhone 15 Pro", status: "pending" as const },
    { id: "#2267", uid: "Z9-01", prize: "NeoCard NFT", status: "rejected" as const }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">AUDIT DASHBOARD</h1>
          <p className="text-xl font-semibold text-foreground">Winners & Prizes</p>
        </div>
        <Button variant="default" className="glow-sm">View Media Proof Gallery</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 flex items-center gap-4">
          <StatusBadge status="verified" label="Verified 85%" />
          <StatusBadge status="pending" label="Pending 10%" />
          <StatusBadge status="rejected" label="Rejected 5%" />
        </div>
        <div className="text-2xl font-bold text-primary">Total Winners = 8,142</div>
      </div>

      <Card className="p-6 border-primary/30 bg-card/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Winner ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">UID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Prize</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Proof</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Payout</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, i) => (
                <tr key={i} className="border-b border-primary/20 hover:bg-primary/5 transition-colors">
                  <td className="py-4 px-4 text-primary font-bold text-lg">{winner.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                        <span className="text-xs text-primary font-mono">{winner.uid.slice(0, 1)}</span>
                      </div>
                      <span className="text-primary font-mono">{winner.uid}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {winner.prize.includes('€') && <span className="text-success">💵</span>}
                      {winner.prize.includes('Pizza') && <span>🍕</span>}
                      {winner.prize.includes('iPhone') && <span>📱</span>}
                      {winner.prize.includes('NFT') && <span>🖼️</span>}
                      <span className={winner.status === 'claimed' ? 'text-success' : winner.status === 'pending' ? 'text-warning' : 'text-muted-foreground'}>
                        {winner.prize}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={winner.status} />
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <span className={winner.status === 'claimed' ? 'text-primary' : 'text-muted-foreground'}>▶</span>
                      Media
                    </Button>
                  </td>
                  <td className="py-4 px-4">
                    <span className={winner.status === 'claimed' ? 'text-success' : 'text-muted-foreground'}>
                      {winner.status === 'claimed' ? 'Media' : winner.status === 'pending' ? 'Media' : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card className="mt-6 p-4 border-success/50 bg-success/10 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <Trophy className="w-6 h-6 text-success" />
          </div>
          <p className="text-success font-semibold">No duplicate payouts detected — Integrity Score 99,8%</p>
        </Card>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Campaign Scans"
          value="4,981,224"
          icon={Target}
          trend="↑ 12% last 24h"
        />
        <StatCard
          title="Verified Winners"
          value="6,920"
          subtitle="85% verified"
          icon={Trophy}
        />
        <StatCard
          title="Total Prizes Awarded"
          value="€1.2M"
          icon={Award}
        />
      </div>
    </div>
  );
};
