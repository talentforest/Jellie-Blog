'use client';

import { useEffect, useState } from 'react';
import { TbTable } from 'react-icons/tb';
import { getIntersectionObserver } from '@/util/getIntersectionObserver';
import TocContent from './toc-content';
import dynamic from 'next/dynamic';
import Modal from '../common/modal';
const ReactResponsive = dynamic(() => import('react-responsive'), {
  ssr: false,
});

export default function Toc() {
  const [openModal, setOpenModal] = useState(false);
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

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      <ReactResponsive minWidth={768}>
        <TocContent headingEls={headingEls} activeId={activeId} />
      </ReactResponsive>

      <ReactResponsive maxWidth={767}>
        <button
          onClick={toggleModal}
          className='transition hover:scale-105 bg-light-yellow z-20 fixed flex items-center justify-center bottom-5 right-3 w-16 h-16 shadow-3xl !shadow-[#333] rounded-full'
        >
          <TbTable className='w-7 h-7' />
        </button>
        {openModal && (
          <Modal toggleModal={toggleModal}>
            <TocContent headingEls={headingEls} activeId={activeId} />
          </Modal>
        )}
      </ReactResponsive>
    </>
  );
}
