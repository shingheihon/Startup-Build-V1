import React, { useState } from 'react';
import { Globe, Plus, Search, Eye, Trash2, RefreshCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyDomains = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const domains = [
    {
      id: 1,
      domain: 'startup.com',
      status: 'active',
      lastScan: '2 hours ago',
      riskScore: 78,
      issues: 2,
      sslStatus: 'valid',
      dnsHealth: 'good',
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      domain: 'api.startup.com',
      status: 'active',
      lastScan: '2 hours ago',
      riskScore: 45,
      issues: 5,
      sslStatus: 'expired',
      dnsHealth: 'warning',
      addedDate: '2024-01-15'
    },
    {
      id: 3,
      domain: 'blog.startup.com',
      status: 'scanning',
      lastScan: 'In progress',
      riskScore: null,
      issues: 0,
      sslStatus: 'unknown',
      dnsHealth: 'unknown',
      addedDate: '2024-01-20'
    },
    {
      id: 4,
      domain: 'old.startup.com',
      status: 'inactive',
      lastScan: '30 days ago',
      riskScore: 23,
      issues: 12,
      sslStatus: 'invalid',
      dnsHealth: 'critical',
      addedDate: '2023-12-01'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'scanning': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'scanning': return <Clock className="w-4 h-4" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getRiskScoreColor = (score) => {
    if (!score) return 'text-gray-400';
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || domain.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalDomains = domains.length;
  const activeDomains = domains.filter(d => d.status === 'active').length;
  const totalIssues = domains.reduce((sum, d) => sum + d.issues, 0);
  const avgRiskScore = Math.round(
    domains.filter(d => d.riskScore).reduce((sum, d) => sum + d.riskScore, 0) / 
    domains.filter(d => d.riskScore).length
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal flex items-center">
          <Globe className="w-8 h-8 text-sage-500 mr-3" />
          My Domains
        </h1>
        <p className="text-gray-600 mt-2">
          Manage and monitor all your domains in one place.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Domains</p>
              <p className="text-3xl font-bold text-charcoal">{totalDomains}</p>
            </div>
            <Globe className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Domains</p>
              <p className="text-3xl font-bold text-green-600">{activeDomains}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Risk Score</p>
              <p className={`text-3xl font-bold ${getRiskScoreColor(avgRiskScore)}`}>
                {avgRiskScore || '--'}
              </p>
            </div>
            <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{avgRiskScore || '--'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-3xl font-bold text-red-600">{totalIssues}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-warm-grey rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-warm-grey rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scanning">Scanning</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <Link
            to="/app/add-domain"
            className="inline-flex items-center px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Domain
          </Link>
        </div>
      </div>

      {/* Domains Table */}
      <div className="bg-white rounded-lg border border-warm-grey overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-grey bg-gray-50">
                <th className="text-left py-3 px-6 font-medium text-charcoal">Domain</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Status</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Risk Score</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Issues</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">SSL Status</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">DNS Health</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Last Scan</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains.map((domain) => (
                <tr key={domain.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-charcoal">{domain.domain}</div>
                      <div className="text-sm text-gray-600">Added {domain.addedDate}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(domain.status)}`}>
                      {getStatusIcon(domain.status)}
                      <span className="capitalize">{domain.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {domain.riskScore ? (
                      <span className={`font-bold ${getRiskScoreColor(domain.riskScore)}`}>
                        {domain.riskScore}/100
                      </span>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {domain.issues > 0 ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        {domain.issues} issues
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        No issues
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-medium ${getHealthColor(domain.sslStatus === 'valid' ? 'good' : domain.sslStatus === 'expired' ? 'critical' : 'warning')}`}>
                      {domain.sslStatus === 'valid' ? '✓ Valid' : 
                       domain.sslStatus === 'expired' ? '✗ Expired' :
                       domain.sslStatus === 'invalid' ? '✗ Invalid' : '? Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-medium ${getHealthColor(domain.dnsHealth)}`}>
                      {domain.dnsHealth === 'good' ? '✓ Good' :
                       domain.dnsHealth === 'warning' ? '⚠ Warning' :
                       domain.dnsHealth === 'critical' ? '✗ Critical' : '? Unknown'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{domain.lastScan}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                        title="Rescan"
                        disabled={domain.status === 'scanning'}
                      >
                        <RefreshCw className={`w-4 h-4 ${domain.status === 'scanning' ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDomains.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No domains found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first domain.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/app/add-domain"
                className="inline-flex items-center px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Domain
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h3 className="font-semibold text-charcoal mb-4">Domains Needing Attention</h3>
          <div className="space-y-3">
            {domains.filter(d => d.issues > 0).slice(0, 3).map(domain => (
              <div key={domain.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">{domain.domain}</div>
                  <div className="text-sm text-red-600">{domain.issues} issues found</div>
                </div>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Fix →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h3 className="font-semibold text-charcoal mb-4">Recent Scans</h3>
          <div className="space-y-3">
            {domains.filter(d => d.status === 'active').slice(0, 3).map(domain => (
              <div key={domain.id} className="text-sm">
                <div className="font-medium">{domain.domain}</div>
                <div className="text-gray-600">Scanned {domain.lastScan}</div>
                <div className={`text-xs ${getRiskScoreColor(domain.riskScore)}`}>
                  Score: {domain.riskScore}/100
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h3 className="font-semibold text-charcoal mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/app/add-domain"
              className="block w-full px-4 py-2 bg-sage-500 text-white text-center rounded-lg hover:bg-sage-600 transition-colors"
            >
              Add New Domain
            </Link>
            <Link
              to="/app/run-new-scan"
              className="block w-full px-4 py-2 border border-sage-500 text-sage-500 text-center rounded-lg hover:bg-sage-50 transition-colors"
            >
              Run Bulk Scan
            </Link>
            <Link
              to="/app/generate-report"
              className="block w-full px-4 py-2 border border-warm-grey text-charcoal text-center rounded-lg hover:bg-gray-50 transition-colors"
            >
              Generate Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDomains;