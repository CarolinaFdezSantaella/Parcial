import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { championships } from "@/lib/data";
import { Trophy } from "lucide-react";

export default function ChampionshipsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold">World Chess Championships</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A look back at some of the most memorable title matches in chess history.
        </p>
      </header>

      <div className="space-y-6">
        {championships.map((match) => (
          <Card key={match.id}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                World Chess Championship {match.year}
              </CardTitle>
              <CardDescription>{match.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <Trophy className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Winner: {match.winner}</h3>
                  <p className="text-sm text-muted-foreground">Defeated: {match.loser}</p>
                </div>
              </div>
              <p className="leading-relaxed text-foreground/80">{match.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
