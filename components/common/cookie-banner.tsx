'use client';

import { getLocalStorage, setLocalStorage } from '@/service/storageHelper';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);
    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied';
    if (typeof window !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: newValue,
      });
    }
    setLocalStorage('cookie_consent', cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`${
        cookieConsent != null ? 'hidden' : 'flex'
      } z-20 my-10 mx-auto max-w-max md:max-w-screen-sm fixed bottom-0 left-0 right-0 flex px-6 md:px-5 py-3 justify-between items-center flex-col sm:flex-row gap-4 bg-blue rounded-lg shadow-md shadow-slate`}
    >
      <div className='text-center text-white'>
        <Link href='/info/cookies'>
          <p>
            현재 보시는 사이트는
            <span className='font-bold text-yellow'> 쿠키를</span> 사용합니다.
          </p>
        </Link>
      </div>
      <div className='flex gap-2'>
        <button
          onClick={() => setCookieConsent(false)}
          className='px-5 py-2 text-white rounded-md'
        >
          거절하기
        </button>
        <button
          onClick={() => setCookieConsent(true)}
          className='bg-teal px-4 py-1 text-white font-semibold rounded-lg shadow-lg'
        >
          쿠키 허용하기
        </button>
      </div>
    </div>
  );
}
