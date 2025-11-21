import React, { useState } from 'react';
import { Cloud, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

const AzureConnection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showMockConsent, setShowMockConsent] = useState(false);

  const handleConnect = () => {
    setShowMockConsent(true);
  };

  const handleMockConsent = async (approved) => {
    setShowMockConsent(false);
    if (approved) {
      setIsConnecting(true);
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsConnecting(false);
      setIsConnected(true);
    }
  };

  const discoveredAssets = [
    { type: 'Virtual Machine', name: 'web-vm-prod', resourceGroup: 'production-rg', publicIp: '20.123.45.67' },
    { type: 'Virtual Machine', name: 'api-vm-prod', resourceGroup: 'production-rg', publicIp: '20.123.45.68' },
    { type: 'Virtual Machine', name: 'db-vm-prod', resourceGroup: 'production-rg', publicIp: '20.123.45.69' },
    { type: 'Public IP', name: 'web-public-ip', resourceGroup: 'production-rg', publicIp: '20.123.45.70' },
    { type: 'Public IP', name: 'api-public-ip', resourceGroup: 'production-rg', publicIp: '20.123.45.71' },
    { type: 'DNS Zone', name: 'startup.com', resourceGroup: 'dns-rg', publicIp: 'N/A' },
    { type: 'DNS Zone', name: 'api.startup.com', resourceGroup: 'dns-rg', publicIp: 'N/A' },
    { type: 'Application Gateway', name: 'startup-appgw', resourceGroup: 'production-rg', publicIp: '20.123.45.72' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal flex items-center">
          <Cloud className="w-8 h-8 text-blue-500 mr-3" />
          Azure Integration
        </h1>
        <p className="text-gray-600 mt-2">
          Connect your Azure account to automatically discover and scan your cloud assets.
        </p>
      </div>

      {!isConnected ? (
        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="text-center py-8">
            <Cloud className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-charcoal mb-4">Connect Your Azure Account</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Securely connect your Azure account using OAuth to automatically discover Virtual Machines, 
              Public IPs, and DNS Zones. This provides implicit verification that you own these assets.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-green-800 mb-2">Benefits of Azure Integration:</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>✅ Zero manual entry required</li>
                <li>✅ Automatic asset discovery (no missing systems)</li>
                <li>✅ Implicit domain verification (OAuth proves ownership)</li>
                <li>✅ Automatic cleanup (removes assets no longer owned)</li>
                <li>✅ Real-time asset updates</li>
              </ul>
            </div>

            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors font-medium"
            >
              {isConnecting ? 'Connecting...' : 'Connect Azure Account'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="bg-white rounded-lg border border-warm-grey p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <h2 className="text-lg font-semibold text-charcoal">Azure Account Connected</h2>
                  <p className="text-sm text-gray-600">Subscription: startup-production (12345678-1234-1234-1234-123456789012)</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last synced: 2 minutes ago</p>
                <p className="text-sm text-gray-600">Next sync: in 58 minutes</p>
              </div>
            </div>
          </div>

          {/* Auto-Discovered Assets */}
          <div className="bg-white rounded-lg border border-warm-grey p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-charcoal">Auto-Discovered Assets</h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {discoveredAssets.length} assets found
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-grey">
                    <th className="text-left py-3 px-4 font-medium text-charcoal">Asset Type</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal">Resource Group</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal">Public IP</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {discoveredAssets.map((asset, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Cloud className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{asset.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{asset.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{asset.resourceGroup}</td>
                      <td className="py-3 px-4 text-sm font-mono">{asset.publicIp}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Auto-scanned
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Asset Lifecycle Tracking */}
          <div className="bg-white rounded-lg border border-warm-grey p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">Asset Lifecycle Tracking</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800">Active Assets</h3>
                <p className="text-2xl font-bold text-blue-600">{discoveredAssets.length}</p>
                <p className="text-sm text-blue-600">Currently monitored</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800">New This Week</h3>
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-sm text-green-600">Recently added</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800">Decommissioned</h3>
                <p className="text-2xl font-bold text-gray-600">1</p>
                <p className="text-sm text-gray-600">Auto-removed</p>
              </div>
            </div>
          </div>

          {/* Connection Management */}
          <div className="bg-white rounded-lg border border-warm-grey p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">Connection Management</h2>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Sync Now
              </button>
              <button className="px-4 py-2 border border-warm-grey text-charcoal rounded-lg hover:bg-gray-50 transition-colors">
                View Permissions
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mock OAuth Consent Screen */}
      {showMockConsent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <Cloud className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-charcoal">Azure Authorization</h2>
                <p className="text-gray-600 mt-2">Startup wants to access your Azure account</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-charcoal mb-2">This app will be able to:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Read Virtual Machine information</li>
                  <li>• Read Public IP addresses</li>
                  <li>• Read DNS Zone records</li>
                  <li>• View resource tags and metadata</li>
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleMockConsent(false)}
                  className="flex-1 px-4 py-2 border border-warm-grey text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleMockConsent(true)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Authorize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AzureConnection;