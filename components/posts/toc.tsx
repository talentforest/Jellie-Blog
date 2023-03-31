'use client';

import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { HiQueueList, HiXMark } from 'react-icons/hi2';
import TocContent from './toc-content';
import { getIntersectionObserver } from '@/util/getIntersectionObserver';

export default function TableOfContents() {
  const [mobile, setMobile] = useState(true);
  const [modal, setModal] = useState(false);
  const [headingEls, setHeadingEls] = useState<Element[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });

  useEffect(() => {
    if (isTablet) {
      setMobile(false);
    } else {
      setMobile(true);
    }
    const article = document.querySelector('article');
    if (article) {
      const headingElements = Array.from(
        article.querySelectorAll('h2, h3, h4')
      );
      setHeadingEls(headingElements);
      setActiveId(headingElements[0].id);

      const observer = getIntersectionObserver(setActiveId);
      headingElements.map((element) => {
        observer.observe(element);
      });
    }
  }, [isTablet]);

  const toggleModal = () => setModal((prev) => !prev);

  return (
    <>
      {!mobile ? (
        <section className='w-48 sticky top-14 right-0 transition py-6 px-4 h-fit'>
          <TocContent headingEls={headingEls} activeId={activeId} />
        </section>
      ) : (
        <>
          <button
            onClick={toggleModal}
            className='transition hover:scale-105 bg-yellow border border-slate z-20 fixed flex items-center justify-center bottom-5 right-5 w-16 h-16 shadow-lg rounded-full'
          >
            {!modal ? (
              <HiQueueList className='w-7 h-7' />
            ) : (
              <HiXMark className='w-7 h-7' />
            )}
          </button>
          {modal && (
            <>
              <div
                onClick={toggleModal}
                className='overflow-hidden transition fixed bottom-0 top-0 z-20 left-0 right-0 mx-auto w-full h-screen bg-black opacity-50'
              />
              <section className='overflow-scroll transition z-20 p-6 fixed inset-0 m-auto w-10/12 h-fit max-h-[75%] border-2 border-slate bg-bg rounded-xl'>
                <TocContent headingEls={headingEls} activeId={activeId} />
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}
