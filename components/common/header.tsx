'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
  }, []);

  return (
    <header className='sticky top-0 z-10 w-full px-4 md:px-20 lg:px-40 mx-auto h-12 md:h-14 flex justify-between items-center bg-bg text-text border-b border-slate '>
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
