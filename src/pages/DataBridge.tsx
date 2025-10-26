import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Activity, RefreshCw, Key, FileText } from "lucide-react";

export const DataBridge = () => {
  const { toast } = useToast();

  // Button handlers
  const handleSyncDataNow = () => {
    toast({
      title: "Syncing Data",
      description: "Synchronizing data between all systems...",
    });
    
    setTimeout(() => {
      toast({
        title: "Sync Complete",
        description: "All data has been synchronized successfully",
      });
    }, 3000);
  };

  const handleAPIKeys = () => {
    toast({
      title: "API Keys Management",
      description: "Opening API keys configuration panel...",
    });
  };

  const handleViewLogs = () => {
    toast({
      title: "Viewing Logs",
      description: "Opening system logs viewer...",
    });
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Sponsor Data Bridge 2.0 – Tab 9</h1>
          <p className="text-muted-foreground">Live data link between NeCodr™, Blockchain and external CRM systems</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSyncDataNow}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data Now
          </Button>
          <Button variant="outline" onClick={handleAPIKeys}>
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </Button>
          <Button variant="default" className="glow-sm" onClick={handleViewLogs}>
            <FileText className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 border border-success/50 rounded bg-success/10">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-success text-sm font-semibold">All Nodes Synced</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-6">Connection Overview</h2>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
              <span className="text-primary font-semibold">NeoCard™</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
              <span className="text-primary font-semibold">Kardiverse Cloud</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
              <span className="text-primary font-semibold">Blockchain</span>
            </Button>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Total Sponsors/CRM</span>
              <span className="text-primary font-semibold">233,902</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Verified Tokens:</span>
              <span className="text-primary font-semibold">120,334</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Active CRM Links:</span>
              <span className="text-primary font-semibold">14</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-6">API & Blockchain Monitor</h2>
          
          <Card className="p-4 border-primary/50 bg-primary/10 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">API Health:</span>
              <span className="text-success text-sm font-semibold">Latency 87ms | Uptime 99,8x</span>
            </div>
          </Card>

          <Card className="p-4 border-primary/50 bg-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Blockchain Verified:</span>
              <span className="text-primary text-sm font-semibold">Block #2387 Proofs</span>
            </div>
          </Card>

          <div className="mt-6 h-32 relative">
            <svg viewBox="0 0 300 100" className="w-full h-full">
              <path
                d="M 0 80 Q 30 60 60 65 T 120 55 T 180 50 T 240 45 T 300 40"
                className="stroke-primary fill-none"
                strokeWidth="2"
              />
              <text x="150" y="95" className="text-xs fill-muted-foreground" textAnchor="middle">
                Sync Stability (last 4 h)
              </text>
            </svg>
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-6">CRM Integration Panel</h2>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <span className="font-semibold">Salesforce</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <span className="font-semibold">HubSpot</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <span className="font-semibold">Oracle CX</span>
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Custom Sponsor DB</span>
                <Activity className="w-4 h-4 text-primary" />
              </div>
            </Button>
          </div>

          <Button variant="default" className="w-full mt-6">
            Test Connections
          </Button>
        </Card>
      </div>

      <Card className="p-6 border-primary/30 bg-card/50">
        <h2 className="text-xl font-semibold mb-4">Data Flow Console</h2>
        
        <div className="space-y-2 font-mono text-sm">
          <div className="p-3 border border-primary/30 rounded bg-primary/5">
            <span className="text-primary">NeoCard #412</span>
            <span className="text-muted-foreground"> → Block #23879 → CRM ID #47322 → Verified </span>
            <span className="text-success">✓</span>
          </div>
          
          <div className="p-3 border border-primary/30 rounded bg-primary/5">
            <span className="text-primary">Bus Block #79</span>
            <span className="text-muted-foreground"> → Chain Sync Delay 2s → Auto-Recovered </span>
            <span className="text-success">✓</span>
          </div>
          
          <div className="p-3 border border-primary/30 rounded bg-primary/5">
            <span className="text-primary">Vendor Node #2</span>
            <span className="text-muted-foreground"> → Synced → HubSpor DB Entry Created </span>
            <span className="text-success">✓</span>
          </div>
          
          <div className="p-3 border border-primary/30 rounded bg-primary/5">
            <span className="text-primary">Kids Parade Block #5</span>
            <span className="text-muted-foreground"> → Token #7XAF – Linked CRM Oracle CX</span>
          </div>
          
          <div className="p-3 border border-success/30 rounded bg-success/10">
            <span className="text-success">Last chain link verified at 14:42 – All nodes synchronized ✓</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-primary/30 bg-card/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-primary/20 border border-primary/50">
            <Activity className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI Data Sentinel update:</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-primary/50 bg-primary/10">
            <p className="text-sm text-foreground">
              Node 3 (University Zone) experienced a 2s delay — auto-recovered.
            </p>
          </Card>

          <Card className="p-4 border-success/50 bg-success/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Network Health Score</span>
              <span className="text-2xl font-bold text-success">9.9 / 10</span>
            </div>
            <div className="mt-2 h-8">
              <svg viewBox="0 0 200 30" className="w-full h-full">
                <path
                  d="M 0 15 Q 20 10 40 12 T 80 10 T 120 8 T 160 5 T 200 3"
                  className="stroke-success fill-none"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};
