import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { HashDisplay } from "@/components/HashDisplay";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Download, 
  FileText, 
  ExternalLink, 
  Camera, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Play, 
  Search as SearchIcon,
  Star,
  Smartphone,
  Apple,
  CreditCard,
  Grid3X3,
  Brain,
  User,
  Eye,
  EyeOff,
  ChevronDown
} from "lucide-react";
import { AIPatternDetector } from "@/components/AIDashboardPanels";

export const ScanLogDetail = () => {
  const { toast } = useToast();
  const [selectedScan, setSelectedScan] = useState<string | null>("2438");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingDigest, setIsGeneratingDigest] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("Airport");
  const [syncStatus, setSyncStatus] = useState("Ready");
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [blockHeight, setBlockHeight] = useState(23678);
  const [nextBlockHeight, setNextBlockHeight] = useState(23879);
  const [isViewingProof, setIsViewingProof] = useState(false);
  const [proofStatus, setProofStatus] = useState("Ready to view");
  
  // Scan log data matching the mockup
  const scanLogs = [
    { 
      id: "2438", 
      uid: "A12-09", 
      gps: "-1.319, 36.926", 
      timestamp: "2024-01-15 14:42:33",
      hash: "0xA7B3C89D42E1F5A8B2C3E4F5678901234567890ABCDEF1234567890ABCDEF12",
      status: "verified" as const, 
      device: "Walking Billboard", 
      sponsor: "Omega Cola",
      prize: "M-Pesa €100",
      proof: "Media",
      payout: "Media"
    },
    { 
      id: "2376", 
      uid: "B7-33", 
      gps: "-1.321, 36.930", 
      timestamp: "2024-01-15 14:38:21",
      hash: "0xB2F4D67C91A3E8B5C6D7E8F9012345678901234567890ABCDEF1234567890ABCD",
      status: "verified" as const, 
      device: "Bus Display", 
      sponsor: "Tech Corp",
      prize: "Pizza Voucher",
      proof: "Media",
      payout: "Media"
    },
    { 
      id: "2299", 
      uid: "C4-88", 
      gps: "-1.315, 36.925", 
      timestamp: "2024-01-15 14:30:15",
      hash: "0xC5E8A92B76D4F1C3D4E5F6789012345678901234567890ABCDEF1234567890AB",
      status: "pending" as const, 
      device: "Mall Kiosk", 
      sponsor: "Fashion Brand",
      prize: "iPhone 15 Pro",
      proof: "Media",
      payout: "Media"
    },
    { 
      id: "2267", 
      uid: "Z9-01", 
      gps: "-1.325, 36.935", 
      timestamp: "2024-01-15 14:25:08",
      hash: "0xF9C4B23A85D7E34D5E6F789012345678901234567890ABCDEF1234567890ABCD",
      status: "rejected" as const, 
      device: "Street Poster", 
      sponsor: "Food Chain",
      prize: "NeoCard NFT",
      proof: "Audit Hasn",
      payout: "-"
    }
  ];

  const currentScan = scanLogs.find(s => s.id === selectedScan) || scanLogs[0];
  
  // Statistics
  const totalScans = scanLogs.length;
  const verifiedCount = scanLogs.filter(s => s.status === 'verified').length;
  const pendingCount = scanLogs.filter(s => s.status === 'pending').length;
  const rejectedCount = scanLogs.filter(s => s.status === 'rejected').length;
  
  const verifiedPercentage = Math.round((verifiedCount / totalScans) * 100);
  const pendingPercentage = Math.round((pendingCount / totalScans) * 100);
  const rejectedPercentage = Math.round((rejectedCount / totalScans) * 100);

  // Button handlers
  const handleSyncWithBlockchain = async () => {
    setIsSyncing(true);
    setSyncStatus("Connecting to blockchain network...");
    
    toast({
      title: "Blockchain Sync Started",
      description: "Connecting to blockchain network...",
    });
    
    // Step 1: Connect to network
    setTimeout(() => {
      setSyncStatus("Connected. Verifying blocks...");
      toast({
        title: "Network Connected",
        description: "Successfully connected to blockchain network",
      });
    }, 1000);
    
    // Step 2: Verify blocks
    setTimeout(() => {
      setSyncStatus("Verifying block integrity...");
      toast({
        title: "Verifying Blocks",
        description: "Checking block integrity and signatures...",
      });
    }, 2000);
    
    // Step 3: Update scan logs
    setTimeout(() => {
      setSyncStatus("Updating scan logs...");
      toast({
        title: "Updating Data",
        description: "Synchronizing scan logs with blockchain data...",
      });
    }, 3000);
    
    // Step 4: Validate hashes
    setTimeout(() => {
      setSyncStatus("Validating cryptographic hashes...");
      toast({
        title: "Validating Hashes",
        description: "Verifying cryptographic integrity of all transactions...",
      });
    }, 4000);
    
    // Step 5: Complete sync
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus("Synchronized");
      setLastSyncTime(new Date());
      setBlockHeight(prev => prev + 1);
      setNextBlockHeight(prev => prev + 1);
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced with blockchain. Block height: ${blockHeight + 1}`,
      });
    }, 5000);
  };

  const handleExportLogs = async (format: string) => {
    setIsExporting(true);
    toast({
      title: "Export Started",
      description: `Exporting scan logs in ${format} format...`,
    });
    
    // Create export data
    const exportData = scanLogs.map(scan => ({
      id: scan.id,
      uid: scan.uid,
      gps: scan.gps,
      timestamp: scan.timestamp,
      hash: scan.hash,
      status: scan.status,
      device: scan.device,
      sponsor: scan.sponsor,
      prize: scan.prize,
      proof: scan.proof,
      payout: scan.payout
    }));

    setTimeout(() => {
      // Create downloadable file
      let content = '';
      let filename = '';
      let mimeType = '';

      if (format === 'CSV') {
        const headers = 'ID,UID,GPS,Timestamp,Hash,Status,Device,Sponsor,Prize,Proof,Payout\n';
        const csvData = exportData.map(scan => 
          `${scan.id},${scan.uid},${scan.gps},${scan.timestamp},${scan.hash},${scan.status},${scan.device},${scan.sponsor},${scan.prize},${scan.proof},${scan.payout}`
        ).join('\n');
        content = headers + csvData;
        filename = `scan-logs-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      } else if (format === 'JSON') {
        content = JSON.stringify(exportData, null, 2);
        filename = `scan-logs-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      }

      // Download file
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      toast({
        title: "Export Complete",
        description: `${filename} downloaded successfully`,
      });
    }, 2000);
  };

  const handleGenerateProofDigest = async () => {
    setIsGeneratingDigest(true);
    toast({
      title: "Generating Proof Digest",
      description: "Creating cryptographic proof digest...",
    });
    
    // Simulate digest generation
    setTimeout(() => {
      setIsGeneratingDigest(false);
      toast({
        title: "Proof Digest Ready",
        description: "Cryptographic proof digest has been generated and is ready for download",
      });
      
      // Create proof digest file
      const digestData = {
        timestamp: new Date().toISOString(),
        totalScans: scanLogs.length,
        verifiedScans: verifiedCount,
        pendingScans: pendingCount,
        rejectedScans: rejectedCount,
        integrityScore: 99.8,
        blockchainHashes: scanLogs.map(scan => ({
          id: scan.id,
          uid: scan.uid,
          hash: scan.hash,
          status: scan.status
        }))
      };

      const content = JSON.stringify(digestData, null, 2);
      const filename = `proof-digest-${new Date().toISOString().split('T')[0]}.json`;
      
      const blob = new Blob([content], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 2500);
  };

  const handleViewProofOnBlockchain = async () => {
    const currentScanData = scanLogs.find(s => s.id === selectedScan);
    if (!currentScanData) return;

    setIsViewingProof(true);
    setProofStatus("Connecting to blockchain explorer...");
    
    toast({
      title: "Opening Blockchain Explorer",
      description: `Viewing proof for UID ${currentScanData.uid} on blockchain...`,
    });
    
    // Step 1: Connect to explorer
    setTimeout(() => {
      setProofStatus("Locating transaction...");
      toast({
        title: "Connected to Explorer",
        description: "Successfully connected to blockchain explorer",
      });
    }, 1000);
    
    // Step 2: Locate transaction
    setTimeout(() => {
      setProofStatus("Verifying transaction hash...");
      toast({
        title: "Transaction Located",
        description: `Found transaction for UID ${currentScanData.uid}`,
      });
    }, 2000);
    
    // Step 3: Verify proof
    setTimeout(() => {
      setProofStatus("Validating cryptographic proof...");
      toast({
        title: "Validating Proof",
        description: "Verifying cryptographic integrity of the transaction",
      });
    }, 3000);
    
    // Step 4: Open in new tab
    setTimeout(() => {
      setIsViewingProof(false);
      setProofStatus("Proof verified and opened");
      
      // Create blockchain explorer URL (simulated)
      const explorerUrl = `https://blockchain-explorer.example.com/tx/${currentScanData.hash}`;
      
      // Open in new tab
      const newWindow = window.open(explorerUrl, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        toast({
          title: "Blockchain Explorer Opened",
          description: `Proof for ${currentScanData.uid} opened in new tab. Transaction verified.`,
        });
      } else {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups to view blockchain explorer, or copy the transaction hash manually.",
        });
      }
    }, 4000);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    toast({
      title: "Search Updated",
      description: `Searching for: ${value || 'all scans'}`,
    });
  };

  const handleFilterChange = (filter: string) => {
    setFilterValue(filter);
    toast({
      title: "Filter Applied",
      description: `Filtering by: ${filter}`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-danger" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPrizeIcon = (prize: string) => {
    if (prize.includes('M-Pesa')) return <CreditCard className="w-4 h-4 text-success" />;
    if (prize.includes('iPhone')) return <Apple className="w-4 h-4 text-primary" />;
    if (prize.includes('Pizza')) return <Shield className="w-4 h-4 text-warning" />;
    if (prize.includes('NFT')) return <Grid3X3 className="w-4 h-4 text-purple-500" />;
    return <Play className="w-4 h-4 text-primary" />;
  };

  const getUIDIcon = (uid: string) => {
    const firstChar = uid.charAt(0);
    switch (firstChar) {
      case 'A': return <User className="w-4 h-4 text-success" />;
      case 'B': return <User className="w-4 h-4 text-primary" />;
      case 'C': return <Smartphone className="w-4 h-4 text-primary" />;
      case 'Z': return <XCircle className="w-4 h-4 text-purple-500" />;
      default: return <User className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Audit Dashboard — Tab 2</h1>
          <p className="text-muted-foreground">Scan Log Detail</p>
        </div>
        <Button 
          variant="default" 
          className="glow-sm flex items-center gap-2"
          onClick={handleSyncWithBlockchain}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          )}
          {isSyncing ? syncStatus : "Sync with Blockchain"}
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search UID / Sponsor / Campaign"
            className="pl-10 bg-input border-primary/30"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => handleFilterChange(filterValue === "Airport" ? "Mall" : "Airport")}
        >
          Filter: {filterValue}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-[#1A1A2E] to-[#2C2C4A] border border-cyan-500/20">
          <div className="text-sm text-gray-400 mb-1">Total Scans</div>
          <div className="text-2xl font-bold text-white">{totalScans}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1A1A2E] to-[#2C2C4A] border border-green-500/20">
          <div className="text-sm text-gray-400 mb-1">Verified</div>
          <div className="text-2xl font-bold text-green-400">{verifiedCount}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1A1A2E] to-[#2C2C4A] border border-yellow-500/20">
          <div className="text-sm text-gray-400 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#1A1A2E] to-[#2C2C4A] border border-red-500/20">
          <div className="text-sm text-gray-400 mb-1">Rejected</div>
          <div className="text-2xl font-bold text-red-400">{rejectedCount}</div>
        </Card>
      </div>

      {/* Main Content Area with AI Pattern Detector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* AI Pattern Detector - Left Sidebar */}
        <div className="lg:col-span-1">
          <AIPatternDetector />
        </div>

        {/* Main Content - Right Side */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scan Log Table - Left Side */}
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
                {scanLogs.map((scan, i) => (
                  <tr 
                    key={i} 
                    onClick={() => setSelectedScan(scan.id)}
                    className={`border-b border-primary/20 hover:bg-primary/10 transition-all cursor-pointer ${
                      selectedScan === scan.id ? 'bg-primary/10 border-primary/50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-primary font-mono font-semibold">{scan.uid}</td>
                    <td className="py-3 px-4 text-foreground">{scan.timestamp.split(' ')[0].split('-').slice(1).join('-')} {scan.timestamp.split(' ')[1].substring(0, 5)}</td>
                    <td className="py-3 px-4 text-foreground font-mono text-sm">{scan.gps}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(scan.status)}
                        <span className="text-sm font-medium capitalize">{scan.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Scan Details Panel - Right Sidebar */}
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
                <div className="flex items-center gap-2">
                  <HashDisplay hash={currentScan.hash} short={false} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      navigator.clipboard.writeText(currentScan.hash);
                      toast({
                        title: "Hash Copied",
                        description: "Block hash copied to clipboard",
                      });
                    }}
                  >
                    <FileText className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button 
            className="w-full mt-6 group" 
            variant="default"
            onClick={handleViewProofOnBlockchain}
            disabled={isViewingProof}
          >
            {isViewingProof ? (
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
            )}
            {isViewingProof ? proofStatus : "View Proof on Blockchain"}
          </Button>
          
          {isViewingProof && (
            <div className="mt-3 p-3 bg-primary/10 border border-primary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                <span className="text-sm font-medium text-primary">Proof Verification in Progress</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning animate-pulse" style={{ width: '100%' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Connecting to blockchain explorer and verifying transaction...
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Section - Three Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Blockchain Sync Status */}
        <Card className="p-4 border-success/50 bg-success/10">
          <div className="flex items-center gap-2 text-success mb-2">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-warning animate-pulse' : 'bg-success animate-pulse'}`} />
            <span className="text-sm font-semibold">Blockchain Sync Status</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Last verified block #{blockHeight}
            </p>
            <p className="text-xs text-muted-foreground">
              {isSyncing ? syncStatus : "All nodes synced."}
            </p>
            <p className="text-sm font-semibold text-primary">
              Next verified block #{nextBlockHeight}
            </p>
            {lastSyncTime && (
              <p className="text-xs text-muted-foreground">
                Last sync: {lastSyncTime.toLocaleTimeString()}
              </p>
            )}
            {isSyncing && (
              <div className="mt-2">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning animate-pulse" style={{ width: '100%' }} />
                </div>
                <p className="text-xs text-warning mt-1">Syncing in progress...</p>
              </div>
            )}
          </div>
        </Card>

        {/* Export Tools */}
        <Card className="p-4 border-primary/50 bg-primary/10">
          <h3 className="font-semibold mb-2">Export Tools</h3>
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  {isExporting ? "Exporting..." : "Export All Logs (CSV, JSON)"}
                  <ChevronDown className="w-3 h-3 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExportLogs('CSV')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportLogs('JSON')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={handleGenerateProofDigest}
              disabled={isGeneratingDigest}
            >
              {isGeneratingDigest ? (
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              {isGeneratingDigest ? "Generating..." : "Generate Proof Digest"}
            </Button>
          </div>
        </Card>

        {/* Hash Integrity Meter */}
        <Card className="p-4 border-primary/50 bg-primary/10">
            <h3 className="font-semibold text-sm mb-2">Hash Integrity Meter</h3>
            <div className="text-2xl font-bold text-success mb-2">99.8%</div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success w-[99.8%] glow-sm" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">verified integrity</p>
        </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
