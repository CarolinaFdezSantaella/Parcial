import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { MainLayout } from '@/components/main-layout';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Chess Hub',
  description: 'Your one-stop destination for everything chess.',
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
        )}
      >
        <FirebaseClientProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MainLayout>
              {children}
            </MainLayout>
          </NextIntlClientProvider>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
