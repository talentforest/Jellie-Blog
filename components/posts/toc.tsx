'use client';

import { useEffect, useState } from 'react';
import { getIntersectionObserver } from '@/util/getIntersectionObserver';
import { FaChevronUp } from 'react-icons/fa';
import Modal from '../common/modal';
import TocElement from './toc-element';

export default function Toc() {
  const [openToc, setOpenToc] = useState(false);
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

  const toggleToc = () => setOpenToc((prev) => !prev);

  return (
    <>
      {/* 모바일 스크린 */}
      <button
        type='button'
        onClick={toggleToc}
        className='fixed bottom-3 right-3 md:bottom-10 md:right-10 bg-box z-10 rounded-full border border-light-gray gap-1 w-14 h-14 flex flex-col justify-center items-center lg:hidden'
      >
        <FaChevronUp fontSize={12} />
        <h1 className='text-sm md:text-base text-slate'>목차</h1>
      </button>

      <Modal openToc={openToc} toggleModal={toggleToc}>
        <nav
          className={`z-10 overflow-scroll scrollbar-hide transition p-4 h-fit rounded-xl max-h-[90vh]`}
        >
          <h1 className='mb-4 font-bold text-md md:text-base text-gray'>
            목차
          </h1>
          <ul className='flex flex-col space-y-2.5'>
            {headingEls.map((el) => (
              <TocElement key={el.id} element={el} activeId={activeId} />
            ))}
          </ul>
        </nav>
      </Modal>

      {/* 데스크탑 스크린 이상 */}
      <nav
        className={`hidden z-10 mt-10 px-2 pl-4 lg:block lg:sticky top-24 -mr-52 w-52 overflow-scroll scrollbar-hide transition h-fit max-h-[90vh]`}
      >
        <h1 className='mb-4 font-bold text-sm text-gray'>목차</h1>
        <ul className='flex flex-col space-y-2.5'>
          {headingEls.map((el) => (
            <TocElement key={el.id} element={el} activeId={activeId} />
          ))}
        </ul>
      </nav>
    </>
  );
}
