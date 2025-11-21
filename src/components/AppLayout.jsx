import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Shield, BarChart3, Zap, Globe, Cloud, Search, ClipboardList,
  Bot, Link as LinkIcon, FileText, Settings, Menu, X, Bell, User,
  ChevronDown, ChevronRight
} from 'lucide-react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    domains: false,
    integrations: false,
    scans: false,
    assessment: false,
    ai: false,
    connectors: false,
    reports: false
  });
  const location = useLocation();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigation = [
    {
      name: 'Domains & Assets',
      key: 'domains',
      icon: Globe,
      items: [
        { name: 'Add Domain', href: '/app/add-domain', icon: Globe },
        { name: 'My Domains', href: '/app/my-domains', icon: Globe }
      ]
    },
    {
      name: 'Integrations',
      key: 'integrations',
      icon: Cloud,
      items: [
        { name: 'All Integrations', href: '/app/integrations', icon: Cloud },
        { name: 'Asset Discovery Dashboard', href: '/app/asset-discovery-dashboard', icon: Search }
      ]
    },
    {
      name: 'External Scans',
      key: 'scans',
      icon: Search,
      items: [
        { name: 'Run New Scan', href: '/app/run-new-scan', icon: Search },
        { name: 'Scan Results', href: '/app/scan-results', icon: FileText },
        { name: 'DNS Health', href: '/app/dns-health', icon: Globe },
        { name: 'SSL/TLS Analysis', href: '/app/ssl-analysis', icon: Shield },
        { name: 'Open Ports & Services', href: '/app/open-ports', icon: Search },
        { name: 'Shodan Exposure', href: '/app/shodan-exposure', icon: Search },
        { name: 'Scan History', href: '/app/scan-history', icon: FileText }
      ]
    },
    {
      name: 'Internal Assessment',
      key: 'assessment',
      icon: ClipboardList,
      items: [
        { name: 'Start Assessment', href: '/app/start-assessment', icon: ClipboardList },
        { name: 'Assessment Progress', href: '/app/assessment-progress', icon: BarChart3 },
        { name: 'Assessment History', href: '/app/assessment-history', icon: FileText }
      ]
    },
    {
      name: 'AI & Recommendations',
      key: 'ai',
      icon: Bot,
      items: [
        { name: 'Risk Score', href: '/app/risk-score', icon: BarChart3 },
        { name: 'Top 5 Vulnerabilities', href: '/app/top-vulnerabilities', icon: Shield },
        { name: 'Remediation Guides', href: '/app/remediation-guides', icon: FileText },
        { name: 'Action Plan', href: '/app/action-plan', icon: ClipboardList }
      ]
    },
    {
      name: 'Security Connectors',
      key: 'connectors',
      icon: LinkIcon,
      items: [
        { name: 'Microsoft 365 Setup', href: '/app/microsoft365-setup', icon: LinkIcon },
        { name: 'Google Workspace Setup', href: '/app/google-workspace-setup', icon: LinkIcon },
        { name: 'Connection Status', href: '/app/connection-status', icon: BarChart3 }
      ]
    },
    {
      name: 'Reports',
      key: 'reports',
      icon: FileText,
      items: [
        { name: 'Generate Report', href: '/app/generate-report', icon: FileText },
        { name: 'Download History', href: '/app/download-history', icon: FileText }
      ]
    }
  ];

  const settingsItems = [
    { name: 'Organization Profile', href: '/app/organization-profile', icon: User },
    { name: 'Notifications', href: '/app/notification-settings', icon: Bell },
    { name: 'Cloud Integration Management', href: '/app/cloud-integration-management', icon: Cloud }
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-warm-grey transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-warm-grey">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-sage-500" />
            <span className="text-xl font-bold text-charcoal">Startup</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {/* Dashboard - Direct Link */}
          <Link
            to="/app"
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/app'
                ? 'bg-sage-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          {/* Other Navigation Sections */}
          {navigation.map((section) => (
            <div key={section.key}>
              <button
                onClick={() => toggleSection(section.key)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <section.icon className="w-4 h-4" />
                  <span>{section.name}</span>
                </div>
                {expandedSections[section.key] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedSections[section.key] && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === item.href
                        ? 'bg-sage-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Settings Section */}
          <div className="pt-4 border-t border-warm-grey">
            <button
              onClick={() => toggleSection('settings')}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
              {expandedSections.settings ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedSections.settings && (
              <div className="ml-6 mt-1 space-y-1">
                {settingsItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors ${location.pathname === item.href
                      ? 'bg-sage-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-warm-grey">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-400 hover:text-gray-500 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SH</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Shing Hei</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;