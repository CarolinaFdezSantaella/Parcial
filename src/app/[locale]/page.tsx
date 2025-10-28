import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Bot, Calendar, Users, Trophy, BookCopy, BrainCircuit, NotebookText } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const featureKeys = [
  'rules', 'play', 'learn', 'openings', 'tournaments', 'players', 'championships', 'myGames'
];

const featureIcons: { [key: string]: JSX.Element } = {
  rules: <BookOpen className="h-8 w-8 text-primary" />,
  play: <Bot className="h-8 w-8 text-primary" />,
  learn: <BrainCircuit className="h-8 w-8 text-primary" />,
  openings: <BookCopy className="h-8 w-8 text-primary" />,
  tournaments: <Calendar className="h-8 w-8 text-primary" />,
  players: <Users className="h-8 w-8 text-primary" />,
  championships: <Trophy className="h-8 w-8 text-primary" />,
  myGames: <NotebookText className="h-8 w-8 text-primary" />,
};

const featureHrefs: { [key: string]: string } = {
  rules: '/rules',
  play: '/play',
  learn: '/learn',
  openings: '/openings',
  tournaments: '/tournaments',
  players: '/players',
  championships: '/championships',
  myGames: '/my-games'
};

export default function Home() {
  const t = useTranslations('HomePage');
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-chess');

  const features = featureKeys.map(key => ({
    title: t(`features.${key}.title`),
    description: t(`features.${key}.description`),
    icon: featureIcons[key],
    href: featureHrefs[key],
    key: key
  }));

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[50vh] min-h-[300px] max-h-[500px] flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover brightness-50"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary-foreground drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90 drop-shadow-md">
            {t('description')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/play">{t('playButton')}</Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-headline font-bold text-center mb-10">{t('featuresTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.key} className="group">
              <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
