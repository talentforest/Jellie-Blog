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
        className='fixed bottom-3 right-3 bg-box z-10 rounded-full border border-gray gap-1 w-14 h-14 flex flex-col justify-center items-center md:hidden'
      >
        <FaChevronUp fontSize={12} />
        <h1 className='font-king text-sm md:text-base font-bold text-slate'>
          목차
        </h1>
      </button>
      {openToc && (
        <Modal toggleModal={toggleToc}>
          <nav
            className={`z-10 w-[65vw] max-w-[80vw] overflow-scroll scrollbar-hide transition p-4 h-fit rounded-xl max-h-[90vh] md:hidden`}
          >
            <h1 className='font-king mb-4 text-sm md:text-base font-bold text-indigo'>
              목차
            </h1>
            <ul className='flex flex-col space-y-2.5'>
              {headingEls.map((el) => (
                <TocElement key={el.id} element={el} activeId={activeId} />
              ))}
            </ul>
          </nav>
        </Modal>
      )}

      {/* 태블릿 스크린 이상 */}
      <nav
        className={`hidden md:sticky top-8 ml-2 md:block z-10 md:w-56 overflow-scroll scrollbar-hide transition h-fit rounded-xl max-h-[90vh]`}
      >
        <h1 className='font-king mb-4 text-sm md:text-base font-bold text-indigo'>
          목차
        </h1>
        <ul className='flex flex-col space-y-2.5'>
          {headingEls.map((el) => (
            <TocElement key={el.id} element={el} activeId={activeId} />
          ))}
        </ul>
      </nav>
    </>
  );
}
