import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Euro, TrendingUp, DollarSign, CheckCircle2 } from "lucide-react";

export const FinancialOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">AUDIT DASHBOARD — TAB 6</h1>
          <p className="text-xl font-semibold text-foreground">Financial Overview</p>
          <p className="text-sm text-muted-foreground">Accounting Summary · Income, Costs · ROI · Ledger Exports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Sync with Escrow & Notary</Button>
          <Button variant="default" className="glow-sm">Export Ledger CSV</Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Date</Button>
        <Button variant="outline">Campaign</Button>
        <Button variant="outline">Sponsor</Button>
        <div className="flex-1" />
        <Button variant="outline">Shnc with Escrow & Notary</Button>
        <Button variant="default">Generate Financial Report (POF)</Button>
      </div>

      <Card className="p-6 border-primary/30 bg-card/50">
        <h2 className="text-xl font-semibold mb-6">FINANCIAL SUMMARY</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-primary/50 bg-primary/10">
            <p className="text-sm text-muted-foreground mb-2">Total Sponsor Income</p>
            <p className="text-4xl font-bold text-primary">€98.4M</p>
            <p className="text-xs text-muted-foreground mt-2">All amounts verified</p>
          </Card>
          
          <Card className="p-6 border-success/50 bg-success/10">
            <p className="text-sm text-muted-foreground mb-2">Verified Payouts</p>
            <p className="text-4xl font-bold text-success">€42.1M</p>
            <p className="text-xs text-success mt-2">+183%</p>
            <p className="text-xs text-muted-foreground">All amounts verified</p>
          </Card>
          
          <Card className="p-6 border-primary/50 bg-primary/10">
            <p className="text-sm text-muted-foreground mb-2">Escrow Balance</p>
            <p className="text-4xl font-bold text-primary">€9.7M</p>
            <p className="text-xs text-muted-foreground mt-2">Change #53...lk:gn.</p>
          </Card>
          
          <Card className="p-6 border-success/50 bg-success/10">
            <p className="text-sm text-muted-foreground mb-2">ROI</p>
            <p className="text-4xl font-bold text-success">+178%</p>
            <p className="text-sm text-success mt-2">Excellent</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Excellent</span>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
          </Card>
        </div>

        <h3 className="text-lg font-semibold mb-4">FINANCIAL FLOW GRAPH</h3>
        
        <div className="relative h-64 mb-4">
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const heights = [45, 50, 55, 58, 62, 68, 72, 75, 78, 82, 85, 90];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/40 rounded-t"
                    style={{ height: `${heights[i]}%` }}
                  />
                  <div
                    className="w-full bg-gradient-to-t from-success to-success/40 rounded-t"
                    style={{ height: `${heights[i] * 0.7}%` }}
                  />
                </div>
              );
            })}
          </div>
          
          <div className="absolute left-0 top-2 text-xs text-muted-foreground">Income</div>
          <div className="absolute left-0 top-8 text-xs text-muted-foreground">Verified</div>
          <div className="absolute left-0 top-14 text-xs text-muted-foreground">Expoliv</div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mb-8">
          {['OCT', 'FEB', 'MAR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEG', 'JAN', 'FER', 'SEP'].slice(0, 12).map((month, i) => (
            <span key={i}>{month}</span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="56" className="stroke-muted fill-none" strokeWidth="16" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-success fill-none"
                  strokeWidth="16"
                  strokeDasharray={`${2 * Math.PI * 56 * 0.23} ${2 * Math.PI * 56}`}
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-primary fill-none"
                  strokeWidth="16"
                  strokeDasharray={`${2 * Math.PI * 56 * 0.52} ${2 * Math.PI * 56}`}
                  strokeDashoffset={-2 * Math.PI * 56 * 0.23}
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Staff & Crew 23%</p>
              <p className="text-sm font-semibold mb-2">Operations / Fieel 25%</p>
            </div>
          </div>

          <Card className="p-4 border-primary/50 bg-primary/10">
            <h3 className="font-semibold mb-3">Es/penses by Type</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/50 rounded" />
                <span className="text-muted-foreground">Media / Ads</span>
                <span className="ml-auto text-foreground">19%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded" />
                <span className="text-muted-foreground">Tech & Maintenance</span>
                <span className="ml-auto text-foreground">25%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-success/50 bg-success/10">
            <h3 className="font-semibold mb-2">AI Accounting Valicator</h3>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-xs">All matches declared rep sponsor reports.</span>
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Ledger Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Total Transactions:</span>
              <span className="text-primary font-bold">1,243</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Verified on Blockchain:</span>
              <span className="text-success">1,241 (99.8%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Pending Audit</span>
              <span className="text-warning">2</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Hash Anchor:</span>
              <span className="text-primary font-mono text-xs">Block # 25379</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Integrity:</span>
              <span className="text-success font-bold flex items-center gap-1">
                100% <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Button variant="default" className="w-full">View Ledger on Chain</Button>
            <Button variant="outline" className="w-full">Download Audit Ledger POF</Button>
            <Button variant="outline" className="w-full">Export for Tax Authority</Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">AI Accounting Validator</h2>
          
          <div className="space-y-3">
            <Card className="p-4 border-success/50 bg-success/10 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success">No financial inconsistencies delectec.</p>
              </div>
            </Card>

            <Card className="p-4 border-success/50 bg-success/10 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success">ROI matches declared sponsor reports.</p>
              </div>
            </Card>

            <Card className="p-4 border-success/50 bg-success/10 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success">All Income streams notarized under Kardiverse Patent #15</p>
              </div>
            </Card>
          </div>

          <div className="mt-6 flex items-center justify-between p-4 border border-primary/50 rounded bg-primary/10">
            <span className="text-sm text-muted-foreground">Total Ledger Synced</span>
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono">Block #22879</span>
              <span className="text-muted-foreground">PS 9% linagnty</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
