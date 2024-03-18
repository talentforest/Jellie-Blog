'use client';

import { Post } from '@/service/posts';
import TimeToReadBox from './time-to-read-box';
import DateBox from './date-box';
import PostBoxContainer from './post-box-container';
import ChevronArrowText from './chevron-arrow-text';

interface PostBoxProps {
  post: Post;
  direction?: 'prev' | 'next';
}

export default function PostPrevNextBox({ post, direction }: PostBoxProps) {
  const {
    title,
    date,
    readingTime, //
  } = post;

  return (
    <PostBoxContainer post={post} imgHeight={28}>
      <header
        className={`justify-between flex items-center ${
          direction === 'prev' ? '' : 'flex-row-reverse'
        }`}
      >
        {direction && <ChevronArrowText text='포스트' direction={direction} />}
      </header>

      <section
        className={`flex flex-col ${direction === 'prev' ? '' : 'items-end'}`}
      >
        <h2
          className={`mt-2.5 mb-3 min-h-10 text-base font-king font-bold group-hover:text-yellow ${
            direction === 'prev' ? 'text-end' : ''
          }`}
        >
          {title}
        </h2>
      </section>

      <footer
        className={`flex gap-3 ${direction === 'prev' ? 'justify-end' : ''}`}
      >
        <DateBox date={date} />
        <TimeToReadBox readingTime={readingTime} />
      </footer>
    </PostBoxContainer>
  );
}
