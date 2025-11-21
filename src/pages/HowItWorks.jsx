import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h1>
          <p className="text-xl text-slate-300">Step-by-step guide coming soon.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorks;