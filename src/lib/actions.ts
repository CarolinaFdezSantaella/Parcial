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
  let history: string[];
  try {
    // historyJson now includes the latest userMove, so we parse it directly
    history = JSON.parse(historyJson);
  } catch (e) {
    return { aiMove: null, error: 'Corrupted game history. Please restart.' };
  }

  // Validate the entire game from the start to ensure the final move is valid in context
  const game = new Chess();
  try {
    history.forEach((move: string) => {
        const moveResult = game.move(move);
        if (moveResult === null) {
            throw new Error(`Invalid move in history: ${move}`);
        }
    });
  } catch (e: any) {
    // This catches an invalid move from the history provided by the client
    return { aiMove: null, error: `Invalid move detected in game history: ${e.message}. Please restart.` };
  }


  try {
    const response = await playAIBasicOpponent({ 
        userMove: userMove, 
        history: history // The history already includes the user's move
    });
    
    // Validate AI's move before sending it back
    const aiGame = new Chess(game.fen());
    if (!response.aiMove || aiGame.move(response.aiMove) === null) {
        console.error("AI returned invalid move:", response.aiMove, "for FEN:", game.fen());
        return { aiMove: null, error: 'The AI returned an invalid move. This might be a bug. Please try a different move.' };
    }
    
    return { aiMove: response.aiMove, error: null };
  } catch (error) {
    console.error("Error getting AI move:", error);
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
