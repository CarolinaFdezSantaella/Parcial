import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { chessRules } from "@/lib/data";

export default function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold">Rules of Chess</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A comprehensive guide to the rules of chess, from basic movement to special moves.
        </p>
      </header>
      
      <Accordion type="single" collapsible className="w-full">
        {chessRules.map((rule) => (
          <AccordionItem value={rule.id} key={rule.id}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">
              {rule.title}
            </AccordionTrigger>
            <AccordionContent className="text-base text-foreground/80 leading-relaxed">
              {rule.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
