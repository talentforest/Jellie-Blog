'use client';

import { useEffect, useState } from 'react';
import { HiQueueList, HiXMark } from 'react-icons/hi2';

export default function TableOfContents() {
  const [modal, setModal] = useState(false);
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const article = document.querySelector('article');
    if (article) {
      const headingElements = Array.from(
        article.querySelectorAll('h2, h3, h4')
      );
      setHeadingEls(headingElements);
    }
  }, []);

  const toggleModal = () => setModal((prev) => !prev);

  return (
    <>
      {modal && (
        <>
          <div
            onClick={toggleModal}
            className='overflow-hidden transition fixed bottom-0 top-0 z-20 left-0 right-0 mx-auto w-full h-screen bg-black opacity-50'
          />
          <section className='transition z-20 p-6 fixed inset-0 m-auto w-10/12 h-fit max-h-[75%] border-2 border-slate bg-box rounded-xl'>
            <h1 className='mb-2 text-lg'># Table of Contents</h1>
            <ul className='flex flex-col space-y-2'>
              {headingEls.map((el, index) => (
                <li
                  key={index}
                  style={{
                    paddingLeft: `${(+el.attributes[1].value - 1) * 2}rem`,
                    cursor: 'pointer',
                  }}
                  className='text-text hover:text-yellow'
                >
                  <a href={`#${el.id}`} className='block py-1'>
                    {el.innerHTML}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
      <button
        onClick={toggleModal}
        className='transition hover:scale-105 md:hidden bg-yellow border border-slate z-20 fixed flex items-center justify-center bottom-5 right-5 w-16 h-16 shadow-lg rounded-full'
      >
        {!modal ? (
          <HiQueueList className='w-7 h-7' />
        ) : (
          <HiXMark className='w-7 h-7' />
        )}
      </button>
    </>
  );
}
