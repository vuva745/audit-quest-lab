import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Shield, AlertTriangle, CheckCircle, Zap, Eye, EyeOff } from 'lucide-react';

interface Threat {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  detected: string;
  resolved: boolean;
  autoRecovery: boolean;
}

interface AiMonitorProps {
  threats: Threat[];
  className?: string;
}

export const AiMonitor: React.FC<AiMonitorProps> = ({ threats, className }) => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [currentThreat, setCurrentThreat] = useState<Threat | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new threat detection every 2 minutes
      const newThreat = {
        id: `threat-${Date.now()}`,
        type: 'anomaly_detected',
        severity: 'medium' as const,
        detected: new Date().toLocaleTimeString(),
        resolved: false,
        autoRecovery: true
      };
      
      console.groupCollapsed('Audit Event');
      console.log('New threat detected:', newThreat);
      console.groupEnd();
      
      setCurrentThreat(newThreat);
      
      // Auto-resolve after 5 seconds
      setTimeout(() => {
        setCurrentThreat(null);
      }, 5000);
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400 bg-green-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'high': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Shield className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const recentThreats = threats.slice(0, 5);
  const activeThreats = threats.filter(t => !t.resolved);
  const autoRecovered = threats.filter(t => t.autoRecovery && t.resolved);

  return (
    <Card className={`p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-900/20">
            <Brain className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">AI Sentinel</h3>
            <p className="text-sm text-gray-400">Threat Detection & Auto-Recovery</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-sm text-gray-300">
            {isMonitoring ? 'Monitoring' : 'Paused'}
          </span>
        </div>
      </div>

      {/* Current Threat Alert */}
      {currentThreat && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div>
              <h4 className="text-red-400 font-semibold">New Threat Detected</h4>
              <p className="text-sm text-gray-300">
                {currentThreat.type.replace('_', ' ')} - {currentThreat.severity} severity
              </p>
            </div>
            <Badge className="bg-red-900/50 text-red-400 border-red-500/50">
              Auto-Recovery Active
            </Badge>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Total Threats</span>
          </div>
          <div className="text-2xl font-bold text-white">{threats.length}</div>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">Active</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{activeThreats.length}</div>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Auto-Recovered</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{autoRecovered.length}</div>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {threats.length > 0 ? Math.round((autoRecovered.length / threats.length) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Recent Threats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-white">Recent Threats</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-400 hover:text-white"
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
        </div>

        <div className="space-y-2">
          {recentThreats.map((threat) => (
            <div
              key={threat.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                threat.resolved
                  ? 'border-green-500/30 bg-green-900/10'
                  : 'border-red-500/30 bg-red-900/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(threat.severity)}
                  <div>
                    <div className="text-white font-medium">
                      {threat.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="text-sm text-gray-400">
                      Detected: {threat.detected}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(threat.severity)}>
                    {threat.severity}
                  </Badge>
                  {threat.autoRecovery && (
                    <Badge className="bg-blue-900/20 text-blue-400 border-blue-500/50">
                      Auto-Recovery
                    </Badge>
                  )}
                  {threat.resolved && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
              
              {showDetails && (
                <div className="mt-3 pt-3 border-t border-slate-600">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className={`ml-2 ${threat.resolved ? 'text-green-400' : 'text-red-400'}`}>
                        {threat.resolved ? 'Resolved' : 'Active'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Recovery:</span>
                      <span className={`ml-2 ${threat.autoRecovery ? 'text-blue-400' : 'text-gray-400'}`}>
                        {threat.autoRecovery ? 'Automatic' : 'Manual'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-6 pt-4 border-t border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant={isMonitoring ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsMonitoring(!isMonitoring)}
            >
              {isMonitoring ? 'Pause Monitoring' : 'Resume Monitoring'}
            </Button>
            <Button variant="outline" size="sm">
              View All Threats
            </Button>
          </div>
          
          <div className="text-xs text-gray-400">
            Last scan: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </Card>
  );
};
