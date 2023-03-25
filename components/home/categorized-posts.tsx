'use client';

import { useState } from 'react';
import { Post } from '@/service/posts';
import PostBox from '../common/post-box';

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

interface Props {
  allPosts: Post[];
}

export default function CategorizedPosts({ allPosts }: Props) {
  const [category, setCategory] = useState('All' as Categories);
  const onCategoryClick = (category: Categories) => setCategory(category);

  const filteredPosts = allPosts.filter((post) => {
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
      <ul className='mt-3 flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-3'>
        {!!filteredPosts.length ? (
          filteredPosts?.map((post) => (
            <li key={post.path}>
              <PostBox post={post} size='lg' />
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
