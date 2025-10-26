import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Filter, 
  Download, 
  Eye, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Calendar, 
  Users, 
  Building,
  Link,
  Zap,
  Brain,
  PieChart,
  BarChart3,
  Shield
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { AIComplianceAnalyzer } from "@/components/AIDashboardPanels";

export const EscrowPayments = () => {
  const { toast } = useToast();

  // State for dialogs and data
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showReleaseDialog, setShowReleaseDialog] = useState(false);
  const [showReleaseResultsDialog, setShowReleaseResultsDialog] = useState(false);
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseResults, setReleaseResults] = useState<any>(null);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  // Real-time escrow data
  const [escrowData, setEscrowData] = useState({
    escrowBalance: 4.2,
    mpesaPercentage: 43,
    sepaPercentage: 57,
    totalTransactions: 2483,
    blockchainHeight: 23879,
    ledgerIntegrity: 99.9,
    duplicateTransactions: 0
  });

  // Recent release activity data - real-time
  const [recentReleases, setRecentReleases] = useState([
    { id: 1, sponsor: "Omega Cola", type: "MPesa", amount: 12000, status: "Pending", timestamp: Date.now() },
    { id: 2, sponsor: "City Pizza", type: "SEPA", amount: 35000, status: "Completed", timestamp: Date.now() - 120000 },
    { id: 3, sponsor: "Anton Coach", type: "SEPA", amount: 20000, status: "Completed", timestamp: Date.now() - 300000 },
    { id: 4, sponsor: "NeoFoods", type: "MPesa", amount: 18000, status: "Failed", timestamp: Date.now() - 450000 }
  ]);

  // Batch approvals data - real-time
  const [batchApprovals, setBatchApprovals] = useState([
    { id: 1, status: "approved", icon: "✓" },
    { id: 2, status: "approved", icon: "✓" },
    { id: 3, status: "approved", icon: "✓" },
    { id: 4, status: "pending", icon: "..." },
    { id: 5, status: "approved", icon: "✓" }
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update escrow data
      setEscrowData(prev => ({
        ...prev,
        escrowBalance: Math.max(3.8, Math.min(4.8, prev.escrowBalance + (Math.random() - 0.5) * 0.1)),
        mpesaPercentage: Math.max(40, Math.min(50, prev.mpesaPercentage + (Math.random() - 0.5) * 2)),
        sepaPercentage: Math.max(50, Math.min(60, prev.sepaPercentage + (Math.random() - 0.5) * 2)),
        blockchainHeight: prev.blockchainHeight + Math.floor(Math.random() * 3) + 1,
        ledgerIntegrity: Math.min(100, Math.max(99.5, prev.ledgerIntegrity + (Math.random() - 0.5) * 0.1))
      }));

      // Update recent releases with new transactions
      setRecentReleases(prev => {
        const updated = [...prev];
        // Randomly update pending statuses
        updated.forEach(release => {
          if (release.status === 'Pending' && Math.random() > 0.7) {
            release.status = Math.random() > 0.2 ? 'Completed' : 'Failed';
          }
        });
        return updated;
      });

      // Update batch approvals
      setBatchApprovals(prev => {
        const updated = [...prev];
        // Randomly complete pending approvals
        updated.forEach(approval => {
          if (approval.status === 'pending' && Math.random() > 0.7) {
            approval.status = 'approved';
            approval.icon = '✓';
          }
        });
        return updated;
      });

      // Update last update time
      setLastUpdateTime(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Button handlers
  const handleViewProofOnChain = () => {
    setShowProofDialog(true);
    toast({
      title: "Opening Chain Explorer",
      description: "Redirecting to blockchain proof verification...",
    });
  };

  const handleReleaseEscrow = () => {
    setShowReleaseDialog(true);
  };

  const handleViewProofOnChainApprovals = () => {
    setShowProofDialog(true);
    toast({
      title: "Viewing Batch Proofs",
      description: "Opening blockchain verification for batch approvals...",
    });
  };

  const handleViewAllChain = () => {
    setShowProofDialog(true);
    toast({
      title: "Viewing All Chain Data",
      description: `Opening blockchain explorer for Block #${escrowData.blockchainHeight}...`,
    });
  };

  const executeReleaseEscrow = () => {
    setIsReleasing(true);
    
    setTimeout(() => {
      setIsReleasing(false);
      setReleaseResults({
        success: true,
        releasedAmount: "€85,000",
        transactions: 3,
        blockNumber: escrowData.blockchainHeight + 100,
        timestamp: new Date().toLocaleString()
      });
      setShowReleaseDialog(false);
      setShowReleaseResultsDialog(true);
      
      toast({
        title: "Escrow Released Successfully",
        description: "€85,000 released across 3 transactions",
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-white';
      case 'pending': return 'text-green-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed': return <X className="w-4 h-4 text-red-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Escrow & Payments Dashboard - Tab 4</h1>
          <p className="text-gray-400 mt-2">Overview of sponsor transactions, escrow batch releases, and financial data</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-400">
            Last update: {new Date(lastUpdateTime).toLocaleTimeString()}
          </div>
          
          <Button 
            onClick={handleViewProofOnChain}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link className="w-4 h-4 mr-2" />
            View Proof on Chain
          </Button>
          
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Balances & Totals Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Balances & Totals</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-3xl font-bold text-green-400 mb-2">
              €{escrowData.escrowBalance.toFixed(1)}M
            </div>
            <div className="text-sm text-gray-400">Escrow Balance</div>
          </div>

          {/* Pie Chart Representation */}
          <div className="mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  {/* M-Pesa segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    strokeDasharray={`${(escrowData.mpesaPercentage / 100) * 251.2} 251.2`}
                    strokeDashoffset="0"
                  />
                  {/* SEPA segment */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1E40AF"
                    strokeWidth="8"
                    strokeDasharray={`${(escrowData.sepaPercentage / 100) * 251.2} 251.2`}
                    strokeDashoffset={`-${(escrowData.mpesaPercentage / 100) * 251.2}`}
                  />
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-gray-300">M-Pesa</span>
                </div>
                <span className="text-sm font-semibold text-white">{escrowData.mpesaPercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                  <span className="text-sm text-gray-300">SEPA</span>
                </div>
                <span className="text-sm font-semibold text-white">{escrowData.sepaPercentage}%</span>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            — Real-Time Distribution
          </div>
        </Card>

        {/* Recent Release Activity Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Release Activity</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            {recentReleases.map((release, index) => (
              <div key={release.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg transition-all duration-300 hover:bg-muted/70">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{release.sponsor}</div>
                  <div className="text-xs text-gray-400">{release.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white animate-pulse">€{release.amount.toLocaleString()}</div>
                  <div className={`text-xs ${getStatusColor(release.status)} flex items-center gap-1 transition-colors duration-300`}>
                    {getStatusIcon(release.status)}
                    {release.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleReleaseEscrow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Release Escrow
          </Button>
        </Card>

        {/* Approvals & Transaction Ledger Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Approvals & Transaction Ledger</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              {batchApprovals.map((approval, index) => (
                <div
                  key={approval.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    approval.status === 'approved' 
                      ? 'bg-green-600 text-white ring-2 ring-green-400 ring-opacity-50' 
                      : 'bg-yellow-600 text-white animate-pulse'
                  }`}
                >
                  {approval.icon}
                </div>
              ))}
            </div>
            
            <div className="text-sm text-gray-300 mb-2">
              Batch Approvals: 3 S:
            </div>
            <div className="text-sm text-gray-400 mb-4">
              V21 54 10 on proofs
            </div>
          </div>
          
          <Button 
            onClick={handleViewProofOnChainApprovals}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            View Proof on Chain
          </Button>
        </Card>
      </div>

      {/* AI Compliance Analyzer Panel - Tab 4 */}
      <div className="mb-6">
        <AIComplianceAnalyzer escrowData={escrowData} />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* M-Pesa → SEPA Bridge Monitor Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">M-Pesa → SEPA Bridge Monitor</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Connection Status:</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-semibold">Active</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Blockchain Anchor:</span>
              <span className="text-sm text-white font-mono">
                Block #{escrowData.blockchainHeight} - {escrowData.totalTransactions} proofs
              </span>
            </div>
          </div>
          
          <Button 
            onClick={handleViewAllChain}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            All Chain on Chain: Block #{escrowData.blockchainHeight + 100} - {escrowData.totalTransactions}
          </Button>
        </Card>

        {/* AI Compliance Summary Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">AI Compliance Summary</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Ledger Integrity:</span>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-semibold">
                  {escrowData.ledgerIntegrity}% - All signatures verified.
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">
                {escrowData.duplicateTransactions} duplicate transactions were detected across last 24h
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Dialogs */}
      <Dialog open={showReleaseDialog} onOpenChange={setShowReleaseDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-white">Release Escrow Batch</DialogTitle>
            <DialogDescription className="text-gray-400">
              Confirm the release of pending escrow transactions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Pending Transactions:</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Omega Cola (MPesa):</span>
                  <span className="text-white">€12,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">NeoFoods (MPesa):</span>
                  <span className="text-white">€18,000</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t border-border pt-2">
                  <span className="text-white">Total:</span>
                  <span className="text-green-400">€30,000</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReleaseDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={executeReleaseEscrow}
              disabled={isReleasing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isReleasing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Releasing...
                </>
              ) : (
                'Release Escrow'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReleaseResultsDialog} onOpenChange={setShowReleaseResultsDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-white">Escrow Release Complete</DialogTitle>
            <DialogDescription className="text-gray-400">
              Transaction details and blockchain confirmation
            </DialogDescription>
          </DialogHeader>
          
          {releaseResults && (
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Release Successful</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount Released:</span>
                    <span className="text-white font-semibold">{releaseResults.releasedAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transactions:</span>
                    <span className="text-white">{releaseResults.transactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Block Number:</span>
                    <span className="text-white font-mono">#{releaseResults.blockNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="text-white">{releaseResults.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              onClick={() => setShowReleaseResultsDialog(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Blockchain Proof Verification</DialogTitle>
            <DialogDescription className="text-gray-400">
              View transaction proofs on the blockchain
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Block Information:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Block:</span>
                  <span className="text-white font-mono">#{escrowData.blockchainHeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Proofs:</span>
                  <span className="text-white">{escrowData.totalTransactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Integrity Score:</span>
                  <span className="text-green-400">{escrowData.ledgerIntegrity}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Link className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-semibold">Chain Explorer</span>
              </div>
              <p className="text-sm text-gray-300">
                Opening blockchain explorer at: https://demo.kardiverse.com/chain/{escrowData.blockchainHeight}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setShowProofDialog(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};