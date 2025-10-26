// Export utilities for Audit Dashboard
export interface ExportData {
  timestamp: string;
  type: 'overview' | 'security' | 'media' | 'bridge';
  data: any;
  metadata: {
    totalRecords: number;
    exportedBy: string;
    systemInfo: {
      networkHealth: number;
      uptime: number;
      lastSync: string;
    };
  };
}

export const exportToCSV = (data: any[], filename: string): void => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Headers
    headers.map(header => `"${header}"`).join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle nested objects and arrays
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const exportToJSON = (data: ExportData, filename: string): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const exportToTXT = (data: any[], filename: string, title: string): void => {
  const txtContent = [
    `=== ${title.toUpperCase()} EXPORT ===`,
    `Export Date: ${new Date().toLocaleString()}`,
    `Total Records: ${data.length}`,
    ``,
    `=== DATA ===`,
    ...data.map((item, index) => {
      const lines = [`Record ${index + 1}:`];
      Object.entries(item).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          lines.push(`  ${key}: ${JSON.stringify(value, null, 2).replace(/\n/g, '\n    ')}`);
        } else {
          lines.push(`  ${key}: ${value}`);
        }
      });
      return lines.join('\n');
    })
  ].join('\n');

  const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.txt`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// QA Logging utilities
export const logAuditEvent = (event: string, data: any, level: 'info' | 'warn' | 'error' = 'info'): void => {
  console.groupCollapsed('Audit Event');
  console.log(`[${level.toUpperCase()}] ${event}:`, data);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.groupEnd();
};

export const logSecurityEvent = (event: string, data: any): void => {
  console.groupCollapsed('Security Event');
  console.log(`[SECURITY] ${event}:`, data);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`User Agent: ${navigator.userAgent}`);
  console.log(`URL: ${window.location.href}`);
  console.groupEnd();
};

export const logDataFlow = (from: string, to: string, data: any): void => {
  console.groupCollapsed('Data Flow');
  console.log(`[FLOW] ${from} → ${to}:`, data);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Data Size: ${JSON.stringify(data).length} bytes`);
  console.groupEnd();
};

// Utility for creating export data structure
export const createExportData = (
  type: ExportData['type'],
  data: any[],
  systemInfo: ExportData['metadata']['systemInfo']
): ExportData => {
  return {
    timestamp: new Date().toISOString(),
    type,
    data,
    metadata: {
      totalRecords: data.length,
      exportedBy: 'Audit Dashboard System',
      systemInfo
    }
  };
};
