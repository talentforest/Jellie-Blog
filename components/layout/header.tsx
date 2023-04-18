'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeMode from './theme-mode';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-20 w-full px-4 md:px-20 lg:px-40 mx-auto h-12 md:h-14 flex justify-between items-center bg-bg text-text border-b border-slate '>
      <h1 className='font-bold'>
        <Link href='/'>Devlog</Link>
      </h1>
      <nav className='flex items-center h-full justify-between space-x-3'>
        <ul className='flex justify-between space-x-3 md:space-x-10'>
          <li
            className={`${
              pathname.includes('/posts') ? 'font-bold' : ''
            } text-sm md:text-base transition`}
          >
            <Link href='/posts'>Post</Link>
          </li>
          <li
            className={`${
              pathname === '/about' ? 'font-bold' : ''
            } text-sm md:text-base transition `}
          >
            <Link href='/about'>About</Link>
          </li>
        </ul>
        <ThemeMode />
      </nav>
    </header>
  );
}
