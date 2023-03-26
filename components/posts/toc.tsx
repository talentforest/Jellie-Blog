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
            className='overflow-hidden transition fixed bottom-0 top-0 z-20 left-0 right-0 mx-auto w-full h-screen bg-slate-600 opacity-50'
          />
          <section className='transition z-20 p-6 fixed inset-0 m-auto w-10/12 h-fit max-h-[75%] border-2 border-slate-300 rounded-xl bg-slate-100 shadow-inner'>
            <h1 className='mb-2 text-lg'># Table of Contents</h1>
            <ul className='flex flex-col space-y-2'>
              {headingEls.map((el, index) => (
                <li
                  key={index}
                  className={`${
                    el.nodeName === 'H2'
                      ? 'indent-0 hover:text-blue-500'
                      : el.nodeName === 'H3'
                      ? 'indent-6 hover:text-yellow-600 text-sm'
                      : el.nodeName === 'H4'
                      ? 'indent-10 hover:text-teal-600 text-sm'
                      : ''
                  } text-slate-500 hover:font-bold transition-all delay-70 cursor-pointer`}
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
        className='transition hover:scale-105 md:hidden border-2 z-20 border-gray-300 bg-yellow-200 hover:bg-indigo-300 fixed flex items-center justify-center bottom-5 right-5 w-16 h-16 shadow-lg rounded-full'
      >
        {!modal ? (
          <HiQueueList className='w-7 h-7 text-indigo-800' />
        ) : (
          <HiXMark className='w-7 h-7 text-indigo-800' />
        )}
      </button>
    </>
  );
}
