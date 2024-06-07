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
    .slice(0, 150);

  return loading ? (
    <Loading />
  ) : (
    <Link
      href={`/posts/${path}`}
      className={`w-full h-full overflow-hidden relative flex flex-col md:flex-row group hover:-translate-y-1 hover:border-2 border-light-yellow rounded-3xl transition shadow-md shadow-light-gray`}
    >
      {thumbnail ? (
        <Image
          src={`/images/${category}/${thumbnail}`}
          alt={`${title} 썸네일`}
          width={300}
          height={200}
          priority
          className={`w-full md:w-1/3 max-h-56 md:max-h-none object-cover border rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none`}
        />
      ) : (
        <div
          className={`w-full md:w-1/3 h-40 flex justify-center items-center text-medium-gray`}
        >
          이미지가 없습니다
        </div>
      )}

      <div
        className={`flex rounded-t-2xl md:rounded-none flex-col px-3.5 py-3 -mt-5 md:mt-0 relative bg-box flex-1`}
      >
        <CategoryBox category={category} />
        <h2
          className={`mt-2.5 mb-3 font-bold leading-6 ${
            contentPreview ? '' : 'flex-1'
          } text-[15px] group-hover:text-yellow`}
        >
          {title}
        </h2>

        {contentPreview && (
          <p className='flex-1 text-sm mb-2.5 leading-6 text-slate group-hover:text-text'>
            {preview} ...
          </p>
        )}

        <ul className={`flex flex-wrap gap-2 md:flex-row`}>
          <DateItem date={date} />
          <TimeToReadItem readingTime={readingTime} />
        </ul>
      </div>

      {direction === 'next' && <ArrowCircle direction='next' />}
    </Link>
  );
}
