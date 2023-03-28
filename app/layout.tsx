import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'Home | Jellie Blog',
  description: 'Jellie의 기술 블로그입니다.',
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
        <main className='relative pb-20 md:px-20 border-slate'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
