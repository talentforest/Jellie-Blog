'use client';

import { useCallback, useEffect, useState } from 'react';

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  const handleScroll = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop === 0) return setWidth(0);
    const windowHeight: number = scrollHeight - clientHeight;
    const currentPercent: number = scrollTop / windowHeight;
    setWidth(currentPercent * 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <div className='sticky top-14 border h-4 -mx-4 rounded-md z-10 w-screen bg-indigo-100'>
      <div
        style={{ width: width + '%' }}
        className='h-full rounded-md px-1 bg-indigo-500 text-[10px] text-white'
      >
        {width.toFixed()}%
      </div>
    </div>
  );
}
