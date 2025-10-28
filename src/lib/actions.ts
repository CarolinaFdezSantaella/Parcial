'use server';

import { playAIBasicOpponent } from '@/ai/flows/play-ai-basic-opponent';
import { getAiExplanationFlow } from '@/ai/flows/get-ai-explanation';
import { z } from 'zod';
import { Chess } from 'chess.js';
import { getLocale } from 'next-intl/server';
import {createTranslator} from 'next-intl';

async function getTranslationsForAction() {
  const locale = await getLocale();
  const messages = (await import(`../messages/${locale}.json`)).default;
  return createTranslator({locale, messages});
}


const playSchema = z.object({
  userMove: z.string().min(1),
  history: z.string(), // JSON string of moves
});

export async function getAiMove(prevState: any, formData: FormData) {
  const t = await getTranslationsForAction();
  
  const validatedFields = playSchema.safeParse({
    userMove: formData.get('userMove'),
    history: formData.get('history'),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return {
      aiMove: null,
      error: error.userMove?.[0] || error.history?.[0] || t('PlayPage.toast.invalidInput'),
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
    return { aiMove: null, error: t('PlayPage.toast.corruptedHistory') };
  }

  const game = new Chess();
  try {
    history.forEach(move => {
      if (game.move(move) === null) {
        throw new Error(t('PlayPage.toast.invalidHistoryMove', { move }));
      }
    });
  } catch (e: any) {
    return { aiMove: null, error: e.message || t('PlayPage.toast.historyValidationError') };
  }

  const gameCopyForUserMove = new Chess(game.fen());
  if (gameCopyForUserMove.move(userMove) === null) {
    return { aiMove: null, error: t('PlayPage.toast.invalidMove.description', { move: userMove })};
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
      return { aiMove: null, error: t('PlayPage.toast.aiInvalidMove') };
    }
    
    return { aiMove: response.aiMove, error: null };
  } catch (error: any) {
    console.error("Error getting AI move:", error);
    if (error.message && (error.message.includes('GEMINI_API_KEY') || error.message.includes('GOOGLE_API_KEY'))) {
        return { aiMove: null, error: t('actions.apiKeyError') };
    }
    return { aiMove: null, error: error.message || t('actions.aiResponseError') };
  }
}

const learnSchema = z.object({
  topic: z.string().min(3),
});

export async function getAiExplanation(prevState: any, formData: FormData) {
  const t = await getTranslationsForAction();

  const validatedFields = learnSchema.safeParse({
    topic: formData.get('topic'),
  });

  if (!validatedFields.success) {
    return { 
      explanation: null, 
      error: validatedFields.error.flatten().fieldErrors.topic?.[0] || t('LearnPage.toast.invalidInput')
    };
  }

  try {
    const response = await getAiExplanationFlow({ topic: validatedFields.data.topic });
    return { explanation: response.explanation, error: null };
  } catch (error: any) {
    console.error("Error getting AI explanation:", error);
    if (error.message && (error.message.includes('GEMINI_API_KEY') || error.message.includes('GOOGLE_API_KEY'))) {
        return { explanation: null, error: t('actions.apiKeyError') };
    }
    return { explanation: null, error: error.message || t('actions.aiResponseError') };
  }
}

const gameLogSchema = z.object({
  result: z.enum(['win', 'loss', 'draw']),
  duration: z.coerce.number().positive(),
  openingMoves: z.string().min(1),
  notes: z.string().optional(),
});

export async function saveGameLog(prevState: any, formData: FormData) {
  const t = await getTranslationsForAction();
  
  const validatedFields = gameLogSchema.safeParse({
    result: formData.get('result'),
    duration: formData.get('duration'),
    openingMoves: formData.get('openingMoves'),
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorMessages = {
      result: errors.result?.[0] ? t('MyGamesPage.errors.result') : undefined,
      duration: errors.duration?.[0] ? t('MyGamesPage.errors.duration') : undefined,
      openingMoves: errors.openingMoves?.[0] ? t('MyGamesPage.errors.openingMoves') : undefined,
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
