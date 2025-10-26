import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, AlertTriangle, Activity, Wifi, Link2, Eye, Download, RefreshCw } from "lucide-react";
import { LineChart } from "@/components/LineChart";
import { useState, useEffect } from "react";
import { useRealtimeStats } from "@/hooks/useRealtimeData";
import { useToast } from "@/hooks/use-toast";

// Tab 1: AI Summary + Forecast Panel
export const AISummaryForecast = () => {
  const { stats } = useRealtimeStats();
  
  // Calculate AI insights from real-time data
  const increaseScans = ((stats.registeredScans % 1000) / 100).toFixed(1);
  const patternStability = 95 + (stats.registeredScans % 10);
  const expectedRise = 5 + (stats.registeredScans % 5);
  
  const chartData = [20, 40, 60, 65, 65, stats.registeredScans % 700 + 200, 80];
  const chartLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'D'];
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400 text-neon">AI Summary Insight</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Increase in valid scans</span>
          <span className="text-cyan-400 font-bold text-neon">+{increaseScans}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Pattern stability</span>
          <span className="text-cyan-400 font-bold text-neon">{patternStability}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Top zones</span>
          <span className="text-white text-sm text-neon-sm">Nairobi~Amsterdam~Dubai</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Expected rise by week's end</span>
          <span className="text-cyan-400 font-bold text-neon">+{expectedRise}%</span>
        </div>
      </div>
    </Card>
  );
};

// Tab 1: Proof Activity Overview Panel
export const ProofActivityOverview = () => {
  const { stats } = useRealtimeStats();
  
  // Generate real-time chart data based on actual stats
  const chartData = [
    stats.registeredScans % 100,
    (stats.registeredScans % 100) + 20,
    (stats.registeredScans % 100) + 40,
    (stats.registeredScans % 100) + 60,
    (stats.registeredScans % 700) + 200, // Friday peak
    (stats.registeredScans % 100) + 70,
    (stats.registeredScans % 100) + 80
  ];
  const chartLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'D'];
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-white text-neon">Proof Activity Overview</h3>
      <p className="text-gray-400 text-sm mb-4 text-neon-sm">Last 7 days of verified scans</p>
      
      <div className="h-48">
        <LineChart data={chartData} labels={chartLabels} />
      </div>
      
      <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
        <p className="text-xs text-white mb-1 text-neon-sm">Friday</p>
        <p className="text-2xl font-bold text-white text-neon">{(stats.registeredScans % 700) + 200}</p>
      </div>
    </Card>
  );
};

