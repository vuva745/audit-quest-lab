import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Cloud, Link, Users, Activity, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Connection {
  from: string;
  to: string;
  status: 'active' | 'inactive' | 'error';
  latency: number;
}

interface HealthStatus {
  neoCard: { status: string; latency: number; lastSync: string };
  cloud: { status: string; latency: number; lastSync: string };
  blockchain: { status: string; latency: number; lastSync: string };
  crm: { status: string; latency: number; lastSync: string };
}

interface FlowGraphProps {
  connections: Connection[];
  health: HealthStatus;
  className?: string;
}

export const FlowGraph: React.FC<FlowGraphProps> = ({ connections, health, className }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-gray-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <Clock className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-green-400';
    if (latency < 100) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'neocard': return <Database className="w-6 h-6" />;
      case 'cloud': return <Cloud className="w-6 h-6" />;
      case 'blockchain': return <Link className="w-6 h-6" />;
      case 'crm': return <Users className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service.toLowerCase()) {
      case 'neocard': return 'text-blue-400';
      case 'cloud': return 'text-cyan-400';
      case 'blockchain': return 'text-green-400';
      case 'crm': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className={`p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Data Bridge Flow</h3>
          <p className="text-sm text-gray-400">NeoCard → Cloud → Blockchain → CRM integration</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-blue-400 animate-pulse' : 'bg-green-400'}`} />
          <span className="text-sm text-gray-300">Live</span>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {/* NeoCard */}
          <div className="flex flex-col items-center">
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              health.neoCard.status === 'connected' 
                ? 'border-blue-400 bg-blue-900/20 shadow-[0_0_12px_rgba(59,130,246,0.3)]' 
                : 'border-gray-600 bg-gray-800/50'
            }`}>
              <Database className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-sm text-white mt-2 font-medium">NeoCard™</span>
            <div className="text-xs text-gray-400">{health.neoCard.latency}ms</div>
          </div>

          {/* Arrow 1 */}
          <div className="flex-1 flex items-center justify-center">
            <div className={`w-full h-0.5 transition-all duration-300 ${
              connections.find(c => c.from === 'NeoCard' && c.to === 'Cloud')?.status === 'active'
                ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                : 'bg-gray-600'
            }`} />
            <div className={`w-2 h-2 rounded-full mx-2 transition-all duration-300 ${
              connections.find(c => c.from === 'NeoCard' && c.to === 'Cloud')?.status === 'active'
                ? 'bg-cyan-400 animate-pulse'
                : 'bg-gray-600'
            }`} />
          </div>

          {/* Cloud */}
          <div className="flex flex-col items-center">
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              health.cloud.status === 'connected' 
                ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_12px_rgba(102,204,255,0.3)]' 
                : 'border-gray-600 bg-gray-800/50'
            }`}>
              <Cloud className="w-8 h-8 text-cyan-400" />
            </div>
            <span className="text-sm text-white mt-2 font-medium">Cloud</span>
            <div className="text-xs text-gray-400">{health.cloud.latency}ms</div>
          </div>

          {/* Arrow 2 */}
          <div className="flex-1 flex items-center justify-center">
            <div className={`w-full h-0.5 transition-all duration-300 ${
              connections.find(c => c.from === 'Cloud' && c.to === 'Blockchain')?.status === 'active'
                ? 'bg-gradient-to-r from-cyan-400 to-green-400'
                : 'bg-gray-600'
            }`} />
            <div className={`w-2 h-2 rounded-full mx-2 transition-all duration-300 ${
              connections.find(c => c.from === 'Cloud' && c.to === 'Blockchain')?.status === 'active'
                ? 'bg-green-400 animate-pulse'
                : 'bg-gray-600'
            }`} />
          </div>

          {/* Blockchain */}
          <div className="flex flex-col items-center">
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              health.blockchain.status === 'connected' 
                ? 'border-green-400 bg-green-900/20 shadow-[0_0_12px_rgba(34,197,94,0.3)]' 
                : 'border-gray-600 bg-gray-800/50'
            }`}>
              <Link className="w-8 h-8 text-green-400" />
            </div>
            <span className="text-sm text-white mt-2 font-medium">Blockchain</span>
            <div className="text-xs text-gray-400">{health.blockchain.latency}ms</div>
          </div>

          {/* Arrow 3 */}
          <div className="flex-1 flex items-center justify-center">
            <div className={`w-full h-0.5 transition-all duration-300 ${
              connections.find(c => c.from === 'Blockchain' && c.to === 'CRM')?.status === 'active'
                ? 'bg-gradient-to-r from-green-400 to-orange-400'
                : 'bg-gray-600'
            }`} />
            <div className={`w-2 h-2 rounded-full mx-2 transition-all duration-300 ${
              connections.find(c => c.from === 'Blockchain' && c.to === 'CRM')?.status === 'active'
                ? 'bg-orange-400 animate-pulse'
                : 'bg-gray-600'
            }`} />
          </div>

          {/* CRM */}
          <div className="flex flex-col items-center">
            <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              health.crm.status === 'connected' 
                ? 'border-orange-400 bg-orange-900/20 shadow-[0_0_12px_rgba(249,115,22,0.3)]' 
                : 'border-gray-600 bg-gray-800/50'
            }`}>
              <Users className="w-8 h-8 text-orange-400" />
            </div>
            <span className="text-sm text-white mt-2 font-medium">CRM</span>
            <div className="text-xs text-gray-400">{health.crm.latency}ms</div>
          </div>
        </div>
      </div>

      {/* Connection Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Connection Status</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((connection, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedConnection === connection
                  ? 'border-blue-400 bg-blue-900/20 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
              }`}
              onClick={() => setSelectedConnection(connection)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {getServiceIcon(connection.from)}
                    <span className="text-sm text-gray-400">→</span>
                    {getServiceIcon(connection.to)}
                  </div>
                  <span className="text-white font-medium">
                    {connection.from} → {connection.to}
                  </span>
                </div>
                <div className={`flex items-center gap-1 ${getStatusColor(connection.status)}`}>
                  {getStatusIcon(connection.status)}
                  <span className="text-xs capitalize">{connection.status}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Latency:</span>
                <span className={getLatencyColor(connection.latency)}>
                  {connection.latency}ms
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Summary */}
      <div className="mt-6 pt-4 border-t border-slate-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(health).map(([service, status]) => (
            <div key={service} className="text-center">
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                status.status === 'connected' 
                  ? 'bg-green-900/20 text-green-400 border border-green-500/50'
                  : 'bg-red-900/20 text-red-400 border border-red-500/50'
              }`}>
                {getStatusIcon(status.status)}
                <span className="capitalize">{service}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {status.latency}ms
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button variant="outline" size="sm">
            View Logs
          </Button>
        </div>
        
        <div className="text-xs text-gray-400">
          Last update: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </Card>
  );
};
