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
    <html lang='en'>
      <body className={`${nanum_gothic.className} bg-slate-100`}>
        <Header />
        <main className='mt-14 md:mt-16'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
