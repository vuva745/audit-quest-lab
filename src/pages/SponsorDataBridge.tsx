import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Database, 
  Cloud, 
  Link, 
  Activity, 
  Key, 
  FileText, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp,
  Zap,
  Shield,
  Server,
  Globe,
  Cpu,
  HardDrive,
  Loader2,
  X,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
  Clock,
  Users,
  Building,
  CreditCard,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";
import { RealTimeSync, AIAuditLinkMonitor, AIForecastIntegrity, DataExportHub } from "@/components/AIDashboardPanels";

const SponsorDataBridge = () => {
  const { toast } = useToast();
  
  // State for real-time data
  const [syncData, setSyncData] = useState({
    apiLatency: 87,
    uptime: 99.8,
    blockchainBlock: 23879,
    totalSponsors: 233902,
    verifiedTokens: 120334,
    activeCrmLinks: 14,
    networkHealth: 9.9,
    lastSync: "14:42"
  });

  // Dialog states
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [showApiKeysDialog, setShowApiKeysDialog] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [showConnectionDialog, setShowConnectionDialog] = useState(false);
  const [showNeoCardDialog, setShowNeoCardDialog] = useState(false);
  const [showKardiverseDialog, setShowKardiverseDialog] = useState(false);
  const [showNodesDialog, setShowNodesDialog] = useState(false);

  // Sync process state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncResults, setSyncResults] = useState<any>(null);

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'NeoCard API', key: 'nc_live_sk_1234567890abcdef', type: 'live', status: 'active', lastUsed: '2 minutes ago' },
    { id: '2', name: 'Blockchain API', key: 'bc_live_sk_abcdef1234567890', type: 'live', status: 'active', lastUsed: '5 minutes ago' },
    { id: '3', name: 'CRM Integration', key: 'crm_live_sk_9876543210fedcba', type: 'live', status: 'active', lastUsed: '1 minute ago' },
    { id: '4', name: 'Test API', key: 'test_sk_1234567890abcdef', type: 'test', status: 'inactive', lastUsed: '2 hours ago' }
  ]);
  const [showKeyValues, setShowKeyValues] = useState<Record<string, boolean>>({});

  // Logs state
  const [logs, setLogs] = useState([
    { id: '1', timestamp: '14:45:23', level: 'INFO', source: 'NeoCard API', message: 'Successfully synced 1,247 sponsor records', status: 'success' },
    { id: '2', timestamp: '14:44:18', level: 'WARN', source: 'Blockchain', message: 'Minor delay in block confirmation (2s)', status: 'warning' },
    { id: '3', timestamp: '14:43:45', level: 'INFO', source: 'CRM Integration', message: 'HubSpot sync completed - 89 new contacts', status: 'success' },
    { id: '4', timestamp: '14:42:12', level: 'ERROR', source: 'Oracle CX', message: 'Connection timeout - retrying...', status: 'error' },
    { id: '5', timestamp: '14:41:33', level: 'INFO', source: 'AI Sentinel', message: 'Network health check passed (9.9/10)', status: 'success' },
    { id: '6', timestamp: '14:40:56', level: 'INFO', source: 'NeoCard API', message: 'Token verification completed for 234 cards', status: 'success' }
  ]);

  // Node status state
  const [nodes, setNodes] = useState([
    { id: 'node-1', name: 'NeoCard™ Main', status: 'online', latency: 45, lastSync: '14:45:23', connections: 12 },
    { id: 'node-2', name: 'Blockchain Node', status: 'online', latency: 67, lastSync: '14:45:20', connections: 8 },
    { id: 'node-3', name: 'CRM Hub', status: 'online', latency: 89, lastSync: '14:45:18', connections: 15 },
    { id: 'node-4', name: 'AI Sentinel', status: 'online', latency: 34, lastSync: '14:45:25', connections: 6 },
    { id: 'node-5', name: 'Backup Node', status: 'standby', latency: 0, lastSync: '14:30:00', connections: 0 }
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncData(prev => ({
        ...prev,
        apiLatency: Math.max(50, Math.min(150, prev.apiLatency + (Math.random() - 0.5) * 10)),
        uptime: Math.max(99.0, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.2)),
        blockchainBlock: prev.blockchainBlock + Math.floor(Math.random() * 3) + 1,
        networkHealth: Math.max(9.0, Math.min(10, prev.networkHealth + (Math.random() - 0.5) * 0.2)),
        lastSync: new Date().toLocaleTimeString()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSyncData = () => {
    setShowSyncDialog(true);
  };

  const handleApiKeys = () => {
    setShowApiKeysDialog(true);
  };

  const handleViewLogs = () => {
    setShowLogsDialog(true);
  };

  const handleConnectionOverview = () => {
    setShowConnectionDialog(true);
  };

  const handleNeoCard = () => {
    setShowNeoCardDialog(true);
  };

  const handleKardiverseCloud = () => {
    setShowKardiverseDialog(true);
  };

  const handleAllNodesSynced = () => {
    setShowNodesDialog(true);
  };

  const handleTestConnections = () => {
    toast({
      title: "Testing Connections",
      description: "Testing all CRM and blockchain connections...",
    });
    
    setTimeout(() => {
      toast({
        title: "Connection Test Complete",
        description: "All connections verified successfully",
      });
    }, 3000);
  };

  const executeSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Reset sync results
    setSyncResults(null);
    
    const syncSteps = [
      { 
        name: 'NeoCard™ Database', 
        duration: 2000,
        records: 1247,
        description: 'Syncing sponsor records and verification data'
      },
      { 
        name: 'Blockchain Network', 
        duration: 1500,
        blocks: 23,
        description: 'Verifying blockchain integrity and block height'
      },
      { 
        name: 'CRM Systems', 
        duration: 2500,
        contacts: 89,
        description: 'Synchronizing CRM contacts with HubSpot, Salesforce, Oracle'
      },
      { 
        name: 'AI Sentinel', 
        duration: 1000,
        score: syncData.networkHealth,
        description: 'Running AI integrity checks and anomaly detection'
      },
      { 
        name: 'Data Validation', 
        duration: 1500,
        validation: 'complete',
        description: 'Validating data integrity and cross-system consistency'
      }
    ];

    let totalDuration = syncSteps.reduce((sum, step) => sum + step.duration, 0);
    let currentDuration = 0;

    // Track completed steps
    const completedSteps: any[] = [];

    for (let i = 0; i < syncSteps.length; i++) {
      const step = syncSteps[i];
      completedSteps.push(step);
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
      currentDuration += step.duration;
      setSyncProgress((currentDuration / totalDuration) * 100);
    }

    // Calculate actual data
    const actualTotalRecords = syncSteps[0].records || 0;
    const actualBlockchainBlocks = syncSteps[1].blocks || 0;
    const actualCrmContacts = syncSteps[2].contacts || 0;

    setSyncResults({
      totalRecords: actualTotalRecords,
      blockchainBlocks: actualBlockchainBlocks,
      crmContacts: actualCrmContacts,
      validationErrors: 0,
      syncTime: `${(totalDuration / 1000).toFixed(1)}s`,
      status: 'success',
      timestamp: new Date().toISOString(),
      completedSteps: completedSteps,
      statistics: {
        newSponsors: Math.floor(actualTotalRecords * 0.15),
        updatedTokens: Math.floor(actualTotalRecords * 0.22),
        verifiedEntries: actualTotalRecords,
        syncRate: `${(actualTotalRecords / (totalDuration / 1000)).toFixed(0)} records/sec`
      }
    });

    // Update syncData with new values
    setSyncData(prev => ({
      ...prev,
      totalSponsors: actualTotalRecords,
      verifiedTokens: Math.floor(actualTotalRecords * 0.5),
      blockchainBlock: prev.blockchainBlock + actualBlockchainBlocks,
      lastSync: new Date().toLocaleTimeString()
    }));

    setIsSyncing(false);
    setSyncProgress(100);
    
    toast({
      title: "Sync Complete",
      description: `${actualTotalRecords} records synchronized across all systems`,
    });
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeyValues(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "API Key Copied",
      description: "API key copied to clipboard",
    });
  };

  const generateNewApiKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: `nc_live_sk_${Math.random().toString(36).substring(2, 18)}`,
      type: 'live',
      status: 'active',
      lastUsed: 'Just now'
    };
    
    setApiKeys(prev => [newKey, ...prev]);
    toast({
      title: "New API Key Generated",
      description: "API key has been created successfully",
    });
  };

  const handleExportLogs = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Create comprehensive log export data
    const exportData = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        totalLogs: logs.length,
        exportedBy: "Data Bridge System",
        systemInfo: {
          networkHealth: syncData.networkHealth,
          uptime: syncData.uptime,
          lastSync: syncData.lastSync,
          apiLatency: syncData.apiLatency
        }
      },
      logs: logs.map(log => ({
        ...log,
        exportedAt: new Date().toISOString()
      })),
      summary: {
        byLevel: logs.reduce((acc, log) => {
          acc[log.level] = (acc[log.level] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        bySource: logs.reduce((acc, log) => {
          acc[log.source] = (acc[log.source] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        byStatus: logs.reduce((acc, log) => {
          acc[log.status] = (acc[log.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      }
    };

    // Create JSON export
    const jsonContent = JSON.stringify(exportData, null, 2);
    const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
    
    // Create text export (human-readable format)
    const textContent = [
      `=== DATA BRIDGE SYSTEM LOGS EXPORT ===`,
      `Export Date: ${new Date().toLocaleString()}`,
      `Total Logs: ${logs.length}`,
      `Network Health: ${syncData.networkHealth}/10`,
      `System Uptime: ${syncData.uptime}%`,
      `API Latency: ${syncData.apiLatency}ms`,
      `Last Sync: ${syncData.lastSync}`,
      ``,
      `=== LOG ENTRIES ===`,
      ...logs.map(log => 
        `[${log.timestamp}] ${log.level} | ${log.source} | ${log.status.toUpperCase()}\n    ${log.message}`
      ),
      ``,
      `=== SUMMARY ===`,
      `By Level:`,
      ...Object.entries(exportData.summary.byLevel).map(([level, count]) => `  ${level}: ${count}`),
      ``,
      `By Source:`,
      ...Object.entries(exportData.summary.bySource).map(([source, count]) => `  ${source}: ${count}`),
      ``,
      `By Status:`,
      ...Object.entries(exportData.summary.byStatus).map(([status, count]) => `  ${status}: ${count}`)
    ].join('\n');
    
    const textBlob = new Blob([textContent], { type: 'text/plain' });
    
    // Create CSV export
    const csvHeaders = ['Timestamp', 'Level', 'Source', 'Status', 'Message'];
    const csvRows = logs.map(log => [
      log.timestamp,
      log.level,
      log.source,
      log.status,
      log.message.replace(/"/g, '""') // Escape quotes for CSV
    ]);
    
    const csvContent = [csvHeaders, ...csvRows].map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');
    
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    
    // Download files
    const downloadFile = (blob: Blob, filename: string) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };
    
    // Download JSON
    downloadFile(jsonBlob, `data-bridge-logs-${timestamp}.json`);
    
    // Download text file after a short delay
    setTimeout(() => {
      downloadFile(textBlob, `data-bridge-logs-${timestamp}.txt`);
    }, 500);
    
    // Download CSV after another delay
    setTimeout(() => {
      downloadFile(csvBlob, `data-bridge-logs-${timestamp}.csv`);
    }, 1000);
    
    toast({
      title: "Logs Exported",
      description: `Exported ${logs.length} log entries in JSON, TXT, and CSV formats`,
    });
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Sponsor Data Bridge – Tab 9</h1>
          <p className="text-muted-foreground text-lg">Live data link between NeCodr™, Blockchain and external CRM systems.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleSyncData}
            className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data Now
          </Button>
          <Button 
            onClick={handleApiKeys}
            className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </Button>
          <Button 
            onClick={handleViewLogs}
            className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Logs
          </Button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-2 mb-8">
        <CheckCircle className="w-6 h-6 text-cyan-400" />
        <Button 
          variant="link" 
          onClick={handleAllNodesSynced}
          className="text-cyan-400 text-lg font-semibold p-0 h-auto hover:text-cyan-300"
        >
          All Nodes Synced
        </Button>
      </div>

      {/* AI Data Bridge Panels - Tab 9 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RealTimeSync syncData={syncData} />
        <AIAuditLinkMonitor syncData={syncData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AIForecastIntegrity syncData={syncData} />
        <DataExportHub />
      </div>

      {/* Top Row Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Connection Overview */}
        <Card className="p-6 border-cyan-500/20 shadow-[0_0_10px_rgba(102,204,255,0.15)]">
          <h2 className="text-xl font-semibold mb-4">Connection Overview</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={handleNeoCard}
                className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 flex-1"
              >
                <Database className="w-4 h-4 mr-2" />
                NeoCard™
              </Button>
              <Button 
                onClick={handleKardiverseCloud}
                className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 flex-1"
              >
                <Cloud className="w-4 h-4 mr-2" />
                Cloud
              </Button>
            </div>
            <Button 
              onClick={handleConnectionOverview}
              className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 w-full"
            >
              <Link className="w-4 h-4 mr-2" />
              Blockchain
            </Button>
            <div className="space-y-2">
              <p>Total Sponsors/CRM {syncData.totalSponsors.toLocaleString()}</p>
              <p>Verified Tokens: {syncData.verifiedTokens.toLocaleString()}</p>
              <p>Active CRM Links: {syncData.activeCrmLinks}</p>
            </div>
          </div>
        </Card>

        {/* API & Blockchain Monitor */}
        <Card className="p-6 border-cyan-500/20 shadow-[0_0_10px_rgba(102,204,255,0.15)]">
          <h2 className="text-xl font-semibold mb-4">API & Blockchain Monitor</h2>
          <div className="space-y-4">
            <div className="border border-cyan-500/40 rounded-lg p-3 bg-cyan-500/10 shadow-[0_0_10px_rgba(102,204,255,0.2)]">
              <p className="text-sm">
                API Health: Latency {syncData.apiLatency}ms | Uptime {syncData.uptime.toFixed(1)}%
              </p>
            </div>
            <div className="border border-cyan-500/40 rounded-lg p-3 bg-cyan-500/10 shadow-[0_0_10px_rgba(102,204,255,0.2)]">
              <p className="text-sm">
                Blockchain Verified: Block #{syncData.blockchainBlock.toLocaleString()} Proofs
              </p>
            </div>
            
            {/* Sync Stability Graph */}
            <div className="mt-4">
              <div className="h-20 bg-slate-900 rounded-lg p-2 relative overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <linearGradient id="syncGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,40 Q20,20 40,35 T80,25 T120,30 T160,20 T200,35"
                    stroke="url(#syncGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  {/* Grid lines */}
                  <line x1="0" y1="20" x2="200" y2="20" stroke="#374151" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke="#374151" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="60" x2="200" y2="60" stroke="#374151" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
              <p className="text-sm mt-2">Sync Stability (last 4 h)</p>
            </div>
          </div>
        </Card>

        {/* CRM Integration Panel */}
        <Card className="p-6 border-cyan-500/20 shadow-[0_0_10px_rgba(102,204,255,0.15)]">
          <h2 className="text-xl font-semibold mb-4">CRM Integration Panel</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300">
                Salesforce
              </Button>
              <Button className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300">
                HubSpot
              </Button>
            </div>
            <Button className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 w-full">
              Oracle CX
            </Button>
            <Button className="bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 w-full">
              <HardDrive className="w-4 h-4 mr-2" />
              Custom Sponsor DB
            </Button>
            <Button 
              onClick={handleTestConnections}
              className="w-full bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(102,204,255,0.3)]"
            >
              <Activity className="w-4 h-4 mr-2" />
              Test Connections
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Row Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Flow Console */}
        <Card className="p-6 border-cyan-500/20 shadow-[0_0_10px_rgba(102,204,255,0.15)]">
          <h2 className="text-xl font-semibold mb-4">Data Flow Console</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span>NeoCard #412</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>Block #{syncData.blockchainBlock.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>CRM ID #47322</span>
              <ArrowDown className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400">Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Bus Block #79 - Chain Sync Delay 2s</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400">Auto-Recovered</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-center gap-2">
              <span>Vendor Node #2</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400">Synced</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>HubSpot DB Entry Created</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-center gap-2">
              <span>Kids Parade Block #5</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>Token #7XAF</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>Linked CRM Oracle CX</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <span>Last chain link verified at {syncData.lastSync}</span>
              <ArrowDown className="w-4 h-4" />
              <span>All nodes synchronized</span>
            </div>
          </div>
        </Card>

        {/* AI Data Sentinel */}
        <Card className="p-6 border-cyan-500/20 shadow-[0_0_10px_rgba(102,204,255,0.15)]">
          <h2 className="text-xl font-semibold mb-4">AI Data Sentinel update:</h2>
          <div className="space-y-4">
            <div className="text-sm">
              <p>Node 3 (University Zone) experienced a 2s delay</p>
              <p className="text-cyan-400">— auto-recovered.</p>
            </div>
            
            <div>
              <p className="text-lg font-semibold">Network Health Score = {syncData.networkHealth.toFixed(1)} / 10</p>
            </div>
            
            {/* Network Health Graph */}
            <div className="mt-4">
              <div className="h-16 bg-slate-900 rounded-lg p-2 relative overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,30 Q20,25 40,28 T80,26 T120,29 T160,27 T200,28"
                    stroke="url(#healthGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  {/* Grid lines */}
                  <line x1="0" y1="10" x2="200" y2="10" stroke="#374151" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="20" x2="200" y2="20" stroke="#374151" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="30" x2="200" y2="30" stroke="#374151" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke="#374151" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Status Indicators */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(102,204,255,0.5)]"></div>
            <div>
              <p className="font-semibold text-cyan-300">NeoCard™</p>
              <p className="text-muted-foreground text-sm">Online</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(102,204,255,0.5)]"></div>
            <div>
              <p className="font-semibold text-cyan-300">Blockchain</p>
              <p className="text-muted-foreground text-sm">Synced</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(102,204,255,0.5)]"></div>
            <div>
              <p className="font-semibold text-cyan-300">CRM Systems</p>
              <p className="text-muted-foreground text-sm">Connected</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(102,204,255,0.5)]"></div>
            <div>
              <p className="font-semibold text-cyan-300">AI Sentinel</p>
              <p className="text-muted-foreground text-sm">Monitoring</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Sync Data Dialog */}
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Data Synchronization
            </DialogTitle>
            <DialogDescription>
              Synchronize data across all connected systems
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {!isSyncing && !syncResults && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Sync Scope</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>NeoCard™ Records:</span>
                        <span className="font-mono">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blockchain Blocks:</span>
                        <span className="font-mono">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CRM Contacts:</span>
                        <span className="font-mono">89</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-semibold mb-2">Last Sync</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span>{syncData.lastSync}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-400">Success</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>4.2s</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {isSyncing && (
              <div className="space-y-4">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
                  <h3 className="font-semibold mb-2">Synchronizing Data...</h3>
                  <Progress value={syncProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">{Math.round(syncProgress)}% complete</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">NeoCard™ Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Blockchain Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {syncProgress > 60 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                    <span className="text-sm">CRM Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {syncProgress > 80 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                    <span className="text-sm">AI Sentinel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {syncProgress > 95 ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                    <span className="text-sm">Data Validation</span>
                  </div>
                </div>
              </div>
            )}

            {syncResults && (
              <div className="space-y-4">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-400 mb-2">Sync Complete!</h3>
                  <p className="text-sm text-muted-foreground">
                    Completed at {new Date(syncResults.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Sync Results</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Records Synced:</span>
                        <span className="font-mono">{syncResults.totalRecords.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blockchain Blocks:</span>
                        <span className="font-mono">{syncResults.blockchainBlocks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CRM Contacts:</span>
                        <span className="font-mono">{syncResults.crmContacts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Validation Errors:</span>
                        <span className="font-mono text-green-400">{syncResults.validationErrors}</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Performance</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Sync Time:</span>
                        <span className="font-mono">{syncResults.syncTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-400 capitalize">{syncResults.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sync Rate:</span>
                        <span className="font-mono">{syncResults.statistics.syncRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network Health:</span>
                        <span className="font-mono">{syncData.networkHealth.toFixed(1)}/10</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {syncResults.statistics && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Sync Statistics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">New Sponsors:</span>
                        <p className="font-semibold text-primary">{syncResults.statistics.newSponsors}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Updated Tokens:</span>
                        <p className="font-semibold text-primary">{syncResults.statistics.updatedTokens}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Verified Entries:</span>
                        <p className="font-semibold text-green-400">{syncResults.statistics.verifiedEntries.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">API Latency:</span>
                        <p className="font-semibold">{syncData.apiLatency.toFixed(0)}ms</p>
                      </div>
                    </div>
                  </Card>
                )}

                {syncResults.completedSteps && (
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">Sync Steps Completed</h3>
                    <div className="space-y-2">
                      {syncResults.completedSteps.map((step: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="font-semibold">{step.name}:</span>
                          <span className="text-muted-foreground">{step.description}</span>
                          {step.records && (
                            <span className="ml-auto text-primary">{step.records} records</span>
                          )}
                          {step.contacts && (
                            <span className="ml-auto text-primary">{step.contacts} contacts</span>
                          )}
                          {step.blocks && (
                            <span className="ml-auto text-primary">{step.blocks} blocks</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSyncDialog(false)}>
              Close
            </Button>
            {!isSyncing && !syncResults && (
              <Button onClick={executeSync}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Sync
              </Button>
            )}
            {syncResults && (
              <Button onClick={() => {
                setSyncResults(null);
                setSyncProgress(0);
              }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Again
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* API Keys Dialog */}
      <Dialog open={showApiKeysDialog} onOpenChange={setShowApiKeysDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys Management
            </DialogTitle>
            <DialogDescription>
              Manage API keys for all connected systems
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Active API Keys</h3>
              <Button onClick={generateNewApiKey} size="sm">
                <Key className="w-4 h-4 mr-2" />
                Generate New Key
              </Button>
            </div>
            
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{apiKey.name}</h4>
                        <Badge variant={apiKey.type === 'live' ? 'default' : 'secondary'}>
                          {apiKey.type}
                        </Badge>
                        <Badge variant={apiKey.status === 'active' ? 'default' : 'outline'}>
                          {apiKey.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1">
                          {showKeyValues[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {showKeyValues[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyApiKey(apiKey.key)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Last used: {apiKey.lastUsed}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApiKeysDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Logs Dialog */}
      <Dialog open={showLogsDialog} onOpenChange={setShowLogsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              System Logs
            </DialogTitle>
            <DialogDescription>
              Real-time system logs and monitoring data
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Recent Logs</h3>
              <Badge variant="outline">
                {logs.length} entries
              </Badge>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.map((log) => (
                <Card key={log.id} className="p-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.status === 'success' ? 'bg-green-400' :
                      log.status === 'warning' ? 'bg-yellow-400' :
                      log.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-muted-foreground">{log.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {log.level}
                        </Badge>
                        <span className="text-sm font-semibold">{log.source}</span>
                      </div>
                      <p className="text-sm">{log.message}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogsDialog(false)}>
              Close
            </Button>
            <Button onClick={handleExportLogs}>
              <FileText className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Connection Overview Dialog */}
      <Dialog open={showConnectionDialog} onOpenChange={setShowConnectionDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link className="w-5 h-5" />
              Blockchain Connection Overview
            </DialogTitle>
            <DialogDescription>
              Detailed blockchain network connection status
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Network Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Block:</span>
                    <span className="font-mono">{syncData.blockchainBlock.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Health:</span>
                    <span className="font-mono text-green-400">{syncData.networkHealth}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sync:</span>
                    <span>{syncData.lastSync}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Connection Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>API Latency:</span>
                    <span className="font-mono">{syncData.apiLatency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-mono text-green-400">{syncData.uptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Links:</span>
                    <span className="font-mono">{syncData.activeCrmLinks}</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Blockchain Nodes</h3>
              <div className="space-y-2">
                {nodes.filter(node => node.name.includes('Blockchain')).map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        node.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                      }`} />
                      <span className="font-semibold">{node.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{node.latency}ms</span>
                      <span>{node.connections} connections</span>
                      <span>{node.lastSync}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConnectionDialog(false)}>
              Close
            </Button>
            <Button onClick={handleTestConnections}>
              <Activity className="w-4 h-4 mr-2" />
              Test Connection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NeoCard Dialog */}
      <Dialog open={showNeoCardDialog} onOpenChange={setShowNeoCardDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              NeoCard™ Management
            </DialogTitle>
            <DialogDescription>
              NeoCard™ system overview and management
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Card Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Cards:</span>
                    <span className="font-mono">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Cards:</span>
                    <span className="font-mono text-green-400">11,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Tokens:</span>
                    <span className="font-mono">{syncData.verifiedTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Verification:</span>
                    <span className="font-mono text-yellow-400">1,613</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-3">System Health</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Database Status:</span>
                    <span className="text-green-400">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Response:</span>
                    <span className="font-mono">{syncData.apiLatency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Backup:</span>
                    <span>2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Used:</span>
                    <span className="font-mono">78.5%</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Recent Card Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Card #412 - Token verification completed</span>
                  <span className="text-muted-foreground">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Card #789 - New sponsor linked</span>
                  <span className="text-muted-foreground">5 minutes ago</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span>Card #234 - Payment processed</span>
                  <span className="text-muted-foreground">8 minutes ago</span>
                </div>
              </div>
            </Card>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNeoCardDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Kardiverse Cloud Dialog */}
      <Dialog open={showKardiverseDialog} onOpenChange={setShowKardiverseDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Kardiverse Cloud Integration
            </DialogTitle>
            <DialogDescription>
              Cloud services and integration management
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Cloud Services</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Storage Used:</span>
                    <span className="font-mono">2.4 TB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bandwidth:</span>
                    <span className="font-mono">156 GB/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Instances:</span>
                    <span className="font-mono text-green-400">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-mono text-green-400">99.9%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Integration Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>API Gateway:</span>
                    <span className="text-green-400">Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Pipeline:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sync Queue:</span>
                    <span className="font-mono">23 items</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sync:</span>
                    <span>{syncData.lastSync}</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Cloud Resources</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Server className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold">Compute</p>
                  <p className="text-xs text-muted-foreground">8 instances</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <HardDrive className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold">Storage</p>
                  <p className="text-xs text-muted-foreground">2.4 TB</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-semibold">Network</p>
                  <p className="text-xs text-muted-foreground">156 GB</p>
                </div>
              </div>
            </Card>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowKardiverseDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* All Nodes Synced Dialog */}
      <Dialog open={showNodesDialog} onOpenChange={setShowNodesDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              All Nodes Synced - Detailed Status
            </DialogTitle>
            <DialogDescription>
              Comprehensive node status and synchronization details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Synchronization Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Nodes:</span>
                    <span className="font-mono">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Online Nodes:</span>
                    <span className="font-mono text-green-400">{nodes.filter(n => n.status === 'online').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sync:</span>
                    <span>{syncData.lastSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Health:</span>
                    <span className="font-mono text-green-400">{syncData.networkHealth}/10</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Performance Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Avg Latency:</span>
                    <span className="font-mono">{Math.round(nodes.reduce((sum, n) => sum + n.latency, 0) / nodes.length)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Connections:</span>
                    <span className="font-mono">{nodes.reduce((sum, n) => sum + n.connections, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Uptime:</span>
                    <span className="font-mono text-green-400">{syncData.uptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Block Height:</span>
                    <span className="font-mono">{syncData.blockchainBlock.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Node Status Details</h3>
              <div className="space-y-2">
                {nodes.map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        node.status === 'online' ? 'bg-green-400' : 
                        node.status === 'standby' ? 'bg-yellow-400' : 'bg-gray-400'
                      }`} />
                      <div>
                        <h4 className="font-semibold">{node.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{node.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="text-center">
                        <p className="font-mono">{node.latency}ms</p>
                        <p className="text-xs">Latency</p>
                      </div>
                      <div className="text-center">
                        <p className="font-mono">{node.connections}</p>
                        <p className="text-xs">Connections</p>
                      </div>
                      <div className="text-center">
                        <p className="font-mono">{node.lastSync}</p>
                        <p className="text-xs">Last Sync</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNodesDialog(false)}>
              Close
            </Button>
            <Button onClick={handleSyncData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Force Sync All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SponsorDataBridge;
