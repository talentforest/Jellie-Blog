'use client';

import { useState } from 'react';
import { Post } from '@/service/posts';
import { AiFillTag } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { sortByDate } from '@/util/sortByDate';
import EmptyBox from '../common/empty-box';
import PostBox from '../common/post-box';
import SortBtn from '../posts/sort-btn';
import CategoriesBox, { Category } from '../common/categories-box';

export type SortBy = 'latest' | 'oldest';

interface Props {
  allPosts: Post[];
}

export default function CategorizedPostsSection({ allPosts }: Props) {
  const [currCategory, setCurrCategory] = useState('All' as Category);
  const [sortBy, setSortBy] = useState<SortBy>('latest');

  const filteredPosts = allPosts.filter(
    (post) => post.category === currCategory
  );

  const matchPosts = currCategory === 'All' ? allPosts : filteredPosts;

  const showingPosts = sortByDate(matchPosts, sortBy);

  return (
    <section className='mx-4 mt-4 mb-8 md:my-4 md:mx-0 min-h-[50vh]'>
      <h2>Categorized Posts</h2>

      <CategoriesBox
        currCategory={currCategory}
        setCurrCategory={setCurrCategory}
        allPosts={allPosts}
      />

      <div className='relative mt-10 mb-4 pr-2 pl-1 flex items-center justify-between gap-1'>
        <h3 className='flex items-center gap-1'>
          <AiFillTag className='text-yellow w-5 h-5 mb-0.5' />
          {currCategory}
        </h3>
        <MdKeyboardArrowRight className='h-5 w-5' />
        <span className='flex-1'>{showingPosts?.length || 0}개의 포스트</span>
        <SortBtn sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <ul className='flex flex-col gap-3.5 md:grid grid-cols-2'>
        {!!showingPosts?.length ? (
          showingPosts?.map((post) => (
            <li key={post.path}>
              <PostBox post={post} contentPreview direction='next' />
            </li>
          ))
        ) : (
          <EmptyBox content='포스트' />
        )}
      </ul>
    </section>
  );
}
