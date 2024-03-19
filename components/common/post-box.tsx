'use client';

import { Post } from '@/service/posts';
import ArrowCircle from './arrow-circle';
import TimeToReadBox from './time-to-read-box';
import DateBox from './date-box';
import PostBoxContainer from './post-box-container';

interface PostBoxProps {
  post: Post;
  direction?: 'prev' | 'next';
  contentPreview?: boolean;
  imgHeight?: number;
}

export default function PostBox({
  post,
  direction,
  contentPreview = false,
  imgHeight = 40,
}: PostBoxProps) {
  const {
    title,
    description,
    date,
    content,
    readingTime, //
  } = post;

  const preview = content
    .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .slice(0, 150);

  return (
    <PostBoxContainer post={post} imgHeight={imgHeight}>
      <div
        className={`flex ${contentPreview ? 'gap-2' : 'flex-col gap-2'} ${
          direction === 'prev' ? 'items-end' : ''
        }`}
      >
        <DateBox date={date} />
        <TimeToReadBox readingTime={readingTime} />
      </div>

      <h2
        className={`mt-3 text-[${contentPreview ? '18px' : '16px'}]
        font-king font-bold group-hover:text-yellow `}
      >
        {title}
      </h2>

      <h3
        className={`mt-3 text-teal text-[${contentPreview ? '16px' : '15px'}]`}
      >
        {description}
      </h3>

      {contentPreview && (
        <p className='flex-1 text-sm tracking-wide leading-6 mt-5 text-slate group-hover:text-text'>
          {preview} ...
        </p>
      )}

      {direction && <ArrowCircle direction={direction} />}
    </PostBoxContainer>
  );
}
