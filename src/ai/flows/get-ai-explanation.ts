// src/ai/flows/get-ai-explanation.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for getting AI explanations on chess topics.
 *
 * It includes:
 * - getAiExplanation: The main function to get an explanation.
 * - GetAiExplanationInput: The input type, representing the user's question.
 * - GetAiExplanationOutput: The output type, representing the AI's explanation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetAiExplanationInputSchema = z.object({
  topic: z.string().describe('The chess-related topic the user wants to learn about.'),
});
export type GetAiExplanationInput = z.infer<typeof GetAiExplanationInputSchema>;

const GetAiExplanationOutputSchema = z.object({
  explanation: z.string().describe("A detailed explanation of the user's topic."),
});
export type GetAiExplanationOutput = z.infer<typeof GetAiExplanationOutputSchema>;

export async function getAiExplanationFlow(input: GetAiExplanationInput): Promise<GetAiExplanationOutput> {
  return getAiExplanationInternalFlow(input);
}

const getAiExplanationPrompt = ai.definePrompt({
  name: 'getAiExplanationPrompt',
  input: { schema: GetAiExplanationInputSchema },
  output: { schema: GetAiExplanationOutputSchema },
  prompt: `You are a world-class chess expert and teacher.
The user wants to learn about the following topic: '{{{topic}}}'.

Your task is to provide a clear, detailed, and easy-to-understand explanation.
- If it's a concept (like an opening or a tactic), explain what it is, its purpose, and key ideas.
- If it's a famous game, summarize the context, key moments, and its significance.
- If it's a rule, explain it precisely with examples.
- Structure your answer for readability. Use paragraphs and bullet points if helpful.
- Your response should be only the explanation text.
`,
});

const getAiExplanationInternalFlow = ai.defineFlow(
  {
    name: 'getAiExplanationInternalFlow',
    inputSchema: GetAiExplanationInputSchema,
    outputSchema: GetAiExplanationOutputSchema,
  },
  async input => {
    const { output } = await getAiExplanationPrompt(input);
    return output!;
  }
);
