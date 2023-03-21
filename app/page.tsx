import { Nanum_Gothic } from 'next/font/google';

const noto_sans_kr = Nanum_Gothic({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className={noto_sans_kr.className}>this is main page 안녕하세요</div>
  );
}
