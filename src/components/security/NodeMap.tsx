import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Server, Wifi, WifiOff, CheckCircle, XCircle, Clock, Hash } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'standby';
  latency: number;
  lastSync: string;
  connections: number;
  hash: string;
}

interface NodeMapProps {
  nodes: Node[];
  className?: string;
}

export const NodeMap: React.FC<NodeMapProps> = ({ nodes, className }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'standby': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'offline': return <XCircle className="w-4 h-4" />;
      case 'standby': return <Clock className="w-4 h-4" />;
      default: return <Server className="w-4 h-4" />;
    }
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-green-400';
    if (latency < 100) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className={`p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Node Health Map</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-blue-400 animate-pulse' : 'bg-green-400'}`} />
          <span className="text-sm text-gray-300">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedNode?.id === node.id
                ? 'border-blue-400 bg-blue-900/20 shadow-[0_0_12px_rgba(108,255,255,0.3)]'
                : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
            }`}
            onClick={() => setSelectedNode(node)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">{node.name}</span>
              </div>
              <div className={`flex items-center gap-1 ${getStatusColor(node.status)}`}>
                {getStatusIcon(node.status)}
                <span className="text-xs capitalize">{node.status}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Latency:</span>
                <span className={getLatencyColor(node.latency)}>{node.latency}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Connections:</span>
                <span className="text-white">{node.connections}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last Sync:</span>
                <span className="text-white">{node.lastSync}</span>
              </div>
            </div>

            {node.status === 'online' && (
              <div className="mt-3 flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">Connected</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedNode && (
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Node Details</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-2">Connection Info</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={getStatusColor(selectedNode.status)}>{selectedNode.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Latency:</span>
                  <span className={getLatencyColor(selectedNode.latency)}>{selectedNode.latency}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connections:</span>
                  <span className="text-white">{selectedNode.connections}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-2">Blockchain Info</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Sync:</span>
                  <span className="text-white">{selectedNode.lastSync}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400 font-mono break-all">
                    {selectedNode.hash}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>Total Nodes: {nodes.length}</span>
        <span>Online: {nodes.filter(n => n.status === 'online').length}</span>
      </div>
    </Card>
  );
};
