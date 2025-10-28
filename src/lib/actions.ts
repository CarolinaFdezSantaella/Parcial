'use server';

import { playAIBasicOpponent } from '@/ai/flows/play-ai-basic-opponent';
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
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      aiMove: null,
      error: error.userMove?.[0] || error.history?.[0] || "Invalid input.",
    };
  }
  
  const { userMove, history: historyJson } = validatedFields.data;
  
  let history: string[] = [];
  try {
    history = JSON.parse(historyJson);
  } catch (e) {
    return { aiMove: null, error: 'Corrupted game history. Please restart.' };
  }

  const game = new Chess();
  try {
    history.forEach(move => {
      if (game.move(move) === null) {
        throw new Error(`Invalid move in history: ${move}`);
      }
    });
  } catch (e: any) {
    return { aiMove: null, error: e.message || "An error occurred validating history." };
  }

  try {
    const response = await playAIBasicOpponent({ 
      userMove: userMove,
      history: [...history, userMove] 
    });
    
    const aiGame = new Chess(game.fen());
    aiGame.move(userMove);
    
    if (!response.aiMove || aiGame.move(response.aiMove) === null) {
      console.error("AI returned invalid move:", response.aiMove, "for FEN:", aiGame.fen());
      return { aiMove: null, error: 'The AI provided an invalid move. This might be a bug. Try a different move.' };
    }
    
    return { aiMove: response.aiMove, error: null };
  } catch (error: any) {
    console.error("Error getting AI move:", error);
    return { aiMove: null, error: error.message || 'Failed to get a response from the AI. Please try again.' };
  }
}
