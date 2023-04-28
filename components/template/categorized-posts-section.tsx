'use client';

import { useState } from 'react';
import { Post } from '@/service/posts';
import { AiFillTag } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';
import EmptyBox from '../common/empty-box';
import PostBox from '../common/post-box';
import SortBtn from '../posts/sort-btn';
import CategoriesBox, { CategoryType } from '../common/categories-box';

export type SortBy = 'latest' | 'oldest';

interface Props {
  allPosts: Post[];
}

export default function CategorizedPostsSection({ allPosts }: Props) {
  const [category, setCategory] = useState('All' as CategoryType);
  const [sortBy, setSortBy] = useState<SortBy>('latest');
  const filteredPosts = allPosts.filter((post) => post.category === category);

  const sortByDate = (posts: Post[]) => {
    const sortedPosts = posts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    if (sortBy === 'latest') return sortedPosts.reverse();
    if (sortBy === 'oldest') return sortedPosts;
  };

  const showingPosts =
    category === 'All' ? sortByDate(allPosts) : sortByDate(filteredPosts);

  return (
    <section className='mx-4 my-8 md:my-4 md:mx-0 min-h-[50vh]'>
      <h2>Categorized Posts</h2>
      <CategoriesBox category={category} setCategory={setCategory} />
      <div className='relative mt-10 mb-2 flex items-center justify-between gap-1'>
        <h3 className='flex items-center gap-1'>
          <AiFillTag className='text-yellow' />
          {category}
        </h3>
        <MdKeyboardArrowRight className='h-5 w-5' />
        <span className='flex-1'>{showingPosts?.length || 0}개의 포스트</span>
        <SortBtn sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <ul className='flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-2 md:space-y-0 lg:grid-cols-3'>
        {!!showingPosts?.length ? (
          showingPosts?.map((post) => (
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
