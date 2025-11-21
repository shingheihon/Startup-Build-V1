import React, { useState } from 'react';
import { Globe, AlertCircle, CheckCircle } from 'lucide-react';

const AddDomain = () => {
  const [domain, setDomain] = useState('');
  const [tosAccepted, setTosAccepted] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tosAccepted) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-warm-grey p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-charcoal mb-4">Domain Added Successfully</h1>
          <p className="text-gray-600 mb-6">
            {domain} has been added to your account and is now authorized for scanning.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              ✓ Domain verified and added<br/>
              ✓ Initial scan queued<br/>
              ✓ You'll receive results within 5 minutes
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/app/my-domains'}
            className="px-6 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
          >
            View My Domains
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-charcoal flex items-center">
          <Globe className="w-8 h-8 text-sage-500 mr-3" />
          Add Domain
        </h1>
        <p className="text-gray-600 mt-2">
          Add a domain to your account for security scanning and monitoring.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-warm-grey p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-charcoal mb-2">
              Domain Name
            </label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full px-4 py-2 border border-warm-grey rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter the domain without http:// or www. (e.g., example.com)
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-800">Domain Authorization</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  You may only scan domains you own or control. Unauthorized scanning may be illegal 
                  and violate applicable laws.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="tos"
                checked={tosAccepted}
                onChange={(e) => setTosAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-sage-500 border-gray-300 rounded focus:ring-sage-500"
                required
              />
              <label htmlFor="tos" className="text-sm text-charcoal">
                I confirm I own this domain or have written authorization to scan it. 
                I understand that unauthorized scanning may be illegal and I accept full responsibility. 
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTos(true)}
                  className="text-sage-500 hover:text-sage-600 underline"
                >
                  Terms of Service
                </button>
                .
              </label>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={!tosAccepted || isSubmitting}
              className="flex-1 px-6 py-3 bg-sage-500 text-white rounded-lg hover:bg-sage-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Adding Domain...' : 'Add Domain & Start Scanning'}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-warm-grey text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Terms of Service Modal */}
      {showTos && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-charcoal mb-4">Terms of Service</h2>
              <div className="prose prose-sm text-gray-600 space-y-4">
                <h3 className="font-semibold text-charcoal">Domain Scanning Authorization</h3>
                <p>
                  By using our scanning services, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You own or control the domains you submit for scanning</li>
                  <li>You have proper authorization to conduct security scans on these domains</li>
                  <li>You will not use our services to scan domains without proper authorization</li>
                </ul>
                
                <h3 className="font-semibold text-charcoal">Legal Compliance</h3>
                <p>
                  Unauthorized scanning of computer systems may violate applicable laws including 
                  but not limited to the Computer Fraud and Abuse Act and similar laws in other jurisdictions.
                </p>
                
                <h3 className="font-semibold text-charcoal">Indemnification</h3>
                <p>
                  You agree to indemnify and hold harmless Startup and its affiliates from any claims, 
                  damages, or legal actions arising from your use of our scanning services.
                </p>
                
                <h3 className="font-semibold text-charcoal">Limitation of Liability</h3>
                <p>
                  Our scanning services are provided "as is" without warranties. We are not responsible 
                  for any damages resulting from the use of our services.
                </p>
              </div>
              
              <div className="flex space-x-4 mt-6 pt-4 border-t border-warm-grey">
                <button
                  onClick={() => setShowTos(false)}
                  className="flex-1 px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDomain;