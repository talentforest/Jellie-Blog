'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeMode from './theme-mode';
import Providers from './providers';

export default function Header() {
  const pathname = usePathname();

  const markCurrPageStyle = (currPage: string) => {
    return `text-sm md:text-base transition ${
      pathname.includes(currPage) ? 'text-indigo' : ''
    }`;
  };

  return (
    <header
      className={`top-0 z-10 text-text w-full px-4 md:px-20 lg:px-40 mx-auto h-12 md:h-14 flex justify-between items-center bg-bg border-b border-gray `}
    >
      <h1 className=''>
        <Link href='/'>Jellie Blog</Link>
      </h1>

      <nav className='flex-1 flex items-center justify-end mx-4'>
        <ul className='flex justify-between space-x-4 md:space-x-10'>
          <li className={`${markCurrPageStyle('/posts')}`}>
            <Link href='/posts'>Post</Link>
          </li>
          <li className={`${markCurrPageStyle('/about')}`}>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>

      <Providers>
        <ThemeMode />
      </Providers>
    </header>
  );
}
