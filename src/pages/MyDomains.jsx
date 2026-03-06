import React, { useState } from 'react';
import {
  Globe,
  Plus,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  Server,
  MoreVertical,
  Filter,
  ChevronDown,
  X,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyDomains = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVulnerabilities, setActiveVulnerabilities] = useState({ title: '', items: [] });

  const vulnerabilitiesData = {
    'startup.com': {
      high: [
        { id: 1, title: 'SQL Injection Vulnerability', description: 'Possible SQL injection in search parameters.', cve: 'CVE-2023-1234' },
        { id: 2, title: 'Insecure Header Configuration', description: 'Strict-Transport-Security header missing.', cve: 'N/A' }
      ],
      medium: [
        { id: 3, title: 'Outdated jQuery Version', description: 'Version 1.12.4 is outdated and has known cross-site scripting issues.', cve: 'CVE-2020-11022' },
        { id: 4, title: 'Cookie without Secure Flag', description: 'Session cookies do not have the Secure flag set.', cve: 'N/A' },
        { id: 5, title: 'X-Content-Type-Options Missing', description: 'The X-Content-Type-Options header is not set.', cve: 'N/A' }
      ]
    },
    'api.startup.com': {
      critical: [
        { id: 6, title: 'Remote Code Execution', description: 'Vulnerable endpoint allows arbitrary command execution.', cve: 'CVE-2024-0001' }
      ],
      high: [
        { id: 7, title: 'Exposed API Keys', description: 'API keys found in public-facing JS files.', cve: 'N/A' },
        { id: 8, title: 'Broken Object Level Authorization', description: 'Users can access other users records by guessing IDs.', cve: 'N/A' },
        { id: 9, title: 'Weak Password Hashing', description: 'MD5 used for password storage.', cve: 'N/A' },
        { id: 10, title: 'Unencrypted Sensitivity Data', description: 'Customer PII stored in plaintext.', cve: 'N/A' }
      ],
      medium: [
        { id: 11, title: 'CORS Misconfiguration', description: 'Overly permissive CORS policy allows cross-origin requests.', cve: 'N/A' },
        { id: 12, title: 'Rate Limiting Missing', description: 'API endpoints susceptible to brute force/DDoS.', cve: 'N/A' }
      ]
    },
    'old.startup.com': {
      critical: [
        { id: 13, title: 'Expired Certificate', description: 'Main SSL certificate has expired.', cve: 'N/A' },
        { id: 14, title: 'Backdoor Detected', description: 'Suspected malicious script in root directory.', cve: 'N/A' },
        { id: 15, title: 'Unauthorized Admin Access', description: 'Admin panel accessible without auth.', cve: 'N/A' }
      ],
      high: [
        { id: 16, title: 'Directory Traversal', description: 'Static files server allows access to system files.', cve: 'CVE-2023-5678' }
      ]
    }
  };

  const domains = [
    {
      id: 1,
      domain: 'startup.com',
      status: 'active',
      lastScan: '2 hours ago',
      riskScore: 78,
      criticalIssues: 0,
      highIssues: 2,
      mediumIssues: 3,
      sslStatus: 'valid',
      dnsHealth: 'good',
      uptime: 99.9,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      domain: 'api.startup.com',
      status: 'active',
      lastScan: '2 hours ago',
      riskScore: 45,
      criticalIssues: 1,
      highIssues: 4,
      mediumIssues: 8,
      sslStatus: 'expired',
      dnsHealth: 'warning',
      uptime: 98.5,
      addedDate: '2024-01-15'
    },
    {
      id: 3,
      domain: 'blog.startup.com',
      status: 'scanning',
      lastScan: 'In progress',
      riskScore: null,
      criticalIssues: 0,
      highIssues: 0,
      mediumIssues: 0,
      sslStatus: 'unknown',
      dnsHealth: 'unknown',
      uptime: null,
      addedDate: '2024-01-20'
    },
    {
      id: 4,
      domain: 'old.startup.com',
      status: 'inactive',
      lastScan: '30 days ago',
      riskScore: 23,
      criticalIssues: 3,
      highIssues: 9,
      mediumIssues: 12,
      sslStatus: 'invalid',
      dnsHealth: 'critical',
      uptime: 45.2,
      addedDate: '2023-12-01'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'scanning': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'inactive': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'scanning': return <RefreshCw className="w-3.5 h-3.5 animate-spin" />;
      case 'inactive': return <Clock className="w-3.5 h-3.5" />;
      default: return <AlertTriangle className="w-3.5 h-3.5" />;
    }
  };

  const getRiskScoreColor = (score) => {
    if (!score) return 'bg-gray-200';
    if (score >= 70) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getRiskLabel = (score) => {
    if (!score) return 'Unknown';
    if (score >= 70) return 'Low Risk';
    if (score >= 50) return 'Medium Risk';
    return 'High Risk';
  };

  const getHealthStatus = (ssl, dns) => {
    if (ssl === 'invalid' || dns === 'critical') return { label: 'Critical', color: 'text-red-600 bg-red-50 border-red-200' };
    if (ssl === 'expired' || dns === 'warning') return { label: 'Warning', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    if (ssl === 'valid' && dns === 'good') return { label: 'Healthy', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    return { label: 'Unknown', color: 'text-gray-600 bg-gray-50 border-gray-200' };
  };

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || domain.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: domains.length,
    active: domains.filter(d => d.status === 'active').length,
    atRisk: domains.filter(d => (d.criticalIssues || 0) + (d.highIssues || 0) > 0).length,
    totalIssues: domains.reduce((sum, d) => sum + (d.criticalIssues || 0) + (d.highIssues || 0) + (d.mediumIssues || 0), 0)
  };

  const handleBadgeClick = (domain, severity) => {
    const details = vulnerabilitiesData[domain]?.[severity] || [];
    setActiveVulnerabilities({
      title: `${severity.charAt(0).toUpperCase() + severity.slice(1)} Vulnerabilities: ${domain}`,
      items: details,
      severity
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Globe className="w-7 h-7 text-sage-600" />
          My Domains
        </h1>
        <p className="text-gray-600 mt-1">
          Monitor and manage your domain security posture
        </p>
      </div>

      {/* Stats Overview - Simplified */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Domains</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.active}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.atRisk}</p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{stats.totalIssues}</p>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 appearance-none bg-white cursor-pointer min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="scanning">Scanning</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <Link
            to="/app/add-domain"
            className="inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-all shadow-sm hover:shadow-md font-medium text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Domain
          </Link>
        </div>
      </div>

      {/* Domains Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Domain</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Security Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Issues</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Health</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Last Scan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDomains.map((domain) => {
                const health = getHealthStatus(domain.sslStatus, domain.dnsHealth);
                const totalIssues = (domain.criticalIssues || 0) + (domain.highIssues || 0) + (domain.mediumIssues || 0);

                return (
                  <tr
                    key={domain.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{domain.domain}</div>
                        <div className="text-xs text-gray-500">Added {domain.addedDate}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(domain.status)}`}>
                        {getStatusIcon(domain.status)}
                        <span className="capitalize">{domain.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {domain.riskScore ? (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 w-24">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getRiskScoreColor(domain.riskScore)} transition-all`}
                                style={{ width: `${domain.riskScore}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 w-8">{domain.riskScore}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Pending</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {totalIssues > 0 ? (
                        <div className="flex items-center gap-2">
                          {domain.criticalIssues > 0 && (
                            <button
                              onClick={() => handleBadgeClick(domain.domain, 'critical')}
                              className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full hover:bg-red-200 transition-colors"
                            >
                              {domain.criticalIssues} Critical
                            </button>
                          )}
                          {domain.highIssues > 0 && (
                            <button
                              onClick={() => handleBadgeClick(domain.domain, 'high')}
                              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full hover:bg-orange-200 transition-colors"
                            >
                              {domain.highIssues} High
                            </button>
                          )}
                          {(domain.mediumIssues > 0) && (
                            <button
                              onClick={() => handleBadgeClick(domain.domain, 'medium')}
                              className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full hover:bg-amber-200 transition-colors"
                            >
                              {domain.mediumIssues} Med
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                          No issues
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${health.color}`}>
                        {health.label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {domain.lastScan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          className="p-2 text-gray-400 hover:text-sage-600 hover:bg-sage-50 rounded-lg transition-colors"
                          title="Edit Domain"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Rescan"
                          disabled={domain.status === 'scanning'}
                        >
                          <RefreshCw className={`w-4 h-4 ${domain.status === 'scanning' ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredDomains.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No domains found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                : 'Get started by adding your first domain to begin monitoring your security posture.'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/app/add-domain"
                className="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Domain
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Pagination - Optional but recommended */}
      {filteredDomains.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredDomains.length} of {domains.length} domains</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      )}
      {/* Modal Backdrop */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className={`px-6 py-4 flex items-center justify-between border-b ${activeVulnerabilities.severity === 'critical' ? 'bg-red-50' :
              activeVulnerabilities.severity === 'high' ? 'bg-orange-50' : 'bg-amber-50'
              }`}>
              <div className="flex items-center gap-3">
                <AlertCircle className={`w-5 h-5 ${activeVulnerabilities.severity === 'critical' ? 'text-red-600' :
                  activeVulnerabilities.severity === 'high' ? 'text-orange-600' : 'text-amber-600'
                  }`} />
                <h2 className="text-lg font-bold text-gray-900">{activeVulnerabilities.title}</h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {activeVulnerabilities.items.length > 0 ? (
                <div className="space-y-4">
                  {activeVulnerabilities.items.map((item) => (
                    <div key={item.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-200 text-gray-600 rounded uppercase tracking-wider">
                          {item.cve}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No detailed records found for this severity level.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDomains;