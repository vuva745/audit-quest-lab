import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Upload, Download, Search, Image, QrCode, CheckCircle2 } from "lucide-react";

export const MediaGallery = () => {
  const mediaItems = [
    { id: "A12-09", type: "video", verified: true },
    { id: "Omoge Cola", type: "qr", verified: true },
    { id: "#22-09", type: "image", verified: true },
    { id: "0xA23C...91D", type: "qr", verified: true },
    { id: "User Photo", type: "image", verified: true },
    { id: "Scene", type: "image", verified: true },
    { id: "Portrait", type: "image", verified: true },
    { id: "Event", type: "image", verified: true },
    { id: "Campaign", type: "image", verified: false }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Media & Proof Gallery</h1>
          <p className="text-muted-foreground">Verified sponsor media, QR snapshots & blockchain-proofstrain proofs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Media
          </Button>
          <Button variant="outline">Filter & Sort</Button>
          <Button variant="default" className="glow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Proof Set (ZIP)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Campaign Filters</h2>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Campaign</label>
              <Button variant="outline" className="w-full justify-between">
                All Campaigns
                <span>▼</span>
              </Button>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Media Type</label>
              <Button variant="outline" className="w-full justify-between">
                All Media Types
                <span>▼</span>
              </Button>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Status</label>
              <Button variant="outline" className="w-full justify-between">
                All Statuses
                <span>▼</span>
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by Proof ID" className="pl-10 bg-input border-primary/30" />
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Files</span>
              <span className="text-primary font-semibold">4,327</span>
            </div>
            <div className="flex justify-between">
              <span className="text-success">Verified</span>
              <span className="text-success font-semibold">3,890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warning">Pending</span>
              <span className="text-warning font-semibold">437</span>
            </div>
          </div>

          <Card className="mt-6 p-4 border-primary/50 bg-primary/10">
            <h3 className="font-semibold text-sm mb-2">Quick Stats</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Files</span>
                <span className="text-primary">4,327</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verified</span>
                <span className="text-success">3,890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending</span>
                <span className="text-warning">437</span>
              </div>
            </div>
          </Card>
        </Card>

        <Card className="lg:col-span-2 p-6 border-primary/30 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Proof Preview Gallery</h2>
            <Button variant="outline" size="sm">Export</Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {mediaItems.map((item, i) => (
              <div key={i} className="relative group">
                <div className="aspect-square rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden hover:border-primary transition-all cursor-pointer">
                  {item.type === 'qr' ? (
                    <QrCode className="w-12 h-12 text-primary" />
                  ) : item.type === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-primary/10">
                      <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-l-primary border-y-6 border-y-transparent ml-1" />
                      </div>
                    </div>
                  ) : (
                    <Image className="w-12 h-12 text-primary" />
                  )}
                  {item.verified && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-1 text-muted-foreground truncate">{item.id}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border border-primary/30 rounded bg-primary/5 text-center">
            <p className="text-sm text-muted-foreground font-mono">
              Google Cloud Sync 14:42 • 0xFA33C.91D Lock #23579 # 4,327 VFieriee ● Ver
            </p>
            <p className="text-xs text-success mt-1 font-mono">
              6.x43c.A12.79 l b:e:4:Z5e3 93 31809 QR Rejchat 854 64 943 700 1C4.49ID
            </p>
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Proof Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">UID</span>
              <span className="text-primary font-mono">#22-09</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Timestamp</span>
              <span className="text-foreground">2025-10-07 14.42 UTC</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Sponsor</span>
              <span className="text-primary">Omega Cola</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Campaign</span>
              <span className="text-foreground">Airport Prime Parede</span>
            </div>
            <div className="flex justify-between py-2 border-b border-primary/20">
              <span className="text-muted-foreground">Hash</span>
              <span className="text-primary font-mono text-xs">0xFA3C...91D</span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Button variant="default" className="w-full">
              View on Blockchain
            </Button>
            <Button variant="outline" className="w-full">
              Download Certificate
            </Button>
          </div>

          <Card className="mt-6 p-4 border-success/50 bg-success/10">
            <h3 className="font-semibold text-sm mb-2 text-success">AI Proof Validator</h3>
            <p className="text-xs text-muted-foreground">
              All media validated via hash compariso.
            </p>
            <p className="text-xs text-muted-foreground">
              No duplicates detected,
            </p>
            <p className="text-xs text-foreground font-semibold mt-2">
              Integrify score = 100%
            </p>
            <p className="text-xs text-muted-foreground">
              Blockchain Block #23679 confirmeof entries
            </p>
          </Card>
        </Card>
      </div>
    </div>
  );
};
