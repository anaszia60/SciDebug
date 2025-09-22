'use client';

import { Download, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';

interface ScienceExplanationProps {
  explanation: string;
}

export default function ScienceExplanation({ explanation }: ScienceExplanationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group"
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 rounded-2xl blur-sm bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-teal-500/20" />
      
      <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-cyan-400" />
                Scientific Explanation
              </h3>
              <p className="text-sm text-gray-400">Learn the science behind the code</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div className="prose prose-invert prose-cyan max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
                    <Lightbulb className="h-6 w-6 mr-2" />
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-purple-400 mb-3 mt-6">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-medium text-teal-400 mb-2 mt-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300 leading-relaxed">
                    {children}
                  </li>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto border border-gray-700">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-400 my-4">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="text-cyan-400 font-semibold">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="text-purple-400 italic">
                    {children}
                  </em>
                ),
              }}
            >
              {explanation}
            </ReactMarkdown>
          </div>
        </div>

        {/* Learning tip */}
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border-t border-gray-700/50">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm text-cyan-300 font-medium mb-1">
                💡 Learning Tip
              </p>
              <p className="text-xs text-gray-400">
                Understanding the science behind code helps you write better programs and solve similar problems in the future!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
