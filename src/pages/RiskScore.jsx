import React from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const RiskScore = () => {
  const riskScore = 62;
  const previousScore = 57;
  const scoreChange = riskScore - previousScore;

  const riskFactors = [
    {
      category: 'Network Security',
      score: 45,
      weight: 25,
      status: 'critical',
      issues: ['Expired SSL certificate', 'Weak TLS configuration']
    },
    {
      category: 'Access Management',
      score: 70,
      weight: 20,
      status: 'medium',
      issues: ['Missing MFA on some accounts', 'Infrequent access reviews']
    },
    {
      category: 'Endpoint Protection',
      score: 85,
      weight: 20,
      status: 'good',
      issues: ['Some systems need updates']
    },
    {
      category: 'Data Protection',
      score: 60,
      weight: 15,
      status: 'medium',
      issues: ['Backup testing needed', 'Encryption gaps']
    },
    {
      category: 'Security Awareness',
      score: 55,
      weight: 10,
      status: 'medium',
      issues: ['Training outdated', 'No phishing tests']
    },
    {
      category: 'Incident Response',
      score: 40,
      weight: 10,
      status: 'critical',
      issues: ['No documented plan', 'Untested procedures']
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 60) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal flex items-center">
          <Shield className="w-8 h-8 text-sage-500 mr-3" />
          AI Risk Score Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Your overall security posture analyzed by AI with personalized recommendations.
        </p>
      </div>

      {/* Overall Risk Score */}
      <div className="bg-white rounded-lg border border-warm-grey p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-charcoal mb-2">Overall Risk Score</h2>
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className={`text-6xl font-bold ${getScoreColor(riskScore)}`}>
                {riskScore}
              </div>
              <div className="text-left">
                <div className="text-lg font-medium text-gray-600">/100</div>
                <div className={`text-sm font-medium ${scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {scoreChange >= 0 ? '+' : ''}{scoreChange} from last month
                </div>
              </div>
            </div>
            <p className={`text-lg font-medium mt-2 ${getScoreColor(riskScore)}`}>
              {getRiskLevel(riskScore)}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={getScoreColor(riskScore)}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${riskScore}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xl font-bold ${getScoreColor(riskScore)}`}>
                  {riskScore}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Improving trend over 90 days</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">AI-powered analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">Updated 2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <h2 className="text-xl font-semibold text-charcoal mb-6">Risk Factor Breakdown</h2>
        <div className="space-y-4">
          {riskFactors.map((factor, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-charcoal">{factor.category}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(factor.status)}`}>
                    {factor.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Weight: {factor.weight}%</span>
                  <span className={`font-bold ${getScoreColor(factor.score)}`}>
                    {factor.score}/100
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full ${getScoreBgColor(factor.score)}`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {factor.issues.map((issue, issueIndex) => (
                  <span key={issueIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {issue}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Bot className="w-6 h-6 text-purple-500 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-charcoal mb-3">AI Security Insights</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Primary Risk:</strong> Your network security score of 45/100 is the biggest factor 
                lowering your overall score. The expired SSL certificate poses an immediate risk to customer trust.
              </p>
              <p>
                <strong>Quick Win:</strong> Enabling MFA for all admin accounts could improve your score by 8-12 points 
                and significantly reduce your breach risk.
              </p>
              <p>
                <strong>Trend Analysis:</strong> Your score has improved by 5 points this month, primarily due to 
                better endpoint protection. Keep up the momentum!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Immediate Actions</h2>
          <div className="space-y-3">
            <Link to="/app/top-vulnerabilities" className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-800">Fix SSL Certificate</span>
              </div>
              <span className="text-red-600 text-sm">Critical</span>
            </Link>
            <Link to="/app/remediation-guides" className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-yellow-800">Enable MFA</span>
              </div>
              <span className="text-yellow-600 text-sm">High</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-warm-grey p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Score History</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This month</span>
              <span className="font-medium text-charcoal">{riskScore}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last month</span>
              <span className="font-medium text-gray-600">{previousScore}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">3 months ago</span>
              <span className="font-medium text-gray-600">52/100</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">Total improvement</span>
                <span className="font-bold text-green-600">+10 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskScore;