'use client';

import { useState } from 'react';
import { Post } from '@/service/posts';
import CategoryBox from '../common/category-box';
import EmptyBox from '../common/empty-box';
import PostBox from '../common/post-box';
import { AiFillTag } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';

export type Categories =
  | 'All'
  | 'next.js'
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'tailwindcss'
  | 'web'
  | 'developments'
  | 'side-projects'
  | 'library';

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
  'library',
];

interface Props {
  allPosts: Post[];
}

export default function CategorizedPostsSection({ allPosts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All' as Categories);

  const onCategoryClick = (category: Categories) =>
    setSelectedCategory(category);

  const categorizedPosts: Post[] = allPosts
    .map((item) => {
      const allPosts = Object.values(item)[0];
      const filteredPost = allPosts.filter(
        (post: Post) => post.category === selectedCategory
      );
      return selectedCategory === 'All' ? allPosts : filteredPost;
    })
    .flat();

  return (
    <section className='mx-4 my-8 md:my-4 md:mx-0 min-h-[50vh]'>
      <h2>Categorized Posts</h2>
      <ul className='flex flex-wrap gap-1.5 mt-3 mb-8'>
        {categories.map((category) => (
          <CategoryBox
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </ul>
      <h3 className='mt-8 mb-2 flex items-center gap-1'>
        <span className=' flex gap-1 items-center w-fit rounded-full'>
          <AiFillTag className='text-yellow' />
          {selectedCategory}
        </span>
        <MdKeyboardArrowRight className='h-4 w-4' />
        {categorizedPosts.length}
        개의 포스트
      </h3>
      <ul className='flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3'>
        {!!categorizedPosts.length ? (
          categorizedPosts?.map((post) => (
            <li key={post.path}>
              <PostBox post={post} />
            </li>
          ))
        ) : (
          <EmptyBox content='포스트' />
        )}
      </ul>
    </section>
  );
}
