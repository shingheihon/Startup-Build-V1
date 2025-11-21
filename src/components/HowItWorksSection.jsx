import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Rocket, Users } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Code,
      title: 'Describe Your Idea',
      description: 'Tell our AI about your app requirements, features, and design preferences.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Rocket,
      title: 'AI Generates Code',
      description: 'Our advanced AI analyzes your input and generates optimized, production-ready code.',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Users,
      title: 'Deploy & Scale',
      description: 'Deploy instantly to the cloud and scale effortlessly as your user base grows.',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-800 to-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              In 3 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From concept to deployment in minutes, not months. Experience the future of app development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative text-center"
            >
              <div className="relative bg-zinc-800/50 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-8 h-full overflow-hidden">
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} mb-6 mx-auto relative`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-cyan-500 absolute top-1/2 -right-3 transform -translate-y-1/2 hidden md:block" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-lg font-semibold text-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;