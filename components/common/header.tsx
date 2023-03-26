'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

export default function Header() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true);

  const toggleDarkMode = () => {
    dark
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark');
    setDark((prev) => !prev);
  };

  return (
    <header className='dark:bg-slate-900 dark:border-slate-600 border-b sticky top-0 z-10 bg-slate-100 w-full h-14 px-4 md:px-20 flex justify-between items-center'>
      <h1 className='font-bold text-blue-600'>
        <Link href='/'>Devlog</Link>
      </h1>
      <nav className='flex items-center h-full justify-between space-x-3'>
        <ul className='flex justify-between space-x-3 md:space-x-10'>
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
        <button
          className='p-2 rounded-full bg-blue-500 dark:bg-blue-700'
          onClick={toggleDarkMode}
        >
          {dark ? (
            <RiSunFill className='text-yellow-300 w-5 h-5' />
          ) : (
            <RiMoonClearFill className='text-yellow-300 w-5 h-5' />
          )}
        </button>
      </nav>
    </header>
  );
}
