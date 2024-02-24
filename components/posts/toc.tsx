'use client';

import { useEffect, useState } from 'react';
import { TbTable } from 'react-icons/tb';
import { getIntersectionObserver } from '@/util/getIntersectionObserver';
import TocContent from './toc-content';
import dynamic from 'next/dynamic';
const ReactResponsive = dynamic(() => import('react-responsive'), {
  ssr: false,
});

export default function TableOfContents() {
  const [modal, setModal] = useState(false);
  const [headingEls, setHeadingEls] = useState<Element[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
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
  }, []);

  const toggleModal = () => setModal((prev) => !prev);

  return (
    <>
      <ReactResponsive minWidth={768}>
        <section className='overflow-scroll scrollbar-hide h-[92vh] w-48 sticky top-5 right-0 transition py-6 px-4'>
          <TocContent headingEls={headingEls} activeId={activeId} />
        </section>
      </ReactResponsive>

      <ReactResponsive maxWidth={767}>
        <button
          onClick={toggleModal}
          className='transition hover:scale-105 bg-light-yellow z-20 fixed flex items-center justify-center bottom-5 right-3 w-16 h-16 shadow-3xl !shadow-[#333] rounded-full'
        >
          <TbTable className='w-7 h-7' />
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
      </ReactResponsive>
    </>
  );
}