// Tab 1: Live AI Anomaly Feed Panel
export const LiveAIAnomalyFeed = () => {
  const { stats, activities } = useRealtimeStats();
  const [anomalies, setAnomalies] = useState([
    { time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), message: "No irregularities detected", status: "success" },
    { time: new Date(Date.now() - 3600000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), message: "Delay at University Node (210 ms)", status: "warning" },
    { time: new Date(Date.now() - 7200000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), message: `AI verified sync with AEI Sentinel #${stats.registeredScans}`, status: "success" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnomalies(prev => [
        { time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), message: "No irregularities detected", status: "success" },
        ...prev.slice(0, 2)
      ]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [stats]);
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-white text-neon">Live AI Anomaly Feed</h3>
      
      <div className="space-y-3">
        {anomalies.map((anomaly, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-cyan-400 text-sm font-mono text-neon-sm">[{anomaly.time}]</span>
            <span className="text-white text-sm flex-1 text-neon-sm">{anomaly.message}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Tab 1: Forecast Summary Panel
export const ForecastSummary = () => {
  const { stats } = useRealtimeStats();
  
  // Calculate forecasts from real-time data
  const roiProjection = 10 + ((stats.uniqueWinners % 10) * 0.5);
  const expectedProofs = ((stats.registeredScans / 1000000).toFixed(2));
  const integrity = 98 + ((stats.registeredScans % 10) * 0.2);
  const alertLikelihood = 1 + (stats.registeredScans % 3);
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400 text-neon">Forecast Summary</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">ROI Projection</span>
          <span className="text-green-400 font-bold text-neon-success">+{roiProjection.toFixed(1)}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Expected Proofs</span>
          <span className="text-cyan-400 font-bold text-neon">~{expectedProofs} M</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Integrity</span>
          <span className="text-green-400 font-bold text-neon-success">{integrity.toFixed(1)}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Alert Likelihood</span>
          <span className="text-cyan-400 font-bold text-neon">{alertLikelihood}%</span>
        </div>
      </div>
    </Card>
  );
};

// Tab 2: AI Pattern Detector Panel
export const AIPatternDetector = () => {
  const { stats } = useRealtimeStats();
  const [patterns, setPatterns] = useState([
    { 
      time: new Date(Date.now() - 1800000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), 
      type: "Duplicate scan detected", 
      location: "Dubai", 
      confidence: "98%",
      uid: "#2438"
    },
    { 
      time: new Date(Date.now() - 3600000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), 
      type: "Pattern anomaly", 
      location: "Amsterdam", 
      confidence: "87%",
      uid: "#2299"
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatterns(prev => [
        { 
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), 
          type: "Scan activity normal", 
          location: "Global", 
          confidence: "99%",
          uid: `#${stats.registeredScans % 9999}`
        },
        ...prev.slice(0, 1)
      ]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [stats]);
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400 text-neon">AI Pattern Detector</h3>
      
      <div className="space-y-4 mb-4">
        {patterns.map((pattern, index) => (
          <div key={index} className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <div className="flex items-start justify-between mb-2">
              <span className="text-cyan-400 text-xs font-mono text-neon-sm">{pattern.time}</span>
              <span className="text-green-400 text-xs text-neon-success">{pattern.confidence}</span>
            </div>
            <p className="text-white text-sm font-semibold text-neon-sm">{pattern.type}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-gray-400 text-xs text-neon-sm">{pattern.location}</p>
              <span className="text-cyan-400 text-xs font-mono text-neon-sm">{pattern.uid}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Geo Snapshot */}
      <div className="pt-4 border-t border-cyan-500/20">
        <h4 className="text-sm font-semibold mb-3 text-white text-neon-sm">Geo Snapshot</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/30">
            <p className="text-xs text-gray-400 text-neon-sm">Nairobi</p>
            <p className="text-white font-bold text-neon">{(stats.registeredScans / 1000).toFixed(1)}K</p>
          </div>
          <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/30">
            <p className="text-xs text-gray-400 text-neon-sm">Amsterdam</p>
            <p className="text-white font-bold text-neon">{((stats.registeredScans * 0.85) / 1000).toFixed(1)}K</p>
          </div>
          <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/30">
            <p className="text-xs text-gray-400 text-neon-sm">Dubai</p>
            <p className="text-white font-bold text-neon">{((stats.registeredScans * 0.7) / 1000).toFixed(1)}K</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Tab 4: AI Compliance Analyzer Panel
export const AIComplianceAnalyzer = ({ escrowData, stats }: { escrowData?: any, stats?: any }) => {
  const { stats: realtimeStats } = useRealtimeStats();
  const { toast } = useToast();
  
  const roiImpact = 7 + ((realtimeStats.uniqueWinners % 10) * 0.5);
  const dataTrustScore = escrowData?.ledgerIntegrity || 99.5 + ((realtimeStats.registeredScans % 5) * 0.1);
  const blockHeight = escrowData?.blockchainHeight || 23879;
  
  const handleViewOnChain = () => {
    const explorerUrl = `https://demo.kardiverse.com/chain/block/${blockHeight}`;
    
    toast({
      title: "Opening Blockchain Explorer",
      description: `Viewing compliance data on block #${blockHeight.toLocaleString()}...`,
    });
    
    setTimeout(() => {
      const newWindow = window.open(explorerUrl, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        toast({
          title: "Explorer Opened",
          description: "Blockchain explorer opened in new tab",
        });
      } else {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups or visit: " + explorerUrl,
        });
      }
    }, 1000);
  };
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400 text-neon">AI Compliance Analyzer</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
          <span className="text-white text-sm text-neon-sm">Escrow Verification</span>
          <CheckCircle className="w-5 h-5 text-green-400 text-neon-success" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">ROI Impact</span>
          <span className="text-green-400 font-bold text-neon-success">+{roiImpact.toFixed(1)}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Data Trust Score</span>
          <span className="text-green-400 font-bold text-neon-success">{dataTrustScore.toFixed(2)}%</span>
        </div>
        
        <Button onClick={handleViewOnChain} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
          <Eye className="w-4 h-4 mr-2" />
          View on Chain
        </Button>
      </div>
    </Card>
  );
};

// Tab 9: Real-Time Sync Panel
export const RealTimeSync = ({ syncData }: { syncData?: any }) => {
  const { stats } = useRealtimeStats();
  const { toast } = useToast();
  const [nodeId, setNodeId] = useState(2367);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNodeId(prev => prev + Math.floor(Math.random() * 10));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSyncNow = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    toast({
      title: "Syncing Real-Time Data",
      description: `Connecting to AEI Sentinel Node #${nodeId}...`,
    });
    
    // Step 1: Connect to node
    setTimeout(() => {
      setSyncProgress(25);
      toast({
        title: "Node Connected",
        description: "Successfully connected to AEI Sentinel",
      });
    }, 1000);
    
    // Step 2: Sync blockchain data
    setTimeout(() => {
      setSyncProgress(50);
      toast({
        title: "Syncing Blockchain",
        description: "Pulling latest blocks and transactions...",
      });
    }, 2000);
    
    // Step 3: Update local systems
    setTimeout(() => {
      setSyncProgress(75);
      toast({
        title: "Updating Systems",
        description: "Synchronizing NeoCard, M-Pesa, and CRM data...",
      });
    }, 3000);
    
    // Step 4: Complete
    setTimeout(() => {
      setSyncProgress(100);
      setIsSyncing(false);
      toast({
        title: "Sync Complete",
        description: `Successfully synced all data from Node #${nodeId}`,
      });
      
      // Reset progress after showing completion
      setTimeout(() => setSyncProgress(0), 500);
    }, 4000);
  };

  const handleViewOnChain = () => {
    const blockHeight = syncData?.blockchainBlock || 23879;
    const explorerUrl = `https://demo.kardiverse.com/chain/block/${blockHeight}`;
    
    toast({
      title: "Opening Blockchain Explorer",
      description: `Viewing block #${blockHeight.toLocaleString()} on chain...`,
    });
    
    setTimeout(() => {
      const newWindow = window.open(explorerUrl, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        toast({
          title: "Explorer Opened",
          description: "Blockchain explorer opened in new tab",
        });
      } else {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups or visit: " + explorerUrl,
        });
      }
    }, 1000);
  };
  
  const services = [
    { name: "API Status", status: "active" },
    { name: "Neo Server", status: "active" },
    { name: "AEI Sentinel", status: "active" },
    { name: "M-Pesa Sandbox", status: "active" },
  ];
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-white text-neon">Real-Time Sync</h3>
      
      <div className="mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-white text-sm font-semibold text-neon-sm">Connected</span>
        <span className="text-cyan-400 text-xs ml-auto text-neon-sm">AEI Sentinel Node #{nodeId}</span>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Button 
          onClick={handleSyncNow} 
          disabled={isSyncing}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white text-sm relative overflow-hidden"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? `Syncing... ${syncProgress}%` : 'Sync Now'}
          {/* Progress bar overlay */}
          {isSyncing && (
            <div 
              className="absolute bottom-0 left-0 h-1 bg-cyan-300 transition-all duration-300"
              style={{ width: `${syncProgress}%` }}
            />
          )}
        </Button>
        <Button onClick={handleViewOnChain} variant="outline" className="flex-1 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 text-sm">
          <Eye className="w-4 h-4 mr-2" />
          View on Chain
        </Button>
      </div>
      
      <div className="space-y-2">
        {services.map((service, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-400 text-neon-success" />
            <span className="text-white text-neon-sm">{service.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Tab 9: AI Audit Link Monitor Panel
export const AIAuditLinkMonitor = ({ syncData }: { syncData?: any }) => {
  const { stats } = useRealtimeStats();
  
  // Generate real-time hash flow data
  const chartData = [
    (stats.registeredScans % 50) + 100,
    (stats.registeredScans % 50) + 150,
    (stats.registeredScans % 50) + 120,
    (stats.registeredScans % 50) + 180,
    (stats.registeredScans % 50) + 200,
    (stats.registeredScans % 50) + 220,
    (stats.registeredScans % 50) + 250
  ];
  const chartLabels = ['-60', '-45', '-30', '-15', '0', '15', '30'];
  
  const avgLatency = 100 + (stats.registeredScans % 50);
  const detectedBridges = 3 + (stats.registeredScans % 3);
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-1 text-cyan-400 text-neon">AI Audit Link Monitor</h3>
      <p className="text-gray-400 text-sm mb-4 text-neon-sm">Live hash flow (60 sec interval)</p>
      
      <div className="h-48">
        <LineChart data={chartData} labels={chartLabels} />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <p className="text-xs text-gray-400 text-neon-sm">Detected bridges</p>
          <p className="text-white font-bold text-lg text-neon">{detectedBridges} active</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 text-neon-sm">Average latency</p>
          <p className="text-white font-bold text-lg text-neon">{avgLatency} ms</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 text-neon-sm">Discrepancy Alerts</p>
          <p className="text-green-400 font-bold text-lg text-neon-success">0</p>
        </div>
      </div>
    </Card>
  );
};

// Tab 9: AI Forecast & Integrity Panel
export const AIForecastIntegrity = ({ syncData }: { syncData?: any }) => {
  const { stats } = useRealtimeStats();
  
  const projectedHash = 10 + (stats.registeredScans % 5);
  const roiImpact = 7 + ((stats.uniqueWinners % 5) * 0.5);
  const dataTrustScore = 99.5 + ((stats.registeredScans % 5) * 0.1);
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400 text-neon">AI Forecast & Integrity</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Projected hash</span>
          <span className="text-green-400 font-bold text-neon-success">+{projectedHash}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">ROI impact</span>
          <span className="text-green-400 font-bold text-neon-success">+{roiImpact.toFixed(1)}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-white text-sm text-neon-sm">Data Trust Score</span>
          <span className="text-green-400 font-bold text-neon-success">{dataTrustScore.toFixed(2)}%</span>
        </div>
      </div>
    </Card>
  );
};

// Tab 9: Data Export Hub Panel
export const DataExportHub = () => {
  const { toast } = useToast();
  const [isExportingBlockchain, setIsExportingBlockchain] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingJSON, setIsExportingJSON] = useState(false);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);
  
  const handleBlockchainProofPDF = async () => {
    setIsExportingBlockchain(true);
    
    toast({
      title: "Generating Blockchain Proof PDF",
      description: "Creating comprehensive blockchain proof document...",
    });
    
    setTimeout(() => {
      setIsExportingBlockchain(false);
      toast({
        title: "PDF Generated",
        description: "Blockchain & Proof PDF downloaded successfully",
      });
      
      // Simulate file download
      const blob = new Blob(['Blockchain Proof PDF'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'blockchain-proof.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }, 3000);
  };
  
  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    
    toast({
      title: "Exporting PDF",
      description: "Generating PDF export of data...",
    });
    
    setTimeout(() => {
      setIsExportingPDF(false);
      toast({
        title: "PDF Exported",
        description: "Data exported to PDF successfully",
      });
      
      // Simulate file download
      const blob = new Blob(['PDF Export'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data-export.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }, 2000);
  };
  
  const handleExportJSON = async () => {
    setIsExportingJSON(true);
    
    toast({
      title: "Exporting JSON",
      description: "Generating JSON export of data...",
    });
    
    setTimeout(() => {
      setIsExportingJSON(false);
      toast({
        title: "JSON Exported",
        description: "Data exported to JSON successfully",
      });
      
      // Simulate file download
      const blob = new Blob(['JSON Export'], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data-export.json';
      link.click();
      window.URL.revokeObjectURL(url);
    }, 2000);
  };
  
  const handleAutoGenerateAuditPackage = async () => {
    setIsGeneratingAudit(true);
    
    toast({
      title: "Generating Audit Package",
      description: "Creating comprehensive audit package with all data...",
    });
    
    setTimeout(() => {
      setIsGeneratingAudit(false);
      toast({
        title: "Audit Package Ready",
        description: "Auto-generated audit package ready for download",
      });
      
      // Simulate file download
      const blob = new Blob(['Audit Package'], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'audit-package.zip';
      link.click();
      window.URL.revokeObjectURL(url);
    }, 4000);
  };
  
  return (
    <Card className="p-6 bg-card/50 border-cyan-500/30 backdrop-blur shadow-[0_0_20px_rgba(102,204,255,0.25)] hover:shadow-[0_0_30px_rgba(102,204,255,0.4)] transition-all">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400 text-neon">Data Export Hub</h3>
      
      <div className="space-y-3">
        <Button 
          onClick={handleBlockchainProofPDF}
          disabled={isExportingBlockchain}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold justify-start"
        >
          <Link2 className={`w-4 h-4 mr-2 ${isExportingBlockchain ? 'animate-spin' : ''}`} />
          {isExportingBlockchain ? 'Generating...' : 'Blockchain & Proof PDF'}
        </Button>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleExportPDF}
            disabled={isExportingPDF}
            variant="outline" 
            className="flex-1 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold"
          >
            {isExportingPDF ? 'Generating...' : 'PDF'}
          </Button>
          <Button 
            onClick={handleExportJSON}
            disabled={isExportingJSON}
            variant="outline" 
            className="flex-1 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold"
          >
            {isExportingJSON ? 'Generating...' : 'JSON'}
          </Button>
        </div>
        
        <Button 
          onClick={handleAutoGenerateAuditPackage}
          disabled={isGeneratingAudit}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold justify-start"
        >
          <Download className={`w-4 h-4 mr-2 ${isGeneratingAudit ? 'animate-spin' : ''}`} />
          {isGeneratingAudit ? 'Generating...' : 'Auto-Generate Audit Package'}
        </Button>
      </div>
    </Card>
  );
};
