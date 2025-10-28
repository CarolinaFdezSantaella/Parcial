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
  history: z.array(z.string()).describe('A list of moves made so far in the game, in order, in SAN format.'),
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
  prompt: `You are a basic AI chess opponent playing as black. The user is white.
The game history in SAN is: {{#each history}}'{{this}}' {{/each}}.
The user has just made the move '{{{userMove}}}'.

Your task is to determine the next best move for black.
1. Analyze the current board state based on the full game history.
2. Identify all legal moves for black.
3. Choose a reasonable and valid move in response.
4. Your response MUST be only the single move in Standard Algebraic Notation (SAN), for example: 'e5' or 'Nf6'. Do not add any other text, explanation, or formatting.
`,
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
