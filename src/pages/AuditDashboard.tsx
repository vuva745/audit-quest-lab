import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NodeMap } from '@/components/security/NodeMap';
import { AiMonitor } from '@/components/security/AiMonitor';
import { ProofGrid } from '@/components/media/ProofGrid';
import { FlowGraph } from '@/components/bridge/FlowGraph';
import { StatCard } from '@/components/StatCard';
import { 
  Activity, 
  Shield, 
  FileImage, 
  Database, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Download,
  RefreshCw,
  Eye,
  Settings
} from 'lucide-react';
import { 
  getAuditOverview, 
  getSecurityNodes, 
  getSecurityThreats, 
  getMediaProofs, 
  getBridgeHealth, 
  getBridgeFlow 
} from '@/api/audit';
import { exportToCSV, exportToJSON, exportToTXT, logAuditEvent } from '@/utils/exportCSV';
import { mockAuditData } from '@/mocks/audit';

export const AuditDashboard: React.FC = () => {
  const [overview, setOverview] = useState(mockAuditData.overview);
  const [nodes, setNodes] = useState(mockAuditData.security.nodes);
  const [threats, setThreats] = useState(mockAuditData.security.threats);
  const [proofs, setProofs] = useState(mockAuditData.media.proofs);
  const [bridgeHealth, setBridgeHealth] = useState(mockAuditData.bridge.health);
  const [bridgeFlow, setBridgeFlow] = useState(mockAuditData.bridge.flow);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Real-time data updates
  useEffect(() => {
    const updateData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          overviewData,
          nodesData,
          threatsData,
          proofsData,
          healthData,
          flowData
        ] = await Promise.all([
          getAuditOverview(),
          getSecurityNodes(),
          getSecurityThreats(),
          getMediaProofs(),
          getBridgeHealth(),
          getBridgeFlow()
        ]);

        if (overviewData.success) setOverview(overviewData.data);
        if (nodesData.success) setNodes(nodesData.data);
        if (threatsData.success) setThreats(threatsData.data);
        if (proofsData.success) setProofs(proofsData.data);
        if (healthData.success) setBridgeHealth(healthData.data);
        if (flowData.success) setBridgeFlow(flowData.data);

        setLastUpdate(new Date());
        logAuditEvent('Dashboard data refreshed', { timestamp: new Date().toISOString() });
      } catch (error) {
        console.error('Failed to update data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    updateData();

    // Set up interval for real-time updates
    const interval = setInterval(updateData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleExport = async (type: 'overview' | 'security' | 'media' | 'bridge', format: 'csv' | 'json' | 'txt') => {
    try {
      let data;
      let title;
      
      switch (type) {
        case 'overview':
          data = [overview];
          title = 'Audit Overview';
          break;
        case 'security':
          data = [...nodes, ...threats];
          title = 'Security Data';
          break;
        case 'media':
          data = proofs;
          title = 'Media Proofs';
          break;
        case 'bridge':
          data = [...Object.entries(bridgeHealth).map(([key, value]) => ({ service: key, ...value })), ...bridgeFlow];
          title = 'Bridge Data';
          break;
      }

      const filename = `audit-${type}-${new Date().toISOString().split('T')[0]}`;

      switch (format) {
        case 'csv':
          exportToCSV(data, filename);
          break;
        case 'json':
          exportToJSON({
            timestamp: new Date().toISOString(),
            type,
            data,
            metadata: {
              totalRecords: data.length,
              exportedBy: 'Audit Dashboard',
              systemInfo: {
                networkHealth: overview.networkHealth,
                uptime: 99.9,
                lastSync: overview.lastSync
              }
            }
          }, filename);
          break;
        case 'txt':
          exportToTXT(data, filename, title);
          break;
      }

      logAuditEvent('Data exported', { type, format, recordCount: data.length });
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="neon-dark min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="neon-heading text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AUDIT DASHBOARD
          </h1>
          <p className="neon-subheading mt-2">Blockchain Verification & Security Monitor</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-blue-400 animate-pulse' : 'bg-green-400'}`} />
            <span className="text-sm text-gray-300">
              {loading ? 'Updating...' : 'Live'}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="neon-button border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="neon-grid neon-grid-4 mb-8">
        <StatCard
          title="Total Scans"
          value={overview.totalScans.toLocaleString()}
          icon={Activity}
          trend="↑ 12% last 24h"
          className="neon-card neon-glow-blue"
        />
        <StatCard
          title="Verified Winners"
          value={overview.uniqueWinners.toLocaleString()}
          icon={CheckCircle}
          trend="↑ 8% last 24h"
          className="neon-card neon-glow-green"
        />
        <StatCard
          title="Released Amount"
          value={`€${overview.releasedAmount.toLocaleString()}`}
          icon={TrendingUp}
          trend="↑ 15% last 24h"
          className="neon-card neon-glow-purple"
        />
        <StatCard
          title="Network Health"
          value={`${overview.networkHealth}/10`}
          icon={Shield}
          trend="↑ 2% last 24h"
          className="neon-card neon-glow-orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="neon-grid neon-grid-2 gap-6 mb-8">
        {/* Node Health Map */}
        <NodeMap 
          nodes={nodes} 
          className="neon-card neon-glow-blue"
        />
        
        {/* AI Sentinel */}
        <AiMonitor 
          threats={threats} 
          className="neon-card neon-glow-purple"
        />
      </div>

      {/* Secondary Content Grid */}
      <div className="neon-grid neon-grid-2 gap-6 mb-8">
        {/* Proof Gallery */}
        <ProofGrid 
          proofs={proofs} 
          className="neon-card neon-glow-green"
        />
        
        {/* Data Bridge Flow */}
        <FlowGraph 
          connections={bridgeFlow}
          health={bridgeHealth}
          className="neon-card neon-glow-orange"
        />
      </div>

      {/* Export Panel */}
      <Card className="neon-card neon-glow-blue">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="neon-heading">Export & Analytics</h3>
            <p className="neon-text">Download audit data in multiple formats</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            Last update: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['overview', 'security', 'media', 'bridge'] as const).map((type) => (
            <div key={type} className="space-y-2">
              <h4 className="text-sm font-semibold text-white capitalize">{type} Data</h4>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExport(type, 'csv')}
                  className="text-xs px-2 py-1"
                >
                  CSV
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExport(type, 'json')}
                  className="text-xs px-2 py-1"
                >
                  JSON
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExport(type, 'txt')}
                  className="text-xs px-2 py-1"
                >
                  TXT
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>Audit Dashboard v2.0 | Blockchain Verification System</p>
        <p className="mt-1">
          Demo Mode: {process.env.NEXT_PUBLIC_AUDIT_MOCK === '1' ? 'Enabled' : 'Disabled'} | 
          Chain Explorer: <a href="https://demo.kardiverse.com/chain" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">demo.kardiverse.com/chain</a>
        </p>
      </div>
    </div>
  );
};

export default AuditDashboard;
