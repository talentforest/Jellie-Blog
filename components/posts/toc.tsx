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
            className='overflow-hidden transition fixed bottom-0 top-0 z-20 left-0 right-0 mx-auto w-full h-screen bg-slate-600 opacity-50 dark:opacity-70'
          />
          <section className='transition z-20 p-6 fixed inset-0 m-auto w-10/12 h-fit max-h-[75%] border-2 border-slate-300 rounded-xl dark:border-slate-400 dark:bg-slate-800 bg-slate-100 shadow-inner'>
            <h1 className='mb-2 text-lg'># Table of Contents</h1>
            <ul className='flex flex-col space-y-2'>
              {headingEls.map((el, index) => (
                <li
                  key={index}
                  style={{
                    paddingLeft: `${(+el.attributes[1].value - 1) * 2}rem`,
                    cursor: 'pointer',
                  }}
                  className='dark:text-slate-300 dark:hover:text-teal-300 text-slate-600 hover:text-teal-300'
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
        className='dark:bg-slate-700 transition hover:scale-105 md:hidden border-2 z-20 border-gray-300 dark:border-gray-500 bg-yellow-200 hover:bg-indigo-300 fixed flex items-center justify-center bottom-5 right-5 w-16 h-16 shadow-lg rounded-full'
      >
        {!modal ? (
          <HiQueueList className='w-7 h-7 text-indigo-800 dark:text-white' />
        ) : (
          <HiXMark className='w-7 h-7 text-indigo-800 dark:text-white' />
        )}
      </button>
    </>
  );
}
