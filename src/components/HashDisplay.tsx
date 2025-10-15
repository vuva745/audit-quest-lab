import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HashDisplayProps {
  hash: string;
  short?: boolean;
}

export const HashDisplay = ({ hash, short = true }: HashDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const displayHash = short && hash.length > 20
    ? `${hash.slice(0, 6)}...${hash.slice(-4)}`
    : hash;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="text-primary">{displayHash}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={copyToClipboard}
      >
        {copied ? (
          <Check className="w-3 h-3 text-success" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </Button>
    </div>
  );
};
