'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='border p-4 md:py-5 md:px-20 flex justify-between items-center'>
      <h1 className='font-extrabold text-blue-600'>
        <Link href='/'>Jellie&apos;s Blog</Link>
      </h1>
      <nav>
        <ul className='flex justify-between space-x-6 md:space-x-10'>
          <li
            className={`${
              pathname.includes('/posts') ? 'text-blue-600' : ''
            } text-sm md:text-base font-bold transition`}
          >
            <Link href='/posts'>Post</Link>
          </li>
          <li
            className={`${
              pathname === '/about' ? 'text-blue-600' : ''
            } text-sm md:text-base font-bold transition `}
          >
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
