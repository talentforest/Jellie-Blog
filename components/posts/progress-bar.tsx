'use client';

import { throttle } from '@/util/throttle';
import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  const handleScroll = throttle((): void => {
    const scrollY = window.scrollY;
    const { scrollHeight, clientHeight } = document.documentElement;
    if (scrollY === 0) return setWidth(0);
    const windowHeight = scrollHeight - clientHeight;
    const currentPercent = scrollY / windowHeight;
    setWidth(currentPercent * 100);
  }, 200);

  useEffect(() => {
    window.document.documentElement.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='sticky w-full top-14 md:top-[65px] z-10 h-3.5 bg-light-gray '>
      <div
        style={{ width: width + '%' }}
        className='font-mono transition-all duration-300 h-full rounded-b-md px-1 bg-light-yellow text-[10px] text-gray'
      >
        {width.toFixed()}%
      </div>
    </div>
  );
}
