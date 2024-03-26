'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdSettingsBrightness, MdNightlight, MdSunny } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function ThemeMode() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onModifyClick = (theme: string) => setTheme(theme);

  const modeIconStyle =
    'hover:text-indigo hover:scale-105 transition text-yellow w-5 h-5 cursor-pointer';

  return (
    <>
      {!mounted ? (
        <AiOutlineLoading3Quarters className='w-4 h-4 animate-spin' />
      ) : theme === 'system' ? (
        <button onClick={() => onModifyClick('dark')} className='pb-0.5'>
          <MdSettingsBrightness className={modeIconStyle} />
        </button>
      ) : theme === 'dark' ? (
        <button onClick={() => onModifyClick('light')} className='pb-0.5'>
          <MdNightlight className={modeIconStyle} />
        </button>
      ) : theme === 'light' ? (
        <button onClick={() => onModifyClick('system')} className='pb-0.5'>
          <MdSunny className={modeIconStyle} />
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
