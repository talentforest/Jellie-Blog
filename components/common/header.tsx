'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='border-b sticky top-0 z-10 bg-slate-100 w-full h-14 px-4 md:px-20 flex justify-between items-center'>
      <h1 className='font-bold text-blue-600'>
        <Link href='/'>Devlog</Link>
      </h1>
      <nav>
        <ul className='flex justify-between space-x-6 md:space-x-10'>
          <li
            className={`${
              pathname.includes('/posts') ? 'text-blue-600 font-bold' : ''
            } text-sm md:text-base transition`}
          >
            <Link href='/posts'>Post</Link>
          </li>
          <li
            className={`${
              pathname === '/about' ? 'text-blue-600 font-bold' : ''
            } text-sm md:text-base transition `}
          >
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
