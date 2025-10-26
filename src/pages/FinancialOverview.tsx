import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { LineChart } from "@/components/LineChart";
import { useToast } from "@/hooks/use-toast";
import { 
  Euro, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Download, 
  RefreshCw, 
  Filter, 
  Calendar, 
  FileText, 
  ExternalLink, 
  CheckCircle, 
  BarChart3, 
  PieChart, 
  Loader2, 
  X, 
  Search, 
  Building, 
  Users, 
  Clock,
  Link,
  Zap,
  Shield,
  Award
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

export const FinancialOverview = () => {
  const { toast } = useToast();

  // Dialog states
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const [showSponsorDialog, setShowSponsorDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  // Loading states
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState('');
  
  // Results states
  const [syncResults, setSyncResults] = useState<any>(null);
  const [exportResults, setExportResults] = useState<any>(null);
  const [reportResults, setReportResults] = useState<any>(null);

  // Real-time financial data matching mockup
  const [financialData, setFinancialData] = useState({
    // Core Financial Metrics (matching mockup exactly)
    totalIncome: 98.4,
    verifiedPayouts: 42.1,
    escrowBalance: 9.7,
    roi: 178,
    
    // Transaction Metrics
    totalTransactions: 1243,
    verifiedTransactions: 1241,
    pendingAudit: 2,
    
    // Blockchain Metrics
    blockchainHeight: 25379,
    integrityScore: 100,
    
    // Expense Breakdown (in millions) - matching mockup percentages
    staffCrewCosts: 22.6, // 23% of total
    operationsFleetCosts: 19.7, // 20% of total  
    mediaAdsCosts: 18.7, // 19% of total
    techMaintenanceCosts: 24.6, // 25% of total
    
    // Growth Metrics
    payoutGrowth: 18.3,
    
    // Compliance Metrics
    auditScore: 98.5,
    complianceRate: 100,
    riskLevel: 'LOW'
  });

  // Chart data for Financial Flow Graph
  const [chartData, setChartData] = useState({
    incomeData: [72.3, 75.8, 78.2, 81.5, 84.7, 87.2, 89.6, 92.1, 94.8, 96.3, 97.8, 98.4],
    payoutData: [31.2, 33.8, 35.4, 37.1, 38.9, 40.2, 41.6, 42.8, 43.5, 44.1, 44.7, 42.1],
    labels: ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP']
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFinancialData(prev => ({
        ...prev,
        totalIncome: Math.max(95, Math.min(105, prev.totalIncome + (Math.random() - 0.5) * 0.8)),
        verifiedPayouts: Math.max(40, Math.min(45, prev.verifiedPayouts + (Math.random() - 0.5) * 0.6)),
        escrowBalance: Math.max(8, Math.min(12, prev.escrowBalance + (Math.random() - 0.5) * 0.4)),
        blockchainHeight: prev.blockchainHeight + Math.floor(Math.random() * 3) + 1,
        integrityScore: Math.min(100, Math.max(98, prev.integrityScore + (Math.random() - 0.5) * 0.5))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Button handlers
  const handleSyncEscrowNotary = () => {
    setShowSyncDialog(true);
  };

  const handleExportLedgerCSV = () => {
    setShowExportDialog(true);
  };

  const handleFilter = () => {
    setShowFilterDialog(true);
  };

  const handleDateFilter = () => {
    setShowDateDialog(true);
  };

  const handleCampaignFilter = () => {
    setShowCampaignDialog(true);
  };

  const handleSponsorFilter = () => {
    setShowSponsorDialog(true);
  };

  const handleGenerateReport = () => {
    setShowReportDialog(true);
  };

  const executeSync = () => {
    setIsSyncing(true);
    
    setTimeout(() => {
      setIsSyncing(false);
      setSyncResults({
        success: true,
        syncedTransactions: 1241,
        newBlockHeight: financialData.blockchainHeight + 50,
        timestamp: new Date().toLocaleString()
      });
      setShowSyncDialog(false);
      
      toast({
        title: "Sync Complete",
        description: "Successfully synced with Escrow & Notary systems",
      });
    }, 3000);
  };

  const executeExport = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      setIsExporting(false);
      setExportResults({
        success: true,
        filename: `ledger-export-${new Date().toISOString().split('T')[0]}.csv`,
        records: financialData.totalTransactions,
        timestamp: new Date().toLocaleString()
      });
      setShowExportDialog(false);
      
      toast({
        title: "Export Complete",
        description: "Ledger CSV exported successfully",
      });
    }, 2000);
  };

  const executeReportGeneration = () => {
    setIsGeneratingReport(true);
    
    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportResults({
        success: true,
        reportType: "Financial Report (PDF)",
        pages: 24,
        timestamp: new Date().toLocaleString()
      });
      setShowReportDialog(false);
      
      toast({
        title: "Report Generated",
        description: "Financial Report (PDF) generated successfully",
      });
    }, 4000);
  };

  // View Ledger on Chain Handler
  const handleViewLedgerOnChain = () => {
    const blockHeight = financialData.blockchainHeight;
    const integrityScore = financialData.integrityScore;
    const totalTransactions = financialData.totalTransactions;
    
    toast({
      title: "Opening Blockchain Explorer",
      description: `Block #${blockHeight.toLocaleString()} | ${integrityScore}% Integrity | ${totalTransactions.toLocaleString()} transactions`,
    });
    
    // Open blockchain explorer in new tab (demo link)
    setTimeout(() => {
      window.open(`https://demo.kardiverse.com/chain/block/${blockHeight}`, '_blank');
    }, 1000);
  };

  // Download Audit Ledger PDF Handler (already exists as handleExportLedgerCSV)
  const handleDownloadAuditLedgerPDF = async () => {
    setIsExporting(true);
    
    try {
      // Generate comprehensive PDF content
      const pdfContent = {
        header: "Financial Audit Ledger",
        timestamp: new Date().toLocaleString(),
        blockchain: {
          blockHeight: financialData.blockchainHeight,
          integrity: financialData.integrityScore,
          hashAnchor: `Block #${financialData.blockchainHeight}`
        },
        summary: {
          totalIncome: `€${financialData.totalIncome.toFixed(1)}M`,
          verifiedPayouts: `€${financialData.verifiedPayouts.toFixed(1)}M`,
          escrowBalance: `€${financialData.escrowBalance.toFixed(1)}M`,
          roi: `+${financialData.roi.toFixed(1)}%`
        },
        transactions: {
          total: financialData.totalTransactions,
          verified: financialData.verifiedTransactions,
          pending: financialData.pendingAudit
        },
        expenses: {
          staffCrew: `€${financialData.staffCrewCosts.toFixed(1)}M`,
          operationsFleet: `€${financialData.operationsFleetCosts.toFixed(1)}M`,
          mediaAds: `€${financialData.mediaAdsCosts.toFixed(1)}M`,
          techMaintenance: `€${financialData.techMaintenanceCosts.toFixed(1)}M`
        }
      };

      // Create a downloadable PDF content
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Financial Audit Ledger</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
    .section { margin-bottom: 30px; }
    .section h2 { background-color: #1a1a1a; color: #00ffff; padding: 10px; }
    .data-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
    .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${pdfContent.header}</h1>
    <p>Generated: ${pdfContent.timestamp}</p>
    <p>Blockchain: ${pdfContent.blockchain.hashAnchor} | Integrity: ${pdfContent.blockchain.integrity}%</p>
  </div>
  
  <div class="section">
    <h2>Financial Summary</h2>
    <div class="data-row"><span>Total Sponsor Income:</span><span>${pdfContent.summary.totalIncome}</span></div>
    <div class="data-row"><span>Verified Payouts:</span><span>${pdfContent.summary.verifiedPayouts}</span></div>
    <div class="data-row"><span>Escrow Balance:</span><span>${pdfContent.summary.escrowBalance}</span></div>
    <div class="data-row"><span>ROI:</span><span>${pdfContent.summary.roi}</span></div>
  </div>

  <div class="section">
    <h2>Transaction Details</h2>
    <div class="data-row"><span>Total Transactions:</span><span>${pdfContent.transactions.total.toLocaleString()}</span></div>
    <div class="data-row"><span>Verified on Blockchain:</span><span>${pdfContent.transactions.verified.toLocaleString()}</span></div>
    <div class="data-row"><span>Pending Audit:</span><span>${pdfContent.transactions.pending}</span></div>
  </div>

  <div class="section">
    <h2>Expense Breakdown</h2>
    <div class="data-row"><span>Staff & Crew:</span><span>${pdfContent.expenses.staffCrew}</span></div>
    <div class="data-row"><span>Operations / Fleet:</span><span>${pdfContent.expenses.operationsFleet}</span></div>
    <div class="data-row"><span>Media / Ads:</span><span>${pdfContent.expenses.mediaAds}</span></div>
    <div class="data-row"><span>Tech & Maintenance:</span><span>${pdfContent.expenses.techMaintenance}</span></div>
  </div>

  <div class="footer">
    <p>This ledger has been verified and notarized on the Kardiverse blockchain.</p>
    <p>Block Height: ${pdfContent.blockchain.blockHeight.toLocaleString()} | Integrity Score: ${pdfContent.blockchain.integrity}%</p>
  </div>
</body>
</html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-ledger-${financialData.blockchainHeight}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      
      toast({
        title: "Audit Ledger Downloaded",
        description: `PDF exported for Block #${financialData.blockchainHeight}`,
      });
    } catch (error) {
      setIsExporting(false);
      toast({
        title: "Export Failed",
        description: "Failed to generate audit ledger PDF",
        variant: "destructive"
      });
    }
  };

  // Export for Tax Authority Handler
  const handleExportForTaxAuthority = async () => {
    setIsExporting(true);
    
    toast({
      title: "Preparing Tax Authority Export",
      description: "Generating tax-compliant report...",
    });

    try {
      // Generate tax-compliant export
      const taxData = {
        reportType: "Tax Authority Export",
        fiscalYear: new Date().getFullYear(),
        generatedDate: new Date().toISOString().split('T')[0],
        companyInfo: {
          name: "Kardiverse Campaign Management",
          taxId: "TAX-KDV-2024-001",
          jurisdiction: "International"
        },
        income: {
          total: financialData.totalIncome * 1000000, // Convert to actual amount
          currency: "EUR",
          description: "Sponsor Income"
        },
        expenses: {
          staffCrew: financialData.staffCrewCosts * 1000000,
          operationsFleet: financialData.operationsFleetCosts * 1000000,
          mediaAds: financialData.mediaAdsCosts * 1000000,
          techMaintenance: financialData.techMaintenanceCosts * 1000000,
          total: (financialData.staffCrewCosts + financialData.operationsFleetCosts + 
                  financialData.mediaAdsCosts + financialData.techMaintenanceCosts) * 1000000
        },
        netIncome: ((financialData.totalIncome - 
                    financialData.staffCrewCosts - financialData.operationsFleetCosts -
                    financialData.mediaAdsCosts - financialData.techMaintenanceCosts) * 1000000),
        blockchainVerification: {
          blockHash: `0x${financialData.blockchainHeight.toString(16).padStart(8, '0')}`,
          integrity: financialData.integrityScore,
          verifiedTransactions: financialData.verifiedTransactions
        }
      };

      // Create CSV content for tax authority
      const csvContent = [
        ['Tax Authority Report - Fiscal Year ' + taxData.fiscalYear],
        ['Generated: ' + taxData.generatedDate],
        ['Company: ' + taxData.companyInfo.name],
        ['Tax ID: ' + taxData.companyInfo.taxId],
        [''],
        ['Category', 'Amount (EUR)'],
        ['Total Income', taxData.income.total.toLocaleString()],
        ['Expenses - Staff & Crew', taxData.expenses.staffCrew.toLocaleString()],
        ['Expenses - Operations / Fleet', taxData.expenses.operationsFleet.toLocaleString()],
        ['Expenses - Media / Ads', taxData.expenses.mediaAds.toLocaleString()],
        ['Expenses - Tech & Maintenance', taxData.expenses.techMaintenance.toLocaleString()],
        ['Total Expenses', taxData.expenses.total.toLocaleString()],
        ['Net Income', taxData.netIncome.toLocaleString()],
        [''],
        ['Blockchain Verification'],
        ['Block Hash', taxData.blockchainVerification.blockHash],
        ['Integrity Score', taxData.blockchainVerification.integrity + '%'],
        ['Verified Transactions', taxData.blockchainVerification.verifiedTransactions.toLocaleString()]
      ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tax-export-${new Date().getFullYear()}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      
      toast({
        title: "Tax Export Complete",
        description: "Tax-compliant report exported successfully",
      });
    } catch (error) {
      setIsExporting(false);
      toast({
        title: "Export Failed",
        description: "Failed to generate tax authority export",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">AUDIT DASHBOARD — TAB 6 Financial Overview</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleSyncEscrowNotary}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync with Escrow & Notary
          </Button>
          
          <Button 
            onClick={handleExportLedgerCSV}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Ledger CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          onClick={handleFilter}
          variant="outline"
          className="border-slate-600 text-gray-300 hover:text-white"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        
        <Button 
          onClick={handleDateFilter}
          variant="outline"
          className="border-slate-600 text-gray-300 hover:text-white"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Date
        </Button>
        
        <Button 
          onClick={handleCampaignFilter}
          variant="outline"
          className="border-slate-600 text-gray-300 hover:text-white"
        >
          <Building className="w-4 h-4 mr-2" />
          Campaign
        </Button>
        
        <Button 
          onClick={handleSponsorFilter}
          variant="outline"
          className="border-slate-600 text-gray-300 hover:text-white"
        >
          <Users className="w-4 h-4 mr-2" />
          Sponsor
        </Button>
        
        <div className="flex-1" />
        
        <Button 
          onClick={handleSyncEscrowNotary}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync with Escrow & Notary
        </Button>
        
        <Button 
          onClick={handleGenerateReport}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Financial Report (PDF)
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Financial Summary */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Summary</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">
                €{financialData.totalIncome.toFixed(1)}M
              </div>
              <div className="text-sm text-gray-400 mb-1">Total Sponsor Income</div>
              <div className="text-xs text-green-400">All amounts verified</div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">
                €{financialData.verifiedPayouts.toFixed(1)}M
              </div>
              <div className="text-sm text-gray-400 mb-1">Verified Payouts</div>
              <div className="text-xs text-green-400">+{financialData.payoutGrowth.toFixed(1)}%</div>
              <div className="text-xs text-green-400">All amounts verified</div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">
                €{financialData.escrowBalance.toFixed(1)}M
              </div>
              <div className="text-sm text-gray-400 mb-1">Escrow Balance</div>
              <div className="text-xs text-gray-500">Change 7152. .Ikcgr.</div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">
                +{financialData.roi.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400 mb-1">ROI</div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-yellow-400">Excellent</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Ledger Summary */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-white mb-4">Ledger Summary</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Transactions:</span>
              <span className="text-white font-semibold">{financialData.totalTransactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Verified on Blockchain:</span>
              <span className="text-white font-semibold">
                {financialData.verifiedTransactions.toLocaleString()} ({((financialData.verifiedTransactions / financialData.totalTransactions) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pending Audit:</span>
              <span className="text-white font-semibold">{financialData.pendingAudit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hash Anchor:</span>
              <span className="text-white font-mono">Block #{financialData.blockchainHeight.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Integrity:</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-green-400 font-semibold">{financialData.integrityScore}%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={handleViewLedgerOnChain}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSyncing}
            >
              <Link className="w-4 h-4 mr-2" />
              View Ledger on Chain
            </Button>
            
            <Button 
              onClick={handleDownloadAuditLedgerPDF}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isExporting}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Generating..." : "Download Audit Ledger PDF"}
            </Button>
            
            <Button 
              onClick={handleExportForTaxAuthority}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isExporting}
            >
              <FileText className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : "Export for Tax Authority"}
            </Button>
          </div>
        </Card>
      </div>

      {/* Financial Flow Graph and Expenses */}
      <Card className="p-6 bg-card border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Financial Flow Graph */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              FINANCIAL FLOW GRAPH
            </h3>
            
            <div className="h-64">
              <LineChart
                data={chartData.incomeData}
                labels={chartData.labels}
              />
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-sm text-gray-300">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm text-gray-300">Verified Payouts</span>
              </div>
            </div>
          </div>

          {/* Expenses by Type */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Expenses by Type
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-teal-600"></div>
                  <span className="text-sm text-gray-300">Staff & Crew</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">23%</span>
                  <span className="text-sm text-white">€{financialData.staffCrewCosts.toFixed(1)}M</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-teal-400"></div>
                  <span className="text-sm text-gray-300">Operations / Fleet</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">20%</span>
                  <span className="text-sm text-white">€{financialData.operationsFleetCosts.toFixed(1)}M</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-300">Media / Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">19%</span>
                  <span className="text-sm text-white">€{financialData.mediaAdsCosts.toFixed(1)}M</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-300">Tech & Maintenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">25%</span>
                  <span className="text-sm text-white">€{financialData.techMaintenanceCosts.toFixed(1)}M</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Accounting Validator */}
        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            AI Accounting Validator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">No financial inconsistencies detected.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">ROI matches declared sponsor reports.</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">All Income streams notarized under Kardiverse Patent #15</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-900/30 border border-green-500/40 rounded">
            <p className="text-xs text-green-400 font-semibold">
              Total Ledger Synced. Block #{financialData.blockchainHeight.toLocaleString()} | {financialData.integrityScore}% Integrity
            </p>
          </div>
        </div>
      </Card>

      {/* Dialogs */}
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-white">Sync with Escrow & Notary</DialogTitle>
            <DialogDescription className="text-gray-400">
              Synchronizing financial data with blockchain and notary systems
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Sync Status:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Escrow System:</span>
                  <span className="text-green-400">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Notary System:</span>
                  <span className="text-green-400">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Blockchain:</span>
                  <span className="text-green-400">Synced</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSyncDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={executeSync}
              disabled={isSyncing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                'Start Sync'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-white">Export Ledger CSV</DialogTitle>
            <DialogDescription className="text-gray-400">
              Export financial ledger data in CSV format
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Export Details:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Records:</span>
                  <span className="text-white">{financialData.totalTransactions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date Range:</span>
                  <span className="text-white">All Time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Format:</span>
                  <span className="text-white">CSV</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={executeExport}
              disabled={isExporting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                'Export CSV'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-white">Generate Financial Report (PDF)</DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate comprehensive financial report in PDF format
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Report Contents:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Financial Summary</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Transaction Ledger</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Expense Breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Blockchain Verification</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={executeReportGeneration}
              disabled={isGeneratingReport}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isGeneratingReport ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate PDF'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};