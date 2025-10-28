import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { players } from "@/lib/data";
import { User } from "lucide-react";

export default function PlayersPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold">Legendary Players</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover the icons who have shaped the game of chess.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {players.map((player) => (
            <Card key={player.id} className="flex flex-col text-center">
              <CardHeader className="items-center">
                 <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground" />
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
                      Chess.com Profile
                    </Link>
                  </Button>
                )}
                {player.links.lichess && (
                   <Button asChild className="w-full" variant="outline">
                    <Link href={player.links.lichess} target="_blank" rel="noopener noreferrer">
                      Lichess.org Profile
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
