import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface SciFixResult {
  success: boolean;
  originalCode: string;
  fixedCode: string;
  explanation: string;
  error?: string;
}

export class SciFixAgent {
  private model: ChatGoogleGenerativeAI;

  constructor(apiKey: string) {
    this.model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-exp",
      apiKey,
      temperature: 0.1,
    });
  }

  private async executePythonCode(code: string): Promise<string> {
    try {
      // Block dangerous imports
      const dangerousImports = [
        "os", "sys", "subprocess", "importlib", "eval", "exec",
        "open", "file", "input", "raw_input", "__import__"
      ];
      
      const hasDangerousImport = dangerousImports.some(imp => 
        code.includes(`import ${imp}`) || code.includes(`from ${imp}`)
      );
      
      if (hasDangerousImport) {
        return "Error: Dangerous imports detected. Code execution blocked for security.";
      }

      // Execute with timeout
      const { stdout, stderr } = await execAsync(`python3 -c "${code.replace(/"/g, '\\"')}"`, {
        timeout: 30000, // 30 seconds
        maxBuffer: 1024 * 1024, // 1MB
      });

      return `Output:\n${stdout}\n${stderr ? `Errors:\n${stderr}` : ''}`;
    } catch (error: any) {
      return `Execution Error: ${error.message}`;
    }
  }

  private async debugCode(code: string, errorOutput?: string): Promise<string> {
    const prompt = `Analyze this Python code and identify all bugs, errors, and issues:

Code:
\`\`\`python
${code}
\`\`\`

${errorOutput ? `Error Output:\n${errorOutput}` : ''}

Provide a detailed analysis of:
1. Syntax errors
2. Logic errors
3. Runtime errors
4. Best practice violations
5. Potential improvements

Format your response as a structured analysis.`;

    const response = await this.model.invoke(prompt);
    return response.content as string;
  }

  private async fixCode(originalCode: string, debugAnalysis: string): Promise<string> {
    const prompt = `Fix this Python code based on the debug analysis:

Original Code:
\`\`\`python
${originalCode}
\`\`\`

Debug Analysis:
${debugAnalysis}

Provide the corrected code with:
1. All syntax errors fixed
2. Logic errors corrected
3. Best practices applied
4. Clear, readable code structure

Return ONLY the fixed Python code, no explanations.`;

    const response = await this.model.invoke(prompt);
    return response.content as string;
  }

        private async explainScienceConcept(codeIssue: string, context: string): Promise<string> {
          const prompt = `Explain the science behind this Python code issue in simple, student-friendly terms:
          
          Issue: ${codeIssue}
          Context: ${context}
          
          Write a brief, clear explanation (2-3 paragraphs max) that:
          1. Explains what went wrong in simple terms
          2. Teaches the basic science/math concept
          3. Shows why the fix works
          
          Use simple language, avoid jargon, and make it engaging for students.`;

          const response = await this.model.invoke(prompt);
          return response.content as string;
        }


  async processCode(code: string, filename: string): Promise<SciFixResult> {
    try {
      // Step 1: Execute Python code to identify runtime issues
      const executionResult = await this.executePythonCode(code);
      
      // Step 2: Debug the code using AI
      const debugAnalysis = await this.debugCode(code, executionResult);
      
      // Step 3: Fix the code using AI
      const fixedCode = await this.fixCode(code, debugAnalysis);
      
      // Step 4: Explain the science behind the issues
      const explanation = await this.explainScienceConcept(
        `Code issues found in ${filename}`,
        `Python code that had bugs and was fixed. Original code: ${code.substring(0, 200)}...`
      );
      
      return {
        success: true,
        originalCode: code,
        fixedCode: this.cleanCode(fixedCode),
        explanation: this.cleanExplanation(explanation),
      };
    } catch (error: any) {
      return {
        success: false,
        originalCode: code,
        fixedCode: "",
        explanation: "",
        error: error.message,
      };
    }
  }

  private cleanCode(code: string): string {
    // Remove markdown code blocks if present
    const codeMatch = code.match(/```python\n([\s\S]*?)\n```/);
    if (codeMatch) {
      return codeMatch[1];
    }
    return code.replace(/```python\n?/g, '').replace(/```\n?/g, '').trim();
  }

  private cleanExplanation(explanation: string): string {
    // Clean up the explanation text
    return explanation
      .replace(/```python\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/\*\*/g, '')
      .trim();
  }
}
