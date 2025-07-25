"use server";

import { analyzeClickPatterns, AnalyzeClickPatternsInput, AnalyzeClickPatternsOutput } from '@/ai/flows/analyze-click-patterns';

export async function handleUserClick(clickTimestamps: number[]): Promise<AnalyzeClickPatternsOutput> {
  // In a real app, IP and User Agent would be read from request headers.
  // Here, we use mock data as the server action doesn't have direct access to them.
  const input: AnalyzeClickPatternsInput = {
    clickTimestamps,
    ipAddress: '8.8.8.8', // Mock IP address for demonstration
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
  };

  try {
    const result = await analyzeClickPatterns(input);
    return result;
  } catch (error) {
    console.error('Error analyzing click patterns:', error);
    // Return a default "safe" response in case of an error
    return {
      isBotLikely: false,
      confidenceScore: 0,
      reasoning: 'An error occurred during analysis.',
    };
  }
}
