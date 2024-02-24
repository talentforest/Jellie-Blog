'use client';

import { Post } from '@/service/posts';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArrowCircle from './arrow-circle';
import TimeToReadBox from './time-to-read-box';
import DateBox from './date-box';
import CategoryBox from './category-box';

interface PostBoxProps {
  post: Post;
  arrowPosition?: 'left' | 'right';
  contentPreview?: boolean;
}

export default function PostBox({
  post,
  arrowPosition,
  contentPreview = false,
}: PostBoxProps) {
  const [loading, setLoading] = useState(true);

  const {
    path,
    category,
    title,
    description,
    date,
    content,
    readingTime, //
  } = post;

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <span className='text-white'>loading...</span>
  ) : (
    <Link
      href={`/posts/${path}`}
      scroll={false}
      className='relative flex justify-between items-center h-full bg-box group hover:-translate-y-0.5 border border-gray hover:border-2 hover:border-light-yellow transition cursor-pointer rounded-xl px-3.5 py-3 select-none hover:bg-hoverbox'
    >
      {arrowPosition === 'left' && <ArrowCircle direction='prev' />}

      <article
        className={`${
          arrowPosition === 'left' ? 'items-end' : 'items-start'
        } justify-between flex flex-col w-full h-full`}
      >
        <CategoryBox category={category} />

        <h2 className='mt-3 text-lg font-king font-bold group-hover:text-yellow'>
          {title}
        </h2>

        <h3 className='text-sm my-2 text-teal leading-6 '>{description}</h3>

        {contentPreview && (
          <p className='flex-1 text-sm tracking-wide leading-6 mt-2 mb-5 text-slate group-hover:text-text'>
            {content
              .slice(0, 200)
              .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '')}
            ...
          </p>
        )}

        <div
          className={`${
            contentPreview ? 'flex gap-2' : ' flex-col mt-3 gap-1.5 justify-end'
          } ${arrowPosition === 'left' ? 'items-end' : ''} flex-1 flex`}
        >
          <DateBox date={date} />
          <TimeToReadBox readingTime={readingTime} />
        </div>
      </article>

      {arrowPosition === 'right' && <ArrowCircle direction='next' />}
    </Link>
  );
}
