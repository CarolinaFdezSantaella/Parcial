import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { championships } from "@/lib/data";
import { Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ChampionshipsPage() {
  const t = await getTranslations('ChampionshipsPage');
  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8 flex items-center gap-3">
        <Trophy className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </header>

      <div className="space-y-6">
        {championships.map((match) => (
          <Card key={match.id}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                {t('matchTitle', { year: match.year })}
              </CardTitle>
              <CardDescription>{match.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <Trophy className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('winner')}: {match.winner}</h3>
                  <p className="text-sm text-muted-foreground">{t('loser')}: {match.loser}</p>
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
