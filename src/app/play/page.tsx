'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getAiMove } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Bot } from 'lucide-react';
import { Chess, Piece } from 'chess.js';
import { King, Queen, Rook, Bishop, Knight, Pawn } from '@/components/icons/chess-icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PIECE_COMPONENTS: { [key: string]: React.FC<{ className: string }> } = {
  k: King,
  q: Queen,
  r: Rook,
  b: Bishop,
  n: Knight,
  p: Pawn,
};

const Chessboard = ({ board }: { board: (Piece | null)[][] }) => {
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
    const [moveHistory, setMoveHistory] = useState<Move[]>([]);
    const [gameOver, setGameOver] = useState<{isGameOver: boolean; message: string}>({isGameOver: false, message: ''});
    
    const board = useMemo(() => game.board(), [game]);

    const handleRestart = () => {
        const newGame = new Chess();
        setGame(newGame);
        setMoveHistory([]);
        setGameOver({isGameOver: false, message: ''});
        formRef.current?.reset();
    }

    useEffect(() => {
        if (game.isGameOver()) {
            let message = "Game Over";
            if (game.isCheckmate()) {
                message = `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`;
            } else if (game.isDraw()) {
                message = "It's a draw!";
            } else if (game.isStalemate()) {
                message = "Stalemate!";
            } else if (game.isThreefoldRepetition()) {
                message = "Draw by threefold repetition.";
            } else if (game.isInsufficientMaterial()) {
                message = "Draw by insufficient material.";
            }
            setGameOver({isGameOver: true, message: message + " Starting a new game."});
        }
    }, [game]);


    useEffect(() => {
        if (state?.error) {
            toast({
                variant: 'destructive',
                title: 'Invalid Move',
                description: state.error,
            });
        }
        if (state?.aiMove) {
            const lastUserMove = formRef.current?.querySelector<HTMLInputElement>('input[name="userMove"]')?.value;
            if (lastUserMove) {
                const gameCopy = new Chess(game.fen());
                
                // We already validated the user move in handleFormAction, so apply it.
                gameCopy.move(lastUserMove);
                
                // Now apply the AI move
                const aiMoveResult = gameCopy.move(state.aiMove);
                
                if (aiMoveResult) {
                    setGame(gameCopy);
                    setMoveHistory(prev => [...prev, { user: lastUserMove, ai: state.aiMove as string }]);
                } else {
                    // This is a safeguard, the AI should not return invalid moves
                    toast({
                        variant: 'destructive',
                        title: 'Invalid AI Move',
                        description: `The AI returned an invalid move: ${state.aiMove}. The game state has been rolled back. Please try your move again.`
                    });
                }
            }
            formRef.current?.reset();
            moveInputRef.current?.focus();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleFormAction = (formData: FormData) => {
        const userMove = formData.get('move') as string;
        if (!userMove) return;

        const gameCopy = new Chess(game.fen());
        try {
            const moveResult = gameCopy.move(userMove, { sloppy: true });
             if (moveResult === null) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Move',
                    description: `The move "${userMove}" is not valid. Please try again.`,
                });
                return;
            }
        } catch (e: any) {
            toast({
                variant: 'destructive',
                title: 'Invalid Move Format',
                description: e.message || `The move "${userMove}" could not be understood.`,
            });
            return;
        }

        const history = game.history({ verbose: false });
        formData.set('history', JSON.stringify([...history, userMove]));
        formData.set('userMove', userMove);

        dispatch(formData);
    }
    

    return (
        <>
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
                             <input type="hidden" name="userMove" value={moveInputRef.current?.value || ''} />
                             <input type="hidden" name="history" value={JSON.stringify(game.history())} />
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
        <AlertDialog open={gameOver.isGameOver} onOpenChange={(open) => !open && handleRestart()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Game Over</AlertDialogTitle>
                <AlertDialogDescription>
                    {gameOver.message}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogAction onClick={handleRestart}>Play Again</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </>
    );
}
