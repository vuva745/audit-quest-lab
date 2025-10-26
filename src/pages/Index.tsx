import { useState } from "react";
import { MainOverview } from "./MainOverview";
import { ScanLogDetail } from "./ScanLogDetail";
import CampaignControl from "./CampaignControl";
import { EscrowPayments } from "./EscrowPayments";
import { NotaryVerification } from "./NotaryVerification";
import { FinancialOverview } from "./FinancialOverview";
import { SecurityLogs } from "./SecurityLogs";
import { MediaGallery } from "./MediaGallery";
import SponsorDataBridge from "./SponsorDataBridge";
import { useLanguage } from "@/contexts/AppContext";
import { 
  LayoutDashboard, 
  Clock, 
  Trophy, 
  Wallet, 
  Shield, 
  XCircle, 
  Bell, 
  Video, 
  Database
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useLanguage();

  const navigationItems = [
    { id: "overview", name: t('overview'), icon: LayoutDashboard, component: MainOverview },
    { id: "scan-log-detail", name: "Scan Log Detail", icon: Clock, component: ScanLogDetail },
    { id: "winners-prizes", name: t('winners'), icon: Trophy, component: CampaignControl },
    { id: "m-pesa-escrow", name: t('escrow'), icon: Wallet, component: EscrowPayments },
    { id: "notary-verification", name: t('notary'), icon: Shield, component: NotaryVerification },
    { id: "financial-overview", name: t('financial'), icon: Bell, component: FinancialOverview },
    { id: "security-logs", name: t('security'), icon: XCircle, component: SecurityLogs },
    { id: "media-gallery", name: t('media'), icon: Video, component: MediaGallery },
    { id: "sponsor-data-bridge", name: t('dataBridge'), icon: Database, component: SponsorDataBridge },
  ];

  const ActiveComponent = navigationItems.find(item => item.id === activeTab)?.component || MainOverview;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-card border-r border-cyan-500/20 flex flex-col shadow-[0_0_20px_rgba(102,204,255,0.15)]">
        {/* Logo and Brand */}
        <div className="p-6 border-b border-cyan-500/20">
          <div className="flex flex-col items-center gap-3 relative">
            <div className="radial-glow">
              <img 
                src="/logo-transparent.png" 
                alt="Kardiverse Logo" 
                className="h-16 object-contain"
              />
            </div>
            <div className="radial-glow">
              <span className="text-white text-xl font-semibold text-center">{t('dashboard')}</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-cyan-500/20 text-cyan-300 neon-glow border-glow border border-cyan-400/50 font-semibold text-neon"
                    : "text-muted-foreground hover:text-foreground hover:bg-cyan-500/10 border border-transparent hover:border-glow hover:shadow-[0_0_12px_rgba(102,204,255,0.25)]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Search */}
        <div className="p-4 border-t border-cyan-500/20">
          <div className="relative">
            <input
              type="text"
              placeholder="Type here to search"
              className="w-full px-4 py-2 bg-muted/50 border border-cyan-500/20 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 focus:shadow-[0_0_10px_rgba(102,204,255,0.25)] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default Index;
