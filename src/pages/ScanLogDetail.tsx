import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { HashDisplay } from "@/components/HashDisplay";
import { Search, Download, FileText, ExternalLink } from "lucide-react";

export const ScanLogDetail = () => {
  const [selectedScan, setSelectedScan] = useState<string | null>("A12-09");
  
  const scans = [
    { uid: "A12-09", time: "10-07 14:42", gps: "-1.319, 36.926", hash: "0xA7B3C89D42E1F5A8", status: "verified" as const, device: "Walking Billboard", sponsor: "Omega Cola" },
    { uid: "B7-33", time: "10-07 14:38", gps: "-1.321, 36.930", hash: "0xB2F4D67C91A3E8B5", status: "verified" as const, device: "Bus Display", sponsor: "Tech Corp" },
    { uid: "C4-88", time: "10-07 14:30", gps: "0xA7CF...8C22", hash: "0xC5E8A92B76D4F1C3", status: "pending" as const, device: "Mall Kiosk", sponsor: "Fashion Brand" },
    { uid: "Z9-01", time: "10-07 14:25", gps: "0xF9C4B..F34D", hash: "0xF9C4B23A85D7E34D", status: "rejected" as const, device: "Street Poster", sponsor: "Food Chain" }
  ];

  const currentScan = scans.find(s => s.uid === selectedScan) || scans[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Audit Dashboard — Tab 2</h1>
          <p className="text-muted-foreground">Scan Log Detail</p>
        </div>
        <Button variant="default" className="glow-sm">Sync with Blockchain</Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search UID / Sponsor / Campaign"
            className="pl-10 bg-input border-primary/30"
          />
        </div>
        <Button variant="outline">Filter: Airport</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-primary/30 bg-card/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">UID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Time (UTC)</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GPS Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Block Hash</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, i) => (
                  <tr 
                    key={i} 
                    onClick={() => setSelectedScan(scan.uid)}
                    className={`border-b border-primary/20 hover:bg-primary/10 transition-all cursor-pointer ${
                      selectedScan === scan.uid ? 'bg-primary/10 border-primary/50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-primary font-mono font-semibold">{scan.uid}</td>
                    <td className="py-3 px-4 text-foreground">{scan.time}</td>
                    <td className="py-3 px-4 text-foreground font-mono text-sm">{scan.gps}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={scan.status} />
                        {scan.status === 'verified' && (
                          <HashDisplay hash={scan.hash} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Card className="p-4 border-success/50 bg-success/10">
              <div className="flex items-center gap-2 text-success">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-semibold">Blockchain Sync Status</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last verified block #23678</p>
              <p className="text-xs text-muted-foreground">All nodes synced.</p>
              <p className="text-sm font-semibold text-primary mt-2">Next verified block #23879</p>
            </Card>

            <Card className="p-4 border-primary/50 bg-primary/10">
              <h3 className="font-semibold mb-2">Export Tools</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Logs (CSV, JSON)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Proof Digest
                </Button>
              </div>
            </Card>
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Scan Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">UID:</span>
              <span className="text-primary font-mono font-bold">{currentScan.uid}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Device:</span>
              <span className="text-foreground">{currentScan.device}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Layer:</span>
              <span className="text-foreground">5D Display [L4]</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Sponsor:</span>
              <span className="text-foreground font-semibold">{currentScan.sponsor}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Campaign:</span>
              <span className="text-foreground">Airport Parade</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Payout Link:</span>
              <span className="text-success font-semibold">€100 M-Pesa</span>
            </div>
            {currentScan.status === 'verified' && (
              <div className="flex justify-between py-2 border-b border-primary/20">
                <span className="text-muted-foreground">Block Hash:</span>
                <HashDisplay hash={currentScan.hash} short={false} />
              </div>
            )}
          </div>

          <Button className="w-full mt-6 group" variant="default">
            <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
            View Proof on Blockchain
          </Button>

          <Card className="mt-4 p-4 border-primary/50 bg-primary/10">
            <h3 className="font-semibold text-sm mb-2">Hash Integrity Meter</h3>
            <div className="text-2xl font-bold text-success mb-2">99.8%</div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success w-[99.8%] glow-sm" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">verified integrity</p>
          </Card>
        </Card>
      </div>
    </div>
  );
};
