import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { cn } from '@/lib/utils';

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

interface RealWorldMapProps {
  locations: Location[];
  className?: string;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const RealWorldMap = ({ locations, className }: RealWorldMapProps) => {
  const colorClasses = {
    primary: "fill-primary",
    success: "fill-green-500",
    warning: "fill-yellow-500", 
    danger: "fill-red-500"
  };

  const getMarkerSize = (activity: number) => {
    return Math.max(4, Math.min(10, activity / 8));
  };

  const getConnectionStatus = (lastActivity: string) => {
    if (lastActivity === "Loading...") return "connecting";
    const now = new Date();
    const lastTime = new Date(`2000-01-01 ${lastActivity}`);
    const diffMinutes = (now.getTime() - lastTime.getTime()) / (1000 * 60);
    return diffMinutes < 1 ? "connected" : "disconnected";
  };

  return (
    <div className={cn("relative w-full h-80 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700", className)}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20]
        }}
        width={500}
        height={300}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#f8fafc"
                  stroke="#e2e8f0"
                  strokeWidth={1}
                  style={{
                    default: {
                      fill: "#f8fafc",
                      stroke: "#e2e8f0",
                      strokeWidth: 1,
                      outline: "none",
                    },
                    hover: {
                      fill: "#e2e8f0",
                      stroke: "#cbd5e1",
                      strokeWidth: 1.5,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#cbd5e1",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          
          {/* Real location markers */}
          {locations.map((location, index) => {
            const markerSize = getMarkerSize(location.activity);
            const connectionStatus = getConnectionStatus(location.lastActivity || "");
            
            return (
              <Marker
                key={index}
                coordinates={[location.x, location.y]}
              >
                <g className="group cursor-pointer">
                  {/* Pulse animation */}
                  <circle
                    r={markerSize * 1.8}
                    fill={location.color === "success" ? "#059669" : 
                          location.color === "warning" ? "#d97706" : 
                          location.color === "danger" ? "#dc2626" : "#2563eb"}
                    opacity={0.2}
                    className="animate-ping"
                  />
                  
                  {/* Outer ring for better visibility */}
                  <circle
                    r={markerSize + 1.5}
                    fill="none"
                    stroke={location.color === "success" ? "#059669" : 
                            location.color === "warning" ? "#d97706" : 
                            location.color === "danger" ? "#dc2626" : "#2563eb"}
                    strokeWidth={2}
                    opacity={0.6}
                  />
                  
                  {/* Main marker */}
                  <circle
                    r={markerSize}
                    fill={location.color === "success" ? "#059669" : 
                          location.color === "warning" ? "#d97706" : 
                          location.color === "danger" ? "#dc2626" : "#2563eb"}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:scale-125 drop-shadow-lg"
                  />
                  
                  {/* Activity percentage text */}
                  <text
                    x={0}
                    y={2}
                    textAnchor="middle"
                    fontSize="7"
                    fill="#ffffff"
                    fontWeight="700"
                    stroke="#000000"
                    strokeWidth="0.3"
                    className="pointer-events-none"
                  >
                    {location.activity}%
                  </text>
                  
                  {/* Connection status indicator */}
                  <circle
                    r={2.5}
                    fill={connectionStatus === "connected" ? "#059669" : 
                          connectionStatus === "connecting" ? "#d97706" : "#dc2626"}
                    cx={markerSize + 2.5}
                    cy={-markerSize - 2.5}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className={connectionStatus === "connecting" ? "animate-pulse" : ""}
                  />
                  
                  {/* Tooltip */}
                  <foreignObject
                    x={markerSize + 6}
                    y={-markerSize - 6}
                    width="220"
                    height="140"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm shadow-xl">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-bold text-base">
                          <div className={cn(
                            "w-3 h-3 rounded-full border-2 border-white shadow-md",
                            location.color === "success" ? "bg-green-600" : 
                            location.color === "warning" ? "bg-yellow-600" : 
                            location.color === "danger" ? "bg-red-600" : "bg-blue-600"
                          )} />
                          {location.name}
                        </div>
                        {location.country && (
                          <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                            {location.country}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Activity:</span>
                            <span className="font-bold text-lg">{location.activity}%</span>
                          </div>
                          {location.scans && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 dark:text-gray-400 font-medium">Scans:</span>
                              <span className="font-bold">{location.scans.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Last:</span>
                            <span className="font-bold">{location.lastActivity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Status:</span>
                            <span className={cn(
                              "font-bold text-xs px-2 py-1 rounded-full",
                              connectionStatus === "connected" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                              connectionStatus === "connecting" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            )}>
                              {connectionStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Enhanced Legend */}
      <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm shadow-xl">
        <div className="space-y-2">
          <div className="font-bold text-sm text-gray-800 dark:text-gray-200">Activity Levels</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-md" />
              <span className="font-bold text-gray-800 dark:text-gray-200">High (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-600 border-2 border-white shadow-md" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Medium (60-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow-md" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Low (&lt;60%)</span>
            </div>
          </div>
          <div className="font-bold text-sm text-gray-800 dark:text-gray-200 mt-3">Connection Status</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-md" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-600 border-2 border-white shadow-md animate-pulse" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Connecting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow-md" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Disconnected</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Real-time indicator */}
      <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-sm shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse border-2 border-white shadow-md" />
          <span className="font-bold text-gray-800 dark:text-gray-200">LIVE</span>
        </div>
      </div>
      
    </div>
  );
};
