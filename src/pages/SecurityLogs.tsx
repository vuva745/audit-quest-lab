import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressRing } from "@/components/ProgressRing";
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, Download, Activity, Clock, MapPin, Server, Wifi, WifiOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export const SecurityLogs = () => {
  const { toast } = useToast();

  // Real-time security data
  const [securityData, setSecurityData] = useState({
    // Node Health Data
    nodes: [
      { id: 'vendor-zone', name: 'Vendor Zone', status: 'online', latency: 92, lastSeen: new Date().toISOString() },
      { id: 'airport-node', name: 'Airport Node', status: 'online', latency: 85, lastSeen: new Date().toISOString() },
      { id: 'university-node', name: 'University Node', status: 'warning', latency: 210, lastSeen: new Date().toISOString() },
      { id: 'bus-prime-node', name: 'Bus Prime Node', status: 'online', latency: 80, lastSeen: new Date().toISOString() },
      { id: 'backup-node', name: 'Backup Node', status: 'offline', latency: 0, lastSeen: new Date(Date.now() - 8 * 60 * 1000).toISOString() }
    ],
    
    // Security Metrics
    totalLogins: 1234,
    failedLogins: 12,
    systemAlerts: 3,
    dataBreaches: 0,
    unauthorizedAccess: 0,
    threatLevel: 75,
    
    // Blockchain Data
    currentBlock: 23879,
    integrityScore: 99.9,
    hashChecks: [
      { id: 23879, status: 'verified', timestamp: new Date().toISOString() },
      { id: 23878, status: 'verified', timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
      { id: 23877, status: 'verified', timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString() },
      { id: 23876, status: 'alert', timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString() }
    ],
    
    // Recent Logins
    recentLogins: [
      { time: new Date(Date.now() - 2 * 60 * 1000).toLocaleTimeString(), location: 'Amsterdam NL', ip: '192.168.1.100' },
      { time: new Date(Date.now() - 5 * 60 * 1000).toLocaleTimeString(), location: 'Utrecht NL', ip: '192.168.1.101' },
      { time: new Date(Date.now() - 8 * 60 * 1000).toLocaleTimeString(), location: 'Den Haag NL', ip: '192.168.1.102' }
    ],
    
    // Security Events Timeline
    securityEvents: [
      { time: new Date(Date.now() - 1 * 60 * 1000).toLocaleTimeString(), text: 'Integrity Alert detected', type: 'alert' },
      { time: new Date(Date.now() - 15 * 60 * 1000).toLocaleTimeString(), text: 'Daily hash check verified', type: 'success' },
      { time: new Date(Date.now() - 30 * 60 * 1000).toLocaleTimeString(), text: 'IP 45.17.251.34 logged in', type: 'info' },
      { time: new Date(Date.now() - 45 * 60 * 1000).toLocaleTimeString(), text: 'Failed login attempt (2)', type: 'warning' },
      { time: new Date(Date.now() - 60 * 60 * 1000).toLocaleTimeString(), text: 'Security rules updated', type: 'info' }
    ]
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityData(prev => {
        // Update node latencies realistically
        const updatedNodes = prev.nodes.map(node => {
          if (node.status === 'offline') return node;
          
          const baseLatency = node.name === 'University Node' ? 200 : node.name === 'Backup Node' ? 0 : 80;
          const variation = (Math.random() - 0.5) * 20;
          const newLatency = Math.max(50, baseLatency + variation);
          
          return {
            ...node,
            latency: Math.round(newLatency),
            lastSeen: new Date().toISOString()
          };
        });

        // Occasionally add new security events
        const shouldAddEvent = Math.random() < 0.3; // 30% chance
        let newEvents = [...prev.securityEvents];
        
        if (shouldAddEvent) {
          const eventTypes = [
            { text: 'New login detected', type: 'info' },
            { text: 'System performance check', type: 'success' },
            { text: 'Network latency spike detected', type: 'warning' },
            { text: 'Blockchain sync completed', type: 'success' },
            { text: 'Security scan initiated', type: 'info' }
          ];
          
          const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
          newEvents.unshift({
            time: new Date().toLocaleTimeString(),
            text: randomEvent.text,
            type: randomEvent.type
          });
          
          // Keep only last 10 events
          newEvents = newEvents.slice(0, 10);
        }

        // Update blockchain data
        const newBlock = prev.currentBlock + Math.floor(Math.random() * 2);
        const newHashChecks = [
          { id: newBlock, status: 'verified', timestamp: new Date().toISOString() },
          ...prev.hashChecks.slice(0, 3)
        ];

        // Update metrics
        const newTotalLogins = prev.totalLogins + Math.floor(Math.random() * 3);
        const newFailedLogins = prev.failedLogins + (Math.random() < 0.1 ? 1 : 0);
        const newSystemAlerts = prev.systemAlerts + (Math.random() < 0.05 ? 1 : 0);

        return {
          ...prev,
          nodes: updatedNodes,
          currentBlock: newBlock,
          hashChecks: newHashChecks,
          securityEvents: newEvents,
          totalLogins: newTotalLogins,
          failedLogins: newFailedLogins,
          systemAlerts: newSystemAlerts,
          integrityScore: Math.min(100, Math.max(99, prev.integrityScore + (Math.random() - 0.5) * 0.2)),
          threatLevel: Math.min(100, Math.max(0, prev.threatLevel + (Math.random() - 0.5) * 10))
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Button handlers
  const handleExportLogs = () => {
    toast({
      title: "Exporting Security Logs",
      description: "Generating comprehensive security log export...",
    });
    
    setTimeout(() => {
      const logData = `Security Logs Export
Generated: ${new Date().toLocaleString()}

Node Health Status:
${securityData.nodes.map(node => 
  `- ${node.name}: ${node.status === 'online' ? 'Online' : node.status === 'warning' ? 'Warning' : 'Offline'} (${node.latency}ms latency)`
).join('\n')}

Security Metrics:
- Authentication attempts: ${securityData.totalLogins.toLocaleString()}
- Failed logins: ${securityData.failedLogins}
- System alerts: ${securityData.systemAlerts}
- Data breaches: ${securityData.dataBreaches}
- Unauthorized access: ${securityData.unauthorizedAccess}
- Threat level: ${securityData.threatLevel}%

Blockchain Status:
- Current block: #${securityData.currentBlock}
- Integrity score: ${securityData.integrityScore}%
- Hash checks: ${securityData.hashChecks.length} recent checks

Recent Security Events:
${securityData.securityEvents.slice(0, 5).map(event => 
  `[${event.time}] ${event.text} (${event.type})`
).join('\n')}

Recent Logins:
${securityData.recentLogins.map(login => 
  `[${login.time}] ${login.location} (${login.ip})`
).join('\n')}

Recommendations:
- Monitor University Node for performance issues
- Investigate backup node offline status
- Review failed login attempts
- Current threat level: ${securityData.threatLevel}%`;

      const blob = new Blob([logData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `security-logs-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Security logs have been exported successfully",
      });
    }, 2000);
  };
  return (
    <div className="space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary text-neon">Audit Dashboard</h1>
          <p className="text-muted-foreground">Security & System Logs</p>
        </div>
        <Button variant="default" className="glow-sm" onClick={handleExportLogs}>
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5" />
            Node Health Map
          </h2>
          <div className="relative h-64 flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Dynamic node rendering based on real-time data */}
              {securityData.nodes.map((node, index) => {
                const positions = [
                  { x: 100, y: 150 }, // Vendor Zone
                  { x: 200, y: 80 },  // Airport Node
                  { x: 300, y: 100 }, // University Node
                  { x: 280, y: 200 }, // Bus Prime Node
                  { x: 150, y: 220 }  // Backup Node
                ];
                
                const pos = positions[index];
                const isOnline = node.status === 'online';
                const isWarning = node.status === 'warning';
                const isOffline = node.status === 'offline';
                
                const fillColor = isOnline ? 'fill-success' : isWarning ? 'fill-warning' : 'fill-muted-foreground opacity-50';
                const strokeColor = isOnline ? 'stroke-success' : isWarning ? 'stroke-warning' : 'stroke-muted-foreground';
                
                return (
                  <g key={node.id}>
                    <circle 
                      cx={pos.x} 
                      cy={pos.y} 
                      r="8" 
                      className={`${fillColor} ${isOnline ? 'animate-pulse' : ''}`}
                    />
                    <text x={pos.x} y={pos.y - 20} className="text-xs fill-foreground text-center" textAnchor="middle">
                      {node.name}
                    </text>
                    <text x={pos.x} y={pos.y + 30} className="text-xs fill-muted-foreground" textAnchor="middle">
                      {isOffline ? 'offline' : `${node.latency}ms`}
                    </text>
                    {isOnline && (
                      <circle 
                        cx={pos.x} 
                        cy={pos.y} 
                        r="12" 
                        className={`${strokeColor} fill-none animate-ping`}
                        strokeWidth="1"
                      />
                    )}
                  </g>
                );
              })}
              
              {/* Dynamic connections */}
              <line x1="100" y1="150" x2="200" y2="80" className="stroke-primary/50" strokeWidth="2" />
              <line x1="200" y1="80" x2="300" y2="100" className="stroke-warning/50" strokeWidth="2" />
              <line x1="200" y1="80" x2="280" y2="200" className="stroke-primary/50" strokeWidth="2" />
              <line x1="100" y1="150" x2="280" y2="200" className="stroke-success/50" strokeWidth="2" />
            </svg>
          </div>
          
          <Card className="mt-4 p-4 border-success/50 bg-success/10">
            <p className="text-sm font-semibold text-success">Vendor #<span className="text-neon-sm">{securityData.currentBlock}</span> Verified</p>
            <p className="text-xs text-muted-foreground">
              <span className="text-neon-sm">{new Date().toLocaleTimeString()}</span> UTC • Integrity <span className="text-neon-success">{securityData.integrityScore}%</span>
            </p>
          </Card>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Login Monitor
          </h2>
          <div className="space-y-2">
            {securityData.recentLogins.map((login, i) => (
              <div key={i} className="p-3 border border-primary/30 rounded bg-primary/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-primary font-mono text-neon-sm">{login.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{login.location}</span>
                  <span className="text-xs text-muted-foreground text-neon-sm">({login.ip})</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Blockchain Hash Check
          </h2>
          <div className="space-y-2">
            {securityData.hashChecks.map((item, i) => (
              <div key={i} className="p-3 border border-primary/30 rounded bg-primary/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-neon-sm">#{item.id}</span>
                  <span className="text-xs text-muted-foreground text-neon-sm">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <StatusBadge 
                  status={item.status} 
                  label={item.status === 'alert' ? 'Integrity Alert' : undefined} 
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="relative">
              <AlertTriangle className="w-8 h-8 text-warning animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-warning/20 blur-lg" />
            </div>
            AI Threat Monitor
          </h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="relative animate-pulse-glow">
              <ProgressRing progress={securityData.threatLevel} size={100} strokeWidth={10} color="stroke-warning" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-warning animate-pulse" />
              </div>
            </div>
            
            <div>
              <p className="text-xl font-bold text-foreground">Monitoring Mode</p>
              <p className="text-sm text-warning flex items-center gap-2">
                <Activity className="w-4 h-4 animate-pulse" />
                Threat Level: <span className="text-neon-warning">{securityData.threatLevel}%</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Total Logins: <span className="text-neon-sm">{securityData.totalLogins.toLocaleString()}</span> | 
                Failed: <span className="text-neon-danger">{securityData.failedLogins}</span> | 
                Alerts: <span className="text-neon-warning">{securityData.systemAlerts}</span>
              </p>
            </div>
          </div>

          <Card className="p-3 border-warning/50 bg-warning/10">
            <p className="text-sm text-foreground">
              [{new Date().toLocaleTimeString()}] AI detected latency spike in University Node – Auto-recovered ✓
            </p>
          </Card>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Security Timeline
          </h2>
          <div className="space-y-2">
            {securityData.securityEvents.map((event, i) => {
              const getEventIcon = (type: string) => {
                switch (type) {
                  case 'alert': return <AlertTriangle className="w-4 h-4 text-warning" />;
                  case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
                  case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />;
                  default: return <Activity className="w-4 h-4 text-primary" />;
                }
              };

              const getEventColor = (type: string) => {
                switch (type) {
                  case 'alert': return 'border-warning/50 bg-warning/10';
                  case 'success': return 'border-success/50 bg-success/10';
                  case 'warning': return 'border-warning/50 bg-warning/10';
                  default: return 'border-primary/30 bg-primary/5';
                }
              };

              return (
                <div key={i} className={`p-3 border rounded ${getEventColor(event.type)}`}>
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <span className="text-primary font-mono text-sm">[{event.time}]</span>
                    <span className="text-muted-foreground text-sm">{event.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};
