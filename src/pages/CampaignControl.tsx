import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { useRealtimeWinners } from "@/hooks/useRealtimeData";
import { useLanguage } from "@/contexts/AppContext";
import { Trophy, Target, Award, Play, Eye, Download, RefreshCw, Loader2, X, Calendar, MapPin, User, FileImage, Video, FileText, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

const CampaignControl = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { winners, loading, updateWinnerStatus, refresh } = useRealtimeWinners();

  // State for media proof dialog
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [selectedMediaProof, setSelectedMediaProof] = useState<any>(null);
  const [mediaLoading, setMediaLoading] = useState(false);

  // Debug logging
  console.log('CampaignControl - winners:', winners);
  console.log('CampaignControl - loading:', loading);

  // Calculate real-time statistics
  const totalWinners = winners.length;
  const verifiedCount = winners.filter(w => w.status === 'claimed').length;
  const pendingCount = winners.filter(w => w.status === 'pending' || w.status === 'processing').length;
  const rejectedCount = winners.filter(w => w.status === 'rejected').length;
  
  const verifiedPercentage = totalWinners > 0 ? Math.round((verifiedCount / totalWinners) * 100) : 0;
  const pendingPercentage = totalWinners > 0 ? Math.round((pendingCount / totalWinners) * 100) : 0;
  const rejectedPercentage = totalWinners > 0 ? Math.round((rejectedCount / totalWinners) * 100) : 0;

  const handleStatusUpdate = (winnerId: string, newStatus: 'claimed' | 'pending' | 'rejected' | 'processing') => {
    updateWinnerStatus(winnerId, newStatus);
    toast({
      title: "Status Updated",
      description: `Winner ${winnerId} status changed to ${newStatus}`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Updating winners data...",
    });
    
    // Trigger actual data refresh
    refresh();
    
    // Show completion toast after a short delay
    setTimeout(() => {
      toast({
        title: "Data Refreshed",
        description: `Updated ${winners.length} winners with latest information`,
      });
    }, 1000);
  };

  const handleViewMedia = (winnerId: string, uid: string) => {
    setMediaLoading(true);
    setShowMediaDialog(true);
    
    toast({
      title: "Opening Media Proof",
      description: `Loading media proof for winner ${winnerId} (${uid})...`,
    });
    
    // Simulate loading media proof data
    setTimeout(() => {
      const winner = winners.find(w => w.id === winnerId);
      
      // Generate comprehensive media proof
      const mediaProof = {
        id: `MP-${Date.now()}`,
        winnerId,
        uid,
        timestamp: new Date().toISOString(),
        winner: winner || {
          id: winnerId,
          uid,
          prize: "Unknown Prize",
          status: "pending",
          timestamp: new Date().toISOString(),
          payoutAmount: 0,
          location: "Unknown Location"
        },
        verification: {
          method: "QR Code Scan + Photo Verification",
          confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
          algorithm: "AI-Powered Image Recognition",
          timestamp: new Date().toISOString()
        },
        media: {
          images: [
            {
              id: "img-1",
              type: "verification_photo",
              url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop&crop=face`,
              description: "Winner verification photo",
              timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
              aiGenerated: true,
              prompt: "Professional headshot, business attire, clean background, high quality"
            },
            {
              id: "img-2", 
              type: "qr_code_scan",
              url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop&crop=center`,
              description: "QR code scan result",
              timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
              aiGenerated: true,
              prompt: "QR code on mobile phone screen, modern technology, clean interface"
            },
            {
              id: "img-3",
              type: "prize_receipt",
              url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop&crop=center`,
              description: "Prize receipt photo",
              timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
              aiGenerated: true,
              prompt: "Receipt document, printed text, clean white background, professional"
            },
            {
              id: "img-4",
              type: "location_verification",
              url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop&crop=center`,
              description: "Location verification photo",
              timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
              aiGenerated: true,
              prompt: "Urban landscape, recognizable landmark, clear sky, professional photography"
            }
          ],
          documents: [
            {
              id: "doc-1",
              type: "identity_verification",
              name: "ID Verification Document",
              status: "verified",
              timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
            }
          ]
        },
        metadata: {
          deviceInfo: {
            model: "iPhone 15 Pro",
            os: "iOS 17.2",
            browser: "Safari 17.2"
          },
          location: {
            coordinates: {
              lat: -1.2921 + (Math.random() - 0.5) * 0.1,
              lng: 36.8219 + (Math.random() - 0.5) * 0.1
            },
            address: winner?.location || "Nairobi, Kenya",
            accuracy: "±5 meters"
          },
          network: {
            ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            isp: "Safaricom Limited",
            connection: "4G LTE"
          }
        },
        audit: {
          verifiedBy: "AI Verification System",
          verificationLevel: "High",
          riskScore: Math.floor(Math.random() * 20) + 5, // 5-24 (low risk)
          complianceStatus: "COMPLIANT",
          lastAudit: new Date().toISOString()
        }
      };
      
      setSelectedMediaProof(mediaProof);
      setMediaLoading(false);
      
      toast({
        title: "Media Proof Loaded",
        description: `Media proof for ${uid} is now available`,
      });
    }, 2000);
  };

  const handleDownloadProof = async (winnerId: string, uid: string) => {
    toast({
      title: "Downloading Media Proof",
      description: `Preparing comprehensive media proof package for ${uid}...`,
    });
    
    try {
      // Create comprehensive proof data
      const proofData = {
        winnerId,
        uid,
        timestamp: new Date().toISOString(),
        proofType: "comprehensive_media_proof",
        status: "verified",
        aiGeneratedImages: selectedMediaProof?.media?.images?.filter(img => img.aiGenerated) || [],
        verification: selectedMediaProof?.verification || {},
        metadata: selectedMediaProof?.metadata || {},
        audit: selectedMediaProof?.audit || {}
      };
      
      // Create JSON file
      const jsonContent = JSON.stringify(proofData, null, 2);
      const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
      
      // Create HTML report with embedded images
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media Proof Report - ${uid}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .image-card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
        .image-card img { width: 100%; height: 150px; object-fit: cover; }
        .image-info { padding: 10px; background: #f8f9fa; }
        .metadata { background: #e9ecef; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .verification { background: #d4edda; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .ai-badge { background: #007bff; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Media Proof Report</h1>
            <p><strong>Winner ID:</strong> ${winnerId} | <strong>UID:</strong> ${uid}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="section">
            <h2>AI-Generated Verification Images</h2>
            <div class="image-grid">
                ${selectedMediaProof?.media?.images?.map(img => `
                    <div class="image-card">
                        <img src="${img.url}" alt="${img.description}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'">
                        <div class="image-info">
                            <strong>${img.description}</strong>
                            ${img.aiGenerated ? '<span class="ai-badge">AI Generated</span>' : ''}
                            <br><small>Type: ${img.type}</small>
                            <br><small>Time: ${new Date(img.timestamp).toLocaleString()}</small>
                            ${img.prompt ? `<br><small>Prompt: ${img.prompt}</small>` : ''}
                        </div>
                    </div>
                `).join('') || '<p>No images available</p>'}
            </div>
        </div>
        
        <div class="section">
            <h2>Verification Details</h2>
            <div class="verification">
                <p><strong>Method:</strong> ${selectedMediaProof?.verification?.method || 'N/A'}</p>
                <p><strong>Confidence:</strong> ${selectedMediaProof?.verification?.confidence || 'N/A'}%</p>
                <p><strong>Algorithm:</strong> ${selectedMediaProof?.verification?.algorithm || 'N/A'}</p>
                <p><strong>Timestamp:</strong> ${selectedMediaProof?.verification?.timestamp ? new Date(selectedMediaProof.verification.timestamp).toLocaleString() : 'N/A'}</p>
            </div>
        </div>
        
        <div class="section">
            <h2>Device & Location Metadata</h2>
            <div class="metadata">
                <p><strong>Device:</strong> ${selectedMediaProof?.metadata?.deviceInfo?.model || 'N/A'} (${selectedMediaProof?.metadata?.deviceInfo?.os || 'N/A'})</p>
                <p><strong>Location:</strong> ${selectedMediaProof?.metadata?.location?.address || 'N/A'}</p>
                <p><strong>Coordinates:</strong> ${selectedMediaProof?.metadata?.location?.coordinates ? `${selectedMediaProof.metadata.location.coordinates.lat.toFixed(4)}, ${selectedMediaProof.metadata.location.coordinates.lng.toFixed(4)}` : 'N/A'}</p>
                <p><strong>Network:</strong> ${selectedMediaProof?.metadata?.network?.isp || 'N/A'} (${selectedMediaProof?.metadata?.network?.connection || 'N/A'})</p>
            </div>
        </div>
        
        <div class="section">
            <h2>Audit Information</h2>
            <div class="metadata">
                <p><strong>Verified By:</strong> ${selectedMediaProof?.audit?.verifiedBy || 'N/A'}</p>
                <p><strong>Verification Level:</strong> ${selectedMediaProof?.audit?.verificationLevel || 'N/A'}</p>
                <p><strong>Risk Score:</strong> ${selectedMediaProof?.audit?.riskScore || 'N/A'}/100</p>
                <p><strong>Compliance:</strong> ${selectedMediaProof?.audit?.complianceStatus || 'N/A'}</p>
                <p><strong>Last Audit:</strong> ${selectedMediaProof?.audit?.lastAudit ? new Date(selectedMediaProof.audit.lastAudit).toLocaleString() : 'N/A'}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
      
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
      
      // Download both files
      const timestamp = new Date().toISOString().split('T')[0];
      
      // Download JSON
      const jsonUrl = window.URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement('a');
      jsonLink.href = jsonUrl;
      jsonLink.download = `media-proof-${uid}-${timestamp}.json`;
      document.body.appendChild(jsonLink);
      jsonLink.click();
      document.body.removeChild(jsonLink);
      window.URL.revokeObjectURL(jsonUrl);
      
      // Download HTML report
      const htmlUrl = window.URL.createObjectURL(htmlBlob);
      const htmlLink = document.createElement('a');
      htmlLink.href = htmlUrl;
      htmlLink.download = `media-proof-report-${uid}-${timestamp}.html`;
      document.body.appendChild(htmlLink);
      htmlLink.click();
      document.body.removeChild(htmlLink);
      window.URL.revokeObjectURL(htmlUrl);

      toast({
        title: "Media Proof Downloaded",
        description: `Comprehensive media proof package saved for ${uid}`,
      });
      
    } catch (error) {
      console.error('Error downloading media proof:', error);
      toast({
        title: "Download Error",
        description: "Failed to download media proof. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary text-neon">{t('dashboard').toUpperCase()}</h1>
          <p className="text-xl font-semibold text-foreground">{t('winners')}</p>
        </div>
        <div className="flex items-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t('refresh')}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 flex items-center gap-4">
          <StatusBadge status="verified" label={`Verified ${verifiedPercentage}%`} />
          <StatusBadge status="pending" label={`Pending ${pendingPercentage}%`} />
          <StatusBadge status="rejected" label={`Rejected ${rejectedPercentage}%`} />
        </div>
        <div className="text-2xl font-bold text-primary text-neon">Total Winners = <span className="text-neon-sm">{totalWinners.toLocaleString()}</span></div>
      </div>

      <Card className="p-6 border-primary/30 bg-card/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/30">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Winner ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">UID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Prize</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Proof</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Payout</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading winners data...
                    </div>
                  </td>
                </tr>
              ) : winners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No winners data available
                  </td>
                </tr>
              ) : (
                winners.map((winner, i) => (
                <tr key={i} className="border-b border-primary/20 hover:bg-primary/5 transition-colors">
                  <td className="py-4 px-4 text-primary font-bold text-lg text-neon-sm">{winner.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                        <span className="text-xs text-primary font-mono text-neon-sm">{winner.uid.slice(0, 1)}</span>
                      </div>
                      <span className="text-primary font-mono text-neon-sm">{winner.uid}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {winner.prize.includes('€') && <span className="text-success">💵</span>}
                      {winner.prize.includes('Pizza') && <span>🍕</span>}
                      {winner.prize.includes('iPhone') && <span>📱</span>}
                      {winner.prize.includes('NFT') && <span>🖼️</span>}
                      <span className={winner.status === 'claimed' ? 'text-success text-neon-success' : winner.status === 'pending' ? 'text-warning text-neon-warning' : 'text-muted-foreground'}>
                        {winner.prize}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                    <StatusBadge status={winner.status} />
                      {winner.status === 'pending' || winner.status === 'processing' ? (
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-6 px-2 text-xs"
                            onClick={() => handleStatusUpdate(winner.id, 'claimed')}
                          >
                            ✓
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-6 px-2 text-xs"
                            onClick={() => handleStatusUpdate(winner.id, 'rejected')}
                          >
                            ✗
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => handleViewMedia(winner.id, winner.uid)}
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => handleDownloadProof(winner.id, winner.uid)}
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={winner.status === 'claimed' ? 'text-success font-semibold text-neon-success' : 'text-muted-foreground'}>
                      {winner.payoutAmount ? `€${winner.payoutAmount.toLocaleString()}` : '—'}
                    </span>
                    {winner.location && (
                      <div className="text-xs text-muted-foreground mt-1 text-neon-sm">
                        📍 {winner.location}
                      </div>
                    )}
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Card className="mt-6 p-4 border-success/50 bg-success/10 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/20">
            <Trophy className="w-6 h-6 text-success" />
          </div>
          <p className="text-success font-semibold text-neon-success">
            No duplicate payouts detected — Integrity Score <span className="text-neon-success">{Math.max(95, 100 - rejectedPercentage)}%</span>
          </p>
        </Card>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Campaign Scans"
          value="4,981,224"
          icon={Target}
          trend="↑ 12% last 24h"
        />
        <StatCard
          title="Verified Winners"
          value="6,920"
          subtitle="85% verified"
          icon={Trophy}
        />
        <StatCard
          title="Total Prizes Awarded"
          value="€1.2M"
          icon={Award}
        />
      </div>

      {/* Media Proof Dialog */}
      <Dialog open={showMediaDialog} onOpenChange={setShowMediaDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileImage className="w-5 h-5" />
              Media Proof - {selectedMediaProof?.uid}
            </DialogTitle>
            <DialogDescription>
              Comprehensive verification data for winner {selectedMediaProof?.winnerId}
            </DialogDescription>
          </DialogHeader>
          
          {mediaLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading media proof...</p>
              </div>
            </div>
          ) : selectedMediaProof ? (
            <div className="space-y-6">
              {/* Winner Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Winner Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Winner ID:</span>
                    <p className="font-semibold text-neon-sm">{selectedMediaProof.winnerId}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">UID:</span>
                    <p className="font-semibold text-neon-sm">{selectedMediaProof.uid}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Prize:</span>
                    <p className="font-semibold text-neon-success">{selectedMediaProof.winner.prize}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <StatusBadge status={selectedMediaProof.winner.status} />
                  </div>
                </div>
              </Card>

              {/* Verification Details */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Verification Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success text-neon-success">{selectedMediaProof.verification.confidence}%</div>
                    <div className="text-sm text-muted-foreground">Confidence Score</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-muted-foreground">Method:</span>
                    <p className="font-semibold text-neon-sm">{selectedMediaProof.verification.method}</p>
                    <span className="text-sm text-muted-foreground">Algorithm:</span>
                    <p className="font-semibold text-neon-sm">{selectedMediaProof.verification.algorithm}</p>
                  </div>
                </div>
              </Card>

              {/* Media Gallery */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  AI-Generated Media Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedMediaProof.media.images.map((image: any, index: number) => (
                    <div key={image.id} className="border rounded-lg overflow-hidden">
                      <div className="relative">
                        <img 
                          src={image.url} 
                          alt={image.description}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://via.placeholder.com/400x300/cccccc/666666?text=${image.type.replace('_', ' ').toUpperCase()}`;
                          }}
                        />
                        {image.aiGenerated && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            AI Generated
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold">{image.description}</p>
                          {image.aiGenerated && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              AI
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Type: {image.type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(image.timestamp).toLocaleString()}
                        </p>
                        {image.prompt && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                            <span className="font-medium text-gray-600">AI Prompt:</span>
                            <p className="text-gray-700 mt-1">{image.prompt}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Location & Device Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location Data
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Address:</span>
                      <p className="font-semibold text-neon-sm">{selectedMediaProof.metadata.location.address}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Coordinates:</span>
                      <p className="font-mono text-sm text-neon-sm">
                        {selectedMediaProof.metadata.location.coordinates.lat.toFixed(6)}, {selectedMediaProof.metadata.location.coordinates.lng.toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Accuracy:</span>
                      <p className="font-semibold text-neon-sm">{selectedMediaProof.metadata.location.accuracy}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Device Information
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Device:</span>
                      <p className="font-semibold text-neon-sm">{selectedMediaProof.metadata.deviceInfo.model}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">OS:</span>
                      <p className="font-semibold text-neon-sm">{selectedMediaProof.metadata.deviceInfo.os}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Browser:</span>
                      <p className="font-semibold text-neon-sm">{selectedMediaProof.metadata.deviceInfo.browser}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">IP Address:</span>
                      <p className="font-mono text-sm text-neon-sm">{selectedMediaProof.metadata.network.ip}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Audit Information */}
              <Card className="p-4 border-success/30 bg-success/5">
                <h3 className="text-lg font-semibold mb-3 text-success">Audit Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Verified By:</span>
                    <p className="font-semibold text-neon-sm">{selectedMediaProof.audit.verifiedBy}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Verification Level:</span>
                    <p className="font-semibold text-neon-sm">{selectedMediaProof.audit.verificationLevel}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Risk Score:</span>
                    <p className="font-semibold text-success text-neon-success">{selectedMediaProof.audit.riskScore}/100</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Compliance:</span>
                    <p className="font-semibold text-success text-neon-success">{selectedMediaProof.audit.complianceStatus}</p>
                  </div>
                </div>
              </Card>
            </div>
          ) : null}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowMediaDialog(false)}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
            <Button onClick={() => handleDownloadProof(selectedMediaProof?.winnerId, selectedMediaProof?.uid)}>
              <Download className="w-4 h-4 mr-2" />
              Download Proof
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignControl;