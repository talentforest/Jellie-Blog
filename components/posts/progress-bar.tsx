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
    <div className='sticky w-full top-0 h-3 z-20 bg-slate border-slate'>
      <div
        style={{ width: width + '%' }}
        className='transition-all h-full rounded-r-md px-1 bg-indigo text-[10px] text-white'
      >
        {width.toFixed()}%
      </div>
    </div>
  );
}
