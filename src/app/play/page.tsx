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
import { Chess } from 'chess.js';
import { King, Queen, Rook, Bishop, Knight, Pawn } from '@/components/icons/chess-icons';

const PIECE_COMPONENTS: { [key: string]: React.FC<{ className: string }> } = {
  k: King,
  q: Queen,
  r: Rook,
  b: Bishop,
  n: Knight,
  p: Pawn,
};

const Chessboard = ({ board }: { board: ({ square: string; type: string; color: string } | null)[][] }) => {
    const renderBoard = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const isBlack = (i + j) % 2 !== 0;
            const piece = board[i][j];
            const PieceComponent = piece ? PIECE_COMPONENTS[piece.type] : null;

            renderBoard.push(
                <div key={`${i}-${j}`} className={`flex items-center justify-center ${isBlack ? 'bg-primary/50' : 'bg-primary/10'}`}>
                    {PieceComponent && (
                        <PieceComponent
                            className={`w-3/4 h-3/4 ${piece?.color === 'b' ? 'text-foreground' : 'text-primary-foreground'}`}
                        />
                    )}
                </div>
            );
        }
    }
    return <div className="grid grid-cols-8 aspect-square w-full h-full">{renderBoard}</div>;
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
    const initialState = { error: null, aiMove: null };
    const [state, dispatch] = useFormState(getAiMove, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const moveInputRef = useRef<HTMLInputElement>(null);

    const [game, setGame] = useState(() => new Chess());
    const [board, setBoard] = useState(game.board());
    const [moveHistory, setMoveHistory] = useState<Move[]>([]);

    useEffect(() => {
        if (state?.error) {
            toast({
                variant: 'destructive',
                title: 'Invalid Move',
                description: state.error,
            });
        }
        if (state?.aiMove) {
            const lastUserMove = moveInputRef.current?.value;
            if (lastUserMove) {
                const newGame = new Chess(game.fen());
                if (newGame.move(lastUserMove, { sloppy: true })) {
                    if(newGame.move(state.aiMove as string, { sloppy: true })) {
                       setGame(newGame);
                       setBoard(newGame.board());
                       setMoveHistory(prev => [...prev, { user: lastUserMove, ai: state.aiMove as string }]);
                    } else {
                        // AI move is invalid, this shouldn't happen with a proper AI
                         toast({ variant: 'destructive', title: 'Invalid AI Move', description: state.aiMove as string });
                    }
                } else {
                     // This case should be handled by form validation/server action, but as a fallback
                     toast({ variant: 'destructive', title: 'Invalid Move', description: 'Your move was invalid.' });
                }
            }
            formRef.current?.reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleFormAction = (formData: FormData) => {
        const currentMove = formData.get('move') as string;
        if (!currentMove) return;

        const tempGame = new Chess(game.fen());
        // Check if the move is valid before dispatching
        if (!tempGame.move(currentMove, { sloppy: true })) {
             toast({
                variant: 'destructive',
                title: 'Invalid Move',
                description: `The move "${currentMove}" is not a valid move.`,
            });
            return;
        }

        // We only send the SAN history, not the whole FEN
        const sanHistory = game.history();
        formData.set('history', JSON.stringify(sanHistory));
        formData.set('userMove', currentMove); // Also send the current move separately

        dispatch(formData);
    }
    
    const handleRestart = () => {
        const newGame = new Chess();
        setGame(newGame);
        setBoard(newGame.board());
        setMoveHistory([]);
        formRef.current?.reset();
        // Reset server action state if possible, or just clear local state
    }


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
                    <Chessboard board={board} />
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
                            {moveHistory.length === 0 ? (
                                <p className="text-center text-muted-foreground">No moves yet. You start with white.</p>
                            ) : (
                                <div className="space-y-4">
                                    {moveHistory.map((turn, index) => (
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
                    <CardFooter className="flex-col items-stretch gap-4">
                        <form action={handleFormAction} ref={formRef} className="w-full space-y-4">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input name="move" placeholder="e.g., e4" required className="flex-grow" ref={moveInputRef}/>
                                <SubmitButton />
                            </div>
                            {state?.error && !state.aiMove && <p className="text-sm text-destructive">{state.error}</p>}
                        </form>
                        <Button variant="outline" onClick={handleRestart}>Restart Game</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
