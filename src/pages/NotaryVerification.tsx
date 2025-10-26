import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, CheckCircle2, Shield, Download, Eye, X, Loader2, FileImage, File, AlertCircle, Calendar, User, Hash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";

export const NotaryVerification = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for dialogs and upload
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showUploadResultsDialog, setShowUploadResultsDialog] = useState(false);
  const [showChainCertificateDialog, setShowChainCertificateDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingCertificate, setIsLoadingCertificate] = useState(false);
  const [uploadResults, setUploadResults] = useState<any>(null);
  const [chainCertificate, setChainCertificate] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<any>(null);

  // Real-time data state
  const [notaryStats, setNotaryStats] = useState({
    totalDocuments: 4,
    verifiedDocuments: 4,
    pendingDocuments: 0,
    rejectedDocuments: 0,
    integrityScore: 100,
    lastVerification: new Date().toISOString(),
    blockchainHeight: Math.floor(Math.random() * 100000) + 25000,
    hashMismatches: 0,
    nextDeclaration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });

  // Document data state with real-time updates
  const [documents, setDocuments] = useState([
    { id: "Declaration-AX4.pdf", notarized: "12:30204 16 22", icon: "📝", status: "verified", uploadedOn: "2024-10-14 16:20", hash: `SHA256:${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}` },
    { id: "IOU-Wilson.pdf", notarized: "12:30204 16 22", icon: "⚖️", status: "verified", uploadedOn: "2024-10-14 16:20", hash: `SHA256:${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}` },
    { id: "Proof-OR-182.png", notarized: "12:30204 16 22", icon: "🖼️", status: "verified", uploadedOn: "2024-10-14 16:20", hash: `SHA256:${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}` },
    { id: "Escrow-Batch&.pdf", notarized: "12:30204 16 23", icon: "📄", status: "verified", uploadedOn: "2024-10-14 16:23", hash: `SHA256:${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}` }
  ]);

  // Real-time updates effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Update blockchain height
      setNotaryStats(prev => ({
        ...prev,
        blockchainHeight: prev.blockchainHeight + Math.floor(Math.random() * 3) + 1,
        lastVerification: new Date().toISOString()
      }));

      // Occasionally add new documents or update status
      if (Math.random() < 0.1) { // 10% chance every update
        const newDocument = {
          id: `Document-${Date.now()}.pdf`,
          notarized: new Date().toLocaleTimeString().replace(':', ':').replace(':', ':'),
          icon: Math.random() > 0.5 ? "📄" : "📝",
          status: "verified",
          uploadedOn: new Date().toLocaleString(),
          hash: `SHA256:${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}`
        };

        setDocuments(prev => [newDocument, ...prev]);
        setNotaryStats(prev => ({
          ...prev,
          totalDocuments: prev.totalDocuments + 1,
          verifiedDocuments: prev.verifiedDocuments + 1
        }));
      }

      // Update integrity score slightly
      setNotaryStats(prev => ({
        ...prev,
        integrityScore: Math.min(100, Math.max(95, prev.integrityScore + (Math.random() - 0.5) * 2))
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Button handlers
  const handleUploadNew = () => {
    setShowUploadDialog(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const executeUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setShowUploadDialog(false);
    setUploadProgress(0);
    
    toast({
      title: "Uploading Document",
      description: `Processing ${selectedFile.name}...`,
    });
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    // Simulate upload completion
    setTimeout(() => {
      const documentId = `${selectedFile.name.split('.')[0]}-${Date.now()}`;
      const notarizedTime = new Date().toLocaleTimeString().replace(':', ':').replace(':', ':');
      
      const results = {
        id: documentId,
        filename: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        timestamp: new Date().toISOString(),
        notarized: notarizedTime,
        status: "verified",
        hash: `SHA256:${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}`,
        blockchainAnchor: `Block #${Math.floor(Math.random() * 100000) + 25000}`,
        verification: {
          method: "AI Legal Validator",
          confidence: Math.floor(Math.random() * 10) + 90, // 90-99%
          algorithm: "Advanced Document Integrity Check",
          timestamp: new Date().toISOString()
        },
        metadata: {
          uploadedBy: "System Administrator",
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent: "Notary Upload System v2.1",
          location: "Kardiverse Ledger Authority"
        },
        audit: {
          verifiedBy: "AI Legal Validator",
          complianceCheck: "PASSED",
          riskAssessment: "LOW",
          integrityScore: 100,
          lastAudit: new Date().toISOString()
        }
      };
      
      setUploadResults(results);
      setIsUploading(false);
      setShowUploadResultsDialog(true);
      
      // Add new document to the list
      const newDocument = {
        id: documentId,
        notarized: notarizedTime,
        icon: selectedFile.type.includes('image') ? "🖼️" : selectedFile.type.includes('pdf') ? "📄" : "📝",
        status: "verified",
        uploadedOn: new Date().toLocaleString(),
        hash: results.hash
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      
      // Update real-time stats
      setNotaryStats(prev => ({
        ...prev,
        totalDocuments: prev.totalDocuments + 1,
        verifiedDocuments: prev.verifiedDocuments + 1,
        lastVerification: new Date().toISOString()
      }));
      
      toast({
        title: "Upload Complete",
        description: `Document ${selectedFile.name} has been notarized and verified`,
      });
      
      setSelectedFile(null);
      setUploadProgress(0);
    }, 3000);
  };

  const handleViewDocument = (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      setViewingDocument(doc);
      setShowViewDialog(true);
      
      toast({
        title: "Opening Document",
        description: `Loading document ${documentId} for viewing...`,
      });
    }
  };

  const handleDownloadDocument = (documentId: string) => {
    toast({
      title: "Downloading Document",
      description: `Preparing download for ${documentId}...`,
    });
    
    setTimeout(() => {
      const documentData = {
        id: documentId,
        notarized: "12:30204 16 22",
        timestamp: new Date().toISOString(),
        status: "verified"
      };
      
      const content = JSON.stringify(documentData, null, 2);
      const filename = `notary-document-${documentId}.json`;
      
      const blob = new Blob([content], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: `Document ${documentId} downloaded successfully`,
      });
    }, 2000);
  };

  const handleViewChainCertificate = () => {
    setIsLoadingCertificate(true);
    setShowChainCertificateDialog(true);
    
    toast({
      title: "Loading Chain Certificate",
      description: "Retrieving blockchain certificate data...",
    });
    
    // Simulate loading certificate data
    setTimeout(() => {
      const certificate = {
        id: `CERT-${Date.now()}`,
        timestamp: new Date().toISOString(),
        blockchain: {
          network: "Kardiverse Ledger",
          version: "2.1.0",
          blockHeight: notaryStats.blockchainHeight,
          blockHash: `0x${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}`,
          merkleRoot: `0x${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}`,
          timestamp: new Date().toISOString(),
          difficulty: "0x1a2b3c4d",
          nonce: Math.floor(Math.random() * 1000000)
        },
        notary: {
          authority: "Kardiverse Ledger Authority",
          patent: "#15",
          jurisdiction: "Digital Notary Services",
          license: "DNL-2024-001",
          validFrom: "2024-01-01T00:00:00Z",
          validUntil: "2025-12-31T23:59:59Z",
          publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${Math.random().toString(36).substr(2, 50)}
-----END PUBLIC KEY-----`
        },
        documents: documents.map(doc => ({
          id: doc.id,
          hash: `SHA256:${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}`,
          notarized: doc.notarized,
          status: doc.status,
          blockReference: `Block #${Math.floor(Math.random() * 1000) + 25000}`,
          timestamp: doc.uploadedOn
        })),
        verification: {
          algorithm: "SHA-256 + Merkle Tree",
          integrityScore: notaryStats.integrityScore,
          tamperDetection: "ACTIVE",
          lastVerified: notaryStats.lastVerification,
          verificationCount: Math.floor(Math.random() * 1000) + 500
        },
        compliance: {
          standard: "ISO/IEC 27001:2013",
          certification: "SOC 2 Type II",
          auditStatus: "COMPLIANT",
          lastAudit: "2024-09-15T10:30:00Z",
          nextAudit: "2025-03-15T10:30:00Z",
          riskLevel: "LOW"
        },
        metadata: {
          generatedBy: "Kardiverse Certificate Generator v2.1",
          generatedAt: new Date().toISOString(),
          certificateVersion: "2.1.0",
          signatureAlgorithm: "RSA-SHA256",
          signature: `-----BEGIN SIGNATURE-----
${Math.random().toString(36).substr(2, 100)}
-----END SIGNATURE-----`
        }
      };
      
      setChainCertificate(certificate);
      setIsLoadingCertificate(false);
      
      toast({
        title: "Certificate Loaded",
        description: "Blockchain chain certificate is now available for viewing",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary text-neon">Notary Verification</h1>
          <p className="text-muted-foreground">Certified Legal Proof Layer</p>
        </div>
        <div className="flex gap-3">
          <Card className="px-3 py-2 border-success/50 bg-success/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <p className="text-sm font-semibold text-success">LIVE</p>
            </div>
          </Card>
          <Card className="px-4 py-2 border-warning/50 bg-warning/10">
            <p className="text-sm font-semibold text-foreground">Certified by</p>
            <p className="text-sm text-warning">Kardiverse Ledger Authority – Patent #15</p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Weekly Notary Declaration</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Status</p>
              <StatusBadge status="verified" />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Uploaded On</p>
              <p className="text-foreground font-mono text-neon-sm">2024-10-14 16:20</p>
            </div>

            <Button 
              variant="default" 
              className="w-full mt-6"
              onClick={handleUploadNew}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading... {Math.round(uploadProgress)}%
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 border-primary/30 bg-card/50">
          <h2 className="text-xl font-semibold mb-4">Notarized Documents</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Document</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Notarized On</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Audit Package</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr key={i} className="border-b border-primary/20 hover:bg-primary/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-2xl">{doc.icon}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-foreground font-mono text-sm text-neon-sm">{doc.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-muted-foreground font-mono text-sm text-neon-sm">{doc.notarized}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleViewDocument(doc.id)}
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleDownloadDocument(doc.id)}
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 border-primary/30 bg-card/50">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Blockchain Validation</h2>
          </div>
          
          <div className="space-y-3">
            <Card className="p-3 border-success/50 bg-success/10">
              <p className="text-xs text-muted-foreground mb-1">Verification Status</p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold text-success">All Verified</span>
              </div>
            </Card>

            <Card className="p-3 border-primary/50 bg-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Hash Anchor</p>
              <p className="text-sm font-mono text-primary text-neon-sm">Block #{notaryStats.blockchainHeight.toLocaleString()}</p>
            </Card>

            <Card className="p-3 border-primary/50 bg-primary/10">
              <p className="text-xs text-muted-foreground mb-1">Integrity Score</p>
              <p className="text-2xl font-bold text-success text-neon-success">{Math.round(notaryStats.integrityScore)}%</p>
            </Card>
          </div>

          <Button 
            variant="default" 
            className="w-full mt-4"
            onClick={handleViewChainCertificate}
            disabled={isLoadingCertificate}
          >
            {isLoadingCertificate ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading Certificate...
              </>
            ) : (
              "View Chain Certificate"
            )}
          </Button>
        </Card>
      </div>

      <Card className="p-6 border-primary/30 bg-card/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-success/20 border border-success/50">
            <Shield className="w-8 h-8 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI Legal Validator</h2>
            <p className="text-sm text-muted-foreground">Automated integrity verification</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-success/50 bg-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success text-neon-success"><span className="text-neon-sm">{notaryStats.hashMismatches}</span> hash mismatches detected</p>
                <p className="text-xs text-muted-foreground mt-1">across <span className="text-neon-sm">{notaryStats.totalDocuments}</span> notarized files.</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-success/50 bg-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success text-neon-success">Next declaration due</p>
                <p className="text-xs text-muted-foreground mt-1 text-neon-sm">{new Date(notaryStats.nextDeclaration).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-success/50 bg-success/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-success">Certified Ledger Authority</p>
                <p className="text-xs text-muted-foreground mt-1">badge confirmed.</p>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Notary Document
            </DialogTitle>
            <DialogDescription>
              Upload a document to be notarized and verified by the AI Legal Validator
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* File Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Document</h3>
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
                {selectedFile ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      {selectedFile.type.includes('image') ? (
                        <FileImage className="w-12 h-12 text-primary" />
                      ) : (
                        <File className="w-12 h-12 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedFile(null)}>
                      <X className="w-4 h-4 mr-2" />
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="font-semibold">Choose a file to upload</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, PNG, JPG, DOC, DOCX files supported
                      </p>
                    </div>
                    <Button onClick={triggerFileInput}>
                      <Upload className="w-4 h-4 mr-2" />
                      Select File
                    </Button>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Upload Process Info */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Upload Process</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Document will be encrypted and stored securely</li>
                <li>• AI Legal Validator will verify document integrity</li>
                <li>• Blockchain hash will be generated and anchored</li>
                <li>• Notary certificate will be issued</li>
                <li>• Document will be added to the notarized registry</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={executeUpload}
              disabled={!selectedFile}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Upload & Notarize
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Results Dialog */}
      <Dialog open={showUploadResultsDialog} onOpenChange={setShowUploadResultsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Document Notarized Successfully - {uploadResults?.id}
            </DialogTitle>
            <DialogDescription>
              Document uploaded and verified on {uploadResults && new Date(uploadResults.timestamp).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          
          {uploadResults && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success text-neon-success">{uploadResults.verification.confidence}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary text-neon">{uploadResults.audit.integrityScore}%</div>
                  <div className="text-sm text-muted-foreground">Integrity</div>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning text-neon-warning">{uploadResults.blockchainAnchor}</div>
                  <div className="text-sm text-muted-foreground">Blockchain</div>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success text-neon-success">{uploadResults.status.toUpperCase()}</div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
              </div>

              {/* Document Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Document Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Filename:</span>
                    <p className="font-semibold">{uploadResults.filename}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Size:</span>
                    <p className="font-semibold">{(uploadResults.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <p className="font-semibold">{uploadResults.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Notarized:</span>
                    <p className="font-semibold">{uploadResults.notarized}</p>
                  </div>
                </div>
              </Card>

              {/* Verification Details */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Verification Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Method:</span>
                    <p className="font-semibold">{uploadResults.verification.method}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Algorithm:</span>
                    <p className="font-semibold">{uploadResults.verification.algorithm}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <p className="font-semibold text-success text-neon-success">{uploadResults.verification.confidence}%</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Timestamp:</span>
                    <p className="font-semibold text-neon-sm">{new Date(uploadResults.verification.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              {/* Blockchain Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Blockchain Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Document Hash:</span>
                    <p className="font-mono text-sm break-all bg-muted/50 p-2 rounded">
                      {uploadResults.hash}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Blockchain Anchor:</span>
                    <p className="font-semibold text-primary">{uploadResults.blockchainAnchor}</p>
                  </div>
                </div>
              </Card>

              {/* Metadata */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Upload Metadata
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Uploaded By:</span>
                    <p className="font-semibold">{uploadResults.metadata.uploadedBy}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Location:</span>
                    <p className="font-semibold">{uploadResults.metadata.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">IP Address:</span>
                    <p className="font-mono text-sm">{uploadResults.metadata.ipAddress}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">User Agent:</span>
                    <p className="font-semibold">{uploadResults.metadata.userAgent}</p>
                  </div>
                </div>
              </Card>

              {/* Audit Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Audit Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Verified By:</span>
                    <p className="font-semibold">{uploadResults.audit.verifiedBy}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Compliance:</span>
                    <p className="font-semibold text-success">{uploadResults.audit.complianceCheck}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Risk Level:</span>
                    <p className="font-semibold text-success">{uploadResults.audit.riskAssessment}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Last Audit:</span>
                    <p className="font-semibold">{new Date(uploadResults.audit.lastAudit).toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowUploadResultsDialog(false)}>
              Close
            </Button>
            <Button onClick={() => handleDownloadDocument(uploadResults?.id)}>
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chain Certificate Dialog */}
      <Dialog open={showChainCertificateDialog} onOpenChange={setShowChainCertificateDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Blockchain Chain Certificate - {chainCertificate?.id}
            </DialogTitle>
            <DialogDescription>
              Official blockchain certificate issued by Kardiverse Ledger Authority
            </DialogDescription>
          </DialogHeader>
          
          {isLoadingCertificate ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading blockchain certificate...</p>
              </div>
            </div>
          ) : chainCertificate ? (
            <div className="space-y-6">
              {/* Certificate Header */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-success/10 border-primary/30">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-primary mb-2">Blockchain Chain Certificate</h2>
                  <p className="text-lg text-muted-foreground">Kardiverse Ledger Authority</p>
                  <p className="text-sm text-muted-foreground">Patent #15 - Digital Notary Services</p>
                </div>
              </Card>

              {/* Blockchain Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Blockchain Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Network:</span>
                    <p className="font-semibold">{chainCertificate.blockchain.network}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Version:</span>
                    <p className="font-semibold">{chainCertificate.blockchain.version}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Block Height:</span>
                    <p className="font-semibold text-primary text-neon-sm">{chainCertificate.blockchain.blockHeight.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Block Hash:</span>
                    <p className="font-mono text-sm break-all bg-muted/50 p-2 rounded text-neon-sm">
                      {chainCertificate.blockchain.blockHash}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Merkle Root:</span>
                    <p className="font-mono text-sm break-all bg-muted/50 p-2 rounded text-neon-sm">
                      {chainCertificate.blockchain.merkleRoot}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Difficulty:</span>
                    <p className="font-mono text-sm text-neon-sm">{chainCertificate.blockchain.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Nonce:</span>
                    <p className="font-semibold text-neon-sm">{chainCertificate.blockchain.nonce.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Timestamp:</span>
                    <p className="font-semibold text-neon-sm">{new Date(chainCertificate.blockchain.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              {/* Notary Authority Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Notary Authority Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Authority:</span>
                    <p className="font-semibold">{chainCertificate.notary.authority}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Patent:</span>
                    <p className="font-semibold text-primary text-neon-sm">{chainCertificate.notary.patent}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Jurisdiction:</span>
                    <p className="font-semibold">{chainCertificate.notary.jurisdiction}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">License:</span>
                    <p className="font-semibold">{chainCertificate.notary.license}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Valid From:</span>
                    <p className="font-semibold">{new Date(chainCertificate.notary.validFrom).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Valid Until:</span>
                    <p className="font-semibold">{new Date(chainCertificate.notary.validUntil).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">Public Key:</span>
                  <div className="font-mono text-xs break-all bg-muted/50 p-3 rounded mt-2">
                    {chainCertificate.notary.publicKey}
                  </div>
                </div>
              </Card>

              {/* Document Registry */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Document Registry ({chainCertificate.documents.length} documents)
                </h3>
                <div className="space-y-3">
                  {chainCertificate.documents.map((doc: any, index: number) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold">{doc.id}</p>
                          <p className="text-sm text-muted-foreground text-neon-sm">Notarized: {doc.notarized}</p>
                          <p className="text-sm text-muted-foreground">Status: <span className="text-success text-neon-success">{doc.status}</span></p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Block Reference:</p>
                          <p className="font-semibold text-primary text-neon-sm">{doc.blockReference}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-muted-foreground">Document Hash:</span>
                        <p className="font-mono text-xs break-all bg-muted/50 p-2 rounded mt-1">
                          {doc.hash}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Verification & Compliance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Verification Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Algorithm:</span>
                      <p className="font-semibold">{chainCertificate.verification.algorithm}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Integrity Score:</span>
                      <p className="font-semibold text-success text-neon-success">{chainCertificate.verification.integrityScore.toFixed(2)}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Tamper Detection:</span>
                      <p className="font-semibold text-success text-neon-success">{chainCertificate.verification.tamperDetection}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Verification Count:</span>
                      <p className="font-semibold text-neon-sm">{chainCertificate.verification.verificationCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Last Verified:</span>
                      <p className="font-semibold text-neon-sm">{new Date(chainCertificate.verification.lastVerified).toLocaleString()}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Compliance Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Standard:</span>
                      <p className="font-semibold">{chainCertificate.compliance.standard}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Certification:</span>
                      <p className="font-semibold">{chainCertificate.compliance.certification}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Audit Status:</span>
                      <p className="font-semibold text-success text-neon-success">{chainCertificate.compliance.auditStatus}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Risk Level:</span>
                      <p className="font-semibold text-success text-neon-success">{chainCertificate.compliance.riskLevel}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Last Audit:</span>
                      <p className="font-semibold text-neon-sm">{new Date(chainCertificate.compliance.lastAudit).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Next Audit:</span>
                      <p className="font-semibold text-neon-sm">{new Date(chainCertificate.compliance.nextAudit).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Certificate Metadata */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Certificate Metadata
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Generated By:</span>
                    <p className="font-semibold">{chainCertificate.metadata.generatedBy}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Certificate Version:</span>
                    <p className="font-semibold text-neon-sm">{chainCertificate.metadata.certificateVersion}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Signature Algorithm:</span>
                    <p className="font-semibold text-neon-sm">{chainCertificate.metadata.signatureAlgorithm}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Generated At:</span>
                    <p className="font-semibold text-neon-sm">{new Date(chainCertificate.metadata.generatedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">Digital Signature:</span>
                  <div className="font-mono text-xs break-all bg-muted/50 p-3 rounded mt-2">
                    {chainCertificate.metadata.signature}
                  </div>
                </div>
              </Card>
            </div>
          ) : null}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowChainCertificateDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              if (chainCertificate) {
                const content = JSON.stringify(chainCertificate, null, 2);
                const filename = `chain-certificate-${chainCertificate.id}.json`;
                
                const blob = new Blob([content], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                
                toast({
                  title: "Certificate Downloaded",
                  description: "Blockchain chain certificate has been downloaded successfully",
                });
              }
            }}>
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Document Viewer - {viewingDocument?.id}
            </DialogTitle>
            <DialogDescription>
              View notarized document details and verification information
            </DialogDescription>
          </DialogHeader>
          
          {viewingDocument && (
            <div className="space-y-6">
              {/* Document Header */}
              <Card className="p-4 bg-primary/10 border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{viewingDocument.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{viewingDocument.id}</h3>
                    <p className="text-sm text-muted-foreground">Uploaded: {viewingDocument.uploadedOn}</p>
                  </div>
                  <StatusBadge status={viewingDocument.status} />
                </div>
              </Card>

              {/* Document Preview */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  Document Preview
                </h3>
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center bg-muted/20">
                  {viewingDocument.icon && (
                    <div className="text-6xl mb-4">{viewingDocument.icon}</div>
                  )}
                  <p className="text-lg font-semibold">{viewingDocument.id}</p>
                  <p className="text-sm text-muted-foreground mt-2">Document preview available in production</p>
                  <p className="text-xs text-muted-foreground mt-1">This document has been verified and notarized on the blockchain</p>
                </div>
              </Card>

              {/* Verification Information */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Verification Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                                      <div>
                      <span className="text-sm text-muted-foreground">Notarized On:</span>
                      <p className="font-semibold font-mono text-neon-sm">{viewingDocument.notarized}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <p className="font-semibold">
                        <span className={`text-${viewingDocument.status === 'verified' ? 'success text-neon-success' : 'warning text-neon-warning'}`}>
                          {viewingDocument.status.toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Document Hash:</span>
                      <p className="font-mono text-xs break-all bg-muted/50 p-2 rounded text-neon-sm">
                        {viewingDocument.hash}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Blockchain Height:</span>
                      <p className="font-semibold text-primary text-neon-sm">Block #{notaryStats.blockchainHeight.toLocaleString()}</p>
                    </div>
                </div>
              </Card>

              {/* Download Options */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleDownloadDocument(viewingDocument.id)}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Document
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const certData = {
                      documentId: viewingDocument.id,
                      notarized: viewingDocument.notarized,
                      hash: viewingDocument.hash,
                      status: viewingDocument.status,
                      blockchainHeight: notaryStats.blockchainHeight,
                      timestamp: viewingDocument.uploadedOn
                    };
                    
                    const content = JSON.stringify(certData, null, 2);
                    const filename = `notary-certificate-${viewingDocument.id}.json`;
                    
                    const blob = new Blob([content], { type: 'application/json' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    
                    toast({
                      title: "Certificate Downloaded",
                      description: "Notary certificate has been downloaded successfully",
                    });
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
