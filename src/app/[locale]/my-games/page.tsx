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
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { NotebookText, CheckCircle } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('MyGamesPage');
  return (
    <Button type="submit" disabled={pending}>
      {pending ? t('saving') : t('saveLog')}
    </Button>
  );
}

const initialState = {
  success: false,
  error: null as any,
  resetKey: Date.now().toString(),
};

export default function MyGamesPage() {
  const t = useTranslations('MyGamesPage');
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    if (!user) {
        return { ...initialState, error: { form: [t('errorMustBeLoggedIn')] } };
    }

    const gameLog = {
        result: formData.get('result') as 'win' | 'loss' | 'draw',
        duration: Number(formData.get('duration')),
        openingMoves: formData.get('openingMoves') as string,
        notes: formData.get('notes') as string,
        date: Timestamp.now(),
        userId: user.uid,
    };
    
    addDocumentNonBlocking(collection(firestore, `users/${user.uid}/game_logs`), gameLog);

    return { ...initialState, success: true, resetKey: Date.now().toString() };
  }, initialState);

  const gameLogsQuery = useMemoFirebase(
    () => (user ? collection(firestore, `users/${user.uid}/game_logs`) : null),
    [user, firestore]
  );
  const { data: gameLogs, isLoading: isLoadingLogs } = useCollection<GameLog>(gameLogsQuery);

  useEffect(() => {
    if(state.success) {
        formRef.current?.reset();
    }
  }, [state.success]);


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
                <AlertTitle>{t('authRequiredTitle')}</AlertTitle>
                <AlertDescription>
                    {t('authRequiredDescription')}
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
          <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('newGameTitle')}</CardTitle>
              <CardDescription>{t('newGameDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} key={state.resetKey} className="space-y-4">
                <div>
                  <Label htmlFor="result">{t('resultLabel')}</Label>
                  <Select name="result" required>
                    <SelectTrigger>
                      <SelectValue placeholder={t('resultPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="win">{t('resultWin')}</SelectItem>
                      <SelectItem value="loss">{t('resultLoss')}</SelectItem>
                      <SelectItem value="draw">{t('resultDraw')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">{t('durationLabel')}</Label>
                  <Input name="duration" type="number" placeholder={t('durationPlaceholder')} required />
                </div>

                <div>
                  <Label htmlFor="openingMoves">{t('openingMovesLabel')}</Label>
                  <Input name="openingMoves" placeholder={t('openingMovesPlaceholder')} required />
                </div>

                <div>
                  <Label htmlFor="notes">{t('notesLabel')}</Label>
                  <Textarea name="notes" placeholder={t('notesPlaceholder')} />
                </div>
                
                <SubmitButton />
                {state.success && (
                    <div className="flex items-center gap-2 text-green-600 mt-2">
                        <CheckCircle className="w-5 h-5" />
                        <p>{t('successMessage')}</p>
                    </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
            <h2 className="text-2xl font-headline font-bold mb-4">{t('pastGamesTitle')}</h2>
            <div className="space-y-4">
                {isLoadingLogs && (
                    <>
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </>
                )}
                {!isLoadingLogs && gameLogs && gameLogs.length === 0 && (
                    <p className="text-muted-foreground">{t('noGamesYet')}</p>
                )}
                {gameLogs?.sort((a,b) => b.date.toMillis() - a.date.toMillis()).map(log => (
                    <Card key={log.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                {t('gameOn', { date: format(log.date.toDate(), 'PPP') })} - <span className={`capitalize ${log.result === 'win' ? 'text-green-500' : log.result === 'loss' ? 'text-destructive' : ''}`}>{t(`result${log.result.charAt(0).toUpperCase() + log.result.slice(1)}`)}</span>
                            </CardTitle>
                            <CardDescription>{t('durationLabel')}: {log.duration} {t('minutes')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-sm">{t('openingLabel')}: <span className="font-normal">{log.openingMoves}</span></p>
                            {log.notes && <p className="font-semibold text-sm mt-2">{t('notesLabel')}: <span className="font-normal italic">"{log.notes}"</span></p>}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
