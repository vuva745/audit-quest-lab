import { cn } from "@/lib/utils";

interface Location {
  name: string;
  x: number; // longitude
  y: number; // latitude
  activity: number;
  color: "primary" | "success" | "warning" | "danger";
  scans?: number;
  lastActivity?: string;
  country?: string;
  timezone?: string;
}

interface WorldMapProps {
  locations: Location[];
  className?: string;
}

export const WorldMap = ({ locations, className }: WorldMapProps) => {
  const colorClasses = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning", 
    danger: "bg-danger"
  };

  // Convert longitude/latitude to percentage coordinates
  const convertCoordinates = (lon: number, lat: number) => {
    const x = ((lon + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  // Calculate connection status
  const getConnectionStatus = (lastActivity: string) => {
    if (lastActivity === "Loading...") return "connecting";
    const now = new Date();
    const lastTime = new Date(`2000-01-01 ${lastActivity}`);
    const diffMinutes = (now.getTime() - lastTime.getTime()) / (1000 * 60);
    return diffMinutes < 1 ? "connected" : "disconnected";
  };

  return (
    <div className={cn("relative w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg overflow-hidden", className)}>
      {/* Enhanced world map representation */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* North America */}
          <path
            d="M20 40 L60 35 L80 45 L85 60 L75 80 L50 85 L30 75 L15 60 Z"
            fill="hsl(var(--muted-foreground))"
            opacity="0.4"
          />
          {/* South America */}
          <path
            d="M70 85 L85 80 L90 100 L85 120 L75 125 L65 120 L60 100 Z"
            fill="hsl(var(--muted-foreground))"
            opacity="0.4"
          />
          {/* Europe */}
          <path
            d="M180 35 L200 30 L220 35 L225 50 L220 65 L200 70 L185 65 L175 50 Z"
            fill="hsl(var(--muted-foreground))"
            opacity="0.4"
          />
          {/* Africa */}
          <path
            d="M190 60 L210 55 L220 70 L215 100 L205 110 L195 105 L185 90 L180 70 Z"
            fill="hsl(var(--muted-foreground))"
            opacity="0.4"
          />
          {/* Asia */}
          <path
            d="M220 25 L280 20 L320 30 L330 50 L325 70 L300 80 L250 75 L230 60 L225 40 Z"
            fill="hsl(var(--muted-foreground))"
            opacity="0.4"
          />
          {/* Australia */}
          <path
            d="M300 120 L330 115 L340 130 L335 145 L320 150 L305 145 L295 130 Z"
            fill="hsl(var(--muted-foreground))"
            opacity="0.4"
          />
        </svg>
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Longitude lines */}
          {[0, 25, 50, 75, 100].map(x => (
            <line key={x} x1={x * 4} y1="0" x2={x * 4} y2="200" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          ))}
          {/* Latitude lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y * 2} x2="400" y2={y * 2} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          ))}
        </svg>
      </div>
      
      {/* Location markers */}
      {locations.map((location, index) => {
        const { x, y } = convertCoordinates(location.x, location.y);
        const markerSize = Math.max(8, Math.min(20, location.activity / 5));
        const connectionStatus = getConnectionStatus(location.lastActivity || "");
        
        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-20">
              <div className={cn("w-full h-full rounded-full", colorClasses[location.color])} />
            </div>
            
            {/* Main marker */}
            <div
              className={cn(
                "rounded-full border-2 border-background shadow-lg transition-all duration-300 hover:scale-125 relative",
                colorClasses[location.color]
              )}
              style={{
                width: `${markerSize}px`,
                height: `${markerSize}px`,
              }}
            >
              {/* Connection status indicator */}
              <div className={cn(
                "absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center",
                connectionStatus === "connected" ? "bg-green-500" : 
                connectionStatus === "connecting" ? "bg-yellow-500 animate-pulse" : "bg-red-500"
              )}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            
            {/* Enhanced tooltip */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border border-primary/30 rounded-lg px-3 py-2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-10 min-w-[200px]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <div className={cn("w-2 h-2 rounded-full", colorClasses[location.color])} />
                  {location.name}
                </div>
                {location.country && (
                  <div className="text-muted-foreground text-xs">
                    {location.country}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Activity:</span>
                  <span className="font-semibold">{location.activity}%</span>
                </div>
                {location.scans && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Scans:</span>
                    <span className="font-semibold">{location.scans.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Last:</span>
                  <span className="font-semibold">{location.lastActivity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={cn(
                    "font-semibold text-xs px-1 py-0.5 rounded",
                    connectionStatus === "connected" ? "bg-green-100 text-green-800" :
                    connectionStatus === "connecting" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  )}>
                    {connectionStatus}
                  </span>
                </div>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-card border-l border-t border-primary/30 rotate-45" />
            </div>
          </div>
        );
      })}
      
      {/* Enhanced Legend */}
      <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 text-xs">
        <div className="space-y-1">
          <div className="font-semibold text-xs">Activity Levels</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>High (80%+)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span>Medium (60-80%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-danger" />
              <span>Low (&lt;60%)</span>
            </div>
          </div>
          <div className="font-semibold text-xs mt-2">Connection Status</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Connected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Connecting</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Disconnected</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Real-time indicator */}
      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg px-2 py-1 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-semibold">Live</span>
        </div>
      </div>
    </div>
  );
};
