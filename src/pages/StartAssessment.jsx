import React, { useState } from 'react';
import { ClipboardList, ArrowRight, CheckCircle, Clock } from 'lucide-react';

const StartAssessment = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const stages = [
    {
      title: 'Basic Security',
      description: 'Passwords, MFA, and backup practices',
      questions: [
        {
          id: 'password_policy',
          question: 'Do you have a written password policy requiring strong passwords?',
          type: 'radio',
          options: ['Yes, enforced', 'Yes, but not enforced', 'No policy']
        },
        {
          id: 'mfa_enabled',
          question: 'Is multi-factor authentication (MFA) enabled for admin accounts?',
          type: 'radio',
          options: ['Yes, all admins', 'Yes, some admins', 'No MFA']
        },
        {
          id: 'backup_frequency',
          question: 'How often do you backup critical business data?',
          type: 'radio',
          options: ['Daily', 'Weekly', 'Monthly', 'Rarely/Never']
        }
      ]
    },
    {
      title: 'Access Controls',
      description: 'Admin accounts and user permissions',
      questions: [
        {
          id: 'admin_accounts',
          question: 'How many people have administrator access to your systems?',
          type: 'radio',
          options: ['1-2 people', '3-5 people', '6-10 people', 'More than 10']
        },
        {
          id: 'access_review',
          question: 'How often do you review user access permissions?',
          type: 'radio',
          options: ['Monthly', 'Quarterly', 'Annually', 'Never']
        }
      ]
    },
    {
      title: 'Endpoint Security',
      description: 'Antivirus and system updates',
      questions: [
        {
          id: 'antivirus',
          question: 'Do all computers have up-to-date antivirus software?',
          type: 'radio',
          options: ['Yes, centrally managed', 'Yes, individually managed', 'Some computers', 'No antivirus']
        },
        {
          id: 'updates',
          question: 'How do you handle security updates?',
          type: 'radio',
          options: ['Automatic updates', 'Manual monthly', 'Manual quarterly', 'Ad-hoc basis']
        }
      ]
    },
    {
      title: 'Network Security',
      description: 'Firewall and VPN configuration',
      questions: [
        {
          id: 'firewall',
          question: 'Do you have a firewall protecting your network?',
          type: 'radio',
          options: ['Yes, enterprise firewall', 'Yes, basic router firewall', 'No firewall']
        },
        {
          id: 'remote_access',
          question: 'How do remote workers access company systems?',
          type: 'radio',
          options: ['VPN required', 'Cloud-based access', 'Direct internet access', 'No remote access']
        }
      ]
    },
    {
      title: 'Policies & Training',
      description: 'Security awareness and documentation',
      questions: [
        {
          id: 'security_training',
          question: 'Do employees receive cybersecurity awareness training?',
          type: 'radio',
          options: ['Regular training', 'Annual training', 'One-time training', 'No training']
        },
        {
          id: 'incident_plan',
          question: 'Do you have a written incident response plan?',
          type: 'radio',
          options: ['Yes, tested regularly', 'Yes, but not tested', 'Basic plan', 'No plan']
        }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const isStageComplete = () => {
    const currentQuestions = stages[currentStage].questions;
    return currentQuestions.every(q => answers[q.id]);
  };

  const getProgressPercentage = () => {
    const totalQuestions = stages.reduce((sum, stage) => sum + stage.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-warm-grey p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal mb-4">Assessment Complete!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for completing the security assessment. We're now analyzing your responses 
            to generate personalized recommendations.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              ✓ {Object.keys(answers).length} questions answered<br/>
              ✓ Risk analysis in progress<br/>
              ✓ Recommendations will be available shortly
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/app/risk-score'}
            className="px-6 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
          >
            View Risk Score & Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal flex items-center">
          <ClipboardList className="w-8 h-8 text-sage-500 mr-3" />
          Security Assessment
        </h1>
        <p className="text-gray-600 mt-2">
          Complete this guided assessment to understand your organization's security posture.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-charcoal">Assessment Progress</h2>
          <span className="text-sm text-gray-600">{getProgressPercentage()}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-sage-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          {stages.map((stage, index) => (
            <div key={index} className={`flex items-center ${index <= currentStage ? 'text-sage-500' : ''}`}>
              {index < currentStage ? (
                <CheckCircle className="w-4 h-4 mr-1" />
              ) : index === currentStage ? (
                <Clock className="w-4 h-4 mr-1" />
              ) : (
                <div className="w-4 h-4 mr-1" />
              )}
              <span>{stage.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Stage */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-charcoal">
            Stage {currentStage + 1}: {stages[currentStage].title}
          </h2>
          <p className="text-gray-600 mt-2">{stages[currentStage].description}</p>
        </div>

        <div className="space-y-6">
          {stages[currentStage].questions.map((question, qIndex) => (
            <div key={question.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <h3 className="font-medium text-charcoal mb-4">
                {qIndex + 1}. {question.question}
              </h3>
              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <label key={oIndex} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                      className="w-4 h-4 text-sage-500 border-gray-300 focus:ring-sage-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t border-warm-grey">
          <button
            onClick={handlePrevious}
            disabled={currentStage === 0}
            className="px-6 py-2 border border-warm-grey text-charcoal rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isStageComplete()}
            className="px-6 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <span>{currentStage === stages.length - 1 ? 'Complete Assessment' : 'Next Stage'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stage Overview */}
      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Assessment Stages</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                index < currentStage
                  ? 'bg-green-50 border-green-200'
                  : index === currentStage
                  ? 'bg-sage-50 border-sage-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {index < currentStage ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : index === currentStage ? (
                  <Clock className="w-5 h-5 text-sage-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <span className="font-medium text-sm">{stage.title}</span>
              </div>
              <p className="text-xs text-gray-600">{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartAssessment;