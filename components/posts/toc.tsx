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

  new Intl.NumberFormat();

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
        className='lg:hidden shadow-xl fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-lightest-yellow z-10 rounded-full gap-1 w-14 h-14 flex flex-col justify-center items-center '
      >
        <FaChevronUp fontSize={12} />
        <h1 className='text-sm md:text-base text-slate'>목차</h1>
      </button>

      <Modal openModal={openToc} toggleModal={toggleToc}>
        <nav className={`p-4 bg-box rounded-lg`}>
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
        className={`hidden lg:block sticky top-24 z-10 mt-10 px-2 pb-20 ml-12 w-[22%] overflow-scroll scrollbar-hide transition h-fit max-h-[90vh]`}
      >
        <h1 className='mb-4 font-bold text-sm text-text'>📒목차</h1>
        <ul className='flex flex-col space-y-2.5'>
          {headingEls.map((el) => (
            <TocElement key={el.id} element={el} activeId={activeId} />
          ))}
        </ul>
      </nav>
    </>
  );
}
