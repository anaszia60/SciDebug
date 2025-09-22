'use server';

import { SciFixAgent } from '@/lib/scifix-agent';

export async function processCode(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    
    if (!file) {
      return {
        success: false,
        error: 'No file provided',
      };
    }

    // Validate file type
    if (!file.name.endsWith('.py')) {
      return {
        success: false,
        error: 'Please upload a Python (.py) file only',
      };
    }

    // Validate file size (1MB limit)
    if (file.size > 1024 * 1024) {
      return {
        success: false,
        error: 'File size must be less than 1MB',
      };
    }

    // Read file content
    const code = await file.text();
    const filename = file.name;

    // Initialize SciFix Agent
    const apiKey = process.env.GOOGLE_API_KEY || 'AIzaSyA3QWMgz6P3Yu1Yr88onDM72jRe0KBSMAQ';
    console.log('API Key found:', apiKey ? 'Yes' : 'No');
    console.log('API Key length:', apiKey ? apiKey.length : 0);

    const agent = new SciFixAgent(apiKey);

    // Process the code
    const result = await agent.processCode(code, filename);

    if (!result.success) {
      return result;
    }

    // Return the result without file saving (serverless compatible)
    return {
      success: true,
      originalCode: result.originalCode,
      fixedCode: result.fixedCode,
      explanation: result.explanation,
    };
  } catch (error: any) {
    console.error('Error processing code:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}
