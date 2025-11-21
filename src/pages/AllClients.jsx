import React from 'react';
import { Users, Search, Eye, BarChart3, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllClients = () => {
  const clients = [
    {
      id: 1,
      name: 'TechStart Ltd',
      email: 'admin@techstart.com',
      riskScore: 78,
      lastActive: '2 hours ago',
      domains: 3,
      status: 'active',
      plan: 'Professional'
    },
    {
      id: 2,
      name: 'Digital Solutions Inc',
      email: 'security@digitalsol.com',
      riskScore: 45,
      lastActive: '1 day ago',
      domains: 7,
      status: 'active',
      plan: 'Enterprise'
    },
    {
      id: 3,
      name: 'Green Energy Co',
      email: 'it@greenenergy.com',
      riskScore: 82,
      lastActive: '3 hours ago',
      domains: 2,
      status: 'active',
      plan: 'Basic'
    },
    {
      id: 4,
      name: 'Finance Plus',
      email: 'admin@financeplus.com',
      riskScore: 34,
      lastActive: '5 days ago',
      domains: 12,
      status: 'inactive',
      plan: 'Enterprise'
    },
    {
      id: 5,
      name: 'Creative Agency',
      email: 'tech@creative.com',
      riskScore: 67,
      lastActive: '1 hour ago',
      domains: 5,
      status: 'active',
      plan: 'Professional'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600 bg-green-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'text-green-600 bg-green-50 border-green-200'
      : 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const avgRiskScore = Math.round(clients.reduce((sum, c) => sum + c.riskScore, 0) / clients.length);
  const criticalClients = clients.filter(c => c.riskScore < 50).length;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal flex items-center">
          <Users className="w-8 h-8 text-sage-500 mr-3" />
          All Clients Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage all client accounts from a centralized view.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-3xl font-bold text-charcoal">{totalClients}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-3xl font-bold text-green-600">{activeClients}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Risk Score</p>
              <p className={`text-3xl font-bold ${avgRiskScore >= 70 ? 'text-green-600' : avgRiskScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {avgRiskScore}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-sage-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Risk</p>
              <p className="text-3xl font-bold text-red-600">{criticalClients}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="bg-white rounded-lg border border-warm-grey">
        <div className="p-6 border-b border-warm-grey">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal">Client Accounts</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 border border-warm-grey rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-grey bg-gray-50">
                <th className="text-left py-3 px-6 font-medium text-charcoal">Client</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Risk Score</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Domains</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Plan</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Status</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Last Active</th>
                <th className="text-left py-3 px-6 font-medium text-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-charcoal">{client.name}</div>
                      <div className="text-sm text-gray-600">{client.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(client.riskScore)}`}>
                      {client.riskScore}/100
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-charcoal">{client.domains} domains</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-charcoal">{client.plan}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{client.lastActive}</span>
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/admin/client-details/${client.id}`}
                      className="inline-flex items-center px-3 py-1 bg-sage-500 text-white text-sm rounded-lg hover:bg-sage-600 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h3 className="font-semibold text-charcoal mb-4">Clients Needing Attention</h3>
          <div className="space-y-3">
            {clients.filter(c => c.riskScore < 50).map(client => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">{client.name}</div>
                  <div className="text-sm text-red-600">Risk Score: {client.riskScore}</div>
                </div>
                <Link
                  to={`/admin/client-details/${client.id}`}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Review →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h3 className="font-semibold text-charcoal mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="text-sm">
              <div className="font-medium">TechStart Ltd</div>
              <div className="text-gray-600">Completed security assessment</div>
              <div className="text-xs text-gray-500">2 hours ago</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Creative Agency</div>
              <div className="text-gray-600">Added new domain</div>
              <div className="text-xs text-gray-500">1 hour ago</div>
            </div>
            <div className="text-sm">
              <div className="font-medium">Green Energy Co</div>
              <div className="text-gray-600">Generated security report</div>
              <div className="text-xs text-gray-500">3 hours ago</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h3 className="font-semibold text-charcoal mb-4">Platform Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Scans Today</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Assessments</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Reports Generated</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">System Uptime</span>
              <span className="font-medium text-green-600">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClients;