'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { saveGameLog } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { NotebookText, CheckCircle } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

type GameLog = {
  id: string;
  result: 'win' | 'loss' | 'draw';
  duration: number;
  openingMoves: string;
  notes?: string;
  date: Timestamp;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Game Log'}
    </Button>
  );
}

const initialState = {
  success: false,
  error: null as any,
  resetKey: Date.now().toString(),
};

export default function MyGamesPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(saveGameLog, initialState);

  const gameLogsQuery = useMemoFirebase(
    () => (user ? collection(firestore, `users/${user.uid}/game_logs`) : null),
    [user, firestore]
  );
  const { data: gameLogs, isLoading: isLoadingLogs } = useCollection<GameLog>(gameLogsQuery);

  useEffect(() => {
    if(state.success) {
        formRef.current?.reset();
    }
  }, [state.success, state.resetKey]);


  if (isUserLoading) {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-8 w-3/4" />
                <Card>
                    <CardHeader><Skeleton className="h-8 w-1/4" /></CardHeader>
                    <CardContent><Skeleton className="h-40 w-full" /></CardContent>
                </Card>
            </div>
        </div>
    );
  }

  if (!user) {
    return (
        <div className="max-w-4xl mx-auto p-4 text-center">
             <Alert variant="destructive">
                <AlertTitle>Authentication Required</AlertTitle>
                <AlertDescription>
                    You must be signed in to view and log your games. An anonymous account has been created for you. Please refresh the page if you still see this message.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 flex items-center gap-3">
        <NotebookText className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">My Game Logs</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Keep a personal record of your chess battles.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Log a New Game</CardTitle>
              <CardDescription>Fill in the details of your last match.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} key={state.resetKey} className="space-y-4">
                <div>
                  <Label htmlFor="result">Game Result</Label>
                  <Select name="result" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="win">I Won</SelectItem>
                      <SelectItem value="loss">I Lost</SelectItem>
                      <SelectItem value="draw">Draw</SelectItem>
                    </SelectContent>
                  </Select>
                  {state.error?.result && <p className="text-sm text-destructive mt-1">{state.error.result}</p>}
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input name="duration" type="number" placeholder="e.g., 30" required />
                  {state.error?.duration && <p className="text-sm text-destructive mt-1">{state.error.duration}</p>}
                </div>

                <div>
                  <Label htmlFor="openingMoves">Opening Moves</Label>
                  <Input name="openingMoves" placeholder="e.g., 1. e4 e5 2. Nf3" required />
                  {state.error?.openingMoves && <p className="text-sm text-destructive mt-1">{state.error.openingMoves}</p>}
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea name="notes" placeholder="Any interesting moments, mistakes, or things to remember..." />
                </div>
                
                <SubmitButton />
                {state.success && (
                    <div className="flex items-center gap-2 text-green-600 mt-2">
                        <CheckCircle className="w-5 h-5" />
                        <p>Game log saved successfully!</p>
                    </div>
                )}
                 {state.error?.form && (
                    <div className="flex items-center gap-2 text-destructive mt-2">
                        <p>{state.error.form}</p>
                    </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
            <h2 className="text-2xl font-headline font-bold mb-4">Past Games</h2>
            <div className="space-y-4">
                {isLoadingLogs && (
                    <>
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </>
                )}
                {!isLoadingLogs && gameLogs && gameLogs.length === 0 && (
                    <p className="text-muted-foreground">You haven't logged any games yet.</p>
                )}
                {gameLogs?.sort((a,b) => b.date.toMillis() - a.date.toMillis()).map(log => (
                    <Card key={log.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Game on {format(log.date.toDate(), 'PPP')} - <span className={`capitalize ${log.result === 'win' ? 'text-green-500' : log.result === 'loss' ? 'text-destructive' : ''}`}>{log.result}</span>
                            </CardTitle>
                            <CardDescription>Duration: {log.duration} minutes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-sm">Opening: <span className="font-normal">{log.openingMoves}</span></p>
                            {log.notes && <p className="font-semibold text-sm mt-2">Notes: <span className="font-normal italic">"{log.notes}"</span></p>}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
