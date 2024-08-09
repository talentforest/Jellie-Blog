'use client';

import { Post } from '@/service/posts';
import TimeToReadItem from './time-to-read-item';
import DateItem from './date-item';
import ChevronArrowText from './chevron-arrow-text';
import Link from 'next/link';
import Image from 'next/image';

interface PostBoxProps {
  post: Post;
  direction: 'prev' | 'next';
}

export default function PostPrevNextBox({ post, direction }: PostBoxProps) {
  const {
    category,
    thumbnail,
    path,
    title,
    date,
    readingTime, //
  } = post;

  return (
    <Link
      href={`/posts/${path}`}
      className={`${
        direction === 'next' ? 'flex-row-reverse' : ''
      } w-full md:w-[60vw] shadow-lg overflow-hidden relative flex group hover:-translate-y-2 hover:border-2 border-light-yellow rounded-2xl transition`}
    >
      <div
        className={`${
          direction === 'next' ? 'items-end' : 'items-start'
        } p-3 md:px-4 flex flex-col h-full w-full bg-box`}
      >
        <ChevronArrowText text='포스트' direction={direction} />
        <h2
          className={`flex-1 font-bold mt-2.5 mb-3 min-h-10 text-base group-hover:text-yellow`}
        >
          {title}
        </h2>
        <ul className={`flex flex-wrap gap-2 pt-1`}>
          <DateItem date={date} />
          <TimeToReadItem readingTime={readingTime} />
        </ul>
      </div>

      {thumbnail ? (
        <Image
          src={`/images/${category}/${thumbnail}`}
          alt={`${title} 썸네일`}
          width={200}
          height={100}
          priority
          className={`w-1/3 object-cover ${
            direction === 'next' ? 'rounded-l-2xl' : 'rounded-r-2xl'
          }`}
        />
      ) : (
        <div className={`flex justify-center items-center text-medium-gray`}>
          이미지가 없습니다
        </div>
      )}
    </Link>
  );
}
