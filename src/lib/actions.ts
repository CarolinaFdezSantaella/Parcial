'use server';

import { playAIBasicOpponent } from '@/ai/flows/play-ai-basic-opponent';
import { generateChessExplanation } from '@/ai/flows/generate-chess-explanations';
import { z } from 'zod';

const playSchema = z.object({
  move: z.string().min(2, { message: "Move must be at least 2 characters." }),
  history: z.string(), // JSON string of moves
});

export async function getAiMove(prevState: any, formData: FormData) {
  const validatedFields = playSchema.safeParse({
    move: formData.get('move'),
    history: formData.get('history'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.move?.[0] || "Invalid input.",
    };
  }

  try {
    const history = JSON.parse(validatedFields.data.history);
    const response = await playAIBasicOpponent({ userMove: validatedFields.data.move, history });
    if (!response.aiMove || response.aiMove.includes("Invalid")) {
      return { error: 'The AI returned an invalid move. Please try a different move.' };
    }
    return { aiMove: response.aiMove };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get a response from the AI. The move might be invalid or the game has ended. Please try again.' };
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
      error: validatedFields.error.flatten().fieldErrors.topic?.[0] || "Invalid input.",
    };
  }
  
  try {
    const response = await generateChessExplanation({ topic: validatedFields.data.topic });
    return { explanation: response.explanation };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate an explanation. Please try again.' };
  }
}
