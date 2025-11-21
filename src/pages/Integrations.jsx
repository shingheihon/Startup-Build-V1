import React, { useState } from 'react';
import { Cloud, Link as LinkIcon, CheckCircle, AlertCircle, ExternalLink, Settings } from 'lucide-react';

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState(['aws', 'microsoft365']);

  const cloudIntegrations = [
    {
      id: 'aws',
      name: 'AWS Integration',
      description: 'Connect your AWS account to discover EC2 instances, Elastic IPs, and Route53 domains',
      icon: '🟠',
      category: 'Cloud Asset Discovery',
      features: ['EC2 Instances', 'Elastic IPs', 'Route53 Domains', 'Auto-discovery'],
      status: connectedIntegrations.includes('aws') ? 'connected' : 'available'
    },
    {
      id: 'azure',
      name: 'Azure Integration',
      description: 'Connect your Azure subscription to discover VMs, Public IPs, and DNS zones',
      icon: '🔵',
      category: 'Cloud Asset Discovery',
      features: ['Virtual Machines', 'Public IPs', 'DNS Zones', 'Resource Groups'],
      status: connectedIntegrations.includes('azure') ? 'connected' : 'available'
    },
    {
      id: 'gcp',
      name: 'Google Cloud Integration',
      description: 'Connect your GCP project to discover Compute Engine instances and Cloud DNS',
      icon: '🟢',
      category: 'Cloud Asset Discovery',
      features: ['Compute Engine', 'Cloud DNS', 'External IPs', 'Projects'],
      status: connectedIntegrations.includes('gcp') ? 'connected' : 'available'
    }
  ];

  const securityConnectors = [
    {
      id: 'microsoft365',
      name: 'Microsoft 365 Connector',
      description: 'Connect to Microsoft 365 to auto-fill security assessment answers',
      icon: '🔷',
      category: 'Cloud Security',
      features: ['Security Policies', 'User Management', 'Compliance Data', 'Auto-fill'],
      status: connectedIntegrations.includes('microsoft365') ? 'connected' : 'available'
    },
    {
      id: 'googleworkspace',
      name: 'Google Workspace Connector',
      description: 'Connect to Google Workspace for security configuration insights',
      icon: '🟡',
      category: 'Cloud Security',
      features: ['Admin Console', 'Security Settings', 'User Policies', 'Auto-fill'],
      status: connectedIntegrations.includes('googleworkspace') ? 'connected' : 'available'
    }
  ];

  const externalAPIs = [
    {
      id: 'shodan',
      name: 'Shodan API Connector',
      description: 'Connect to Shodan for internet-wide device and service discovery',
      icon: '🔍',
      category: 'External Security APIs',
      features: ['Device Discovery', 'Service Scanning', 'Vulnerability Data', 'Exposure Analysis'],
      status: connectedIntegrations.includes('shodan') ? 'connected' : 'available'
    },
    {
      id: 'ssllabs',
      name: 'SSL Labs Connector',
      description: 'Connect to SSL Labs for comprehensive SSL/TLS certificate analysis',
      icon: '🔒',
      category: 'External Security APIs',
      features: ['SSL Testing', 'Certificate Analysis', 'Configuration Review', 'Grade Reports'],
      status: connectedIntegrations.includes('ssllabs') ? 'connected' : 'available'
    }
  ];

  const allIntegrations = [...cloudIntegrations, ...securityConnectors, ...externalAPIs];

  const handleConnect = (integrationId) => {
    if (connectedIntegrations.includes(integrationId)) {
      setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
    } else {
      setConnectedIntegrations(prev => [...prev, integrationId]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'available': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'available': return <LinkIcon className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const connectedCount = connectedIntegrations.length;
  const availableCount = allIntegrations.length - connectedCount;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal flex items-center">
          <Cloud className="w-8 h-8 text-sage-500 mr-3" />
          Integrations
        </h1>
        <p className="text-gray-600 mt-2">
          Connect your cloud accounts and security tools to automate asset discovery and security assessments.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected</p>
              <p className="text-3xl font-bold text-green-600">{connectedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-3xl font-bold text-blue-600">{availableCount}</p>
            </div>
            <LinkIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Available</p>
              <p className="text-3xl font-bold text-charcoal">{allIntegrations.length}</p>
            </div>
            <Cloud className="w-8 h-8 text-sage-500" />
          </div>
        </div>
      </div>

      {/* Cloud Asset Discovery */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <h2 className="text-xl font-semibold text-charcoal mb-4">Cloud Asset Discovery</h2>
        <p className="text-gray-600 mb-6">
          Connect your cloud accounts to automatically discover and monitor your infrastructure assets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cloudIntegrations.map((integration) => (
            <div key={integration.id} className="border border-warm-grey rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h3 className="font-semibold text-charcoal">{integration.name}</h3>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(integration.status)}`}>
                      {getStatusIcon(integration.status)}
                      <span className="capitalize">{integration.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-charcoal mb-2">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConnect(integration.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    integration.status === 'connected'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-sage-500 text-white hover:bg-sage-600'
                  }`}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
                {integration.status === 'connected' && (
                  <button className="px-3 py-2 border border-warm-grey text-charcoal rounded-lg hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Security Connectors */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <h2 className="text-xl font-semibold text-charcoal mb-4">Cloud Security Connectors</h2>
        <p className="text-gray-600 mb-6">
          Connect your productivity suites to automatically populate security assessment answers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityConnectors.map((integration) => (
            <div key={integration.id} className="border border-warm-grey rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h3 className="font-semibold text-charcoal">{integration.name}</h3>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(integration.status)}`}>
                      {getStatusIcon(integration.status)}
                      <span className="capitalize">{integration.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-charcoal mb-2">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConnect(integration.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    integration.status === 'connected'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-sage-500 text-white hover:bg-sage-600'
                  }`}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
                {integration.status === 'connected' && (
                  <button className="px-3 py-2 border border-warm-grey text-charcoal rounded-lg hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Security APIs */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <h2 className="text-xl font-semibold text-charcoal mb-4">External Security APIs</h2>
        <p className="text-gray-600 mb-6">
          Connect to external security services for enhanced scanning and analysis capabilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {externalAPIs.map((integration) => (
            <div key={integration.id} className="border border-warm-grey rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h3 className="font-semibold text-charcoal">{integration.name}</h3>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(integration.status)}`}>
                      {getStatusIcon(integration.status)}
                      <span className="capitalize">{integration.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-charcoal mb-2">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConnect(integration.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    integration.status === 'connected'
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-sage-500 text-white hover:bg-sage-600'
                  }`}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </button>
                {integration.status === 'connected' && (
                  <button className="px-3 py-2 border border-warm-grey text-charcoal rounded-lg hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Benefits */}
      <div className="bg-gradient-to-r from-sage-50 to-blue-50 border border-sage-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Why Connect Integrations?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-charcoal mb-2">Automatic Discovery</h3>
            <p className="text-sm text-gray-600">
              No manual asset entry required. Automatically discover and monitor all your cloud resources.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-charcoal mb-2">Implicit Verification</h3>
            <p className="text-sm text-gray-600">
              OAuth connections prove ownership, eliminating the need for manual domain verification.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-charcoal mb-2">Auto-Fill Assessments</h3>
            <p className="text-sm text-gray-600">
              Security connectors automatically populate assessment answers based on your actual configurations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;