'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getAiMove } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Bot } from 'lucide-react';

const Chessboard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const isBlack = (i + j) % 2 !== 0;
            board.push(
                <div key={`${i}-${j}`} className={isBlack ? 'bg-primary/50' : 'bg-primary/10'}></div>
            );
        }
    }
    return <div className="grid grid-cols-8 aspect-square w-full h-full">{board}</div>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Thinking...' : 'Make Move'}
    </Button>
  );
}

type Move = {
    user: string;
    ai: string;
};

export default function PlayPage() {
    const initialState = {};
    const [state, dispatch] = useFormState(getAiMove, initialState);
    const [history, setHistory] = useState<Move[]>([]);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const hiddenHistoryRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state?.error) {
            toast({
                variant: 'destructive',
                title: 'Invalid Move',
                description: state.error,
            });
        }
        if (state?.aiMove) {
            const lastUserMove = formRef.current?.move.value;
            if (lastUserMove) {
                const newHistory = [...history, { user: lastUserMove, ai: state.aiMove as string }];
                setHistory(newHistory);
                if (hiddenHistoryRef.current) {
                    const flatHistory = newHistory.flatMap(turn => [turn.user, turn.ai]);
                    hiddenHistoryRef.current.value = JSON.stringify(flatHistory);
                }
            }
            formRef.current?.reset();
        }
    }, [state, toast, history]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            <div className="flex-grow lg:w-2/3">
                <header className="mb-8">
                    <h1 className="text-4xl font-headline font-bold">Play Against AI</h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Enter your move in algebraic notation (e.g., e4, Nf3) and see how the AI responds.
                    </p>
                </header>
                <div className="relative aspect-square max-w-[600px] mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Chessboard />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
                </div>
            </div>

            <div className="lg:w-1/3 lg:max-w-md">
                <Card className="sticky top-20">
                    <CardHeader>
                        <CardTitle className="font-headline">Game</CardTitle>
                        <CardDescription>Move history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] w-full border rounded-md p-4 bg-muted/30">
                            {history.length === 0 ? (
                                <p className="text-center text-muted-foreground">No moves yet. You start with white.</p>
                            ) : (
                                <div className="space-y-4">
                                    {history.map((turn, index) => (
                                        <div key={index} className="space-y-2 text-sm">
                                            <div className="flex items-start gap-2">
                                                <User className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                                                <div>
                                                    <span className="font-semibold">You:</span> {turn.user}
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                                                <div>
                                                    <span className="font-semibold">AI:</span> {turn.ai}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                    <CardFooter>
                        <form action={dispatch} ref={formRef} className="w-full space-y-4">
                            <input type="hidden" name="history" ref={hiddenHistoryRef} value="[]" />
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input name="move" placeholder="e.g., e4" required className="flex-grow"/>
                                <SubmitButton />
                            </div>
                            {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
