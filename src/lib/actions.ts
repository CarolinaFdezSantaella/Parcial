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
    const parsedHistory = JSON.parse(historyJson);
    if (Array.isArray(parsedHistory)) {
        history = parsedHistory;
    }
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

  // Check if the user's move is valid *before* sending to AI
  const gameCopyForUserMove = new Chess(game.fen());
  if (gameCopyForUserMove.move(userMove) === null) {
    return { aiMove: null, error: `Invalid move: "${userMove}". Please enter a valid move in SAN (e.g., e4, Nf3).`};
  }

  try {
    // The history sent to the AI should include the user's latest move.
    const response = await playAIBasicOpponent({ 
      userMove: userMove,
      history: [...history, userMove] 
    });
    
    // Validate AI's move
    const gameCopyForAiMove = new Chess(gameCopyForUserMove.fen());
    if (!response.aiMove || gameCopyForAiMove.move(response.aiMove) === null) {
      console.error("AI returned invalid move:", response.aiMove, "for FEN:", gameCopyForAiMove.fen());
      return { aiMove: null, error: 'The AI provided an invalid move. This might be a bug. Try a different move.' };
    }
    
    return { aiMove: response.aiMove, error: null };
  } catch (error: any) {
    console.error("Error getting AI move:", error);
    // Provide a more user-friendly error message
    if (error.message && error.message.includes('GEMINI_API_KEY')) {
        return { aiMove: null, error: "Missing API Key. Please set your GOOGLE_API_KEY in the .env file." };
    }
    return { aiMove: null, error: error.message || 'Failed to get a response from the AI. Please try again.' };
  }
}
