import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Page
import LandingPage from './src/pages/LandingPage.jsx';

// Main App Layout
import AppLayout from './src/components/AppLayout.jsx';

// Dashboard Pages
import Dashboard from './src/pages/Dashboard.jsx';

// Domains & Assets
import AddDomain from './src/pages/AddDomain.jsx';
import MyDomains from './src/pages/MyDomains.jsx';

// Integrations
import Integrations from './src/pages/Integrations.jsx';

// External Scans (Frontend Only)
import RunNewScan from './src/pages/RunNewScan.jsx';
import ScanResults from './src/pages/ScanResults.jsx';
import DNSHealth from './src/pages/DNSHealth.jsx';
import SSLAnalysis from './src/pages/SSLAnalysis.jsx';
import OpenPorts from './src/pages/OpenPorts.jsx';
import ShodanExposure from './src/pages/ShodanExposure.jsx';
import ScanHistory from './src/pages/ScanHistory.jsx';

// Internal Assessment
import StartAssessment from './src/pages/StartAssessment.jsx';
import AssessmentProgress from './src/pages/AssessmentProgress.jsx';
import AssessmentHistory from './src/pages/AssessmentHistory.jsx';

// AI & Recommendations (Frontend Only)
import RiskScore from './src/pages/RiskScore.jsx';
import TopVulnerabilities from './src/pages/TopVulnerabilities.jsx';
import RemediationGuides from './src/pages/RemediationGuides.jsx';
import ActionPlan from './src/pages/ActionPlan.jsx';

// Security Connectors (Frontend Only)
import Microsoft365Setup from './src/pages/Microsoft365Setup.jsx';
import GoogleWorkspaceSetup from './src/pages/GoogleWorkspaceSetup.jsx';
import ConnectionStatus from './src/pages/ConnectionStatus.jsx';

// Reports (Frontend Only)
import GenerateReport from './src/pages/GenerateReport.jsx';
import DownloadHistory from './src/pages/DownloadHistory.jsx';

// Settings
import OrganizationProfile from './src/pages/OrganizationProfile.jsx';
import NotificationSettings from './src/pages/NotificationSettings.jsx';
import CloudIntegrationManagement from './src/pages/CloudIntegrationManagement.jsx';

// Admin Console
import AdminLayout from './src/components/AdminLayout.jsx';
import AllClients from './src/pages/AllClients.jsx';
import ClientDetails from './src/pages/ClientDetails.jsx';
import PlatformHealth from './src/pages/PlatformHealth.jsx';

import NotFound from './src/pages/NotFound.jsx';

export default function App() {
  return (
    <Theme appearance="light" radius="medium" scaling="100%">
      <Router basename="/Startup-Build-V1">
        <main className="min-h-screen bg-cream-50 text-charcoal">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Main App Routes */}
            <Route path="/app" element={<AppLayout />}>
              {/* Dashboard */}
              <Route index element={<Dashboard />} />

              {/* Domains & Assets */}
              <Route path="add-domain" element={<AddDomain />} />
              <Route path="my-domains" element={<MyDomains />} />

              {/* Integrations */}
              <Route path="integrations" element={<Integrations />} />

              {/* External Scans */}
              <Route path="run-new-scan" element={<RunNewScan />} />
              <Route path="scan-results" element={<ScanResults />} />
              <Route path="dns-health" element={<DNSHealth />} />
              <Route path="ssl-analysis" element={<SSLAnalysis />} />
              <Route path="open-ports" element={<OpenPorts />} />
              <Route path="shodan-exposure" element={<ShodanExposure />} />
              <Route path="scan-history" element={<ScanHistory />} />

              {/* Internal Assessment */}
              <Route path="start-assessment" element={<StartAssessment />} />
              <Route path="assessment-progress" element={<AssessmentProgress />} />
              <Route path="assessment-history" element={<AssessmentHistory />} />

              {/* AI & Recommendations */}
              <Route path="risk-score" element={<RiskScore />} />
              <Route path="top-vulnerabilities" element={<TopVulnerabilities />} />
              <Route path="remediation-guides" element={<RemediationGuides />} />
              <Route path="action-plan" element={<ActionPlan />} />

              {/* Security Connectors */}
              <Route path="microsoft365-setup" element={<Microsoft365Setup />} />
              <Route path="google-workspace-setup" element={<GoogleWorkspaceSetup />} />
              <Route path="connection-status" element={<ConnectionStatus />} />

              {/* Reports */}
              <Route path="generate-report" element={<GenerateReport />} />
              <Route path="download-history" element={<DownloadHistory />} />

              {/* Settings */}
              <Route path="organization-profile" element={<OrganizationProfile />} />
              <Route path="notification-settings" element={<NotificationSettings />} />
              <Route path="cloud-integration-management" element={<CloudIntegrationManagement />} />
            </Route>

            {/* Admin Console */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AllClients />} />
              <Route path="client-details/:id" element={<ClientDetails />} />
              <Route path="platform-health" element={<PlatformHealth />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="light"
          />
        </main>
      </Router>
    </Theme>
  );
}