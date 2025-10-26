import { useState, useEffect, useCallback } from 'react';

// Types for real-time data
export interface Winner {
  id: string;
  uid: string;
  prize: string;
  status: 'claimed' | 'pending' | 'rejected' | 'processing';
  timestamp: string;
  proofUrl?: string;
  payoutAmount?: number;
  location?: string;
}

export interface OverviewStats {
  registeredScans: number;
  uniqueWinners: number;
  releasedAmount: number;
  documentsVerified: number;
  escrowStatus: number;
  notaryCertificates: number;
  lastUpdated: string;
}

export interface LiveActivity {
  id: string;
  type: 'scan' | 'winner' | 'payout' | 'verification';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

// Real-time data service
class RealtimeDataService {
  private listeners: Set<() => void> = new Set();
  private winners: Winner[] = [];
  private stats: OverviewStats = {
    registeredScans: 4981224,
    uniqueWinners: 8142,
    releasedAmount: 1284000,
    documentsVerified: 27,
    escrowStatus: 78,
    notaryCertificates: 5.000,
    lastUpdated: new Date().toISOString()
  };
  private activities: LiveActivity[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeData();
    this.startRealTimeUpdates();
  }

  private initializeData() {
    // Initialize with sample data
    this.winners = [
      { id: "#2438", uid: "A12-09", prize: "M-Pesa €100", status: "claimed", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), payoutAmount: 100, location: "Nairobi" },
      { id: "#2376", uid: "B7-33", prize: "Pizza Voucher", status: "claimed", timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), payoutAmount: 25, location: "Dubai" },
      { id: "#2299", uid: "C4-88", prize: "iPhone 15 Pro", status: "processing", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), payoutAmount: 1200, location: "Amsterdam" },
      { id: "#2267", uid: "Z9-01", prize: "NeoCard NFT", status: "rejected", timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), payoutAmount: 0, location: "Nairobi" }
    ];

    this.activities = [
      { id: "1", type: "scan", message: "New scan registered: #2438", timestamp: new Date(Date.now() - 1000 * 30).toISOString(), status: "success" },
      { id: "2", type: "winner", message: "Winner verified: A12-09", timestamp: new Date(Date.now() - 1000 * 60).toISOString(), status: "success" },
      { id: "3", type: "payout", message: "Payout processed: €100", timestamp: new Date(Date.now() - 1000 * 90).toISOString(), status: "success" },
      { id: "4", type: "verification", message: "Document verification completed", timestamp: new Date(Date.now() - 1000 * 120).toISOString(), status: "success" }
    ];
  }

  private startRealTimeUpdates() {
    this.intervalId = setInterval(() => {
      this.updateStats();
      this.addRandomActivity();
      this.updateWinners();
      this.notifyListeners();
    }, 3000); // Update every 3 seconds
  }

  private updateStats() {
    // Simulate real-time stat changes
    const changes = {
      registeredScans: Math.floor(Math.random() * 10) + 1,
      uniqueWinners: Math.random() > 0.7 ? 1 : 0,
      releasedAmount: Math.random() > 0.8 ? Math.floor(Math.random() * 100) + 10 : 0,
      documentsVerified: Math.random() > 0.9 ? 1 : 0,
      escrowStatus: Math.random() > 0.5 ? (Math.random() > 0.5 ? 1 : -1) : 0,
      notaryCertificates: Math.random() > 0.95 ? 0.001 : 0
    };

    this.stats = {
      registeredScans: this.stats.registeredScans + changes.registeredScans,
      uniqueWinners: this.stats.uniqueWinners + changes.uniqueWinners,
      releasedAmount: this.stats.releasedAmount + changes.releasedAmount,
      documentsVerified: this.stats.documentsVerified + changes.documentsVerified,
      escrowStatus: Math.max(0, Math.min(100, this.stats.escrowStatus + changes.escrowStatus)),
      notaryCertificates: parseFloat((this.stats.notaryCertificates + changes.notaryCertificates).toFixed(3)),
      lastUpdated: new Date().toISOString()
    };
  }

  private addRandomActivity() {
    const activityTypes: LiveActivity['type'][] = ['scan', 'winner', 'payout', 'verification'];
    const statuses: LiveActivity['status'][] = ['success', 'warning', 'error'];
    
    const messages = {
      scan: ['New scan registered', 'QR code scanned', 'Card activated'],
      winner: ['Winner verified', 'Prize claimed', 'Winner processed'],
      payout: ['Payout processed', 'Payment sent', 'Escrow released'],
      verification: ['Document verified', 'Identity confirmed', 'Proof validated']
    };

    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const message = messages[type][Math.floor(Math.random() * messages[type].length)];

    const newActivity: LiveActivity = {
      id: Date.now().toString(),
      type,
      message: `${message}: #${Math.floor(Math.random() * 9999)}`,
      timestamp: new Date().toISOString(),
      status
    };

    this.activities.unshift(newActivity);
    if (this.activities.length > 50) {
      this.activities = this.activities.slice(0, 50);
    }
  }

  private updateWinners() {
    // Occasionally update winner statuses
    if (Math.random() > 0.7) {
      const pendingWinners = this.winners.filter(w => w.status === 'pending' || w.status === 'processing');
      if (pendingWinners.length > 0) {
        const winner = pendingWinners[Math.floor(Math.random() * pendingWinners.length)];
        const newStatuses: Winner['status'][] = ['claimed', 'rejected'];
        winner.status = newStatuses[Math.floor(Math.random() * newStatuses.length)];
        winner.timestamp = new Date().toISOString();
      }
    }

    // Occasionally add new winners
    if (Math.random() > 0.8) {
      const newWinner: Winner = {
        id: `#${Math.floor(Math.random() * 9999)}`,
        uid: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 99)}`,
        prize: ['M-Pesa €50', 'Pizza Voucher', 'iPhone 15 Pro', 'NeoCard NFT', 'Gift Card'][Math.floor(Math.random() * 5)],
        status: 'processing',
        timestamp: new Date().toISOString(),
        payoutAmount: Math.floor(Math.random() * 1000) + 10,
        location: ['Nairobi', 'Dubai', 'Amsterdam', 'London', 'Paris'][Math.floor(Math.random() * 5)]
      };
      this.winners.unshift(newWinner);
      if (this.winners.length > 100) {
        this.winners = this.winners.slice(0, 100);
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getWinners(): Winner[] {
    return [...this.winners];
  }

  getStats(): OverviewStats {
    return { ...this.stats };
  }

  getStatsForPeriod(period: string): OverviewStats {
    const baseStats = this.getStats();
    const multipliers = {
      "Today": { scans: 0.1, winners: 0.05, amount: 0.08, docs: 0.1, escrow: 0.3, notary: 0.2 },
      "This Week": { scans: 0.3, winners: 0.2, amount: 0.25, docs: 0.4, escrow: 0.6, notary: 0.5 },
      "This Month": { scans: 0.7, winners: 0.5, amount: 0.6, docs: 0.8, escrow: 0.8, notary: 0.7 },
      "This Year": { scans: 1, winners: 1, amount: 1, docs: 1, escrow: 1, notary: 1 },
      "All Time": { scans: 1.2, winners: 1.1, amount: 1.1, docs: 1.1, escrow: 1, notary: 1 }
    };

    const mult = multipliers[period as keyof typeof multipliers] || multipliers["This Week"];
    
    return {
      registeredScans: Math.floor(baseStats.registeredScans * mult.scans),
      uniqueWinners: Math.floor(baseStats.uniqueWinners * mult.winners),
      releasedAmount: Math.floor(baseStats.releasedAmount * mult.amount),
      documentsVerified: Math.floor(baseStats.documentsVerified * mult.docs),
      escrowStatus: Math.floor(baseStats.escrowStatus * mult.escrow),
      notaryCertificates: parseFloat((baseStats.notaryCertificates * mult.notary).toFixed(3)),
      lastUpdated: baseStats.lastUpdated
    };
  }

  getActivities(): LiveActivity[] {
    return [...this.activities];
  }

  getActivitiesForPeriod(period: string): LiveActivity[] {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (period) {
      case "Today":
        cutoffDate.setHours(0, 0, 0, 0);
        break;
      case "This Week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "This Month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "This Year":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      case "All Time":
        cutoffDate.setFullYear(2020);
        break;
      default:
        cutoffDate.setDate(now.getDate() - 7);
    }
    
    return this.activities.filter(activity => 
      new Date(activity.timestamp) >= cutoffDate
    );
  }

  updateWinnerStatus(winnerId: string, status: Winner['status']) {
    const winner = this.winners.find(w => w.id === winnerId);
    if (winner) {
      winner.status = status;
      winner.timestamp = new Date().toISOString();
      this.notifyListeners();
    }
  }

  refresh() {
    // Force immediate data updates
    this.updateStats();
    this.addRandomActivity();
    this.updateWinners();
    this.notifyListeners();
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.listeners.clear();
  }
}

// Singleton instance
const realtimeService = new RealtimeDataService();

// Custom hooks
export const useRealtimeWinners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe(() => {
      setWinners(realtimeService.getWinners());
      setLoading(false);
    });

    // Initial load
    setWinners(realtimeService.getWinners());
    setLoading(false);

    return unsubscribe;
  }, []);

  const updateWinnerStatus = useCallback((winnerId: string, status: Winner['status']) => {
    realtimeService.updateWinnerStatus(winnerId, status);
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    realtimeService.refresh();
  }, []);

  return { winners, loading, updateWinnerStatus, refresh };
};

export const useRealtimeStats = (timePeriod?: string) => {
  const [stats, setStats] = useState<OverviewStats>(() => 
    timePeriod ? realtimeService.getStatsForPeriod(timePeriod) : realtimeService.getStats()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe(() => {
      const newStats = timePeriod ? realtimeService.getStatsForPeriod(timePeriod) : realtimeService.getStats();
      setStats(newStats);
      setLoading(false);
    });

    // Initial load
    const initialStats = timePeriod ? realtimeService.getStatsForPeriod(timePeriod) : realtimeService.getStats();
    setStats(initialStats);
    setLoading(false);

    return unsubscribe;
  }, [timePeriod]);

  const refresh = useCallback(() => {
    setLoading(true);
    realtimeService.refresh();
  }, []);

  return { stats, loading, refresh };
};

export const useRealtimeActivities = (timePeriod?: string) => {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe(() => {
      const newActivities = timePeriod ? realtimeService.getActivitiesForPeriod(timePeriod) : realtimeService.getActivities();
      setActivities(newActivities);
      setLoading(false);
    });

    // Initial load
    const initialActivities = timePeriod ? realtimeService.getActivitiesForPeriod(timePeriod) : realtimeService.getActivities();
    setActivities(initialActivities);
    setLoading(false);

    return unsubscribe;
  }, [timePeriod]);

  const refresh = useCallback(() => {
    setLoading(true);
    realtimeService.refresh();
  }, []);

  return { activities, loading, refresh };
};

export default realtimeService;
