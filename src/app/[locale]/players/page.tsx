import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { players } from "@/lib/data";
import { User, Users as UsersIcon } from "lucide-react";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';
import { getTranslations } from "next-intl/server";

export default async function PlayersPage() {
  const t = await getTranslations('PlayersPage');
  
  const getImage = (id: string) => {
    return placeholderImages.placeholderImages.find(p => p.id === id);
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="mb-8 flex items-center gap-3">
        <UsersIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">{t('title')}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {players.map((player) => {
          const playerImage = getImage(player.profileImageId);
          return (
            <Card key={player.id} className="flex flex-col text-center">
              <CardHeader className="items-center">
                 <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center">
                    {playerImage ? (
                      <Image 
                        src={playerImage.imageUrl} 
                        alt={playerImage.description} 
                        fill 
                        className="object-cover"
                        data-ai-hint={playerImage.imageHint}
                      />
                    ) : (
                      <User className="w-16 h-16 text-muted-foreground" />
                    )}
                 </div>
                <CardTitle className="font-headline text-2xl pt-2">{player.name}</CardTitle>
                <CardDescription>{player.country}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-center items-center gap-4">
                  <Badge variant="secondary">{player.title}</Badge>
                  <p className="font-bold text-lg text-primary">{player.rating}</p>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                {player.links.chesscom && (
                  <Button asChild className="w-full" variant="outline">
                    <Link href={player.links.chesscom} target="_blank" rel="noopener noreferrer">
                      {t('chesscomProfile')}
                    </Link>
                  </Button>
                )}
                {player.links.lichess && (
                   <Button asChild className="w-full" variant="outline">
                    <Link href={player.links.lichess} target="_blank" rel="noopener noreferrer">
                      {t('lichessProfile')}
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
