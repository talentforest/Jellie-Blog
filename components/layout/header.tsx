'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeMode from './theme-mode';
import Providers from './providers';

export default function Header() {
  const pathname = usePathname();

  const markCurrPageStyle = (currPage: string) => {
    return `text-sm md:text-[15px] font-bold transition ${
      pathname.includes(currPage) ? 'text-indigo' : 'text-gray'
    }`;
  };

  return (
    <header
      className={`top-0 z-10 text-text w-full px-4 md:px-20 lg:px-40 mx-auto h-12 md:h-14 flex justify-between items-center bg-bg border-b border-light-gray`}
    >
      <h1>
        <Link href='/' className='font-bold text-gray'>
          젤리 블로그
        </Link>
      </h1>

      <nav className='flex-1 flex items-center justify-end mx-4'>
        <ul className='flex justify-between space-x-4 md:space-x-8'>
          <li>
            <Link className={`${markCurrPageStyle('/posts')}`} href='/posts'>
              Post
            </Link>
          </li>
          <li>
            <Link className={`${markCurrPageStyle('/about')}`} href='/about'>
              About
            </Link>
          </li>
        </ul>
      </nav>

      <ThemeMode />
    </header>
  );
}
