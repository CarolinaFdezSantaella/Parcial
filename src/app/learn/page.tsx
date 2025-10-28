'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getAiExplanation } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : 'Explain Topic'}
    </Button>
  );
}

export default function LearnPage() {
    const initialState = {};
    const [state, dispatch] = useFormState(getAiExplanation, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.error,
            });
        }
        if (state?.explanation) {
            formRef.current?.reset();
        }
    }, [state, toast]);

    return (
        <div className="max-w-3xl mx-auto">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-headline font-bold">Learn with AI</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Ask about any chess topic, from opening theory to famous matches, and get a clear explanation.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Generate Explanation</CardTitle>
                    <CardDescription>Enter a topic you want to learn about.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={dispatch} ref={formRef} className="space-y-4">
                        <Textarea
                            name="topic"
                            placeholder="e.g., What is the Sicilian Defense? or Tell me about the 1972 Fischer-Spassky match."
                            required
                            rows={3}
                        />
                        <SubmitButton />
                        {state?.error && <p className="text-sm text-destructive text-center pt-2">{state.error}</p>}
                    </form>
                </CardContent>
            </Card>

            {state?.explanation && (
                <Card className="mt-8">
                    <CardHeader className="flex-row items-center gap-3">
                         <Lightbulb className="w-6 h-6 text-accent" />
                         <CardTitle className="font-headline text-2xl">AI Explanation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed">
                            {state.explanation}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
