// src/ai/flows/generate-chess-explanations.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating explanations of chess-related topics.
 *
 * It includes:
 * - generateChessExplanation - An async function that takes a topic as input and returns an AI-generated explanation.
 * - GenerateChessExplanationInput - The input type for the generateChessExplanation function.
 * - GenerateChessExplanationOutput - The output type for the generateChessExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChessExplanationInputSchema = z.object({
  topic: z.string().describe('The chess-related topic to explain (e.g., opening strategy, famous match, chess term).'),
});
export type GenerateChessExplanationInput = z.infer<typeof GenerateChessExplanationInputSchema>;

const GenerateChessExplanationOutputSchema = z.object({
  explanation: z.string().describe('An AI-generated explanation of the chess topic.'),
});
export type GenerateChessExplanationOutput = z.infer<typeof GenerateChessExplanationOutputSchema>;

export async function generateChessExplanation(input: GenerateChessExplanationInput): Promise<GenerateChessExplanationOutput> {
  return generateChessExplanationFlow(input);
}

const generateChessExplanationPrompt = ai.definePrompt({
  name: 'generateChessExplanationPrompt',
  input: {schema: GenerateChessExplanationInputSchema},
  output: {schema: GenerateChessExplanationOutputSchema},
  prompt: `You are an expert chess instructor. Explain the following chess topic in a clear and concise manner:

Topic: {{{topic}}}
`,
});

const generateChessExplanationFlow = ai.defineFlow(
  {
    name: 'generateChessExplanationFlow',
    inputSchema: GenerateChessExplanationInputSchema,
    outputSchema: GenerateChessExplanationOutputSchema,
  },
  async input => {
    const {output} = await generateChessExplanationPrompt(input);
    return output!;
  }
);
