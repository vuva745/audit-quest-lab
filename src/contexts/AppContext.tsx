import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Language types
export type Language = 'en' | 'es' | 'fr' | 'de';

// Language translations
export const translations = {
  en: {
    dashboard: 'Dashboard',
    overview: 'Overview',
    winners: 'Winners & Prizes',
    escrow: 'Escrow Payments',
    notary: 'Notary Verification',
    financial: 'Financial Overview',
    security: 'Security Logs',
    media: 'Media & Proof Gallery',
    dataBridge: 'Sponsor Data Bridge',
    settings: 'Settings',
    totalRevenue: 'Total Revenue',
    activeCampaigns: 'Active Campaigns',
    verifiedWinners: 'Verified Winners',
    pendingPayments: 'Pending Payments',
    liveData: 'Live Data',
    generateReport: 'Generate Report',
    exportData: 'Export Data',
    syncData: 'Sync Data',
    refresh: 'Refresh',
    view: 'View',
    download: 'Download',
    upload: 'Upload',
    filter: 'Filter',
    search: 'Search',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info'
  },
  es: {
    dashboard: 'Panel de Control',
    overview: 'Resumen',
    winners: 'Ganadores y Premios',
    escrow: 'Pagos en Custodia',
    notary: 'Verificación Notarial',
    financial: 'Resumen Financiero',
    security: 'Registros de Seguridad',
    media: 'Galería de Medios y Pruebas',
    dataBridge: 'Puente de Datos del Patrocinador',
    settings: 'Configuración',
    totalRevenue: 'Ingresos Totales',
    activeCampaigns: 'Campañas Activas',
    verifiedWinners: 'Ganadores Verificados',
    pendingPayments: 'Pagos Pendientes',
    liveData: 'Datos en Vivo',
    generateReport: 'Generar Informe',
    exportData: 'Exportar Datos',
    syncData: 'Sincronizar Datos',
    refresh: 'Actualizar',
    view: 'Ver',
    download: 'Descargar',
    upload: 'Subir',
    filter: 'Filtrar',
    search: 'Buscar',
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    loading: 'Cargando...',
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información'
  },
  fr: {
    dashboard: 'Tableau de Bord',
    overview: 'Aperçu',
    winners: 'Gagnants et Prix',
    escrow: 'Paiements en Escrow',
    notary: 'Vérification Notariale',
    financial: 'Aperçu Financier',
    security: 'Journaux de Sécurité',
    media: 'Galerie Médias et Preuves',
    dataBridge: 'Pont de Données du Sponsor',
    settings: 'Paramètres',
    totalRevenue: 'Revenus Totaux',
    activeCampaigns: 'Campagnes Actives',
    verifiedWinners: 'Gagnants Vérifiés',
    pendingPayments: 'Paiements en Attente',
    liveData: 'Données en Direct',
    generateReport: 'Générer un Rapport',
    exportData: 'Exporter les Données',
    syncData: 'Synchroniser les Données',
    refresh: 'Actualiser',
    view: 'Voir',
    download: 'Télécharger',
    upload: 'Téléverser',
    filter: 'Filtrer',
    search: 'Rechercher',
    save: 'Enregistrer',
    cancel: 'Annuler',
    close: 'Fermer',
    loading: 'Chargement...',
    success: 'Succès',
    error: 'Erreur',
    warning: 'Avertissement',
    info: 'Information'
  },
  de: {
    dashboard: 'Dashboard',
    overview: 'Übersicht',
    winners: 'Gewinner und Preise',
    escrow: 'Escrow-Zahlungen',
    notary: 'Notarielle Verifizierung',
    financial: 'Finanzübersicht',
    security: 'Sicherheitsprotokolle',
    media: 'Medien- und Beweisgalerie',
    dataBridge: 'Sponsor-Datenbrücke',
    settings: 'Einstellungen',
    totalRevenue: 'Gesamteinnahmen',
    activeCampaigns: 'Aktive Kampagnen',
    verifiedWinners: 'Verifizierte Gewinner',
    pendingPayments: 'Ausstehende Zahlungen',
    liveData: 'Live-Daten',
    generateReport: 'Bericht Generieren',
    exportData: 'Daten Exportieren',
    syncData: 'Daten Synchronisieren',
    refresh: 'Aktualisieren',
    view: 'Anzeigen',
    download: 'Herunterladen',
    upload: 'Hochladen',
    filter: 'Filtern',
    search: 'Suchen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    close: 'Schließen',
    loading: 'Lädt...',
    success: 'Erfolg',
    error: 'Fehler',
    warning: 'Warnung',
    info: 'Information'
  }
};

// Context interfaces
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

// Create contexts
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Theme provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
  }, [theme]);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    
    // Also apply to body for better coverage
    document.body.classList.toggle('dark', resolvedTheme === 'dark');
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Debug log
    console.log('Theme applied:', { theme, resolvedTheme });
  }, [theme, resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Language provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('language', language);
    
    // Debug log
    console.log('Language changed to:', language);
  }, [language]);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hooks
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
