import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Bot, Calendar, Users, Trophy, GraduationCap } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

const features = [
  {
    title: 'Learn the Rules',
    description: 'Master the fundamentals of chess with our easy-to-understand rulebook.',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    href: '/rules'
  },
  {
    title: 'Play Against AI',
    description: 'Test your skills and practice new strategies against our AI opponent.',
    icon: <Bot className="h-8 w-8 text-primary" />,
    href: '/play'
  },
  {
    title: 'Explore Tournaments',
    description: 'Stay up-to-date with the latest chess tournaments around the world.',
    icon: <Calendar className="h-8 w-8 text-primary" />,
    href: '/tournaments'
  },
  {
    title: 'Discover Players',
    description: 'Learn about the top players and their journey to grandmaster status.',
    icon: <Users className="h-8 w-8 text-primary" />,
    href: '/players'
  },
  {
    title: 'Championship History',
    description: 'Dive into the rich history of the World Chess Championships.',
    icon: <Trophy className="h-8 w-8 text-primary" />,
    href: '/championships'
  },
  {
    title: 'AI Explanations',
    description: 'Get AI-powered explanations for complex chess concepts and strategies.',
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    href: '/learn'
  },
];

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-chess');

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
            Welcome to Chess Hub
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90 drop-shadow-md">
            Your one-stop destination for everything chess. Learn, play, and explore the world of strategy.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/play">Play a Game</Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-headline font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="group">
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
