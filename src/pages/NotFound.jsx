import React from 'react';
import { Shield, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Shield className="w-16 h-16 text-sage-500 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-charcoal mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-charcoal mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;