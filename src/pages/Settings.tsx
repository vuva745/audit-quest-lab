import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTheme, useLanguage } from "@/contexts/AppContext";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Monitor, 
  Key, 
  Eye, 
  EyeOff, 
  Download, 
  Trash2, 
  Save, 
  RefreshCw,
  Mail,
  Smartphone,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  CheckCircle
} from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    autoSave: true,
    notifications: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    apiKeyRotation: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    marketingEmails: false,
    
    // Data & Privacy Settings
    dataRetention: 365,
    analyticsTracking: true,
    crashReporting: true,
    dataExport: true,
    
    // System Settings
    autoUpdates: true,
    debugMode: false,
    logLevel: "info",
    cacheSize: 1000,
    maxConnections: 50
  });

  const sections = [
    { id: "general", name: "General", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "data", name: "Data & Privacy", icon: Database },
    { id: "system", name: "System", icon: Monitor }
  ];

  const handleSaveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Saving Settings...",
      description: "Please wait while we save your preferences",
    });
    
    setTimeout(() => {
      toast({
        title: t('success'),
        description: `Theme: ${theme}, Language: ${language}, Auto-save: ${settings.autoSave ? 'On' : 'Off'}, Notifications: ${settings.notifications ? 'On' : 'Off'}`,
      });
    }, 1500);
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to default values.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready in a few minutes.",
    });
  };

  const handleDeleteData = () => {
    toast({
      title: "Data Deletion Requested",
      description: "Data deletion request has been submitted for review.",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Connection Test",
      description: "Testing connection...",
    });
    
    setTimeout(() => {
      toast({
        title: "Connection Test Complete",
        description: "All connections are working properly.",
      });
    }, 2000);
  };

  const updateSetting = (key: string, value: any) => {
    if (key === 'theme') {
      setTheme(value);
      toast({
        title: t('success'),
        description: `Theme changed to ${value}. Check all dashboards!`,
        duration: 3000,
      });
    } else if (key === 'language') {
      setLanguage(value);
      const languages = { en: 'English', es: 'Spanish', fr: 'French', de: 'German' };
      toast({
        title: t('success'),
        description: `Language changed to ${languages[value as keyof typeof languages]}. All text will update!`,
        duration: 3000,
      });
    } else {
      setSettings(prev => ({ ...prev, [key]: value }));
      
      if (key === 'autoSave') {
        toast({
          title: value ? "Auto-save Enabled" : "Auto-save Disabled",
          description: value ? "Changes will be saved automatically" : "Manual saving required",
        });
      } else if (key === 'notifications') {
        toast({
          title: value ? "Notifications Enabled" : "Notifications Disabled",
          description: value ? "You'll receive system notifications" : "Notifications are now disabled",
        });
      }
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Appearance & Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
            <Select value={theme} onValueChange={(value) => updateSetting("theme", value)}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
                    Light
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-800 border border-gray-600"></div>
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-white to-gray-800 border border-gray-400"></div>
                    System
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full border-2 ${
                  theme === 'light' ? 'bg-white border-gray-400' :
                  theme === 'dark' ? 'bg-gray-800 border-gray-600' :
                  'bg-gradient-to-r from-white to-gray-800 border-gray-400'
                }`}
              />
              <p className="text-sm text-muted-foreground">
                {theme === 'system' 
                  ? 'Follows your system theme preference' 
                  : `Currently using ${theme} theme`}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="language" className="text-base font-medium">Language</Label>
            <Select value={language} onValueChange={(value) => updateSetting("language", value)}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇺🇸</span>
                    English
                  </div>
                </SelectItem>
                <SelectItem value="es">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇪🇸</span>
                    Spanish
                  </div>
                </SelectItem>
                <SelectItem value="fr">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇫🇷</span>
                    French
                  </div>
                </SelectItem>
                <SelectItem value="de">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇩🇪</span>
                    German
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {language === 'en' ? '🇺🇸' : 
                 language === 'es' ? '🇪🇸' : 
                 language === 'fr' ? '🇫🇷' : '🇩🇪'}
              </span>
              <p className="text-sm text-muted-foreground">
                Current language: {language === 'en' ? 'English' : 
                                 language === 'es' ? 'Spanish' : 
                                 language === 'fr' ? 'French' : 'German'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Auto-save changes</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save your changes every 30 seconds
              </p>
              {settings.autoSave && (
                <Badge variant="secondary" className="mt-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
            </div>
            <Switch 
              checked={settings.autoSave} 
              onCheckedChange={(checked) => updateSetting("autoSave", checked)} 
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
            <div className="space-y-1">
              <Label className="text-base font-medium">Enable notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive system notifications and alerts
              </p>
              {settings.notifications && (
                <Badge variant="secondary" className="mt-2">
                  <Bell className="w-3 h-3 mr-1" />
                  Enabled
                </Badge>
              )}
            </div>
            <Switch 
              checked={settings.notifications} 
              onCheckedChange={(checked) => updateSetting("notifications", checked)} 
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-12 justify-start"
            onClick={() => {
              // Cycle through themes
              const themes = ['light', 'dark', 'system'] as const;
              const currentIndex = themes.indexOf(theme);
              const nextTheme = themes[(currentIndex + 1) % themes.length];
              setTheme(nextTheme);
              toast({
                title: "Theme Changed",
                description: `Switched to ${nextTheme} theme. Check all dashboards!`,
                duration: 3000,
              });
            }}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Cycle Theme ({theme})
          </Button>
          
          <Button 
            variant="outline" 
            className="h-12 justify-start"
            onClick={() => {
              // Cycle through languages
              const languages = ['en', 'es', 'fr', 'de'] as const;
              const currentIndex = languages.indexOf(language);
              const nextLanguage = languages[(currentIndex + 1) % languages.length];
              setLanguage(nextLanguage);
              const langNames = { en: 'English', es: 'Spanish', fr: 'French', de: 'German' };
              toast({
                title: "Language Changed",
                description: `Switched to ${langNames[nextLanguage]}. All text will update!`,
                duration: 3000,
              });
            }}
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Cycle Language ({language})
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch 
              checked={settings.twoFactorAuth} 
              onCheckedChange={(checked) => updateSetting("twoFactorAuth", checked)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input 
              id="sessionTimeout"
              type="number" 
              value={settings.sessionTimeout} 
              onChange={(e) => updateSetting("sessionTimeout", parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
            <Input 
              id="passwordExpiry"
              type="number" 
              value={settings.passwordExpiry} 
              onChange={(e) => updateSetting("passwordExpiry", parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">API Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>API Key Rotation</Label>
              <p className="text-sm text-muted-foreground">Automatically rotate API keys</p>
            </div>
            <Switch 
              checked={settings.apiKeyRotation} 
              onCheckedChange={(checked) => updateSetting("apiKeyRotation", checked)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Current API Key</Label>
            <div className="flex items-center gap-2">
              <Input 
                type={showApiKey ? "text" : "password"} 
                value="sk-1234567890abcdef1234567890abcdef" 
                readOnly 
                className="font-mono"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Key className="w-4 h-4 mr-2" />
              Generate New Key
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Keys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <Switch 
              checked={settings.emailNotifications} 
              onCheckedChange={(checked) => updateSetting("emailNotifications", checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on mobile</p>
              </div>
            </div>
            <Switch 
              checked={settings.pushNotifications} 
              onCheckedChange={(checked) => updateSetting("pushNotifications", checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive SMS notifications</p>
              </div>
            </div>
            <Switch 
              checked={settings.smsNotifications} 
              onCheckedChange={(checked) => updateSetting("smsNotifications", checked)} 
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Notification Types</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Alerts</Label>
              <p className="text-sm text-muted-foreground">Important system notifications</p>
            </div>
            <Switch 
              checked={settings.systemAlerts} 
              onCheckedChange={(checked) => updateSetting("systemAlerts", checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Product updates and promotions</p>
            </div>
            <Switch 
              checked={settings.marketingEmails} 
              onCheckedChange={(checked) => updateSetting("marketingEmails", checked)} 
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
            <Input 
              id="dataRetention"
              type="number" 
              value={settings.dataRetention} 
              onChange={(e) => updateSetting("dataRetention", parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Analytics Tracking</Label>
              <p className="text-sm text-muted-foreground">Allow usage analytics collection</p>
            </div>
            <Switch 
              checked={settings.analyticsTracking} 
              onCheckedChange={(checked) => updateSetting("analyticsTracking", checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Crash Reporting</Label>
              <p className="text-sm text-muted-foreground">Send crash reports for debugging</p>
            </div>
            <Switch 
              checked={settings.crashReporting} 
              onCheckedChange={(checked) => updateSetting("crashReporting", checked)} 
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Data Export & Deletion</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Data Export</Label>
              <p className="text-sm text-muted-foreground">Enable data export functionality</p>
            </div>
            <Switch 
              checked={settings.dataExport} 
              onCheckedChange={(checked) => updateSetting("dataExport", checked)} 
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            <Button variant="destructive" onClick={handleDeleteData}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete My Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Updates</Label>
              <p className="text-sm text-muted-foreground">Automatically install updates</p>
            </div>
            <Switch 
              checked={settings.autoUpdates} 
              onCheckedChange={(checked) => updateSetting("autoUpdates", checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Debug Mode</Label>
              <p className="text-sm text-muted-foreground">Enable detailed logging</p>
            </div>
            <Switch 
              checked={settings.debugMode} 
              onCheckedChange={(checked) => updateSetting("debugMode", checked)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logLevel">Log Level</Label>
            <Select value={settings.logLevel} onValueChange={(value) => updateSetting("logLevel", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Performance Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cacheSize">Cache Size (MB)</Label>
            <Input 
              id="cacheSize"
              type="number" 
              value={settings.cacheSize} 
              onChange={(e) => updateSetting("cacheSize", parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxConnections">Max Connections</Label>
            <Input 
              id="maxConnections"
              type="number" 
              value={settings.maxConnections} 
              onChange={(e) => updateSetting("maxConnections", parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Wifi className="w-5 h-5 text-green-500" />
              <span className="font-medium">Network</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <span className="text-sm text-muted-foreground">87ms latency</span>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <HardDrive className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Healthy
              </Badge>
              <span className="text-sm text-muted-foreground">2.3GB used</span>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-5 h-5 text-purple-500" />
              <span className="font-medium">CPU</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Normal
              </Badge>
              <span className="text-sm text-muted-foreground">45% usage</span>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <MemoryStick className="w-5 h-5 text-orange-500" />
              <span className="font-medium">Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Good
              </Badge>
              <span className="text-sm text-muted-foreground">1.2GB used</span>
            </div>
          </Card>
        </div>
        
        <div className="mt-4">
          <Button variant="outline" onClick={handleTestConnection}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Test All Connections
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "notifications":
        return renderNotificationSettings();
      case "data":
        return renderDataSettings();
      case "system":
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences and configurations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="p-4 h-fit">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{section.name}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {renderContent()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export { SettingsPage as Settings };