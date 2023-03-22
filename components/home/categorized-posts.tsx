'use client';

import { useState } from 'react';
import { Post } from '@/service/posts';
import { convertChar, cutLetter } from '@/util';
import Link from 'next/link';

export type Categories =
  | 'All'
  | 'next.js'
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'tailwindcss'
  | 'web'
  | 'developments'
  | 'side-projects';

const categories: Categories[] = [
  'All',
  'next.js',
  'react',
  'typescript',
  'javascript',
  'tailwindcss',
  'web',
  'developments',
  'side-projects',
];

export default function CategorizedPosts({ allPosts }: { allPosts: Post[] }) {
  const [category, setCategory] = useState('All' as Categories);
  const onCategoryClick = (category: Categories) => setCategory(category);

  const postsbyCategory = allPosts.filter((post) => {
    if (category === 'All') return post;
    return post.category === category;
  });

  return (
    <>
      <ul className='flex flex-wrap gap-1 mt-3'>
        {categories.map((item) => (
          <li
            key={item}
            className={`${
              category === item ? 'bg-yellow-300' : 'bg-white'
            } border bg-white rounded-full  hover:bg-blue-500 transition hover:animate-pulse`}
          >
            <button
              onClick={() => onCategoryClick(item)}
              className='px-3 py-1 text-sm text-blue-700 hover:text-blue-50 transition'
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <ul className='mt-3 flex flex-col space-y-2'>
        {!!postsbyCategory.length ? (
          postsbyCategory?.map(({ id, title, category, contents }) => (
            <li key={id}>
              <Link href={`/posts/${convertChar(title, ' ', '-')}`}>
                <article className='cursor-pointer min-h-[200px] md:min-h-[180px] flex flex-col bg-white border p-3 rounded-md'>
                  <h1 className='text-base md:text-lg mb-2 font-bold'>
                    {title}
                  </h1>
                  <h2 className='text-sm mb-2 text-blue-400'>{category}</h2>
                  <p className='text-sm text-gray-500 flex-1'>
                    {cutLetter(contents, 200)}
                  </p>
                </article>
              </Link>
            </li>
          ))
        ) : (
          <div className='flex items-center justify-center h-32 text-sm'>
            아직 해당 카테고리로 작성된 포스트가 없습니다
          </div>
        )}
      </ul>
    </>
  );
}
