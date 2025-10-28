import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { chessRules } from "@/lib/data";
import { BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function RulesPage() {
  const t = await getTranslations('RulesPage');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </header>
      
      <Accordion type="single" collapsible className="w-full">
        {chessRules.map((rule) => (
          <AccordionItem value={rule.id} key={rule.id}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline text-left">
              {t(`${rule.id}.title`)}
            </AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 leading-relaxed">
              {t(`${rule.id}.content`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
