import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: "primary" | "success" | "warning" | "danger";
}

export const ProgressBar = ({ 
  value, 
  max = 100, 
  className, 
  showLabel = false, 
  label,
  color = "primary" 
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    primary: "bg-primary neon-glow-sm",
    success: "bg-success neon-glow-sm", 
    warning: "bg-warning neon-glow-sm",
    danger: "bg-danger neon-glow-sm"
  };

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="text-foreground font-medium">{value}%</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden border-glow">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
