'use client';

import { useState } from 'react';
import { Post } from '@/service/posts';
import { MyOwnDoc } from '@/service/my-own-docs';
import CategoryBox from '../common/category-box';
import EmptyBox from '../common/empty-box';
import PostBox from '../common/post-box';
import MyOwnDocBox from '../posts/my-own-doc-box';

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
  myOwnDocs?: MyOwnDoc[];
}

export default function CategorizedPostsSection({
  allPosts,
  myOwnDocs,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All' as Categories);
  const onCategoryClick = (category: Categories) =>
    setSelectedCategory(category);

  const filteredPosts = allPosts.filter((post) => {
    if (selectedCategory === 'All') return post;
    return post.category === selectedCategory;
  });

  const filteredDoc = myOwnDocs?.filter(
    (doc) => doc.category === selectedCategory
  )[0];

  return (
    <section className='m-4'>
      <h2>Categorized Posts</h2>
      <ul className='flex flex-wrap gap-1 mt-3'>
        {categories.map((category) => (
          <CategoryBox
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </ul>
      {filteredDoc && (
        <>
          {selectedCategory !== 'All' && (
            <h2 className='mt-4 mb-2'>나만의 문서</h2>
          )}
          <MyOwnDocBox
            selectedCategory={selectedCategory}
            myOwnDoc={filteredDoc}
          />
        </>
      )}
      <span className='block mt-4 mb-2'>{filteredPosts.length}개의 포스트</span>
      <ul className='flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-3'>
        {!!filteredPosts.length ? (
          filteredPosts?.map((post) => (
            <li key={post.path}>
              <PostBox post={post} size='lg' />
            </li>
          ))
        ) : (
          <EmptyBox content='포스트' />
        )}
      </ul>
    </section>
  );
}
