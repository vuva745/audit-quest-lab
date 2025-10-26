// Mock data for Audit Dashboard
export const mockAuditData = {
  overview: {
    totalScans: 1247,
    uniqueWinners: 89,
    releasedAmount: 125000,
    documentsVerified: 234,
    escrowStatus: 98.5,
    blockchainHeight: 1847292,
    integrityScore: 99.2,
    lastSync: new Date().toISOString(),
    networkHealth: 9.8
  },
  
  security: {
    nodes: [
      { id: 'node-1', name: 'NeoCard™ Main', status: 'online', latency: 45, lastSync: '14:45:23', connections: 12, hash: '0x1a2b3c4d5e6f7890' },
      { id: 'node-2', name: 'Blockchain Node', status: 'online', latency: 67, lastSync: '14:45:20', connections: 8, hash: '0x2b3c4d5e6f7890ab' },
      { id: 'node-3', name: 'CRM Hub', status: 'online', latency: 89, lastSync: '14:45:18', connections: 15, hash: '0x3c4d5e6f7890abcd' },
      { id: 'node-4', name: 'AI Sentinel', status: 'online', latency: 34, lastSync: '14:45:25', connections: 6, hash: '0x4d5e6f7890abcdef' },
      { id: 'node-5', name: 'Backup Node', status: 'standby', latency: 0, lastSync: '14:30:00', connections: 0, hash: '0x5e6f7890abcdef12' }
    ],
    threats: [
      { id: 'threat-1', type: 'suspicious_activity', severity: 'low', detected: '14:42:15', resolved: true, autoRecovery: true },
      { id: 'threat-2', type: 'unusual_pattern', severity: 'medium', detected: '14:38:22', resolved: true, autoRecovery: true },
      { id: 'threat-3', type: 'potential_breach', severity: 'high', detected: '14:35:10', resolved: true, autoRecovery: false }
    ]
  },
  
  media: {
    proofs: [
      {
        id: 'proof-1',
        campaign: 'Summer Campaign 2024',
        sponsor: 'TechCorp',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&q=80',
        verified: true,
        timestamp: '2024-10-25T14:30:00Z',
        metadata: { device: 'iPhone 14', location: 'Nairobi, Kenya', hash: '0xabc123def456' }
      },
      {
        id: 'proof-2',
        campaign: 'Winter Promotion',
        sponsor: 'RetailChain',
        type: 'video',
        url: 'https://videos.pexels.com/video-files/1234567/mp4',
        verified: true,
        timestamp: '2024-10-25T14:25:00Z',
        metadata: { device: 'Samsung Galaxy', location: 'Mombasa, Kenya', hash: '0xdef456ghi789' }
      },
      {
        id: 'proof-3',
        campaign: 'Spring Launch',
        sponsor: 'FashionBrand',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&q=80',
        verified: false,
        timestamp: '2024-10-25T14:20:00Z',
        metadata: { device: 'iPad Pro', location: 'Kisumu, Kenya', hash: '0xghi789jkl012' }
      }
    ]
  },
  
  bridge: {
    health: {
      neoCard: { status: 'connected', latency: 45, lastSync: '14:45:23' },
      cloud: { status: 'connected', latency: 67, lastSync: '14:45:20' },
      blockchain: { status: 'connected', latency: 89, lastSync: '14:45:18' },
      crm: { status: 'connected', latency: 34, lastSync: '14:45:25' }
    },
    flow: [
      { from: 'NeoCard', to: 'Cloud', status: 'active', latency: 45 },
      { from: 'Cloud', to: 'Blockchain', status: 'active', latency: 67 },
      { from: 'Blockchain', to: 'CRM', status: 'active', latency: 89 },
      { from: 'CRM', to: 'NeoCard', status: 'active', latency: 34 }
    ]
  }
};

export const generateMockThreat = () => {
  const types = ['suspicious_activity', 'unusual_pattern', 'potential_breach', 'anomaly_detected'];
  const severities = ['low', 'medium', 'high'];
  const now = new Date();
  
  return {
    id: `threat-${Date.now()}`,
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    detected: now.toLocaleTimeString(),
    resolved: Math.random() > 0.3,
    autoRecovery: Math.random() > 0.5
  };
};
