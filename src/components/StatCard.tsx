import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: string;
  className?: string;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, className = "" }: StatCardProps) => {
  return (
    <Card className={`p-6 border-cyan-500/30 bg-card/50 backdrop-blur hover:border-cyan-400/60 hover:scale-105 transition-all duration-300 border-glow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-cyan-400 mb-1 text-neon">{value}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && <p className="text-xs text-success mt-2 flex items-center gap-1 text-neon-success">{trend}</p>}
        </div>
        {Icon && (
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-colors neon-glow-sm">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
        )}
      </div>
    </Card>
  );
};
