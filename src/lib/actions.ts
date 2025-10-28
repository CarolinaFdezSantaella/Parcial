'use server';

import { playAIBasicOpponent } from '@/ai/flows/play-ai-basic-opponent';
import { generateChessExplanation } from '@/ai/flows/generate-chess-explanations';
import { z } from 'zod';
import { Chess } from 'chess.js';


const playSchema = z.object({
  userMove: z.string().min(1, { message: "Move cannot be empty." }),
  history: z.string(), // JSON string of moves
});

export async function getAiMove(prevState: any, formData: FormData) {
  const validatedFields = playSchema.safeParse({
    userMove: formData.get('userMove'),
    history: formData.get('history'),
  });

  if (!validatedFields.success) {
    return {
      aiMove: null,
      error: validatedFields.error.flatten().fieldErrors.userMove?.[0] || "Invalid input.",
    };
  }
  
  const { userMove, history: historyJson } = validatedFields.data;
  const history = JSON.parse(historyJson);

  // Validate the user's move against the game state from history
  const game = new Chess();
  try {
    history.forEach((move: string) => game.move(move));
    const moveResult = game.move(userMove, { sloppy: true });
    if (moveResult === null) {
      return { aiMove: null, error: `Invalid move: ${userMove}. Please try another move.` };
    }
  } catch (e) {
    // This catches errors from chess.js if history is fundamentally broken
    return { aiMove: null, error: 'The game history seems to be corrupted. Please restart the game.' };
  }


  try {
    const fullHistory = [...history, userMove];
    const response = await playAIBasicOpponent({ 
        userMove: userMove, 
        history: fullHistory 
    });
    
    if (!response.aiMove || response.aiMove.includes("Invalid")) {
      return { aiMove: null, error: 'The AI returned an invalid move. Please try a different move.' };
    }
    return { aiMove: response.aiMove, error: null };
  } catch (error) {
    console.error(error);
    return { aiMove: null, error: 'Failed to get a response from the AI. The move might be invalid or the game has ended. Please try again.' };
  }
}

const learnSchema = z.object({
  topic: z.string().min(3, { message: "Topic must be at least 3 characters." }),
});

export async function getAiExplanation(prevState: any, formData: FormData) {
  const validatedFields = learnSchema.safeParse({
    topic: formData.get('topic'),
  });

  if (!validatedFields.success) {
    return {
      explanation: null,
      error: validatedFields.error.flatten().fieldErrors.topic?.[0] || "Invalid input.",
    };
  }
  
  try {
    const response = await generateChessExplanation({ topic: validatedFields.data.topic });
    return { explanation: response.explanation, error: null };
  } catch (error) {
    console.error(error);
    return { explanation: null, error: 'Failed to generate an explanation. Please try again.' };
  }
}
