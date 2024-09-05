'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeMode from './theme-mode';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  const markCurrPageStyle = (currPage: string) => {
    return `text-[15px] md:text-base transition hover:text-text ${
      pathname.includes(currPage) ? 'text-indigo' : 'text-gray'
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-[1001] text-text w-full h-14 md:h-[65px] bg-box border-b border-light-gray`}
    >
      <div className='px-4 md:px-10 lg:px-12 h-full mx-auto flex justify-between items-center'>
        <h1>
          <Link href='/' className='text-text flex items-center'>
            <Image
              src='/images/jellies.png'
              alt='jellies'
              width={30}
              height={30}
              priority
            />
            <span className='text-sm md:text-base pl-1'>DEV BLOG</span>
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
