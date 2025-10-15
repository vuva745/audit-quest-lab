import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, Upload, CheckCircle2, Shield } from "lucide-react";

export const NotaryVerification = () => {
  const documents = [
    { id: "Declaration-AX4.pdf", notarized: "12:30204 16 22", icon: "📝" },
    { id: "IOU-Wilson.pdf", notarized: "12:30204 16 22", icon: "⚖️" },
    { id: "Proof-OR-182.png", notarized: "12:30204 16 22", icon: "🖼️" },
    { id: "Escrow-Batch&.pdf", notarized: "12:30204 16 23", icon: "📄" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Notary Verification</h1>
          <p className="text-muted-foreground">Certified Legal Proof Layer</p>
        </div>
        <Card className="px-4 py-2 border-warning/50 bg-warning/10">
          <p className="text-sm font-semibold text-foreground">Certified by</p>
          <p className="text-sm text-warning">Kardiverse Ledger Authority – Patent #15</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Weekly Notary Declaration</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Status</p>
              <StatusBadge status="verified" />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Uploaded On</p>
              <p className="text-foreground font-mono">2024-10-14 16:20</p>
            </div>

            <Button variant="default" className="w-full mt-6">
              <Upload className="w-4 h-4 mr-2" />
              Upload New
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Notarized Documents</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Document</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Notarized On</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Audit Package</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr key={i} className="border-b border-primary/20 hover:bg-primary/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-2xl">{doc.icon}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-foreground font-mono text-sm">{doc.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-muted-foreground font-mono text-sm">{doc.notarized}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="w-3 h-3" />
                        View History
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Blockchain Validation</h2>
          </div>
          
          <div className="space-y-3">
            <Card className="p-3 border-success/50 bg-success/10">
              <p className="text-xs text-muted-foreground mb-1">Verification Status</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold text-success">All Verified</span>
              </div>
            </Card>

            <Card className="p-3 border-primary/50 bg-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Hash Anchor</p>
              <p className="text-sm font-mono text-primary">Block #25379</p>
            </Card>

            <Card className="p-3 border-primary/50 bg-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Integrity Score</p>
              <p className="text-2xl font-bold text-success">100%</p>
            </Card>
          </div>

          <Button variant="default" className="w-full mt-4">
            View Chain Certificate
          </Button>
        </Card>
      </div>

      <Card className="p-6 border-primary/30 bg-card/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-success/20 border border-success/50">
            <Shield className="w-8 h-8 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI Legal Validator</h2>
            <p className="text-sm text-muted-foreground">Automated integrity verification</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-success/50 bg-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success">0 hash mismatches detected</p>
                <p className="text-xs text-muted-foreground mt-1">across 40 notarized files.</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-success/50 bg-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success">Next declaration due</p>
                <p className="text-xs text-muted-foreground mt-1">2025-10-14</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-success/50 bg-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success">Certified Ledger Authority</p>
                <p className="text-xs text-muted-foreground mt-1">badge confirmed.</p>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};
