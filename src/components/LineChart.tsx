import { cn } from "@/lib/utils";

interface LineChartProps {
  data: number[];
  labels: string[];
  className?: string;
  height?: number;
  showDots?: boolean;
}

export const LineChart = ({ 
  data, 
  labels, 
  className, 
  height = 200,
  showDots = true 
}: LineChartProps) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return { x, y, value };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className={cn("relative", className)} style={{ height }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.1" opacity="0.3"/>
          </pattern>
          
          {/* Neon glow filters */}
          <filter id="neon-glow-primary" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="neon-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Line with neon glow */}
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          filter="url(#neon-glow-primary)"
        />
        
        {/* Dots with neon glow */}
        {showDots && points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill="hsl(var(--primary))"
            filter="url(#neon-glow-strong)"
            className="animate-pulse"
          />
        ))}
      </svg>
      
      {/* Labels with subtle glow */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground mt-2">
        {labels.map((label, index) => (
          <span key={index} className="text-center text-neon-sm">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
