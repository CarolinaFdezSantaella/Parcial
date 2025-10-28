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
    .describe('The user\'s move in chess notation (e.g., e4, Nf3, Rxa7).'),
  history: z.array(z.string()).describe('A list of moves made so far in the game, in order.'),
});
export type PlayAIBasicOpponentInput = z.infer<typeof PlayAIBasicOpponentInputSchema>;

const PlayAIBasicOpponentOutputSchema = z.object({
  aiMove: z
    .string()
    .describe('The AI\'s response in chess notation (e.g., e5, Nc6, Qxd2).'),
});
export type PlayAIBasicOpponentOutput = z.infer<typeof PlayAIBasicOpponentOutputSchema>;

export async function playAIBasicOpponent(input: PlayAIBasicOpponentInput): Promise<PlayAIBasicOpponentOutput> {
  return playAIBasicOpponentFlow(input);
}

const playAIBasicOpponentPrompt = ai.definePrompt({
  name: 'playAIBasicOpponentPrompt',
  input: {schema: PlayAIBasicOpponentInputSchema},
  output: {schema: PlayAIBasicOpponentOutputSchema},
  prompt: `You are a basic AI chess opponent. You are playing as black.
The user is playing as white.
The game history (so far) is: {{#each history}}{{{this}}}{{/each}}
The user has just made the move '{{{userMove}}}'.

Think step-by-step:
1.  What is the current state of the board based on the history?
2.  What pieces can you (black) legally move?
3.  What is a reasonable and valid response to the user's move?
4.  The move must be in Standard Algebraic Notation (SAN).

Respond with only the valid chess move you will make. Do not add any other text.`,
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
