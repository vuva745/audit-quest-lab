import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { LiveFeed } from "@/components/LiveFeed";
import { Activity, Trophy, Euro, FileCheck, TrendingUp, MapPin } from "lucide-react";

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
        <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur hover:border-primary/50 transition-all animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Registered Scans</p>
              <h3 className="text-3xl font-bold text-primary mb-1">
                <AnimatedCounter end={4981224} />
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur hover:border-primary/50 transition-all animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Unique Winners Validated</p>
              <h3 className="text-3xl font-bold text-primary mb-1">
                <AnimatedCounter end={8142} />
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur hover:border-primary/50 transition-all animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Released Via Escrow & M-Pesa</p>
              <h3 className="text-3xl font-bold text-primary mb-1">
                <AnimatedCounter end={1284000} prefix="€" />
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Euro className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur hover:border-primary/50 transition-all animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Documents Signed & Verified</p>
              <h3 className="text-3xl font-bold text-primary mb-1">
                <AnimatedCounter end={27} />
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <FileCheck className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
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
          <LiveFeed />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Geo Heatmap
          </h2>
          <div className="space-y-4">
            {[
              { city: "Amsterdam", activity: 85, color: "bg-primary" },
              { city: "Dubai", activity: 60, color: "bg-warning" },
              { city: "Nairobi", activity: 45, color: "bg-success" }
            ].map((loc, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${loc.color} animate-pulse`} />
                    {loc.city}
                  </span>
                  <span className="text-primary font-semibold">{loc.activity}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${loc.color} glow-sm transition-all duration-1000`}
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
