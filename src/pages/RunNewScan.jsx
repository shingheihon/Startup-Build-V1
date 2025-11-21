import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Globe, Server, Clock, ArrowRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RunNewScan = () => {
  const navigate = useNavigate();
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('quick');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (e) => {
    e.preventDefault();
    setIsScanning(true);
    // Simulate scan start
    setTimeout(() => {
      setIsScanning(false);
      navigate('/app/scan-results');
    }, 2000);
  };

  const scanTypes = [
    {
      id: 'quick',
      title: 'Quick Scan',
      description: 'Fast check for common vulnerabilities and open ports.',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      duration: '~5 mins'
    },
    {
      id: 'full',
      title: 'Full Assessment',
      description: 'Comprehensive analysis including SSL, DNS, and services.',
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      duration: '~45 mins'
    },
    {
      id: 'deep',
      title: 'Deep Inspection',
      description: 'Intensive scan for hidden assets and complex vectors.',
      icon: Server,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      duration: '~2 hours'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Run New Scan</h1>
          <p className="text-gray-600 mt-2">Initiate a security assessment for your assets.</p>
        </div>
      </div>

      {/* Main Scan Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-warm-grey p-8 shadow-sm"
      >
        <form onSubmit={handleScan} className="space-y-8">
          {/* Target Input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Target Asset</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="e.g., example.com, 192.168.1.1"
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 transition-all outline-none text-lg"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Scan Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scanTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setScanType(type.id)}
                className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${scanType === type.id
                    ? `${type.borderColor} ${type.bgColor} ring-1 ring-offset-2 ring-${type.color.split('-')[1]}-400`
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg bg-white ${type.color} shadow-sm`}>
                    <type.icon className="w-6 h-6" />
                  </div>
                  {scanType === type.id && (
                    <div className={`w-4 h-4 rounded-full ${type.color.replace('text', 'bg')}`} />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{type.title}</h3>
                <p className="text-sm text-gray-500 mt-2 mb-4">{type.description}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {type.duration}
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isScanning}
              className={`
                flex items-center px-8 py-4 rounded-lg text-white font-medium text-lg transition-all
                ${isScanning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-charcoal hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }
              `}
            >
              {isScanning ? (
                <>
                  <Activity className="w-5 h-5 mr-2 animate-spin" />
                  Initializing Scan...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Start Assessment
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Recent Scans Preview */}
      <div className="bg-white rounded-xl border border-warm-grey p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-charcoal">Recent Scans</h2>
          <button onClick={() => navigate('/app/scan-history')} className="text-sage-600 hover:text-sage-700 text-sm font-medium flex items-center">
            View All History <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Full Scan - startup.com</p>
                  <p className="text-sm text-gray-500">Completed 2 hours ago</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Clean
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunNewScan;
