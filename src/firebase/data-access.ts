'use client';

import {
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { useFirestore } from './provider';
import { addDocumentNonBlocking } from './non-blocking-updates';

export type ChessGameLog = {
  userId: string;
  result: 'win' | 'loss' | 'draw';
  duration: number;
  openingMoves: string;
  notes?: string;
  date: Timestamp;
};

export function useGameLogDataAccess() {
  const firestore = useFirestore();

  const addGameLog = (
    userId: string,
    gameLog: Omit<ChessGameLog, 'userId' | 'date' | 'id'>
  ) => {
    if (!userId) {
      throw new Error('User must be authenticated to add a game log.');
    }
    const gameLogsCollection = collection(
      firestore,
      `users/${userId}/game_logs`
    );

    const newLog: Omit<ChessGameLog, 'id'> = {
      ...gameLog,
      userId,
      date: Timestamp.now(),
    };
    
    // Using non-blocking update
    addDocumentNonBlocking(gameLogsCollection, newLog);
  };

  return { addGameLog };
}
