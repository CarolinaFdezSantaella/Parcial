'use server';

import { playAIBasicOpponent } from '@/ai/flows/play-ai-basic-opponent';
import { getAiExplanationFlow } from '@/ai/flows/get-ai-explanation';
import { z } from 'zod';
import { Chess } from 'chess.js';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { getAuth } from 'firebase/auth';


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
  result: z.enum(['win', 'loss', 'draw'], { required_error: 'Please select a game result.'}),
  duration: z.coerce.number({invalid_type_error: 'Duration must be a number.'}).positive({message: 'Duration must be a positive number.'}),
  openingMoves: z.string().min(1, { message: "Opening moves are required."}),
  notes: z.string().optional(),
});

export async function saveGameLog(prevState: any, formData: FormData) {
  const { auth, firestore } = initializeFirebase();
  const user = auth.currentUser;

  if (!user) {
    return {
      success: false,
      error: { form: 'You must be logged in to save a game.' },
      resetKey: Date.now().toString(),
    }
  }
  
  const validatedFields = gameLogSchema.safeParse({
    result: formData.get('result'),
    duration: formData.get('duration'),
    openingMoves: formData.get('openingMoves'),
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return { 
      success: false,
      error: errors,
      resetKey: prevState.resetKey,
    };
  }
  
  try {
    const gameLog = {
      ...validatedFields.data,
      userId: user.uid,
      date: Timestamp.now(),
    };
    const gameLogsCollection = collection(firestore, `users/${user.uid}/game_logs`);
    await addDoc(gameLogsCollection, gameLog);

    return { success: true, error: null, resetKey: Date.now().toString() };
  } catch (e: any) {
    return {
      success: false,
      error: { form: e.message || 'An unexpected error occurred.' },
      resetKey: Date.now().toString(),
    }
  }
}
