'use client';

import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { HiQueueList, HiXMark } from 'react-icons/hi2';

export default function TableOfContents() {
  const [mobile, setMobile] = useState(true);
  const [modal, setModal] = useState(false);
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

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
    }
  }, [isTablet]);

  const toggleModal = () => setModal((prev) => !prev);

  return (
    <>
      {!mobile ? (
        <section className='w-48 sticky top-14 right-0 transition py-6 px-4 h-fit'>
          <h1 className='mb-2'># TOC</h1>
          <ul className='flex flex-col space-y-2'>
            {headingEls.map((el, index) => (
              <li
                key={index}
                style={{
                  paddingLeft: `${(+el.nodeName.slice(1, 2) - 2) * 2}rem`,
                  cursor: 'pointer',
                }}
                className={`${
                  el.nodeName === 'H2'
                    ? 'text-yellow text-sm'
                    : 'text-text text-xs'
                } hover:text-slate`}
              >
                <a href={`#${el.id}`} className='block py-1'>
                  {el.innerHTML}
                </a>
              </li>
            ))}
          </ul>
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
              <section className='overflow-scroll transition z-20 p-6 fixed inset-0 m-auto w-10/12 h-fit max-h-[75%] border-2 border-slate bg-box rounded-xl'>
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
        </>
      )}
    </>
  );
}
