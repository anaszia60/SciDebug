'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

interface CodeViewerProps {
  code: string;
  title: string;
  variant: 'original' | 'fixed';
  language?: string;
}

export default function CodeViewer({ code, title, variant, language = 'python' }: CodeViewerProps) {
  const isOriginal = variant === 'original';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full mr-3 ${
          isOriginal ? 'bg-red-500 shadow-red-500/50' : 'bg-emerald-500 shadow-emerald-500/50'
        } shadow-lg`} />
        <h4 className={`text-lg font-semibold ${
          isOriginal ? 'text-red-400' : 'text-emerald-400'
        }`}>
          {isOriginal ? '❌' : '✅'} {title}
        </h4>
      </div>
      
      <div className="relative group">
        <div className={`absolute inset-0 rounded-2xl blur-sm ${
          isOriginal 
            ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20' 
            : 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20'
        }`} />
        
        <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isOriginal ? 'bg-red-500' : 'bg-emerald-500'
              }`} />
              <div className={`w-2 h-2 rounded-full ${
                isOriginal ? 'bg-orange-500' : 'bg-cyan-500'
              }`} />
              <div className={`w-2 h-2 rounded-full ${
                isOriginal ? 'bg-yellow-500' : 'bg-teal-500'
              }`} />
            </div>
            <span className="text-xs text-gray-400 font-mono">{language}</span>
          </div>
          
          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                fontSize: '0.875rem',
                lineHeight: '1.6',
              }}
              showLineNumbers
              wrapLines
              wrapLongLines
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
