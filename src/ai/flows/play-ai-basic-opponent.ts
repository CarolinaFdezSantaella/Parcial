// src/ai/flows/play-ai-basic-opponent.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for playing against a basic AI chess opponent.
 *
 * It includes:
 * - playAIBasicOpponent: The main function to initiate a game against the AI.
 * - PlayAIBasicOpponentInput: The input type for the playAIBasicOpponent function, representing the user's move in chess notation.
 * - PlayAIBasicOpponentOutput: The output type for the playAIBasicOpponent function, representing the AI's response in chess notation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlayAIBasicOpponentInputSchema = z.object({
  userMove: z
    .string()
    .describe('The user\s move in chess notation (e.g., e4, Nf3, Rxa7).'),
});
export type PlayAIBasicOpponentInput = z.infer<typeof PlayAIBasicOpponentInputSchema>;

const PlayAIBasicOpponentOutputSchema = z.object({
  aiMove: z
    .string()
    .describe('The AI\s response in chess notation (e.g., e5, Nc6, Qxd2).'),
});
export type PlayAIBasicOpponentOutput = z.infer<typeof PlayAIBasicOpponentOutputSchema>;

export async function playAIBasicOpponent(input: PlayAIBasicOpponentInput): Promise<PlayAIBasicOpponentOutput> {
  return playAIBasicOpponentFlow(input);
}

const playAIBasicOpponentPrompt = ai.definePrompt({
  name: 'playAIBasicOpponentPrompt',
  input: {schema: PlayAIBasicOpponentInputSchema},
  output: {schema: PlayAIBasicOpponentOutputSchema},
  prompt: `You are a basic AI chess opponent. The user has made the move '{{{userMove}}}'. Respond with a valid chess move in algebraic notation. Think step by step. What pieces are available for you to move? What would be a valid response to the player's move? Respond only with the move.`, // Corrected prompt here
});

const playAIBasicOpponentFlow = ai.defineFlow(
  {
    name: 'playAIBasicOpponentFlow',
    inputSchema: PlayAIBasicOpponentInputSchema,
    outputSchema: PlayAIBasicOpponentOutputSchema,
  },
  async input => {
    const {output} = await playAIBasicOpponentPrompt(input);
    return output!;
  }
);
