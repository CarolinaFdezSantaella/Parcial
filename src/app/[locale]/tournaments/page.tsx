import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tournaments } from "@/lib/data";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function TournamentsPage() {
  const t = await getTranslations('TournamentsPage');

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="mb-8 flex items-center gap-3">
        <Calendar className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{tournament.name}</CardTitle>
              <CardDescription>{tournament.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{tournament.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{tournament.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href={tournament.link} target="_blank" rel="noopener noreferrer">
                  {t('visitWebsite')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
