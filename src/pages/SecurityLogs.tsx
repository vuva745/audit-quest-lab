import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Shield, AlertTriangle, Download } from "lucide-react";

export const SecurityLogs = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Audit Dashboard</h1>
          <p className="text-muted-foreground">Security & System Logs</p>
        </div>
        <Button variant="default" className="glow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Node Health Map</h2>
          <div className="relative h-64 flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Vendor Zone */}
              <circle cx="100" cy="150" r="8" className="fill-success" />
              <text x="100" y="130" className="text-xs fill-foreground text-center" textAnchor="middle">Vendor Zone</text>
              <text x="100" y="180" className="text-xs fill-muted-foreground" textAnchor="middle">latency 92 ms</text>
              
              {/* Airport Node */}
              <circle cx="200" cy="80" r="8" className="fill-primary" />
              <text x="200" y="60" className="text-xs fill-foreground" textAnchor="middle">Airport Node</text>
              <text x="200" y="110" className="text-xs fill-muted-foreground" textAnchor="middle">latency 85 ms</text>
              
              {/* University Node */}
              <circle cx="300" cy="100" r="8" className="fill-warning" />
              <text x="300" y="80" className="text-xs fill-foreground" textAnchor="middle">University Node</text>
              <text x="300" y="130" className="text-xs fill-muted-foreground" textAnchor="middle">delay 210 ms</text>
              
              {/* Bus Prime Node */}
              <circle cx="280" cy="200" r="8" className="fill-primary" />
              <text x="280" y="230" className="text-xs fill-foreground" textAnchor="middle">Bus Prime Node</text>
              <text x="280" y="245" className="text-xs fill-muted-foreground" textAnchor="middle">latency 80 ms</text>
              
              {/* Backup Node */}
              <circle cx="150" cy="220" r="8" className="fill-muted-foreground opacity-50" />
              <text x="150" y="250" className="text-xs fill-muted-foreground" textAnchor="middle">Backup Node - offline 8m ago</text>
              
              {/* Connections */}
              <line x1="100" y1="150" x2="200" y2="80" className="stroke-primary/50" strokeWidth="2" />
              <line x1="200" y1="80" x2="300" y2="100" className="stroke-warning/50" strokeWidth="2" />
              <line x1="200" y1="80" x2="280" y2="200" className="stroke-primary/50" strokeWidth="2" />
              <line x1="100" y1="150" x2="280" y2="200" className="stroke-success/50" strokeWidth="2" />
            </svg>
          </div>
          
          <Card className="mt-4 p-4 border-success/50 bg-success/10">
            <p className="text-sm font-semibold text-success">Vendor 23879 Verified</p>
            <p className="text-xs text-muted-foreground">14:44 UTC • Integrity 99.9%</p>
          </Card>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Login Monitor</h2>
          <div className="space-y-2">
            {[
              { time: "12:28", location: "Amsterdam NL" },
              { time: "09:10", location: "Utrecht NL" },
              { time: "07:42", location: "Den Haag NL" }
            ].map((login, i) => (
              <div key={i} className="p-3 border border-primary/30 rounded bg-primary/5 flex justify-between items-center">
                <span className="text-primary font-mono">{login.time}</span>
                <span className="text-foreground">{login.location}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Blockchain Hash Check</h2>
          <div className="space-y-2">
            {[
              { id: "#23879", status: "verified" as const },
              { id: "#23878", status: "verified" as const },
              { id: "#23877", status: "verified" as const },
              { id: "#23876", status: "alert" as const, label: "Integrity Alert" }
            ].map((item, i) => (
              <div key={i} className="p-3 border border-primary/30 rounded bg-primary/5 flex justify-between items-center">
                <span className="text-primary font-mono">{item.id}</span>
                <StatusBadge status={item.status} label={item.label} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="relative">
              <AlertTriangle className="w-8 h-8 text-warning animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-warning/20 blur-lg" />
            </div>
            AI Threat Monitor
          </h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="40" className="stroke-muted fill-none" strokeWidth="8" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="stroke-warning fill-none"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.75} ${2 * Math.PI * 40}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </div>
            
            <div>
              <p className="text-xl font-bold text-foreground">Monitoring Mode</p>
              <p className="text-sm text-warning">IA detected</p>
            </div>
          </div>

          <Card className="p-3 border-warning/50 bg-warning/10">
            <p className="text-sm text-foreground">[14:46] AI detected latency spike in University Node – Auto-recovered ✓</p>
          </Card>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Security Timeline</h2>
          <div className="space-y-2">
            {[
              { time: "14:46", text: "Integrity Alert detected" },
              { time: "14:28", text: "Daily hash check verified" },
              { time: "13:54", text: "IP 45.17.251.34 logged in" },
              { time: "11:02", text: "Failed login attempt (2)" },
              { time: "10:16", text: "Security rules updated" }
            ].map((event, i) => (
              <div key={i} className="p-3 border border-primary/30 rounded bg-primary/5">
                <span className="text-primary font-mono text-sm">[{event.time}]</span>
                <span className="text-muted-foreground text-sm ml-2">{event.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
