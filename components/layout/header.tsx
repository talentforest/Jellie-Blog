'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeMode from './theme-mode';
import Providers from './providers';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  const markCurrPageStyle = (currPage: string) => {
    return `text-sm md:text-base transition ${
      pathname.includes(currPage) ? 'text-indigo' : 'text-gray'
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-10 text-text w-full h-14 md:h-[65px] bg-box border-b border-light-gray`}
    >
      <div className='md:w-[75%] lg:w-[60%] px-4 h-full mx-auto flex justify-between items-center'>
        <h1>
          <Link href='/' className='text-text flex items-center'>
            <Image
              src='/images/jellies.png'
              alt='jellies'
              width={30}
              height={30}
              priority
            />
            <span className='text-sm md:text-base pl-1'>BLOG</span>
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
      </div>
    </header>
  );
}
