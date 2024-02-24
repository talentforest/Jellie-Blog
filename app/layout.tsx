import './globals.css';
import localFont from 'next/font/local';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ScrollToTopBtn from '@/components/layout/scroll-to-top-btn';

export const metadata = {
  title: {
    default: 'Home | Jellie Blog',
    template: '%s | Jellie Blog',
  },
  description: 'Jellie의 기술 블로그입니다.',
  icons: '/favicon.ico',
};

const locus_sangsang = localFont({
  src: './font/locus_sangsang.ttf',
  display: 'swap',
});

const kingSejongs = localFont({
  src: [
    {
      path: './font/KingSejongInstitute_Bold.ttf',
      weight: '700',
    },
    {
      path: './font/KingSejongInstitute_Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-kingSejongs',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${kingSejongs.variable} ${locus_sangsang.className} bg-bg text-text overscroll-none`}
      >
        <Header />

        <main className='relative md:px-20 lg:px-40 mx-auto pb-28 selection:bg-[rgb(186,200,255)]'>
          {children}
          <ScrollToTopBtn />
        </main>

        <Footer />
      </body>
    </html>
  );
}
