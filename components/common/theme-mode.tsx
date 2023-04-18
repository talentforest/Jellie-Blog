import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdSettingsBrightness, MdNightlight, MdSunny } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function ThemeMode() {
  const [mounted, setMounted] = useState(false);
  const [modified, setModified] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className='w-5 h-5'>
        <AiOutlineLoading3Quarters className='w-3 h-3 animate-spin' />
      </button>
    );
  }

  const onModifyClick = (theme: string) => {
    setTimeout(() => {
      setModified((prev) => !prev);
    }, 1500);
    setTheme(theme);
    setModified((prev) => !prev);
  };

  return (
    <>
      {theme === 'system' ? (
        <button className={`${modified ? 'pointer-events-none' : ''}`}>
          <MdSettingsBrightness
            className='hover:text-indigo hover:scale-105 transition text-yellow w-6 h-6 cursor-pointer'
            onClick={() => onModifyClick('dark')}
          />
        </button>
      ) : theme === 'dark' ? (
        <button className={`${modified ? 'pointer-events-none' : ''}`}>
          <MdNightlight
            className='hover:text-indigo hover:scale-105 transition text-yellow w-5 h-5 cursor-pointer'
            onClick={() => onModifyClick('light')}
          />
        </button>
      ) : theme === 'light' ? (
        <button className={`${modified ? 'pointer-events-none' : ''}`}>
          <MdSunny
            className='hover:text-indigo hover:scale-105 transition text-yellow w-5 h-5 cursor-pointer'
            onClick={() => onModifyClick('system')}
          />
        </button>
      ) : (
        <></>
      )}
      {modified && (
        <p className='absolute -bottom-6 right-2 text-xs text-slate'>
          {theme === 'system'
            ? '시스템'
            : theme === 'dark'
            ? '다크'
            : theme === 'light'
            ? '라이트'
            : ''}{' '}
          모드로 변경되었습니다.
        </p>
      )}
    </>
  );
}
