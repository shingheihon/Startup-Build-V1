import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, ArrowRight, Calendar, User } from 'lucide-react';

const ActionPlan = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Update OpenSSL on Web Server', priority: 'High', due: 'Today', assignee: 'DevOps Team', completed: false },
    { id: 2, title: 'Configure DMARC Policy', priority: 'High', due: 'Tomorrow', assignee: 'IT Admin', completed: false },
    { id: 3, title: 'Review Firewall Rules', priority: 'Medium', due: 'Oct 30', assignee: 'NetSec', completed: true },
    { id: 4, title: 'Conduct Employee Phishing Training', priority: 'Low', due: 'Nov 15', assignee: 'HR', completed: false },
    { id: 5, title: 'Rotate API Keys', priority: 'Medium', due: 'Nov 01', assignee: 'Lead Dev', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Action Plan</h1>
          <p className="text-gray-600 mt-2">Your personalized roadmap to better security.</p>
        </div>
        <button className="px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-gray-800 transition-colors">
          + Add Task
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-xl border border-warm-grey p-8 flex items-center justify-between">
        <div className="flex-1 mr-8">
          <h2 className="text-xl font-bold text-charcoal mb-2">Overall Progress</h2>
          <p className="text-gray-600 mb-4">{completedCount} of {tasks.length} tasks completed</p>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-sage-500 h-3 rounded-full"
            />
          </div>
        </div>
        <div className="text-center min-w-[100px]">
          <span className="text-4xl font-bold text-sage-600">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl border border-warm-grey overflow-hidden">
        <div className="divide-y divide-gray-100">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${task.completed ? 'bg-gray-50/50' : ''
                }`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`text-gray-400 ${task.completed ? 'text-sage-500' : 'hover:text-sage-500'}`}>
                  {task.completed ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className={`font-medium text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-charcoal'}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                      {task.priority}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {task.due}
                    </span>
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {task.assignee}
                    </span>
                  </div>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-gray-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
