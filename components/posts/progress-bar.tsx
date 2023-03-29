'use client';

import { throttle } from '@/util/throttle';
import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  const handleScroll = throttle((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop === 0) return setWidth(0);
    const windowHeight: number = scrollHeight - clientHeight;
    const currentPercent: number = scrollTop / windowHeight;
    setWidth(currentPercent * 100);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className='fixed w-full md:w-[85%] lg:w-4/5 top-14 border h-4 z-10 bg-slate border-slate'>
      <div
        style={{ width: width + '%' }}
        className='transition-all h-full rounded-r-md px-1 bg-indigo text-[10px] text-white'
      >
        {width.toFixed()}%
      </div>
    </div>
  );
}
