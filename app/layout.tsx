import './globals.css';
import localFont from 'next/font/local';
import Header from '@/components/layout/header';
import ScrollToTopBtn from '@/components/layout/scroll-to-top-btn';
import Providers from '@/components/layout/providers';

export const metadata = {
  title: {
    default: 'Home | Jellie Blog',
    template: '%s | Jellie Blog',
  },
  description: 'Jellie의 기술 블로그입니다.',
  icons: '/favicon.ico',
};

const scdream = localFont({
  src: [
    {
      path: './font/SCDream4.otf',
      weight: '400',
      style: 'thin',
    },
    {
      path: './font/SCDream5.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './font/SCDream6.otf',
      weight: '700',
      style: 'bold',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <link rel='manifest' href='/manifest.json' />
      <link rel='apple-touch-icon' href='/images/jellies.png' />
      <body className={`${scdream.className} bg-bg text-text overscroll-none`}>
        <Providers>
          <Header />

          <main className='relative mx-auto md:px-10 lg:px-12 pb-28 selection:bg-[rgb(186,200,255)]'>
            {children}
            <ScrollToTopBtn />
          </main>
        </Providers>
      </body>
    </html>
  );
}
