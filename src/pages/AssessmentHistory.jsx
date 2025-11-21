import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Download, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

const AssessmentHistory = () => {
  const assessments = [
    { id: 1, name: 'Q3 Security Audit', date: 'Oct 15, 2023', scope: 'Full Infrastructure', findings: 12, status: 'completed', report: 'audit_q3_2023.pdf' },
    { id: 2, name: 'Pre-Launch Validation', date: 'Sep 01, 2023', scope: 'Web Application', findings: 5, status: 'completed', report: 'validation_v1.pdf' },
    { id: 3, name: 'Monthly Compliance Check', date: 'Aug 01, 2023', scope: 'Compliance', findings: 0, status: 'completed', report: 'compliance_aug.pdf' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Assessment History</h1>
          <p className="text-gray-600 mt-2">Archive of all completed security assessments and reports.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-warm-grey overflow-hidden">
        <div className="divide-y divide-gray-100">
          {assessments.map((assessment, index) => (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-sage-50 text-sage-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal group-hover:text-sage-600 transition-colors">{assessment.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {assessment.date}
                    </span>
                    <span>•</span>
                    <span>{assessment.scope}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Findings</p>
                  <div className="flex items-center justify-end space-x-1">
                    <span className={`font-bold ${assessment.findings > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {assessment.findings}
                    </span>
                    {assessment.findings > 0 ? (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <button className="flex items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-white hover:border-sage-300 text-gray-600 hover:text-sage-600 transition-all">
                  <Download className="w-4 h-4 mr-2" />
                  Report
                </button>

                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentHistory;
