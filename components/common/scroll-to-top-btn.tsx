'use client';

import { HiChevronDoubleUp } from 'react-icons/hi2';

export default function ScrollToTopBtn() {
  return (
    <a
      href='#top'
      className='absolute bottom-3 right-3 transition border dark:border-gray-500 rounded-lg w-14 h-14 flex flex-col justify-center items-center text-gray-800 bg-white dark:bg-black dark:hover:bg-gray-900 hover:bg-blue-700 hover:text-white hover:font-extrabold'
    >
      <HiChevronDoubleUp className='h-6 w-6 dark:text-white' />
      <span className='text-xs dark:text-white'>TOP</span>
    </a>
  );
}
