import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Trophy, Euro, FileCheck, TrendingUp } from "lucide-react";

export const MainOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Audit Dashboard</h1>
          <p className="text-muted-foreground">Main Overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">This Week</Button>
          <Button variant="outline">Export</Button>
          <Button variant="default" className="glow-sm">Sync</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Scans"
          value="4,981,224"
          icon={Activity}
        />
        <StatCard
          title="Unique Winners Validated"
          value="8,142"
          icon={Trophy}
        />
        <StatCard
          title="Released Via Escrow & M-Pesa"
          value="€1,284,000"
          icon={Euro}
        />
        <StatCard
          title="Documents Signed & Verified"
          value="27"
          icon={FileCheck}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-primary/30 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Proof Activity
            </h2>
            <div className="text-sm text-success">
              Last 24h ↑ 12% in verified proofs
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2">
            {[15, 25, 22, 30, 35, 42, 38, 50, 55, 60, 58, 70].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-primary/80 to-primary/40 rounded-t transition-all hover:from-primary hover:to-primary/60"
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

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Live Audit Feed</h2>
          <div className="space-y-3">
            {[
              { time: "14:02", text: "Block #4553 verified – 312 UID matches found" },
              { time: "13:56", text: "Escrow release #124 approved = €46000" },
              { time: "13:48", text: "New notary file uploaded signature validated" },
              { time: "13:22", text: "System check passed hash integrity OK" }
            ].map((item, i) => (
              <div key={i} className="text-sm border-l-2 border-primary/50 pl-3 py-1">
                <span className="text-primary font-mono">[{item.time}]</span>
                <span className="text-muted-foreground ml-2">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Geo Heatmap</h2>
          <div className="space-y-4">
            {[
              { city: "Amsterdam", activity: 85 },
              { city: "Dubai", activity: 60 },
              { city: "Nairobi", activity: 45 }
            ].map((loc, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{loc.city}</span>
                  <span className="text-primary">{loc.activity}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary glow-sm"
                    style={{ width: `${loc.activity}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Live Audit Feed</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-success/50 bg-success/10">
              <div className="text-xs text-muted-foreground mb-1">Escrow Verified</div>
              <div className="text-2xl font-bold text-success">€5,000</div>
            </Card>
            <Card className="p-4 border-primary/50 bg-primary/10">
              <div className="text-xs text-muted-foreground mb-1">Notary Certificates</div>
              <Button variant="outline" size="sm" className="mt-2 w-full">Generate</Button>
            </Card>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center p-2 border border-primary/30 rounded bg-primary/5">
              <span className="text-sm">Escrow Status</span>
              <div className="h-2 w-24 bg-primary/50 rounded" />
            </div>
            <div className="flex justify-between items-center p-2 border border-primary/30 rounded bg-primary/5">
              <span className="text-sm">Notary Certificates</span>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
