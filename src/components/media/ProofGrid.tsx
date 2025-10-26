import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FileImage, Video, FileText, CheckCircle, XCircle, Download, Eye, Calendar, MapPin, Smartphone, Hash } from 'lucide-react';

interface Proof {
  id: string;
  campaign: string;
  sponsor: string;
  type: 'image' | 'video' | 'document';
  url: string;
  verified: boolean;
  timestamp: string;
  metadata: {
    device: string;
    location: string;
    hash: string;
  };
}

interface ProofGridProps {
  proofs: Proof[];
  className?: string;
}

export const ProofGrid: React.FC<ProofGridProps> = ({ proofs, className }) => {
  const [selectedProof, setSelectedProof] = useState<Proof | null>(null);
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending'>('all');

  const filteredProofs = proofs.filter(proof => {
    if (filter === 'verified') return proof.verified;
    if (filter === 'pending') return !proof.verified;
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <FileImage className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <FileImage className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'text-blue-400';
      case 'video': return 'text-cyan-400';
      case 'document': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Proof Gallery</h3>
          <p className="text-sm text-gray-400">Media verification and blockchain anchoring</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 rounded-lg p-1">
            {(['all', 'verified', 'pending'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className={`text-xs ${
                  filter === filterType 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {filterType === 'all' ? 'All' : 
                 filterType === 'verified' ? 'Verified' : 'Pending'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <FileImage className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Total Proofs</span>
          </div>
          <div className="text-2xl font-bold text-white">{proofs.length}</div>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Verified</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {proofs.filter(p => p.verified).length}
          </div>
        </div>
        
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Pending</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {proofs.filter(p => !p.verified).length}
          </div>
        </div>
      </div>

      {/* Proof Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProofs.map((proof) => (
          <div
            key={proof.id}
            className={`group relative overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg cursor-pointer ${
              proof.verified
                ? 'border-green-500/50 bg-green-900/10 hover:border-green-400 hover:shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                : 'border-yellow-500/50 bg-yellow-900/10 hover:border-yellow-400 hover:shadow-[0_0_12px_rgba(234,179,8,0.3)]'
            }`}
            onClick={() => setSelectedProof(proof)}
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-slate-800 relative overflow-hidden">
              {proof.type === 'image' ? (
                <img
                  src={proof.url}
                  alt={proof.campaign}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM2NjYiLz4KPHN2ZyB4PSIxODAiIHk9IjEzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJTNi40OCAyMiAxMiAyMlMyMiAxNy41MiAyMiAxMlMxNy41MiAyIDEyIDJaTTEzIDE3SDExVjE1SDEzVjE3Wk0xMyAxM0gxMVY3SDEzVjEzWiIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4KPC9zdmc+';
                  }}
                />
              ) : proof.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-700">
                  <Video className="w-12 h-12 text-cyan-400" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-700">
                  <FileText className="w-12 h-12 text-green-400" />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                {proof.verified ? (
                  <Badge className="bg-green-900/80 text-green-400 border-green-500/50">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-900/80 text-yellow-400 border-yellow-500/50">
                    <XCircle className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {getTypeIcon(proof.type)}
                <span className={`text-sm font-medium ${getTypeColor(proof.type)}`}>
                  {proof.type.toUpperCase()}
                </span>
              </div>
              
              <h4 className="text-white font-semibold mb-1 truncate">{proof.campaign}</h4>
              <p className="text-sm text-gray-400 mb-2">{proof.sponsor}</p>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(proof.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proof Detail Dialog */}
      <Dialog open={!!selectedProof} onOpenChange={() => setSelectedProof(null)}>
        <DialogContent className="max-w-4xl bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              {selectedProof && getTypeIcon(selectedProof.type)}
              Proof Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Media verification and blockchain information
            </DialogDescription>
          </DialogHeader>
          
          {selectedProof && (
            <div className="space-y-6">
              {/* Media Display */}
              <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden">
                {selectedProof.type === 'image' ? (
                  <img
                    src={selectedProof.url}
                    alt={selectedProof.campaign}
                    className="w-full h-full object-cover"
                  />
                ) : selectedProof.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-16 h-16 text-cyan-400" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-16 h-16 text-green-400" />
                  </div>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Campaign Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Campaign:</span>
                      <span className="text-white">{selectedProof.campaign}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sponsor:</span>
                      <span className="text-white">{selectedProof.sponsor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className={getTypeColor(selectedProof.type)}>
                        {selectedProof.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={selectedProof.verified ? 'text-green-400' : 'text-yellow-400'}>
                        {selectedProof.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Metadata</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Device:</span>
                      <span className="text-white">{selectedProof.metadata.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{selectedProof.metadata.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Hash:</span>
                      <span className="text-white font-mono text-xs">
                        {selectedProof.metadata.hash}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">Timestamp:</span>
                      <span className="text-white">{formatDate(selectedProof.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    View on Chain
                  </Button>
                </div>
                
                <div className="text-sm text-gray-400">
                  Proof ID: {selectedProof.id}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};
