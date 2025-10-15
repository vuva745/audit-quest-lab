import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MainOverview } from "./MainOverview";
import { ScanLogDetail } from "./ScanLogDetail";
import { CampaignControl } from "./CampaignControl";
import { EscrowPayments } from "./EscrowPayments";
import { NotaryVerification } from "./NotaryVerification";
import { FinancialOverview } from "./FinancialOverview";
import { SecurityLogs } from "./SecurityLogs";
import { MediaGallery } from "./MediaGallery";
import { DataBridge } from "./DataBridge";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-card border border-primary/30 p-1 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            1️⃣ Main Overview
          </TabsTrigger>
          <TabsTrigger value="scan-log" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            2️⃣ Scan Log Detail
          </TabsTrigger>
          <TabsTrigger value="campaign" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            3️⃣ Campaign Control
          </TabsTrigger>
          <TabsTrigger value="escrow" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            4️⃣ Escrow & Payments
          </TabsTrigger>
          <TabsTrigger value="notary" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            5️⃣ Notary Verification
          </TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            6️⃣ Financial Overview
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            7️⃣ Security Logs
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            8️⃣ Media Gallery
          </TabsTrigger>
          <TabsTrigger value="data-bridge" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            9️⃣ Data Bridge
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MainOverview />
        </TabsContent>
        
        <TabsContent value="scan-log">
          <ScanLogDetail />
        </TabsContent>
        
        <TabsContent value="campaign">
          <CampaignControl />
        </TabsContent>
        
        <TabsContent value="escrow">
          <EscrowPayments />
        </TabsContent>
        
        <TabsContent value="notary">
          <NotaryVerification />
        </TabsContent>
        
        <TabsContent value="financial">
          <FinancialOverview />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityLogs />
        </TabsContent>
        
        <TabsContent value="media">
          <MediaGallery />
        </TabsContent>
        
        <TabsContent value="data-bridge">
          <DataBridge />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
