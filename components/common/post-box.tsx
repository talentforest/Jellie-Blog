'use client';

import { Post } from '@/service/posts';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArrowCircle from './arrow-circle';
import Image from 'next/image';
import CategoryBox from './category-box';
import DateItem from './date-item';
import TimeToReadItem from './time-to-read-item';
import Loading from './loading';

interface PostBoxProps {
  post: Post;
  direction?: 'prev' | 'next';
  contentPreview?: boolean;
}

export default function PostBox({
  post,
  direction,
  contentPreview,
}: PostBoxProps) {
  const [loading, setLoading] = useState(true);

  const { path, content, category, title, thumbnail, date, readingTime } = post;

  useEffect(() => {
    setLoading(false);
  }, []);

  const preview = content
    .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .slice(0, 120);

  return loading ? (
    <Loading />
  ) : (
    <Link
      href={`/posts/${path}`}
      className={`w-full h-full overflow-hidden relative flex flex-col lg:flex-row group hover:-translate-y-1 hover:border-2 border-light-yellow rounded-3xl transition shadow-md shadow-light-gray`}
    >
      {thumbnail ? (
        <Image
          src={`/images/${category}/${thumbnail}`}
          alt={`${title} 썸네일`}
          width={300}
          height={200}
          priority
          className={`w-full lg:w-1/3 h-40 lg:h-full lg:max-h-none object-cover`}
        />
      ) : (
        <div
          className={`w-full lg:w-1/3 h-40 flex justify-center items-center text-medium-gray`}
        >
          이미지가 없습니다
        </div>
      )}

      <div
        className={`flex rounded-t-3xl lg:rounded-none flex-col p-4 -mt-5 lg:mt-0 relative bg-box flex-1`}
      >
        <CategoryBox category={category} />
        <h2
          className={`mt-3.5 font-bold leading-6 ${
            contentPreview ? '' : 'flex-1'
          } text-base group-hover:text-yellow`}
        >
          {title}
        </h2>

        <ul className={`flex flex-wrap gap-x-4 gap-y-1.5 mt-3 lg:flex-row`}>
          <TimeToReadItem readingTime={readingTime} />
          <DateItem date={date} />
        </ul>

        {contentPreview && (
          <p className='flex-1 text-sm mt-2.5 leading-6 text-slate group-hover:text-text'>
            {preview} ...
          </p>
        )}
      </div>

      {direction === 'next' && <ArrowCircle direction='next' />}
    </Link>
  );
}
