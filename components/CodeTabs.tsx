'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, CheckCircle, BookOpen, Download } from 'lucide-react';
import CodeViewer from './CodeViewer';
import ScienceExplanation from './ScienceExplanation';

interface CodeTabsProps {
  originalCode: string;
  fixedCode: string;
  explanation: string;
  downloadUrls?: {
    fixedCode: string;
    explanation: string;
  };
}

export default function CodeTabs({ originalCode, fixedCode, explanation, downloadUrls }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState<'comparison' | 'explanation'>('comparison');

  const tabs = [
    {
      id: 'comparison' as const,
      label: 'Code Comparison',
      icon: Code,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      id: 'explanation' as const,
      label: 'Science Explanation',
      icon: BookOpen,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 rounded-2xl blur-sm bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-teal-500/10" />
      
      <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 transition-all duration-300 ${
                  isActive
                    ? `${tab.bgColor} ${tab.borderColor} border-b-2`
                    : 'hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`h-5 w-5 ${isActive ? tab.color : 'text-gray-500'}`} />
                <span className={`font-medium ${isActive ? tab.color : 'text-gray-400'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${tab.bgColor.replace('/10', '/50')}`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'comparison' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <CodeViewer
                      code={originalCode}
                      title="Original Code"
                      variant="original"
                    />
                    <CodeViewer
                      code={fixedCode}
                      title="Fixed Code"
                      variant="fixed"
                    />
                  </div>
                  {downloadUrls?.fixedCode && (
                    <div className="flex justify-center">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={downloadUrls.fixedCode}
                        download
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Fixed Code
                      </motion.a>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'explanation' && (
                <ScienceExplanation
                  explanation={explanation}
                  downloadUrl={downloadUrls?.explanation}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
