'use client';

import { useState } from 'react';
import { processCode } from '@/actions/process-code';
import FileUpload from '@/components/FileUpload';
import CodeTabs from '@/components/CodeTabs';
import { Loader2, AlertCircle, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface DebugResult {
  success: boolean;
  originalCode?: string;
  fixedCode?: string;
  explanation?: string;
  error?: string;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<DebugResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null); // Clear previous results
  };

  const handleClear = () => {
    setSelectedFile(null);
    setResult(null);
  };

  const handleDebug = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const debugResult = await processCode(formData);
      setResult(debugResult);
    } catch (error) {
      setResult({
        success: false,
        error: 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-teal-500/10" />
        <div className="relative bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl shadow-lg">
                  <span className="text-2xl">🔬</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    SciDebug
                  </h1>
                  <p className="text-sm text-gray-400 flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-cyan-400" />
                    AI-Powered Science Debugger
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-6">
            Debug Python Code & Learn Science
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload your Python scripts and get AI-powered fixes with detailed explanations 
            of the science, math, and physics concepts behind your mistakes.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group mb-8"
        >
          {/* Neon glow effect */}
          <div className="absolute inset-0 rounded-2xl blur-sm bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-teal-500/20" />
          
          <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl mr-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Upload Python File
              </h3>
            </div>
            
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onClear={handleClear}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDebug}
              disabled={!selectedFile || isLoading}
              className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-cyan-500/25 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  🔄 Debugging with AI...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  🔍 Debug & Learn
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Error Display */}
        {result && !result.success && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                  Debugging Failed
                </h3>
                <p className="text-red-700 dark:text-red-300 mt-1">
                  {result.error || 'An unexpected error occurred'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && result.success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Code Tabs */}
            <CodeTabs
              originalCode={result.originalCode}
              fixedCode={result.fixedCode}
              explanation={result.explanation}
            />
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: '🔍',
              title: 'AI Bug Detection',
              description: 'Advanced AI identifies and fixes Python code bugs automatically',
              color: 'from-cyan-500 to-blue-500',
            },
            {
              icon: '📖',
              title: 'Learn Science',
              description: 'Understand the science, math, and physics behind your mistakes',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: '🛡️',
              title: 'Safe Execution',
              description: 'Sandboxed environment with security restrictions and timeouts',
              color: 'from-teal-500 to-cyan-500',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-2xl blur-sm bg-gradient-to-r ${feature.color} opacity-20`} />
              <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 text-center hover:border-gray-600/50 transition-all duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-teal-500/5" />
        <div className="relative bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                  <span className="text-xl">🔬</span>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  SciDebug
                </h3>
              </div>
              <p className="text-gray-400 mb-2">AI-Powered Science Debugger</p>
              <p className="text-sm text-gray-500">
                Built with Next.js 14, TypeScript, Tailwind CSS & Gemini 2.5 Flash
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
