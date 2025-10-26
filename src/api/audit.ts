// API endpoints for Audit Dashboard
import { mockAuditData, generateMockThreat } from '../mocks/audit';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Overview API
export const getAuditOverview = async () => {
  await delay(500); // Simulate network delay
  
  console.groupCollapsed('Audit Event');
  console.log('[API] Fetching audit overview data');
  console.groupEnd();
  
  return {
    success: true,
    data: mockAuditData.overview,
    timestamp: new Date().toISOString()
  };
};

// Security API
export const getSecurityNodes = async () => {
  await delay(300);
  
  console.groupCollapsed('Audit Event');
  console.log('[API] Fetching security nodes data');
  console.groupEnd();
  
  return {
    success: true,
    data: mockAuditData.security.nodes,
    timestamp: new Date().toISOString()
  };
};

export const getSecurityThreats = async () => {
  await delay(400);
  
  // Simulate new threat detection
  const newThreat = generateMockThreat();
  const updatedThreats = [newThreat, ...mockAuditData.security.threats];
  
  console.groupCollapsed('Security Event');
  console.log('[API] New threat detected:', newThreat);
  console.groupEnd();
  
  return {
    success: true,
    data: updatedThreats,
    timestamp: new Date().toISOString()
  };
};

// Media API
export const getMediaProofs = async (campaign?: string) => {
  await delay(600);
  
  let proofs = mockAuditData.media.proofs;
  if (campaign) {
    proofs = proofs.filter(proof => 
      proof.campaign.toLowerCase().includes(campaign.toLowerCase())
    );
  }
  
  console.groupCollapsed('Audit Event');
  console.log('[API] Fetching media proofs:', { campaign, count: proofs.length });
  console.groupEnd();
  
  return {
    success: true,
    data: proofs,
    timestamp: new Date().toISOString()
  };
};

// Bridge API
export const getBridgeHealth = async () => {
  await delay(200);
  
  // Simulate real-time health updates
  const health = { ...mockAuditData.bridge.health };
  
  // Randomly update latencies
  Object.keys(health).forEach(key => {
    const service = health[key as keyof typeof health];
    service.latency = Math.max(20, Math.min(150, service.latency + (Math.random() - 0.5) * 20));
    service.lastSync = new Date().toLocaleTimeString();
  });
  
  console.groupCollapsed('Data Flow');
  console.log('[API] Bridge health updated:', health);
  console.groupEnd();
  
  return {
    success: true,
    data: health,
    timestamp: new Date().toISOString()
  };
};

export const getBridgeFlow = async () => {
  await delay(250);
  
  // Simulate connection status updates
  const flow = mockAuditData.bridge.flow.map(connection => ({
    ...connection,
    latency: Math.max(30, Math.min(120, connection.latency + (Math.random() - 0.5) * 15)),
    status: Math.random() > 0.1 ? 'active' : 'inactive' as 'active' | 'inactive'
  }));
  
  console.groupCollapsed('Data Flow');
  console.log('[API] Bridge flow updated:', flow);
  console.groupEnd();
  
  return {
    success: true,
    data: flow,
    timestamp: new Date().toISOString()
  };
};

// Chain verification API
export const verifyOnChain = async (hash: string) => {
  await delay(1000);
  
  const chainUrl = `${process.env.NEXT_PUBLIC_CHAIN_BASE_URL || 'https://demo.kardiverse.com/chain'}/${hash}`;
  
  console.groupCollapsed('Audit Event');
  console.log('[API] Verifying on chain:', { hash, chainUrl });
  console.groupEnd();
  
  return {
    success: true,
    data: {
      hash,
      verified: true,
      blockNumber: Math.floor(Math.random() * 1000000) + 1800000,
      timestamp: new Date().toISOString(),
      chainUrl
    },
    timestamp: new Date().toISOString()
  };
};

// Export API
export const exportAuditData = async (type: 'overview' | 'security' | 'media' | 'bridge', format: 'csv' | 'json' | 'txt') => {
  await delay(800);
  
  console.groupCollapsed('Audit Event');
  console.log('[API] Exporting audit data:', { type, format });
  console.groupEnd();
  
  let data;
  switch (type) {
    case 'overview':
      data = mockAuditData.overview;
      break;
    case 'security':
      data = mockAuditData.security;
      break;
    case 'media':
      data = mockAuditData.media;
      break;
    case 'bridge':
      data = mockAuditData.bridge;
      break;
    default:
      data = mockAuditData;
  }
  
  return {
    success: true,
    data: {
      type,
      format,
      data,
      exportedAt: new Date().toISOString(),
      filename: `audit-${type}-${new Date().toISOString().split('T')[0]}`
    },
    timestamp: new Date().toISOString()
  };
};

// Error handling wrapper
export const apiCall = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.groupCollapsed('Audit Event');
    console.error('[API] Error:', error);
    console.groupEnd();
    
    throw new Error(`API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
