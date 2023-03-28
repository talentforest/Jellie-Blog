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
    <header className='bg-bg text-text border-b border-slate sticky top-0 z-10 w-full h-14 px-4 md:px-20 flex justify-between items-center'>
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
        <button onClick={toggleDarkMode}>
          {dark ? (
            <RiSunFill className='w-5 h-5' />
          ) : (
            <RiMoonClearFill className='w-5 h-5' />
          )}
        </button>
      </nav>
    </header>
  );
}
