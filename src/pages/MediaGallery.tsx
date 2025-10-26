import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  FileImage, 
  Video, 
  Download, 
  Search, 
  Filter, 
  MapPin, 
  User, 
  Eye, 
  X, 
  Loader2,
  Sparkles,
  Camera,
  Image as ImageIcon,
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  Upload,
  Plus,
  BarChart3
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document';
  category: 'verification' | 'receipt' | 'location' | 'qr_code' | 'identity' | 'prize';
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  timestamp: string;
  winnerId: string;
  uid: string;
  campaignId: string;
  campaignName: string;
  sponsorId: string;
  sponsorName: string;
  aiGenerated: boolean;
  prompt?: string;
  confidence?: number;
  metadata: {
    device: string;
    location: string;
    coordinates?: { lat: number; lng: number };
    fileSize: string;
    dimensions?: { width: number; height: number };
    uploadSource: 'manual' | 'ai_generated' | 'api_import';
  };
  verification: {
    status: 'verified' | 'pending' | 'rejected';
    method: string;
    confidence: number;
  };
}

export const MediaGallery = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State management
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCampaign, setFilterCampaign] = useState<string>('all');
  const [filterSponsor, setFilterSponsor] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<string>('all');
  
  // Upload and export states
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Campaign and sponsor data
  const campaigns = [
    { id: 'camp-001', name: 'Summer Festival 2024', sponsor: 'TechCorp', status: 'active' },
    { id: 'camp-002', name: 'Kids Parade', sponsor: 'ToyWorld', status: 'completed' },
    { id: 'camp-003', name: 'University Zone', sponsor: 'EduFund', status: 'active' },
    { id: 'camp-004', name: 'Bus Block Challenge', sponsor: 'TransitCo', status: 'pending' },
    { id: 'camp-005', name: 'Vendor Node', sponsor: 'MarketPlace', status: 'active' },
    { id: 'camp-006', name: 'NeoCard Launch', sponsor: 'CardTech', status: 'completed' }
  ];
  
  const sponsors = [
    { id: 'sponsor-001', name: 'TechCorp', type: 'Technology', budget: '€50M' },
    { id: 'sponsor-002', name: 'ToyWorld', type: 'Retail', budget: '€25M' },
    { id: 'sponsor-003', name: 'EduFund', type: 'Education', budget: '€30M' },
    { id: 'sponsor-004', name: 'TransitCo', type: 'Transportation', budget: '€40M' },
    { id: 'sponsor-005', name: 'MarketPlace', type: 'E-commerce', budget: '€35M' },
    { id: 'sponsor-006', name: 'CardTech', type: 'Fintech', budget: '€60M' }
  ];

  // Generate AI-powered media items with campaign data
  const generateMediaItems = (): MediaItem[] => {
    const categories = ['verification', 'receipt', 'location', 'qr_code', 'identity', 'prize'];
    const types = ['image', 'video', 'document'];
    const statuses = ['verified', 'pending', 'rejected'];
    const devices = ['iPhone 15 Pro', 'Samsung Galaxy S24', 'Google Pixel 8', 'OnePlus 12'];
    const locations = ['Nairobi, Kenya', 'Amsterdam, Netherlands', 'London, UK', 'New York, USA', 'Tokyo, Japan'];
    
    const items: MediaItem[] = [];
    
    for (let i = 0; i < 24; i++) { // Reduced from 36 to 24 items
      const category = categories[Math.floor(Math.random() * categories.length)] as any;
      const type = types[Math.floor(Math.random() * types.length)] as any;
      const status = statuses[Math.floor(Math.random() * statuses.length)] as any;
      const device = devices[Math.floor(Math.random() * devices.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
      const sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
      
      const baseTimestamp = Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000;
      const winnerId = `W${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
      const uid = `U${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
      
      // Optimized image URLs with smaller dimensions for faster loading
      const verificationPhotos = [
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&q=80',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80'
      ];
      
      const receiptPhotos = [
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&q=80',
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&q=80'
      ];
      
      const locationPhotos = [
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&q=80',
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop&q=80'
      ];
      
      const qrCodePhotos = [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop&q=80',
        'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=300&fit=crop&q=80'
      ];
      
      const identityPhotos = [
        'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400&h=300&fit=crop&q=80',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&q=80'
      ];
      
      const prizePhotos = [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80'
      ];
      
      let title, description, url, prompt;
      
      switch (category) {
        case 'verification':
          title = 'Winner Verification Photo';
          description = 'AI-generated professional verification image';
          url = verificationPhotos[Math.floor(Math.random() * verificationPhotos.length)];
          prompt = 'Professional headshot, business attire, clean background, high quality portrait';
          break;
        case 'receipt':
          title = 'Prize Receipt Document';
          description = 'Digital receipt for prize claim';
          url = receiptPhotos[Math.floor(Math.random() * receiptPhotos.length)];
          prompt = 'Receipt document, printed text, clean white background, professional document';
          break;
        case 'location':
          title = 'Location Verification';
          description = 'Geographic location confirmation';
          url = locationPhotos[Math.floor(Math.random() * locationPhotos.length)];
          prompt = 'Urban landscape, recognizable landmark, clear sky, professional photography';
          break;
        case 'qr_code':
          title = 'QR Code Scan Result';
          description = 'QR code verification capture';
          url = qrCodePhotos[Math.floor(Math.random() * qrCodePhotos.length)];
          prompt = 'QR code on mobile phone screen, modern technology, clean interface';
          break;
        case 'identity':
          title = 'Identity Verification';
          description = 'ID document verification';
          url = identityPhotos[Math.floor(Math.random() * identityPhotos.length)];
          prompt = 'Official document, ID card, clean background, professional lighting';
          break;
        case 'prize':
          title = 'Prize Collection Photo';
          description = 'Winner with prize item';
          url = prizePhotos[Math.floor(Math.random() * prizePhotos.length)];
          prompt = 'Person holding product, celebration, clean background, professional photo';
          break;
        default:
          title = 'Media Item';
          description = 'Media verification';
          url = verificationPhotos[0];
          prompt = 'Professional photo';
      }
      
      items.push({
        id: `media-${i + 1}`,
        type,
        category,
        title,
        description,
        url,
        thumbnail: url,
        timestamp: new Date(baseTimestamp).toISOString(),
        winnerId,
        uid,
        campaignId: campaign.id,
        campaignName: campaign.name,
        sponsorId: sponsor.id,
        sponsorName: sponsor.name,
        aiGenerated: true,
        prompt,
        confidence: Math.floor(Math.random() * 20) + 80,
        metadata: {
          device,
          location,
          coordinates: {
            lat: -1.2921 + (Math.random() - 0.5) * 0.1,
            lng: 36.8219 + (Math.random() - 0.5) * 0.1
          },
          fileSize: `${Math.floor(Math.random() * 5000) + 500}KB`,
          dimensions: type === 'image' ? { width: 800, height: 600 } : undefined,
          uploadSource: 'ai_generated'
        },
        verification: {
          status,
          method: 'AI-Powered Image Recognition',
          confidence: Math.floor(Math.random() * 20) + 80
        }
      });
    }
    
    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  // Initialize media items
  useEffect(() => {
    setLoading(true);
    // Reduced delay and optimized loading
    setTimeout(() => {
      const items = generateMediaItems();
      setMediaItems(items);
      setFilteredItems(items);
      setLoading(false);
    }, 300); // Reduced from 1500ms to 300ms
  }, []);

  // Filter items based on search and filters
  useEffect(() => {
    let filtered = mediaItems;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.winnerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sponsorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.verification.status === filterStatus);
    }
    
    if (filterCampaign !== 'all') {
      filtered = filtered.filter(item => item.campaignId === filterCampaign);
    }
    
    if (filterSponsor !== 'all') {
      filtered = filtered.filter(item => item.sponsorId === filterSponsor);
    }
    
    if (filterDateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterDateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.timestamp) >= filterDate);
    }
    
    setFilteredItems(filtered);
  }, [mediaItems, searchTerm, filterCategory, filterType, filterStatus, filterCampaign, filterSponsor, filterDateRange]);

  const handleViewItem = (item: MediaItem) => {
    setSelectedItem(item);
    setShowDialog(true);
  };

  const handleUploadFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      setShowUploadDialog(true);
    }
  };

  const handleExecuteUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    toast({
      title: "Uploading Files",
      description: `Uploading ${selectedFiles.length} files...`,
    });
    
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Create new media items from uploaded files
      const newItems: MediaItem[] = selectedFiles.map((file, index) => {
        const campaign = campaigns[Math.floor(Math.random() * campaigns.length)];
        const sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
        const category = ['verification', 'receipt', 'location', 'qr_code', 'identity', 'prize'][Math.floor(Math.random() * 6)] as any;
        
        return {
          id: `uploaded-${Date.now()}-${index}`,
          type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
          category,
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: `Uploaded ${file.type.split('/')[0]} file`,
          url: URL.createObjectURL(file),
          thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          timestamp: new Date().toISOString(),
          winnerId: `W${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          uid: `U${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
          campaignId: campaign.id,
          campaignName: campaign.name,
          sponsorId: sponsor.id,
          sponsorName: sponsor.name,
          aiGenerated: false,
          confidence: Math.floor(Math.random() * 20) + 80,
          metadata: {
            device: 'Uploaded Device',
            location: 'Unknown Location',
            fileSize: `${(file.size / 1024).toFixed(1)}KB`,
            dimensions: file.type.startsWith('image/') ? { width: 800, height: 600 } : undefined,
            uploadSource: 'manual'
          },
          verification: {
            status: 'pending',
            method: 'Manual Upload',
            confidence: 85
          }
        };
      });
      
      // Add new items to the gallery
      setMediaItems(prev => [...newItems, ...prev]);
      setSelectedFiles([]);
      setShowUploadDialog(false);
      
      toast({
        title: "Upload Complete",
        description: `Successfully uploaded ${newItems.length} files`,
      });
      
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload files. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    
    toast({
      title: "Exporting Data",
      description: "Preparing export files...",
    });
    
    try {
      // Create comprehensive export data
      const exportData = {
        exportInfo: {
          timestamp: new Date().toISOString(),
          totalItems: filteredItems.length,
          filters: {
            category: filterCategory,
            type: filterType,
            status: filterStatus,
            campaign: filterCampaign,
            sponsor: filterSponsor,
            dateRange: filterDateRange
          }
        },
        mediaItems: filteredItems.map(item => ({
          ...item,
          exportedAt: new Date().toISOString()
        })),
        summary: {
          byCategory: filteredItems.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          byType: filteredItems.reduce((acc, item) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          byStatus: filteredItems.reduce((acc, item) => {
            acc[item.verification.status] = (acc[item.verification.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          byCampaign: filteredItems.reduce((acc, item) => {
            acc[item.campaignName] = (acc[item.campaignName] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        }
      };
      
      // Create JSON export
      const jsonContent = JSON.stringify(exportData, null, 2);
      const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
      
      // Create CSV export
      const csvHeaders = ['ID', 'Title', 'Type', 'Category', 'Campaign', 'Sponsor', 'Winner ID', 'Status', 'Timestamp', 'File Size'];
      const csvRows = filteredItems.map(item => [
        item.id,
        item.title,
        item.type,
        item.category,
        item.campaignName,
        item.sponsorName,
        item.winnerId,
        item.verification.status,
        new Date(item.timestamp).toLocaleString(),
        item.metadata.fileSize
      ]);
      
      const csvContent = [csvHeaders, ...csvRows].map(row => 
        row.map(field => `"${field}"`).join(',')
      ).join('\n');
      
      const csvBlob = new Blob([csvContent], { type: 'text/csv' });
      
      // Download files
      const timestamp = new Date().toISOString().split('T')[0];
      
      // Download JSON
      const jsonUrl = window.URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement('a');
      jsonLink.href = jsonUrl;
      jsonLink.download = `media-gallery-export-${timestamp}.json`;
      document.body.appendChild(jsonLink);
      jsonLink.click();
      document.body.removeChild(jsonLink);
      window.URL.revokeObjectURL(jsonUrl);
      
      // Download CSV
      setTimeout(() => {
        const csvUrl = window.URL.createObjectURL(csvBlob);
        const csvLink = document.createElement('a');
        csvLink.href = csvUrl;
        csvLink.download = `media-gallery-export-${timestamp}.csv`;
        document.body.appendChild(csvLink);
        csvLink.click();
        document.body.removeChild(csvLink);
        window.URL.revokeObjectURL(csvUrl);
      }, 500);
      
      setShowExportDialog(false);
      
      toast({
        title: "Export Complete",
        description: `Exported ${filteredItems.length} media items`,
      });
      
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setFilterType('all');
    setFilterStatus('all');
    setFilterCampaign('all');
    setFilterSponsor('all');
    setFilterDateRange('all');
    
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
    });
  };

  const handleBulkDownload = async () => {
    if (filteredItems.length === 0) {
      toast({
        title: "No Items to Download",
        description: "No media items available for download",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bulk Download Started",
      description: `Downloading ${filteredItems.length} media items...`,
    });

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < filteredItems.length; i++) {
      const item = filteredItems[i];
      
      try {
        // Download each item with a delay to prevent browser blocking
        await new Promise(resolve => setTimeout(resolve, 1000));
        await handleDownloadItem(item);
        successCount++;
        
        // Update progress
        toast({
          title: "Bulk Download Progress",
          description: `Downloaded ${i + 1}/${filteredItems.length} items`,
        });
        
      } catch (error) {
        console.error(`Error downloading ${item.title}:`, error);
        errorCount++;
      }
    }

    toast({
      title: "Bulk Download Complete",
      description: `Successfully downloaded ${successCount} items. ${errorCount} failed.`,
    });
  };

  const handleDownloadItem = async (item: MediaItem) => {
    toast({
      title: "Downloading Media",
      description: `Preparing download for ${item.title}...`,
    });
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      let downloadSuccess = false;
      
      // Download the actual image/media file
      try {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        
        // Determine file extension based on type and content
        let extension = 'jpg';
        if (item.type === 'video') {
          extension = 'mp4';
        } else if (item.type === 'document') {
          extension = 'pdf';
        } else if (blob.type.includes('png')) {
          extension = 'png';
        } else if (blob.type.includes('gif')) {
          extension = 'gif';
        } else if (blob.type.includes('webp')) {
          extension = 'webp';
        } else if (blob.type.includes('svg')) {
          extension = 'svg';
        }
        
        // Create filename with better formatting
        const cleanTitle = item.title.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-');
        const filename = `${item.winnerId}-${cleanTitle}-${timestamp}.${extension}`;
        
        // Download media file
        const mediaUrl = window.URL.createObjectURL(blob);
        const mediaLink = document.createElement('a');
        mediaLink.href = mediaUrl;
        mediaLink.download = filename;
        mediaLink.style.display = 'none';
        document.body.appendChild(mediaLink);
        mediaLink.click();
        document.body.removeChild(mediaLink);
        window.URL.revokeObjectURL(mediaUrl);
        
        downloadSuccess = true;
        
      } catch (fetchError) {
        console.error('Error fetching media:', fetchError);
        // If fetch fails, try opening in new tab as fallback
        window.open(item.url, '_blank');
        toast({
          title: "Download Fallback",
          description: "Media opened in new tab due to download restrictions",
        });
      }
      
      // Always download metadata JSON
      setTimeout(() => {
        const mediaPackage = {
          id: item.id,
          title: item.title,
          description: item.description,
          type: item.type,
          category: item.category,
          url: item.url,
          timestamp: item.timestamp,
          winnerId: item.winnerId,
          uid: item.uid,
          campaignName: item.campaignName,
          sponsorName: item.sponsorName,
          aiGenerated: item.aiGenerated,
          prompt: item.prompt,
          confidence: item.confidence,
          metadata: item.metadata,
          verification: item.verification,
          downloadedAt: new Date().toISOString(),
          downloadStatus: downloadSuccess ? 'success' : 'fallback'
        };
        
        const jsonContent = JSON.stringify(mediaPackage, null, 2);
        const jsonBlob = new Blob([jsonContent], { type: 'application/json' });
        
        const jsonUrl = window.URL.createObjectURL(jsonBlob);
        const jsonLink = document.createElement('a');
        jsonLink.href = jsonUrl;
        jsonLink.download = `${item.winnerId}-metadata-${timestamp}.json`;
        jsonLink.style.display = 'none';
        document.body.appendChild(jsonLink);
        jsonLink.click();
        document.body.removeChild(jsonLink);
        window.URL.revokeObjectURL(jsonUrl);
      }, 500);
      
      if (downloadSuccess) {
        toast({
          title: "Download Complete",
          description: `Media and metadata downloaded for ${item.title}`,
        });
      }
      
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "Failed to download media. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'rejected': return <X className="w-4 h-4 text-destructive" />;
      default: return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <FileImage className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 bg-background">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Quick Filters Skeleton */}
        <div className="h-20 bg-gray-200 rounded animate-pulse"></div>

        {/* Media Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg animate-pulse">
              <div className="h-48 w-full bg-gray-300"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
                <div className="flex gap-2 mt-3">
                  <div className="h-8 w-16 bg-gray-300 rounded"></div>
                  <div className="h-8 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary text-neon">Media Gallery</h1>
          <p className="text-muted-foreground">Verification Media Collection</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">
            {filteredItems.length} Items
          </Badge>
          <Button variant="outline" onClick={handleUploadFiles}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
          <Button variant="outline" onClick={handleBulkDownload} disabled={filteredItems.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
          <Button variant="outline" onClick={() => setShowExportDialog(true)}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={() => setShowFilterDialog(true)}>
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search media, campaigns, sponsors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="verification">Verification</SelectItem>
              <SelectItem value="receipt">Receipt</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="qr_code">QR Code</SelectItem>
              <SelectItem value="identity">Identity</SelectItem>
              <SelectItem value="prize">Prize</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCampaign} onValueChange={setFilterCampaign}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns.map(campaign => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleClearFilters} className="text-destructive">
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.url}
                alt={item.description}
                className="w-full h-48 object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/400x300/cccccc/666666?text=${item.type.toUpperCase()}`;
                }}
              />
              <div className="absolute bottom-2 left-2">
                <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {getStatusIcon(item.verification.status)}
                  {item.verification.status.toUpperCase()}
            </div>
            </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{item.winnerId}</span>
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
          </div>
                <div className="flex items-center justify-between text-xs gap-2">
                  <Badge variant="outline" className="text-xs px-1 py-0 truncate flex-1">
                    {item.campaignName}
                  </Badge>
                  <Badge variant="secondary" className="text-xs px-1 py-0 truncate flex-1">
                    {item.sponsorName}
                  </Badge>
              </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewItem(item)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownloadItem(item)}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="p-12 text-center">
          <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Media Found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </Card>
      )}

      {/* Media Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && getTypeIcon(selectedItem.type)}
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6">
              {/* Media Display */}
              <div className="text-center">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.description}
                  className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/600x400/cccccc/666666?text=${selectedItem.type.toUpperCase()}`;
                  }}
                />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Winner & Campaign Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Winner ID:</span>
                      <span className="font-mono">{selectedItem.winnerId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">UID:</span>
                      <span className="font-mono">{selectedItem.uid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campaign:</span>
                      <span>{selectedItem.campaignName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sponsor:</span>
                      <span>{selectedItem.sponsorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="capitalize">{selectedItem.category.replace('_', ' ')}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verification
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedItem.verification.status)}
                        <span className="capitalize">{selectedItem.verification.status}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method:</span>
                      <span>{selectedItem.verification.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span>{selectedItem.verification.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timestamp:</span>
                      <span>{new Date(selectedItem.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location & Device
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device:</span>
                      <span>{selectedItem.metadata.device}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{selectedItem.metadata.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Size:</span>
                      <span>{selectedItem.metadata.fileSize}</span>
                    </div>
                    {selectedItem.metadata.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span>{selectedItem.metadata.dimensions.width}x{selectedItem.metadata.dimensions.height}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Close
            </Button>
            {selectedItem && (
              <Button onClick={() => handleDownloadItem(selectedItem)}>
                <Download className="w-4 h-4 mr-2" />
                Download Media
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Media Files
            </DialogTitle>
            <DialogDescription>
              Upload verification media files to the gallery
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files ({selectedFiles.length})</Label>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document')}
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024).toFixed(1)}KB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {isUploading && (
              <div className="space-y-2">
                <Label>Upload Progress</Label>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
          </div>
            )}
            
            <div className="flex items-center gap-4">
              <Button onClick={handleUploadFiles} disabled={isUploading}>
                <Plus className="w-4 h-4 mr-2" />
                Select Files
              </Button>
              <p className="text-sm text-muted-foreground">
                Supported formats: Images (JPG, PNG, GIF), Videos (MP4, MOV), Documents (PDF)
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleExecuteUpload} disabled={selectedFiles.length === 0 || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Media Gallery
            </DialogTitle>
            <DialogDescription>
              Export filtered media items with comprehensive data
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Export Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-mono">{filteredItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Images:</span>
                    <span>{filteredItems.filter(item => item.type === 'image').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Videos:</span>
                    <span>{filteredItems.filter(item => item.type === 'video').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Documents:</span>
                    <span>{filteredItems.filter(item => item.type === 'document').length}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Active Filters</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{filterCategory === 'all' ? 'All' : filterCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Campaign:</span>
                    <span className="truncate max-w-[120px]">{filterCampaign === 'all' ? 'All' : campaigns.find(c => c.id === filterCampaign)?.name || 'All'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>{filterStatus === 'all' ? 'All' : filterStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date Range:</span>
                    <span>{filterDateRange === 'all' ? 'All' : filterDateRange}</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2 text-blue-900">Export Formats</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>JSON: Complete data with metadata and AI prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>CSV: Tabular data for spreadsheet analysis</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)} disabled={isExporting}>
              Cancel
            </Button>
            <Button onClick={handleExportAll} disabled={isExporting || filteredItems.length === 0}>
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filters Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Advanced Filters
            </DialogTitle>
            <DialogDescription>
              Configure detailed filters for media gallery
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Campaign</Label>
                <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campaigns</SelectItem>
                    {campaigns.map(campaign => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Sponsor</Label>
                <Select value={filterSponsor} onValueChange={setFilterSponsor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sponsor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sponsors</SelectItem>
                    {sponsors.map(sponsor => (
                      <SelectItem key={sponsor.id} value={sponsor.id}>
                        {sponsor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Filter Summary</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Category: {filterCategory === 'all' ? 'All Categories' : filterCategory}</p>
                <p>Type: {filterType === 'all' ? 'All Types' : filterType}</p>
                <p>Status: {filterStatus === 'all' ? 'All Status' : filterStatus}</p>
                <p>Campaign: {filterCampaign === 'all' ? 'All Campaigns' : campaigns.find(c => c.id === filterCampaign)?.name || 'All'}</p>
                <p>Sponsor: {filterSponsor === 'all' ? 'All Sponsors' : sponsors.find(s => s.id === filterSponsor)?.name || 'All'}</p>
                <p>Date Range: {filterDateRange === 'all' ? 'All Time' : filterDateRange}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
            <Button onClick={() => setShowFilterDialog(false)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MediaGallery;
