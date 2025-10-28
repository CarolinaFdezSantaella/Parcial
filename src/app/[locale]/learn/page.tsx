// src/app/learn/page.tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getAiExplanation } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslations } from 'next-intl';

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('LearnPage');
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          {t('generating')}
        </>
      ) : (
        t('askAI')
      )}
    </Button>
  );
}

export default function LearnPage() {
  const t = useTranslations('LearnPage');
  const initialState = { explanation: null, error: null };
  const [state, formAction] = useActionState(getAiExplanation, initialState);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 flex items-center gap-3">
        <BrainCircuit className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('formTitle')}</CardTitle>
          <CardDescription>
            {t('formDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="topic"
              placeholder={t('formPlaceholder')}
              className="min-h-[100px]"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state?.error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>{t('errorTitle')}</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.explanation && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              {t('aiExplanationTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {state.explanation}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
