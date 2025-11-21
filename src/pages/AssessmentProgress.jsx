import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Loader2, Play, Pause, XCircle } from 'lucide-react';

const AssessmentProgress = () => {
  const steps = [
    { id: 1, title: 'Initialization', status: 'completed', time: '10:00 AM' },
    { id: 2, title: 'Asset Discovery', status: 'completed', time: '10:05 AM' },
    { id: 3, title: 'Port Scanning', status: 'completed', time: '10:15 AM' },
    { id: 4, title: 'Vulnerability Analysis', status: 'in-progress', time: 'Now' },
    { id: 5, title: 'Report Generation', status: 'pending', time: '-' },
  ];

  const currentStep = steps.find(s => s.status === 'in-progress');
  const progress = (steps.filter(s => s.status === 'completed').length / steps.length) * 100;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Assessment Progress</h1>
          <p className="text-gray-600 mt-2">Tracking ongoing security assessment for <span className="font-medium text-gray-900">startup.com</span></p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </button>
          <button className="flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium border border-red-200">
            <XCircle className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl border border-warm-grey p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-1">{currentStep?.title}</h2>
            <p className="text-gray-500">Step {steps.indexOf(currentStep) + 1} of {steps.length}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-sage-600">{Math.round(progress)}%</span>
            <p className="text-sm text-gray-500">Complete</p>
          </div>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 mb-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="bg-sage-500 h-3 rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start pl-14"
              >
                <div className={`absolute left-0 top-0 w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white z-10 ${step.status === 'completed' ? 'border-green-100 text-green-500' :
                    step.status === 'in-progress' ? 'border-sage-100 text-sage-500' :
                      'border-gray-100 text-gray-300'
                  }`}>
                  {step.status === 'completed' && <CheckCircle className="w-6 h-6" />}
                  {step.status === 'in-progress' && <Loader2 className="w-6 h-6 animate-spin" />}
                  {step.status === 'pending' && <Circle className="w-6 h-6" />}
                </div>

                <div className={`flex-1 p-4 rounded-lg border ${step.status === 'in-progress' ? 'bg-sage-50 border-sage-200 shadow-sm' : 'bg-white border-gray-100'
                  }`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-charcoal'
                      }`}>{step.title}</h3>
                    <span className="text-sm text-gray-400 font-mono">{step.time}</span>
                  </div>
                  {step.status === 'in-progress' && (
                    <p className="text-sm text-sage-600 mt-1">
                      Currently analyzing system configurations and patch levels...
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentProgress;
