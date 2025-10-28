import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { chessOpenings } from "@/lib/data";
import { BookCopy } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function OpeningsPage() {
  const t = await getTranslations('OpeningsPage');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 flex items-center gap-3">
        <BookCopy className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </header>
      
      <Accordion type="multiple" className="w-full">
        {chessOpenings.map((opening) => (
          <AccordionItem value={opening.id} key={opening.id}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline text-left">
              {opening.name} ({opening.moves})
            </AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 leading-relaxed space-y-4">
              <p>{opening.description}</p>
              <div>
                <h4 className="font-bold">{t('strategyWhite')}:</h4>
                <p>{opening.strategy.white}</p>
              </div>
              <div>
                <h4 className="font-bold">{t('strategyBlack')}:</h4>
                <p>{opening.strategy.black}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
