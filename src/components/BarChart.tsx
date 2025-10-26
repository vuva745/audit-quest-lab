import { cn } from "@/lib/utils";

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  className?: string;
  height?: number;
  showValues?: boolean;
}

export const BarChart = ({ 
  data, 
  className, 
  height = 200,
  showValues = true 
}: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const bars = data.map((item, index) => {
    const barHeight = ((item.value - minValue) / range) * 100;
    const barWidth = 100 / data.length;
    const x = index * barWidth;
    
    return {
      ...item,
      barHeight,
      barWidth,
      x,
      color: item.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`
    };
  });

  return (
    <div className={cn("w-full", className)}>
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Horizontal grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => (
          <line
            key={percent}
            x1="0"
            y1={`${percent}%`}
            x2="100%"
            y2={`${percent}%`}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}

        {/* Bars */}
        {bars.map((bar, index) => (
          <g key={index}>
            {/* Bar */}
            <rect
              x={`${bar.x}%`}
              y={`${100 - bar.barHeight}%`}
              width={`${bar.barWidth * 0.8}%`}
              height={`${bar.barHeight}%`}
              fill={bar.color}
              opacity="0.8"
              className="transition-all duration-300 hover:opacity-100"
            />
            
            {/* Value labels */}
            {showValues && (
              <text
                x={`${bar.x + bar.barWidth * 0.4}%`}
                y={`${100 - bar.barHeight - 2}%`}
                textAnchor="middle"
                className="text-xs fill-current font-medium"
                opacity="0.8"
              >
                {bar.value.toLocaleString()}
              </text>
            )}
            
            {/* Label */}
            <text
              x={`${bar.x + bar.barWidth * 0.4}%`}
              y="100%"
              textAnchor="middle"
              className="text-xs fill-current opacity-60"
              dy="1.2em"
            >
              {bar.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
