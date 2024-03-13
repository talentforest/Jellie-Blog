'use client';

import { Post } from '@/service/posts';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArrowCircle from './arrow-circle';
import TimeToReadBox from './time-to-read-box';
import DateBox from './date-box';
import CategoryBox from './category-box';
import MarkdownViewer from '../posts/markdown-viewer';
import Image from 'next/image';

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
    thumbnail,
  } = post;

  useEffect(() => {
    setLoading(false);
  }, []);

  const preview = content
    .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .slice(0, 150);

  return loading ? (
    <div className='relative h-64 flex justify-center items-center bg-box group hover:-translate-y-0.5 border border-gray hover:border-2 hover:border-light-yellow transition cursor-pointer rounded-xl px-3.5 py-3 select-none hover:bg-hoverbox'>
      <span className='text-slate'>loading...</span>
    </div>
  ) : (
    <Link
      href={`/posts/${path}`}
      className='relative flex justify-between items-center h-full bg-box group hover:-translate-y-0.5 border border-gray hover:border-2 hover:border-light-yellow transition cursor-pointer rounded-xl select-none hover:bg-hoverbox'
    >
      {arrowPosition === 'left' && <ArrowCircle direction='prev' />}

      <article
        className={`[&>.categorybox]:absolute [&>.categorybox]:top-3 [&>.categorybox]:left-3 [&>.categorybox]:opacity-60 ${
          arrowPosition === 'left' ? 'items-end' : 'items-start'
        } justify-between flex flex-col w-full h-full`}
      >
        <Image
          src={`/images/${category}/${thumbnail}`}
          alt={`${title} 썸네일`}
          width={400}
          height={400}
          priority
          className='w-full absolute top-0 rounded-t-xl group-hover:opacity-100 h-48 md:h-80 overflow-hidden object-cover'
        />
        <CategoryBox category={category} />

        <div className='shadow-md border-t border-gray p-3 flex-1 flex flex-col w-full rounded-xl mt-44 relative bg-white'>
          <div
            className={`flex border-spacing-0 ${
              contentPreview ? 'gap-2' : 'flex-col gap-2'
            } ${arrowPosition === 'left' ? 'items-end' : ''}`}
          >
            <DateBox date={date} />
            <TimeToReadBox readingTime={readingTime} />
          </div>

          <h2 className='mt-3 text-lg font-king font-bold group-hover:text-yellow'>
            {title}
          </h2>

          <h3 className='mt-3 text-teal leading-6'>{description}</h3>

          {contentPreview && (
            <p className='flex-1 text-sm tracking-wide leading-6 mt-5 text-slate group-hover:text-text'>
              {preview} ...
            </p>
          )}
        </div>
      </article>

      {arrowPosition === 'right' && <ArrowCircle direction='next' />}
    </Link>
  );
}
