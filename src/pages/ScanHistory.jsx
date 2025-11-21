import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter, MoreHorizontal, FileText, ArrowUpRight } from 'lucide-react';

const ScanHistory = () => {
  const history = [
    { id: 1, target: 'startup.com', type: 'Full Assessment', date: 'Oct 24, 2023', time: '14:30', status: 'completed', issues: 12, score: 78 },
    { id: 2, target: 'api.startup.com', type: 'Quick Scan', date: 'Oct 23, 2023', time: '09:15', status: 'completed', issues: 3, score: 92 },
    { id: 3, target: 'dev.startup.com', type: 'Deep Inspection', date: 'Oct 22, 2023', time: '11:45', status: 'failed', issues: 0, score: 0 },
    { id: 4, target: 'startup.com', type: 'Full Assessment', date: 'Oct 20, 2023', time: '16:20', status: 'completed', issues: 15, score: 75 },
    { id: 5, target: 'mail.startup.com', type: 'SSL Analysis', date: 'Oct 19, 2023', time: '10:00', status: 'completed', issues: 1, score: 98 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Scan History</h1>
          <p className="text-gray-600 mt-2">View and manage your past security assessments.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search scans..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-200 outline-none"
            />
          </div>
          <button className="flex items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-warm-grey overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((scan) => (
              <motion.tr
                key={scan.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-900">{scan.target}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {scan.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {scan.date} <span className="text-gray-400 ml-1">{scan.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(scan.status)}`}>
                    {scan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {scan.score > 0 ? (
                    <div className="flex items-center">
                      <span className={`font-bold ${scan.score >= 80 ? 'text-green-600' : scan.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {scan.score}
                      </span>
                      <span className="text-gray-400 text-sm">/100</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-charcoal transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <span className="text-sm text-gray-500">Showing 5 of 24 scans</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded bg-white text-sm text-gray-600 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-white text-sm text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;
