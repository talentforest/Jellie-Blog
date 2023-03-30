import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';
import ScrollToTopBtn from '@/components/common/scroll-to-top-btn';

export const metadata = {
  title: {
    default: 'Home | Jellie Blog',
    template: '%s | Jellie Blog',
  },
  description: 'Jellie의 기술 블로그입니다.',
  icons: '/favicon.ico',
};

const nanum_gothic = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className={`${nanum_gothic.className} bg-bg text-text`}>
        <Header />
        <main className='relative w-full md:w-[85%] lg:w-4/5 mx-auto pb-28'>
          {children}
          <ScrollToTopBtn />
        </main>
        <Footer />
      </body>
    </html>
  );
}
