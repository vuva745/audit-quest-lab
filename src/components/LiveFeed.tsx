import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface FeedItem {
  time: string;
  text: string;
  type: "info" | "success" | "warning";
}

const initialFeed: FeedItem[] = [
  { time: "14:02", text: "Block #4553 verified – 312 UID matches found", type: "success" },
  { time: "13:56", text: "Escrow release #124 approved = €46000", type: "success" },
  { time: "13:48", text: "New notary file uploaded signature validated", type: "info" },
  { time: "13:22", text: "System check passed hash integrity OK", type: "success" }
];

export const LiveFeed = () => {
  const [feed, setFeed] = useState<FeedItem[]>(initialFeed);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
      
      const messages = [
        "New scan verified in Amsterdam",
        "Blockchain sync completed",
        "Payment batch processed",
        "Security check passed"
      ];
      
      const newItem: FeedItem = {
        time: newTime,
        text: messages[Math.floor(Math.random() * messages.length)],
        type: Math.random() > 0.5 ? "success" : "info"
      };

      setFeed(prev => [newItem, ...prev.slice(0, 3)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      {feed.map((item, i) => (
        <div 
          key={`${item.time}-${i}`} 
          className="text-sm border-l-2 border-primary/50 pl-3 py-1 animate-fade-in hover:border-primary transition-all"
        >
          <span className="text-primary font-mono">[{item.time}]</span>
          <span className="text-muted-foreground ml-2">{item.text}</span>
        </div>
      ))}
    </div>
  );
};
