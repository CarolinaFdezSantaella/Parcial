'use server';

import { playAIBasicOpponent } from '@/ai/flows/play-ai-basic-opponent';
import { getAiExplanationFlow } from '@/ai/flows/get-ai-explanation';
import { z } from 'zod';
import { Chess } from 'chess.js';

const playSchema = z.object({
  userMove: z.string().min(1),
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
      error: error.userMove?.[0] || error.history?.[0] || 'Invalid input.',
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
    return { aiMove: null, error: e.message || 'An error occurred validating history.' };
  }

  const gameCopyForUserMove = new Chess(game.fen());
  if (gameCopyForUserMove.move(userMove) === null) {
    return { aiMove: null, error: `The move "${userMove}" is not valid. Please try again.`};
  }

  try {
    const historyWithUserMove = [...history, userMove];
    const response = await playAIBasicOpponent({ 
      userMove: userMove,
      history: historyWithUserMove,
    });
    
    const gameCopyForAiMove = new Chess(gameCopyForUserMove.fen());
    if (!response.aiMove || gameCopyForAiMove.move(response.aiMove) === null) {
      console.error("AI returned invalid move:", response.aiMove, "for FEN:", gameCopyForAiMove.fen());
      return { aiMove: null, error: 'The AI provided an invalid move. This might be a bug. Try a different move.' };
    }
    
    return { aiMove: response.aiMove, error: null };
  } catch (error: any) {
    console.error("Error getting AI move:", error);
    if (error.message && (error.message.includes('GEMINI_API_KEY') || error.message.includes('GOOGLE_API_KEY'))) {
        return { aiMove: null, error: "Missing or invalid API Key. Please set your GOOGLE_API_KEY in the .env file." };
    }
    return { aiMove: null, error: error.message || 'Failed to get a response from the AI. Please try again.' };
  }
}

const learnSchema = z.object({
  topic: z.string().min(3, { message: "Question must be at least 3 characters."}),
});

export async function getAiExplanation(prevState: any, formData: FormData) {
  const validatedFields = learnSchema.safeParse({
    topic: formData.get('topic'),
  });

  if (!validatedFields.success) {
    return { 
      explanation: null, 
      error: validatedFields.error.flatten().fieldErrors.topic?.[0] || "Invalid input."
    };
  }

  try {
    const response = await getAiExplanationFlow({ topic: validatedFields.data.topic });
    return { explanation: response.explanation, error: null };
  } catch (error: any) {
    console.error("Error getting AI explanation:", error);
    if (error.message && (error.message.includes('GEMINI_API_KEY') || error.message.includes('GOOGLE_API_KEY'))) {
        return { explanation: null, error: "Missing or invalid API Key. Please set your GOOGLE_API_KEY in the .env file." };
    }
    return { explanation: null, error: error.message || 'Failed to get a response from the AI. Please try again.' };
  }
}

const gameLogSchema = z.object({
  result: z.enum(['win', 'loss', 'draw']),
  duration: z.coerce.number().positive(),
  openingMoves: z.string().min(1),
  notes: z.string().optional(),
});

export async function saveGameLog(prevState: any, formData: FormData) {
  
  const validatedFields = gameLogSchema.safeParse({
    result: formData.get('result'),
    duration: formData.get('duration'),
    openingMoves: formData.get('openingMoves'),
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorMessages = {
      result: errors.result?.[0] ? "Please select a game result." : undefined,
      duration: errors.duration?.[0] ? "Duration must be a positive number." : undefined,
      openingMoves: errors.openingMoves?.[0] ? "Opening moves are required." : undefined,
    }

    return { 
      success: false,
      error: errorMessages,
    };
  }
  
  // This is where you would save the data to Firestore.
  // We will add this logic in the next step.
  console.log('Validated data:', validatedFields.data);

  return { success: true, error: null };
}
